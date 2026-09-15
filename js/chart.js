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
    var h = canvas.clientHeight || (w < 480 ? 180 : 220);
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

    var padL = w < 480 ? 46 : 58, padR = 12, padT = 30, padB = 30;
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

  function renderDonut(canvas, opts) {
    if (!canvas || !canvas.getContext) return;
    opts = opts || {};
    var slices = opts.slices || [];
    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth || (canvas.parentElement ? canvas.parentElement.clientWidth : 0) || 280;
    if (w <= 0) return;
    var h = canvas.clientHeight || 240;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var textColor = isDark ? '#f1f5f9' : '#0f172a';
    var mutedColor = isDark ? '#94a3b8' : '#64748b';

    var total = 0;
    slices.forEach(function (s) { total += Math.max(0, s.value || 0); });

    var cx = w / 2;
    var cy = h / 2;
    var radius = Math.min(cx, cy) - 12;
    var innerRadius = radius * 0.64;

    if (total <= 0) {
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, 2 * Math.PI);
      ctx.arc(cx, cy, innerRadius, 2 * Math.PI, 0, true);
      ctx.fillStyle = isDark ? '#334155' : '#e2e8f0';
      ctx.fill();
      return;
    }

    var startAngle = -Math.PI / 2;
    slices.forEach(function (s) {
      var val = Math.max(0, s.value || 0);
      if (val <= 0) return;
      var sliceAngle = (val / total) * 2 * Math.PI;
      var endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.arc(cx, cy, radius, startAngle, endAngle);
      ctx.arc(cx, cy, innerRadius, endAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = s.color || '#3b82f6';
      ctx.fill();

      startAngle = endAngle;
    });

    if (opts.centerValue) {
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (opts.centerTitle) {
        ctx.font = '500 11px system-ui, -apple-system, sans-serif';
        ctx.fillStyle = mutedColor;
        ctx.fillText(opts.centerTitle, cx, cy - 11);
      }
      ctx.font = '700 18px system-ui, -apple-system, sans-serif';
      ctx.fillStyle = textColor;
      ctx.fillText(opts.centerValue, cx, cy + (opts.centerTitle ? 9 : 0));
    }

    try {
      canvas.dataset.lastDonut = JSON.stringify(opts);
    } catch (e) { /* ignore */ }
  }

  function renderArea(canvas, opts) {
    if (!canvas || !canvas.getContext) return;
    opts = opts || {};
    var labels = opts.labels || [];
    var series = opts.series || [];
    if (!labels.length || !series.length) return;

    var ctx = canvas.getContext('2d');
    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth || (canvas.parentElement ? canvas.parentElement.clientWidth : 0) || 600;
    if (w <= 0) return;
    var h = canvas.clientHeight || (w < 480 ? 190 : 230);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var textColor = isDark ? '#cbd5e1' : '#64748b';
    var gridColor = isDark ? '#334155' : '#e2e8f0';

    var max = 0;
    series.forEach(function (s) {
      s.data.forEach(function (v) { if (v > max) max = v; });
    });
    if (max <= 0) max = 1;

    var padL = w < 480 ? 46 : 60, padR = 14, padT = 32, padB = 30;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;

    ctx.strokeStyle = gridColor;
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';
    var ticks = 4;
    for (var t = 0; t <= ticks; t++) {
      var f = t / ticks;
      var y = padT + plotH - plotH * f;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      ctx.fillText(shortNum(max * f), padL - 6, y + 4);
    }

    var stepX = plotW / Math.max(1, labels.length - 1);

    series.forEach(function (s) {
      if (!s.data || !s.data.length) return;
      var pts = [];
      s.data.forEach(function (v, i) {
        var x = padL + i * stepX;
        var y = padT + plotH - (v / max) * plotH;
        pts.push({ x: x, y: y });
      });

      if (s.fill) {
        ctx.beginPath();
        ctx.moveTo(pts[0].x, padT + plotH);
        pts.forEach(function (pt) { ctx.lineTo(pt.x, pt.y); });
        ctx.lineTo(pts[pts.length - 1].x, padT + plotH);
        ctx.closePath();
        ctx.fillStyle = s.fill;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      pts.forEach(function (pt) { ctx.lineTo(pt.x, pt.y); });
      ctx.strokeStyle = s.color || '#3b82f6';
      ctx.lineWidth = 2.4;
      ctx.stroke();
    });

    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    var step = Math.max(1, Math.ceil(labels.length / 8));
    labels.forEach(function (l, li) {
      if (li % step !== 0 && li !== labels.length - 1) return;
      var x = padL + li * stepX;
      ctx.fillText(l, x, h - 12);
    });

    var lx = padL;
    var ly = 16;
    series.forEach(function (s) {
      ctx.fillStyle = s.color;
      ctx.fillRect(lx, ly - 8, 12, 10);
      ctx.fillStyle = textColor;
      ctx.textAlign = 'left';
      ctx.fillText(s.name, lx + 16, ly);
      lx += 16 + ctx.measureText(s.name).width + 24;
    });

    try {
      canvas.dataset.lastArea = JSON.stringify(opts);
    } catch (e) { /* ignore */ }
  }

  function init() {
    window.addEventListener('resize', function () {
      if (!window.EMIChart) return;
      document.querySelectorAll('canvas').forEach(function (canvas) {
        if (canvas.dataset.last) {
          window.EMIChart.render(canvas, JSON.parse(canvas.dataset.last));
        } else if (canvas.dataset.lastDonut) {
          window.EMIChart.renderDonut(canvas, JSON.parse(canvas.dataset.lastDonut));
        } else if (canvas.dataset.lastArea) {
          window.EMIChart.renderArea(canvas, JSON.parse(canvas.dataset.lastArea));
        }
      });
    });
  }

  window.EMIChart = {
    render: render,
    renderDonut: renderDonut,
    renderArea: renderArea
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
