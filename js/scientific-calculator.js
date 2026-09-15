/* ==========================================================================
   EMI Master - Professional Scientific Calculator Engine
   Authentic scientific calculator hardware experience:
   - Full scientific & engineering functions (Trig, Inv Trig, Hyp, Log, Exp, Powers, Roots, Fact, Mod, %, Memory)
   - Robust expression parser with PEMDAS order of operations & implicit multiplication
   - Exact degree/radian mode handling (sin(30)=0.5, cos(90)=0, tan(45)=1)
   - Memory registers (MC, MR, M+, M-, MS) with active 'M' screen indicator
   - 2nd / Inverse function toggle (sin⁻¹, cos⁻¹, tan⁻¹, eˣ, 10ˣ, ʸ√x, etc.)
   - Hyperbolic function toggle (sinh, cosh, tanh, asinh, acosh, atanh)
   - Interactive calculation history tape with recall & clipboard copy
   - Tactile hardware audio-click feedback (toggleable)
   - Full keyboard shortcut support
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  // State
  var expr = '';           // Internal math expression
  var displayExpr = '';    // User-friendly formula display (with natural symbols)
  var lastResult = null;   // Last computed result (Ans)
  var memory = 0;          // Memory register (M)
  var isDeg = true;        // Angle mode: true = Degrees, false = Radians
  var isInv = false;       // 2nd / Inverse functions mode
  var isHyp = false;       // Hyperbolic functions mode
  var soundEnabled = false;// Sound feedback toggle
  var history = [];        // Calculation history log

  // Audio Context for realistic tactile clicks
  var audioCtx = null;
  function playClick() {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (audioCtx.state === 'suspended') audioCtx.resume();
      var osc = audioCtx.createOscillator();
      var gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.03);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.03);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.03);
    } catch (e) {
      // Audio not supported or blocked
    }
  }

  /* --------------------------------------------------------------------------
     Scientific Math Evaluation Engine
     -------------------------------------------------------------------------- */

  // Factorial with memoization
  function factorial(n) {
    if (n < 0 || n > 170 || !Number.isInteger(n)) return NaN;
    if (n === 0 || n === 1) return 1;
    var res = 1;
    for (var i = 2; i <= n; i++) res *= i;
    return res;
  }

  // Exact degree trigonometric helpers
  function degToRad(d) {
    return (d * Math.PI) / 180;
  }

  function radToDeg(r) {
    return (r * 180) / Math.PI;
  }

  function sciSin(x) {
    if (!isDeg) return Math.sin(x);
    // Normalize to 0..360
    var deg = ((x % 360) + 360) % 360;
    if (deg === 0 || deg === 180 || deg === 360) return 0;
    if (deg === 90) return 1;
    if (deg === 270) return -1;
    if (deg === 30 || deg === 150) return 0.5;
    if (deg === 210 || deg === 330) return -0.5;
    return Math.sin(degToRad(deg));
  }

  function sciCos(x) {
    if (!isDeg) return Math.cos(x);
    var deg = ((x % 360) + 360) % 360;
    if (deg === 90 || deg === 270) return 0;
    if (deg === 0 || deg === 360) return 1;
    if (deg === 180) return -1;
    if (deg === 60 || deg === 300) return 0.5;
    if (deg === 120 || deg === 240) return -0.5;
    return Math.cos(degToRad(deg));
  }

  function sciTan(x) {
    if (!isDeg) return Math.tan(x);
    var deg = ((x % 360) + 360) % 360;
    if (deg === 90 || deg === 270) return NaN; // Undefined
    if (deg === 0 || deg === 180 || deg === 360) return 0;
    if (deg === 45 || deg === 225) return 1;
    if (deg === 135 || deg === 315) return -1;
    return Math.tan(degToRad(deg));
  }

  function sciAsin(x) {
    var val = Math.asin(x);
    return isDeg ? radToDeg(val) : val;
  }

  function sciAcos(x) {
    var val = Math.acos(x);
    return isDeg ? radToDeg(val) : val;
  }

  function sciAtan(x) {
    var val = Math.atan(x);
    return isDeg ? radToDeg(val) : val;
  }

  // Hyperbolic functions
  function sciSinh(x) { return Math.sinh ? Math.sinh(x) : (Math.exp(x) - Math.exp(-x)) / 2; }
  function sciCosh(x) { return Math.cosh ? Math.cosh(x) : (Math.exp(x) + Math.exp(-x)) / 2; }
  function sciTanh(x) { return Math.tanh ? Math.tanh(x) : (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x)); }
  function sciAsinh(x) { return Math.asinh ? Math.asinh(x) : Math.log(x + Math.sqrt(x * x + 1)); }
  function sciAcosh(x) { return Math.acosh ? Math.acosh(x) : Math.log(x + Math.sqrt(x * x - 1)); }
  function sciAtanh(x) { return Math.atanh ? Math.atanh(x) : 0.5 * Math.log((1 + x) / (1 - x)); }

  // Root helper: y-th root of x => nthRoot(x, y)
  function sciRoot(x, y) {
    if (y === 0) return NaN;
    if (x < 0 && y % 2 === 0) return NaN;
    if (x < 0) return -Math.pow(-x, 1 / y);
    return Math.pow(x, 1 / y);
  }

  // Modulo helper
  function sciMod(a, b) {
    if (b === 0) return NaN;
    return ((a % b) + b) % b;
  }

  // Parse and evaluate an expression string safely
  function evaluateExpression(raw) {
    if (!raw || !raw.trim()) return { value: 0 };

    var s = raw.trim();

    // 1. Replace UI symbols with mathematical equivalents
    s = s.replace(/×/g, '*')
         .replace(/÷/g, '/')
         .replace(/−/g, '-')
         .replace(/–/g, '-')
         .replace(/π/g, 'Math.PI')
         .replace(/ANS/gi, '(' + (lastResult !== null ? lastResult : 0) + ')');

    // Handle standalone 'e' (not preceded by a letter, digit, dot, or followed by digit, dot)
    s = s.replace(/(^|[^a-zA-Z0-9_.])e([^a-zA-Z0-9_.e]|$)/g, '$1Math.E$2');

    // Replace square root symbol √x or √(x)
    s = s.replace(/√\(/g, '__fn.sqrt(');
    s = s.replace(/√([0-9.]+|Math\.PI|Math\.E)/g, '__fn.sqrt($1)');

    // 2. Implicit multiplication patterns:
    // e.g., 2(3+4) => 2*(3+4), (2+3)(4+1) => (2+3)*(4+1), 5sin(30) => 5*sin(30)
    // 2π => 2*Math.PI
    s = s.replace(/(\d+(\.\d+)?)\s*(Math\.PI|Math\.E)/g, '$1*$3');
    s = s.replace(/(Math\.PI|Math\.E)\s*(\d+(\.\d+)?)/g, '$1*$2');
    s = s.replace(/(\))\s*(\()/g, '$1*$2');
    s = s.replace(/(\d+(\.\d+)?)\s*(\()/g, '$1*$3');
    s = s.replace(/(\))\s*(\d+(\.\d+)?)/g, '$1*$2');
    s = s.replace(/(\))\s*(Math\.PI|Math\.E)/g, ')*$1');
    s = s.replace(/(Math\.PI|Math\.E)\s*\(/g, '$1*(');
    s = s.replace(/(\d+(\.\d+)?)\s*([a-zA-Z]+)\(/g, '$1*$3(');

    // 3. Map function tokens to safe scoped calls using single-pass regex with longest match first
    var FN_KEYS = [
      'asinh', 'acosh', 'atanh',
      'sinh', 'cosh', 'tanh',
      'asin', 'acos', 'atan',
      'log10', 'log2', 'sqrt', 'cbrt', 'root',
      'floor', 'ceil', 'round', 'exp', 'abs',
      'sin', 'cos', 'tan', 'log', 'ln'
    ];
    var fnRegex = new RegExp('(^|[^a-zA-Z0-9_.])(' + FN_KEYS.join('|') + ')\\(', 'g');
    s = s.replace(fnRegex, '$1__fn.$2(');

    // Handle modulo infix: a mod b => __fn.mod(a, b)
    s = s.replace(/([0-9.]+|\))\s*mod\s*([0-9.]+|\()/g, '__fn.mod($1, $2)');

    // Handle power operator ^ => **
    s = s.replace(/\^/g, '**');

    // Handle percentage:
    // e.g. a + b% => a + (a * b / 100)
    // a - b% => a - (a * b / 100)
    // a * b% => a * (b / 100)
    // b% => (b / 100)
    s = s.replace(/(\d+(\.\d+)?)\s*([+-])\s*(\d+(\.\d+)?)%/g, '($1 $3 ($1 * $4 / 100))');
    s = s.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

    // Handle factorials: e.g. 5! => __fn.fact(5) or (3+2)! => __fn.fact((3+2))
    s = s.replace(/(\d+)!/g, '__fn.fact($1)');
    s = s.replace(/(\([^)]+\))!/g, '__fn.fact($1)');

    // Auto-balance missing closing parentheses
    var openCount = (s.match(/\(/g) || []).length;
    var closeCount = (s.match(/\)/g) || []).length;
    while (closeCount < openCount) {
      s += ')';
      closeCount++;
    }

    // Scoped execution environment
    var __fn = {
      sin: sciSin,
      cos: sciCos,
      tan: sciTan,
      asin: sciAsin,
      acos: sciAcos,
      atan: sciAtan,
      sinh: sciSinh,
      cosh: sciCosh,
      tanh: sciTanh,
      asinh: sciAsinh,
      acosh: sciAcosh,
      atanh: sciAtanh,
      ln: Math.log,
      log: Math.log10,
      log10: Math.log10,
      log2: Math.log2,
      sqrt: Math.sqrt,
      cbrt: Math.cbrt,
      abs: Math.abs,
      floor: Math.floor,
      ceil: Math.ceil,
      round: Math.round,
      exp: Math.exp,
      fact: factorial,
      root: sciRoot,
      mod: sciMod
    };

    try {
      /* eslint-disable no-new-func */
      var evaluator = new Function('__fn', 'Math', '"use strict"; return (' + s + ');');
      var val = evaluator(__fn, Math);
      /* eslint-enable no-new-func */

      if (val === null || val === undefined || isNaN(val)) {
        return { error: 'Math Error' };
      }
      if (!isFinite(val)) {
        return { error: 'Cannot divide by 0' };
      }

      // Clean floating point rounding noise (e.g. 0.1 + 0.2 = 0.3)
      val = cleanFloat(val);
      return { value: val };
    } catch (err) {
      return { error: 'Syntax Error' };
    }
  }

  // Floating point cleaner
  function cleanFloat(val) {
    if (Math.abs(val) < 1e-15) return 0;
    // Format to 12 significant digits, then parse back to strip trailing float dust
    var rounded = parseFloat(val.toPrecision(12));
    // If integer, return integer
    if (Number.isInteger(rounded)) return rounded;
    return rounded;
  }

  // Format output for high-res LCD screen
  function formatDisplayNum(val) {
    if (val === null || val === undefined) return '0';
    if (isNaN(val)) return 'Error';
    if (!isFinite(val)) return val > 0 ? 'Infinity' : '-Infinity';

    var abs = Math.abs(val);
    // If very huge or microscopic, use scientific exponential notation
    if ((abs >= 1e12 || (abs > 0 && abs < 1e-7))) {
      return val.toExponential(6).replace('e+', 'e');
    }

    // Format with commas and appropriate decimal places
    var str = val.toString();
    if (str.indexOf('.') !== -1) {
      var parts = str.split('.');
      var integerPart = Number(parts[0]).toLocaleString('en-US');
      var decPart = parts[1].slice(0, 10);
      return integerPart + '.' + decPart;
    }
    return Number(val).toLocaleString('en-US');
  }

  /* --------------------------------------------------------------------------
     UI Updates and Display Controller
     -------------------------------------------------------------------------- */

  function updateDisplay(preview) {
    var formulaEl = $('sciFormula');
    var resultEl = $('sciMainResult');
    var previewEl = $('sciPreviewResult');

    if (formulaEl) {
      formulaEl.textContent = displayExpr || '0';
      // Auto-scroll formula line to end
      formulaEl.scrollLeft = formulaEl.scrollWidth;
    }

    // Indicators
    var degBadge = $('degIndicator');
    if (degBadge) {
      degBadge.textContent = isDeg ? 'DEG' : 'RAD';
      degBadge.className = 'sci-indicator ' + (isDeg ? 'active' : 'alt');
    }

    var invBadge = $('invIndicator');
    if (invBadge) {
      invBadge.className = 'sci-indicator ' + (isInv ? 'active' : '');
    }

    var hypBadge = $('hypIndicator');
    if (hypBadge) {
      hypBadge.className = 'sci-indicator ' + (isHyp ? 'active' : '');
    }

    var memBadge = $('memIndicator');
    if (memBadge) {
      memBadge.className = 'sci-indicator ' + (memory !== 0 ? 'active' : '');
    }

    // Real-time live evaluation preview
    if (preview && displayExpr) {
      var res = evaluateExpression(expr);
      if (!res.error && res.value !== undefined) {
        if (previewEl) previewEl.textContent = '= ' + formatDisplayNum(res.value);
      } else {
        if (previewEl) previewEl.textContent = '';
      }
    } else {
      if (previewEl) previewEl.textContent = '';
    }
  }

  /* --------------------------------------------------------------------------
     Input and Button Actions
     -------------------------------------------------------------------------- */

  // Append token to expression
  function inputToken(disp, raw) {
    playClick();
    if (!raw) raw = disp;

    // If starting fresh right after calculation, start new or chain operator
    if (lastResult !== null && isArithmeticOp(raw)) {
      displayExpr = 'Ans ' + disp;
      expr = 'ANS ' + raw;
      lastResult = null;
      updateDisplay(true);
      return;
    }

    displayExpr += disp;
    expr += raw;
    updateDisplay(true);
  }

  function isArithmeticOp(op) {
    return op === '+' || op === '-' || op === '*' || op === '/' || op === '^' || op === 'mod';
  }

  // Clear All (AC)
  function clearAll() {
    playClick();
    displayExpr = '';
    expr = '';
    var resultEl = $('sciMainResult');
    if (resultEl) resultEl.textContent = '0';
    var previewEl = $('sciPreviewResult');
    if (previewEl) previewEl.textContent = '';
    updateDisplay(false);
  }

  // Backspace (DEL)
  function deleteLast() {
    playClick();
    if (!displayExpr) return;

    // Check for multi-character tokens like 'sin(', 'cos(', 'Ans', 'mod', etc.
    var multiTokens = [
      'sin⁻¹(', 'cos⁻¹(', 'tan⁻¹(', 'sinh⁻¹(', 'cosh⁻¹(', 'tanh⁻¹(',
      'sinh(', 'cosh(', 'tanh(', 'asin(', 'acos(', 'atan(',
      'sin(', 'cos(', 'tan(', 'log10(', 'log2(', 'log(', 'ln(',
      'sqrt(', 'cbrt(', 'root(', 'abs(', 'Ans', 'mod'
    ];

    var deleted = false;
    for (var i = 0; i < multiTokens.length; i++) {
      var tok = multiTokens[i];
      if (displayExpr.endsWith(tok)) {
        displayExpr = displayExpr.slice(0, -tok.length);
        // Clean raw expression accordingly
        expr = cleanRawTrailing(expr);
        deleted = true;
        break;
      }
    }

    if (!deleted) {
      displayExpr = displayExpr.slice(0, -1);
      expr = expr.slice(0, -1);
    }

    updateDisplay(true);
  }

  function cleanRawTrailing(s) {
    // Strips the last function call or word from raw expr
    return s.replace(/([a-zA-Z0-9_.]+\(?|\S)\s*$/, '');
  }

  // Negate current number (±)
  function negate() {
    playClick();
    if (!displayExpr) {
      inputToken('-', '-');
      return;
    }
    // If ends with a number, wrap in negation
    var match = displayExpr.match(/(-?\d+(\.\d+)?)$/);
    if (match) {
      var numStr = match[0];
      var idx = displayExpr.lastIndexOf(numStr);
      if (numStr.startsWith('-')) {
        var pos = numStr.substring(1);
        displayExpr = displayExpr.substring(0, idx) + pos;
        expr = expr.substring(0, expr.lastIndexOf(numStr)) + pos;
      } else {
        var neg = '(-' + numStr + ')';
        displayExpr = displayExpr.substring(0, idx) + neg;
        expr = expr.substring(0, expr.lastIndexOf(numStr)) + neg;
      }
    } else {
      inputToken('(-', '(-');
    }
    updateDisplay(true);
  }

  // Evaluate Expression (=)
  function calculate() {
    playClick();
    if (!displayExpr && lastResult === null) return;

    var toEval = expr || String(lastResult || 0);
    var res = evaluateExpression(toEval);

    var resultEl = $('sciMainResult');
    var previewEl = $('sciPreviewResult');

    if (res.error) {
      if (resultEl) {
        resultEl.textContent = res.error;
        resultEl.classList.add('error');
      }
      if (previewEl) previewEl.textContent = '';
      return;
    }

    if (resultEl) {
      resultEl.classList.remove('error');
      resultEl.textContent = formatDisplayNum(res.value);
    }
    if (previewEl) previewEl.textContent = '';

    // Record into history
    addHistoryItem(displayExpr || toEval, formatDisplayNum(res.value), res.value);

    // Save as Ans
    lastResult = res.value;
    displayExpr = '';
    expr = '';
    updateDisplay(false);
  }

  // Toggle DEG / RAD
  function toggleAngleMode() {
    playClick();
    isDeg = !isDeg;
    updateDisplay(true);
    var modeBtn = $('btnToggleDeg');
    if (modeBtn) modeBtn.textContent = isDeg ? 'RAD' : 'DEG';
    var pill = $('degModePill');
    if (pill) pill.textContent = isDeg ? 'DEG' : 'RAD';
  }

  // Toggle 2nd / Inverse functions
  function toggleInverse() {
    playClick();
    isInv = !isInv;
    updateKeyLabels();
    updateDisplay(false);
  }

  // Toggle Hyperbolic functions
  function toggleHyp() {
    playClick();
    isHyp = !isHyp;
    updateKeyLabels();
    updateDisplay(false);
  }

  // Update dynamic keypad labels for 2nd and HYP modes
  function updateKeyLabels() {
    var btnSin = $('btnSin');
    var btnCos = $('btnCos');
    var btnTan = $('btnTan');
    var btnLn = $('btnLn');
    var btnLog = $('btnLog');
    var btnSqrt = $('btnSqrt');
    var btnPow = $('btnPow');
    var btnX2 = $('btnX2');
    var btnInvX = $('btnInvX');
    var btnPct = $('btnPct');
    var btnFact = $('btnFact');
    var btnMr = $('btnMr');
    var btnMPlus = $('btnMPlus');
    var btn2nd = $('btn2nd');
    var btnHyp = $('btnHyp');

    if (btn2nd) {
      if (isInv) btn2nd.classList.add('active');
      else btn2nd.classList.remove('active');
    }

    if (btnHyp) {
      if (isHyp) btnHyp.classList.add('active');
      else btnHyp.classList.remove('active');
    }

    if (isHyp) {
      if (isInv) {
        if (btnSin) { btnSin.innerHTML = 'sinh<sup>-1</sup>'; btnSin.dataset.fn = 'asinh('; }
        if (btnCos) { btnCos.innerHTML = 'cosh<sup>-1</sup>'; btnCos.dataset.fn = 'acosh('; }
        if (btnTan) { btnTan.innerHTML = 'tanh<sup>-1</sup>'; btnTan.dataset.fn = 'atanh('; }
      } else {
        if (btnSin) { btnSin.textContent = 'sinh'; btnSin.dataset.fn = 'sinh('; }
        if (btnCos) { btnCos.textContent = 'cosh'; btnCos.dataset.fn = 'cosh('; }
        if (btnTan) { btnTan.textContent = 'tanh'; btnTan.dataset.fn = 'tanh('; }
      }
    } else {
      if (isInv) {
        if (btnSin) { btnSin.innerHTML = 'sin<sup>-1</sup>'; btnSin.dataset.fn = 'asin('; }
        if (btnCos) { btnCos.innerHTML = 'cos<sup>-1</sup>'; btnCos.dataset.fn = 'acos('; }
        if (btnTan) { btnTan.innerHTML = 'tan<sup>-1</sup>'; btnTan.dataset.fn = 'atan('; }
      } else {
        if (btnSin) { btnSin.textContent = 'sin'; btnSin.dataset.fn = 'sin('; }
        if (btnCos) { btnCos.textContent = 'cos'; btnCos.dataset.fn = 'cos('; }
        if (btnTan) { btnTan.textContent = 'tan'; btnTan.dataset.fn = 'tan('; }
      }
    }

    if (isInv) {
      if (btnLn) { btnLn.innerHTML = 'e<sup>x</sup>'; btnLn.dataset.fn = 'exp('; }
      if (btnLog) { btnLog.innerHTML = '10<sup>x</sup>'; btnLog.dataset.fn = '10^('; }
      if (btnSqrt) { btnSqrt.innerHTML = '&#8731;'; btnSqrt.dataset.fn = 'cbrt('; }
      if (btnPow) { btnPow.innerHTML = '<sup>y</sup>&radic;x'; btnPow.dataset.fn = 'root('; }
      if (btnX2) { btnX2.innerHTML = 'x<sup>3</sup>'; btnX2.dataset.fn = '^3'; }
      if (btnInvX) { btnInvX.textContent = '|x|'; btnInvX.dataset.fn = 'abs('; }
      if (btnPct) { btnPct.textContent = 'EXP'; btnPct.dataset.fn = '*10^'; btnPct.dataset.disp = 'E'; }
      if (btnFact) { btnFact.textContent = 'RND'; btnFact.dataset.fn = 'rnd'; }
      if (btnMr) { btnMr.textContent = 'MS'; btnMr.dataset.fn = 'MS'; }
      if (btnMPlus) { btnMPlus.textContent = 'M-'; btnMPlus.dataset.fn = 'M-'; }
    } else {
      if (btnLn) { btnLn.textContent = 'ln'; btnLn.dataset.fn = 'ln('; }
      if (btnLog) { btnLog.textContent = 'log'; btnLog.dataset.fn = 'log('; }
      if (btnSqrt) { btnSqrt.innerHTML = '&radic;'; btnSqrt.dataset.fn = 'sqrt('; }
      if (btnPow) { btnPow.innerHTML = 'x<sup>y</sup>'; btnPow.dataset.fn = '^'; }
      if (btnX2) { btnX2.innerHTML = 'x<sup>2</sup>'; btnX2.dataset.fn = '^2'; }
      if (btnInvX) { btnInvX.textContent = '1/x'; btnInvX.dataset.fn = '1/x'; }
      if (btnPct) { btnPct.textContent = '%'; btnPct.dataset.fn = '%'; btnPct.dataset.disp = '%'; }
      if (btnFact) { btnFact.textContent = 'n!'; btnFact.dataset.fn = '!'; }
      if (btnMr) { btnMr.textContent = 'MR'; btnMr.dataset.fn = 'MR'; }
      if (btnMPlus) { btnMPlus.textContent = 'M+'; btnMPlus.dataset.fn = 'M+'; }
    }
  }

  // Memory Functions
  function memoryClear() {
    playClick();
    memory = 0;
    updateDisplay(false);
    showNotice('Memory Cleared (MC)');
  }

  function memoryRecall() {
    playClick();
    inputToken(String(memory), String(memory));
    showNotice('Memory Recalled (MR = ' + formatDisplayNum(memory) + ')');
  }

  function memoryAdd() {
    playClick();
    var currentVal = getCurrentVal();
    memory += currentVal;
    memory = cleanFloat(memory);
    updateDisplay(false);
    showNotice('M+ Added (' + formatDisplayNum(memory) + ')');
  }

  function memorySub() {
    playClick();
    var currentVal = getCurrentVal();
    memory -= currentVal;
    memory = cleanFloat(memory);
    updateDisplay(false);
    showNotice('M- Subtracted (' + formatDisplayNum(memory) + ')');
  }

  function memoryStore() {
    playClick();
    memory = getCurrentVal();
    memory = cleanFloat(memory);
    updateDisplay(false);
    showNotice('Memory Stored (MS = ' + formatDisplayNum(memory) + ')');
  }

  function getCurrentVal() {
    if (expr) {
      var r = evaluateExpression(expr);
      if (!r.error && r.value !== undefined) return r.value;
    }
    if (lastResult !== null) return lastResult;
    return 0;
  }

  function showNotice(msg) {
    var toast = $('sciScreenNotice');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.opacity = '1';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(function () {
      toast.style.opacity = '0';
    }, 1800);
  }

  /* --------------------------------------------------------------------------
     Calculation History Log
     -------------------------------------------------------------------------- */

  function addHistoryItem(formula, resultStr, rawValue) {
    history.unshift({
      formula: formula,
      resultStr: resultStr,
      rawValue: rawValue,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    });
    if (history.length > 30) history.pop();
    renderHistory();
  }

  function renderHistory() {
    var listEl = $('sciHistoryList');
    if (!listEl) return;

    if (history.length === 0) {
      listEl.innerHTML = '<div class="history-empty">No calculations recorded yet.</div>';
      return;
    }

    var html = '';
    history.forEach(function (item, idx) {
      html += '<div class="history-item" data-idx="' + idx + '">' +
        '<div class="history-item-top">' +
          '<span class="history-formula">' + escapeHtml(item.formula) + '</span>' +
          '<span class="history-time">' + item.time + '</span>' +
        '</div>' +
        '<div class="history-item-bottom">' +
          '<span class="history-equals">=</span>' +
          '<span class="history-result">' + item.resultStr + '</span>' +
        '</div>' +
      '</div>';
    });

    listEl.innerHTML = html;

    // Attach click listeners to restore calculation
    var items = listEl.querySelectorAll('.history-item');
    items.forEach(function (el) {
      el.addEventListener('click', function () {
        var idx = parseInt(el.getAttribute('data-idx'), 10);
        var chosen = history[idx];
        if (chosen) {
          displayExpr = String(chosen.rawValue);
          expr = String(chosen.rawValue);
          lastResult = chosen.rawValue;
          var resultEl = $('sciMainResult');
          if (resultEl) resultEl.textContent = chosen.resultStr;
          updateDisplay(false);
          showNotice('Restored Ans = ' + chosen.resultStr);
        }
      });
    });
  }

  function clearHistory() {
    history = [];
    renderHistory();
    showNotice('History Cleared');
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  // Copy result to clipboard
  function copyResult() {
    var resultEl = $('sciMainResult');
    var text = resultEl ? resultEl.textContent : '';
    if (!text || text === '0') return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        showNotice('Result copied to clipboard!');
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      showNotice('Result copied to clipboard!');
    }
  }

  /* --------------------------------------------------------------------------
     Physical Keyboard Bindings
     -------------------------------------------------------------------------- */

  function handleKeydown(e) {
    // If typing in a regular form input or search box elsewhere on the page, ignore
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
      return;
    }

    var key = e.key;

    if (key >= '0' && key <= '9') {
      inputToken(key, key);
      e.preventDefault();
    } else if (key === '.') {
      inputToken('.', '.');
      e.preventDefault();
    } else if (key === '+') {
      inputToken(' + ', '+');
      e.preventDefault();
    } else if (key === '-') {
      inputToken(' − ', '-');
      e.preventDefault();
    } else if (key === '*' || key === 'x' || key === 'X') {
      inputToken(' × ', '*');
      e.preventDefault();
    } else if (key === '/') {
      inputToken(' ÷ ', '/');
      e.preventDefault();
    } else if (key === '(' || key === ')') {
      inputToken(key, key);
      e.preventDefault();
    } else if (key === '^') {
      inputToken('^', '^');
      e.preventDefault();
    } else if (key === '%') {
      inputToken('%', '%');
      e.preventDefault();
    } else if (key === '!') {
      inputToken('!', '!');
      e.preventDefault();
    } else if (key === 'Enter' || key === '=') {
      calculate();
      e.preventDefault();
    } else if (key === 'Backspace') {
      deleteLast();
      e.preventDefault();
    } else if (key === 'Escape') {
      clearAll();
      e.preventDefault();
    } else if (key.toLowerCase() === 's') {
      inputToken('sin(', 'sin(');
      e.preventDefault();
    } else if (key.toLowerCase() === 'c') {
      inputToken('cos(', 'cos(');
      e.preventDefault();
    } else if (key.toLowerCase() === 't') {
      inputToken('tan(', 'tan(');
      e.preventDefault();
    } else if (key.toLowerCase() === 'p') {
      inputToken('π', 'π');
      e.preventDefault();
    } else if (key.toLowerCase() === 'e') {
      inputToken('e', 'e');
      e.preventDefault();
    } else if (key.toLowerCase() === 'l') {
      inputToken('ln(', 'ln(');
      e.preventDefault();
    }
  }

  /* --------------------------------------------------------------------------
     Initialization & DOM Bindings
     -------------------------------------------------------------------------- */

  document.addEventListener('DOMContentLoaded', function () {
    // Keypad button clicks
    var keys = document.querySelectorAll('.sci-key[data-fn]');
    keys.forEach(function (k) {
      k.addEventListener('click', function () {
        var fn = k.dataset.fn;
        var disp = k.dataset.disp || fn;

        if (fn === '=') {
          calculate();
        } else if (fn === 'AC') {
          clearAll();
        } else if (fn === 'DEL') {
          deleteLast();
        } else if (fn === '±') {
          negate();
        } else if (fn === 'deg') {
          toggleAngleMode();
        } else if (fn === '2nd') {
          toggleInverse();
        } else if (fn === 'hyp') {
          toggleHyp();
        } else if (fn === 'MC') {
          memoryClear();
        } else if (fn === 'MR') {
          memoryRecall();
        } else if (fn === 'M+') {
          memoryAdd();
        } else if (fn === 'M-') {
          memorySub();
        } else if (fn === 'MS') {
          memoryStore();
        } else if (fn === 'rnd') {
          var rVal = Math.random().toFixed(4);
          inputToken(rVal, rVal);
        } else if (fn === 'Ans') {
          inputToken('Ans', 'ANS');
        } else if (fn === '^2') {
          inputToken('^2', '^2');
        } else if (fn === '^3') {
          inputToken('^3', '^3');
        } else if (fn === '1/x') {
          inputToken('1/(', '1/(');
        } else if (fn === 'root(') {
          inputToken('root(', 'root(');
        } else if (fn === '10^(') {
          inputToken('10^(', '10^(');
        } else if (fn === 'exp(') {
          inputToken('exp(', 'exp(');
        } else if (fn === 'copy') {
          copyResult();
        } else {
          inputToken(disp, fn);
        }
      });
    });

    // Screen clickable angle indicator toggle
    var degInd = $('degIndicator');
    if (degInd) degInd.addEventListener('click', toggleAngleMode);

    var btnPill = $('degModePill');
    if (btnPill) btnPill.addEventListener('click', toggleAngleMode);

    // Audio click toggle
    var soundBtn = $('sciSoundToggle');
    if (soundBtn) {
      soundBtn.addEventListener('click', function () {
        soundEnabled = !soundEnabled;
        soundBtn.classList.toggle('active', soundEnabled);
        soundBtn.title = soundEnabled ? 'Button Sound: ON' : 'Button Sound: OFF';
        showNotice(soundEnabled ? 'Key Sound: ON' : 'Key Sound: OFF');
      });
    }

    // Copy Result button on screen
    var copyBtn = $('sciCopyBtn');
    if (copyBtn) copyBtn.addEventListener('click', copyResult);

    // History clear
    var histClearBtn = $('sciHistoryClear');
    if (histClearBtn) histClearBtn.addEventListener('click', clearHistory);

    // Keyboard listener
    window.addEventListener('keydown', handleKeydown);

    // Initial setup
    updateKeyLabels();
    updateDisplay(false);
    renderHistory();
  });

})();
