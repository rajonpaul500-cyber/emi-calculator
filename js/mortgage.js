/* ==========================================================================
   EMI Master - Mortgage & Real Estate calculator engine
   Covers: affordability, rent, debt-to-income, real estate investment,
   refinance, rental property, APR, FHA, VA, HELOC, down payment,
   rent vs buy. Dispatched by window.calcConfig.type.
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  function fmt(v) {
    return '₹' + Math.round(v).toLocaleString('en-IN');
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

  function renderPropertyChart(years, annualCf, price, appr) {
    var canvas = $('resultChart');
    if (!canvas || !window.EMIChart) return;
    var labels = [];
    var data = [];
    var n = Math.max(1, Math.round(years));
    for (var k = 1; k <= n; k++) {
      labels.push('Y' + k);
      data.push(Math.round(annualCf * k + price * (Math.pow(1 + appr / 100, k) - 1)));
    }
    window.EMIChart.render(canvas, {
      labels: labels,
      series: [{ name: 'Cumulative Profit', data: data, color: '#10b981' }]
    });
  }

  function payment(P, r, n) {
    if (P <= 0 || n <= 0) return 0;
    if (r === 0) return P / n;
    var f = Math.pow(1 + r, n);
    return (P * r * f) / (f - 1);
  }

  function paymentFactor(r, n) {
    if (r === 0) return 1 / n;
    var f = Math.pow(1 + r, n);
    return (r * f) / (f - 1);
  }

  function balanceAfter(P, r, pmt, k) {
    if (r === 0) return Math.max(0, P - pmt * k);
    var f = Math.pow(1 + r, k);
    return Math.max(0, P * f - pmt * ((f - 1) / r));
  }

  function solveMonthlyRate(P, pmt, n) {
    if (P <= 0 || pmt <= 0 || n <= 0) return 0;
    var lo = 0;
    var hi = 1;
    while (hi < 1 && payment(P, hi, n) < pmt) hi *= 2;
    for (var k = 0; k < 120; k++) {
      var mid = (lo + hi) / 2;
      if (payment(P, mid, n) > pmt) hi = mid; else lo = mid;
    }
    return (lo + hi) / 2;
  }

  /* ---------- Individual calculators ---------- */

  function calcAffordability() {
    var income = num('income');
    var debts = num('debts');
    var down = num('down');
    var rate = num('rate');
    var term = num('term');
    var tax = num('tax');
    var ins = num('insurance');
    var pmi = num('pmi');

    var monthly = income / 12;
    var front = monthly * 0.28;
    var back = monthly * 0.36 - debts;
    var avail = Math.max(0, Math.min(front, back));

    var r = rate / 1200;
    var n = term * 12;
    var k = paymentFactor(r, n);
    var pmiFactor = pmi / 1200;
    var availPmt = avail - tax / 12 - ins / 12;
    var loan = availPmt > 0 ? availPmt / (k + pmiFactor) : 0;
    var price = loan + down;

    var usedDti = monthly > 0 ? ((loan * k + tax / 12 + ins / 12 + debts) / monthly) * 100 : 0;

    setText('resultMain', fmt(price));
    setText('resultLabel', 'Affordable Home Price');
    setText('rLoan', fmt(loan));
    setText('rPmt', fmt(loan * k));
    setText('rDti', usedDti.toFixed(1) + '%');
    setText('rDown', fmt(down));
    showPanel();
  }

  function calcRent() {
    var rent = num('rent');
    var income = num('income');
    var utilities = num('utilities');

    var afford = income * 0.3;
    var budget = rent + utilities;
    var pct = income > 0 ? (budget / income) * 100 : 0;

    setText('resultMain', fmt(afford));
    setText('resultLabel', 'Affordable Max Rent (30% rule)');
    setText('rRent', fmt(budget));
    setText('rAnnual', fmt(budget * 12));
    setText('rPct', pct.toFixed(1) + '%');
    setText('rVerdict', budget <= afford ? 'Within the 30% budget' : 'Exceeds the 30% budget');
    showPanel();
  }

  function calcDti() {
    var income = num('income');
    var housing = num('housing');
    var debts = num('debts');

    var front = income > 0 ? (housing / income) * 100 : 0;
    var back = income > 0 ? ((housing + debts) / income) * 100 : 0;
    var maxDebt = income * 0.36;

    setText('resultMain', back.toFixed(1) + '%');
    setText('resultLabel', 'Back-end Debt-to-Income Ratio');
    setText('rFront', front.toFixed(1) + '%');
    setText('rMax', fmt(maxDebt));
    setText('rVerdict',
      back <= 36 ? 'Healthy — lenders generally accept ratios up to 36%' :
      back <= 43 ? 'Acceptable to some lenders, but risky' :
      'High — consider paying down debt first');
    showPanel();
  }

  function calcRealEstate() {
    var price = num('price');
    var downPct = num('downPct');
    var closing = num('closing');
    var rent = num('rent');
    var expenses = num('expenses');
    var appr = num('appr');
    var sellPct = num('sellPct');
    var years = num('years');

    var down = price * downPct / 100;
    var investment = down + closing;
    var annualNoi = (rent - expenses) * 12;
    var coC = investment > 0 ? (annualNoi / investment) * 100 : 0;
    var future = price * Math.pow(1 + appr / 100, years);
    var saleNet = future * (1 - sellPct / 100);
    var profit = saleNet - price + annualNoi * years;

    setText('resultMain', fmt(investment));
    setText('resultLabel', 'Total Investment');
    setText('rCashFlow', fmt(rent - expenses));
    setText('rCoC', coC.toFixed(1) + '%');
    setText('rProfit', fmt(profit));
    setText('rValue', fmt(saleNet));
    showPanel();
    renderPropertyChart(years, annualNoi, price, appr);
  }

  function calcRefinance() {
    var balance = num('balance');
    var curRate = num('curRate');
    var curYears = num('curYears');
    var newRate = num('newRate');
    var newYears = num('newYears');
    var closing = num('closing');

    var curPmt = payment(balance, curRate / 1200, curYears * 12);
    var newPmt = payment(balance, newRate / 1200, newYears * 12);
    var savings = curPmt - newPmt;
    var breakEven = savings > 0 ? closing / savings : 0;
    var curInterest = curPmt * curYears * 12 - balance;
    var newInterest = newPmt * newYears * 12 - balance;
    var intSaved = Math.max(0, curInterest - newInterest);

    setText('resultMain', fmt(Math.max(0, savings)));
    setText('resultLabel', 'Monthly Savings');
    setText('rCur', fmt(curPmt));
    setText('rNew', fmt(newPmt));
    setText('rBreak', breakEven > 0 ? fmt1(breakEven) + ' months' : 'No savings');
    setText('rInt', fmt(intSaved));
    showPanel();
  }

  function calcRentalProperty() {
    var price = num('price');
    var downPct = num('downPct');
    var closing = num('closing');
    var rent = num('rent');
    var vacancy = num('vacancy');
    var taxPct = num('taxPct');
    var insPct = num('insPct');
    var maintPct = num('maintPct');
    var mgmtPct = num('mgmtPct');
    var rate = num('rate');
    var years = num('years');
    var appr = num('appr');
    var sellPct = num('sellPct');
    var holding = num('holding');

    var down = price * downPct / 100;
    var loan = price - down;
    var effectiveRent = rent * 12 * (1 - vacancy / 100);
    var tax = price * taxPct / 100;
    var ins = price * insPct / 100;
    var maint = price * maintPct / 100;
    var mgmt = effectiveRent * mgmtPct / 100;
    var pmt = payment(loan, rate / 1200, years * 12);
    var annualCF = effectiveRent - tax - ins - maint - mgmt - pmt * 12;

    var noi = effectiveRent - tax - ins - maint - mgmt;
    var capRate = price > 0 ? (noi / price) * 100 : 0;
    var investment = down + closing;
    var coC = investment > 0 ? (annualCF / investment) * 100 : 0;

    var future = price * Math.pow(1 + appr / 100, holding);
    var bal = balanceAfter(loan, rate / 1200, pmt, holding * 12);
    var saleNet = future * (1 - sellPct / 100) - bal;
    var profit = saleNet - investment + annualCF * holding;
    var totalReturn = investment > 0 ? (profit / investment) * 100 : 0;

    setText('resultMain', fmt(annualCF / 12));
    setText('resultLabel', 'Monthly Cash Flow');
    setText('rCap', capRate.toFixed(1) + '%');
    setText('rCoC', coC.toFixed(1) + '%');
    setText('rTotal', totalReturn.toFixed(1) + '%');
    setText('rProfit', fmt(profit));
    showPanel();
    renderPropertyChart(holding, annualCF, price, appr);
  }

  function calcApr() {
    var amount = num('amount');
    var rate = num('rate');
    var years = num('years');
    var fees = num('fees');

    var r = rate / 1200;
    var n = years * 12;
    var pmt = payment(amount, r, n);
    var financed = Math.max(0, amount - fees);
    var aprMonthly = solveMonthlyRate(financed, pmt, n);
    var apr = aprMonthly * 12 * 100;

    setText('resultMain', apr.toFixed(2) + '%');
    setText('resultLabel', 'APR (Annual Percentage Rate)');
    setText('rPmt', fmt(pmt));
    setText('rTotal', fmt(pmt * n + fees));
    setText('rDiff', (apr - rate).toFixed(2) + '%');
    showPanel();
  }

  function calcFha() {
    var price = num('price');
    var downPct = num('downPct');
    var rate = num('rate');
    var term = num('term');
    var taxPct = num('taxPct');
    var insPct = num('insPct');
    var hoa = num('hoa');

    var down = price * downPct / 100;
    var base = price - down;
    var upfront = base * 1.75 / 100;
    var loan = base + upfront;
    var r = rate / 1200;
    var n = term * 12;
    var pmt = payment(loan, r, n);
    var mip = loan * 0.0055 / 12;
    var total = pmt + mip + price * taxPct / 100 / 12 + price * insPct / 100 / 12 + hoa;

    setText('resultMain', fmt(total));
    setText('resultLabel', 'Total Monthly Payment');
    setText('rLoan', fmt(loan));
    setText('rMip', fmt(mip));
    setText('rInt', fmt(pmt * n - loan));
    showPanel();
  }

  function calcVa() {
    var price = num('price');
    var downPct = num('downPct');
    var rate = num('rate');
    var term = num('term');
    var taxPct = num('taxPct');
    var insPct = num('insPct');
    var fundPct = num('fundPct');

    var base = price * (1 - downPct / 100);
    var fundFee = base * fundPct / 100;
    var loan = base + fundFee;
    var r = rate / 1200;
    var n = term * 12;
    var pmt = payment(loan, r, n);
    var total = pmt + price * taxPct / 100 / 12 + price * insPct / 100 / 12;

    setText('resultMain', fmt(total));
    setText('resultLabel', 'Total Monthly Payment');
    setText('rLoan', fmt(loan));
    setText('rFund', fmt(fundFee));
    setText('rInt', fmt(pmt * n - loan));
    showPanel();
  }

  function calcHeloc() {
    var line = num('line');
    var rate = num('rate');
    var drawYears = num('drawYears');
    var repayYears = num('repayYears');
    var interestOnly = $('interestOnly') ? $('interestOnly').value : 'yes';

    var r = rate / 1200;
    var drawPmt = line * r;
    var repayPmt = payment(line, r, repayYears * 12);
    var intOnlyTotal = drawPmt * drawYears * 12 + repayPmt * repayYears * 12 - line;

    setText('resultMain', fmt(drawPmt));
    setText('resultLabel', interestOnly === 'yes' ? 'Interest-Only Payment (Draw Period)' : 'Fully Amortized Draw Payment');
    setText('rDraw', fmt(drawPmt));
    setText('rRepay', fmt(repayPmt));
    setText('rInt', fmt(intOnlyTotal));
    setText('rTotal', fmt(drawPmt * drawYears * 12 + repayPmt * repayYears * 12));
    showPanel();
  }

  function calcDownPayment() {
    var price = num('price');
    var downPct = num('downPct');
    var rate = num('rate');
    var term = num('term');
    var pmiPct = num('pmiPct');
    var taxPct = num('taxPct');
    var insPct = num('insPct');

    var down = price * downPct / 100;
    var loan = price - down;
    var r = rate / 1200;
    var n = term * 12;
    var pmt = payment(loan, r, n);
    var pmiMonthly = downPct < 20 ? loan * pmiPct / 1200 : 0;
    var total = pmt + pmiMonthly + price * taxPct / 100 / 12 + price * insPct / 100 / 12;

    setText('resultMain', fmt(total));
    setText('resultLabel', 'Total Monthly Payment');
    setText('rDown', fmt(down));
    setText('rLoan', fmt(loan));
    setText('rPmi', fmt(pmiMonthly));
    setText('rInt', fmt(pmt * n - loan));
    showPanel();
  }

  function calcRentVsBuy() {
    var rent = num('rent');
    var price = num('price');
    var downPct = num('downPct');
    var rate = num('rate');
    var term = num('term');
    var taxPct = num('taxPct');
    var insPct = num('insPct');
    var maintPct = num('maintPct');
    var appr = num('appr');
    var rentInc = num('rentInc');
    var invReturn = num('invReturn');
    var years = num('years');
    var closing = num('closing');
    var sellPct = num('sellPct');

    var down = price * downPct / 100;
    var loan = price - down;
    var r = rate / 1200;
    var n = term * 12;
    var months = years * 12;
    var pmt = payment(loan, r, n);
    var buyMonthly = pmt + price * taxPct / 100 / 12 + price * insPct / 100 / 12 + price * maintPct / 100 / 12;

    var future = price * Math.pow(1 + appr / 100, years);
    var bal = balanceAfter(loan, r, pmt, months);
    var buyNet = future * (1 - sellPct / 100) - bal;

    var invMonthly = invReturn / 1200;
    var lumpFV = (down + closing) * Math.pow(1 + invMonthly, months);
    var invested = 0;
    var rentMonthly = rent;
    for (var m = 1; m <= months; m++) {
      if (m > 1 && (m - 1) % 12 === 0) rentMonthly *= 1 + rentInc / 100;
      invested = (invested + (buyMonthly - rentMonthly)) * (1 + invMonthly);
    }
    var rentNet = lumpFV + invested;
    var diff = buyNet - rentNet;

    setText('resultMain', diff >= 0 ? 'Buying may be better' : 'Renting may be better');
    setText('resultLabel', 'Verdict after ' + years + ' years');
    setText('rBuy', fmt(buyNet));
    setText('rRent', fmt(rentNet));
    setText('rDiff', (diff >= 0 ? '+₹' : '-₹') + Math.round(Math.abs(diff)).toLocaleString('en-IN'));
    setText('rMonthly', fmt(buyMonthly));
    showPanel();
  }

  /* ---------- Dispatch ---------- */

  var HANDLERS = {
    'affordability': calcAffordability,
    'rent': calcRent,
    'dti': calcDti,
    'real-estate': calcRealEstate,
    'refinance': calcRefinance,
    'rental-property': calcRentalProperty,
    'apr': calcApr,
    'fha': calcFha,
    'va': calcVa,
    'heloc': calcHeloc,
    'down-payment': calcDownPayment,
    'rent-vs-buy': calcRentVsBuy
  };

  function update() {
    var config = window.calcConfig || { type: 'affordability' };
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
        var max = parseFloat(range.max) || 10000000;
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
