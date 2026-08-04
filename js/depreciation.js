/* ==========================================================================
   EMI Master - Depreciation calculator engine
   Methods: SLM, WDV (Diminishing Balance), Double Declining Balance,
   Units of Production, Sum of Years' Digits. Dispatched by calcConfig.type.
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

  function renderSchedule(schedule) {
    var wrap = $('scheduleWrap');
    var tbody = $('scheduleBody');
    if (!wrap || !tbody) return;
    var rows = schedule || [];
    tbody.innerHTML = '';
    if (!rows.length) {
      wrap.style.display = 'none';
      return;
    }
    wrap.style.display = 'block';
    rows.forEach(function (row) {
      var tr = document.createElement('tr');
      var cells = [row.year, fmt(row.opening), fmt(row.dep), fmt(row.accum), fmt(row.closing)];
      cells.forEach(function (c) {
        var td = document.createElement('td');
        td.textContent = c;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
  }

  function renderChart(labels, series) {
    var canvas = $('resultChart');
    if (canvas && window.EMIChart) {
      window.EMIChart.render(canvas, { labels: labels, series: series });
    }
  }

  var METHODS = ['slm', 'wdv', 'ddb', 'uop', 'syd'];

  function yearlyDepreciation(method, cost, salvage, life, wdvRate, totalUnits, unitsPerYear) {
    var rows = [];
    var base = cost - salvage;
    var opening = cost;
    var accum = 0;

    if (method === 'slm') {
      var annual = life > 0 ? base / life : 0;
      for (var y = 1; y <= life; y++) {
        var dep = y === life ? Math.max(0, base - accum) : annual;
        accum += dep;
        opening = y === 1 ? cost : rows[y - 2].closing;
        rows.push({ year: y, opening: opening, dep: dep, accum: accum, closing: cost - accum });
      }
      return { rows: rows, rate: life > 0 ? 100 / life : 0 };
    }

    if (method === 'wdv') {
      var wRate = wdvRate / 100;
      for (var y2 = 1; y2 <= life; y2++) {
        var open2 = y2 === 1 ? cost : rows[y2 - 2].closing;
        var dep2 = Math.max(0, Math.min(open2 - salvage, open2 * wRate));
        if (open2 <= salvage) dep2 = 0;
        accum += dep2;
        rows.push({ year: y2, opening: open2, dep: dep2, accum: accum, closing: open2 - dep2 });
      }
      return { rows: rows, rate: wdvRate };
    }

    if (method === 'ddb') {
      var dRate = life > 0 ? (2 * 100) / life : 0;
      var dRateF = dRate / 100;
      for (var y3 = 1; y3 <= life; y3++) {
        var open3 = y3 === 1 ? cost : rows[y3 - 2].closing;
        var dep3 = Math.max(0, Math.min(open3 - salvage, open3 * dRateF));
        accum += dep3;
        rows.push({ year: y3, opening: open3, dep: dep3, accum: accum, closing: open3 - dep3 });
      }
      return { rows: rows, rate: dRate };
    }

    if (method === 'uop') {
      var perUnit = totalUnits > 0 ? base / totalUnits : 0;
      for (var y4 = 1; y4 <= life; y4++) {
        var open4 = y4 === 1 ? cost : rows[y4 - 2].closing;
        var dep4 = Math.min(Math.max(0, open4 - salvage), perUnit * unitsPerYear);
        accum += dep4;
        rows.push({ year: y4, opening: open4, dep: dep4, accum: accum, closing: open4 - dep4 });
      }
      return { rows: rows, rate: perUnit * unitsPerYear / cost * 100 };
    }

    /* syd */
    var sum = life * (life + 1) / 2;
    for (var y5 = 1; y5 <= life; y5++) {
      var open5 = y5 === 1 ? cost : rows[y5 - 2].closing;
      var factor = (life - y5 + 1) / sum;
      var dep5 = y5 === life ? Math.max(0, open5 - salvage) : base * factor;
      accum += dep5;
      rows.push({ year: y5, opening: open5, dep: dep5, accum: accum, closing: cost - accum });
    }
    var firstRate = sum > 0 ? (life / sum) * 100 : 0;
    return { rows: rows, rate: firstRate };
  }

  function update() {
    var cost = num('cost');
    var salvage = num('salvage');
    var life = Math.round(num('life'));
    var method = ($('method') && $('method').value) || 'slm';
    var wdvRate = num('wdvRate');
    var totalUnits = num('totalUnits');
    var unitsPerYear = num('unitsPerYear');

    var invalid = !(cost > 0 && life > 0);
    var res = !invalid ? yearlyDepreciation(method, cost, salvage, life, wdvRate, totalUnits, unitsPerYear) : { rows: [], rate: 0 };
    var first = res.rows.length ? res.rows[0].dep : 0;
    var totalDep = invalid ? 0 : cost - Math.max(0, salvage);
    var finalValue = invalid ? 0 : (res.rows.length ? res.rows[res.rows.length - 1].closing : cost);

    setText('resultMain', invalid ? '\u2014' : fmt(first));
    setText('resultLabel', 'First-Year Depreciation');
    setText('rTotal', invalid ? '\u2014' : fmt(totalDep));
    setText('rFinal', invalid ? '\u2014' : fmt(finalValue));
    setText('rRate', invalid ? '\u2014' : res.rate.toFixed(1) + '%');
    showPanel();
    renderSchedule(res.rows);

    if (!invalid && res.rows.length) {
      var labels = res.rows.map(function (r) { return 'Y' + r.year; });
      var data = res.rows.map(function (r) { return Math.round(r.dep); });
      renderChart(labels, [{ name: 'Depreciation', data: data, color: '#6366f1' }]);
    }
  }

  function toggleMethodFields() {
    var sel = $('method');
    if (!sel) return;
    var m = sel.value;
    var groups = document.querySelectorAll('[data-for]');
    for (var i = 0; i < groups.length; i++) {
      groups[i].style.display = groups[i].getAttribute('data-for') === m ? '' : 'none';
    }
  }

  function init() {
    var inputs = document.querySelectorAll('input[type="number"]');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].addEventListener('input', update);
    }
    var sel = $('method');
    if (sel) {
      sel.addEventListener('change', function () {
        toggleMethodFields();
        update();
      });
    }
    var calcBtn = $('calculateBtn');
    if (calcBtn) calcBtn.addEventListener('click', update);
    var resetBtn = $('resetBtn');
    if (resetBtn) resetBtn.addEventListener('click', function () {
      var config = window.calcConfig || {};
      var defaults = config.defaults || {};
      var id, el;
      for (id in defaults) {
        el = $(id);
        if (el) el.value = defaults[id];
      }
      toggleMethodFields();
      update();
    });

    toggleMethodFields();
    window.addEventListener('localechange', update);
    update();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
