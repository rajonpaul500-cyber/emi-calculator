/* ==========================================================================
   EMI Master - Advanced Mortgage Payoff Calculator (calculator.net professional style)
   Comprehensive early mortgage payoff simulator for US and international homeowners.
   Modes:
     1. 'extra': Extra payments (Monthly, Yearly/Annual, One-time lump sum)
     2. 'target': Target Payoff Time (Calculate required extra payment to be debt-free in X years)
     3. 'biweekly': Bi-Weekly Accelerated Mortgage Plan (26 half-payments = 13 full payments/yr)
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

  var currentMode = 'extra'; // 'extra' | 'target' | 'biweekly'
  var currentChartTab = 'balance'; // 'balance' | 'donut' | 'annual'
  var currentScheduleTab = 'annual'; // 'annual' | 'monthly'
  var lastResult = null;

  /* Initialize Start Month & Year dropdowns */
  function initDates() {
    var mSelect = $('startMonth');
    var ySelect = $('startYear');
    var oneTimeYSelect = $('oneTimeYear');
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
      for (var y = curY - 5; y <= curY + 30; y++) {
        var yOpt = document.createElement('option');
        yOpt.value = y;
        yOpt.textContent = y;
        if (y === curY) yOpt.selected = true;
        ySelect.appendChild(yOpt);
      }
    }

    if (oneTimeYSelect && oneTimeYSelect.options.length === 0) {
      for (var oy = curY; oy <= curY + 30; oy++) {
        var oOpt = document.createElement('option');
        oOpt.value = oy;
        oOpt.textContent = oy;
        if (oy === curY) oOpt.selected = true;
        oneTimeYSelect.appendChild(oOpt);
      }
    }
  }

  /* Compute Standard Monthly Mortgage Payment */
  function calcMonthlyPayment(P, annualRatePct, totalMonths) {
    if (P <= 0 || totalMonths <= 0) return 0;
    var r = (annualRatePct / 100) / 12;
    if (r === 0) return P / totalMonths;
    var f = Math.pow(1 + r, totalMonths);
    return (P * r * f) / (f - 1);
  }

  /* Convert month count into a friendly format e.g. "7 Years, 4 Months" */
  function formatYearsMonths(totalMonths) {
    if (totalMonths <= 0) return '0 Months';
    var y = Math.floor(totalMonths / 12);
    var m = totalMonths % 12;
    var parts = [];
    if (y > 0) parts.push(y + ' ' + (y === 1 ? 'Year' : 'Years'));
    if (m > 0) parts.push(m + ' ' + (m === 1 ? 'Month' : 'Months'));
    return parts.join(', ') || '0 Months';
  }

  /* Format specific Date e.g. "October 2038" */
  function formatDate(startYear, startMonth, monthOffset) {
    var d = new Date(startYear, startMonth + monthOffset, 1);
    return MONTH_NAMES[d.getMonth()] + ' ' + d.getFullYear();
  }

  /* Core Mortgage Payoff Engine */
  function calculatePayoff() {
    var principal = num('amount');
    var rate = num('rate');
    var termYears = num('term');
    var termMonths = num('termMonths');
    var totalBaseMonths = Math.round(termYears * 12 + termMonths);

    var startM = parseInt($('startMonth') ? $('startMonth').value : 0, 10) || 0;
    var startY = parseInt($('startYear') ? $('startYear').value : new Date().getFullYear(), 10) || new Date().getFullYear();

    if (principal <= 0 || rate < 0 || totalBaseMonths <= 0) {
      return null;
    }

    var monthlyRate = (rate / 100) / 12;
    var baseMonthlyPmt = calcMonthlyPayment(principal, rate, totalBaseMonths);
    var baseTotalInterest = (baseMonthlyPmt * totalBaseMonths) - principal;
    var baseTotalCost = principal + baseTotalInterest;

    var extraMonthly = 0;
    var extraAnnual = 0;
    var oneTimeExtra = 0;
    var oneTimeMonthIndex = -1; // 1-based month index

    if (currentMode === 'extra') {
      extraMonthly = num('monthlyExtra');
      extraAnnual = num('annualExtra');
      oneTimeExtra = num('oneTimeExtra');
      var otM = parseInt($('oneTimeMonth') ? $('oneTimeMonth').value : 0, 10) || 0;
      var otY = parseInt($('oneTimeYear') ? $('oneTimeYear').value : startY, 10) || startY;
      // Calculate month index from start date
      oneTimeMonthIndex = (otY - startY) * 12 + (otM - startM) + 1;
      if (oneTimeMonthIndex < 1) oneTimeMonthIndex = 1;
    } else if (currentMode === 'target') {
      var targetYears = num('targetYears');
      var targetMonths = num('targetMonths');
      var totalTargetMonths = Math.round(targetYears * 12 + targetMonths);
      if (totalTargetMonths > 0 && totalTargetMonths < totalBaseMonths) {
        var neededMonthlyPmt = calcMonthlyPayment(principal, rate, totalTargetMonths);
        extraMonthly = Math.max(0, neededMonthlyPmt - baseMonthlyPmt);
      }
    } else if (currentMode === 'biweekly') {
      // Accelerated biweekly: pay half monthly payment every 2 weeks = 26 half-payments = 13 monthly payments/year
      // That equals exactly 1 extra full monthly payment spread out across 12 months (baseMonthlyPmt / 12 extra per month)
      extraMonthly = baseMonthlyPmt / 12;
    }

    // Simulate Standard Schedule
    var stdBal = principal;
    var stdMonthlyRows = [];
    for (var m = 1; m <= totalBaseMonths && stdBal > 0.001; m++) {
      var interest = stdBal * monthlyRate;
      var curPmt = Math.min(baseMonthlyPmt, stdBal + interest);
      var pPortion = curPmt - interest;
      stdBal = Math.max(0, stdBal - pPortion);
      stdMonthlyRows.push({
        month: m,
        interest: interest,
        principal: pPortion,
        balance: stdBal
      });
    }

    // Simulate Accelerated Schedule with Extra Payments
    var accBal = principal;
    var accMonthlyRows = [];
    var totalExtraPaid = 0;
    var actualTotalInterest = 0;
    var maxSimulationMonths = totalBaseMonths + 60; // safety ceiling

    for (var i = 1; i <= maxSimulationMonths && accBal > 0.001; i++) {
      var monthInterest = accBal * monthlyRate;
      var curExtra = 0;

      if (extraMonthly > 0) curExtra += extraMonthly;
      if (extraAnnual > 0 && (i % 12 === 0)) curExtra += extraAnnual;
      if (oneTimeExtra > 0 && i === oneTimeMonthIndex) curExtra += oneTimeExtra;

      var totalIntended = baseMonthlyPmt + curExtra;
      var payoffNeeded = accBal + monthInterest;

      var actualPmt = Math.min(totalIntended, payoffNeeded);
      var actualPrincipal = actualPmt - monthInterest;
      if (actualPrincipal < 0) actualPrincipal = 0;

      var appliedExtra = 0;
      if (actualPmt > baseMonthlyPmt) {
        appliedExtra = actualPmt - baseMonthlyPmt;
      }

      accBal = Math.max(0, accBal - actualPrincipal);
      totalExtraPaid += appliedExtra;
      actualTotalInterest += monthInterest;

      var d = new Date(startY, startM + (i - 1), 1);
      var dateLabel = MONTH_SHORT[d.getMonth()] + ' ' + d.getFullYear();

      accMonthlyRows.push({
        period: i,
        date: dateLabel,
        year: d.getFullYear(),
        monthNum: d.getMonth() + 1,
        regPayment: Math.min(baseMonthlyPmt, actualPmt),
        extraPayment: appliedExtra,
        totalPayment: actualPmt,
        principal: actualPrincipal,
        interest: monthInterest,
        endBal: accBal,
        cumInterest: actualTotalInterest
      });

      if (accBal <= 0.001) break;
    }

    var actualMonths = accMonthlyRows.length;
    var monthsSaved = Math.max(0, totalBaseMonths - actualMonths);
    var interestSaved = Math.max(0, baseTotalInterest - actualTotalInterest);
    var actualTotalCost = principal + actualTotalInterest;
    var hasExtras = (extraMonthly > 0 || extraAnnual > 0 || oneTimeExtra > 0);

    // Aggregate into Annual Schedule
    var annualMap = {};
    accMonthlyRows.forEach(function (r) {
      var yr = r.year;
      if (!annualMap[yr]) {
        annualMap[yr] = {
          year: yr,
          regPayment: 0,
          extraPayment: 0,
          totalPayment: 0,
          principal: 0,
          interest: 0,
          endBal: r.endBal,
          startBal: r.endBal + r.principal
        };
      }
      annualMap[yr].regPayment += r.regPayment;
      annualMap[yr].extraPayment += r.extraPayment;
      annualMap[yr].totalPayment += r.totalPayment;
      annualMap[yr].principal += r.principal;
      annualMap[yr].interest += r.interest;
      annualMap[yr].endBal = r.endBal;
    });

    var annualRows = Object.keys(annualMap).sort(function (a, b) { return a - b; }).map(function (k) {
      return annualMap[k];
    });

    return {
      principal: principal,
      rate: rate,
      termYears: termYears,
      termMonths: termMonths,
      totalBaseMonths: totalBaseMonths,
      startM: startM,
      startY: startY,
      baseMonthlyPmt: baseMonthlyPmt,
      baseTotalInterest: baseTotalInterest,
      baseTotalCost: baseTotalCost,
      basePayoffDate: formatDate(startY, startM, totalBaseMonths - 1),
      extraMonthly: extraMonthly,
      extraAnnual: extraAnnual,
      oneTimeExtra: oneTimeExtra,
      hasExtras: hasExtras,
      actualMonths: actualMonths,
      monthsSaved: monthsSaved,
      interestSaved: interestSaved,
      actualTotalInterest: actualTotalInterest,
      actualTotalCost: actualTotalCost,
      totalExtraPaid: totalExtraPaid,
      actualPayoffDate: formatDate(startY, startM, actualMonths - 1),
      newMonthlyPmt: baseMonthlyPmt + extraMonthly,
      accMonthlyRows: accMonthlyRows,
      annualRows: annualRows,
      stdMonthlyRows: stdMonthlyRows
    };
  }

  /* Render Results into the DOM */
  function renderUI(res) {
    if (!res) {
      setText('resultMain', '—');
      setText('heroBannerText', '');
      return;
    }

    // 1. Hero Celebration Banner
    var banner = $('payoffHeroBanner');
    var bannerHeading = $('bannerHeading');
    var bannerDesc = $('bannerDesc');

    if (banner) {
      if (res.hasExtras && res.monthsSaved > 0) {
        banner.style.display = 'flex';
        if (bannerHeading) {
          bannerHeading.innerHTML = 'Save <strong>' + fmt(res.interestSaved) + '</strong> in total interest!';
        }
        if (bannerDesc) {
          bannerDesc.innerHTML = 'With your extra payment plan, you will pay off your mortgage <strong>' +
            formatYearsMonths(res.monthsSaved) + ' earlier</strong> (debt-free in ' +
            formatYearsMonths(res.actualMonths) + ' by <strong>' + res.actualPayoffDate +
            '</strong> instead of ' + res.basePayoffDate + ').';
        }
      } else if (res.hasExtras && res.interestSaved > 0) {
        banner.style.display = 'flex';
        if (bannerHeading) {
          bannerHeading.innerHTML = 'Save <strong>' + fmt(res.interestSaved) + '</strong> in interest!';
        }
        if (bannerDesc) {
          bannerDesc.innerHTML = 'Your extra payments reduce your overall mortgage interest costs significantly.';
        }
      } else {
        banner.style.display = 'none';
      }
    }

    // 2. Stat Cards
    setText('statInterestSaved', fmt(res.interestSaved));
    setText('statTimeSaved', res.monthsSaved > 0 ? formatYearsMonths(res.monthsSaved) : '0 Months');
    setText('statNewPayoffDate', res.actualPayoffDate);
    setText('statNewMonthly', fmt(res.newMonthlyPmt));

    // Target mode feedback: auto-populate or show calculated extra monthly payment needed
    if (currentMode === 'target') {
      var targetExtraDisplay = $('targetCalculatedExtra');
      if (targetExtraDisplay) {
        targetExtraDisplay.innerHTML = 'Required Extra Monthly Payment: <strong>' + fmtDec(res.extraMonthly) + '</strong> / month';
        targetExtraDisplay.style.display = 'block';
      }
    } else {
      var ted = $('targetCalculatedExtra');
      if (ted) ted.style.display = 'none';
    }

    // Biweekly mode feedback
    if (currentMode === 'biweekly') {
      var biweeklyInfo = $('biweeklyCalculatedInfo');
      if (biweeklyInfo) {
        var halfPmt = res.baseMonthlyPmt / 2;
        biweeklyInfo.innerHTML = 'Accelerated Bi-Weekly Payment: <strong>' + fmtDec(halfPmt) + '</strong> every 2 weeks (26 payments/yr).';
        biweeklyInfo.style.display = 'block';
      }
    } else {
      var bwi = $('biweeklyCalculatedInfo');
      if (bwi) bwi.style.display = 'none';
    }

    // 3. Side-by-Side Comparison Table
    setText('cmpStdMonthly', fmtDec(res.baseMonthlyPmt));
    setText('cmpAccMonthly', fmtDec(res.newMonthlyPmt));
    setText('cmpDiffMonthly', res.extraMonthly > 0 ? ('+' + fmtDec(res.extraMonthly)) : '$0.00');

    setText('cmpStdTerm', formatYearsMonths(res.totalBaseMonths));
    setText('cmpAccTerm', formatYearsMonths(res.actualMonths));
    setText('cmpDiffTerm', res.monthsSaved > 0 ? ('-' + formatYearsMonths(res.monthsSaved)) : '0 Months');

    setText('cmpStdPayoffDate', res.basePayoffDate);
    setText('cmpAccPayoffDate', res.actualPayoffDate);
    setText('cmpDiffPayoffDate', res.monthsSaved > 0 ? (res.monthsSaved + ' mos sooner') : 'Same');

    setText('cmpStdPrincipal', fmt(res.principal));
    setText('cmpAccPrincipal', fmt(res.principal));
    setText('cmpDiffPrincipal', '$0');

    setText('cmpStdInterest', fmt(res.baseTotalInterest));
    setText('cmpAccInterest', fmt(res.actualTotalInterest));
    setText('cmpDiffInterest', res.interestSaved > 0 ? ('-' + fmt(res.interestSaved) + ' saved') : '$0');

    setText('cmpStdTotal', fmt(res.baseTotalCost));
    setText('cmpAccTotal', fmt(res.actualTotalCost));
    setText('cmpDiffTotal', res.interestSaved > 0 ? ('-' + fmt(res.interestSaved) + ' saved') : '$0');

    // 4. Render Active Chart
    renderChart(res);

    // 5. Render Amortization Schedule
    renderSchedule(res);
  }

  /* Canvas Charts Rendering */
  function renderChart(res) {
    var canvas = $('mortgagePayoffChart');
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
    var textColor = isDark ? '#cbd5e1' : '#64748b';
    var gridColor = isDark ? '#334155' : '#e2e8f0';

    if (currentChartTab === 'balance') {
      renderBalanceCurve(ctx, w, h, res, isDark, textColor, gridColor);
    } else if (currentChartTab === 'donut') {
      renderDonutChart(ctx, w, h, res, isDark, textColor);
    } else if (currentChartTab === 'annual') {
      renderAnnualBarChart(ctx, w, h, res, isDark, textColor, gridColor);
    }
  }

  /* 1. Remaining Balance Payoff Curve (Standard vs Accelerated) */
  function renderBalanceCurve(ctx, w, h, res, isDark, textColor, gridColor) {
    var padL = 60, padR = 24, padT = 30, padB = 40;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;

    var maxBal = res.principal;
    var maxMonths = Math.max(res.totalBaseMonths, res.actualMonths);

    // Grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';

    var yTicks = 4;
    for (var i = 0; i <= yTicks; i++) {
      var val = (maxBal / yTicks) * (yTicks - i);
      var y = padT + (plotH / yTicks) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();

      var label = val >= 1000000 ? '$' + (val / 1000000).toFixed(1) + 'M' :
                  val >= 1000 ? '$' + Math.round(val / 1000) + 'K' : '$' + Math.round(val);
      ctx.fillText(label, padL - 8, y + 4);
    }

    // X-axis Year Ticks
    ctx.textAlign = 'center';
    var xYears = Math.ceil(maxMonths / 12);
    var stepYears = xYears > 20 ? 5 : (xYears > 10 ? 2 : 1);

    for (var yr = 0; yr <= xYears; yr += stepYears) {
      var mo = yr * 12;
      if (mo > maxMonths) break;
      var x = padL + (mo / maxMonths) * plotW;
      ctx.beginPath();
      ctx.moveTo(x, padT);
      ctx.lineTo(x, padT + plotH);
      ctx.stroke();
      ctx.fillText('Yr ' + yr, x, padT + plotH + 18);
    }

    // Draw Standard Balance Curve (Gray dashed line)
    ctx.beginPath();
    ctx.strokeStyle = isDark ? '#94a3b8' : '#94a3b8';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.moveTo(padL, padT);

    res.stdMonthlyRows.forEach(function (row) {
      var x = padL + (row.month / maxMonths) * plotW;
      var y = padT + (1 - (row.balance / maxBal)) * plotH;
      ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]); // Reset line dash

    // Draw Accelerated Balance Curve (Emerald Green solid line with gradient fill)
    var grad = ctx.createLinearGradient(0, padT, 0, padT + plotH);
    grad.addColorStop(0, isDark ? 'rgba(52, 211, 153, 0.35)' : 'rgba(16, 185, 129, 0.25)');
    grad.addColorStop(1, 'rgba(16, 185, 129, 0.01)');

    ctx.beginPath();
    ctx.moveTo(padL, padT);
    res.accMonthlyRows.forEach(function (row) {
      var x = padL + (row.period / maxMonths) * plotW;
      var y = padT + (1 - (row.endBal / maxBal)) * plotH;
      ctx.lineTo(x, y);
    });

    var lastAccX = padL + (res.actualMonths / maxMonths) * plotW;
    ctx.lineTo(lastAccX, padT + plotH);
    ctx.lineTo(padL, padT + plotH);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Stroke the green line
    ctx.beginPath();
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.moveTo(padL, padT);
    res.accMonthlyRows.forEach(function (row) {
      var x = padL + (row.period / maxMonths) * plotW;
      var y = padT + (1 - (row.endBal / maxBal)) * plotH;
      ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Chart Legend
    var legY = 14;
    ctx.textAlign = 'left';
    ctx.font = '12px sans-serif';

    // Accelerated legend
    ctx.fillStyle = '#10b981';
    ctx.fillRect(w - 280, legY - 9, 14, 10);
    ctx.fillStyle = textColor;
    ctx.fillText('With Extra Payments', w - 260, legY);

    // Standard legend
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(w - 130, legY - 4);
    ctx.lineTo(w - 114, legY - 4);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillText('Original Schedule', w - 108, legY);
  }

  /* 2. Donut Chart (Principal vs Interest with Extra Savings) */
  function renderDonutChart(ctx, w, h, res, isDark, textColor) {
    var cx = w / 2;
    var cy = h / 2 + 8;
    var outerR = Math.min(cx - 80, cy - 20, 100);
    var innerR = outerR * 0.62;

    var principal = res.principal;
    var interestPaid = res.actualTotalInterest;
    var interestSaved = res.interestSaved;
    var totalBase = principal + res.baseTotalInterest;

    var slices = [
      { label: 'Principal', val: principal, color: '#3b82f6' },
      { label: 'Interest Paid', val: interestPaid, color: '#ef4444' }
    ];
    if (interestSaved > 0) {
      slices.push({ label: 'Interest Saved', val: interestSaved, color: '#10b981' });
    }

    var startAngle = -Math.PI / 2;
    slices.forEach(function (s) {
      var sliceAngle = (s.val / totalBase) * (Math.PI * 2);
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
    ctx.fillText(fmt(res.actualTotalCost), cx, cy - 8);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.fillText('Total Paid', cx, cy + 12);

    // Legend
    var legX = 20;
    var legY = 24;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '12px sans-serif';

    slices.forEach(function (s, idx) {
      var pct = ((s.val / totalBase) * 100).toFixed(1) + '%';
      ctx.fillStyle = s.color;
      ctx.fillRect(legX, legY + idx * 24 - 10, 12, 12);
      ctx.fillStyle = textColor;
      ctx.fillText(s.label + ': ' + fmt(s.val) + ' (' + pct + ')', legX + 18, legY + idx * 24);
    });
  }

  /* 3. Annual Bar Chart */
  function renderAnnualBarChart(ctx, w, h, res, isDark, textColor, gridColor) {
    var rows = res.annualRows;
    if (!rows || rows.length === 0) return;

    var padL = 60, padR = 20, padT = 30, padB = 40;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;

    var maxAnnual = 0;
    rows.forEach(function (r) {
      if (r.totalPayment > maxAnnual) maxAnnual = r.totalPayment;
    });
    if (maxAnnual <= 0) maxAnnual = 1;

    // Grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';

    var yTicks = 4;
    for (var i = 0; i <= yTicks; i++) {
      var val = (maxAnnual / yTicks) * (yTicks - i);
      var y = padT + (plotH / yTicks) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();

      var label = val >= 1000 ? '$' + Math.round(val / 1000) + 'K' : '$' + Math.round(val);
      ctx.fillText(label, padL - 8, y + 4);
    }

    var barGroupW = plotW / rows.length;
    var barW = Math.max(3, Math.min(22, barGroupW * 0.4));

    rows.forEach(function (r, idx) {
      var groupCenter = padL + (idx + 0.5) * barGroupW;

      // Principal Bar (Blue)
      var pBarH = (r.principal / maxAnnual) * plotH;
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(groupCenter - barW - 1, padT + plotH - pBarH, barW, pBarH);

      // Interest Bar (Red)
      var iBarH = (r.interest / maxAnnual) * plotH;
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(groupCenter + 1, padT + plotH - iBarH, barW, iBarH);

      // X-axis label (Year) every few bars
      var labelStep = rows.length > 20 ? 5 : (rows.length > 10 ? 2 : 1);
      if (idx % labelStep === 0 || idx === rows.length - 1) {
        ctx.fillStyle = textColor;
        ctx.textAlign = 'center';
        ctx.fillText(String(r.year).slice(-2) + "'", groupCenter, padT + plotH + 16);
      }
    });

    // Legend
    var legY = 14;
    ctx.textAlign = 'left';
    ctx.font = '12px sans-serif';

    ctx.fillStyle = '#3b82f6';
    ctx.fillRect(w - 220, legY - 9, 12, 10);
    ctx.fillStyle = textColor;
    ctx.fillText('Principal', w - 202, legY);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(w - 120, legY - 9, 12, 10);
    ctx.fillStyle = textColor;
    ctx.fillText('Interest', w - 102, legY);
  }

  /* Render Amortization Schedule (Annual or Monthly) with Search */
  function renderSchedule(res, query) {
    var tBody = $('scheduleBody');
    var tFoot = $('scheduleFoot');
    var countEl = $('scheduleCount');
    if (!tBody || !tFoot) return;

    query = (query || '').toLowerCase().trim();

    var rowsHtml = '';
    var totalReg = 0;
    var totalExtra = 0;
    var totalPrincipal = 0;
    var totalInterest = 0;
    var totalPaid = 0;
    var shownCount = 0;

    if (currentScheduleTab === 'annual') {
      res.annualRows.forEach(function (r) {
        var strSearch = (r.year + ' ' + r.principal + ' ' + r.interest).toLowerCase();
        if (query && strSearch.indexOf(query) === -1) return;

        shownCount++;
        totalReg += r.regPayment;
        totalExtra += r.extraPayment;
        totalPrincipal += r.principal;
        totalInterest += r.interest;
        totalPaid += r.totalPayment;

        rowsHtml += '<tr>' +
          '<td><strong>' + r.year + '</strong></td>' +
          '<td class="num">' + fmtDec(r.regPayment) + '</td>' +
          '<td class="num ' + (r.extraPayment > 0 ? 'highlight-savings' : '') + '">' + (r.extraPayment > 0 ? ('+' + fmtDec(r.extraPayment)) : '$0.00') + '</td>' +
          '<td class="num">' + fmtDec(r.principal) + '</td>' +
          '<td class="num">' + fmtDec(r.interest) + '</td>' +
          '<td class="num"><strong>' + fmtDec(r.totalPayment) + '</strong></td>' +
          '<td class="num"><strong>' + fmt(r.endBal) + '</strong></td>' +
          '</tr>';
      });
    } else {
      res.accMonthlyRows.forEach(function (r) {
        var strSearch = (r.period + ' ' + r.date + ' ' + r.year).toLowerCase();
        if (query && strSearch.indexOf(query) === -1) return;

        shownCount++;
        totalReg += r.regPayment;
        totalExtra += r.extraPayment;
        totalPrincipal += r.principal;
        totalInterest += r.interest;
        totalPaid += r.totalPayment;

        rowsHtml += '<tr>' +
          '<td>' + r.period + ' <span style="font-size:0.75rem;color:var(--text-muted);margin-left:4px;">(' + r.date + ')</span></td>' +
          '<td class="num">' + fmtDec(r.regPayment) + '</td>' +
          '<td class="num ' + (r.extraPayment > 0 ? 'highlight-savings' : '') + '">' + (r.extraPayment > 0 ? ('+' + fmtDec(r.extraPayment)) : '$0.00') + '</td>' +
          '<td class="num">' + fmtDec(r.principal) + '</td>' +
          '<td class="num">' + fmtDec(r.interest) + '</td>' +
          '<td class="num"><strong>' + fmtDec(r.totalPayment) + '</strong></td>' +
          '<td class="num"><strong>' + fmt(r.endBal) + '</strong></td>' +
          '</tr>';
      });
    }

    tBody.innerHTML = rowsHtml || '<tr><td colspan="7" style="text-align:center;padding:24px;color:var(--text-muted);">No matching payments found for "' + query + '"</td></tr>';

    tFoot.innerHTML = '<tr style="font-weight:700;background:rgba(15,23,42,0.04);">' +
      '<td>Total: ' + shownCount + ' ' + (currentScheduleTab === 'annual' ? 'Years' : 'Payments') + '</td>' +
      '<td class="num">' + fmt(totalReg) + '</td>' +
      '<td class="num highlight-savings">' + fmt(totalExtra) + '</td>' +
      '<td class="num">' + fmt(totalPrincipal) + '</td>' +
      '<td class="num">' + fmt(totalInterest) + '</td>' +
      '<td class="num">' + fmt(totalPaid) + '</td>' +
      '<td class="num">$0</td>' +
      '</tr>';

    if (countEl) {
      countEl.textContent = '(' + (currentScheduleTab === 'annual' ? (res.annualRows.length + ' Years') : (res.actualMonths + ' Months')) + ')';
    }
  }

  /* Synchronize Sliders with Numeric Inputs */
  function bindRange(inputId, rangeId) {
    var inp = $(inputId);
    var rng = $(rangeId);
    if (!inp || !rng) return;

    inp.addEventListener('input', function () {
      var v = parseFloat(inp.value);
      var min = parseFloat(rng.min) || 0;
      var max = parseFloat(rng.max) || 10000000;
      if (!isNaN(v)) {
        rng.value = Math.min(max, Math.max(min, v));
      }
      runUpdate();
    });

    rng.addEventListener('input', function () {
      inp.value = rng.value;
      runUpdate();
    });
  }

  /* CSV Export */
  function exportCsv() {
    if (!lastResult) return;
    var rows = lastResult.accMonthlyRows;
    var lines = [
      ['Payment #', 'Date', 'Regular Payment', 'Extra Payment', 'Principal Paid', 'Interest Paid', 'Total Payment', 'Remaining Balance', 'Cumulative Interest'].join(',')
    ];

    rows.forEach(function (r) {
      lines.push([
        r.period,
        '"' + r.date + '"',
        r.regPayment.toFixed(2),
        r.extraPayment.toFixed(2),
        r.principal.toFixed(2),
        r.interest.toFixed(2),
        r.totalPayment.toFixed(2),
        r.endBal.toFixed(2),
        r.cumInterest.toFixed(2)
      ].join(','));
    });

    var blob = new Blob([lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Mortgage_Payoff_Schedule.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* Copy Summary to Clipboard */
  function copySummary() {
    if (!lastResult) return;
    var r = lastResult;
    var text = "EMI Master - Mortgage Payoff Plan Summary\n" +
      "============================================\n" +
      "Mortgage Balance: " + fmt(r.principal) + "\n" +
      "Interest Rate: " + r.rate.toFixed(2) + "%\n" +
      "Original Term: " + r.termYears + " Years (" + r.totalBaseMonths + " months)\n" +
      "Original Monthly Payment: " + fmtDec(r.baseMonthlyPmt) + "\n" +
      "Original Total Interest: " + fmt(r.baseTotalInterest) + "\n" +
      "Original Payoff Date: " + r.basePayoffDate + "\n" +
      "--------------------------------------------\n" +
      "New Total Monthly Payment: " + fmtDec(r.newMonthlyPmt) + "\n" +
      "New Payoff Date: " + r.actualPayoffDate + "\n" +
      "Total Time Saved: " + formatYearsMonths(r.monthsSaved) + " earlier!\n" +
      "Total Interest Saved: " + fmt(r.interestSaved) + "\n" +
      "New Total Mortgage Cost: " + fmt(r.actualTotalCost) + "\n" +
      "============================================\n" +
      "Calculated at: " + window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (window.showToast) window.showToast('Mortgage payoff summary copied to clipboard!');
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (window.showToast) window.showToast('Mortgage payoff summary copied to clipboard!');
    }
  }

  /* Quick Presets Handler */
  function applyPreset(presetType) {
    if (presetType === 'preset30yr400k') {
      $('amount').value = 400000;
      if ($('amountRange')) $('amountRange').value = 400000;
      $('rate').value = 6.5;
      if ($('rateRange')) $('rateRange').value = 6.5;
      $('term').value = 30;
      if ($('termRange')) $('termRange').value = 30;
      $('termMonths').value = 0;
      $('monthlyExtra').value = 200;
      $('annualExtra').value = 0;
      $('oneTimeExtra').value = 0;
      setMode('extra');
    } else if (presetType === 'preset30yr300k') {
      $('amount').value = 300000;
      if ($('amountRange')) $('amountRange').value = 300000;
      $('rate').value = 6.0;
      if ($('rateRange')) $('rateRange').value = 6.0;
      $('term').value = 30;
      if ($('termRange')) $('termRange').value = 30;
      $('termMonths').value = 0;
      $('monthlyExtra').value = 300;
      $('annualExtra').value = 0;
      $('oneTimeExtra').value = 0;
      setMode('extra');
    } else if (presetType === 'preset30yr500k') {
      $('amount').value = 500000;
      if ($('amountRange')) $('amountRange').value = 500000;
      $('rate').value = 7.0;
      if ($('rateRange')) $('rateRange').value = 7.0;
      $('term').value = 30;
      if ($('termRange')) $('termRange').value = 30;
      $('termMonths').value = 0;
      $('monthlyExtra').value = 500;
      $('annualExtra').value = 0;
      $('oneTimeExtra').value = 0;
      setMode('extra');
    } else if (presetType === 'preset15yr250k') {
      $('amount').value = 250000;
      if ($('amountRange')) $('amountRange').value = 250000;
      $('rate').value = 5.75;
      if ($('rateRange')) $('rateRange').value = 5.75;
      $('term').value = 15;
      if ($('termRange')) $('termRange').value = 15;
      $('termMonths').value = 0;
      $('monthlyExtra').value = 150;
      $('annualExtra').value = 0;
      $('oneTimeExtra').value = 0;
      setMode('extra');
    } else if (presetType === 'presetBiweekly') {
      setMode('biweekly');
    }

    // Update active preset button highlight
    var pBtns = document.querySelectorAll('.preset-pill-btn');
    pBtns.forEach(function (b) {
      if (b.getAttribute('data-preset') === presetType) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    runUpdate();
  }

  /* Switch Mode */
  function setMode(mode) {
    currentMode = mode;
    var modeBtns = document.querySelectorAll('.payoff-mode-btn');
    modeBtns.forEach(function (btn) {
      if (btn.getAttribute('data-mode') === mode) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    var extraSection = $('extraPaymentInputs');
    var targetSection = $('targetPayoffInputs');
    var biweeklySection = $('biweeklyInputs');

    if (extraSection) extraSection.style.display = (mode === 'extra') ? 'block' : 'none';
    if (targetSection) targetSection.style.display = (mode === 'target') ? 'block' : 'none';
    if (biweeklySection) biweeklySection.style.display = (mode === 'biweekly') ? 'block' : 'none';

    runUpdate();
  }

  function runUpdate() {
    lastResult = calculatePayoff();
    renderUI(lastResult);
  }

  /* Initialization on DOMContentLoaded */
  document.addEventListener('DOMContentLoaded', function () {
    initDates();

    // Bind sliders
    bindRange('amount', 'amountRange');
    bindRange('rate', 'rateRange');
    bindRange('term', 'termRange');

    // Mode tab buttons
    var modeBtns = document.querySelectorAll('.payoff-mode-btn');
    modeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMode(btn.getAttribute('data-mode'));
      });
    });

    // Preset buttons
    var presetBtns = document.querySelectorAll('.preset-pill-btn');
    presetBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyPreset(btn.getAttribute('data-preset'));
      });
    });

    // Quick Extra Payment buttons (+100, +200, +300, etc.)
    var quickExtraBtns = document.querySelectorAll('.quick-extra-btn');
    quickExtraBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var addVal = parseFloat(btn.getAttribute('data-add'));
        var monthlyInp = $('monthlyExtra');
        if (!monthlyInp) return;

        if (btn.getAttribute('data-action') === 'clear') {
          monthlyInp.value = 0;
          if ($('annualExtra')) $('annualExtra').value = 0;
          if ($('oneTimeExtra')) $('oneTimeExtra').value = 0;
        } else if (btn.getAttribute('data-action') === 'annual') {
          // Add 1 extra monthly payment per year to annualExtra
          if (lastResult) {
            var annualInp = $('annualExtra');
            if (annualInp) annualInp.value = Math.round(lastResult.baseMonthlyPmt);
          }
        } else if (!isNaN(addVal)) {
          monthlyInp.value = addVal;
        }

        // Highlight active quick button
        quickExtraBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        runUpdate();
      });
    });

    // Chart Tabs Switcher
    var chartTabBtns = document.querySelectorAll('.chart-tab-btn');
    chartTabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentChartTab = btn.getAttribute('data-chart');
        chartTabBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (lastResult) renderChart(lastResult);
      });
    });

    // Schedule Tabs Switcher (Annual vs Monthly)
    var schedTabBtns = document.querySelectorAll('.schedule-tab-btn');
    schedTabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentScheduleTab = btn.getAttribute('data-schedule');
        schedTabBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var sInput = $('scheduleSearchInput');
        if (lastResult) renderSchedule(lastResult, sInput ? sInput.value : '');
      });
    });

    // Schedule Search Filter
    var searchInput = $('scheduleSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        if (lastResult) renderSchedule(lastResult, searchInput.value);
      });
    }

    // Calculation button & Reset button
    var calcBtn = $('calculateBtn');
    if (calcBtn) calcBtn.addEventListener('click', runUpdate);

    var resetBtn = $('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        applyPreset('preset30yr400k');
      });
    }

    // Action buttons: CSV, Print, Copy
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

    // Live update on input changes
    var allInputs = document.querySelectorAll('#mortgageForm input, #mortgageForm select');
    allInputs.forEach(function (inp) {
      inp.addEventListener('input', runUpdate);
      inp.addEventListener('change', runUpdate);
    });

    // Resize observer for chart responsiveness
    window.addEventListener('resize', function () {
      if (lastResult) renderChart(lastResult);
    });

    // Initial calculation
    runUpdate();
  });

})();
