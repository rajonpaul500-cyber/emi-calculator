const fs = require('fs');
const path = require('path');

const files = [
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

// Load MathCalc
const mathCode = fs.readFileSync(path.join(__dirname, '../js/math.js'), 'utf8');
const vm = require('vm');
const windowObj = {};
vm.runInNewContext(mathCode, { window: windowObj, Math: Math, parseInt: parseInt, parseFloat: parseFloat, isNaN: isNaN, isFinite: isFinite, String: String, Number: Number, Array: Array });
const MathCalc = windowObj.MathCalc;

console.log('Testing MathCalc exported keys:', Object.keys(MathCalc));

files.forEach(f => {
  const filePath = path.join(__dirname, '..', f);
  if (!fs.existsSync(filePath)) {
    console.error(`File does not exist: ${f}`);
    return;
  }
  const content = fs.readFileSync(filePath, 'utf8');

  // Find all inline scripts
  const scriptRegex = /<script(?![^>]*(?:src=|type="application))[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = scriptRegex.exec(content)) !== null) {
    const code = match[1];
    if (code.includes('dataLayer') || code.includes('emimaster-theme')) continue;

    // Check DOM IDs referenced
    const idRegex = /document\.getElementById\(["'`]([^"'`]+)["'`]\)/g;
    let idMatch;
    while ((idMatch = idRegex.exec(code)) !== null) {
      const id = idMatch[1];
      const hasId = content.includes(`id="${id}"`) || content.includes(`id='${id}'`);
      if (!hasId) {
        console.log(`[MISSING ID] in ${f}: id "${id}" is referenced in script but missing in HTML!`);
      }
    }

    // Check MathCalc method calls
    const mathCallRegex = /MathCalc\.([a-zA-Z0-9_]+)/g;
    let mathMatch;
    while ((mathMatch = mathCallRegex.exec(code)) !== null) {
      const method = mathMatch[1];
      if (typeof MathCalc[method] !== 'function') {
        console.log(`[MISSING METHOD] in ${f}: MathCalc.${method} is not a function!`);
      }
    }
  }
});
