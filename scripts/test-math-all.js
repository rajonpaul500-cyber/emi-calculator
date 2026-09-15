const fs = require('fs');
const path = require('path');
const vm = require('vm');

const mathFiles = [
  "scientific-calculator.html",
  "fraction-calculator.html",
  "percentage-calculator.html",
  "random-number-generator.html",
  "percent-error-calculator.html",
  "exponent-calculator.html",
  "binary-calculator.html",
  "hex-calculator.html",
  "half-life-calculator.html",
  "quadratic-formula-calculator.html",
  "log-calculator.html",
  "ratio-calculator.html",
  "root-calculator.html",
  "least-common-multiple-calculator.html",
  "greatest-common-factor-calculator.html",
  "factor-calculator.html",
  "rounding-calculator.html",
  "matrix-calculator.html",
  "scientific-notation-calculator.html",
  "big-number-calculator.html"
];

const mathCode = fs.readFileSync(path.join(__dirname, '../js/math.js'), 'utf8');

mathFiles.forEach(fileName => {
  const content = fs.readFileSync(path.join(__dirname, '..', fileName), 'utf8');
  console.log('Testing: ' + fileName);

  // Simple DOM simulation
  const elements = {};
  function getEl(id) {
    if (!elements[id]) {
      elements[id] = {
        id: id,
        value: '10',
        textContent: '',
        innerHTML: '',
        style: {},
        classList: {
          add: () => {},
          remove: () => {},
          contains: () => false,
          toggle: () => {}
        },
        focus: () => {},
        setAttribute: () => {},
        getAttribute: () => null,
        addEventListener: function(event, handler) {
          this['on' + event] = handler;
        },
        querySelectorAll: () => [],
        querySelector: () => null,
        children: []
      };
    }
    return elements[id];
  }

  // Pre-seed known elements from HTML regex
  const idMatches = content.matchAll(/id=["']([^"']+)["']/g);
  for (const m of idMatches) {
    getEl(m[1]);
  }

  // Find input values from HTML if any
  const inputMatches = content.matchAll(/<input[^>]*id=["']([^"']+)["'][^>]*value=["']([^"']*)["']/g);
  for (const im of inputMatches) {
    getEl(im[1]).value = im[2];
  }

  const documentMock = {
    getElementById: (id) => getEl(id),
    querySelectorAll: (sel) => [],
    querySelector: (sel) => null,
    createElement: (tag) => ({
      tagName: tag,
      style: {},
      classList: { add: () => {}, remove: () => {} },
      appendChild: () => {},
      addEventListener: () => {}
    }),
    documentElement: { setAttribute: () => {}, getAttribute: () => null }
  };

  const windowMock = {
    document: documentMock,
    MathCalc: null,
    localStorage: { getItem: () => null, setItem: () => {} },
    navigator: { clipboard: { writeText: () => Promise.resolve() } },
    addEventListener: () => {}
  };

  const sandbox = {
    window: windowMock,
    document: documentMock,
    Math: Math,
    parseInt: parseInt,
    parseFloat: parseFloat,
    isNaN: isNaN,
    isFinite: isFinite,
    String: String,
    Number: Number,
    Array: Array,
    Object: Object,
    console: console,
    setTimeout: (fn) => fn(),
    setInterval: () => 1,
    clearTimeout: () => {},
    clearInterval: () => {}
  };

  const ctx = vm.createContext(sandbox);

  // Run MathCalc first
  vm.runInContext(mathCode, ctx);
  ctx.MathCalc = ctx.window.MathCalc;

  // Find external or inline scripts
  const scriptRegex = /<script(?![^>]*(?:type="application))[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const code = match[1];
    if (code.includes('dataLayer') || code.includes('emimaster-theme')) continue;
    try {
      vm.runInContext(code, ctx);
    } catch (e) {
      console.error(`  ERROR running script in ${fileName}:`, e.message);
    }
  }

  // Also check external scripts if referenced
  const srcRegex = /<script\s+src=["']([^"']+)["']/gi;
  let srcMatch;
  while ((srcMatch = srcRegex.exec(content)) !== null) {
    const src = srcMatch[1];
    if (src !== 'js/math.js' && src !== 'js/currency.js' && src !== 'js/seo-content.js' && src !== 'js/common.js') {
      try {
        const extCode = fs.readFileSync(path.join(__dirname, '..', src), 'utf8');
        vm.runInContext(extCode, ctx);
      } catch (e) {
        console.error(`  ERROR running external script ${src} in ${fileName}:`, e.message);
      }
    }
  }

  // Now trigger onclick or onchange on buttons or elements
  Object.keys(elements).forEach(id => {
    const el = elements[id];
    if (el.onclick) {
      try {
        el.onclick({ preventDefault: () => {} });
      } catch (e) {
        console.error(`  ERROR triggering onclick for #${id} in ${fileName}:`, e.message);
      }
    }
  });
});

console.log('Math test suite completed.');
