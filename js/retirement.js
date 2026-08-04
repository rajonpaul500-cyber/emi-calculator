/* ==========================================================================
   EMI Master - Retirement & Pension calculator engine
   Handles: retirement, pension, social security, annuity, annuity payout,
   Roth IRA, traditional IRA, RMD. Dispatched by window.calcConfig.type.
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  function fmt(v) {
    if (window.I18N) return window.I18N.fmt(v);
    return '\u20B9' + ' ' + Math.round(v).toLocaleString('en-IN');
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

  function fvOf(p, monthly, rm, n) {
    if (n <= 0) return p + monthly * 0;
    var g = Math.pow(1 + rm, n);
    if (rm === 0) return p + monthly * n;
    return p * g + monthly * ((g - 1) / rm);
  }

  var RMD_FACTORS = {
    72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0,
    79: 21.1, 80: 20.2, 81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0,
    86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9, 90: 12.2, 91: 11.5, 92: 10.8,
    93: 10.1, 94: 9.5, 95: 8.9, 96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8,
    100: 6.4, 101: 6.0, 102: 5.6, 103: 5.2, 104: 4.9, 105: 4.6, 106: 4.3,
    107: 4.1, 108: 3.9, 109: 3.7, 110: 3.5, 111: 3.4, 112: 3.3, 113: 3.1,
    114: 3.0, 115: 2.9, 116: 2.8, 117: 2.7, 118: 2.5, 119: 2.3, 120: 2.0
  };

  function rmdFactor(age) {
    if (RMD_FACTORS[age]) return RMD_FACTORS[age];
    if (age < 72) return 0;
    return 2.0;
  }

  function renderChart(labels, series) {
    var canvas = $('resultChart');
    if (canvas && window.EMIChart) {
      window.EMIChart.render(canvas, { labels: labels, series: series });
    }
  }

  /* ---------- Handlers ---------- */

  function calcRetirement() {
    var curAge = num('curAge');
    var retireAge = num('retireAge');
    var lifeExpect = num('lifeExpect');
    var savings = num('savings');
    var monthly = num('monthly');
    var rate = num('rate');
    var inflation = num('inflation');
    var annualExpense = num('annualExpense');

    var yearsToRetire = Math.max(0, retireAge - curAge);
    var yearsRetired = Math.max(0, lifeExpect - retireAge);
    var rm = rate / 1200;
    var n = Math.round(yearsToRetire * 12);

    var projected = fvOf(savings, monthly, rm, n);

    var realReturn = (1 + rate / 100) / (1 + inflation / 100) - 1;
    var futureExpense = annualExpense * Math.pow(1 + inflation / 100, yearsToRetire);

    var corpusNeeded, monthlyIncome;
    if (realReturn > 0 && yearsRetired > 0) {
      var factor = (1 - Math.pow(1 + realReturn, -yearsRetired)) / realReturn;
      corpusNeeded = futureExpense * factor;
      monthlyIncome = (projected * realReturn / (1 - Math.pow(1 + realReturn, -yearsRetired))) / 12;
    } else {
      corpusNeeded = futureExpense * yearsRetired;
      monthlyIncome = yearsRetired > 0 ? projected / (yearsRetired * 12) : 0;
    }
    var shortfall = corpusNeeded - projected;
    var futureMonthly = futureExpense / 12;

    var invalid = yearsToRetire <= 0 || yearsRetired <= 0;
    setText('resultMain', invalid ? '\u2014' : fmt(projected));
    setText('resultLabel', 'Projected Savings at Retirement');
    setText('rNeed', invalid ? '\u2014' : fmt(corpusNeeded));
    setText('rShortfall', invalid ? '\u2014' : (shortfall > 0 ? '-' + fmt(shortfall) : '+' + fmt(Math.abs(shortfall))));
    setText('rIncome', invalid ? '\u2014' : fmt(monthlyIncome));
    setText('rFuture', invalid ? '\u2014' : fmt(futureMonthly));
    showPanel();

    if (!invalid) {
      var labels = [];
      var data = [];
      var bal = savings;
      for (var y = 1; y <= yearsToRetire; y++) {
        var monthsInYear = Math.min(12, n - (y - 1) * 12);
        for (var m = 1; m <= monthsInYear; m++) {
          bal = bal * (1 + rm) + monthly;
        }
        labels.push('Y' + y);
        data.push(Math.round(bal));
      }
      renderChart(labels, [{ name: 'Projected Balance', data: data, color: '#6366f1' }]);
    }
  }

  function calcPension() {
    var monthlyPension = num('monthlyPension');
    var cola = num('cola');
    var inflation = num('inflation');
    var yearsRetired = num('yearsRetired');

    var n = Math.max(1, Math.round(yearsRetired * 12));
    var cm = cola / 1200;
    var im = inflation / 1200;

    var total, totalReal, finalMonthly;
    if (cm > 0) {
      total = monthlyPension * ((Math.pow(1 + cm, n) - 1) / cm);
      finalMonthly = monthlyPension * Math.pow(1 + cm, n - 1);
    } else {
      total = monthlyPension * n;
      finalMonthly = monthlyPension;
    }
    var q = (1 + cm) / (1 + im);
    totalReal = q !== 1 ? monthlyPension * ((Math.pow(q, n) - 1) / (q - 1)) : monthlyPension * n;

    setText('resultMain', fmt(total));
    setText('resultLabel', 'Total Pension Received');
    setText('rValue', fmt(totalReal));
    setText('rMonthly', fmt(finalMonthly));
    setText('rYears', Math.round(yearsRetired).toString());
    showPanel();
  }

  function calcSocialSecurity() {
    var claimAge = num('claimAge');
    var fra = num('fra');
    var monthlyAtFra = num('monthlyAtFra');
    var lifeExpect = num('lifeExpect');

    var monthsEarly = Math.max(0, Math.round((fra - claimAge) * 12));
    var reduction = monthsEarly <= 36
      ? monthsEarly * 0.0055556
      : 36 * 0.0055556 + (monthsEarly - 36) * 0.0041667;
    var monthsLate = Math.max(0, Math.round((claimAge - fra) * 12));
    var increase = monthsLate * 0.0066667;

    var benefit = monthlyAtFra * Math.max(0, 1 - reduction + increase);
    var years = Math.max(0, lifeExpect - claimAge);
    var total = benefit * 12 * years;
    var diff = benefit - monthlyAtFra;

    var invalid = claimAge <= 0 || monthlyAtFra <= 0;
    setText('resultMain', invalid ? '\u2014' : fmt(benefit));
    setText('resultLabel', 'Monthly Benefit at Claim Age');
    setText('rLifetime', invalid ? '\u2014' : fmt(total));
    setText('rDiff', invalid ? '\u2014' : (diff >= 0 ? '+' + fmt(diff) : '-' + fmt(Math.abs(diff))));
    setText('rYears', years.toString());
    showPanel();
  }

  function calcAnnuity() {
    var lump = num('lump');
    var monthly = num('monthly');
    var rate = num('rate');
    var years = num('years');

    var rm = rate / 1200;
    var n = Math.round(years * 12);
    var fv = fvOf(lump, monthly, rm, n);
    var contributed = lump + monthly * n;
    var interest = fv - contributed;
    var eff = (Math.pow(1 + rm, 12) - 1) * 100;

    setText('resultMain', fmt(fv));
    setText('resultLabel', 'Annuity Future Value');
    setText('rContributed', fmt(contributed));
    setText('rInterest', fmt(interest));
    setText('rEff', eff.toFixed(2) + '%');
    showPanel();
  }

  function calcAnnuityPayout() {
    var lump = num('lump');
    var rate = num('rate');
    var years = num('years');

    var rm = rate / 1200;
    var n = Math.round(years * 12);
    var payout = rm > 0 ? lump * rm / (1 - Math.pow(1 + rm, -n)) : (n > 0 ? lump / n : 0);
    var total = payout * n;
    var interest = total - lump;

    setText('resultMain', fmt(payout));
    setText('resultLabel', 'Monthly Payout');
    setText('rTotal', fmt(total));
    setText('rInterest', fmt(interest));
    setText('rYears', Math.round(years).toString());
    showPanel();
  }

  function calcRothIra() {
    var age = num('age');
    var retireAge = num('retireAge');
    var balance = num('balance');
    var annualContribution = num('annualContribution');
    var rate = num('rate');
    var taxNow = num('taxNow');

    var years = Math.max(0, retireAge - age);
    var rm = rate / 1200;
    var n = Math.round(years * 12);
    var monthly = annualContribution / 12;
    var fv = fvOf(balance, monthly, rm, n);
    var contributed = balance + annualContribution * years;
    var earnings = fv - contributed;
    var taxSaved = annualContribution * years * (taxNow / 100);

    var invalid = years <= 0;
    setText('resultMain', invalid ? '\u2014' : fmt(fv));
    setText('resultLabel', 'Roth IRA Value at Retirement');
    setText('rContrib', invalid ? '\u2014' : fmt(contributed));
    setText('rEarnings', invalid ? '\u2014' : fmt(earnings));
    setText('rTaxSaved', invalid ? '\u2014' : fmt(taxSaved));
    showPanel();
  }

  function calcIra() {
    var age = num('age');
    var retireAge = num('retireAge');
    var balance = num('balance');
    var annualContribution = num('annualContribution');
    var rate = num('rate');
    var taxRetire = num('taxRetire');

    var years = Math.max(0, retireAge - age);
    var rm = rate / 1200;
    var n = Math.round(years * 12);
    var monthly = annualContribution / 12;
    var fv = fvOf(balance, monthly, rm, n);
    var contributed = balance + annualContribution * years;
    var earnings = fv - contributed;
    var tax = fv * (taxRetire / 100);
    var net = fv - tax;

    var invalid = years <= 0;
    setText('resultMain', invalid ? '\u2014' : fmt(fv));
    setText('resultLabel', 'Traditional IRA Value at Retirement');
    setText('rContrib', invalid ? '\u2014' : fmt(contributed));
    setText('rEarnings', invalid ? '\u2014' : fmt(earnings));
    setText('rTax', invalid ? '\u2014' : fmt(tax));
    setText('rNet', invalid ? '\u2014' : fmt(net));
    showPanel();
  }

  function calcRmd() {
    var balance = num('balance');
    var age = Math.round(num('age'));
    var rate = num('rate');

    var factor = rmdFactor(age);
    var rmd = age >= 73 && factor > 0 ? balance / factor : 0;
    var pct = factor > 0 ? 100 / factor : 0;

    var total5 = 0;
    var bal = balance;
    for (var k = 0; k < 5; k++) {
      var a = age + k;
      var f = rmdFactor(a);
      if (a >= 73 && f > 0) {
        var r = bal / f;
        total5 += r;
        bal = bal * (1 + rate / 100) - r;
      } else {
        bal = bal * (1 + rate / 100);
      }
    }

    setText('resultMain', fmt(rmd));
    setText('resultLabel', 'RMD This Year');
    setText('rFactor', factor > 0 ? factor.toFixed(1) : '\u2014');
    setText('rPercent', pct > 0 ? pct.toFixed(1) + '%' : '\u2014');
    setText('rTotal', fmt(total5));
    showPanel();
  }

  var HANDLERS = {
    'retirement': calcRetirement,
    'pension': calcPension,
    'social-security': calcSocialSecurity,
    'annuity': calcAnnuity,
    'annuity-payout': calcAnnuityPayout,
    'roth-ira': calcRothIra,
    'ira': calcIra,
    'rmd': calcRmd
  };

  /* ---------- Common wiring ---------- */

  function applyDefaults() {
    var config = window.calcConfig || {};
    var defaults = config.defaults || {};
    var id, el, v;
    for (id in defaults) {
      if (!Object.prototype.hasOwnProperty.call(defaults, id)) continue;
      el = $(id);
      if (el) el.value = defaults[id];
    }
    for (id in defaults) {
      el = $(id);
      if (!el) continue;
      v = defaults[id];
      var range = $(id + 'Range');
      if (range) range.value = v;
    }
  }

  function update() {
    var config = window.calcConfig || { type: 'retirement' };
    var type = config.type || 'retirement';
    var handler = HANDLERS[type];
    if (handler) handler();
  }

  function bindRange(id) {
    var input = $(id);
    var range = $(id + 'Range');
    if (!input || !range) return;
    var min = parseFloat(range.min) || 0;
    var max = parseFloat(range.max) || 100000000;
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
        input.addEventListener('input', update);
        range.addEventListener('input', function () {
          input.value = range.value;
          update();
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
