/* ==========================================================================
   EMI Master - Advanced House Affordability Calculator (calculator.net style)
   Two full calculation modes:
     1. 'dti': Income & Debt-to-Income (DTI) Ratios (Conventional 28/36, FHA 31/43, VA 41, Custom)
     2. 'budget': Fixed Monthly Budget & Maintenance
   Features:
     - 4 Profile Presets (Starter, Typical Family, High Earner, Debt-Free Budget)
     - Full PITI Breakdown: Principal & Interest, Property Tax, Homeowners Insurance, HOA, PMI
     - Down payment dual input ($ and %)
     - Comprehensive Multi-DTI comparison table (28/36, 31/43, 36/45, 41, 45, 50%)
     - Interactive visual Donut & Bar chart
     - Complete 30-year Amortization Schedule with Annual & Monthly toggles, search, CSV, Print, Copy
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  function fmt(v) {
    if (window.I18N && window.I18N.fmt) return window.I18N.fmt(v);
    return '$' + Math.round(v).toLocaleString('en-US');
  }

  function fmtDec(v) {
    var sym = (window.I18N && window.I18N.currencySymbol) ? window.I18N.currencySymbol() : '$';
    return sym + ' ' + Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function num(id) {
    var el = $(id);
    return el ? (parseFloat(el.value) || 0) : 0;
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text;
  }

  var currentMode = 'dti'; // 'dti' | 'budget'
  var currentChartTab = 'piti'; // 'piti' | 'price'
  var currentScheduleTab = 'annual'; // 'annual' | 'monthly'
  var lastResult = null;

  /* Standard monthly mortgage payment formula */
  function calcMonthlyPayment(principal, annualRatePct, totalMonths) {
    if (principal <= 0 || totalMonths <= 0) return 0;
    var r = (annualRatePct / 100) / 12;
    if (r === 0) return principal / totalMonths;
    var f = Math.pow(1 + r, totalMonths);
    return (principal * r * f) / (f - 1);
  }

  /* Payment factor k = r*(1+r)^n / ((1+r)^n - 1) */
  function getPaymentFactor(annualRatePct, totalMonths) {
    if (totalMonths <= 0) return 0;
    var r = (annualRatePct / 100) / 12;
    if (r === 0) return 1 / totalMonths;
    var f = Math.pow(1 + r, totalMonths);
    return (r * f) / (f - 1);
  }

  /* DTI ratio rules lookup */
  function getDtiRatios(ruleKey) {
    switch (ruleKey) {
      case 'conventional': // 28 / 36
        return { front: 0.28, back: 0.36, name: 'Conventional (28/36 rule)' };
      case 'fha':          // 31 / 43
        return { front: 0.31, back: 0.43, name: 'FHA Loan (31/43 rule)' };
      case 'va':           // Back only 41%
        return { front: 0.41, back: 0.41, name: 'VA Loan (41% back-end)' };
      case 'conservative': // 25 / 33
        return { front: 0.25, back: 0.33, name: 'Conservative (25/33 rule)' };
      case 'aggressive':   // 33 / 45
        return { front: 0.33, back: 0.45, name: 'Aggressive (33/45 rule)' };
      case 'custom':
        var customFront = (num('customFrontDti') || 28) / 100;
        var customBack = (num('customBackDti') || 36) / 100;
        return { front: customFront, back: customBack, name: 'Custom Ratio' };
      default:
        return { front: 0.28, back: 0.36, name: 'Conventional (28/36 rule)' };
    }
  }

  /* Core Affordability Solver */
  function solveAffordability() {
    var rate = num('affordRate');
    var termYears = num('affordTerm');
    var totalMonths = Math.max(1, Math.round(termYears * 12));
    var k = getPaymentFactor(rate, totalMonths);

    var downMode = $('downMode') ? $('affordDownMode').value : 'dollar'; // 'dollar' or 'percent'
    var rawDownVal = num('affordDown');

    var hoa = num('affordHoa'); // monthly HOA

    // Tax rate (% of home value or fixed $/yr)
    var taxType = $('affordTaxType') ? $('affordTaxType').value : 'percent';
    var taxVal = num('affordTax'); // e.g. 1.2% or $4,800/yr

    // Home insurance (% or fixed $/yr)
    var insType = $('affordInsType') ? $('affordInsType').value : 'dollar';
    var insVal = num('affordIns'); // e.g. $1,200/yr or 0.5%

    // PMI rate (% per year of initial loan if down payment < 20%)
    var pmiAnnualRate = (num('affordPmi') || 0.5) / 100;

    var maxMonthlyHousing = 0;
    var monthlyGross = 0;
    var debts = 0;
    var dtiRule = null;
    var limitingFactor = '';

    if (currentMode === 'dti') {
      var annualIncome = num('affordIncome');
      monthlyGross = annualIncome / 12;
      debts = num('affordDebts');

      var ruleKey = $('affordDtiRule') ? $('affordDtiRule').value : 'conventional';
      dtiRule = getDtiRatios(ruleKey);

      var frontLimit = monthlyGross * dtiRule.front;
      var backLimit = Math.max(0, monthlyGross * dtiRule.back - debts);

      if (frontLimit <= backLimit) {
        maxMonthlyHousing = frontLimit;
        limitingFactor = 'Front-End Ratio (' + (dtiRule.front * 100).toFixed(0) + '% of gross income)';
      } else {
        maxMonthlyHousing = backLimit;
        limitingFactor = 'Back-End Ratio (' + (dtiRule.back * 100).toFixed(0) + '% minus existing debts)';
      }
    } else {
      // Budget Mode
      maxMonthlyHousing = num('affordBudget');
      var maintenanceMonthly = num('affordMaint');
      maxMonthlyHousing = Math.max(0, maxMonthlyHousing - maintenanceMonthly);
      limitingFactor = 'Fixed Monthly Budget ($' + Math.round(num('affordBudget')).toLocaleString() + '/mo)';
    }

    /*
      Iterative Binary Search for Affordable Home Purchase Price (P)
      Monthly housing cost = Principal & Interest + Property Tax + Insurance + HOA + PMI
      Where:
        P = Home Price
        Down = if percent: P * (pct/100), if dollar: min(rawDownVal, P)
        Loan = max(0, P - Down)
        P&I = Loan * k
        Tax = if percent: (P * (taxPct/100))/12, if dollar: taxVal/12
        Ins = if percent: (P * (insPct/100))/12, if dollar: insVal/12
        HOA = hoa
        PMI = if (Down / P < 0.20 && Loan > 0) ? (Loan * pmiAnnualRate) / 12 : 0
    */

    function computeMonthlyForPrice(price) {
      if (price <= 0) return 0;
      var down = (downMode === 'percent') ? price * (rawDownVal / 100) : Math.min(price, rawDownVal);
      var loan = Math.max(0, price - down);
      var pi = loan * k;
      var propTax = (taxType === 'percent') ? (price * (taxVal / 100)) / 12 : (taxVal / 12);
      var homeIns = (insType === 'percent') ? (price * (insVal / 100)) / 12 : (insVal / 12);
      var pmi = (down / price < 0.19999 && loan > 0) ? (loan * pmiAnnualRate) / 12 : 0;
      return pi + propTax + homeIns + hoa + pmi;
    }

    var low = 0;
    var high = 15000000; // $15M max search ceiling
    var affordablePrice = 0;

    if (maxMonthlyHousing > hoa) {
      for (var iter = 0; iter < 60; iter++) {
        var mid = (low + high) / 2;
        var cost = computeMonthlyForPrice(mid);
        if (cost > maxMonthlyHousing) {
          high = mid;
        } else {
          low = mid;
        }
      }
      affordablePrice = (low + high) / 2;
    }

    var finalDown = (downMode === 'percent') ? affordablePrice * (rawDownVal / 100) : Math.min(affordablePrice, rawDownVal);
    var finalLoan = Math.max(0, affordablePrice - finalDown);
    var downPctActual = affordablePrice > 0 ? (finalDown / affordablePrice) * 100 : 0;

    var finalPI = finalLoan * k;
    var finalTax = (taxType === 'percent') ? (affordablePrice * (taxVal / 100)) / 12 : (taxVal / 12);
    var finalIns = (insType === 'percent') ? (affordablePrice * (insVal / 100)) / 12 : (insVal / 12);
    var finalHoa = hoa;
    var finalPmi = (downPctActual < 19.999 && finalLoan > 0) ? (finalLoan * pmiAnnualRate) / 12 : 0;
    var finalTotalMonthly = finalPI + finalTax + finalIns + finalHoa + finalPmi;

    // Actual DTI calculations
    var actualFrontDti = (monthlyGross > 0) ? (finalTotalMonthly / monthlyGross) * 100 : 0;
    var actualBackDti = (monthlyGross > 0) ? ((finalTotalMonthly + debts) / monthlyGross) * 100 : 0;

    // Total loan interest over life of loan
    var totalLoanInterest = (finalPI * totalMonths) - finalLoan;
    var totalLoanCost = finalLoan + totalLoanInterest;

    // Build Amortization Rows for this loan
    var monthlyRate = (rate / 100) / 12;
    var bal = finalLoan;
    var amortMonthly = [];
    var cumInterest = 0;

    for (var m = 1; m <= totalMonths && bal > 0.001; m++) {
      var mInterest = bal * monthlyRate;
      var curPmt = Math.min(finalPI, bal + mInterest);
      var mPrincipal = curPmt - mInterest;
      bal = Math.max(0, bal - mPrincipal);
      cumInterest += mInterest;

      var d = new Date();
      d.setMonth(d.getMonth() + m);

      amortMonthly.push({
        period: m,
        year: d.getFullYear(),
        monthLabel: d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
        payment: curPmt,
        principal: mPrincipal,
        interest: mInterest,
        balance: bal,
        cumInterest: cumInterest
      });
    }

    // Aggregate into Annual Rows
    var annualMap = {};
    amortMonthly.forEach(function (r) {
      var yr = r.year;
      if (!annualMap[yr]) {
        annualMap[yr] = {
          year: yr,
          payment: 0,
          principal: 0,
          interest: 0,
          endBal: r.balance
        };
      }
      annualMap[yr].payment += r.payment;
      annualMap[yr].principal += r.principal;
      annualMap[yr].interest += r.interest;
      annualMap[yr].endBal = r.balance;
    });

    var annualRows = Object.keys(annualMap).sort(function (a, b) { return a - b; }).map(function (k) {
      return annualMap[k];
    });

    // Solve for Comparison Across Popular DTI Tiers
    var dtiScenarios = [];
    if (currentMode === 'dti' && monthlyGross > 0) {
      var tiers = [
        { label: 'Conservative (25/33)', front: 0.25, back: 0.33 },
        { label: 'Conventional (28/36)', front: 0.28, back: 0.36 },
        { label: 'FHA Loan (31/43)', front: 0.31, back: 0.43 },
        { label: 'VA Loan (41% Back)', front: 0.41, back: 0.41 },
        { label: 'Aggressive (36/45)', front: 0.36, back: 0.45 },
        { label: 'Max Limit (50% Back)', front: 0.45, back: 0.50 }
      ];

      tiers.forEach(function (t) {
        var fMax = monthlyGross * t.front;
        var bMax = Math.max(0, monthlyGross * t.back - debts);
        var targetHousing = Math.min(fMax, bMax);

        var loP = 0, hiP = 15000000;
        if (targetHousing > hoa) {
          for (var j = 0; j < 50; j++) {
            var mPrice = (loP + hiP) / 2;
            var cDown = (downMode === 'percent') ? mPrice * (rawDownVal / 100) : Math.min(mPrice, rawDownVal);
            var cLoan = Math.max(0, mPrice - cDown);
            var cPI = cLoan * k;
            var cTax = (taxType === 'percent') ? (mPrice * (taxVal / 100)) / 12 : (taxVal / 12);
            var cIns = (insType === 'percent') ? (mPrice * (insVal / 100)) / 12 : (insVal / 12);
            var cPmi = (cDown / mPrice < 0.19999 && cLoan > 0) ? (cLoan * pmiAnnualRate) / 12 : 0;
            var cCost = cPI + cTax + cIns + hoa + cPmi;
            if (cCost > targetHousing) hiP = mPrice; else loP = mPrice;
          }
        }
        var solvedP = (loP + hiP) / 2;
        var sDown = (downMode === 'percent') ? solvedP * (rawDownVal / 100) : Math.min(solvedP, rawDownVal);
        var sLoan = Math.max(0, solvedP - sDown);
        var sPI = sLoan * k;

        dtiScenarios.push({
          label: t.label,
          frontPct: (t.front * 100).toFixed(0) + '%',
          backPct: (t.back * 100).toFixed(0) + '%',
          price: solvedP,
          loan: sLoan,
          down: sDown,
          monthlyHousing: targetHousing,
          monthlyPI: sPI
        });
      });
    }

    return {
      affordablePrice: affordablePrice,
      finalDown: finalDown,
      downPctActual: downPctActual,
      finalLoan: finalLoan,
      rate: rate,
      termYears: termYears,
      totalMonths: totalMonths,
      maxMonthlyHousing: maxMonthlyHousing,
      finalTotalMonthly: finalTotalMonthly,
      finalPI: finalPI,
      finalTax: finalTax,
      finalIns: finalIns,
      finalHoa: finalHoa,
      finalPmi: finalPmi,
      debts: debts,
      monthlyGross: monthlyGross,
      actualFrontDti: actualFrontDti,
      actualBackDti: actualBackDti,
      limitingFactor: limitingFactor,
      totalLoanInterest: totalLoanInterest,
      totalLoanCost: totalLoanCost,
      annualRows: annualRows,
      amortMonthly: amortMonthly,
      dtiScenarios: dtiScenarios
    };
  }

  /* Render Output to UI */
  function renderUI(res) {
    if (!res) {
      setText('resultMain', '—');
      return;
    }

    // Hero Callout Box
    setText('resultMain', fmt(res.affordablePrice));
    setText('heroPriceText', 'With your ' + (currentMode === 'dti' ? 'income, debts, and down payment' : 'monthly housing budget') +
      ', you can comfortably afford a home priced up to ' + fmt(res.affordablePrice) + '.');

    // 4 Stat Cards
    setText('statMaxPrice', fmt(res.affordablePrice));
    setText('statMaxLoan', fmt(res.finalLoan));
    setText('statTotalMonthly', fmt(res.finalTotalMonthly) + ' / mo');
    setText('statDownPayment', fmt(res.finalDown) + ' (' + res.downPctActual.toFixed(1) + '%)');

    // Limiting rule callout
    var limitEl = $('affordLimitingRule');
    if (limitEl) {
      limitEl.innerHTML = 'Governing Affordability Constraint: <strong>' + res.limitingFactor + '</strong>';
    }

    // PITI Breakdown Table
    setText('pitiPI', fmtDec(res.finalPI));
    setText('pitiTax', fmtDec(res.finalTax));
    setText('pitiIns', fmtDec(res.finalIns));
    setText('pitiHoa', fmtDec(res.finalHoa));
    setText('pitiPmi', fmtDec(res.finalPmi));
    setText('pitiTotal', fmtDec(res.finalTotalMonthly));

    // Percentages of monthly payment
    var totalM = res.finalTotalMonthly || 1;
    setText('pctPI', ((res.finalPI / totalM) * 100).toFixed(1) + '%');
    setText('pctTax', ((res.finalTax / totalM) * 100).toFixed(1) + '%');
    setText('pctIns', ((res.finalIns / totalM) * 100).toFixed(1) + '%');
    setText('pctHoa', ((res.finalHoa / totalM) * 100).toFixed(1) + '%');
    setText('pctPmi', ((res.finalPmi / totalM) * 100).toFixed(1) + '%');

    // Financial Health & DTI Ratios
    if (currentMode === 'dti' && res.monthlyGross > 0) {
      var dtiSection = $('dtiResultsCard');
      if (dtiSection) dtiSection.style.display = 'block';

      setText('dtiFrontVal', res.actualFrontDti.toFixed(1) + '%');
      setText('dtiBackVal', res.actualBackDti.toFixed(1) + '%');
      setText('dtiGrossVal', fmt(res.monthlyGross) + ' / mo');
      setText('dtiDebtsVal', fmt(res.debts) + ' / mo');

      var dtiBadge = $('dtiHealthBadge');
      if (dtiBadge) {
        if (res.actualBackDti <= 36) {
          dtiBadge.textContent = 'Excellent Health';
          dtiBadge.className = 'dti-badge badge-green';
        } else if (res.actualBackDti <= 43) {
          dtiBadge.textContent = 'Moderate / Standard';
          dtiBadge.className = 'dti-badge badge-yellow';
        } else {
          dtiBadge.textContent = 'High Debt Ratio';
          dtiBadge.className = 'dti-badge badge-red';
        }
      }

      // Render DTI Tiers Comparison Table
      renderDtiTable(res);
    } else {
      var dtiCard = $('dtiResultsCard');
      if (dtiCard) dtiCard.style.display = 'none';
      var dtiTiers = $('dtiTiersCard');
      if (dtiTiers) dtiTiers.style.display = 'none';
    }

    // Render Visual Chart
    renderChart(res);

    // Render Amortization Schedule
    renderSchedule(res);
  }

  /* Render DTI Comparison Table */
  function renderDtiTable(res) {
    var tbody = $('dtiTiersBody');
    var container = $('dtiTiersCard');
    if (!tbody || !container) return;

    if (!res.dtiScenarios || res.dtiScenarios.length === 0) {
      container.style.display = 'none';
      return;
    }
    container.style.display = 'block';

    var html = '';
    res.dtiScenarios.forEach(function (s) {
      var isCurrent = Math.abs(s.price - res.affordablePrice) < 1000;
      html += '<tr class="' + (isCurrent ? 'highlight-current-tier' : '') + '">' +
        '<td><strong>' + s.label + '</strong>' + (isCurrent ? ' <span class="current-tier-tag">Active</span>' : '') + '</td>' +
        '<td class="num">' + s.frontPct + '</td>' +
        '<td class="num">' + s.backPct + '</td>' +
        '<td class="num font-semibold">' + fmt(s.monthlyHousing) + '</td>' +
        '<td class="num font-semibold">' + fmt(s.loan) + '</td>' +
        '<td class="num font-bold text-primary">' + fmt(s.price) + '</td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
  }

  /* Render Charts (Donut & Price Comparison Bar) */
  function renderChart(res) {
    var canvas = $('affordChartCanvas');
    if (!canvas || !canvas.getContext) return;

    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth || (canvas.parentElement ? canvas.parentElement.clientWidth : 600);
    var h = 280;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var textColor = isDark ? '#cbd5e1' : '#475569';
    var gridColor = isDark ? '#334155' : '#e2e8f0';

    if (currentChartTab === 'piti') {
      renderPitiDonut(ctx, w, h, res, isDark, textColor);
    } else {
      renderDtiBarChart(ctx, w, h, res, isDark, textColor, gridColor);
    }
  }

  /* PITI Monthly Payment Donut */
  function renderPitiDonut(ctx, w, h, res, isDark, textColor) {
    var cx = w / 2;
    var cy = h / 2 + 10;
    var outerR = Math.min(cx - 90, cy - 25, 95);
    var innerR = outerR * 0.62;

    var total = res.finalTotalMonthly;
    if (total <= 0) return;

    var slices = [
      { label: 'Principal & Interest', val: res.finalPI, color: '#2563eb' },
      { label: 'Property Taxes', val: res.finalTax, color: '#f59e0b' },
      { label: 'Home Insurance', val: res.finalIns, color: '#10b981' },
      { label: 'HOA Fees', val: res.finalHoa, color: '#8b5cf6' },
      { label: 'PMI Insurance', val: res.finalPmi, color: '#ef4444' }
    ].filter(function (s) { return s.val > 0.01; });

    var startAngle = -Math.PI / 2;
    slices.forEach(function (s) {
      var sliceAngle = (s.val / total) * (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
      ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Center text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = textColor;
    ctx.fillText(fmt(res.finalTotalMonthly), cx, cy - 8);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.fillText('Monthly Cost', cx, cy + 12);

    // Legend on the side/top
    var legX = 20;
    var legY = 24;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '11.5px sans-serif';

    slices.forEach(function (s, idx) {
      var pct = ((s.val / total) * 100).toFixed(1) + '%';
      ctx.fillStyle = s.color;
      ctx.fillRect(legX, legY + idx * 22 - 10, 11, 11);
      ctx.fillStyle = textColor;
      ctx.fillText(s.label + ': ' + fmt(s.val) + ' (' + pct + ')', legX + 18, legY + idx * 22);
    });
  }

  /* DTI Price Comparison Bar Chart */
  function renderDtiBarChart(ctx, w, h, res, isDark, textColor, gridColor) {
    var scenarios = res.dtiScenarios;
    if (!scenarios || scenarios.length === 0) return;

    var padL = 60, padR = 20, padT = 30, padB = 50;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;

    var maxPrice = 0;
    scenarios.forEach(function (s) { if (s.price > maxPrice) maxPrice = s.price; });
    if (maxPrice <= 0) maxPrice = 1;

    // Grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';

    var yTicks = 4;
    for (var i = 0; i <= yTicks; i++) {
      var val = (maxPrice / yTicks) * (yTicks - i);
      var y = padT + (plotH / yTicks) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();

      var label = val >= 1000000 ? '$' + (val / 1000000).toFixed(1) + 'M' :
                  val >= 1000 ? '$' + Math.round(val / 1000) + 'K' : '$' + Math.round(val);
      ctx.fillText(label, padL - 8, y + 4);
    }

    var barGroupW = plotW / scenarios.length;
    var barW = Math.max(12, Math.min(36, barGroupW * 0.5));

    scenarios.forEach(function (s, idx) {
      var groupCenter = padL + (idx + 0.5) * barGroupW;
      var barH = (s.price / maxPrice) * plotH;
      var barY = padT + plotH - barH;

      var isCurrent = Math.abs(s.price - res.affordablePrice) < 1000;

      // Draw Bar
      ctx.fillStyle = isCurrent ? '#2563eb' : (isDark ? '#475569' : '#94a3b8');
      ctx.fillRect(groupCenter - barW / 2, barY, barW, barH);

      // Value label on top
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.font = '10px sans-serif';
      var pLabel = s.price >= 1000000 ? '$' + (s.price / 1000000).toFixed(2) + 'M' : '$' + Math.round(s.price / 1000) + 'K';
      ctx.fillText(pLabel, groupCenter, barY - 6);

      // X-axis label
      var shortLabel = s.label.split(' ')[0];
      ctx.fillText(shortLabel, groupCenter, padT + plotH + 16);
      ctx.fillText(s.backPct, groupCenter, padT + plotH + 30);
    });
  }

  /* Render Amortization Schedule (Annual / Monthly) */
  function renderSchedule(res, query) {
    var tBody = $('scheduleBody');
    var tFoot = $('scheduleFoot');
    var countEl = $('scheduleCount');
    if (!tBody || !tFoot) return;

    query = (query || '').toLowerCase().trim();

    var rowsHtml = '';
    var totalPmt = 0;
    var totalP = 0;
    var totalI = 0;
    var shownCount = 0;

    if (currentScheduleTab === 'annual') {
      res.annualRows.forEach(function (r) {
        var strSearch = (r.year + ' ' + r.principal + ' ' + r.interest).toLowerCase();
        if (query && strSearch.indexOf(query) === -1) return;

        shownCount++;
        totalPmt += r.payment;
        totalP += r.principal;
        totalI += r.interest;

        rowsHtml += '<tr>' +
          '<td><strong>' + r.year + '</strong></td>' +
          '<td class="num">' + fmtDec(r.payment) + '</td>' +
          '<td class="num">' + fmtDec(r.principal) + '</td>' +
          '<td class="num">' + fmtDec(r.interest) + '</td>' +
          '<td class="num"><strong>' + fmt(r.endBal) + '</strong></td>' +
          '</tr>';
      });
    } else {
      res.amortMonthly.forEach(function (r) {
        var strSearch = (r.period + ' ' + r.monthLabel + ' ' + r.year).toLowerCase();
        if (query && strSearch.indexOf(query) === -1) return;

        shownCount++;
        totalPmt += r.payment;
        totalP += r.principal;
        totalI += r.interest;

        rowsHtml += '<tr>' +
          '<td>' + r.period + ' <span style="font-size:0.75rem;color:var(--text-muted);margin-left:4px;">(' + r.monthLabel + ')</span></td>' +
          '<td class="num">' + fmtDec(r.payment) + '</td>' +
          '<td class="num">' + fmtDec(r.principal) + '</td>' +
          '<td class="num">' + fmtDec(r.interest) + '</td>' +
          '<td class="num"><strong>' + fmt(r.balance) + '</strong></td>' +
          '</tr>';
      });
    }

    tBody.innerHTML = rowsHtml || '<tr><td colspan="5" style="text-align:center;padding:24px;color:var(--text-muted);">No matching payments found</td></tr>';

    tFoot.innerHTML = '<tr style="font-weight:700;background:rgba(15,23,42,0.04);">' +
      '<td>Total: ' + shownCount + ' ' + (currentScheduleTab === 'annual' ? 'Years' : 'Payments') + '</td>' +
      '<td class="num">' + fmt(totalPmt) + '</td>' +
      '<td class="num">' + fmt(totalP) + '</td>' +
      '<td class="num">' + fmt(totalI) + '</td>' +
      '<td class="num">$0</td>' +
      '</tr>';

    if (countEl) {
      countEl.textContent = '(' + (currentScheduleTab === 'annual' ? (res.annualRows.length + ' Years') : (res.amortMonthly.length + ' Months')) + ')';
    }
  }

  /* Sliders synchronization */
  function bindRange(inpId, rngId) {
    var inp = $(inpId);
    var rng = $(rngId);
    if (!inp || !rng) return;

    inp.addEventListener('input', function () {
      var v = parseFloat(inp.value);
      var min = parseFloat(rng.min) || 0;
      var max = parseFloat(rng.max) || 10000000;
      if (!isNaN(v)) rng.value = Math.min(max, Math.max(min, v));
      runUpdate();
    });

    rng.addEventListener('input', function () {
      inp.value = rng.value;
      runUpdate();
    });
  }

  /* Preset Scenarios */
  function applyPreset(preset) {
    if (preset === 'starter') {
      // First-time Buyer ($75k income, $350/mo debt, $25k down, 6.5% rate)
      setMode('dti');
      $('affordIncome').value = 75000;
      $('affordDebts').value = 350;
      $('affordDown').value = 25000;
      if ($('affordDownMode')) $('affordDownMode').value = 'dollar';
      $('affordRate').value = 6.5;
      if ($('affordRateRange')) $('affordRateRange').value = 6.5;
      $('affordTerm').value = 30;
      if ($('affordTermRange')) $('affordTermRange').value = 30;
      $('affordTax').value = 1.2;
      $('affordIns').value = 1200;
      $('affordHoa').value = 0;
      $('affordDtiRule').value = 'conventional';
    } else if (preset === 'family') {
      // Typical Family ($120k income, $500/mo debt, $60k down, 6.5% rate)
      setMode('dti');
      $('affordIncome').value = 120000;
      $('affordDebts').value = 500;
      $('affordDown').value = 60000;
      if ($('affordDownMode')) $('affordDownMode').value = 'dollar';
      $('affordRate').value = 6.5;
      if ($('affordRateRange')) $('affordRateRange').value = 6.5;
      $('affordTerm').value = 30;
      if ($('affordTermRange')) $('affordTermRange').value = 30;
      $('affordTax').value = 1.2;
      $('affordIns').value = 1500;
      $('affordHoa').value = 50;
      $('affordDtiRule').value = 'conventional';
    } else if (preset === 'highEarn') {
      // High Earner ($250k income, $1,000/mo debt, $150k down, 6.25% rate)
      setMode('dti');
      $('affordIncome').value = 250000;
      $('affordDebts').value = 1000;
      $('affordDown').value = 150000;
      if ($('affordDownMode')) $('affordDownMode').value = 'dollar';
      $('affordRate').value = 6.25;
      if ($('affordRateRange')) $('affordRateRange').value = 6.25;
      $('affordTerm').value = 30;
      if ($('affordTermRange')) $('affordTermRange').value = 30;
      $('affordTax').value = 1.2;
      $('affordIns').value = 2400;
      $('affordHoa').value = 150;
      $('affordDtiRule').value = 'conventional';
    } else if (preset === 'budgetBuyer') {
      // Budget Driven ($2,800/mo budget, $40k down, 6.5%)
      setMode('budget');
      $('affordBudget').value = 2800;
      $('affordMaint').value = 200;
      $('affordDown').value = 40000;
      if ($('affordDownMode')) $('affordDownMode').value = 'dollar';
      $('affordRate').value = 6.5;
      if ($('affordRateRange')) $('affordRateRange').value = 6.5;
      $('affordTerm').value = 30;
      if ($('affordTermRange')) $('affordTermRange').value = 30;
      $('affordTax').value = 1.2;
      $('affordIns').value = 1400;
      $('affordHoa').value = 50;
    }

    // Highlight active preset button
    var pBtns = document.querySelectorAll('.afford-preset-btn');
    pBtns.forEach(function (b) {
      if (b.getAttribute('data-preset') === preset) b.classList.add('active');
      else b.classList.remove('active');
    });

    runUpdate();
  }

  /* Set Calculation Mode (DTI vs Budget) */
  function setMode(mode) {
    currentMode = mode;
    var modeBtns = document.querySelectorAll('.afford-mode-btn');
    modeBtns.forEach(function (btn) {
      if (btn.getAttribute('data-mode') === mode) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    var dtiInputs = $('dtiInputsWrap');
    var budgetInputs = $('budgetInputsWrap');
    var chartTabBtnPrice = $('chartTabBtnPrice');

    if (dtiInputs) dtiInputs.style.display = (mode === 'dti') ? 'block' : 'none';
    if (budgetInputs) budgetInputs.style.display = (mode === 'budget') ? 'block' : 'none';

    if (chartTabBtnPrice) {
      chartTabBtnPrice.style.display = (mode === 'dti') ? 'inline-block' : 'none';
    }
    if (mode === 'budget' && currentChartTab === 'price') {
      currentChartTab = 'piti';
      var pitiBtn = document.querySelector('.chart-tab-btn[data-chart="piti"]');
      if (pitiBtn) pitiBtn.classList.add('active');
      if (chartTabBtnPrice) chartTabBtnPrice.classList.remove('active');
    }

    runUpdate();
  }

  /* Export Amortization CSV */
  function exportCsv() {
    if (!lastResult) return;
    var rows = lastResult.amortMonthly;
    var lines = [
      ['Payment #', 'Date', 'Payment', 'Principal', 'Interest', 'Remaining Balance', 'Cumulative Interest'].join(',')
    ];

    rows.forEach(function (r) {
      lines.push([
        r.period,
        '"' + r.monthLabel + '"',
        r.payment.toFixed(2),
        r.principal.toFixed(2),
        r.interest.toFixed(2),
        r.balance.toFixed(2),
        r.cumInterest.toFixed(2)
      ].join(','));
    });

    var blob = new Blob([lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'House_Affordability_Schedule.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* Copy Summary */
  function copySummary() {
    if (!lastResult) return;
    var r = lastResult;
    var text = "EMI Master - House Affordability Calculation Summary\n" +
      "===================================================\n" +
      "Maximum Affordable Home Price: " + fmt(r.affordablePrice) + "\n" +
      "Down Payment: " + fmt(r.finalDown) + " (" + r.downPctActual.toFixed(1) + "%)\n" +
      "Maximum Mortgage Loan: " + fmt(r.finalLoan) + "\n" +
      "Interest Rate: " + r.rate.toFixed(2) + "% (" + r.termYears + " Years)\n" +
      "---------------------------------------------------\n" +
      "Total Estimated Monthly Housing Cost: " + fmtDec(r.finalTotalMonthly) + "/mo\n" +
      "  - Principal & Interest: " + fmtDec(r.finalPI) + "/mo\n" +
      "  - Property Tax: " + fmtDec(r.finalTax) + "/mo\n" +
      "  - Homeowner's Insurance: " + fmtDec(r.finalIns) + "/mo\n" +
      "  - HOA Fees: " + fmtDec(r.finalHoa) + "/mo\n" +
      "  - PMI (Mortgage Insurance): " + fmtDec(r.finalPmi) + "/mo\n" +
      "---------------------------------------------------\n" +
      "Governing Constraint: " + r.limitingFactor + "\n" +
      "Front-End Ratio: " + r.actualFrontDti.toFixed(1) + "%\n" +
      "Back-End Ratio: " + r.actualBackDti.toFixed(1) + "%\n" +
      "===================================================\n" +
      "Calculated at: " + window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (window.showToast) window.showToast('Affordability summary copied to clipboard!');
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (window.showToast) window.showToast('Affordability summary copied to clipboard!');
    }
  }

  function runUpdate() {
    lastResult = solveAffordability();
    renderUI(lastResult);
  }

  /* Initialization */
  document.addEventListener('DOMContentLoaded', function () {
    // Sliders
    bindRange('affordRate', 'affordRateRange');
    bindRange('affordTerm', 'affordTermRange');

    // Mode buttons
    var modeBtns = document.querySelectorAll('.afford-mode-btn');
    modeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMode(btn.getAttribute('data-mode'));
      });
    });

    // Preset buttons
    var presetBtns = document.querySelectorAll('.afford-preset-btn');
    presetBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyPreset(btn.getAttribute('data-preset'));
      });
    });

    // DTI Rule change (show/hide custom input fields)
    var dtiRuleSelect = $('affordDtiRule');
    if (dtiRuleSelect) {
      dtiRuleSelect.addEventListener('change', function () {
        var customWrap = $('customDtiInputs');
        if (customWrap) {
          customWrap.style.display = (dtiRuleSelect.value === 'custom') ? 'grid' : 'none';
        }
        runUpdate();
      });
    }

    // Chart tab switcher
    var chartBtns = document.querySelectorAll('.chart-tab-btn');
    chartBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentChartTab = btn.getAttribute('data-chart');
        chartBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (lastResult) renderChart(lastResult);
      });
    });

    // Schedule tab switcher
    var schedBtns = document.querySelectorAll('.schedule-tab-btn');
    schedBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentScheduleTab = btn.getAttribute('data-schedule');
        schedBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var sInp = $('scheduleSearchInput');
        if (lastResult) renderSchedule(lastResult, sInp ? sInp.value : '');
      });
    });

    // Schedule search
    var searchInp = $('scheduleSearchInput');
    if (searchInp) {
      searchInp.addEventListener('input', function () {
        if (lastResult) renderSchedule(lastResult, searchInp.value);
      });
    }

    // Buttons
    var calcBtn = $('calculateBtn');
    if (calcBtn) calcBtn.addEventListener('click', runUpdate);

    var resetBtn = $('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        applyPreset('family');
      });
    }

    var csvBtn = $('downloadCsv');
    if (csvBtn) csvBtn.addEventListener('click', exportCsv);

    var printBtn = $('printSchedule');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }

    var copyBtn = $('copySummaryBtn');
    if (copyBtn) copyBtn.addEventListener('click', copySummary);

    // Live update on input change
    var allInputs = document.querySelectorAll('#affordForm input, #affordForm select');
    allInputs.forEach(function (inp) {
      inp.addEventListener('input', runUpdate);
      inp.addEventListener('change', runUpdate);
    });

    // Window resize observer for chart
    window.addEventListener('resize', function () {
      if (lastResult) renderChart(lastResult);
    });

    // Initial run with Family preset
    applyPreset('family');
  });

})();
