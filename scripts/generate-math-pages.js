const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const GA = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-M8XM9611FL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-M8XM9611FL');
</script>`;

function generate(name, filename, inputs, script, faqs, extraStyle) {
  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  });
  const appJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: name,
    url: 'https://emimaster.com/' + filename,
    description: name + ' - 100% free, fast and accurate online calculator. Runs in your browser.',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
  });
  const faqHtml = faqs.map(f =>
    `<div class="faq-item">
      <div class="faq-q">${f.q}<span class="arrow">&#9654;</span></div>
      <div class="faq-a">${f.a}</div>
    </div>`
  ).join('\n    ');
  return `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
<script>try{if(localStorage.getItem("emimaster-theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}</script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${name} | EMI Master</title>
<meta name="description" content="Free online ${name}. Fast, accurate and mobile friendly. No signup - calculations run 100% in your browser.">
<meta name="keywords" content="${name.toLowerCase()}, free online math calculator, ${name.toLowerCase()} online">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://emimaster.com/${filename}">
<meta property="og:title" content="${name} | EMI Master">
<meta property="og:description" content="Free, fast, private ${name}. Works on all devices.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://emimaster.com/${filename}">
<script type="application/ld+json">${appJson}</script>
<script type="application/ld+json">${faqJson}</script>
<link rel="stylesheet" href="css/style.css">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
${extraStyle || ''}
</head>
<body>

<div id="siteHeader"></div>

<section class="hero hero-compact">
<div class="container">
<h1>${name}</h1>
<p>Fast, free, accurate and 100% private. Works on any device.</p>
</div>
</section>

<div class="layout">
<div id="siteSidebar"></div>

<main class="main-content">
<div class="breadcrumb"><a href="index.html">Home</a> &rsaquo; ${name}</div>
<h1 class="page-title">${name}</h1>
<p class="page-subtitle">Enter your values below and click the button for instant results.</p>

${inputs}

<div class="result-panel" id="resultPanel">
<h3 id="resultLabel">Result</h3>
<div class="result-main" id="resultMain">—</div>
<div class="result-grid" id="resultGrid"></div>
</div>

<div class="ad-slot ad-slot-responsive"><span class="ad-slot-label">Advertisement</span></div>

<div class="content-section">
<h2>About ${name}</h2>
<p>This ${name} is fast, accurate and 100% private. All calculations run locally in your browser, so your information never leaves your device. No sign-up, no downloads, works beautifully on mobile and desktop.</p>
</div>

<div class="content-section">
<h2>FAQ</h2>
${faqHtml}
</div>
</main>
</div>

<div id="siteFooter"></div>

<script src="js/math.js"></script>
<script>
${script}
</script>
<script src="js/currency.js"></script>
<script src="js/seo-content.js"></script>
<script src="js/common.js"></script>
</body>
</html>
`;
}

const pages = [];

function add(p) { pages.push(p); }

/* 1. Scientific */
add({
  name: 'Scientific Calculator',
  filename: 'scientific-calculator.html',
  inputs: `<div class="card">
<h2>Expression</h2>
<div class="form-group">
<label for="sciDisplay">Expression</label>
<input type="text" id="sciDisplay" value="2+3*(4-1)" style="font-size:1.4em;text-align:right;font-family:monospace">
<small>Use + - * / ( ) ^ &radic; &pi; sin cos tan log ln e. Example: sin(30*&pi;/180)+&radic;9</small>
</div>
<div class="calc-keypad">
<button class="btn btn-outline" onclick="b('7')">7</button>
<button class="btn btn-outline" onclick="b('8')">8</button>
<button class="btn btn-outline" onclick="b('9')">9</button>
<button class="btn btn-outline" onclick="b('/')">/</button>
<button class="btn btn-outline" onclick="b('4')">4</button>
<button class="btn btn-outline" onclick="b('5')">5</button>
<button class="btn btn-outline" onclick="b('6')">6</button>
<button class="btn btn-outline" onclick="b('*')">*</button>
<button class="btn btn-outline" onclick="b('1')">1</button>
<button class="btn btn-outline" onclick="b('2')">2</button>
<button class="btn btn-outline" onclick="b('3')">3</button>
<button class="btn btn-outline" onclick="b('-')">-</button>
<button class="btn btn-outline" onclick="b('0')">0</button>
<button class="btn btn-outline" onclick="b('.')">.</button>
<button class="btn btn-outline" onclick="b('(')">(</button>
<button class="btn btn-outline" onclick="b(')')">)</button>
<button class="btn btn-outline" onclick="b('^')">^</button>
<button class="btn btn-outline" onclick="b('Math.sqrt(')">&radic;</button>
<button class="btn btn-outline" onclick="b('Math.PI')">&pi;</button>
<button class="btn btn-outline" onclick="b('Math.sin(')">sin</button>
<button class="btn btn-outline" onclick="b('Math.cos(')">cos</button>
<button class="btn btn-outline" onclick="b('Math.tan(')">tan</button>
<button class="btn btn-outline" onclick="b('Math.log10(')">log</button>
<button class="btn btn-outline" onclick="b('Math.log(')">ln</button>
<button class="btn btn-outline" onclick="b('Math.E')">e</button>
<button class="btn btn-outline" onclick="b('+')">+</button>
</div>
<div class="form-actions">
<button class="btn btn-outline" id="clearBtn" type="button">Clear</button>
<button class="btn btn-primary" id="calcBtn" type="button">= Calculate</button>
</div>
</div>`,
  script: `function b(v){var d=document.getElementById('sciDisplay');d.value+=v;d.focus();}
document.getElementById('clearBtn').onclick=function(){document.getElementById('sciDisplay').value='';};
document.getElementById('calcBtn').onclick=function(){
var r=MathCalc.scientific(document.getElementById('sciDisplay').value);
document.getElementById('resultMain').textContent=r.error||MathCalc.fmt(r.value,10);
document.getElementById('resultGrid').innerHTML='';
};`,
  faqs: [
    { q: 'What functions does the Scientific Calculator support?', a: 'It supports + - * / parentheses, exponents (^), square root, pi, e, sin, cos, tan, log (base 10) and ln (natural log).' },
    { q: 'Is the calculator accurate?', a: 'Yes. All calculations use full JavaScript double-precision floating point math and results are shown with up to 10 decimal places.' }
  ]
});

/* ---------- Fraction ---------- */
add({
  name: 'Fraction Calculator',
  filename: 'fraction-calculator.html',
  inputs: `<div class="card">
<h2>Fraction Operations</h2>
<div class="form-grid">
<div class="form-group"><label>Fraction 1 Numerator</label><input type="number" id="n1" value="1" step="0.01"></div>
<div class="form-group"><label>Fraction 1 Denominator</label><input type="number" id="d1" value="3" step="0.01"></div>
<div class="form-group"><label>Operation</label>
<select id="op"><option value="add">+ Add</option><option value="sub">- Subtract</option><option value="mul">* Multiply</option><option value="div">/ Divide</option></select>
</div>
<div class="form-group"><label>Fraction 2 Numerator</label><input type="number" id="n2" value="1" step="0.01"></div>
<div class="form-group"><label>Fraction 2 Denominator</label><input type="number" id="d2" value="4" step="0.01"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var n1=parseFloat(document.getElementById('n1').value),d1=parseFloat(document.getElementById('d1').value);
var n2=parseFloat(document.getElementById('n2').value),d2=parseFloat(document.getElementById('d2').value);
var op=document.getElementById('op').value;
if(!d1||!d2){document.getElementById('resultMain').textContent='Denominators cannot be zero';return;}
var num,den;
switch(op){
case 'add': num=n1*d2+n2*d1; den=d1*d2; break;
case 'sub': num=n1*d2-n2*d1; den=d1*d2; break;
case 'mul': num=n1*n2; den=d1*d2; break;
case 'div': num=n1*d2; den=d1*n2; break;
}
if(den===0){document.getElementById('resultMain').textContent='Division by zero';return;}
var g=MathCalc.gcf(num,den).value;
num/=g; den/=g;
var dec=num/den;
document.getElementById('resultMain').textContent=num+' / '+den+' = '+MathCalc.fmt(dec,6);
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Decimal</div><div class="value">'+MathCalc.fmt(dec,6)+'</div></div>';
};`,
  faqs: [
    { q: 'How do I add two fractions?', a: 'Multiply the numerator of each fraction by the other denominator, add them for the new numerator, and multiply the denominators for the new denominator. Then simplify using the greatest common factor.' },
    { q: 'How do I divide fractions?', a: 'Flip the second fraction (reciprocal) and multiply. For example 1/2 / 3/4 = 1/2 * 4/3 = 4/6 = 2/3.' }
  ]
});

/* ---------- Percentage ---------- */
add({
  name: 'Percentage Calculator',
  filename: 'percentage-calculator.html',
  inputs: `<div class="card">
<h2>Percentage</h2>
<div class="form-grid">
<div class="form-group"><label>Calculate</label>
<select id="type">
<option value="pof">X % of a value</option>
<option value="change">Percent change from A to B</option>
<option value="ofwhat">A is what percent of B</option>
</select>
</div>
<div class="form-group"><label>Value A</label><input type="number" id="a" value="250" step="any"></div>
<div class="form-group"><label>Value B / Percent</label><input type="number" id="b" value="20" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var type=document.getElementById('type').value,a=parseFloat(document.getElementById('a').value),b=parseFloat(document.getElementById('b').value);
var out;
if(isNaN(a)||isNaN(b)){document.getElementById('resultMain').textContent='Enter valid numbers';return;}
if(type==='pof'){out=a*b/100;document.getElementById('resultMain').textContent=MathCalc.fmt(out,4);document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">'+b+'% of '+a+'</div><div class="value">'+MathCalc.fmt(out,4)+'</div></div>';}
else if(type==='change'){if(a===0){document.getElementById('resultMain').textContent='A cannot be zero';return;}out=(b-a)/a*100;document.getElementById('resultMain').textContent=MathCalc.fmt(out,2)+'%';document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Change</div><div class="value">'+MathCalc.fmt(out,2)+'%</div></div>';}
else{if(b===0){document.getElementById('resultMain').textContent='B cannot be zero';return;}out=a/b*100;document.getElementById('resultMain').textContent=MathCalc.fmt(out,2)+'%';document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">A as % of B</div><div class="value">'+MathCalc.fmt(out,2)+'%</div></div>';}
};`,
  faqs: [
    { q: 'What is the formula for percentage change?', a: 'Percentage change = (B - A) / A * 100. A positive result means an increase, negative means a decrease.' },
    { q: 'How do I find what percent A is of B?', a: 'Divide A by B and multiply by 100. For example 25 is 25% of 100.' }
  ]
});

/* ---------- Random Number Generator ---------- */
add({
  name: 'Random Number Generator',
  filename: 'random-number-generator.html',
  inputs: `<div class="card">
<h2>Random Numbers</h2>
<div class="form-grid">
<div class="form-group"><label>Minimum</label><input type="number" id="min" value="1"></div>
<div class="form-group"><label>Maximum</label><input type="number" id="max" value="100"></div>
<div class="form-group"><label>How many</label><input type="number" id="count" value="5" min="1" max="100"></div>
<div class="form-group"><label>Type</label><select id="type"><option value="int">Integer</option><option value="float">Decimal</option></select></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Generate</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var min=parseFloat(document.getElementById('min').value),max=parseFloat(document.getElementById('max').value),count=parseInt(document.getElementById('count').value),type=document.getElementById('type').value;
if(isNaN(min)||isNaN(max)||isNaN(count)||count<1||count>100){document.getElementById('resultMain').textContent='Enter valid values';return;}
var nums=type==='int'?MathCalc.randomInt(min,max,count):MathCalc.randomFloat(min,max,count,4);
document.getElementById('resultMain').textContent=nums.join(', ');
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Numbers ('+count+')</div><div class="value">'+nums.join(', ')+'</div></div>';
};`,
  faqs: [
    { q: 'What is a Random Number Generator?', a: 'It produces numbers that have no pattern, generating random integers or decimals between your chosen minimum and maximum values.' },
    { q: 'Can I generate decimals?', a: 'Yes. Choose the Decimal option to get random numbers with up to 4 decimal places.' }
  ]
});

/* ---------- Percent Error ---------- */
add({
  name: 'Percent Error Calculator',
  filename: 'percent-error-calculator.html',
  inputs: `<div class="card">
<h2>Percent Error</h2>
<div class="form-grid">
<div class="form-group"><label>Observed Value</label><input type="number" id="observed" value="105" step="any"></div>
<div class="form-group"><label>True / Expected Value</label><input type="number" id="true" value="100" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var o=parseFloat(document.getElementById('observed').value),t=parseFloat(document.getElementById('true').value);
if(isNaN(o)||isNaN(t)){document.getElementById('resultMain').textContent='Enter valid numbers';return;}
var r=MathCalc.percentError(o,t);
if(r.error){document.getElementById('resultMain').textContent=r.error;return;}
document.getElementById('resultMain').textContent=MathCalc.fmt(r.value,4)+'%';
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Absolute Error</div><div class="value">'+MathCalc.fmt(Math.abs(o-t),4)+'</div></div><div class="result-item"><div class="label">Percent Error</div><div class="value">'+MathCalc.fmt(r.value,4)+'%</div></div>';
};`,
  faqs: [
    { q: 'What is percent error?', a: 'Percent error measures how far an observed value is from the true/expected value as a percentage. Formula: |observed - true| / true * 100.' },
    { q: 'Why is it always positive?', a: 'Percent error uses absolute value because we want to measure the magnitude of the error, not its direction.' }
  ]
});

/* ---------- Exponent ---------- */
add({
  name: 'Exponent Calculator',
  filename: 'exponent-calculator.html',
  inputs: `<div class="card">
<h2>Exponent</h2>
<div class="form-grid">
<div class="form-group"><label>Base</label><input type="number" id="base" value="2" step="any"></div>
<div class="form-group"><label>Exponent</label><input type="number" id="exp" value="10" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var base=parseFloat(document.getElementById('base').value),exp=parseFloat(document.getElementById('exp').value);
if(isNaN(base)||isNaN(exp)){document.getElementById('resultMain').textContent='Enter valid numbers';return;}
var result=MathCalc.exponent(base,exp).value;
var display=result>1e15||result<1e-10?MathCalc.fmt(result,10):MathCalc.fmt(result,6);
document.getElementById('resultMain').textContent=display;
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">'+base+'^'+exp+'</div><div class="value">'+display+'</div></div><div class="result-item"><div class="label">Scientific</div><div class="value">'+MathCalc.toScientific(result,6).value+'</div></div>';
};`,
  faqs: [
    { q: 'What is an exponent?', a: 'An exponent tells you how many times to multiply the base by itself. For example 2^3 = 2 * 2 * 2 = 8.' },
    { q: 'What about fractional or negative exponents?', a: 'A fractional exponent (like 1/2) is a root. A negative exponent means 1 divided by the positive power.' }
  ]
});

/* ---------- Binary ---------- */
add({
  name: 'Binary Calculator',
  filename: 'binary-calculator.html',
  inputs: `<div class="card">
<h2>Binary Operations</h2>
<div class="form-grid">
<div class="form-group"><label>Binary A</label><input type="text" id="a" value="1010"></div>
<div class="form-group"><label>Binary B</label><input type="text" id="b" value="1100"></div>
<div class="form-group"><label>Operation</label>
<select id="op"><option value="add">+ Add</option><option value="sub">- Subtract</option><option value="mul">* Multiply</option><option value="div">/ Divide</option><option value="a2d">A to Decimal</option><option value="b2d">B to Decimal</option></select>
</div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var a=document.getElementById('a').value.trim(),b=document.getElementById('b').value.trim(),op=document.getElementById('op').value;
if(!/^[01]+$/.test(a)||(['add','sub','mul','div'].indexOf(op)>-1&&!/^[01]+$/.test(b))){document.getElementById('resultMain').textContent='Binary numbers can only contain 0 and 1';return;}
var A=parseInt(a,2),B=b?parseInt(b,2):0;
var res,label='Result';
switch(op){
case 'add':res=MathCalc.binaryAdd(a,b).value;label='Sum in binary';break;
case 'sub':res=MathCalc.binarySub(a,b).value;label='Difference in binary';break;
case 'mul':res=MathCalc.binaryMul(a,b).value;label='Product in binary';break;
case 'div':var d=MathCalc.binaryDiv(a,b);if(d.error){document.getElementById('resultMain').textContent=d.error;return;}res='Quotient: '+d.value.quotient+'  Remainder: '+d.value.remainder;label='Division';break;
case 'a2d':res=A;label='A in decimal';break;
case 'b2d':res=B;label='B in decimal';break;
}
document.getElementById('resultMain').textContent=String(res);
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">'+label+'</div><div class="value">'+String(res)+'</div></div>';
};`,
  faqs: [
    { q: 'How do I add binary numbers?', a: 'Line them up and add digit by digit right to left. If the sum is 2, write 0 and carry 1 to the left. Example: 101 + 11 = 1000.' },
    { q: 'What can I do with a binary calculator?', a: 'Add, subtract, multiply, divide binary numbers, or convert between binary and decimal.' }
  ]
});

/* ---------- Hex ---------- */
add({
  name: 'Hex Calculator',
  filename: 'hex-calculator.html',
  inputs: `<div class="card">
<h2>Hexadecimal Conversion</h2>
<div class="form-grid">
<div class="form-group"><label>Decimal</label><input type="number" id="dec" value="255"></div>
<div class="form-group"><label>Hex</label><input type="text" id="hex" value="FF"></div>
</div>
<div class="form-actions">
<button class="btn btn-primary" id="decToHex" type="button">Decimal to Hex</button>
<button class="btn btn-outline" id="hexToDec" type="button">Hex to Decimal</button>
</div>
</div>`,
  script: `document.getElementById('decToHex').onclick=function(){
var d=parseInt(document.getElementById('dec').value);
if(isNaN(d)){document.getElementById('resultMain').textContent='Enter a valid decimal';return;}
var res=MathCalc.decimalToHex(d);
document.getElementById('resultMain').textContent=res.value;
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Hex</div><div class="value">'+res.value+'</div></div><div class="result-item"><div class="label">Binary</div><div class="value">'+d.toString(2)+'</div></div>';
};
document.getElementById('hexToDec').onclick=function(){
var h=document.getElementById('hex').value.trim();
var r=MathCalc.hexToDecimal(h);
if(r.error){document.getElementById('resultMain').textContent=r.error;return;}
document.getElementById('resultMain').textContent=r.value;
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Decimal</div><div class="value">'+r.value+'</div></div><div class="result-item"><div class="label">Binary</div><div class="value">'+r.value.toString(2)+'</div></div>';
};`,
  faqs: [
    { q: 'What is hexadecimal?', a: 'Hexadecimal (hex) is a base-16 number system using digits 0-9 and letters A-F. It is widely used in computing because two hex digits represent one byte.' },
    { q: 'How do I convert decimal to hex?', a: 'Divide the decimal by 16 repeatedly and read the remainders from bottom to top. For example 255 = FF.' }
  ]
});

/* ---------- Half-Life ---------- */
add({
  name: 'Half-Life Calculator',
  filename: 'half-life-calculator.html',
  inputs: `<div class="card">
<h2>Half-Life Calculations</h2>
<div class="form-grid">
<div class="form-group"><label>Initial Amount</label><input type="number" id="initial" value="100"></div>
<div class="form-group"><label>Remaining Amount</label><input type="number" id="remaining" value="50"></div>
<div class="form-group"><label>Time Elapsed (any unit)</label><input type="number" id="time" value="5" min="0.0001"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate Half-Life</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var i=parseFloat(document.getElementById('initial').value),r=parseFloat(document.getElementById('remaining').value),t=parseFloat(document.getElementById('time').value);
if(isNaN(i)||isNaN(r)||isNaN(t)){document.getElementById('resultMain').textContent='Enter valid values';return;}
if(r<=0||i<=0||t<=0){document.getElementById('resultMain').textContent='Values must be positive';return;}
var hl=MathCalc.halfLife(i,r,t);
var decay=Math.log(2)/hl.value;
document.getElementById('resultMain').textContent=MathCalc.fmt(hl.value,4)+' units';
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Half-Life</div><div class="value">'+MathCalc.fmt(hl.value,4)+' units</div></div><div class="result-item"><div class="label">Decay Constant (k)</div><div class="value">'+MathCalc.fmt(decay,6)+' per unit time</div></div>';
};`,
  faqs: [
    { q: 'What is half-life?', a: 'Half-life is the time taken for half of a radioactive substance (or any decaying quantity) to decay or disintegrate.' },
    { q: 'How is half-life calculated from remaining amount?', a: 'Use the exponential decay formula: t(1/2) = (time * ln(2)) / ln(initial / remaining).' }
  ]
});

/* ---------- Quadratic ---------- */
add({
  name: 'Quadratic Formula Calculator',
  filename: 'quadratic-formula-calculator.html',
  inputs: `<div class="card">
<h2>Quadratic Equation ax^2 + bx + c = 0</h2>
<div class="form-grid">
<div class="form-group"><label>Coefficient a</label><input type="number" id="a" value="1" step="any"></div>
<div class="form-group"><label>Coefficient b</label><input type="number" id="b" value="5" step="any"></div>
<div class="form-group"><label>Coefficient c</label><input type="number" id="c" value="6" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Solve</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var a=parseFloat(document.getElementById('a').value),b=parseFloat(document.getElementById('b').value),c=parseFloat(document.getElementById('c').value);
if(isNaN(a)||isNaN(b)||isNaN(c)){document.getElementById('resultMain').textContent='Enter valid coefficients';return;}
var r=MathCalc.quadratic(a,b,c);
if(r.error){document.getElementById('resultMain').textContent=r.error;return;}
if(r.complex){
document.getElementById('resultMain').textContent='x = '+r.roots[0]+'  and  x = '+r.roots[1];
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Type</div><div class="value">Complex roots</div></div><div class="result-item"><div class="label">Discriminant</div><div class="value">'+MathCalc.fmt(r.discriminant,6)+'</div></div>';
}else{
document.getElementById('resultMain').textContent='x = '+MathCalc.fmt(r.roots[0],6)+'  and  x = '+MathCalc.fmt(r.roots[1],6);
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Root 1</div><div class="value">'+MathCalc.fmt(r.roots[0],6)+'</div></div><div class="result-item"><div class="label">Root 2</div><div class="value">'+MathCalc.fmt(r.roots[1],6)+'</div></div><div class="result-item"><div class="label">Discriminant</div><div class="value">'+MathCalc.fmt(r.discriminant,6)+'</div></div>';
}
};`,
  faqs: [
    { q: 'What is the quadratic formula?', a: 'x = (-b +/- sqrt(b^2 - 4ac)) / (2a). The discriminant (b^2 - 4ac) determines the nature of the roots.' },
    { q: 'What does the discriminant tell us?', a: 'If the discriminant is positive, there are two real roots. If zero, one real root. If negative, two complex roots.' }
  ]
});

/* ---------- Log ---------- */
add({
  name: 'Log Calculator',
  filename: 'log-calculator.html',
  inputs: `<div class="card">
<h2>Logarithm</h2>
<div class="form-grid">
<div class="form-group"><label>Number</label><input type="number" id="num" value="1000" min="0.0001"></div>
<div class="form-group"><label>Base</label><select id="baseSel"><option value="10">10 (common)</option><option value="e">e (natural)</option><option value="2">2</option></select></div>
<div class="form-group"><label>Custom Base</label><input type="number" id="baseCustom" value="10" min="0.001"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var n=parseFloat(document.getElementById('num').value);
if(isNaN(n)||n<=0){document.getElementById('resultMain').textContent='Number must be positive';return;}
var baseSel=document.getElementById('baseSel').value;
var base=baseSel==='e'?Math.E:baseSel==='2'?2:parseFloat(document.getElementById('baseCustom').value)||10;
var r=MathCalc.logarithm(n,base);
document.getElementById('resultMain').textContent=MathCalc.fmt(r.value,8);
var label=baseSel==='e'?'ln':'log base '+base;
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">'+label+'('+n+')</div><div class="value">'+MathCalc.fmt(r.value,8)+'</div></div>';
};`,
  faqs: [
    { q: 'What is a logarithm?', a: 'A logarithm answers "to what exponent must the base be raised to produce this number?" For example log(100) base 10 = 2 because 10^2 = 100.' },
    { q: 'What is the natural log?', a: 'The natural logarithm (ln) uses base e (about 2.71828). It is widely used in science and finance.' }
  ]
});

/* ---------- Ratio ---------- */
add({
  name: 'Ratio Calculator',
  filename: 'ratio-calculator.html',
  inputs: `<div class="card">
<h2>Ratio Simplifier</h2>
<div class="form-grid">
<div class="form-group"><label>Ratio A</label><input type="number" id="a" value="12"></div>
<div class="form-group"><label>Ratio B</label><input type="number" id="b" value="18"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Simplify Ratio</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var a=parseFloat(document.getElementById('a').value),b=parseFloat(document.getElementById('b').value);
if(!a||!b){document.getElementById('resultMain').textContent='Both values must be non-zero';return;}
var r=MathCalc.ratioSimplify(a,b);
document.getElementById('resultMain').textContent=r.value;
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Original</div><div class="value">'+r.original+'</div></div><div class="result-item"><div class="label">Simplified</div><div class="value">'+r.value+'</div></div>';
};`,
  faqs: [
    { q: 'How do you simplify a ratio?', a: 'Divide both parts by their greatest common factor (GCF). For example 12:18 simplifies to 2:3 because the GCF is 6.' },
    { q: 'What is a ratio?', a: 'A ratio compares two quantities. 4:2 = 2:1 means both sides can be divided by the same number to create equal ratios.' }
  ]
});

/* ---------- Root ---------- */
add({
  name: 'Root Calculator',
  filename: 'root-calculator.html',
  inputs: `<div class="card">
<h2>Root Calculator (nth Root)</h2>
<div class="form-grid">
<div class="form-group"><label>Number</label><input type="number" id="num" value="16" step="any"></div>
<div class="form-group"><label>Root (n)</label><input type="number" id="root" value="4" step="any" min="1"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate Root</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var n=parseFloat(document.getElementById('num').value),r=parseFloat(document.getElementById('root').value);
if(isNaN(n)||isNaN(r)){document.getElementById('resultMain').textContent='Enter valid numbers';return;}
var res=MathCalc.rootCalc(n,r);
if(res.error){document.getElementById('resultMain').textContent=res.error;return;}
document.getElementById('resultMain').textContent=MathCalc.fmt(res.value,6);
var displayWord=r===2?'square':r===3?'cube':r+'th';
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">'+displayWord+' root of '+n+'</div><div class="value">'+MathCalc.fmt(res.value,6)+'</div></div>';
};`,
  faqs: [
    { q: 'What is an nth root?', a: 'The nth root of a number x is a value that, when multiplied by itself n times, gives x. For example the 4th root of 16 is 2 because 2^4 = 16.' },
    { q: 'Can I calculate the square root?', a: 'Yes, enter the number and set the root to 2.' }
  ]
});

/* ---------- LCM ---------- */
add({
  name: 'Least Common Multiple Calculator',
  filename: 'least-common-multiple-calculator.html',
  inputs: `<div class="card">
<h2>Least Common Multiple (LCM)</h2>
<div class="form-group"><label>Numbers (comma separated)</label><input type="text" id="nums" value="12, 18, 24" placeholder="e.g. 12, 18, 24"></div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate LCM</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var raw=document.getElementById('nums').value.split(',').map(function(s){return parseInt(s.trim(),10);});
var nums=raw.filter(function(n){return !isNaN(n);});
if(nums.length<2){document.getElementById('resultMain').textContent='Enter at least two numbers';return;}
var r=MathCalc.lcmMulti(nums);
if(r.error){document.getElementById('resultMain').textContent=r.error;return;}
document.getElementById('resultMain').textContent=MathCalc.fmt(r.value,0);
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">LCM of '+nums.join(', ')+'</div><div class="value">'+MathCalc.fmt(r.value,0)+'</div></div>';
};`,
  faqs: [
    { q: 'What is the Least Common Multiple?', a: 'The LCM of two or more numbers is the smallest number that is a common multiple of all of them. It is used to find common denominators.' },
    { q: 'How do I find LCM?', a: 'Find the GCF first. LCM = |a * b| / GCF(a,b). For more than two numbers, repeat the process.' }
  ]
});

/* ---------- GCF ---------- */
add({
  name: 'Greatest Common Factor Calculator',
  filename: 'greatest-common-factor-calculator.html',
  inputs: `<div class="card">
<h2>Greatest Common Factor (GCF)</h2>
<div class="form-group"><label>Numbers (comma separated)</label><input type="text" id="nums" value="36, 48, 60" placeholder="e.g. 36, 48, 60"></div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate GCF</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var raw=document.getElementById('nums').value.split(',').map(function(s){return parseFloat(s.trim(),10);});
var nums=raw.filter(function(n){return !isNaN(n);});
if(nums.length<2){document.getElementById('resultMain').textContent='Enter at least two numbers';return;}
var r=MathCalc.gcfMulti(nums);
document.getElementById('resultMain').textContent=MathCalc.fmt(r.value,0);
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">GCF of '+nums.join(', ')+'</div><div class="value">'+MathCalc.fmt(r.value,0)+'</div></div>';
};`,
  faqs: [
    { q: 'What is the Greatest Common Factor?', a: 'The GCF is the largest positive integer that divides all given numbers. For example the GCF of 36 and 48 is 12.' },
    { q: 'What are factors?', a: 'Factors are numbers that divide into a number exactly. The GCF gives the biggest common factor across numbers.' }
  ]
});

/* ---------- Factor ---------- */
add({
  name: 'Factor Calculator',
  filename: 'factor-calculator.html',
  inputs: `<div class="card">
<h2>Factor Finder</h2>
<div class="form-group"><label>Number</label><input type="number" id="num" value="72"></div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Find Factors</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var n=parseFloat(document.getElementById('num').value);
if(isNaN(n)||n!==Math.floor(n)||n<=0){document.getElementById('resultMain').textContent='Enter a positive integer';return;}
var r=MathCalc.factor(n);
var primes=MathCalc.primeFactors(n);
document.getElementById('resultMain').textContent=r.value.join(', ');
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Factors ('+r.value.length+')</div><div class="value">'+r.value.join(', ')+'</div></div><div class="result-item"><div class="label">Prime Factors</div><div class="value">'+primes.join(' * ')+'</div></div>';
};`,
  faqs: [
    { q: 'What is a factor?', a: 'A factor of a number is a whole number that divides exactly into that number with no remainder.' },
    { q: 'What are prime factors?', a: 'Prime factors are the prime numbers that multiply together to give the original number. For example 72 = 2*2*2*3*3.' }
  ]
});

/* ---------- Rounding ---------- */
add({
  name: 'Rounding Calculator',
  filename: 'rounding-calculator.html',
  inputs: `<div class="card">
<h2>Rounding</h2>
<div class="form-grid">
<div class="form-group"><label>Number to Round</label><input type="number" id="num" value="3.14159" step="any"></div>
<div class="form-group"><label>Decimal Places</label><input type="number" id="decimals" value="2" min="0" max="10"></div>
<div class="form-group"><label>Nearest (optional)</label><input type="number" id="nearest" value="1" min="0.000001"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Round</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var v=parseFloat(document.getElementById('num').value),d=parseInt(document.getElementById('decimals').value),n=parseFloat(document.getElementById('nearest').value);
if(isNaN(v)){document.getElementById('resultMain').textContent='Enter a number';return;}
var r1=MathCalc.roundTo(v,d);
var r2=MathCalc.roundToNearest(v,n);
document.getElementById('resultMain').textContent=MathCalc.fmt(r1.value,d);
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Rounded to '+d+' decimals</div><div class="value">'+MathCalc.fmt(r1.value,d)+'</div></div><div class="result-item"><div class="label">Rounded to nearest '+n+'</div><div class="value">'+MathCalc.fmt(r2.value,4)+'</div></div>';
};`,
  faqs: [
    { q: 'How do I round to 2 decimal places?', a: 'Look at the third digit after the decimal. If it is 5 or above round up; otherwise leave it. For example 3.145 rounds to 3.15.' },
    { q: 'What is rounding to the nearest 0.5?', a: 'It rounds a number to the closest multiple of 0.5.' }
  ]
});

/* ---------- Matrix ---------- */
add({
  name: 'Matrix Calculator',
  filename: 'matrix-calculator.html',
  inputs: `<div class="card">
<h2>Matrix Operations (2x2 or 3x3)</h2>
<div class="form-group"><label>Dimension</label>
<select id="dim"><option value="2">2x2</option><option value="3">3x3</option></select>
</div>
<div class="matrix-grid">
<div class="matrix-box"><h3>Matrix A</h3><div id="matrixA"></div></div>
<div class="matrix-box"><h3>Matrix B</h3><div id="matrixB"></div></div>
</div>
<div class="form-group"><label>Operation</label>
<select id="matOp"><option value="add">Add (A+B)</option><option value="sub">Subtract (A-B)</option><option value="mul">Multiply (A*B)</option><option value="detA">Determinant of A</option><option value="detB">Determinant of B</option></select>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
  script: `function buildMatrices(){var dim=parseInt(document.getElementById('dim').value);var a=document.getElementById('matrixA'),b=document.getElementById('matrixB');a.innerHTML='';b.innerHTML='';for(var i=0;i<dim;i++){var rowA=document.createElement('div');rowA.className='matrix-row';var rowB=document.createElement('div');rowB.className='matrix-row';for(var j=0;j<dim;j++){var iA=document.createElement('input');iA.type='number';iA.value=(i===j)?1:0;iA.id='a'+i+j;var iB=document.createElement('input');iB.type='number';iB.value=(i===j)?2:0;iB.id='b'+i+j;rowA.appendChild(iA);rowB.appendChild(iB);}a.appendChild(rowA);b.appendChild(rowB);}}
function readMat(prefix){var dim=parseInt(document.getElementById('dim').value);var m=[];for(var i=0;i<dim;i++){m[i]=[];for(var j=0;j<dim;j++){var v=parseFloat(document.getElementById(prefix+i+j).value);if(isNaN(v))v=0;m[i][j]=v;}}return m;}
document.getElementById('dim').onchange=buildMatrices;buildMatrices();
document.getElementById('calcBtn').onclick=function(){
var dim=parseInt(document.getElementById('dim').value),op=document.getElementById('matOp').value;
var mA=readMat('a'),mB=readMat('b'),res;
if(op==='add'){res=MathCalc.matrixAdd(mA,mB);}
else if(op==='sub'){res=MathCalc.matrixSub(mA,mB);}
else if(op==='mul'){res=MathCalc.matrixMul(mA,mB);}
else if(op==='detA'){res=dim===2?MathCalc.matrixDet2(mA):MathCalc.matrixDet3(mA);document.getElementById('resultMain').textContent='Determinant: '+MathCalc.fmt(res,6);document.getElementById('resultGrid').innerHTML='';return;}
else if(op==='detB'){res=dim===2?MathCalc.matrixDet2(mB):MathCalc.matrixDet3(mB);document.getElementById('resultMain').textContent='Determinant: '+MathCalc.fmt(res,6);document.getElementById('resultGrid').innerHTML='';return;}
var rows=res.map(function(row){return '['+row.map(function(v){return MathCalc.fmt(v,4);}).join(', ')+']';}).join('&nbsp;&nbsp;');
document.getElementById('resultMain').textContent=rows;
document.getElementById('resultGrid').innerHTML='';
};`,
  extraStyle: `<style>
.matrix-grid{display:flex;gap:12px;flex-wrap:wrap}
.matrix-box{flex:1;min-width:180px}
.matrix-box input{width:56px;text-align:center;margin:2px}
.matrix-box .matrix-row{display:flex;gap:2px}
</style>`,
  faqs: [
    { q: 'How do you add matrices?', a: 'Add matching elements: A[i][j] + B[i][j]. Both matrices must have the same dimensions.' },
    { q: 'How is matrix multiplication done?', a: 'Row of A multiplied with column of B. The result cell at (i,j) is the sum of products of corresponding elements.' }
  ]
});

/* ---------- Scientific Notation ---------- */
add({
  name: 'Scientific Notation Calculator',
  filename: 'scientific-notation-calculator.html',
  inputs: `<div class="card">
<h2>Scientific Notation</h2>
<div class="form-grid">
<div class="form-group"><label>Number</label><input type="number" id="num" value="123456789" step="any"></div>
<div class="form-group"><label>Digits</label><input type="number" id="digits" value="6" min="1" max="15"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Convert</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var n=parseFloat(document.getElementById('num').value),d=parseInt(document.getElementById('digits').value)||6;
if(isNaN(n)){document.getElementById('resultMain').textContent='Enter a number';return;}
var r=MathCalc.toScientific(n,d);
document.getElementById('resultMain').textContent=r.value;
document.getElementById('resultGrid').innerHTML='<div class="result-item"><div class="label">Scientific</div><div class="value">'+r.value+'</div></div><div class="result-item"><div class="label">E-notation</div><div class="value">'+MathCalc.toSci(n,d)+'</div></div>';
};`,
  faqs: [
    { q: 'What is scientific notation?', a: 'A way to write very large or very small numbers compactly. For example 123000 = 1.23 * 10^5.' },
    { q: 'Why is scientific notation useful?', a: 'It makes very large and very small numbers easier to read and compare in math and science.' }
  ]
});

/* ---------- Big Number ---------- */
add({
  name: 'Big Number Calculator',
  filename: 'big-number-calculator.html',
  inputs: `<div class="card">
<h2>Big Numbers</h2>
<div class="form-grid">
<div class="form-group"><label>Enter a large number</label><input type="number" id="bigNum" value="1234567890123456" min="0"></div>
<div class="form-group"><label>Show as</label>
<select id="format"><option value="standard">Standard</option><option value="words">Words</option><option value="scientific">Scientific</option><option value="digits">Number of digits</option></select>
</div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Format</button></div>
</div>`,
  script: `document.getElementById('calcBtn').onclick=function(){
var n=parseFloat(document.getElementById('bigNum').value);
var f=document.getElementById('format').value;
if(isNaN(n)){document.getElementById('resultMain').textContent='Enter a number';return;}
var r=MathCalc.bigNumber(n,f);
document.getElementById('resultMain').textContent=r.value;
var html='<div class="result-item"><div class="label">Standard</div><div class="value">'+MathCalc.fmt(n,0)+'</div></div>';
if(f==='words'){html+='<div class="result-item"><div class="label">Billion</div><div class="value">'+r.billion+'</div></div><div class="result-item"><div class="label">Million</div><div class="value">'+r.million+'</div></div><div class="result-item"><div class="label">Thousand</div><div class="value">'+r.thousand+'</div></div>';}
document.getElementById('resultGrid').innerHTML=html;
};`,
  faqs: [
    { q: 'How many digits in a billion?', a: 'A billion is 1000000000, a 10 digit number (1 followed by 9 zeros).' },
    { q: 'What is scientific notation used for?', a: 'To write very large or very small numbers compactly, such as 1.23e15 for 1230000000000000.' }
  ]
});

let count = 0;
for (const p of pages) {
  const content = generate(p.name, p.filename, p.inputs, p.script, p.faqs, p.extra || '');
  fs.writeFileSync(path.join(rootDir, p.filename), content);
  console.log('Created ' + p.filename);
  count++;
}
console.log('Done: ' + count + ' pages created.');