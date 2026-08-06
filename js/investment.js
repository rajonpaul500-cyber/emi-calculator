/* ==========================================================================
   EMI Master - Investment & finance calculator engine
   Covers: interest, compound interest, investment, savings goal, simple
   interest, interest rate, CD, bond, mutual fund, average return, IRR,
   ROI, payback period, present value, future value, finance (TVM).
   Dispatched by window.calcConfig.type.
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  function fmt(v) {
    return '$' + Math.round(v).toLocaleString('en-IN');
  }

  function fmt1(v) {
    return Number(v).toLocaleString('en-IN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  }

  function num(id) {
    var el = $(id);
    return el ? (parseFloat(el.value) || 0) : 0;
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text;
  }

  function showPanel() {
    var p = $('resultPanel');
    if (p) p.classList.add('show');
  }

  function compoundsPerYear(compound) {
    var map = {
      monthly: 12,
      quarterly: 4,
      'semi-annually': 2,
      annually: 1,
      continuous: 0
    };
    return map[compound] !== undefined ? map[compound] : 12;
  }

  function effectiveAnnual(annual, compound) {
    var n = compoundsPerYear(compound);
    if (n === 0) return Math.exp(annual / 100) - 1;
    return Math.pow(1 + annual / 100 / n, n) - 1;
  }

  function monthlyRate(annual, compound) {
    var eff = effectiveAnnual(annual, compound);
    return Math.pow(1 + eff, 1 / 12) - 1;
  }

  function payment(P, r, n) {
    if (P <= 0 || n <= 0) return 0;
    if (r === 0) return P / n;
    var f = Math.pow(1 + r, n);
    return (P * r * f) / (f - 1);
  }

  function solveMonthlyRate(P, pmt, n) {
    if (P <= 0 || pmt <= 0 || n <= 0) return 0;
    var lo = 0;
    var hi = 1;
    while (hi < 1 && payment(P, hi, n) < pmt) hi *= 2;
    for (var k = 0; k < 150; k++) {
      var mid = (lo + hi) / 2;
      if (payment(P, mid, n) > pmt) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2;
  }

  /* ---------- Individual calculators ---------- */

  function calcInterest() {
    var p = num('principal');
    var rate = num('rate');
    var years = num('years');
    var compound = $('compound') ? $('compound').value : 'monthly';
    var interest, maturity, eff;

    if (compound === 'simple') {
      interest = p * rate / 100 * years;
      maturity = p + interest;
      eff = rate;
    } else {
      var effA = effectiveAnnual(rate, compound);
      maturity = p * Math.pow(1 + effA, years);
      interest = maturity - p;
      eff = effA * 100;
    }

    setText('resultMain', fmt(interest));
    setText('resultLabel', 'Total Interest');
    setText('rMaturity', fmt(maturity));
    setText('rEff', eff.toFixed(2) + '%');
    showPanel();
  }

  function calcCompound() {
    var p = num('principal');
    var c = num('contribution');
    var rate = num('rate');
    var years = num('years');
    var compound = $('compound') ? $('compound').value : 'monthly';

    var rm = monthlyRate(rate, compound);
    var n = Math.max(1, Math.round(years * 12));
    var growth = Math.pow(1 + rm, n);
    var fv = p * growth;
    if (rm > 0) fv += c * ((growth - 1) / rm);
    var deposited = p + c * n;
    var interest = fv - deposited;
    var eff = effectiveAnnual(rate, compound) * 100;

    setText('resultMain', fmt(fv));
    setText('resultLabel', 'Maturity Amount');
    setText('rDeposited', fmt(deposited));
    setText('rInterest', fmt(interest));
    setText('rEff', eff.toFixed(2) + '%');
    showPanel();
    renderGrowthChart(p, c, rm, n, false);
  }

  function calcInvestment() {
    var p = num('principal');
    var c = num('contribution');
    var rate = num('rate');
    var years = num('years');
    var inflation = num('inflation');
    var compound = $('compound') ? $('compound').value : 'monthly';

    var rm = monthlyRate(rate, compound);
    var n = Math.max(1, Math.round(years * 12));
    var growth = Math.pow(1 + rm, n);
    var fv = p * growth;
    if (rm > 0) fv += c * ((growth - 1) / rm);
    var invested = p + c * n;
    var realValue = fv / Math.pow(1 + inflation / 100, years);

    setText('resultMain', fmt(fv));
    setText('resultLabel', 'Future Value');
    setText('rInvested', fmt(invested));
    setText('rGrowth', fmt(fv - invested));
    setText('rReal', fmt(realValue));
    showPanel();
    renderGrowthChart(p, c, rm, n, false);
  }

  function calcSavings() {
    var goal = num('goal');
    var rate = num('rate');
    var years = num('years');
    var compound = $('compound') ? $('compound').value : 'monthly';

    var rm = monthlyRate(rate, compound);
    var n = Math.max(1, Math.round(years * 12));
    var growth = Math.pow(1 + rm, n);
    var c = rm > 0 ? (goal * rm) / (growth - 1) : goal / n;
    var deposited = c * n;
    var interest = goal - deposited;

    setText('resultMain', fmt(c));
    setText('resultLabel', 'Monthly Deposit Needed');
    setText('rDeposited', fmt(deposited));
    setText('rInterest', fmt(interest));
    showPanel();
  }

  function calcSimple() {
    var p = num('principal');
    var rate = num('rate');
    var time = num('time');
    var unit = $('timeUnit') ? $('timeUnit').value : 'years';

    var t = unit === 'months' ? time / 12 : unit === 'days' ? time / 365 : time;
    var interest = p * rate / 100 * t;
    var maturity = p + interest;

    setText('resultMain', fmt(interest));
    setText('resultLabel', 'Simple Interest');
    setText('rMaturity', fmt(maturity));
    setText('rRate', rate.toFixed(2) + '%');
    showPanel();
  }

  function calcRate() {
    var p = num('principal');
    var maturity = num('maturity');
    var years = num('years');
    var compound = $('compound') ? $('compound').value : 'monthly';

    var n = compoundsPerYear(compound);
    var ratio = maturity / Math.max(1, p);
    var rate;
    if (n === 0) {
      rate = (Math.log(ratio) / years) * 100;
    } else {
      rate = n * (Math.pow(ratio, 1 / (n * years)) - 1) * 100;
    }
    var interest = maturity - p;
    var eff = effectiveAnnual(rate, compound) * 100;

    setText('resultMain', rate.toFixed(2) + '%');
    setText('resultLabel', 'Required Annual Interest Rate');
    setText('rInterest', fmt(interest));
    setText('rEff', eff.toFixed(2) + '%');
    showPanel();
  }

  function calcCd() {
    var deposit = num('deposit');
    var rate = num('rate');
    var years = num('years');
    var compound = $('compound') ? $('compound').value : 'monthly';

    var n = compoundsPerYear(compound);
    var eff = n === 0 ? Math.exp(rate / 100) - 1 : Math.pow(1 + rate / 100 / n, n) - 1;
    var maturity = deposit * Math.pow(1 + eff, years);
    var interest = maturity - deposit;

    setText('resultMain', fmt(maturity));
    setText('resultLabel', 'CD Maturity Amount');
    setText('rInterest', fmt(interest));
    setText('rApy', (eff * 100).toFixed(2) + '%');
    showPanel();
  }

  function calcBond() {
    var face = num('face');
    var coupon = num('coupon');
    var years = num('years');
    var price = num('price');

    var couponAmt = face * coupon / 100;
    var currentYield = price > 0 ? (couponAmt / price) * 100 : 0;
    var avgPrice = (face + price) / 2;
    var ytm = avgPrice > 0 ? ((couponAmt + (face - price) / years) / avgPrice) * 100 : 0;
    var totalCoupons = couponAmt * years;

    setText('resultMain', currentYield.toFixed(2) + '%');
    setText('resultLabel', 'Current Yield');
    setText('rCoupon', fmt(couponAmt));
    setText('rYtm', ytm.toFixed(2) + '%');
    setText('rTotal', fmt(totalCoupons));
    showPanel();
  }

  function calcMutualFund() {
    var lump = num('lump');
    var sip = num('sip');
    var rate = num('rate');
    var years = num('years');

    var rm = rate / 1200;
    var n = Math.max(1, Math.round(years * 12));
    var growth = Math.pow(1 + rm, n);
    var fv = lump * growth;
    if (rm > 0) fv += sip * ((growth - 1) / rm) * (1 + rm);
    var invested = lump + sip * n;
    var gains = fv - invested;
    var cagr = invested > 0 ? (Math.pow(fv / invested, 1 / years) - 1) * 100 : 0;

    setText('resultMain', fmt(fv));
    setText('resultLabel', 'Expected Maturity Value');
    setText('rInvested', fmt(invested));
    setText('rGains', fmt(gains));
    setText('rCagr', cagr.toFixed(2) + '%');
    showPanel();
    renderGrowthChart(lump, sip, rm, n, true);
  }

  function calcAverage() {
    var initial = num('initial');
    var final = num('final');
    var years = num('years');

    var total = initial > 0 ? ((final - initial) / initial) * 100 : 0;
    var cagr = initial > 0 && years > 0 ? (Math.pow(final / initial, 1 / years) - 1) * 100 : 0;
    var arith = years > 0 ? total / years : 0;

    setText('resultMain', cagr.toFixed(2) + '%');
    setText('resultLabel', 'Compound Annual Growth Rate (CAGR)');
    setText('rTotal', total.toFixed(2) + '%');
    setText('rArith', arith.toFixed(2) + '%');
    showPanel();
  }

  function calcIrr() {
    var initial = num('initial');
    var cf = num('cf');
    var years = num('years');
    var residual = num('residual');

    function npv(r) {
      if (r === -1) return Infinity;
      var acc = -initial;
      for (var k = 1; k <= years; k++) {
        acc += cf / Math.pow(1 + r, k);
      }
      acc += residual / Math.pow(1 + r, years);
      return acc;
    }

    var lo = -0.99;
    var hi = 10;
    var fLo = npv(lo);
    var fHi = npv(hi);
    var irr = null;
    if (fLo * fHi < 0) {
      for (var i = 0; i < 200; i++) {
        var mid = (lo + hi) / 2;
        var fMid = npv(mid);
        if (Math.abs(fMid) < 1e-9) { lo = mid; hi = mid; break; }
        if (fLo * fMid < 0) { hi = mid; fHi = fMid; } else { lo = mid; fLo = fMid; }
      }
      irr = (lo + hi) / 2;
    } else if (Math.abs(fLo) < Math.abs(fHi)) {
      irr = lo;
    }

    var cashIn = cf * years + residual;
    var profit = cashIn - initial;

    setText('resultMain', irr !== null ? (irr * 100).toFixed(2) + '%' : 'N/A');
    setText('resultLabel', 'Internal Rate of Return (IRR)');
    setText('rCash', fmt(cashIn));
    setText('rProfit', fmt(profit));
    showPanel();
  }

  function calcRoi() {
    var cost = num('cost');
    var final = num('final');
    var years = num('years');

    var profit = final - cost;
    var roi = cost > 0 ? (profit / cost) * 100 : 0;
    var annual = cost > 0 && years > 0 ? (Math.pow(final / cost, 1 / years) - 1) * 100 : 0;

    setText('resultMain', roi.toFixed(2) + '%');
    setText('resultLabel', 'Return on Investment (ROI)');
    setText('rAnnual', annual.toFixed(2) + '%');
    setText('rProfit', fmt(profit));
    showPanel();
  }

  function calcPayback() {
    var investment = num('investment');
    var cashflow = num('cashflow');

    if (cashflow <= 0) {
      setText('resultMain', '—');
      setText('resultLabel', 'Payback Period');
      setText('rYears', '—');
      setText('rMonths', '—');
      setText('rCash', '—');
      showPanel();
      return;
    }
    var years = Math.floor(investment / cashflow);
    var rem = investment - years * cashflow;
    var months = Math.ceil((rem / cashflow) * 12);
    if (months >= 12) { years += 1; months -= 12; }
    var totalCash = years * cashflow + (months / 12) * cashflow;

    setText('resultMain', years + ' yr ' + months + ' mo');
    setText('resultLabel', 'Payback Period');
    setText('rYears', years + ' years');
    setText('rMonths', months + ' months');
    setText('rCash', fmt(totalCash));
    showPanel();
  }

  function calcPv() {
    var future = num('future');
    var rate = num('rate');
    var years = num('years');
    var compound = $('compound') ? $('compound').value : 'monthly';

    var rm = monthlyRate(rate, compound);
    var n = Math.max(1, Math.round(years * 12));
    var pv = future / Math.pow(1 + rm, n);
    var discount = future - pv;
    var eff = effectiveAnnual(rate, compound) * 100;

    setText('resultMain', fmt(pv));
    setText('resultLabel', 'Present Value');
    setText('rDiscount', fmt(discount));
    setText('rEff', eff.toFixed(2) + '%');
    showPanel();
  }

  function calcFv() {
    var present = num('present');
    var rate = num('rate');
    var years = num('years');
    var compound = $('compound') ? $('compound').value : 'monthly';

    var rm = monthlyRate(rate, compound);
    var n = Math.max(1, Math.round(years * 12));
    var fv = present * Math.pow(1 + rm, n);
    var interest = fv - present;
    var eff = effectiveAnnual(rate, compound) * 100;

    setText('resultMain', fmt(fv));
    setText('resultLabel', 'Future Value');
    setText('rInterest', fmt(interest));
    setText('rEff', eff.toFixed(2) + '%');
    showPanel();
  }

  function calcFinance() {
    var amount = num('amount');
    var rate = num('rate');
    var years = num('years');
    var pmt = num('pmt');
    var fv = num('fvtarget');
    var solveFor = $('solveFor') ? $('solveFor').value : 'payment';

    var r = rate / 1200;
    var n = Math.max(1, Math.round(years * 12));
    var f = Math.pow(1 + r, n);

    var main, label;
    switch (solveFor) {
      case 'payment':
        main = payment(amount, r, n);
        label = 'Monthly Payment';
        break;
      case 'amount':
        main = r > 0 ? (pmt * (1 - 1 / f)) / r : pmt * n;
        label = 'Loan Amount';
        amount = main;
        break;
      case 'future':
        main = amount * f - (r > 0 ? (pmt * (f - 1)) / r : pmt * n);
        label = 'Future Value';
        break;
      case 'term':
        if (r > 0 && pmt > amount * r) {
          main = -Math.log(1 - (amount * r) / pmt) / Math.log(1 + r) / 12;
          label = 'Loan Term (years)';
        } else {
          main = 0;
          label = 'Loan Term (years)';
        }
        break;
      case 'rate':
        main = solveMonthlyRate(amount, pmt, n) * 1200;
        label = 'Annual Interest Rate (%)';
        break;
      default:
        main = payment(amount, r, n);
        label = 'Monthly Payment';
    }

    var interest = Math.max(0, pmt * n - amount);
    var display = (solveFor === 'rate') ? main.toFixed(2) + '%' : (solveFor === 'term' ? fmt1(main) + ' years' : fmt(main));

    setText('resultMain', display);
    setText('resultLabel', label);
    setText('rTotal', fmt(pmt * n));
    setText('rInterest', fmt(interest));
    showPanel();
  }

  /* ---------- Chart helpers ---------- */

  function yearlyGrowth(principal, contribution, rm, n, startOfMonth) {
    var years = Math.max(1, Math.ceil(n / 12));
    var labels = [];
    var balances = [];
    var invested = [];
    var bal = principal;
    var cumInvested = principal;
    var add = startOfMonth ? contribution * (1 + rm) : contribution;
    for (var y = 1; y <= years; y++) {
      var monthsInYear = Math.min(12, n - (y - 1) * 12);
      for (var m = 1; m <= monthsInYear; m++) {
        cumInvested += contribution;
        bal = bal * (1 + rm) + add;
      }
      labels.push('Y' + y);
      balances.push(Math.round(bal));
      invested.push(Math.round(cumInvested));
    }
    return { labels: labels, balances: balances, invested: invested };
  }

  function renderChart(labels, series) {
    var canvas = $('resultChart');
    if (canvas && window.EMIChart) {
      window.EMIChart.render(canvas, { labels: labels, series: series });
    }
  }

  function renderGrowthChart(principal, contribution, rm, n, startOfMonth) {
    var g = yearlyGrowth(principal, contribution, rm, n, startOfMonth);
    renderChart(g.labels, [
      { name: 'Invested', data: g.invested, color: '#94a3b8' },
      { name: 'Value', data: g.balances, color: '#10b981' }
    ]);
  }

  /* ---------- Dispatch ---------- */

  var HANDLERS = {
    'interest': calcInterest,
    'compound': calcCompound,
    'investment': calcInvestment,
    'savings': calcSavings,
    'simple': calcSimple,
    'rate': calcRate,
    'cd': calcCd,
    'bond': calcBond,
    'mutual-fund': calcMutualFund,
    'average': calcAverage,
    'irr': calcIrr,
    'roi': calcRoi,
    'payback': calcPayback,
    'pv': calcPv,
    'fv': calcFv,
    'finance': calcFinance
  };

  function update() {
    var config = window.calcConfig || { type: 'interest' };
    var fn = HANDLERS[config.type];
    if (fn) fn();
  }

  function applyDefaults() {
    var config = window.calcConfig || {};
    var d = config.defaults || {};
    Object.keys(d).forEach(function (id) {
      var el = $(id);
      if (el) el.value = d[id];
      var range = $(id + 'Range');
      if (range) range.value = d[id];
    });
  }

  function init() {
    var inputs = document.querySelectorAll('input[type="number"], input[type="text"]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', update);
    }

    var ranges = document.querySelectorAll('input[type="range"]');
    for (var j = 0; j < ranges.length; j++) {
      (function (range) {
        var id = range.id.replace(/Range$/, '');
        var input = $(id);
        if (!input) return;
        var min = parseFloat(range.min) || 0;
        var max = parseFloat(range.max) || 100000000;
        input.addEventListener('input', function () {
          var v = parseFloat(input.value);
          if (!isNaN(v)) range.value = Math.min(max, Math.max(min, v));
        });
        range.addEventListener('input', function () {
          input.value = range.value;
        });
      })(ranges[j]);
    }

    var selects = document.querySelectorAll('select');
    for (var s = 0; s < selects.length; s++) {
      selects[s].addEventListener('change', update);
    }

    var calcBtn = $('calculateBtn');
    if (calcBtn) calcBtn.addEventListener('click', update);

    var resetBtn = $('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', applyDefaults);

    applyDefaults();
    window.addEventListener('localechange', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
