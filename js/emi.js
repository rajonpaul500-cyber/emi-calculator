/* ==========================================================================
   EMI Master - Calculator engine
   Handles: EMI, amortization schedule, extra payments, home/car/personal
   loan variants, DPS/FDR savings, CSV export, live results.
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  function fmt(v) {
    return '₹' + Math.round(v).toLocaleString('en-IN');
  }

  var PAYMENTS_PER_YEAR = { monthly: 12, 'semi-monthly': 24, biweekly: 26, weekly: 52 };
  var COMPOUND_PER_YEAR = { monthly: 12, quarterly: 4, 'semi-annually': 2, annually: 1, continuous: 0 };

  function num(id) {
    var el = $(id);
    return el ? (parseFloat(el.value) || 0) : 0;
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text;
  }

  function periodRate(annualRate, compound, payback) {
    var m = COMPOUND_PER_YEAR[compound];
    var p = PAYMENTS_PER_YEAR[payback] || 12;
    var effAnnual;
    if (m === 0) {
      effAnnual = Math.exp(annualRate) - 1;
    } else {
      effAnnual = Math.pow(1 + annualRate / m, m) - 1;
    }
    return Math.pow(1 + effAnnual, 1 / p) - 1;
  }

  function payment(P, r, n) {
    if (P <= 0 || n <= 0) return 0;
    if (r === 0) return P / n;
    var f = Math.pow(1 + r, n);
    return (P * r * f) / (f - 1);
  }

  function buildSchedule(P, r, n, reg, oneTime, oneTimeMonth, monthlyExtra) {
    var rows = [];
    var balance = P;
    var totalInterest = 0;
    for (var i = 1; i <= n && balance > 0.01; i++) {
      var extra = 0;
      if (monthlyExtra > 0) extra += monthlyExtra;
      if (oneTime > 0 && i === oneTimeMonth) extra += oneTime;
      var interest = balance * r;
      var paid = Math.min(reg + extra, balance + interest);
      var principal = paid - interest;
      totalInterest += interest;
      balance = Math.max(0, balance - principal);
      rows.push({ month: i, payment: paid, principal: principal, interest: interest, extra: extra, balance: balance });
      if (balance <= 0.01) break;
    }
    return { rows: rows, totalInterest: totalInterest, totalPaid: P + totalInterest, months: rows.length };
  }

  function monthsLabel(m) {
    var y = Math.floor(m / 12);
    var mm = m % 12;
    if (y === 0) return mm + ' month' + (mm === 1 ? '' : 's');
    if (mm === 0) return y + ' year' + (y === 1 ? '' : 's');
    return y + ' year' + (y === 1 ? '' : 's') + ' ' + mm + ' months';
  }

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

  function bindSelect(id) {
    var el = $(id);
    if (el) el.addEventListener('change', update);
  }

  function showResultPanel() {
    var panel = $('resultPanel');
    if (panel) panel.classList.add('show');
  }

  function renderSchedule(result) {
    var tbody = $('scheduleBody');
    var tfoot = $('scheduleFoot');
    var count = $('scheduleCount');
    var downloadBtn = $('downloadCsv');
    if (!tbody) return;

    var rows = result.sched.rows;

    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Enter valid loan details to see the amortization schedule.</td></tr>';
      if (tfoot) tfoot.innerHTML = '';
      if (count) count.textContent = '';
      return;
    }

    tbody.innerHTML = rows.map(function (row) {
      return '<tr>' +
        '<td>' + row.month + '</td>' +
        '<td class="num">' + fmt(row.payment) + '</td>' +
        '<td class="num">' + fmt(row.principal) + '</td>' +
        '<td class="num">' + fmt(row.interest) + '</td>' +
        '<td class="num">' + (row.extra > 0 ? fmt(row.extra) : '—') + '</td>' +
        '<td class="num">' + fmt(row.balance) + '</td>' +
        '</tr>';
    }).join('');

    if (tfoot) {
      var totalPayment = rows.reduce(function (s, r) { return s + r.payment; }, 0);
      var totalInterest = rows.reduce(function (s, r) { return s + r.interest; }, 0);
      tfoot.innerHTML =
        '<tr><td>Total</td>' +
        '<td class="num">' + fmt(totalPayment) + '</td>' +
        '<td class="num">' + fmt(totalPayment - totalInterest) + '</td>' +
        '<td class="num">' + fmt(totalInterest) + '</td>' +
        '<td class="num">' + fmt(rows.reduce(function (s, r) { return s + r.extra; }, 0)) + '</td>' +
        '<td class="num">—</td></tr>';
    }

    if (count) {
      count.textContent = rows.length + ' of ' + result.n + ' payments';
    }

    if (downloadBtn) {
      downloadBtn.onclick = function () {
        var header = ['Month', 'Payment', 'Principal', 'Interest', 'Extra Payment', 'Balance'];
        var csv = [header.join(',')]
          .concat(rows.map(function (r) {
            return [r.month, r.payment.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2), r.extra.toFixed(2), r.balance.toFixed(2)].join(',');
          }))
          .join('\n');
        var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'emi-master-amortization-schedule.csv';
        a.click();
        URL.revokeObjectURL(a.href);
      };
    }
  }

  function renderSavings(result) {
    var tbody = $('savingsBody');
    var tfoot = $('savingsFoot');
    var count = $('scheduleCount');
    var downloadBtn = $('downloadCsv');
    if (!tbody) return;

    var rows = result.sched.rows;

    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="4" class="empty-state">Enter valid deposit details to see the growth schedule.</td></tr>';
      if (tfoot) tfoot.innerHTML = '';
      if (count) count.textContent = '';
      return;
    }

    tbody.innerHTML = rows.map(function (row) {
      return '<tr>' +
        '<td>' + row.month + '</td>' +
        '<td class="num">' + (row.deposit > 0 ? fmt(row.deposit) : '—') + '</td>' +
        '<td class="num">' + fmt(row.interest) + '</td>' +
        '<td class="num">' + fmt(row.balance) + '</td>' +
        '</tr>';
    }).join('');

    if (tfoot) {
      var totalDeposit = rows.reduce(function (s, r) { return s + r.deposit; }, 0);
      var totalInterest = rows.reduce(function (s, r) { return s + r.interest; }, 0);
      tfoot.innerHTML =
        '<tr><td>Total</td>' +
        '<td class="num">' + fmt(totalDeposit) + '</td>' +
        '<td class="num">' + fmt(totalInterest) + '</td>' +
        '<td class="num">' + fmt(rows[rows.length - 1].balance) + '</td></tr>';
    }

    if (count) {
      count.textContent = rows.length + ' months';
    }

    if (downloadBtn) {
      downloadBtn.onclick = function () {
        var header = ['Month', 'Deposit', 'Interest', 'Balance'];
        var csv = [header.join(',')]
          .concat(rows.map(function (r) {
            return [r.month, r.deposit.toFixed(2), r.interest.toFixed(2), r.balance.toFixed(2)].join(',');
          }))
          .join('\n');
        var blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'emi-master-savings-schedule.csv';
        a.click();
        URL.revokeObjectURL(a.href);
      };
    }
  }

  function updateSavings() {
    var config = window.calcConfig || { type: 'dps' };
    var type = config.type || 'dps';
    var compoundEl = $('compound');
    var compound = compoundEl ? compoundEl.value : 'monthly';

    var deposit = num('amount');
    var rate = num('rate');
    var years = num('term');
    var n = Math.round(years * 12);
    var i = periodRate(rate / 100, compound, 'monthly');

    var invalid = !(deposit > 0 && rate >= 0 && years > 0);

    var maturity;
    var totalDeposited;
    var rows = [];

    if (type === 'dps') {
      totalDeposited = deposit * n;
      if (i === 0) {
        maturity = totalDeposited;
      } else {
        maturity = deposit * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
      }
      var balance = 0;
      for (var m = 1; m <= n; m++) {
        balance += deposit;
        var interest = balance * i;
        balance += interest;
        rows.push({ month: m, deposit: deposit, interest: interest, balance: balance });
      }
    } else {
      totalDeposited = deposit;
      if (i === 0) {
        maturity = deposit;
      } else {
        maturity = deposit * Math.pow(1 + i, n);
      }
      var bal2 = deposit;
      for (var m2 = 1; m2 <= n; m2++) {
        var int2 = bal2 * i;
        bal2 += int2;
        rows.push({ month: m2, deposit: 0, interest: int2, balance: bal2 });
      }
    }

    var totalInterest = maturity - totalDeposited;
    var interestPct = totalDeposited > 0 ? (totalInterest / totalDeposited) * 100 : 0;

    var result = { type: type, maturity: maturity, totalDeposited: totalDeposited, totalInterest: totalInterest, interestPct: interestPct, n: n, sched: { rows: rows } };

    setText('resultMain', invalid ? '—' : fmt(maturity));
    setText('resultLabel', 'Maturity Amount');
    setText('loanAmountOut', invalid ? '—' : fmt(totalDeposited));
    setText('totalInterestOut', invalid ? '—' : fmt(totalInterest));
    setText('totalPaymentOut', invalid ? '—' : interestPct.toFixed(2) + '%');
    showResultPanel();

    renderSavings(result);
  }

  function update() {
    var config = window.calcConfig || { type: 'loan' };
    var type = config.type || 'loan';

    if (type === 'dps' || type === 'fdr') {
      updateSavings();
      return;
    }

    var base = num('amount');
    var rate = num('rate');
    var years = num('term');

    var paybackEl = $('payback');
    var compoundEl = $('compound');
    var payback = paybackEl ? paybackEl.value : 'monthly';
    var compound = compoundEl ? compoundEl.value : 'monthly';

    var oneTime = num('oneTimeExtra');
    var oneTimeMonth = Math.max(1, Math.round(num('oneTimeMonth')) || 1);
    var monthlyExtra = num('monthlyExtra');

    var principal = base;
    var fee = 0;
    var disbursed = base;

    if (type === 'car') {
      var down = num('downPayment');
      var tradeIn = num('tradeIn');
      var taxPct = num('salesTax');
      var fees = num('fees');
      var taxable = Math.max(0, base - tradeIn);
      principal = Math.max(0, taxable * (1 + taxPct / 100) + fees - down);
    }

    if (type === 'personal') {
      var feePct = num('feePct');
      fee = base * (feePct / 100);
      disbursed = Math.max(0, base - fee);
    }

    var homeExtras = type === 'home';
    var taxAnnual = homeExtras ? num('propertyTax') : 0;
    var insuranceAnnual = homeExtras ? num('insurance') : 0;
    var pmiRate = homeExtras ? num('pmiRate') : 0;
    var hoaMonthly = homeExtras ? num('hoa') : 0;
    var nonEMI = homeExtras
      ? (taxAnnual + insuranceAnnual) / 12 + (principal * (pmiRate / 100)) / 12 + hoaMonthly
      : 0;

    var n = Math.round(years * (PAYMENTS_PER_YEAR[payback] || 12));
    var r = periodRate(rate / 100, compound, payback);
    var reg = payment(principal, r, n);

    var regTotalInterest = reg * n - principal;

    var hasExtras = monthlyExtra > 0 || oneTime > 0;
    var sched;
    if (hasExtras) {
      sched = buildSchedule(principal, r, n, reg, oneTime, oneTimeMonth, monthlyExtra);
    } else {
      sched = buildSchedule(principal, r, n, reg, 0, 1, 0);
    }

    var result = {
      principal: principal,
      reg: reg,
      n: n,
      r: r,
      sched: sched,
      regTotalInterest: regTotalInterest,
      actualTotalInterest: sched.totalInterest,
      actualMonths: sched.months,
      interestSaved: Math.max(0, regTotalInterest - sched.totalInterest),
      monthsSaved: Math.max(0, n - sched.months),
      fee: fee,
      disbursed: disbursed,
      nonEMI: nonEMI,
      hasExtras: hasExtras,
      type: type,
      base: base
    };

    var invalid = !(principal > 0 && rate >= 0 && years > 0);

    setText('resultMain', invalid ? '—' : fmt(result.type === 'home' ? reg + nonEMI : reg));
    setText('resultLabel',
      invalid ? '' :
      result.type === 'home' ? 'Total Monthly Payment' :
      result.type === 'loan' ? 'Monthly Payment (EMI)' :
      'Monthly Payment');

    setText('loanAmountOut', invalid ? '—' : fmt(result.type === 'personal' ? disbursed : principal));
    if (homeExtras) {
      setText('emiOnlyOut', invalid ? '—' : fmt(reg));
      setText('nonEMIOut', invalid ? '—' : fmt(nonEMI));
    }
    if (result.type === 'personal') {
      setText('feeOut', invalid ? '—' : fmt(fee));
    }

    if (!invalid) {
      var totalPayment = sched.totalPaid + (result.type === 'personal' ? fee : 0);
      setText('totalPaymentOut', fmt(totalPayment));
      setText('totalInterestOut', fmt(sched.totalInterest + (result.type === 'personal' ? fee : 0)));
    } else {
      setText('totalPaymentOut', '—');
      setText('totalInterestOut', '—');
    }

    var note = $('payoffNote');
    if (note) {
      if (hasExtras && !invalid && result.monthsSaved > 0) {
        note.textContent = 'Paid off in ' + monthsLabel(result.actualMonths) +
          ' — saves ' + monthsLabel(result.monthsSaved) + ' and ' + fmt(result.interestSaved) + ' in interest.';
        note.classList.add('show');
      } else {
        note.classList.remove('show');
      }
    }

    showResultPanel();
    renderCompare(result);
    renderSchedule(result);
  }

  function renderCompare(result) {
    var withoutEl = $('cmpWithoutPayment');
    var withEl = $('cmpWithPayment');
    var banner = $('saveBanner');
    if (!withoutEl) return;

    var invalid = !(result.principal > 0 && result.reg > 0);
    if (invalid) {
      setText('cmpWithoutMonths', '—');
      setText('cmpWithoutInterest', '—');
      setText('cmpWithoutTotal', '—');
      setText('cmpWithMonths', '—');
      setText('cmpWithInterest', '—');
      setText('cmpWithTotal', '—');
      withoutEl.textContent = '—';
      withEl.textContent = '—';
      if (banner) banner.style.display = 'none';
      return;
    }

    var withoutTotalInterest = result.regTotalInterest;
    var withoutTotal = result.reg * result.n + (result.type === 'personal' ? result.fee : 0);
    var withMonthly = result.reg + num('monthlyExtra');
    var withTotal = result.sched.totalPaid + (result.type === 'personal' ? result.fee : 0);

    withoutEl.textContent = fmt(result.reg);
    setText('cmpWithoutMonths', monthsLabel(result.n));
    setText('cmpWithoutInterest', fmt(withoutTotalInterest));
    setText('cmpWithoutTotal', fmt(withoutTotal));

    withEl.textContent = fmt(withMonthly);
    setText('cmpWithMonths', monthsLabel(result.actualMonths));
    setText('cmpWithInterest', fmt(result.actualTotalInterest));
    setText('cmpWithTotal', fmt(withTotal));

    if (banner) {
      if (result.hasExtras && result.monthsSaved > 0) {
        banner.style.display = 'block';
        setText('saveBannerText',
          'Add extra payments and you will pay off your loan ' + monthsLabel(result.monthsSaved) +
          ' earlier, saving ' + fmt(result.interestSaved) + ' in interest.');
      } else {
        banner.style.display = 'none';
      }
    }
  }

  function resetDefaults() {
    var config = window.calcConfig || { type: 'loan' };
    var d = config.defaults || {};
    var map = { amount: d.amount, rate: d.rate, term: d.term };
    Object.keys(map).forEach(function (id) {
      var el = $(id);
      if (el && map[id] !== undefined) el.value = map[id];
      var range = $(id + 'Range');
      if (range && map[id] !== undefined) range.value = map[id];
    });
    var extras = ['oneTimeExtra', 'oneTimeMonth', 'monthlyExtra',
      'downPayment', 'tradeIn', 'salesTax', 'fees',
      'propertyTax', 'insurance', 'pmiRate', 'hoa', 'feePct'];
    extras.forEach(function (id) {
      var el = $(id);
      if (el) el.value = 0;
    });
    var otm = $('oneTimeMonth');
    if (otm) otm.value = 1;
    update();
  }

  function init() {
    bindRange('amount', 'amountRange');
    bindRange('rate', 'rateRange');
    bindRange('term', 'termRange');
    bindSelect('compound');
    bindSelect('payback');

    var extraFields = ['oneTimeExtra', 'oneTimeMonth', 'monthlyExtra',
      'downPayment', 'tradeIn', 'salesTax', 'fees',
      'propertyTax', 'insurance', 'pmiRate', 'hoa', 'feePct'];
    extraFields.forEach(function (id) {
      var el = $(id);
      if (el) el.addEventListener('input', update);
    });

    var calcBtn = $('calculateBtn');
    if (calcBtn) calcBtn.addEventListener('click', update);

    var resetBtn = $('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetDefaults);

    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
