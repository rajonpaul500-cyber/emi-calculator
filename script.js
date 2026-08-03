/* ============================================================
   EMIMaster — shared calculator engine
   Handles: EMI, amortization schedule, extra payments,
   home/car/personal loan variants, CSV export, mobile nav.
   ============================================================ */

(function () {
  'use strict';

  const $ = (id) => document.getElementById(id);

  const fmt = (v) => '₹' + Math.round(v).toLocaleString('en-IN');

  const PAYMENTS_PER_YEAR = { monthly: 12, 'semi-monthly': 24, biweekly: 26, weekly: 52 };
  const COMPOUND_PER_YEAR = { monthly: 12, quarterly: 4, 'semi-annually': 2, annually: 1, continuous: 0 };

  function num(id) {
    const el = $(id);
    return el ? (parseFloat(el.value) || 0) : 0;
  }

  function setText(id, text) {
    const el = $(id);
    if (el) el.textContent = text;
  }

  function periodRate(annualRate, compound, payback) {
    const m = COMPOUND_PER_YEAR[compound];
    const p = PAYMENTS_PER_YEAR[payback] || 12;
    let effAnnual;
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
    const f = Math.pow(1 + r, n);
    return (P * r * f) / (f - 1);
  }

  function buildSchedule(P, r, n, reg, oneTime, oneTimeMonth, monthlyExtra) {
    const rows = [];
    let balance = P;
    let totalInterest = 0;
    for (let i = 1; i <= n && balance > 0.01; i++) {
      let extra = 0;
      if (monthlyExtra > 0) extra += monthlyExtra;
      if (oneTime > 0 && i === oneTimeMonth) extra += oneTime;
      const interest = balance * r;
      const paid = Math.min(reg + extra, balance + interest);
      const principal = paid - interest;
      totalInterest += interest;
      balance = Math.max(0, balance - principal);
      rows.push({ month: i, payment: paid, principal, interest, extra, balance });
      if (balance <= 0.01) break;
    }
    return { rows, totalInterest, totalPaid: P + totalInterest, months: rows.length };
  }

  function monthsLabel(m) {
    const y = Math.floor(m / 12);
    const mm = m % 12;
    if (y === 0) return mm + ' month' + (mm === 1 ? '' : 's');
    if (mm === 0) return y + ' year' + (y === 1 ? '' : 's');
    return y + ' year' + (y === 1 ? '' : 's') + ' ' + mm + ' months';
  }

  function bindRange(id, rangeId, min, max) {
    const input = $(id);
    const range = $(rangeId);
    if (!input || !range) return;
    input.addEventListener('input', () => {
      let v = parseFloat(input.value);
      if (!isNaN(v)) range.value = Math.min(max, Math.max(min, v));
      update();
    });
    range.addEventListener('input', () => {
      input.value = range.value;
      update();
    });
  }

  function bindSelect(id) {
    const el = $(id);
    if (el) el.addEventListener('change', update);
  }

  function renderSchedule(result) {
    const tbody = $('scheduleBody');
    const tfoot = $('scheduleFoot');
    const count = $('scheduleCount');
    const downloadBtn = $('downloadCsv');
    if (!tbody) return;

    const rows = result.sched.rows;

    if (!rows.length) {
      tbody.innerHTML = '<tr><td colspan="6" class="empty-state">Enter valid loan details to see the amortization schedule.</td></tr>';
      if (tfoot) tfoot.innerHTML = '';
      if (count) count.textContent = '';
      return;
    }

    tbody.innerHTML = rows.map((row) =>
      '<tr>' +
      '<td>' + row.month + '</td>' +
      '<td>' + fmt(row.payment) + '</td>' +
      '<td>' + fmt(row.principal) + '</td>' +
      '<td>' + fmt(row.interest) + '</td>' +
      '<td>' + (row.extra > 0 ? fmt(row.extra) : '—') + '</td>' +
      '<td>' + fmt(row.balance) + '</td>' +
      '</tr>'
    ).join('');

    if (tfoot) {
      const totalPayment = rows.reduce((s, r) => s + r.payment, 0);
      const totalInterest = rows.reduce((s, r) => s + r.interest, 0);
      tfoot.innerHTML =
        '<tr><td>Total</td>' +
        '<td>' + fmt(totalPayment) + '</td>' +
        '<td>' + fmt(totalPayment - totalInterest) + '</td>' +
        '<td>' + fmt(totalInterest) + '</td>' +
        '<td>' + fmt(rows.reduce((s, r) => s + r.extra, 0)) + '</td>' +
        '<td>—</td></tr>';
    }

    if (count) {
      count.textContent = rows.length + ' of ' + result.n + ' payments';
    }

    if (downloadBtn) {
      downloadBtn.onclick = function () {
        const header = ['Month', 'Payment', 'Principal', 'Interest', 'Extra Payment', 'Balance'];
        const csv = [header.join(',')]
          .concat(rows.map((r) =>
            [r.month, r.payment.toFixed(2), r.principal.toFixed(2), r.interest.toFixed(2), r.extra.toFixed(2), r.balance.toFixed(2)].join(',')
          ))
          .join('\n');
        const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'emi-master-amortization-schedule.csv';
        a.click();
        URL.revokeObjectURL(a.href);
      };
    }
  }

  function update() {
    const config = window.calcConfig || { type: 'loan' };
    const type = config.type || 'loan';

    const base = num('amount');
    const rate = num('rate');
    const years = num('term');

    const paybackEl = $('payback');
    const compoundEl = $('compound');
    const payback = paybackEl ? paybackEl.value : 'monthly';
    const compound = compoundEl ? compoundEl.value : 'monthly';

    const oneTime = num('oneTimeExtra');
    const oneTimeMonth = Math.max(1, Math.round(num('oneTimeMonth')) || 1);
    const monthlyExtra = num('monthlyExtra');

    let principal = base;
    let fee = 0;
    let disbursed = base;

    if (type === 'car') {
      const down = num('downPayment');
      const tradeIn = num('tradeIn');
      const taxPct = num('salesTax');
      const fees = num('fees');
      const taxable = Math.max(0, base - tradeIn);
      principal = Math.max(0, taxable * (1 + taxPct / 100) + fees - down);
    }

    if (type === 'personal') {
      const feePct = num('feePct');
      fee = base * (feePct / 100);
      disbursed = Math.max(0, base - fee);
    }

    const homeExtras = type === 'home';
    const taxAnnual = homeExtras ? num('propertyTax') : 0;
    const insuranceAnnual = homeExtras ? num('insurance') : 0;
    const pmiRate = homeExtras ? num('pmiRate') : 0;
    const hoaMonthly = homeExtras ? num('hoa') : 0;
    const nonEMI = homeExtras
      ? (taxAnnual + insuranceAnnual) / 12 + (principal * (pmiRate / 100)) / 12 + hoaMonthly
      : 0;

    const n = Math.round(years * (PAYMENTS_PER_YEAR[payback] || 12));
    const r = periodRate(rate / 100, compound, payback);
    const reg = payment(principal, r, n);

    const regTotalInterest = reg * n - principal;

    let sched;
    const hasExtras = monthlyExtra > 0 || oneTime > 0;
    if (hasExtras) {
      sched = buildSchedule(principal, r, n, reg, oneTime, oneTimeMonth, monthlyExtra);
    } else {
      sched = buildSchedule(principal, r, n, reg, 0, 1, 0);
    }

    const result = {
      principal,
      reg,
      n,
      r,
      sched,
      regTotalInterest,
      actualTotalInterest: sched.totalInterest,
      actualMonths: sched.months,
      interestSaved: Math.max(0, regTotalInterest - sched.totalInterest),
      monthsSaved: Math.max(0, n - sched.months),
      fee,
      disbursed,
      nonEMI,
      hasExtras,
      type,
      base
    };

    const invalid = !(principal > 0 && rate >= 0 && years > 0);

    const bigEl = $('paymentOut');
    const labelEl = $('paymentLabel');
    if (bigEl) {
      bigEl.textContent = invalid ? '—' : fmt(result.type === 'home' ? reg + nonEMI : reg);
    }
    if (labelEl) {
      labelEl.textContent =
        invalid ? '' :
        result.type === 'home' ? 'Total Monthly Payment' :
        result.type === 'loan' ? 'Monthly Payment (EMI)' :
        'Monthly Payment';
    }

    setText('loanAmountOut', invalid ? '—' : fmt(result.type === 'personal' ? disbursed : principal));
    if (homeExtras) {
      setText('emiOnlyOut', invalid ? '—' : fmt(reg));
      setText('nonEMIOut', invalid ? '—' : fmt(nonEMI));
    }
    if (result.type === 'personal') {
      setText('feeOut', invalid ? '—' : fmt(fee));
    }

    if (!invalid) {
      const totalPayment = sched.totalPaid + (result.type === 'personal' ? fee : 0);
      setText('totalPaymentOut', fmt(totalPayment));
      setText('totalInterestOut', fmt(sched.totalInterest + (result.type === 'personal' ? fee : 0)));
    } else {
      setText('totalPaymentOut', '—');
      setText('totalInterestOut', '—');
    }

    const pBar = $('principalBar');
    const iBar = $('interestBar');
    if (pBar && iBar) {
      const total = sched.totalPaid;
      const pct = total > 0 ? (principal / total) * 100 : 0;
      pBar.style.width = pct + '%';
      iBar.style.width = (100 - pct) + '%';
      setText('legendPrincipal', invalid ? '—' : fmt(principal));
      setText('legendInterest', invalid ? '—' : fmt(sched.totalInterest));
    }

    const note = $('payoffNote');
    if (note) {
      if (hasExtras && !invalid && result.monthsSaved > 0) {
        note.textContent = 'Paid off in ' + monthsLabel(result.actualMonths) +
          ' — saves ' + monthsLabel(result.monthsSaved) + ' and ' + fmt(result.interestSaved) + ' in interest.';
        note.classList.add('show');
      } else {
        note.classList.remove('show');
      }
    }

    renderCompare(result);
    renderSchedule(result);
  }

  function renderCompare(result) {
    const withoutEl = $('cmpWithoutPayment');
    const withEl = $('cmpWithPayment');
    const banner = $('saveBanner');
    if (!withoutEl) return;

    const invalid = !(result.principal > 0 && result.reg > 0);
    if (invalid) {
      setText('cmpWithoutMonths', '—');
      setText('cmpWithoutInterest', '—');
      setText('cmpWithoutTotal', '—');
      setText('cmpWithMonths', '—');
      setText('cmpWithInterest', '—');
      setText('cmpWithTotal', '—');
      setText('cmpWithPayment', '—');
      withoutEl.textContent = '—';
      if (banner) banner.style.display = 'none';
      return;
    }

    const withoutTotalInterest = result.regTotalInterest;
    const withoutTotal = result.reg * result.n + (result.type === 'personal' ? result.fee : 0);
    const withMonthly = result.reg + num('monthlyExtra');
    const withTotalInterest = result.actualTotalInterest;
    const withTotal = result.sched.totalPaid + (result.type === 'personal' ? result.fee : 0);

    withoutEl.textContent = fmt(result.reg);
    setText('cmpWithoutMonths', monthsLabel(result.n));
    setText('cmpWithoutInterest', fmt(withoutTotalInterest));
    setText('cmpWithoutTotal', fmt(withoutTotal));

    withEl.textContent = fmt(withMonthly);
    setText('cmpWithMonths', monthsLabel(result.actualMonths));
    setText('cmpWithInterest', fmt(withTotalInterest));
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

  function initNav() {
    const toggle = $('navToggle');
    const nav = $('siteNav');
    if (toggle && nav) {
      toggle.addEventListener('click', () => nav.classList.toggle('open'));
    }
  }

  function init() {
    initNav();

    bindRange('amount', 'amountRange', 10000, 10000000);
    bindRange('rate', 'rateRange', 0.5, 30);
    bindRange('term', 'termRange', 1, 30);
    bindSelect('compound');
    bindSelect('payback');

    const extraFields = ['oneTimeExtra', 'oneTimeMonth', 'monthlyExtra',
      'downPayment', 'tradeIn', 'salesTax', 'fees',
      'propertyTax', 'insurance', 'pmiRate', 'hoa', 'feePct'];
    extraFields.forEach((id) => {
      const el = $(id);
      if (el) el.addEventListener('input', update);
    });

    update();
  }

  document.addEventListener('DOMContentLoaded', init);
})();
