/* ==========================================================================
   EMI Master - Advanced Mortgage Calculator (calculator.net style)
   Features:
   - Linked Down Payment ($ and %) with quick presets (0%, 3.5%, 5%, 10%, 20%)
   - Loan Terms with quick buttons (30, 20, 15, 10 yrs)
   - Start Date (Month & Year) to calculate exact Payoff Date
   - Taxes ($/yr & % linked), Insurance, PMI (auto drops off when equity reaches 20%)
   - HOA & other costs
   - Extra payments (monthly, annual, one-time) with interest & time saved
   - Interactive Donut Chart with monthly breakdown
   - Balance vs Equity Area Chart + Principal vs Interest Bar Chart
   - Annual & Monthly Amortization Schedule with CSV export, Print, Copy
   - 30-Year vs 15-Year side-by-side comparison
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

  var MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  var MONTH_SHORT = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  function num(id) {
    var el = $(id);
    return el ? (parseFloat(el.value) || 0) : 0;
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text;
  }

  function payment(P, r, n) {
    if (P <= 0 || n <= 0) return 0;
    if (r === 0) return P / n;
    var f = Math.pow(1 + r, n);
    return (P * r * f) / (f - 1);
  }

  /* Populate Start Month and Start Year dropdowns */
  function initDates() {
    var mSelect = $('startMonth');
    var ySelect = $('startYear');
    if (!mSelect || !ySelect) return;

    var now = new Date();
    var curM = now.getMonth();
    var curY = now.getFullYear();

    if (mSelect.options.length === 0) {
      MONTH_NAMES.forEach(function (m, idx) {
        var opt = document.createElement('option');
        opt.value = idx;
        opt.textContent = m;
        if (idx === curM) opt.selected = true;
        mSelect.appendChild(opt);
      });
    }

    if (ySelect.options.length === 0) {
      for (var y = curY - 1; y <= curY + 25; y++) {
        var yOpt = document.createElement('option');
        yOpt.value = y;
        yOpt.textContent = y;
        if (y === curY) yOpt.selected = true;
        ySelect.appendChild(yOpt);
      }
    }
  }

  /* Two-way sync: Home Price & Down Payment */
  var isSyncingDown = false;
  function syncDownFromPercent() {
    if (isSyncingDown) return;
    isSyncingDown = true;
    var price = num('homePrice');
    var pct = num('downPaymentPct');
    var amt = (price * pct) / 100;
    var amtEl = $('downPaymentAmt');
    if (amtEl) amtEl.value = Math.round(amt);
    updateLoanAmountDisplay();
    isSyncingDown = false;
  }

  function syncDownFromAmount() {
    if (isSyncingDown) return;
    isSyncingDown = true;
    var price = num('homePrice');
    var amt = num('downPaymentAmt');
    var pct = price > 0 ? (amt / price) * 100 : 0;
    var pctEl = $('downPaymentPct');
    if (pctEl) pctEl.value = Math.round(pct * 10) / 10;
    updateLoanAmountDisplay();
    isSyncingDown = false;
  }

  /* Two-way sync: Property Tax $ and % */
  var isSyncingTax = false;
  function syncTaxFromPercent() {
    if (isSyncingTax) return;
    isSyncingTax = true;
    var price = num('homePrice');
    var pct = num('propertyTaxPct');
    var amt = (price * pct) / 100;
    var amtEl = $('propertyTax');
    if (amtEl) amtEl.value = Math.round(amt);
    isSyncingTax = false;
  }

  function syncTaxFromAmount() {
    if (isSyncingTax) return;
    isSyncingTax = true;
    var price = num('homePrice');
    var amt = num('propertyTax');
    var pct = price > 0 ? (amt / price) * 100 : 0;
    var pctEl = $('propertyTaxPct');
    if (pctEl) pctEl.value = Math.round(pct * 100) / 100;
    isSyncingTax = false;
  }

  function updateLoanAmountDisplay() {
    var price = num('homePrice');
    var down = num('downPaymentAmt');
    var loan = Math.max(0, price - down);
    var ltv = price > 0 ? (loan / price) * 100 : 0;
    setText('loanAmountBadge', fmt(loan) + ' (' + Math.round(ltv) + '% LTV)');

    var pmiBadge = $('pmiStatusBadge');
    var pmiRow = $('pmiBreakdownRow');
    if (pmiBadge) {
      if (ltv <= 80) {
        pmiBadge.className = 'pmi-info-badge pmi-badge-free';
        pmiBadge.innerHTML = '&#10004; No PMI required (Down payment &ge; 20%)';
      } else {
        pmiBadge.className = 'pmi-info-badge pmi-badge-required';
        pmiBadge.innerHTML = '&#9888; PMI required until equity reaches 20%';
      }
    }
  }

  /* Calculate Full Mortgage Amortization & Financial Breakdown */
  function calculateMortgage() {
    var homePrice = num('homePrice');
    var downPayment = num('downPaymentAmt');
    var loanAmount = Math.max(0, homePrice - downPayment);
    var annualRate = num('rate');
    var termYears = num('term');
    var startMonth = parseInt($('startMonth') ? $('startMonth').value : '0', 10) || 0;
    var startYear = parseInt($('startYear') ? $('startYear').value : '2026', 10) || 2026;

    var propTaxAnnual = num('propertyTax');
    var homeInsuranceAnnual = num('insurance');
    var pmiRateAnnual = num('pmiRate');
    var hoaMonthly = num('hoa');
    var otherMonthly = num('otherCosts');

    var monthlyExtra = num('monthlyExtra');
    var annualExtra = num('annualExtra');
    var oneTimeExtra = num('oneTimeExtra');
    var oneTimeMonth = Math.max(1, Math.round(num('oneTimeMonth')) || 1);

    var n = Math.round(termYears * 12);
    var r = (annualRate / 100) / 12;

    if (loanAmount <= 0 || n <= 0 || annualRate < 0) {
      return null;
    }

    var basePI = payment(loanAmount, r, n);
    var taxMonthly = propTaxAnnual / 12;
    var insuranceMonthly = homeInsuranceAnnual / 12;

    var initialLtv = homePrice > 0 ? (loanAmount / homePrice) * 100 : 0;
    var needsPmi = initialLtv > 80 && pmiRateAnnual > 0;
    var initialPmiMonthly = needsPmi ? (loanAmount * (pmiRateAnnual / 100)) / 12 : 0;

    /* Build Baseline Schedule (No Extra Payments) */
    var baseBalance = loanAmount;
    var baseTotalInterest = 0;
    var basePmiTotal = 0;
    var baseMonthsCount = 0;
    for (var m = 1; m <= n && baseBalance > 0.01; m++) {
      var bInt = baseBalance * r;
      var bPrin = Math.min(baseBalance, basePI - bInt);
      baseTotalInterest += bInt;
      baseBalance = Math.max(0, baseBalance - bPrin);
      baseMonthsCount = m;
      if (needsPmi && baseBalance > homePrice * 0.8) {
        basePmiTotal += initialPmiMonthly;
      }
    }

    /* Build Actual Schedule (With Extra Payments) */
    var hasExtras = monthlyExtra > 0 || annualExtra > 0 || oneTimeExtra > 0;
    var balance = loanAmount;
    var actualTotalInterest = 0;
    var actualPmiTotal = 0;
    var monthlyRows = [];
    var yearlyRows = {};
    var pmiEndMonth = -1;

    var curM = startMonth;
    var curY = startYear;

    for (var i = 1; i <= n && balance > 0.01; i++) {
      var isAnnualMonth = (i % 12 === 0);
      var extra = 0;
      if (monthlyExtra > 0) extra += monthlyExtra;
      if (annualExtra > 0 && isAnnualMonth) extra += annualExtra;
      if (oneTimeExtra > 0 && i === oneTimeMonth) extra += oneTimeExtra;

      var interest = balance * r;
      var regPrin = Math.max(0, basePI - interest);
      var totalPrin = Math.min(balance, regPrin + extra);
      var actualPaid = totalPrin + interest;

      actualTotalInterest += interest;

      var pmiThisMonth = 0;
      if (needsPmi && balance > homePrice * 0.8) {
        pmiThisMonth = initialPmiMonthly;
        actualPmiTotal += pmiThisMonth;
      } else if (needsPmi && pmiEndMonth === -1) {
        pmiEndMonth = i;
      }

      var startingBal = balance;
      balance = Math.max(0, balance - totalPrin);
      var endingBal = balance;
      var equityPct = homePrice > 0 ? ((homePrice - endingBal) / homePrice) * 100 : 100;

      var monthDateStr = MONTH_SHORT[curM] + ' ' + curY;

      monthlyRows.push({
        month: i,
        date: monthDateStr,
        monthIndex: curM,
        year: curY,
        payment: actualPaid,
        principal: totalPrin,
        interest: interest,
        extra: extra,
        pmi: pmiThisMonth,
        balance: endingBal,
        equityPct: equityPct
      });

      // Group into yearly rows
      if (!yearlyRows[curY]) {
        yearlyRows[curY] = {
          year: curY,
          startBal: startingBal,
          totalPaid: 0,
          principal: 0,
          interest: 0,
          extra: 0,
          taxes: 0,
          insurance: 0,
          pmi: 0,
          endBal: endingBal,
          equityPct: equityPct
        };
      }
      yearlyRows[curY].totalPaid += actualPaid;
      yearlyRows[curY].principal += totalPrin;
      yearlyRows[curY].interest += interest;
      yearlyRows[curY].extra += extra;
      yearlyRows[curY].taxes += taxMonthly;
      yearlyRows[curY].insurance += insuranceMonthly;
      yearlyRows[curY].pmi += pmiThisMonth;
      yearlyRows[curY].endBal = endingBal;
      yearlyRows[curY].equityPct = equityPct;

      // advance calendar month
      curM++;
      if (curM >= 12) {
        curM = 0;
        curY++;
      }

      if (balance <= 0.01) break;
    }

    var actualMonths = monthlyRows.length;
    var lastRow = monthlyRows[monthlyRows.length - 1];
    var payoffDateStr = lastRow ? (MONTH_NAMES[lastRow.monthIndex] + ' ' + lastRow.year) : '—';

    var totalPmtCount = actualMonths;
    var totalMortgagePayments = actualTotalInterest + loanAmount;
    var totalTaxes = taxMonthly * actualMonths;
    var totalInsurance = insuranceMonthly * actualMonths;
    var totalHoa = hoaMonthly * actualMonths;
    var totalOther = otherMonthly * actualMonths;
    var totalAllIn = homePrice + actualTotalInterest + totalTaxes + totalInsurance + actualPmiTotal + totalHoa + totalOther;

    var interestSaved = Math.max(0, baseTotalInterest - actualTotalInterest);
    var monthsSaved = Math.max(0, baseMonthsCount - actualMonths);

    // Initial total monthly payment
    var initialTotalMonthly = basePI + taxMonthly + insuranceMonthly + initialPmiMonthly + hoaMonthly + otherMonthly;

    return {
      homePrice: homePrice,
      downPayment: downPayment,
      downPaymentPct: homePrice > 0 ? (downPayment / homePrice) * 100 : 0,
      loanAmount: loanAmount,
      rate: annualRate,
      termYears: termYears,
      initialTotalMonthly: initialTotalMonthly,
      basePI: basePI,
      taxMonthly: taxMonthly,
      insuranceMonthly: insuranceMonthly,
      pmiMonthly: initialPmiMonthly,
      hoaMonthly: hoaMonthly,
      otherMonthly: otherMonthly,
      needsPmi: needsPmi,
      pmiEndMonth: pmiEndMonth,
      totalMortgagePayments: totalMortgagePayments,
      totalInterest: actualTotalInterest,
      totalTaxes: totalTaxes,
      totalInsurance: totalInsurance,
      totalPmi: actualPmiTotal,
      totalHoa: totalHoa,
      totalOther: totalOther,
      totalAllIn: totalAllIn,
      payoffDateStr: payoffDateStr,
      actualMonths: actualMonths,
      hasExtras: hasExtras,
      interestSaved: interestSaved,
      monthsSaved: monthsSaved,
      monthlyRows: monthlyRows,
      yearlyRows: yearlyRows
    };
  }

  /* Render 30-Year vs 15-Year comparison */
  function renderComparison(price, down, rate) {
    var loan = Math.max(0, price - down);
    var compTable = $('mortgageCompareBody');
    if (!compTable) return;

    if (loan <= 0) {
      compTable.innerHTML = '';
      return;
    }

    var r30 = rate / 1200;
    var n30 = 30 * 12;
    var pi30 = payment(loan, r30, n30);
    var totalInt30 = pi30 * n30 - loan;
    var totalCost30 = pi30 * n30;

    // 15-year loans typically offer ~0.5% - 0.75% lower interest rate in the US market
    var rate15 = Math.max(0.1, rate - 0.5);
    var r15 = rate15 / 1200;
    var n15 = 15 * 12;
    var pi15 = payment(loan, r15, n15);
    var totalInt15 = pi15 * n15 - loan;
    var totalCost15 = pi15 * n15;

    var intDiff = Math.max(0, totalInt30 - totalInt15);
    var pmtDiff = pi15 - pi30;

    var rows = [
      { label: 'Loan Term', c30: '30 Years Fixed', c15: '15 Years Fixed', diff: '15 Years Shorter' },
      { label: 'Interest Rate', c30: rate.toFixed(2) + '%', c15: rate15.toFixed(2) + '% (est.)', diff: '-0.50%' },
      { label: 'Monthly (P&I)', c30: fmtDec(pi30), c15: fmtDec(pi15), diff: '+' + fmt(pmtDiff) + '/mo' },
      { label: 'Total Interest', c30: fmt(totalInt30), c15: fmt(totalInt15), diff: '<span class="highlight-savings">Save ' + fmt(intDiff) + '</span>' },
      { label: 'Total Loan Payments', c30: fmt(totalCost30), c15: fmt(totalCost15), diff: '<span class="highlight-savings">Save ' + fmt(intDiff) + '</span>' }
    ];

    compTable.innerHTML = rows.map(function (rw) {
      return '<tr>' +
        '<td><strong>' + rw.label + '</strong></td>' +
        '<td>' + rw.c30 + '</td>' +
        '<td>' + rw.c15 + '</td>' +
        '<td>' + rw.diff + '</td>' +
        '</tr>';
    }).join('');
  }

  /* Render Amortization Schedules */
  var currentScheduleTab = 'annual';
  var lastResult = null;

  function renderSchedules(result) {
    if (!result) return;
    lastResult = result;

    var annualBody = $('annualScheduleBody');
    var monthlyBody = $('monthlyScheduleBody');
    var scheduleCount = $('scheduleCount');

    if (scheduleCount) {
      scheduleCount.textContent = result.actualMonths + ' payments (' + (result.actualMonths / 12).toFixed(1) + ' years)';
    }

    // Render Annual Table
    if (annualBody) {
      var yKeys = Object.keys(result.yearlyRows).sort(function (a, b) { return a - b; });
      var annualHtml = '';
      yKeys.forEach(function (y) {
        var row = result.yearlyRows[y];
        annualHtml += '<tr>' +
          '<td><strong>' + row.year + '</strong></td>' +
          '<td class="num">' + fmt(row.startBal) + '</td>' +
          '<td class="num">' + fmt(row.totalPaid) + '</td>' +
          '<td class="num" style="color:#2563eb;font-weight:600;">' + fmt(row.principal) + '</td>' +
          '<td class="num" style="color:#f59e0b;">' + fmt(row.interest) + '</td>' +
          '<td class="num">' + fmt(row.taxes + row.insurance + row.pmi) + '</td>' +
          '<td class="num"><strong>' + fmt(row.endBal) + '</strong></td>' +
          '<td class="num" style="color:#10b981;font-weight:600;">' + row.equityPct.toFixed(1) + '%</td>' +
          '</tr>';
      });
      annualBody.innerHTML = annualHtml;
    }

    // Render Monthly Table
    if (monthlyBody) {
      var monthlyHtml = '';
      result.monthlyRows.forEach(function (row) {
        monthlyHtml += '<tr>' +
          '<td>' + row.month + '</td>' +
          '<td><strong>' + row.date + '</strong></td>' +
          '<td class="num">' + fmt(row.payment) + '</td>' +
          '<td class="num" style="color:#2563eb;">' + fmt(row.principal) + '</td>' +
          '<td class="num" style="color:#f59e0b;">' + fmt(row.interest) + '</td>' +
          '<td class="num">' + (row.extra > 0 ? fmt(row.extra) : '—') + '</td>' +
          '<td class="num"><strong>' + fmt(row.balance) + '</strong></td>' +
          '<td class="num" style="color:#10b981;">' + row.equityPct.toFixed(1) + '%</td>' +
          '</tr>';
      });
      monthlyBody.innerHTML = monthlyHtml;
    }
  }

  /* Render Visual Graphs */
  var currentChartTab = 'balanceEquity';

  function renderCharts(result) {
    if (!result) return;
    var donutCanvas = $('mortgageDonutChart');
    var balanceCanvas = $('balanceEquityChart');
    var pIntCanvas = $('principalInterestChart');

    // 1. Donut Chart (Monthly Payment Breakdown)
    if (donutCanvas && window.EMIChart && window.EMIChart.renderDonut) {
      var slices = [
        { name: 'Principal & Interest', value: result.basePI, color: '#2563eb' },
        { name: 'Property Taxes', value: result.taxMonthly, color: '#f59e0b' },
        { name: 'Home Insurance', value: result.insuranceMonthly, color: '#10b981' },
        { name: 'PMI', value: result.pmiMonthly, color: '#8b5cf6' },
        { name: 'HOA & Other', value: result.hoaMonthly + result.otherMonthly, color: '#06b6d4' }
      ];
      window.EMIChart.renderDonut(donutCanvas, {
        slices: slices,
        centerTitle: 'Monthly Payment',
        centerValue: fmt(result.initialTotalMonthly)
      });
    }

    // 2. Balance vs Equity Area Chart
    if (balanceCanvas && window.EMIChart && window.EMIChart.renderArea) {
      var yKeys = Object.keys(result.yearlyRows).sort(function (a, b) { return a - b; });
      var labels = ['Start'];
      var balanceData = [Math.round(result.loanAmount)];
      var equityData = [Math.round(result.downPayment)];

      yKeys.forEach(function (y, idx) {
        labels.push(y);
        var r = result.yearlyRows[y];
        balanceData.push(Math.round(r.endBal));
        equityData.push(Math.round(result.homePrice - r.endBal));
      });

      window.EMIChart.renderArea(balanceCanvas, {
        labels: labels,
        series: [
          { name: 'Remaining Balance', data: balanceData, color: '#ef4444', fill: 'rgba(239, 68, 68, 0.12)' },
          { name: 'Home Equity', data: equityData, color: '#10b981', fill: 'rgba(16, 185, 129, 0.14)' }
        ]
      });
    }

    // 3. Principal vs Interest Bar Chart
    if (pIntCanvas && window.EMIChart && window.EMIChart.render) {
      var yKeys2 = Object.keys(result.yearlyRows).sort(function (a, b) { return a - b; });
      var barLabels = [];
      var prinData = [];
      var intData = [];

      yKeys2.forEach(function (y) {
        barLabels.push(y.toString().slice(-2));
        var r = result.yearlyRows[y];
        prinData.push(Math.round(r.principal));
        intData.push(Math.round(r.interest));
      });

      window.EMIChart.render(pIntCanvas, {
        labels: barLabels,
        series: [
          { name: 'Principal Paid', data: prinData, color: '#2563eb' },
          { name: 'Interest Paid', data: intData, color: '#f59e0b' }
        ]
      });
    }
  }

  /* Main Update Function */
  function update() {
    var result = calculateMortgage();
    var panel = $('resultPanel');

    if (!result) {
      if (panel) panel.classList.remove('show');
      return;
    }

    if (panel) panel.classList.add('show');

    // 1. Hero Total Monthly
    setText('resultMain', fmt(result.initialTotalMonthly) + ' / mo');
    setText('payoffDateBadge', 'Payoff: ' + result.payoffDateStr);

    // 2. Detailed Monthly Breakdown numbers & percentages
    var totalMo = result.initialTotalMonthly > 0 ? result.initialTotalMonthly : 1;

    setText('breakdownPIVal', fmtDec(result.basePI));
    setText('breakdownPIPct', '(' + ((result.basePI / totalMo) * 100).toFixed(1) + '%)');
    var fillPI = $('breakdownPIFill');
    if (fillPI) fillPI.style.width = ((result.basePI / totalMo) * 100) + '%';

    setText('breakdownTaxVal', fmtDec(result.taxMonthly));
    setText('breakdownTaxPct', '(' + ((result.taxMonthly / totalMo) * 100).toFixed(1) + '%)');
    var fillTax = $('breakdownTaxFill');
    if (fillTax) fillTax.style.width = ((result.taxMonthly / totalMo) * 100) + '%';

    setText('breakdownInsVal', fmtDec(result.insuranceMonthly));
    setText('breakdownInsPct', '(' + ((result.insuranceMonthly / totalMo) * 100).toFixed(1) + '%)');
    var fillIns = $('breakdownInsFill');
    if (fillIns) fillIns.style.width = ((result.insuranceMonthly / totalMo) * 100) + '%';

    setText('breakdownPmiVal', fmtDec(result.pmiMonthly));
    setText('breakdownPmiPct', '(' + ((result.pmiMonthly / totalMo) * 100).toFixed(1) + '%)');
    var fillPmi = $('breakdownPmiFill');
    if (fillPmi) fillPmi.style.width = ((result.pmiMonthly / totalMo) * 100) + '%';

    setText('breakdownHoaVal', fmtDec(result.hoaMonthly + result.otherMonthly));
    setText('breakdownHoaPct', '(' + (((result.hoaMonthly + result.otherMonthly) / totalMo) * 100).toFixed(1) + '%)');
    var fillHoa = $('breakdownHoaFill');
    if (fillHoa) fillHoa.style.width = (((result.hoaMonthly + result.otherMonthly) / totalMo) * 100) + '%';

    // 3. Grid Summary Items
    setText('outHomePrice', fmt(result.homePrice));
    setText('outLoanAmount', fmt(result.loanAmount));
    setText('outDownPayment', fmt(result.downPayment) + ' (' + result.downPaymentPct.toFixed(1) + '%)');
    setText('outTotalInterest', fmt(result.totalInterest));
    setText('outTotalPayments', fmt(result.totalMortgagePayments));
    setText('outTotalAllIn', fmt(result.totalAllIn));
    setText('outTotalTaxes', fmt(result.totalTaxes));
    setText('outTotalInsurance', fmt(result.totalInsurance));
    setText('outPayoffDate', result.payoffDateStr);

    // 4. Extra Payment Callout Banner
    var extraBanner = $('extraSavingsCallout');
    if (extraBanner) {
      if (result.hasExtras && (result.interestSaved > 0 || result.monthsSaved > 0)) {
        extraBanner.style.display = 'flex';
        var ySaved = Math.floor(result.monthsSaved / 12);
        var mSaved = result.monthsSaved % 12;
        var timeSavedText = '';
        if (ySaved > 0 && mSaved > 0) timeSavedText = ySaved + ' years and ' + mSaved + ' months';
        else if (ySaved > 0) timeSavedText = ySaved + ' years';
        else timeSavedText = mSaved + ' months';

        var calloutHtml = '<div class="callout-icon">&#127881;</div>' +
          '<div>' +
          '<h4>Extra Payment Impact: Save ' + fmt(result.interestSaved) + ' in Interest!</h4>' +
          '<p>With your extra payments, you will pay off your mortgage <strong>' + timeSavedText + ' earlier</strong> (in ' +
          (result.actualMonths / 12).toFixed(1) + ' years instead of ' + (result.termYears) + ' years) ' +
          'and save <strong>' + fmt(result.interestSaved) + '</strong> in total interest payments.</p>' +
          '</div>';
        extraBanner.innerHTML = calloutHtml;
      } else {
        extraBanner.style.display = 'none';
      }
    }

    // 5. Render Comparison
    renderComparison(result.homePrice, result.downPayment, result.rate);

    // 6. Render Charts & Amortization
    renderCharts(result);
    renderSchedules(result);
  }

  /* Slider and Range Binding */
  function bindRange(id, rangeId) {
    var input = $(id);
    var range = $(rangeId);
    if (!input || !range) return;
    var min = parseFloat(range.min) || 0;
    var max = parseFloat(range.max) || 10000000;
    input.addEventListener('input', function () {
      var v = parseFloat(input.value);
      if (!isNaN(v)) range.value = Math.min(max, Math.max(min, v));
      update();
    });
    range.addEventListener('input', function () {
      input.value = range.value;
      update();
    });
  }

  /* CSV Export */
  function downloadCsv() {
    if (!lastResult) return;
    var rows = lastResult.monthlyRows;
    var lines = [
      ['Payment #', 'Date', 'Total Payment', 'Principal', 'Interest', 'Extra Principal', 'PMI', 'Ending Balance', 'Equity %'].join(',')
    ];
    rows.forEach(function (r) {
      lines.push([
        r.month,
        '"' + r.date + '"',
        r.payment.toFixed(2),
        r.principal.toFixed(2),
        r.interest.toFixed(2),
        r.extra.toFixed(2),
        r.pmi.toFixed(2),
        r.balance.toFixed(2),
        r.equityPct.toFixed(2) + '%'
      ].join(','));
    });
    var blob = new Blob([lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Mortgage_Amortization_Schedule.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* Copy calculation summary to clipboard */
  function copySummary() {
    if (!lastResult) return;
    var r = lastResult;
    var text = "Mortgage Calculation Summary\n" +
      "---------------------------\n" +
      "Home Price: " + fmt(r.homePrice) + "\n" +
      "Down Payment: " + fmt(r.downPayment) + " (" + r.downPaymentPct.toFixed(1) + "%)\n" +
      "Loan Amount: " + fmt(r.loanAmount) + "\n" +
      "Interest Rate: " + r.rate.toFixed(2) + "%\n" +
      "Loan Term: " + r.termYears + " Years\n" +
      "\nMonthly Outlay Breakdown:\n" +
      "• Total Monthly Payment: " + fmtDec(r.initialTotalMonthly) + "\n" +
      "  - Principal & Interest: " + fmtDec(r.basePI) + "\n" +
      "  - Property Tax: " + fmtDec(r.taxMonthly) + "\n" +
      "  - Home Insurance: " + fmtDec(r.insuranceMonthly) + "\n" +
      (r.pmiMonthly > 0 ? ("  - PMI: " + fmtDec(r.pmiMonthly) + "\n") : "") +
      ((r.hoaMonthly + r.otherMonthly) > 0 ? ("  - HOA / Other: " + fmtDec(r.hoaMonthly + r.otherMonthly) + "\n") : "") +
      "\nTotal Over " + (r.actualMonths / 12).toFixed(1) + " Years:\n" +
      "• Total Interest Paid: " + fmt(r.totalInterest) + "\n" +
      "• Total Overall Payments: " + fmt(r.totalAllIn) + "\n" +
      "• Payoff Date: " + r.payoffDateStr + "\n" +
      (r.hasExtras ? ("• Total Interest Saved: " + fmt(r.interestSaved) + " (" + (r.monthsSaved / 12).toFixed(1) + " yrs earlier)\n") : "") +
      "\nCalculated on: " + window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (window.showToast) window.showToast('Mortgage summary copied to clipboard!');
      });
    } else {
      var tmp = document.createElement('textarea');
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
      if (window.showToast) window.showToast('Mortgage summary copied to clipboard!');
    }
  }

  /* Initialize Event Handlers */
  function init() {
    initDates();

    // Bind sliders
    bindRange('homePrice', 'homePriceRange');
    bindRange('rate', 'rateRange');
    bindRange('term', 'termRange');

    // Home Price input updates down payment
    var hp = $('homePrice');
    if (hp) {
      hp.addEventListener('input', function () {
        syncDownFromPercent();
        syncTaxFromPercent();
        update();
      });
    }

    // Down payment amount & pct two-way sync
    var dpAmt = $('downPaymentAmt');
    if (dpAmt) {
      dpAmt.addEventListener('input', function () {
        syncDownFromAmount();
        update();
      });
    }
    var dpPct = $('downPaymentPct');
    if (dpPct) {
      dpPct.addEventListener('input', function () {
        syncDownFromPercent();
        update();
      });
    }

    // Property Tax $ and % two-way sync
    var ptAmt = $('propertyTax');
    if (ptAmt) {
      ptAmt.addEventListener('input', function () {
        syncTaxFromAmount();
        update();
      });
    }
    var ptPct = $('propertyTaxPct');
    if (ptPct) {
      ptPct.addEventListener('input', function () {
        syncTaxFromPercent();
        update();
      });
    }

    // Other inputs
    ['insurance', 'pmiRate', 'hoa', 'otherCosts', 'monthlyExtra', 'annualExtra', 'oneTimeExtra', 'oneTimeMonth'].forEach(function (id) {
      var el = $(id);
      if (el) el.addEventListener('input', update);
    });

    ['startMonth', 'startYear'].forEach(function (id) {
      var el = $(id);
      if (el) el.addEventListener('change', update);
    });

    // Down Payment preset pill chips
    document.querySelectorAll('.down-preset-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.down-preset-pill').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var val = parseFloat(btn.dataset.pct) || 0;
        if (dpPct) dpPct.value = val;
        syncDownFromPercent();
        update();
      });
    });

    // Term preset pill chips
    document.querySelectorAll('.term-preset-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.term-preset-pill').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var val = parseFloat(btn.dataset.term) || 30;
        var termInput = $('term');
        var termRange = $('termRange');
        if (termInput) termInput.value = val;
        if (termRange) termRange.value = val;
        update();
      });
    });

    // Action buttons
    var calcBtn = $('calculateBtn');
    if (calcBtn) calcBtn.addEventListener('click', update);

    var resetBtn = $('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (hp) hp.value = 400000;
        var hpr = $('homePriceRange');
        if (hpr) hpr.value = 400000;
        if (dpPct) dpPct.value = 20;
        syncDownFromPercent();
        var rateInput = $('rate');
        if (rateInput) rateInput.value = 6.5;
        var rateRange = $('rateRange');
        if (rateRange) rateRange.value = 6.5;
        var termInput = $('term');
        if (termInput) termInput.value = 30;
        var termRange = $('termRange');
        if (termRange) termRange.value = 30;

        var pt = $('propertyTax');
        if (pt) pt.value = 4800;
        syncTaxFromAmount();
        var ins = $('insurance');
        if (ins) ins.value = 1500;
        var pmi = $('pmiRate');
        if (pmi) pmi.value = 0.5;
        var hoa = $('hoa');
        if (hoa) hoa.value = 0;
        var oth = $('otherCosts');
        if (oth) oth.value = 0;

        var me = $('monthlyExtra');
        if (me) me.value = 0;
        var ae = $('annualExtra');
        if (ae) ae.value = 0;
        var oe = $('oneTimeExtra');
        if (oe) oe.value = 0;

        document.querySelectorAll('.down-preset-pill').forEach(function (b) {
          b.classList.toggle('active', b.dataset.pct === '20');
        });
        document.querySelectorAll('.term-preset-pill').forEach(function (b) {
          b.classList.toggle('active', b.dataset.term === '30');
        });

        update();
      });
    }

    var csvBtn = $('downloadCsv');
    if (csvBtn) csvBtn.addEventListener('click', downloadCsv);

    var printBtn = $('printScheduleBtn');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }

    var copyBtn = $('copySummaryBtn');
    if (copyBtn) copyBtn.addEventListener('click', copySummary);

    // Schedule Tabs (Annual vs Monthly)
    var tabAnnual = $('tabAnnualSchedule');
    var tabMonthly = $('tabMonthlySchedule');
    var wrapAnnual = $('annualScheduleWrap');
    var wrapMonthly = $('monthlyScheduleWrap');

    if (tabAnnual && tabMonthly && wrapAnnual && wrapMonthly) {
      tabAnnual.addEventListener('click', function () {
        tabAnnual.classList.add('active');
        tabMonthly.classList.remove('active');
        wrapAnnual.style.display = 'block';
        wrapMonthly.style.display = 'none';
      });
      tabMonthly.addEventListener('click', function () {
        tabMonthly.classList.add('active');
        tabAnnual.classList.remove('active');
        wrapAnnual.style.display = 'none';
        wrapMonthly.style.display = 'block';
      });
    }

    // Chart Tabs (Balance vs Equity vs Principal & Interest)
    var tabChartBal = $('tabChartBalance');
    var tabChartPI = $('tabChartPI');
    var wrapChartBal = $('chartWrapBalance');
    var wrapChartPI = $('chartWrapPI');

    if (tabChartBal && tabChartPI && wrapChartBal && wrapChartPI) {
      tabChartBal.addEventListener('click', function () {
        tabChartBal.classList.add('active');
        tabChartPI.classList.remove('active');
        wrapChartBal.style.display = 'block';
        wrapChartPI.style.display = 'none';
        if (lastResult) renderCharts(lastResult);
      });
      tabChartPI.addEventListener('click', function () {
        tabChartPI.classList.add('active');
        tabChartBal.classList.remove('active');
        wrapChartBal.style.display = 'none';
        wrapChartPI.style.display = 'block';
        if (lastResult) renderCharts(lastResult);
      });
    }

    // Listen to currency changes
    window.addEventListener('localechange', update);

    // Initial run
    syncDownFromPercent();
    syncTaxFromPercent();
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
