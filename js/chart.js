/* ==========================================================================
   EMI Master - lightweight canvas bar chart (histogram) helper
   Renders grouped year-by-year bars for calculator result panels.
   Exposed as window.EMIChart.render(canvas, { labels, series }).
   ========================================================================== */

(function () {
  'use strict';

  function shortNum(v) {
    var sign = v < 0 ? '-' : '';
    v = Math.abs(v);
    if (v >= 1e7) return sign + (v / 1e7).toFixed(v >= 1e8 ? 0 : 1) + 'Cr';
    if (v >= 1e5) return sign + (v / 1e5).toFixed(0) + 'L';
    if (v >= 1e3) return sign + (v / 1e3).toFixed(0) + 'K';
    return sign + Math.round(v).toString();
  }

  function render(canvas, opts) {
    if (!canvas || !canvas.getContext) return;
    opts = opts || {};
    var labels = opts.labels || [];
    var series = opts.series || [];
    if (!labels.length || !series.length) return;

    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth || (canvas.parentElement ? canvas.parentElement.clientWidth : 0) || 600;
    if (w <= 0) return;
    var h = 240;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var textColor = isDark ? '#cbd5e1' : '#64748b';
    var gridColor = isDark ? '#334155' : '#e2e8f0';

    var max = 0;
    var min = 0;
    series.forEach(function (s) {
      s.data.forEach(function (v) {
        if (v > max) max = v;
        if (v < min) min = v;
      });
    });
    if (max <= 0 && min >= 0) max = 1;

    var padL = 58, padR = 12, padT = 34, padB = 34;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var range = max - min || 1;

    ctx.strokeStyle = gridColor;
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    var ticks = 4;
    ctx.textAlign = 'right';
    for (var t = 0; t <= ticks; t++) {
      var f = t / ticks;
      var y = padT + plotH - plotH * f;
      var val = min + range * f;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      ctx.fillText(shortNum(val), padL - 6, y + 4);
    }

    ctx.textAlign = 'left';
    ctx.fillText(shortNum(min), 4, padT + plotH + 4);

    var zeroY = padT + plotH - ((-min) / range) * plotH;

    var groupW = plotW / labels.length;
    var nSeries = series.length;
    var barW = groupW * 0.7 / nSeries;
    var gap = nSeries > 1 ? groupW * 0.04 : 0;

    series.forEach(function (s, si) {
      ctx.fillStyle = s.color || '#6366f1';
      s.data.forEach(function (v, li) {
        var x = padL + groupW * li + groupW * 0.15 + si * (barW + gap);
        var y = v >= 0 ? zeroY - (v / range) * plotH : zeroY;
        var bh = Math.max(1, Math.abs(v) / range * plotH);
        ctx.fillRect(x, y, barW, bh);
      });
    });

    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    var step = Math.max(1, Math.ceil(labels.length / 10));
    labels.forEach(function (l, li) {
      if (li % step !== 0 && li !== labels.length - 1) return;
      var x = padL + groupW * li + groupW / 2;
      ctx.fillText(l, x, h - 14);
    });

    var lx = padL;
    var ly = 16;
    series.forEach(function (s) {
      ctx.fillStyle = s.color;
      ctx.fillRect(lx, ly - 10, 12, 12);
      ctx.fillStyle = textColor;
      ctx.textAlign = 'left';
      ctx.fillText(s.name, lx + 16, ly);
      lx += 16 + ctx.measureText(s.name).width + 32;
    });

    try {
      canvas.dataset.last = JSON.stringify({ labels: labels, series: series });
    } catch (e) { /* ignore */ }
  }

  function init() {
    var canvas = document.getElementById('resultChart');
    if (canvas && window.EMIChart) {
      window.addEventListener('resize', function () {
        if (window.EMIChart && canvas.dataset.last) {
          window.EMIChart.render(canvas, JSON.parse(canvas.dataset.last));
        }
      });
    }
  }

  window.EMIChart = { render: render };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
