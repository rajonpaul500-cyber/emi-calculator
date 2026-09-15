/* ==========================================================================
   EMI Master - Advanced Amortization Calculator (calculator.net style)
   Targeted for US borrowers & financial decision-makers.
   Features:
   - Quick Loan Presets (30-Yr Mortgage, 15-Yr Mortgage, 5-Yr Auto, Personal)
   - Flexible Term in Years & Months
   - Payment Frequencies: Monthly, Bi-weekly, Weekly, Semi-monthly, Quarterly, Annually
   - Compounding Options: Monthly, Semi-annually, Quarterly, Annually, Continuous
   - Start Date (Month & Year) for exact Payoff Date
   - Extra Payments: Monthly, Annual, One-Time with interest & time saved
   - Interactive Donut Chart (Principal vs Interest with color breakdown)
   - Balance vs Cumulative Interest Curve & Principal vs Interest Bar Chart
   - Annual & Monthly Amortization Schedule with Search, CSV Export, Print, Copy
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

  var PAYMENTS_PER_YEAR = {
    monthly: 12,
    biweekly: 26,
    weekly: 52,
    'semi-monthly': 24,
    quarterly: 4,
    annually: 1
  };

  var COMPOUND_PER_YEAR = {
    monthly: 12,
    'semi-annually': 2,
    quarterly: 4,
    annually: 1,
    continuous: 0
  };

  function num(id) {
    var el = $(id);
    return el ? (parseFloat(el.value) || 0) : 0;
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text;
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

  /* Compute Effective Periodic Interest Rate */
  function calculatePeriodRate(annualRatePct, compoundMethod, paybackMethod) {
    var rAnnual = annualRatePct / 100;
    var p = PAYMENTS_PER_YEAR[paybackMethod] || 12;
    var m = COMPOUND_PER_YEAR[compoundMethod];
    if (m === undefined) m = 12;

    if (rAnnual <= 0) return 0;

    // If payment frequency matches compound frequency (standard case)
    if (m === p) {
      return rAnnual / p;
    }

    var effAnnual;
    if (m === 0) {
      // Continuous compounding
      effAnnual = Math.exp(rAnnual) - 1;
    } else {
      effAnnual = Math.pow(1 + rAnnual / m, m) - 1;
    }

    return Math.pow(1 + effAnnual, 1 / p) - 1;
  }

  /* Payment formula */
  function calcPmt(P, r, n) {
    if (P <= 0 || n <= 0) return 0;
    if (r <= 0) return P / n;
    var f = Math.pow(1 + r, n);
    return (P * r * f) / (f - 1);
  }

  /* Core Amortization Calculation */
  function calculateAmortization() {
    var loanAmount = num('amount');
    var annualRate = num('rate');
    var termYears = num('termYears');
    var termMonths = num('termMonths');
    var compound = $('compound') ? $('compound').value : 'monthly';
    var payback = $('payback') ? $('payback').value : 'monthly';

    var startMonth = parseInt($('startMonth') ? $('startMonth').value : '0', 10) || 0;
    var startYear = parseInt($('startYear') ? $('startYear').value : '2026', 10) || 2026;

    var monthlyExtra = num('monthlyExtra');
    var annualExtra = num('annualExtra');
    var oneTimeExtra = num('oneTimeExtra');
    var oneTimePeriod = Math.max(1, Math.round(num('oneTimePeriod')) || 1);

    var periodsPerYear = PAYMENTS_PER_YEAR[payback] || 12;
    var totalMonths = (termYears * 12) + termMonths;
    if (totalMonths <= 0) totalMonths = 12;
    var n = Math.round((totalMonths / 12) * periodsPerYear);

    if (loanAmount <= 0 || n <= 0 || annualRate < 0) {
      return null;
    }

    var rPeriod = calculatePeriodRate(annualRate, compound, payback);
    var regPmt = calcPmt(loanAmount, rPeriod, n);

    /* 1. Baseline calculation (no extra payments) */
    var baseBal = loanAmount;
    var baseTotalInt = 0;
    var basePeriodsCount = 0;
    for (var b = 1; b <= n && baseBal > 0.01; b++) {
      var bInt = baseBal * rPeriod;
      var bPrin = Math.min(baseBal, regPmt - bInt);
      baseTotalInt += bInt;
      baseBal = Math.max(0, baseBal - bPrin);
      basePeriodsCount = b;
    }

    /* 2. Actual calculation (with extra payments) */
    var hasExtras = monthlyExtra > 0 || annualExtra > 0 || oneTimeExtra > 0;
    var bal = loanAmount;
    var actualTotalInt = 0;
    var actualTotalExtra = 0;
    var monthlyRows = [];
    var yearlyRows = {};

    var curDate = new Date(startYear, startMonth, 1);

    for (var i = 1; i <= n && bal > 0.01; i++) {
      var isAnnualPeriod = (i % periodsPerYear === 0);
      var extra = 0;
      if (monthlyExtra > 0) extra += monthlyExtra;
      if (annualExtra > 0 && isAnnualPeriod) extra += annualExtra;
      if (oneTimeExtra > 0 && i === oneTimePeriod) extra += oneTimeExtra;

      actualTotalExtra += extra;

      var interest = bal * rPeriod;
      var regPrin = Math.max(0, regPmt - interest);
      var totalPrin = Math.min(bal, regPrin + extra);
      var actualPaid = totalPrin + interest;

      actualTotalInt += interest;

      var startBal = bal;
      bal = Math.max(0, bal - totalPrin);
      var endBal = bal;

      var y = curDate.getFullYear();
      var mIdx = curDate.getMonth();
      var dateStr = MONTH_SHORT[mIdx] + ' ' + y;

      monthlyRows.push({
        period: i,
        date: dateStr,
        year: y,
        monthIndex: mIdx,
        startBal: startBal,
        payment: actualPaid,
        principal: totalPrin,
        interest: interest,
        extra: extra,
        cumInterest: actualTotalInt,
        endBal: endBal
      });

      // Yearly grouping
      if (!yearlyRows[y]) {
        yearlyRows[y] = {
          year: y,
          startBal: startBal,
          totalPaid: 0,
          principal: 0,
          interest: 0,
          extra: 0,
          cumInterest: actualTotalInt,
          endBal: endBal
        };
      }
      yearlyRows[y].totalPaid += actualPaid;
      yearlyRows[y].principal += totalPrin;
      yearlyRows[y].interest += interest;
      yearlyRows[y].extra += extra;
      yearlyRows[y].cumInterest = actualTotalInt;
      yearlyRows[y].endBal = endBal;

      // Advance date depending on frequency
      if (payback === 'monthly') {
        curDate.setMonth(curDate.getMonth() + 1);
      } else if (payback === 'biweekly') {
        curDate.setDate(curDate.getDate() + 14);
      } else if (payback === 'weekly') {
        curDate.setDate(curDate.getDate() + 7);
      } else if (payback === 'semi-monthly') {
        curDate.setDate(curDate.getDate() + 15);
      } else if (payback === 'quarterly') {
        curDate.setMonth(curDate.getMonth() + 3);
      } else if (payback === 'annually') {
        curDate.setFullYear(curDate.getFullYear() + 1);
      } else {
        curDate.setMonth(curDate.getMonth() + 1);
      }

      if (bal <= 0.01) break;
    }

    var actualPeriods = monthlyRows.length;
    var lastRow = monthlyRows[monthlyRows.length - 1];
    var payoffDateStr = lastRow ? (MONTH_NAMES[lastRow.monthIndex] + ' ' + lastRow.year) : '—';

    var totalCost = loanAmount + actualTotalInt;
    var interestSaved = Math.max(0, baseTotalInt - actualTotalInt);
    var periodsSaved = Math.max(0, basePeriodsCount - actualPeriods);

    return {
      loanAmount: loanAmount,
      annualRate: annualRate,
      termYears: termYears,
      termMonths: termMonths,
      payback: payback,
      compound: compound,
      periodsPerYear: periodsPerYear,
      regPmt: regPmt,
      totalCost: totalCost,
      totalInterest: actualTotalInt,
      totalExtra: actualTotalExtra,
      payoffDateStr: payoffDateStr,
      actualPeriods: actualPeriods,
      basePeriodsCount: basePeriodsCount,
      hasExtras: hasExtras,
      interestSaved: interestSaved,
      periodsSaved: periodsSaved,
      monthlyRows: monthlyRows,
      yearlyRows: yearlyRows
    };
  }

  var lastResult = null;

  /* Render Visual Charts */
  function renderCharts(res) {
    if (!res) return;
    var donutCanvas = $('amortizationDonutChart');
    var balanceCanvas = $('balanceCurveChart');
    var barCanvas = $('annualBarChart');

    // 1. Donut Chart (Principal vs Interest vs Extra)
    if (donutCanvas && window.EMIChart && window.EMIChart.renderDonut) {
      var slices = [
        { name: 'Principal (Loan Amount)', value: res.loanAmount, color: '#2563eb' },
        { name: 'Total Interest', value: res.totalInterest, color: '#f59e0b' }
      ];
      if (res.totalExtra > 0) {
        slices.push({ name: 'Extra Payments', value: res.totalExtra, color: '#10b981' });
      }

      window.EMIChart.renderDonut(donutCanvas, {
        slices: slices,
        centerTitle: 'Total Cost',
        centerValue: fmt(res.totalCost)
      });
    }

    // 2. Balance vs Cumulative Interest Curve (Area chart)
    if (balanceCanvas && window.EMIChart && window.EMIChart.renderArea) {
      var yKeys = Object.keys(res.yearlyRows).sort(function (a, b) { return a - b; });
      var labels = ['Start'];
      var balSeries = [Math.round(res.loanAmount)];
      var intSeries = [0];

      yKeys.forEach(function (y) {
        labels.push(y);
        var row = res.yearlyRows[y];
        balSeries.push(Math.round(row.endBal));
        intSeries.push(Math.round(row.cumInterest));
      });

      window.EMIChart.renderArea(balanceCanvas, {
        labels: labels,
        series: [
          { name: 'Remaining Balance', data: balSeries, color: '#ef4444', fill: 'rgba(239, 68, 68, 0.12)' },
          { name: 'Cumulative Interest Paid', data: intSeries, color: '#f59e0b', fill: 'rgba(245, 158, 11, 0.12)' }
        ]
      });
    }

    // 3. Principal vs Interest by Year (Bar Chart)
    if (barCanvas && window.EMIChart && window.EMIChart.render) {
      var yKeys2 = Object.keys(res.yearlyRows).sort(function (a, b) { return a - b; });
      var barLabels = [];
      var prinData = [];
      var intData = [];

      yKeys2.forEach(function (y) {
        barLabels.push(y.toString().slice(-2));
        var row2 = res.yearlyRows[y];
        prinData.push(Math.round(row2.principal));
        intData.push(Math.round(row2.interest));
      });

      window.EMIChart.render(barCanvas, {
        labels: barLabels,
        series: [
          { name: 'Principal Paid', data: prinData, color: '#2563eb' },
          { name: 'Interest Paid', data: intData, color: '#f59e0b' }
        ]
      });
    }
  }

  /* Render Tables */
  function renderSchedules(res, filterText) {
    if (!res) return;
    var annualBody = $('annualScheduleBody');
    var monthlyBody = $('monthlyScheduleBody');
    var scheduleCount = $('scheduleCount');

    if (scheduleCount) {
      var freqLabel = (res.payback === 'monthly') ? 'months' : 'payments';
      scheduleCount.textContent = res.actualPeriods + ' ' + freqLabel + ' (' + (res.actualPeriods / res.periodsPerYear).toFixed(1) + ' years)';
    }

    // Render Annual Table
    if (annualBody) {
      var yKeys = Object.keys(res.yearlyRows).sort(function (a, b) { return a - b; });
      var annualHtml = '';
      yKeys.forEach(function (y) {
        var row = res.yearlyRows[y];
        annualHtml += '<tr>' +
          '<td><strong>' + row.year + '</strong></td>' +
          '<td class="num">' + fmt(row.startBal) + '</td>' +
          '<td class="num">' + fmt(row.totalPaid) + '</td>' +
          '<td class="num" style="color:#2563eb;font-weight:600;">' + fmt(row.principal) + '</td>' +
          '<td class="num" style="color:#f59e0b;">' + fmt(row.interest) + '</td>' +
          '<td class="num">' + (row.extra > 0 ? ('<span style="color:#10b981;font-weight:600;">' + fmt(row.extra) + '</span>') : '—') + '</td>' +
          '<td class="num"><strong>' + fmt(row.endBal) + '</strong></td>' +
          '<td class="num" style="color:var(--text-muted);">' + fmt(row.cumInterest) + '</td>' +
          '</tr>';
      });
      annualBody.innerHTML = annualHtml;
    }

    // Render Period/Monthly Table (with optional filter)
    if (monthlyBody) {
      var monthlyHtml = '';
      var query = (filterText || '').trim().toLowerCase();
      var rows = res.monthlyRows;

      if (query) {
        rows = rows.filter(function (r) {
          return r.period.toString() === query ||
            r.date.toLowerCase().indexOf(query) !== -1 ||
            r.year.toString().indexOf(query) !== -1;
        });
      }

      if (rows.length === 0) {
        monthlyHtml = '<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text-muted);">No payments match your search filter.</td></tr>';
      } else {
        rows.forEach(function (row) {
          monthlyHtml += '<tr>' +
            '<td>' + row.period + '</td>' +
            '<td><strong>' + row.date + '</strong></td>' +
            '<td class="num">' + fmt(row.payment) + '</td>' +
            '<td class="num" style="color:#2563eb;">' + fmt(row.principal) + '</td>' +
            '<td class="num" style="color:#f59e0b;">' + fmt(row.interest) + '</td>' +
            '<td class="num">' + (row.extra > 0 ? ('<span style="color:#10b981;font-weight:600;">' + fmt(row.extra) + '</span>') : '—') + '</td>' +
            '<td class="num"><strong>' + fmt(row.endBal) + '</strong></td>' +
            '<td class="num" style="color:var(--text-muted);">' + fmt(row.cumInterest) + '</td>' +
            '</tr>';
        });
      }
      monthlyBody.innerHTML = monthlyHtml;
    }
  }

  /* Main Update Routine */
  function update() {
    var res = calculateAmortization();
    var panel = $('resultPanel');

    if (!res) {
      if (panel) panel.classList.remove('show');
      return;
    }

    lastResult = res;
    if (panel) panel.classList.add('show');

    // 1. Payment frequency label
    var pmtLabel = 'Monthly Payment';
    if (res.payback === 'biweekly') pmtLabel = 'Bi-Weekly Payment';
    else if (res.payback === 'weekly') pmtLabel = 'Weekly Payment';
    else if (res.payback === 'semi-monthly') pmtLabel = 'Semi-Monthly Payment';
    else if (res.payback === 'quarterly') pmtLabel = 'Quarterly Payment';
    else if (res.payback === 'annually') pmtLabel = 'Annual Payment';

    setText('resultLabel', pmtLabel);
    setText('resultMain', fmtDec(res.regPmt));
    setText('payoffDateBadge', 'Payoff Date: ' + res.payoffDateStr);

    // 2. Metrics in summary grid
    setText('outLoanAmount', fmt(res.loanAmount));
    setText('outTotalInterest', fmt(res.totalInterest));
    setText('outTotalPayments', fmt(res.totalCost));
    setText('outInterestRate', res.annualRate.toFixed(2) + '%');
    setText('outTotalPeriods', res.actualPeriods + ' payments');
    setText('outPayoffDate', res.payoffDateStr);

    // 3. Donut breakdown bars & percentages
    var total = res.totalCost > 0 ? res.totalCost : 1;
    var prinPct = ((res.loanAmount / total) * 100);
    var intPct = ((res.totalInterest / total) * 100);
    var extraPct = ((res.totalExtra / total) * 100);

    setText('breakdownPrinVal', fmt(res.loanAmount));
    setText('breakdownPrinPct', '(' + prinPct.toFixed(1) + '%)');
    var fillPrin = $('breakdownPrinFill');
    if (fillPrin) fillPrin.style.width = prinPct + '%';

    setText('breakdownIntVal', fmt(res.totalInterest));
    setText('breakdownIntPct', '(' + intPct.toFixed(1) + '%)');
    var fillInt = $('breakdownIntFill');
    if (fillInt) fillInt.style.width = intPct + '%';

    var extraRow = $('breakdownExtraRow');
    if (extraRow) {
      if (res.totalExtra > 0) {
        extraRow.style.display = 'flex';
        setText('breakdownExtraVal', fmt(res.totalExtra));
        setText('breakdownExtraPct', '(' + extraPct.toFixed(1) + '%)');
        var fillExtra = $('breakdownExtraFill');
        if (fillExtra) fillExtra.style.width = extraPct + '%';
      } else {
        extraRow.style.display = 'none';
      }
    }

    // 4. Celebratory Extra Payment Callout Banner
    var extraBanner = $('extraSavingsCallout');
    if (extraBanner) {
      if (res.hasExtras && (res.interestSaved > 0 || res.periodsSaved > 0)) {
        extraBanner.style.display = 'flex';
        var ySaved = Math.floor(res.periodsSaved / res.periodsPerYear);
        var pSaved = res.periodsSaved % res.periodsPerYear;
        var timeStr = '';
        if (ySaved > 0 && pSaved > 0) timeStr = ySaved + ' years and ' + pSaved + ' payments';
        else if (ySaved > 0) timeStr = ySaved + ' years';
        else timeStr = pSaved + ' payments';

        var calloutHtml = '<div class="callout-icon">&#127881;</div>' +
          '<div>' +
          '<h4>Extra Payment Impact: Save ' + fmt(res.interestSaved) + ' in Interest!</h4>' +
          '<p>By making extra payments, your loan will be paid off <strong>' + timeStr + ' earlier</strong> ' +
          '(in ' + (res.actualPeriods / res.periodsPerYear).toFixed(1) + ' years instead of ' +
          (res.basePeriodsCount / res.periodsPerYear).toFixed(1) + ' years), saving you <strong>' +
          fmt(res.interestSaved) + '</strong> in total interest costs.</p>' +
          '</div>';
        extraBanner.innerHTML = calloutHtml;
      } else {
        extraBanner.style.display = 'none';
      }
    }

    // 5. Visual charts and tables
    renderCharts(res);
    var searchInput = $('scheduleSearchInput');
    renderSchedules(res, searchInput ? searchInput.value : '');
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
      ['Payment #', 'Date', 'Payment', 'Principal', 'Interest', 'Extra Payment', 'Ending Balance', 'Cumulative Interest'].join(',')
    ];
    rows.forEach(function (r) {
      lines.push([
        r.period,
        '"' + r.date + '"',
        r.payment.toFixed(2),
        r.principal.toFixed(2),
        r.interest.toFixed(2),
        r.extra.toFixed(2),
        r.endBal.toFixed(2),
        r.cumInterest.toFixed(2)
      ].join(','));
    });
    var blob = new Blob([lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = 'Amortization_Schedule.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* Copy calculation summary to clipboard */
  function copySummary() {
    if (!lastResult) return;
    var r = lastResult;
    var text = "Loan Amortization Summary\n" +
      "---------------------------\n" +
      "Loan Amount: " + fmt(r.loanAmount) + "\n" +
      "Interest Rate: " + r.annualRate.toFixed(2) + "%\n" +
      "Loan Term: " + r.termYears + " Years " + (r.termMonths > 0 ? (r.termMonths + " Months") : "") + "\n" +
      "Payment Frequency: " + r.payback + "\n" +
      "Regular Payment: " + fmtDec(r.regPmt) + "\n" +
      "Total Interest: " + fmt(r.totalInterest) + "\n" +
      "Total Cost of Loan: " + fmt(r.totalCost) + "\n" +
      "Estimated Payoff Date: " + r.payoffDateStr + "\n" +
      (r.hasExtras ? ("Total Interest Saved: " + fmt(r.interestSaved) + "\n") : "") +
      "\nCalculated on: " + window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (window.showToast) window.showToast('Amortization summary copied to clipboard!');
      });
    } else {
      var tmp = document.createElement('textarea');
      tmp.value = text;
      document.body.appendChild(tmp);
      tmp.select();
      document.execCommand('copy');
      document.body.removeChild(tmp);
      if (window.showToast) window.showToast('Amortization summary copied to clipboard!');
    }
  }

  /* Preset Loaders */
  function applyPreset(type) {
    var amt = $('amount');
    var amtR = $('amountRange');
    var rate = $('rate');
    var rateR = $('rateRange');
    var termY = $('termYears');
    var termYR = $('termYearsRange');
    var termM = $('termMonths');
    var pay = $('payback');
    var comp = $('compound');

    if (type === 'mortgage30') {
      if (amt) amt.value = 400000;
      if (amtR) amtR.value = 400000;
      if (rate) rate.value = 6.5;
      if (rateR) rateR.value = 6.5;
      if (termY) termY.value = 30;
      if (termYR) termYR.value = 30;
      if (termM) termM.value = 0;
      if (pay) pay.value = 'monthly';
      if (comp) comp.value = 'monthly';
    } else if (type === 'mortgage15') {
      if (amt) amt.value = 300000;
      if (amtR) amtR.value = 300000;
      if (rate) rate.value = 6.0;
      if (rateR) rateR.value = 6.0;
      if (termY) termY.value = 15;
      if (termYR) termYR.value = 15;
      if (termM) termM.value = 0;
      if (pay) pay.value = 'monthly';
      if (comp) comp.value = 'monthly';
    } else if (type === 'auto5') {
      if (amt) amt.value = 35000;
      if (amtR) amtR.value = 35000;
      if (rate) rate.value = 5.5;
      if (rateR) rateR.value = 5.5;
      if (termY) termY.value = 5;
      if (termYR) termYR.value = 5;
      if (termM) termM.value = 0;
      if (pay) pay.value = 'monthly';
      if (comp) comp.value = 'monthly';
    } else if (type === 'personal3') {
      if (amt) amt.value = 15000;
      if (amtR) amtR.value = 15000;
      if (rate) rate.value = 9.5;
      if (rateR) rateR.value = 9.5;
      if (termY) termY.value = 3;
      if (termYR) termYR.value = 3;
      if (termM) termM.value = 0;
      if (pay) pay.value = 'monthly';
      if (comp) comp.value = 'monthly';
    }
    update();
  }

  /* Initialization */
  function init() {
    initDates();

    bindRange('amount', 'amountRange');
    bindRange('rate', 'rateRange');
    bindRange('termYears', 'termYearsRange');

    ['termMonths', 'monthlyExtra', 'annualExtra', 'oneTimeExtra', 'oneTimePeriod'].forEach(function (id) {
      var el = $(id);
      if (el) el.addEventListener('input', update);
    });

    ['compound', 'payback', 'startMonth', 'startYear'].forEach(function (id) {
      var el = $(id);
      if (el) el.addEventListener('change', update);
    });

    // Preset pills
    document.querySelectorAll('.preset-pill-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.preset-pill-btn').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        applyPreset(btn.dataset.preset);
      });
    });

    // Term Quick Presets
    document.querySelectorAll('.term-opt-pill').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.term-opt-pill').forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var val = parseFloat(btn.dataset.term) || 30;
        var termInput = $('termYears');
        var termRange = $('termYearsRange');
        var termM = $('termMonths');
        if (termInput) termInput.value = val;
        if (termRange) termRange.value = val;
        if (termM) termM.value = 0;
        update();
      });
    });

    // Search filter in amortization table
    var searchInput = $('scheduleSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        if (lastResult) renderSchedules(lastResult, searchInput.value);
      });
    }

    // Action buttons
    var calcBtn = $('calculateBtn');
    if (calcBtn) calcBtn.addEventListener('click', update);

    var resetBtn = $('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        applyPreset('mortgage30');
        var me = $('monthlyExtra'); if (me) me.value = 0;
        var ae = $('annualExtra'); if (ae) ae.value = 0;
        var oe = $('oneTimeExtra'); if (oe) oe.value = 0;
        document.querySelectorAll('.preset-pill-btn').forEach(function (b) {
          b.classList.toggle('active', b.dataset.preset === 'mortgage30');
        });
        document.querySelectorAll('.term-opt-pill').forEach(function (b) {
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

    // Tab Switchers: Annual vs Monthly Schedule
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

    // Tab Switchers: Visual Charts (Balance Curve vs Principal/Interest Bar)
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

    window.addEventListener('localechange', update);

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
