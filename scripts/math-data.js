/* EMI Master - Math calculators content & features database */
module.exports = [
  {
    name: "Scientific Calculator",
    filename: "scientific-calculator.html",
    title: "Scientific Calculator - Free Online Scientific Calculator",
    description: "Free online scientific calculator with trigonometry, logarithms, exponents, roots and constants. Solve any math expression instantly in your browser.",
    keywords: "scientific calculator, free scientific calculator online, trig calculator, math expression calculator",
    tagline: "Solve trigonometry, logarithms, exponents and full expressions in seconds.",
    intro: "Enter a mathematical expression below (or tap the buttons) and press Calculate. Everything runs locally in your browser, so your expressions never leave your device.",
    card: `<div class="card">
<h2>Expression</h2>
<div class="form-group">
<label for="sciDisplay">Expression</label>
<input type="text" id="sciDisplay" value="sin(30)+sqrt(9)*2" style="font-size:1.5em;text-align:right;font-family:monospace">
<small>Use + - * / ( ) ^ &radic; &pi; ! sin cos tan asin acos atan ln log log10 x^2 x^3 1/x e %. Example: sin(30)+&radic;9</small>
</div>
<div class="form-group">
<label for="degMode">Angle mode</label>
<select id="degMode">
<option value="deg">Degrees</option>
<option value="rad">Radians</option>
</select>
</div>
<div class="calc-keypad">
<button type="button" class="btn btn-outline" onclick="b('(')">(</button>
<button type="button" class="btn btn-outline" onclick="b(')')">)</button>
<button type="button" class="btn btn-outline" onclick="b('%')">%</button>
<button type="button" class="btn btn-outline" id="clearBtn">C</button>
<button type="button" class="btn btn-outline" onclick="b('7')">7</button>
<button type="button" class="btn btn-outline" onclick="b('8')">8</button>
<button type="button" class="btn btn-outline" onclick="b('9')">9</button>
<button type="button" class="btn btn-outline" onclick="b('/')">&divide;</button>
<button type="button" class="btn btn-outline" onclick="b('4')">4</button>
<button type="button" class="btn btn-outline" onclick="b('5')">5</button>
<button type="button" class="btn btn-outline" onclick="b('6')">6</button>
<button type="button" class="btn btn-outline" onclick="b('*')">&times;</button>
<button type="button" class="btn btn-outline" onclick="b('1')">1</button>
<button type="button" class="btn btn-outline" onclick="b('2')">2</button>
<button type="button" class="btn btn-outline" onclick="b('3')">3</button>
<button type="button" class="btn btn-outline" onclick="b('-')">&minus;</button>
<button type="button" class="btn btn-outline" onclick="b('0')">0</button>
<button type="button" class="btn btn-outline" onclick="b('.')">.</button>
<button type="button" class="btn btn-outline" onclick="b('^')">x^y</button>
<button type="button" class="btn btn-outline" onclick="b('+')">+</button>
<button type="button" class="btn btn-outline" onclick="b('Math.sqrt(')">&radic;</button>
<button type="button" class="btn btn-outline" onclick="b('Math.PI')">&pi;</button>
<button type="button" class="btn btn-outline" onclick="b('Math.E')">e</button>
<button type="button" class="btn btn-outline" onclick="b('!')">n!</button>
<button type="button" class="btn btn-outline" onclick="b('Math.sin(')">sin</button>
<button type="button" class="btn btn-outline" onclick="b('Math.cos(')">cos</button>
<button type="button" class="btn btn-outline" onclick="b('Math.tan(')">tan</button>
<button type="button" class="btn btn-outline" onclick="b('Math.asin(')">asin</button>
<button type="button" class="btn btn-outline" onclick="b('Math.acos(')">acos</button>
<button type="button" class="btn btn-outline" onclick="b('Math.atan(')">atan</button>
<button type="button" class="btn btn-outline" onclick="b('Math.log10(')">log</button>
<button type="button" class="btn btn-outline" onclick="b('Math.log(')">ln</button>
<button type="button" class="btn btn-outline" onclick="b('Math.log2(')">log2</button>
<button type="button" class="btn btn-outline" onclick="b('Math.abs(')">|x|</button>
<button type="button" class="btn btn-outline" onclick="b('Math.floor(')">floor</button>
<button type="button" class="btn btn-outline" onclick="b('Math.ceil(')">ceil</button>
<button type="button" class="btn btn-outline" onclick="b('Math.exp(')">e^x</button>
<button type="button" class="btn btn-outline" id="backBtn">&#9003;</button>
</div>
<div class="form-actions">
<button class="btn btn-primary" id="calcBtn" type="button">= Calculate</button>
</div>
</div>`,
    script: `var deg = true;
function b(v){var d=document.getElementById("sciDisplay");d.value+=v;d.focus();}
function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("clearBtn").onclick=function(){document.getElementById("sciDisplay").value="";document.getElementById("resultMain").textContent="\u2014";document.getElementById("resultGrid").innerHTML="";};
document.getElementById("backBtn").onclick=function(){var d=document.getElementById("sciDisplay");d.value=d.value.slice(0,-1);d.focus();};
document.getElementById("degMode").onchange=function(){deg=this.value==="deg";};
document.getElementById("calcBtn").onclick=function(){
var expr=document.getElementById("sciDisplay").value;
var r=MathCalc.scientific(expr,deg);
if(r.error){document.getElementById("resultMain").textContent=r.error;document.getElementById("resultGrid").innerHTML="";return;}
var out=MathCalc.fmt(r.value,10);
document.getElementById("resultMain").textContent=out;
document.getElementById("resultGrid").innerHTML=item("Expression",expr)+item("Result",out)+item("Mode",deg?"Degrees":"Radians");
};`,
    facts: [
      { k: "Functions", v: "sin, cos, tan, asin, acos, atan, log, ln, log2" },
      { k: "Operators", v: "+ - &times; &divide; ^ ( ) % !" },
      { k: "Constants", v: "&pi; and e built in" },
      { k: "Privacy", v: "All math runs in your browser" }
    ],
    sections: [
      {
        title: "How a scientific calculator works",
        body: [
          "A scientific calculator evaluates an expression by following the standard order of operations: parentheses first, then exponents and roots, then multiplication and division, and finally addition and subtraction. This calculator applies the same rules and returns results with up to 10 decimal places.",
          "Trigonometric functions accept an angle in degrees or radians. Switch the angle mode at the top of the keypad: in Degrees mode, sin(30) returns 0.5; in Radians mode, sin(30) returns about -0.988 because 30 is interpreted as 30 radians.",
          "You can mix functions freely, for example sin(45) + sqrt(2)/2 or 5! / (2*3). The percent operator converts a number to a hundredth, so 200 + 10% gives 210."
        ]
      },
      {
        title: "Common uses",
        body: [
          "Students use scientific calculators to check trigonometry homework, solve quadratic expressions and explore logarithms and factorials.",
          "Engineers and analysts rely on them for quick conversions, exponent rules and evaluating formulas with constants such as pi and Euler's number e."
        ]
      }
    ],
    steps: [
      "Type your expression into the input box or tap the keypad buttons.",
      "Choose Degrees or Radians for trigonometry functions.",
      "Press the Calculate button (or the equals key).",
      "Read the result below; the expression and result are shown together for easy checking."
    ],
    tips: [
      "Use parentheses to control grouping, for example (2+3)*4 instead of 2+3*4.",
      "The caret ^ means 'raised to the power of', so 2^10 equals 1024.",
      "Press C to clear the screen and the backspace key to remove the last digit."
    ],
    pros: [
      "Handles long mixed expressions in one step",
      "Degree and radian modes for trigonometry",
      "Factorials, percent and constants built in"
    ],
    cons: [
      "Trig functions work on simple grouped arguments",
      "Very large results are shown in compact form"
    ],
    faqs: [
      { q: "Is a free online scientific calculator accurate?", a: "Yes. It uses JavaScript double-precision floating point math, which is accurate to about 15 significant digits. Results are displayed with up to 10 decimal places." },
      { q: "What is the difference between degrees and radians?", a: "Degrees split a circle into 360 parts, while radians use the radius as the unit, making a full circle equal 2\u03C0 radians. Use degrees for everyday geometry and radians for calculus and physics." },
      { q: "How do I calculate the factorial of a number?", a: "Type a number followed by the exclamation mark, for example 5!, which equals 5 \u00D7 4 \u00D7 3 \u00D7 2 \u00D7 1 = 120. The calculator supports factorials up to 170!." },
      { q: "How do I find the square root?", a: "Tap the \u221A key and type a number inside the parentheses, for example \u221A(144), which returns 12." },
      { q: "Does this calculator store my expressions?", a: "No. Everything is computed inside your browser and nothing is saved or sent to a server." }
    ],
    related: [
      { href: "fraction-calculator.html", label: "Fraction Calculator", icon: "\u2159" },
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "exponent-calculator.html", label: "Exponent Calculator", icon: "\u00B2" },
      { href: "log-calculator.html", label: "Log Calculator", icon: "log" },
      { href: "root-calculator.html", label: "Root Calculator", icon: "\u221A" }
    ]
  },

  {
    name: "Fraction Calculator",
    filename: "fraction-calculator.html",
    title: "Fraction Calculator - Add, Subtract, Multiply & Divide Fractions",
    description: "Free fraction calculator with mixed numbers. Add, subtract, multiply, divide, simplify and convert fractions to decimals instantly.",
    keywords: "fraction calculator, mixed number calculator, simplify fractions, decimal to fraction, fraction to decimal",
    tagline: "Add, subtract, multiply, divide, simplify and convert fractions with mixed numbers.",
    intro: "Use the tools below to add, subtract, multiply or divide fractions (including mixed numbers), simplify a fraction, or convert between fractions and decimals.",
    card: `<div class="card">
<h2>Fraction arithmetic</h2>
<div class="form-grid">
<div class="form-group"><label>Whole 1</label><input type="number" id="w1" value="1"></div>
<div class="form-group"><label>Numerator 1</label><input type="number" id="n1" value="1"></div>
<div class="form-group"><label>Denominator 1</label><input type="number" id="d1" value="3"></div>
<div class="form-group"><label>Operation</label>
<select id="op">
<option value="add">+ Add</option>
<option value="sub">- Subtract</option>
<option value="mul">* Multiply</option>
<option value="div">/ Divide</option>
</select>
</div>
<div class="form-group"><label>Whole 2</label><input type="number" id="w2" value="0"></div>
<div class="form-group"><label>Numerator 2</label><input type="number" id="n2" value="1"></div>
<div class="form-group"><label>Denominator 2</label><input type="number" id="d2" value="4"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="fracBtn" type="button">Calculate</button></div>
</div>

<div class="card">
<h2>Simplify a fraction</h2>
<div class="form-grid">
<div class="form-group"><label>Numerator</label><input type="number" id="sn" value="18"></div>
<div class="form-group"><label>Denominator</label><input type="number" id="sd" value="24"></div>
</div>
<div class="form-actions"><button class="btn btn-outline" id="simpBtn" type="button">Simplify</button></div>
</div>

<div class="card">
<h2>Decimal to fraction</h2>
<div class="form-grid">
<div class="form-group"><label>Decimal</label><input type="number" id="dec" value="0.375" step="any"></div>
<div class="form-group"><label>Max denominator</label>
<select id="maxDen"><option value="16">16</option><option value="32">32</option><option value="64">64</option><option value="100">100</option><option value="1000">1000</option></select>
</div>
</div>
<div class="form-actions"><button class="btn btn-outline" id="d2fBtn" type="button">Convert to fraction</button></div>
</div>

<div class="card">
<h2>Fraction to decimal</h2>
<div class="form-grid">
<div class="form-group"><label>Numerator</label><input type="number" id="fn" value="3"></div>
<div class="form-group"><label>Denominator</label><input type="number" id="fd" value="8"></div>
</div>
<div class="form-actions"><button class="btn btn-outline" id="f2dBtn" type="button">Convert to decimal</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
function fracHtml(num,den){return '<span class="frac-display"><span class="frac-top">'+num+'</span><span class="frac-bottom">'+den+'</span></span>';}
function toF(w,n,d){var whole=parseFloat(w.value)||0;var num=parseFloat(n.value)||0;var den=parseFloat(d.value)||0;if(den===0){return null;}var res=MathCalc.fromMixed(whole,num,den);return {num:res.num,den:res.den};}
function showFrac(num,den,label){if(den===0){document.getElementById("resultMain").textContent="Denominator cannot be zero";document.getElementById("resultGrid").innerHTML="";return;}
var s=MathCalc.simplifyFraction(num,den);var mx=MathCalc.toMixed(s.num,s.den);var dec=s.num/s.den;
var grid=item(label||"Fraction",fracHtml(num,den))+item("Simplified",fracHtml(s.num,s.den));
if(mx.whole!==0){grid+=item("Mixed number",(mx.whole>0?"+":"")+mx.whole+' '+mx.num+'/'+mx.den);}else if(mx.num!==0){grid+=item("Mixed number",(s.num<0?"-":"")+mx.num+'/'+mx.den);}
grid+=item("Decimal",MathCalc.fmt(dec,6));
document.getElementById("resultMain").innerHTML=fracHtml(num,den)+" = "+fracHtml(s.num,s.den);
document.getElementById("resultGrid").innerHTML=grid;}
document.getElementById("fracBtn").onclick=function(){
var A=toF(document.getElementById("w1"),document.getElementById("n1"),document.getElementById("d1"));
var B=toF(document.getElementById("w2"),document.getElementById("n2"),document.getElementById("d2"));
if(!A||!B){document.getElementById("resultMain").textContent="Denominators cannot be zero";return;}
var op=document.getElementById("op").value,num,den;
switch(op){
case "add":num=A.num*B.den+B.num*A.den;den=A.den*B.den;break;
case "sub":num=A.num*B.den-B.num*A.den;den=A.den*B.den;break;
case "mul":num=A.num*B.num;den=A.den*B.den;break;
case "div":num=A.num*B.den;den=A.den*B.num;break;}
if(den===0){document.getElementById("resultMain").textContent="Cannot divide by zero";return;}
showFrac(num,den);};
document.getElementById("simpBtn").onclick=function(){var n=parseFloat(document.getElementById("sn").value)||0,d=parseFloat(document.getElementById("sd").value)||0;showFrac(n,d,"Input");};
document.getElementById("d2fBtn").onclick=function(){var v=parseFloat(document.getElementById("dec").value);if(isNaN(v)){document.getElementById("resultMain").textContent="Enter a decimal";return;}
var r=MathCalc.decimalToFraction(v,parseInt(document.getElementById("maxDen").value,10));if(r.error){document.getElementById("resultMain").textContent=r.error;return;}
showFrac(r.num,r.den);};
document.getElementById("f2dBtn").onclick=function(){var n=parseFloat(document.getElementById("fn").value)||0,d=parseFloat(document.getElementById("fd").value)||0;
if(d===0){document.getElementById("resultMain").textContent="Denominator cannot be zero";return;}
var v=n/d;document.getElementById("resultMain").textContent=MathCalc.fmt(v,8);
document.getElementById("resultGrid").innerHTML=item("Fraction",n+' / '+d)+item("Decimal",MathCalc.fmt(v,8));};`,
    facts: [
      { k: "Operations", v: "Add, subtract, multiply, divide" },
      { k: "Mixed numbers", v: "Supported with whole parts" },
      { k: "Extra tools", v: "Simplify, decimal &harr; fraction" },
      { k: "Always simplified", v: "Uses the greatest common factor" }
    ],
    sections: [
      {
        title: "What is a fraction?",
        body: [
          "A fraction represents a part of a whole. It has a numerator on top and a denominator below, for example 3/8 means 3 parts out of 8 equal parts. The denominator can never be zero because dividing by zero is undefined.",
          "Fractions can be proper (3/8, less than 1), improper (8/3, greater than 1) or mixed numbers (2 1/3, a whole number plus a fraction). This calculator accepts all three forms and always reports simplified results."
        ]
      },
      {
        title: "How fraction operations work",
        body: [
          "To add or subtract fractions, first give them a common denominator, then add or subtract the numerators. For example 1/4 + 1/6: the least common denominator is 12, giving 3/12 + 2/12 = 5/12.",
          "Multiplication is simpler: multiply the numerators together and the denominators together, then simplify. Division is multiplication by the reciprocal: 3/4 &divide; 1/6 = 3/4 &times; 6/1 = 18/4 = 4 1/2.",
          "After any operation the result is reduced to its lowest terms by dividing the numerator and denominator by their greatest common factor."
        ]
      },
      {
        title: "Converting between fractions and decimals",
        body: [
          "To convert a fraction to a decimal, divide the numerator by the denominator. For example 3/8 = 0.375.",
          "To convert a decimal to a fraction, the calculator finds the closest fraction whose denominator is below your chosen limit. For example 0.375 becomes 3/8 because 0.375 = 375/1000, which simplifies by 125."
        ]
      }
    ],
    steps: [
      "For arithmetic, enter the whole parts, numerators and denominators of both fractions and pick an operation.",
      "Press Calculate to see the simplified fraction, mixed number and decimal value.",
      "Use the Simplify tool to reduce any fraction to lowest terms.",
      "Use the Decimal-to-fraction tool to convert a decimal like 0.75 into 3/4.",
      "Use the Fraction-to-decimal tool to see the exact decimal value of any fraction."
    ],
    tips: [
      "Leave the whole part at 0 to work with simple fractions.",
      "A negative whole part makes the whole fraction negative, matching standard mixed-number notation.",
      "For division, the result is the same as multiplying by the flipped second fraction."
    ],
    pros: [
      "Handles mixed numbers, improper and proper fractions",
      "Shows simplified, mixed and decimal results together",
      "Includes decimal to fraction conversion with adjustable precision"
    ],
    cons: [
      "Accepts one denominator limit for decimal conversion",
      "Extremely large numerators are best handled by the Big Number calculator"
    ],
    faqs: [
      { q: "How do I add two fractions?", a: "Give them a common denominator, then add the numerators. For example 1/4 + 1/6 becomes 3/12 + 2/12 = 5/12. The calculator does this automatically and simplifies the result." },
      { q: "How do I divide fractions?", a: "Multiply the first fraction by the reciprocal of the second. For example 3/4 \u00F7 1/6 = 3/4 \u00D7 6/1 = 18/4 = 4 1/2." },
      { q: "What is a mixed number?", a: "A mixed number combines a whole number and a proper fraction, like 2 1/3. It equals 2 + 1/3, which is the improper fraction 7/3." },
      { q: "How do I convert a decimal to a fraction?", a: "The calculator finds the closest fraction with a denominator under your chosen limit. For example 0.375 converts to 3/8, and 0.75 converts to 3/4." },
      { q: "Why can't a denominator be zero?", a: "Division by zero is undefined in mathematics, so a fraction with a zero denominator has no value. The calculator warns you when this happens." }
    ],
    related: [
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "ratio-calculator.html", label: "Ratio Calculator", icon: "\u2236" },
      { href: "greatest-common-factor-calculator.html", label: "GCF Calculator", icon: "\u2248" },
      { href: "least-common-multiple-calculator.html", label: "LCM Calculator", icon: "\u00D7" },
      { href: "scientific-calculator.html", label: "Scientific Calculator", icon: "\u221A" }
    ]
  },

  {
    name: "Percentage Calculator",
    filename: "percentage-calculator.html",
    title: "Percentage Calculator - Percent of a Value, Change & More",
    description: "Free percentage calculator. Find X% of Y, what percent A is of B, percentage change, and add or subtract a percentage from any value.",
    keywords: "percentage calculator, percent calculator, percent change calculator, percentage increase calculator",
    tagline: "Percent of a value, percent change, and add/subtract percentages in one tool.",
    intro: "Pick the calculation you need, enter the two numbers, and get the exact percentage result with a short explanation.",
    card: `<div class="card">
<h2>Percentage calculation</h2>
<div class="form-grid">
<div class="form-group"><label>Calculation type</label>
<select id="type">
<option value="pof">What is X% of Y?</option>
<option value="what">X is what percent of Y?</option>
<option value="change">Percentage change from X to Y</option>
<option value="add">Increase Y by X%</option>
<option value="sub">Decrease Y by X%</option>
</select>
</div>
<div class="form-group"><label>Value X</label><input type="number" id="a" value="20" step="any"></div>
<div class="form-group"><label>Value Y</label><input type="number" id="b" value="250" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var type=document.getElementById("type").value;
var x=parseFloat(document.getElementById("a").value);
var y=parseFloat(document.getElementById("b").value);
var out,grid="",main;
if(isNaN(x)||isNaN(y)){document.getElementById("resultMain").textContent="Enter valid numbers";document.getElementById("resultGrid").innerHTML="";return;}
if(type==="pof"){out=MathCalc.percentOfPart(y,x).value;main=x+"% of "+MathCalc.fmt(y,4)+" = "+MathCalc.fmt(out,4);grid=item("Formula","("+x+"/100) \u00D7 "+y)+item("Result",MathCalc.fmt(out,4));}
else if(type==="what"){if(y===0){document.getElementById("resultMain").textContent="Y cannot be zero";return;}out=MathCalc.whatPercent(x,y).value;main=x+" is "+MathCalc.fmt(out,2)+"% of "+y;grid=item("Formula","("+x+"/"+y+") \u00D7 100")+item("Result",MathCalc.fmt(out,2)+"%");}
else if(type==="change"){if(y===0){document.getElementById("resultMain").textContent="Starting value cannot be zero";return;}out=MathCalc.percentChange(x,y).value;var abs=y-x;main="Change from "+x+" to "+y+" = "+MathCalc.fmt(out,2)+"%";grid=item("Formula","(("+y+"-"+x+")/"+x+") \u00D7 100")+item("Absolute change",(abs>=0?"+":"")+MathCalc.fmt(abs,4))+item("Direction",out>=0?"Increase":"Decrease");}
else if(type==="add"){out=MathCalc.addPercent(y,x).value;main=y+" increased by "+x+"% = "+MathCalc.fmt(out,4);grid=item("Formula",y+" \u00D7 (1 + "+x+"/100)")+item("Result",MathCalc.fmt(out,4));}
else{out=MathCalc.subtractPercent(y,x).value;main=y+" decreased by "+x+"% = "+MathCalc.fmt(out,4);grid=item("Formula",y+" \u00D7 (1 - "+x+"/100)")+item("Result",MathCalc.fmt(out,4));}
document.getElementById("resultMain").textContent=main;
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Modes", v: "Percent of, percent of Y, change, increase, decrease" },
      { k: "Percent change", v: "(New - Old) / Old \u00D7 100" },
      { k: "Percent of", v: "X/100 \u00D7 Y" },
      { k: "Use case", v: "Sales tax, discounts, grades, growth" }
    ],
    sections: [
      {
        title: "Understanding percentages",
        body: [
          "A percentage is a fraction with a denominator of 100. Saying 20% of 250 means 20/100 of 250, which equals 50. Percentages make comparisons easy because they put every quantity on the same 100-point scale.",
          "There are three classic percentage questions: finding a part of a whole (what is 15% of 80), finding a share (what percent of 80 is 12), and measuring change (from 50 to 60 is a 20% increase). This calculator answers all three, plus increase and decrease."
        ]
      },
      {
        title: "Percentage change explained",
        body: [
          "Percentage change measures how much a value moved relative to its starting point: (new - old) / old \u00D7 100. A positive result is an increase, a negative result is a decrease.",
          "For example, if a price rises from $50 to $65, the change is (65 - 50)/50 \u00D7 100 = 30%. If it falls from $65 back to $50, the change is (50 - 65)/65 \u00D7 100 = -23.1%. Notice the percentages differ because the starting points differ."
        ]
      }
    ],
    steps: [
      "Choose the type of percentage calculation from the dropdown.",
      "Enter the two values (X and Y).",
      "Press Calculate and read the result plus the formula used.",
      "Switch modes to compare different percentage questions on the same numbers."
    ],
    tips: [
      "To add sales tax to a price, use the 'Increase by %' mode with the tax rate.",
      "Remember that a 50% increase followed by a 50% decrease does not return to the original value.",
      "For reverse calculations (the original before a percentage), subtract the percent instead."
    ],
    pros: [
      "Five common percentage modes in one page",
      "Shows the formula for every result",
      "Handles decimals precisely"
    ],
    cons: [
      "Does not support reverse percentage lookups directly",
      "Percentage change assumes the first value is the base"
    ],
    faqs: [
      { q: "How do I calculate a percentage of a number?", a: "Multiply the number by the percentage divided by 100. For example 20% of 250 = 250 \u00D7 20/100 = 50." },
      { q: "How do I calculate percentage change?", a: "Use the formula (new - old) / old \u00D7 100. From 50 to 60 that is (60-50)/50 \u00D7 100 = 20%, an increase." },
      { q: "What percent is 25 of 200?", a: "Divide 25 by 200 and multiply by 100: 25/200 \u00D7 100 = 12.5%." },
      { q: "How do I add a percentage to a number?", a: "Multiply the number by (1 + percentage/100). Adding 15% to 80 gives 80 \u00D7 1.15 = 92." },
      { q: "Is the percentage calculator free?", a: "Yes, it is completely free, runs in your browser, and requires no registration." }
    ],
    related: [
      { href: "fraction-calculator.html", label: "Fraction Calculator", icon: "\u2159" },
      { href: "ratio-calculator.html", label: "Ratio Calculator", icon: "\u2236" },
      { href: "percent-error-calculator.html", label: "Percent Error Calculator", icon: "\u26A0" },
      { href: "rounding-calculator.html", label: "Rounding Calculator", icon: "\u00B1" }
    ]
  },

  {
    name: "Random Number Generator",
    filename: "random-number-generator.html",
    title: "Random Number Generator - Random Integers & Decimals",
    description: "Free random number generator. Create random integers or decimals between any range, with unique values, sorting and instant statistics.",
    keywords: "random number generator, random number between, random integers, random decimals",
    tagline: "Generate random integers or decimals between any two numbers.",
    intro: "Set the range and quantity, choose integer or decimal output, and generate truly random numbers with instant statistics.",
    card: `<div class="card">
<h2>Generate random numbers</h2>
<div class="form-grid">
<div class="form-group"><label>Minimum</label><input type="number" id="min" value="1"></div>
<div class="form-group"><label>Maximum</label><input type="number" id="max" value="100"></div>
<div class="form-group"><label>How many</label><input type="number" id="count" value="5" min="1" max="200"></div>
<div class="form-group"><label>Type</label><select id="type"><option value="int">Integer</option><option value="float">Decimal</option></select></div>
<div class="form-group"><label>Decimal places (decimals)</label><input type="number" id="decimals" value="2" min="1" max="6"></div>
<div class="form-group"><label>Options</label>
<label class="checkbox-inline"><input type="checkbox" id="unique"> No repeats</label>
<label class="checkbox-inline"><input type="checkbox" id="sort"> Sort ascending</label>
</div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Generate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var min=parseFloat(document.getElementById("min").value);
var max=parseFloat(document.getElementById("max").value);
var count=parseInt(document.getElementById("count").value,10);
var type=document.getElementById("type").value;
var dec=parseInt(document.getElementById("decimals").value,10)||2;
var uniq=document.getElementById("unique").checked;
var sort=document.getElementById("sort").checked;
if(isNaN(min)||isNaN(max)||isNaN(count)||count<1||count>200){document.getElementById("resultMain").textContent="Enter valid values";document.getElementById("resultGrid").innerHTML="";return;}
if(min>max){var t=min;min=max;max=t;}
if(uniq&&type==="int"&&max-min+1<count){document.getElementById("resultMain").textContent="Range too small for unique numbers";document.getElementById("resultGrid").innerHTML="";return;}
var nums=[],seen={};
while(nums.length<count){
var v;
if(type==="int"){v=Math.floor(Math.random()*(max-min+1))+min;}
else{v=Math.round((Math.random()*(max-min)+min)*Math.pow(10,dec))/Math.pow(10,dec);}
if(uniq){var key=type==="int"?String(v):v.toFixed(dec);if(seen[key])continue;seen[key]=1;}
nums.push(v);
if(uniq&&nums.length>10000){break;}
}
if(sort){nums.sort(function(a,b){return a-b;});}
var sum=nums.reduce(function(a,b){return a+b;},0);
var mean=sum/nums.length;
var nmin=Math.min.apply(null,nums);
var nmax=Math.max.apply(null,nums);
document.getElementById("resultMain").textContent=nums.join(", ");
document.getElementById("resultGrid").innerHTML=item("Numbers",nums.length)+item("Sum",MathCalc.fmt(sum,dec))+item("Mean",MathCalc.fmt(mean,dec))+item("Min",MathCalc.fmt(nmin,dec))+item("Max",MathCalc.fmt(nmax,dec));};`,
    facts: [
      { k: "Types", v: "Integers or decimals" },
      { k: "Range", v: "Any minimum and maximum" },
      { k: "Extras", v: "No repeats, sorting, statistics" },
      { k: "Usage", v: "Lotteries, samples, games, testing" }
    ],
    sections: [
      {
        title: "What makes a number random?",
        body: [
          "A random number has no predictable pattern. This generator uses the browser's random number source, which produces values that behave like independent, uniformly distributed draws across your chosen range.",
          "Uniform distribution means every number in the range has an equal chance of appearing. Over many draws, the results spread evenly; a small sample can still look 'clustered' purely by chance."
        ]
      },
      {
        title: "Integers vs decimals",
        body: [
          "Integer mode returns whole numbers only, ideal for dice rolls, lottery numbers or picking an item from a list.",
          "Decimal mode returns values with a chosen number of decimal places, useful for statistics, simulation and experiments where continuous values are needed."
        ]
      }
    ],
    steps: [
      "Enter the minimum and maximum of the range.",
      "Choose how many numbers to generate and the type (integer or decimal).",
      "Optionally tick 'No repeats' and 'Sort ascending'.",
      "Press Generate and read the list plus sum, mean, minimum and maximum."
    ],
    tips: [
      "For a coin flip use integers 1-2; for dice use 1-6.",
      "Tick 'No repeats' when drawing a sample without replacement.",
      "Use decimal mode with 2 places for realistic money or measurement values."
    ],
    pros: [
      "Integers and decimals with adjustable precision",
      "Unique and sorted output options",
      "Instant statistics on every generation"
    ],
    cons: [
      "Truly random means patterns can appear by chance",
      "Unique decimals may run out if the range is tiny"
    ],
    faqs: [
      { q: "How does the random number generator work?", a: "It uses the browser's random number source to draw values uniformly between your minimum and maximum. Each draw is independent of the previous one." },
      { q: "Can I generate the same number twice?", a: "Yes, unless you tick 'No repeats'. Without that option, any number in the range can appear more than once, just like rolling dice." },
      { q: "What is the best range for a dice roll?", a: "Set minimum 1 and maximum 6 in integer mode. For two dice, generate two numbers and add them." },
      { q: "Can I generate decimal numbers?", a: "Yes. Choose Decimal as the type and set how many decimal places you want, for example 2 places gives values like 37.42." },
      { q: "Are the numbers stored or sent anywhere?", a: "No. Generation happens entirely in your browser and nothing is transmitted or stored." }
    ],
    related: [
      { href: "rounding-calculator.html", label: "Rounding Calculator", icon: "\u00B1" },
      { href: "big-number-calculator.html", label: "Big Number Calculator", icon: "#" },
      { href: "scientific-notation-calculator.html", label: "Scientific Notation", icon: "\u00D710" }
    ]
  },

  {
    name: "Percent Error Calculator",
    filename: "percent-error-calculator.html",
    title: "Percent Error Calculator - Compare Observed vs True Values",
    description: "Free percent error calculator. Measure how far an observed value is from the true value with absolute error, relative error and percent error.",
    keywords: "percent error calculator, percentage error, relative error calculator, absolute error",
    tagline: "Find percent error, absolute error and relative error between two values.",
    intro: "Enter an observed (measured) value and the true or expected value to see how accurate the measurement is.",
    card: `<div class="card">
<h2>Percent error</h2>
<div class="form-grid">
<div class="form-group"><label>Observed value</label><input type="number" id="observed" value="105" step="any"></div>
<div class="form-group"><label>True / expected value</label><input type="number" id="true" value="100" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var o=parseFloat(document.getElementById("observed").value);
var t=parseFloat(document.getElementById("true").value);
if(isNaN(o)||isNaN(t)){document.getElementById("resultMain").textContent="Enter valid numbers";document.getElementById("resultGrid").innerHTML="";return;}
if(t===0){document.getElementById("resultMain").textContent="True value cannot be zero";return;}
var pe=Math.abs((o-t)/t)*100;
var signed=(o-t)/t*100;
var abs=Math.abs(o-t);
var rel=abs/Math.abs(t);
document.getElementById("resultMain").textContent=MathCalc.fmt(pe,4)+"%";
document.getElementById("resultGrid").innerHTML=item("Percent error",MathCalc.fmt(pe,4)+"%")+item("Signed error",(signed>=0?"+":"")+MathCalc.fmt(signed,4)+"%")+item("Absolute error",MathCalc.fmt(abs,6))+item("Relative error",MathCalc.fmt(rel,6));};`,
    facts: [
      { k: "Formula", v: "|observed - true| / true \u00D7 100" },
      { k: "Always positive", v: "Percent error uses absolute value" },
      { k: "Also shows", v: "Signed, absolute and relative error" },
      { k: "Use case", v: "Lab experiments, measurements, surveys" }
    ],
    sections: [
      {
        title: "What is percent error?",
        body: [
          "Percent error compares a measured or observed value with a true or accepted value. The formula is |observed - true| / true \u00D7 100. It tells you how large the mistake is relative to the correct value.",
          "Because of the absolute value, percent error is always zero or positive. It measures the size of the error, not its direction. A result close to 0% means the measurement was very accurate."
        ]
      },
      {
        title: "When is percent error used?",
        body: [
          "Students use it in chemistry and physics experiments to compare experimental results with textbook values. Surveyors and engineers use it to check how well a measurement or prediction matches reality.",
          "A related but different measure is percent difference, which compares two measured values using their average as the base. This calculator focuses on the observed-vs-true comparison, the most common form."
        ]
      }
    ],
    steps: [
      "Enter the observed (measured) value.",
      "Enter the true or expected value.",
      "Press Calculate to see percent error and supporting measures.",
      "A result near 0% means high accuracy."
    ],
    tips: [
      "Use the true value as the accepted/reference value, not your measurement.",
      "A negative signed error means the observation was below the true value.",
      "For comparing two measurements, consider percent difference instead."
    ],
    pros: [
      "Shows four related error measures at once",
      "Explains the calculation with clear labels",
      "Useful for lab reports and quality checks"
    ],
    cons: [
      "Requires a non-zero true value",
      "Does not distinguish over- and under-estimates by default"
    ],
    faqs: [
      { q: "What is the percent error formula?", a: "Percent error = |observed - true| / true \u00D7 100. The absolute value keeps the result positive regardless of direction." },
      { q: "Why is percent error always positive?", a: "Percent error uses absolute value because it measures the magnitude of the error. If you need direction, use the signed error shown alongside." },
      { q: "What is a good percent error?", a: "In many school experiments, errors under 5% are considered acceptable, but the threshold depends on the field and the precision of the equipment." },
      { q: "What is the difference between absolute and percent error?", a: "Absolute error is the raw difference between observed and true values. Percent error divides that difference by the true value and multiplies by 100, putting it on a comparable scale." },
      { q: "Can percent error be used for negative values?", a: "Yes, but the true value must not be zero. The calculator handles negative numbers correctly using absolute values." }
    ],
    related: [
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "fraction-calculator.html", label: "Fraction Calculator", icon: "\u2159" },
      { href: "rounding-calculator.html", label: "Rounding Calculator", icon: "\u00B1" }
    ]
  },

  {
    name: "Exponent Calculator",
    filename: "exponent-calculator.html",
    title: "Exponent Calculator - Raise Any Base to Any Power",
    description: "Free exponent calculator. Compute powers with integer, negative and fractional exponents, with expanded form and scientific notation.",
    keywords: "exponent calculator, power calculator, negative exponents, fractional exponents, exponent rules",
    tagline: "Raise any base to any power, including negative and fractional exponents.",
    intro: "Enter a base and an exponent. The calculator shows the result, the expanded multiplication, and extra forms for negative or fractional exponents.",
    card: `<div class="card">
<h2>Exponent</h2>
<div class="form-grid">
<div class="form-group"><label>Base</label><input type="number" id="base" value="2" step="any"></div>
<div class="form-group"><label>Exponent</label><input type="number" id="exp" value="10" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var b=parseFloat(document.getElementById("base").value);
var e=parseFloat(document.getElementById("exp").value);
if(isNaN(b)||isNaN(e)){document.getElementById("resultMain").textContent="Enter valid numbers";document.getElementById("resultGrid").innerHTML="";return;}
var r=MathCalc.exponent(b,e).value;
var grid="";
var display=r>1e15||(r<1e-9&&r!==0)?MathCalc.fmt(r,10):MathCalc.fmt(r,6);
document.getElementById("resultMain").textContent=display;
grid+=item("Result",b+"^"+e+" = "+display);
var sci=MathCalc.toScientific(r,6);grid+=item("Scientific notation",sci.value);
if(Number.isInteger(e)&&Math.abs(e)<=8&&b!==0){
var parts=[],eb=Math.abs(e);
for(var i=0;i<eb;i++){parts.push(b);}
if(parts.length>0){grid+=item("Expanded form",e>=0?parts.join(" \u00D7 "):"1 / ("+parts.join(" \u00D7 ")+")");}
}
if(e<0){grid+=item("Reciprocal form",b+"^-"+Math.abs(e)+" = 1 / "+b+"^"+Math.abs(e));}
if(Math.abs(e)>0&&Math.abs(e)<1&&b>0){var den=Math.round(1/e);grid+=item("Root form",b+"^(1/"+den+") = \u221A\u207F"+b+" \u2248 "+MathCalc.fmt(r,6));}
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Definition", v: "b^n = b \u00D7 b \u00D7 ... n times" },
      { k: "Negative", v: "b^-n = 1 / b^n" },
      { k: "Fractional", v: "b^(1/n) = nth root of b" },
      { k: "Special", v: "b^0 = 1 (b \u2260 0)" }
    ],
    sections: [
      {
        title: "The meaning of an exponent",
        body: [
          "An exponent tells you how many times to multiply a base by itself. For example 2^3 means 2 \u00D7 2 \u00D7 2 = 8. The exponent is sometimes called the 'power'.",
          "The calculator also supports negative exponents, where b^-n equals 1 / b^n (for example 2^-2 = 1/4), and fractional exponents, where b^(1/n) is the nth root of b (for example 8^(1/3) = 2)."
        ]
      },
      {
        title: "Useful exponent rules",
        body: [
          "Multiplying powers with the same base adds the exponents: x^a \u00D7 x^b = x^(a+b). Dividing subtracts them: x^a \u00F7 x^b = x^(a-b).",
          "A power of a power multiplies exponents: (x^a)^b = x^(a\u00B7b). Any non-zero number to the power of zero equals 1, and x^1 equals x."
        ]
      }
    ],
    steps: [
      "Enter the base number.",
      "Enter the exponent (positive, negative, or a fraction like 0.5).",
      "Press Calculate to see the power.",
      "Read the expanded form, root form and scientific notation when applicable."
    ],
    tips: [
      "Use an exponent of 0.5 to compute a square root.",
      "Use a negative exponent to compute a reciprocal quickly.",
      "Very large results are shown in scientific notation automatically."
    ],
    pros: [
      "Handles negative and fractional exponents",
      "Shows expanded multiplication for small powers",
      "Gives scientific notation for huge results"
    ],
    cons: [
      "Fractions must be typed as decimals (e.g. 0.25 for 1/4)",
      "Odd roots of negative bases follow real-number rules"
    ],
    faqs: [
      { q: "What is an exponent?", a: "An exponent says how many times to multiply a base by itself. In 2^5, the base 2 is multiplied 5 times: 2 \u00D7 2 \u00D7 2 \u00D7 2 \u00D7 2 = 32." },
      { q: "What is a negative exponent?", a: "A negative exponent means the reciprocal of the positive power: 2^-3 = 1/(2^3) = 1/8. This is useful for writing very small numbers." },
      { q: "What is a fractional exponent?", a: "A fractional exponent represents a root: x^(1/2) is the square root of x, and x^(1/3) is the cube root. More generally x^(m/n) is the nth root of x^m." },
      { q: "What is 2 to the power of 10?", a: "2^10 = 1024, the familiar value behind kilobytes in computing (1 KiB = 1024 bytes)." },
      { q: "What is any number to the power of zero?", a: "Any non-zero number raised to the power of zero equals 1. For example 5^0 = 1 and 1000^0 = 1." }
    ],
    related: [
      { href: "root-calculator.html", label: "Root Calculator", icon: "\u221A" },
      { href: "scientific-calculator.html", label: "Scientific Calculator", icon: "\u221A" },
      { href: "log-calculator.html", label: "Log Calculator", icon: "log" },
      { href: "scientific-notation-calculator.html", label: "Scientific Notation", icon: "\u00D710" }
    ]
  },

  {
    name: "Binary Calculator",
    filename: "binary-calculator.html",
    title: "Binary Calculator - Add, Subtract, Multiply & Bitwise Operations",
    description: "Free binary calculator. Add, subtract, multiply, divide and perform AND, OR, XOR, NOT on binary numbers, with decimal and hex results.",
    keywords: "binary calculator, binary addition, binary subtraction, bitwise calculator, binary to decimal",
    tagline: "Arithmetic and bitwise operations on binary numbers, with decimal and hex output.",
    intro: "Enter two binary numbers (0s and 1s) and choose an operation. Results appear in binary, decimal and hexadecimal.",
    card: `<div class="card">
<h2>Binary operations</h2>
<div class="form-grid">
<div class="form-group"><label>Binary A</label><input type="text" id="a" value="1010"></div>
<div class="form-group"><label>Binary B</label><input type="text" id="b" value="1100"></div>
<div class="form-group"><label>Operation</label>
<select id="op">
<option value="add">+ Add</option>
<option value="sub">- Subtract</option>
<option value="mul">* Multiply</option>
<option value="div">/ Divide</option>
<option value="and">AND (bitwise)</option>
<option value="or">OR (bitwise)</option>
<option value="xor">XOR (bitwise)</option>
<option value="not">NOT A</option>
<option value="a2d">A to decimal</option>
<option value="b2d">B to decimal</option>
</select>
</div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var a=document.getElementById("a").value.trim();
var b=document.getElementById("b").value.trim();
var op=document.getElementById("op").value;
if(!/^[01]+$/.test(a)||(op!=="not"&&op!=="a2d"&&op!=="b2d"&&!/^[01]+$/.test(b))){document.getElementById("resultMain").textContent="Binary numbers can only contain 0 and 1";document.getElementById("resultGrid").innerHTML="";return;}
var A=parseInt(a,2),B=b?parseInt(b,2):0,res,label="Result";
switch(op){
case "add":res=MathCalc.binaryAdd(a,b).value;label="Sum (binary)";break;
case "sub":res=MathCalc.binarySub(a,b).value;label="Difference (binary)";break;
case "mul":res=MathCalc.binaryMul(a,b).value;label="Product (binary)";break;
case "div":var d=MathCalc.binaryDiv(a,b);if(d.error){document.getElementById("resultMain").textContent=d.error;return;}res=d.value.quotient+" remainder "+d.value.remainder;label="Division";break;
case "and":res=MathCalc.binaryAnd(a,b).value;label="AND (binary)";break;
case "or":res=MathCalc.binaryOr(a,b).value;label="OR (binary)";break;
case "xor":res=MathCalc.binaryXor(a,b).value;label="XOR (binary)";break;
case "not":res=MathCalc.binaryNot(a).value;label="NOT A (binary)";break;
case "a2d":res=A;label="A in decimal";break;
case "b2d":res=B;label="B in decimal";break;
}
document.getElementById("resultMain").textContent=String(res);
var grid=item(label,String(res));
if(op!=="a2d"&&op!=="b2d"){var decVal=(op==="not")?A:(op==="div"?Math.floor(A/B):parseInt(String(res),2));grid+=item("Decimal",decVal)+item("Hex",(decVal>=0?decVal:decVal>>>0).toString(16).toUpperCase());}
else{grid+=item("Decimal",String(res));}
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Base", v: "Binary is base 2 (digits 0, 1)" },
      { k: "Operations", v: "+ - &times; &divide; AND OR XOR NOT" },
      { k: "Output", v: "Binary, decimal and hex" },
      { k: "Computing", v: "The language of digital circuits" }
    ],
    sections: [
      {
        title: "How binary numbers work",
        body: [
          "Binary is the base-2 number system used by every digital device. It uses only two digits, 0 and 1, where each position is a power of 2. For example the binary number 1010 equals 1\u00D78 + 0\u00D74 + 1\u00D72 + 0\u00D71 = 10 in decimal.",
          "Addition follows the same idea as decimal but carries at 2 instead of 10: 1 + 1 = 10 (write 0, carry 1). For example 101 + 11 = 1000, which is 8 in decimal."
        ]
      },
      {
        title: "Bitwise operations",
        body: [
          "AND, OR and XOR compare the numbers bit by bit. AND returns 1 only when both bits are 1; OR returns 1 when at least one bit is 1; XOR returns 1 when the bits differ.",
          "NOT flips every bit of the number. Programmers use these operations for flags, masks and low-level data manipulation. The calculator treats inputs as unsigned 32-bit values, matching common programming behavior."
        ]
      }
    ],
    steps: [
      "Type binary number A (only 0s and 1s).",
      "Type binary number B for two-input operations.",
      "Choose the operation and press Calculate.",
      "Read the result in binary, decimal and hexadecimal."
    ],
    tips: [
      "Add leading zeros to see matching bit widths, e.g. 0011 + 0001.",
      "Use AND with 1 to check whether the last bit is odd.",
      "XOR is useful for simple encryption and checksums."
    ],
    pros: [
      "Full arithmetic plus bitwise operations",
      "Shows decimal and hex for every result",
      "Divides with quotient and remainder"
    ],
    cons: [
      "Bitwise results use 32-bit unsigned representation",
      "Input is validated strictly as 0s and 1s"
    ],
    faqs: [
      { q: "How do I add binary numbers?", a: "Add column by column from right to left. When a column reaches 2, write 0 and carry 1 left. For example 101 + 11 = 1000." },
      { q: "How do I convert binary to decimal?", a: "Multiply each digit by its power of 2 and add: 1101 = 1\u00D78 + 1\u00D74 + 0\u00D72 + 1\u00D71 = 13." },
      { q: "What is the AND operation?", a: "AND compares each bit and returns 1 only when both bits are 1. For example 1010 AND 1100 = 1000." },
      { q: "What is binary used for?", a: "Computers store and process all data as binary. Numbers, text, images and sound are represented as patterns of 0s and 1s." },
      { q: "Can I divide binary numbers?", a: "Yes. The calculator returns the quotient and remainder, just like long division in decimal." }
    ],
    related: [
      { href: "hex-calculator.html", label: "Hex Calculator", icon: "16" },
      { href: "scientific-notation-calculator.html", label: "Scientific Notation", icon: "\u00D710" },
      { href: "big-number-calculator.html", label: "Big Number Calculator", icon: "#" }
    ]
  },

  {
    name: "Hex Calculator",
    filename: "hex-calculator.html",
    title: "Hex Calculator - Decimal, Hex, Binary & Octal Converter",
    description: "Free hex calculator. Convert between decimal, hexadecimal, binary and octal, plus hex addition and subtraction with instant results.",
    keywords: "hex calculator, hexadecimal converter, decimal to hex, hex to decimal, octal converter",
    tagline: "Convert between decimal, hex, binary and octal, and do hex arithmetic.",
    intro: "Fill in any one of the four fields (decimal, hex, binary or octal) and the others update instantly. A separate tool adds and subtracts hex numbers.",
    card: `<div class="card">
<h2>Number base converter</h2>
<div class="form-grid">
<div class="form-group"><label>Decimal</label><input type="number" id="dec" value="255" placeholder="e.g. 255"></div>
<div class="form-group"><label>Hex</label><input type="text" id="hex" value="FF" placeholder="e.g. FF"></div>
<div class="form-group"><label>Binary</label><input type="text" id="bin" value="11111111" placeholder="e.g. 11111111"></div>
<div class="form-group"><label>Octal</label><input type="text" id="oct" value="377" placeholder="e.g. 377"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="convBtn" type="button">Convert</button> <button class="btn btn-outline" id="clearBtn" type="button">Clear</button></div>
</div>

<div class="card">
<h2>Hex arithmetic</h2>
<div class="form-grid">
<div class="form-group"><label>Hex A</label><input type="text" id="ha" value="FF"></div>
<div class="form-group"><label>Hex B</label><input type="text" id="hb" value="0F"></div>
<div class="form-group"><label>Operation</label><select id="hop"><option value="add">+ Add</option><option value="sub">- Subtract</option></select></div>
</div>
<div class="form-actions"><button class="btn btn-outline" id="hexOpBtn" type="button">Calculate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("clearBtn").onclick=function(){["dec","hex","bin","oct"].forEach(function(id){document.getElementById(id).value="";});document.getElementById("resultMain").textContent="\u2014";document.getElementById("resultGrid").innerHTML="";};
document.getElementById("convBtn").onclick=function(){
var dec=document.getElementById("dec").value.trim();
var hex=document.getElementById("hex").value.trim();
var bin=document.getElementById("bin").value.trim();
var oct=document.getElementById("oct").value.trim();
var d;
if(dec!==""){d=parseInt(dec,10);if(isNaN(d)){document.getElementById("resultMain").textContent="Invalid decimal";return;}}
else if(hex!==""){if(!/^[0-9A-Fa-f]+$/.test(hex)){document.getElementById("resultMain").textContent="Invalid hexadecimal";return;}d=parseInt(hex,16);}
else if(bin!==""){if(!/^[01]+$/.test(bin)){document.getElementById("resultMain").textContent="Invalid binary";return;}d=parseInt(bin,2);}
else if(oct!==""){if(!/^[0-7]+$/.test(oct)){document.getElementById("resultMain").textContent="Invalid octal";return;}d=parseInt(oct,8);}
else{document.getElementById("resultMain").textContent="Fill in at least one field";return;}
document.getElementById("dec").value=d;
document.getElementById("hex").value=d.toString(16).toUpperCase();
document.getElementById("bin").value=(d>>>0).toString(2);
document.getElementById("oct").value=(d>>>0).toString(8);
document.getElementById("resultMain").textContent=d;
document.getElementById("resultGrid").innerHTML=item("Decimal",d)+item("Hex",d.toString(16).toUpperCase())+item("Binary",(d>>>0).toString(2))+item("Octal",(d>>>0).toString(8));};
document.getElementById("hexOpBtn").onclick=function(){
var a=document.getElementById("ha").value.trim();
var b=document.getElementById("hb").value.trim();
if(!/^[0-9A-Fa-f]+$/.test(a)||!/^[0-9A-Fa-f]+$/.test(b)){document.getElementById("resultMain").textContent="Invalid hex input";return;}
var A=parseInt(a,16),B=parseInt(b,16);
var op=document.getElementById("hop").value;
var r=op==="add"?A+B:A-B;
var hr=r>=0?r.toString(16).toUpperCase():"-"+Math.abs(r).toString(16).toUpperCase();
document.getElementById("resultMain").textContent=hr;
document.getElementById("resultGrid").innerHTML=item("Hex result",hr)+item("Decimal result",r);};`,
    facts: [
      { k: "Base 16", v: "Digits 0-9 and letters A-F" },
      { k: "One byte", v: "Two hex digits = 8 bits" },
      { k: "Conversions", v: "Decimal, hex, binary, octal" },
      { k: "Use case", v: "Colors, memory addresses, machine code" }
    ],
    sections: [
      {
        title: "Why hexadecimal matters",
        body: [
          "Hexadecimal is a base-16 system using digits 0-9 and letters A-F. Each hex digit represents four binary bits, which makes it a compact shorthand for binary data. The value FF equals 255 in decimal and 11111111 in binary.",
          "Programmers use hex for memory addresses, color codes (like #FF0000 for red), and debugging because two hex digits exactly represent one byte. Converting between hex and binary is a simple digit-to-nibble mapping."
        ]
      },
      {
        title: "Converting between bases",
        body: [
          "To convert decimal to hex, divide by 16 repeatedly and read the remainders from bottom to top. For example 255 \u00F7 16 = 15 remainder 15, giving FF.",
          "The converter above works in all directions: fill in decimal, hex, binary or octal and the other three fields fill in automatically, so you never have to convert by hand."
        ]
      }
    ],
    steps: [
      "Fill in one of the four fields (decimal, hex, binary or octal).",
      "Press Convert and the other three fields fill in automatically.",
      "Use the second tool to add or subtract two hex numbers.",
      "Read the hex and decimal results together."
    ],
    tips: [
      "Color codes like #3498DB are hex: the first two digits are red, the next two green, the last two blue.",
      "Use uppercase letters (A-F) for readability; lowercase is accepted too.",
      "FF is 255 in decimal and 11111111 in binary \u2014 a full byte."
    ],
    pros: [
      "Four-way conversion in one view",
      "Hex addition and subtraction included",
      "Shows decimal values for every result"
    ],
    cons: [
      "Negative hex results are shown with a minus sign",
      "Very large values use standard 32-bit interpretation"
    ],
    faqs: [
      { q: "What is hexadecimal used for?", a: "Hexadecimal is a compact way to write binary data. It is used for memory addresses, machine code, color values and error codes because two hex digits represent one byte." },
      { q: "How do I convert decimal to hex?", a: "Divide the decimal number by 16 repeatedly, collecting remainders, then read them bottom to top. For example 255 becomes FF." },
      { q: "How do I convert hex to binary?", a: "Replace each hex digit with its four-bit binary equivalent: F becomes 1111, so FF becomes 11111111." },
      { q: "What does FF mean in hex?", a: "FF is the largest two-digit hex value, equal to 15\u00D716 + 15 = 255 in decimal and 11111111 (one full byte) in binary." },
      { q: "Can I add hex numbers?", a: "Yes. The arithmetic tool adds and subtracts hex numbers and shows the decimal result as well." }
    ],
    related: [
      { href: "binary-calculator.html", label: "Binary Calculator", icon: "01" },
      { href: "scientific-notation-calculator.html", label: "Scientific Notation", icon: "\u00D710" },
      { href: "big-number-calculator.html", label: "Big Number Calculator", icon: "#" }
    ]
  },

  {
    name: "Half-Life Calculator",
    filename: "half-life-calculator.html",
    title: "Half-Life Calculator - Solve for Time, Amount or Half-Life",
    description: "Free half-life calculator. Find half-life, initial amount, remaining amount or elapsed time, plus decay constant and remaining fraction.",
    keywords: "half life calculator, radioactive decay, decay constant, half life formula",
    tagline: "Solve any half-life problem by leaving one field empty.",
    intro: "Enter any three of the four values (initial amount, remaining amount, elapsed time, half-life) and leave one empty \u2014 the calculator solves it.",
    card: `<div class="card">
<h2>Half-life calculations</h2>
<div class="form-grid">
<div class="form-group"><label>Initial amount</label><input type="number" id="initial" value="100" step="any"></div>
<div class="form-group"><label>Remaining amount</label><input type="number" id="remaining" value="25" step="any"></div>
<div class="form-group"><label>Elapsed time</label><input type="number" id="time" value="10" step="any"></div>
<div class="form-group"><label>Half-life</label><input type="text" id="halfLife" placeholder="Leave empty to solve" value=""></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Solve</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
function val(id){var v=document.getElementById(id).value.trim();return v===""?null:parseFloat(v);}
var r=MathCalc.halfLifeSolve(val("initial"),val("remaining"),val("time"),val("halfLife"));
if(r.error){document.getElementById("resultMain").textContent=r.error;document.getElementById("resultGrid").innerHTML="";return;}
var label={initial:"Initial amount",remaining:"Remaining amount",time:"Elapsed time",halfLife:"Half-life"}[r.missing];
document.getElementById("resultMain").textContent=MathCalc.fmt(r.value,6);
var grid=item(label,MathCalc.fmt(r.value,6))+item("Decay constant (k)",MathCalc.fmt(r.decayConstant,8)+" per time unit")+item("Mean lifetime",MathCalc.fmt(r.meanLife,6)+" time units")+item("Remaining fraction",MathCalc.fmt(r.remainingFraction*100,2)+"%");
var rows="";
for(var h=0;h<=5;h++){var pct=Math.pow(0.5,h)*100;rows+=item(h+" half-lives",MathCalc.fmt(pct,2)+"% remaining");}
grid+=rows;
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Formula", v: "H = t \u00B7 ln(2) / ln(I / R)" },
      { k: "Decay law", v: "R = I \u00D7 0.5^(t / H)" },
      { k: "Inputs", v: "Any 3 of 4 values" },
      { k: "Use case", v: "Radioactivity, medicine, chemistry" }
    ],
    sections: [
      {
        title: "What is half-life?",
        body: [
          "Half-life is the time needed for half of a decaying quantity to disappear. After one half-life, 50% remains; after two, 25%; after three, 12.5%. It is a constant property of the material, independent of how much you start with.",
          "Exponential decay follows the rule R = I \u00D7 0.5^(t/H), where I is the initial amount, R the remaining amount, t the elapsed time and H the half-life. Taking logarithms lets you solve for any one of these values."
        ]
      },
      {
        title: "Where half-life is used",
        body: [
          "Physicists use it for radioactive isotopes, doctors for drug clearance and imaging tracers, and archaeologists for carbon-14 dating.",
          "The decay constant k = ln(2) / H describes how quickly decay happens per unit time. Its reciprocal, the mean lifetime, is the average time a single particle survives. The calculator reports all three."
        ]
      }
    ],
    steps: [
      "Fill in three of the four fields with positive numbers.",
      "Leave exactly one field empty \u2014 that is the value to solve for.",
      "Press Solve to find the missing value.",
      "Read the decay constant, mean lifetime and remaining percentage table."
    ],
    tips: [
      "The remaining amount must be less than the initial amount when solving for half-life or time.",
      "Use the same time unit for elapsed time and half-life (hours, days, years).",
      "After 10 half-lives, only about 0.1% remains."
    ],
    pros: [
      "Solves any of the four unknowns",
      "Shows decay constant and mean lifetime",
      "Includes a remaining-percentage table"
    ],
    cons: [
      "All filled values must be positive",
      "Requires exactly one empty field"
    ],
    faqs: [
      { q: "What is the half-life formula?", a: "Half-life is found with H = t \u00D7 ln(2) / ln(I / R), where I is the initial amount, R the remaining amount and t the elapsed time." },
      { q: "How much remains after 3 half-lives?", a: "Each half-life halves the amount, so after 3 half-lives 0.5 \u00D7 0.5 \u00D7 0.5 = 12.5% remains." },
      { q: "What is the decay constant?", a: "The decay constant k = ln(2) / half-life measures how quickly a substance decays per unit time. A larger k means faster decay." },
      { q: "Can half-life be used for non-radioactive things?", a: "Yes. The same math models drug elimination from the body, chemical reaction rates and even depreciation of assets over time." },
      { q: "What is mean lifetime?", a: "Mean lifetime is the average time a single atom or particle survives before decaying. It equals 1/k, about 1.44 times the half-life." }
    ],
    related: [
      { href: "exponent-calculator.html", label: "Exponent Calculator", icon: "\u00B2" },
      { href: "log-calculator.html", label: "Log Calculator", icon: "log" },
      { href: "root-calculator.html", label: "Root Calculator", icon: "\u221A" }
    ]
  },

  {
    name: "Quadratic Formula Calculator",
    filename: "quadratic-formula-calculator.html",
    title: "Quadratic Formula Calculator - Solve ax\u00B2 + bx + c = 0",
    description: "Free quadratic formula calculator. Solve ax\u00B2+bx+c=0 with real and complex roots, discriminant, vertex and axis of symmetry.",
    keywords: "quadratic formula calculator, quadratic equation solver, discriminant, roots of quadratic",
    tagline: "Solve quadratic equations with real or complex roots and full details.",
    intro: "Enter the coefficients a, b and c of ax\u00B2 + bx + c = 0 and press Solve. The calculator returns both roots, the discriminant, vertex and axis of symmetry.",
    card: `<div class="card">
<h2>Quadratic equation ax\u00B2 + bx + c = 0</h2>
<div class="form-grid">
<div class="form-group"><label>Coefficient a</label><input type="number" id="a" value="1" step="any"></div>
<div class="form-group"><label>Coefficient b</label><input type="number" id="b" value="5" step="any"></div>
<div class="form-group"><label>Coefficient c</label><input type="number" id="c" value="6" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Solve</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var a=parseFloat(document.getElementById("a").value);
var b=parseFloat(document.getElementById("b").value);
var c=parseFloat(document.getElementById("c").value);
if(isNaN(a)||isNaN(b)||isNaN(c)){document.getElementById("resultMain").textContent="Enter valid coefficients";document.getElementById("resultGrid").innerHTML="";return;}
if(a===0){document.getElementById("resultMain").textContent="Coefficient a cannot be zero for a quadratic";document.getElementById("resultGrid").innerHTML="";return;}
var r=MathCalc.quadraticInfo(a,b,c);
var grid="";
if(r.complex){
document.getElementById("resultMain").textContent="x = "+r.roots[0]+"  or  x = "+r.roots[1];
grid=item("Type","Two complex roots")+item("Discriminant",MathCalc.fmt(r.discriminant,6)+" (< 0)");
}else{
var r1=r.roots[0],r2=r.roots[1];
document.getElementById("resultMain").textContent="x = "+MathCalc.fmt(r1,6)+"  or  x = "+MathCalc.fmt(r2,6);
grid=item("Root 1",MathCalc.fmt(r1,6))+item("Root 2",MathCalc.fmt(r2,6))+item("Discriminant",MathCalc.fmt(r.discriminant,6));
}
grid+=item("Vertex","("+MathCalc.fmt(r.vertex.x,4)+", "+MathCalc.fmt(r.vertex.y,4)+")")+item("Axis of symmetry","x = "+MathCalc.fmt(r.axis,4))+item("Direction",a>0?"Opens upward (a > 0)":"Opens downward (a < 0)");
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Formula", v: "x = (-b \u00B1 \u221A(b\u00B2 - 4ac)) / 2a" },
      { k: "Discriminant", v: "D = b\u00B2 - 4ac" },
      { k: "Roots", v: "Two real, one repeated, or two complex" },
      { k: "Extras", v: "Vertex and axis of symmetry" }
    ],
    sections: [
      {
        title: "The quadratic formula explained",
        body: [
          "A quadratic equation has the form ax\u00B2 + bx + c = 0. Its solutions are given by x = (-b \u00B1 \u221A(b\u00B2 - 4ac)) / 2a. The expression under the square root, b\u00B2 - 4ac, is called the discriminant.",
          "The discriminant decides the nature of the roots: if it is positive there are two distinct real roots; if zero, exactly one repeated real root; if negative, two complex roots. The calculator handles all three cases automatically."
        ]
      },
      {
        title: "The vertex and axis of symmetry",
        body: [
          "The graph of a quadratic is a parabola. Its vertex, the highest or lowest point, sits at x = -b / (2a), and the vertical line through that point is the axis of symmetry.",
          "The value of a tells you the direction: a positive a opens upward (vertex is a minimum), a negative a opens downward (vertex is a maximum). These details are included in the results."
        ]
      }
    ],
    steps: [
      "Rewrite your equation in the form ax\u00B2 + bx + c = 0.",
      "Enter the coefficients a, b and c.",
      "Press Solve to see the roots.",
      "Read the discriminant, vertex and axis of symmetry for the graph."
    ],
    tips: [
      "Move every term to one side before reading off the coefficients.",
      "If a is 0 the equation is linear, not quadratic \u2014 this calculator requires a \u2260 0.",
      "A perfect square discriminant gives rational roots that you can verify by factoring."
    ],
    pros: [
      "Handles real, repeated and complex roots",
      "Shows discriminant, vertex and axis",
      "Works with decimal coefficients"
    ],
    cons: [
      "Complex roots are displayed as a \u00B1 bi pairs",
      "Requires a non-zero leading coefficient"
    ],
    faqs: [
      { q: "What is the quadratic formula?", a: "For ax\u00B2 + bx + c = 0, the roots are x = (-b \u00B1 \u221A(b\u00B2 - 4ac)) / 2a. It works for every quadratic, whether the roots are real or complex." },
      { q: "What does the discriminant tell me?", a: "If b\u00B2 - 4ac is positive, two real roots; if zero, one repeated root; if negative, two complex roots. It tells you how the parabola crosses the x-axis." },
      { q: "How do I find the vertex of a parabola?", a: "The x-coordinate is -b / (2a). Plug it back into the equation to get the y-coordinate. The calculator reports both." },
      { q: "Can I solve a quadratic with decimals?", a: "Yes. Enter decimal coefficients such as a = 0.5, b = -2.25 and c = 3. The calculator solves exactly using floating-point math." },
      { q: "What are complex roots?", a: "When the discriminant is negative, the square root is imaginary. The solutions then come in pairs a \u00B1 bi, such as -2 + i and -2 - i." }
    ],
    related: [
      { href: "root-calculator.html", label: "Root Calculator", icon: "\u221A" },
      { href: "factor-calculator.html", label: "Factor Calculator", icon: "\u00F7" },
      { href: "exponent-calculator.html", label: "Exponent Calculator", icon: "\u00B2" },
      { href: "log-calculator.html", label: "Log Calculator", icon: "log" }
    ]
  },

  {
    name: "Log Calculator",
    filename: "log-calculator.html",
    title: "Log Calculator - Logarithms & Antilogs in Any Base",
    description: "Free log calculator. Find logarithms in any base, natural log, log base 2, plus antilogarithms with instant results.",
    keywords: "log calculator, logarithm calculator, natural log, antilog, log base 2",
    tagline: "Logarithms in any base, plus antilogarithms.",
    intro: "Choose logarithm or antilogarithm, enter a number and base, and get the exact result. Common, natural and base-2 shortcuts are included.",
    card: `<div class="card">
<h2>Logarithm</h2>
<div class="form-grid">
<div class="form-group"><label>Mode</label><select id="mode"><option value="log">Logarithm</option><option value="anti">Antilogarithm</option></select></div>
<div class="form-group"><label>Number / value</label><input type="number" id="num" value="1000" step="any"></div>
<div class="form-group"><label>Base</label><select id="baseSel"><option value="10">10 (common)</option><option value="e">e (natural)</option><option value="2">2</option><option value="custom">Custom</option></select></div>
<div class="form-group"><label>Custom base</label><input type="number" id="baseCustom" value="5" min="0.0001" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var mode=document.getElementById("mode").value;
var n=parseFloat(document.getElementById("num").value);
var sel=document.getElementById("baseSel").value;
var base=sel==="e"?Math.E:sel==="2"?2:sel==="10"?10:parseFloat(document.getElementById("baseCustom").value);
if(isNaN(n)||isNaN(base)){document.getElementById("resultMain").textContent="Enter valid numbers";document.getElementById("resultGrid").innerHTML="";return;}
var grid="";
if(mode==="log"){
if(n<=0){document.getElementById("resultMain").textContent="Number must be positive";return;}
if(base<=0||base===1){document.getElementById("resultMain").textContent="Base must be positive and not 1";return;}
var r=MathCalc.logarithm(n,base).value;
var name=sel==="e"?"ln":sel==="2"?"log\u2082":sel==="10"?"log\u2081\u2080":"log";
document.getElementById("resultMain").textContent=MathCalc.fmt(r,8);
grid=item(name+"("+n+")",MathCalc.fmt(r,8))+item("Meaning",""+base+"^"+MathCalc.fmt(r,6)+" = "+n);
if(sel==="10"){grid+=item("Natural log",MathCalc.fmt(Math.log(n),8));}
if(sel==="e"){grid+=item("Log base 10",MathCalc.fmt(Math.log10(n),8));}
}else{
if(base<=0||base===1){document.getElementById("resultMain").textContent="Base must be positive and not 1";return;}
var v=MathCalc.antiLog(n,base).value;
document.getElementById("resultMain").textContent=MathCalc.fmt(v,8);
grid=item("Antilog",base+"^"+n+" = "+MathCalc.fmt(v,8))+item("Scientific notation",MathCalc.toScientific(v,6).value);
}
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Definition", v: "log\u2093(a) answers b\u02E3 = a" },
      { k: "Common log", v: "Base 10" },
      { k: "Natural log", v: "Base e \u2248 2.71828" },
      { k: "Extras", v: "log\u2082 and antilog included" }
    ],
    sections: [
      {
        title: "What is a logarithm?",
        body: [
          "A logarithm answers the question: to what power must the base be raised to get this number? For example log\u2081\u2080(1000) = 3 because 10\u00B3 = 1000. It is the inverse operation of exponentiation.",
          "Logarithms compress multiplication into addition: log(x \u00D7 y) = log(x) + log(y). That property made them the foundation of slide rules and scientific tables before electronic calculators, and it still powers logarithmic scales in sound, earthquakes and pH."
        ]
      },
      {
        title: "Common, natural and base-2 logs",
        body: [
          "The common logarithm uses base 10 and is written log or log\u2081\u2080. The natural logarithm uses base e (\u2248 2.71828) and is written ln. Base-2 logs are essential in computer science for measuring bits and algorithm complexity.",
          "The change-of-base formula, log\u2093(a) = log(a) / log(x), lets you compute a logarithm in any base from any other. This calculator applies it automatically for custom bases."
        ]
      }
    ],
    steps: [
      "Choose Logarithm or Antilogarithm mode.",
      "Enter the number (for a logarithm) or the exponent (for an antilog).",
      "Pick a base: 10, e, 2 or a custom base.",
      "Press Calculate and read the result plus its meaning."
    ],
    tips: [
      "Remember log(1) = 0 and log(base) = 1 for any valid base.",
      "Use log\u2082 for computer-science problems like binary search depths.",
      "Antilog answers 'the base raised to which exponent gives this value'."
    ],
    pros: [
      "Any base, including custom values",
      "Antilogarithm mode built in",
      "Shows the exponential meaning of every result"
    ],
    cons: [
      "Input must be positive for logarithms",
      "Base cannot be 1 or negative"
    ],
    faqs: [
      { q: "What is a logarithm?", a: "A logarithm is the inverse of a power: log\u2093(a) is the exponent you raise the base x to in order to get a. For example log\u2081\u2080(1000) = 3." },
      { q: "What is the natural log?", a: "The natural log, written ln, uses base e (\u2248 2.71828). It appears constantly in calculus, growth models and physics." },
      { q: "How do I calculate log in a custom base?", a: "Pick Custom as the base and enter it. The calculator uses the change-of-base formula log\u2093(a) = log(a) / log(x)." },
      { q: "What is an antilogarithm?", a: "The antilogarithm reverses a logarithm: if log\u2093(a) = b, then the antilog of b in base x is x\u1D47 = a. For example the antilog of 3 in base 10 is 1000." },
      { q: "Why must the input be positive?", a: "Logarithms of zero or negative numbers are not defined for real numbers, because no power of a positive base produces zero or a negative number." }
    ],
    related: [
      { href: "exponent-calculator.html", label: "Exponent Calculator", icon: "\u00B2" },
      { href: "scientific-calculator.html", label: "Scientific Calculator", icon: "\u221A" },
      { href: "root-calculator.html", label: "Root Calculator", icon: "\u221A" }
    ]
  },

  {
    name: "Ratio Calculator",
    filename: "ratio-calculator.html",
    title: "Ratio Calculator - Simplify Ratios & Solve Missing Values",
    description: "Free ratio calculator. Simplify any ratio to lowest terms, solve missing values in a:b = c:d, and see each part as a percentage.",
    keywords: "ratio calculator, simplify ratio, ratio simplifier, ratio of two numbers",
    tagline: "Simplify ratios and solve missing terms in proportions.",
    intro: "Simplify a ratio to its lowest terms, or solve a missing value in a proportion like a:b = c:d.",
    card: `<div class="card">
<h2>Simplify a ratio</h2>
<div class="form-grid">
<div class="form-group"><label>Ratio A</label><input type="number" id="a" value="12" step="any"></div>
<div class="form-group"><label>Ratio B</label><input type="number" id="b" value="18" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="simpBtn" type="button">Simplify</button></div>
</div>

<div class="card">
<h2>Solve a proportion: a : b = c : ?</h2>
<div class="form-grid">
<div class="form-group"><label>a</label><input type="number" id="pa" value="2" step="any"></div>
<div class="form-group"><label>b</label><input type="number" id="pb" value="3" step="any"></div>
<div class="form-group"><label>c</label><input type="number" id="pc" value="8" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-outline" id="solveBtn" type="button">Solve for missing value</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("simpBtn").onclick=function(){
var a=parseFloat(document.getElementById("a").value);
var b=parseFloat(document.getElementById("b").value);
if(isNaN(a)||isNaN(b)||a===0||b===0){document.getElementById("resultMain").textContent="Both values must be non-zero";document.getElementById("resultGrid").innerHTML="";return;}
var r=MathCalc.ratioSimplify(a,b);
var p1=MathCalc.ratioToPercent(a,b).value;
var p2=100-p1;
document.getElementById("resultMain").textContent=r.value;
document.getElementById("resultGrid").innerHTML=item("Original",r.original)+item("Simplified",r.value)+item("A as % of total",MathCalc.fmt(p1,2)+"%")+item("B as % of total",MathCalc.fmt(p2,2)+"%");};
document.getElementById("solveBtn").onclick=function(){
var a=parseFloat(document.getElementById("pa").value);
var b=parseFloat(document.getElementById("pb").value);
var c=parseFloat(document.getElementById("pc").value);
if(isNaN(a)||isNaN(b)||isNaN(c)||a===0){document.getElementById("resultMain").textContent="Enter valid values (a cannot be zero)";document.getElementById("resultGrid").innerHTML="";return;}
var d=MathCalc.ratioSolve(a,b,c).value;
document.getElementById("resultMain").textContent=MathCalc.fmt(d,4);
document.getElementById("resultGrid").innerHTML=item("Proportion",a+" : "+b+" = "+c+" : "+MathCalc.fmt(d,4))+item("Check","("+a+" \u00D7 "+MathCalc.fmt(d,4)+") = ("+b+" \u00D7 "+c+")")+item("Verified","("+MathCalc.fmt(a*d,4)+" = "+MathCalc.fmt(b*c,4)+")");};`,
    facts: [
      { k: "Definition", v: "A ratio compares two quantities" },
      { k: "Simplification", v: "Divide by the GCF" },
      { k: "Proportion", v: "a : b = c : d solves cross products" },
      { k: "Use case", v: "Recipes, maps, mixes, finance" }
    ],
    sections: [
      {
        title: "What is a ratio?",
        body: [
          "A ratio compares two quantities of the same kind, written as a:b. The ratio 12:18 tells you that for every 12 units of the first quantity there are 18 of the second. Ratios keep the relationship even when the actual sizes change.",
          "Simplifying a ratio means dividing both parts by their greatest common factor. Since the GCF of 12 and 18 is 6, the ratio 12:18 simplifies to 2:3 \u2014 the same relationship in its smallest whole-number form."
        ]
      },
      {
        title: "Solving proportions",
        body: [
          "A proportion states that two ratios are equal: a:b = c:d. Because the cross products are equal (a \u00D7 d = b \u00D7 c), you can solve any missing term: d = b \u00D7 c / a.",
          "Ratios appear everywhere: doubling a recipe (2 cups flour : 1 cup sugar), scale maps (1 cm : 10 km), mixing ratios and financial analysis. Percentages are just ratios scaled to 100."
        ]
      }
    ],
    steps: [
      "To simplify, enter the two parts of the ratio and press Simplify.",
      "To solve a proportion, enter a, b and c of a:b = c:d.",
      "Press the solve button to find the missing d.",
      "Read the simplified ratio and percentage shares together."
    ],
    tips: [
      "A ratio like 0.5:2 is valid; the calculator simplifies using exact math.",
      "Percentages are ratios where the whole is 100.",
      "Cross-multiply to check any proportion by hand."
    ],
    pros: [
      "Simplifies any ratio to lowest terms",
      "Solves missing terms in proportions",
      "Shows each part as a percentage of the whole"
    ],
    cons: [
      "Both ratio parts must be non-zero",
      "Proportion tool solves for the fourth term only"
    ],
    faqs: [
      { q: "How do I simplify a ratio?", a: "Divide both parts by their greatest common factor. For 12:18 the GCF is 6, so the simplified ratio is 2:3." },
      { q: "How do I solve a:b = c:d?", a: "Use cross multiplication: d = b \u00D7 c / a. For 2:3 = 8:d, that gives d = 3 \u00D7 8 / 2 = 12." },
      { q: "What is the difference between a ratio and a fraction?", a: "A ratio a:b compares two separate quantities, while a fraction a/b expresses one quantity as a part of a whole. They often convert into each other." },
      { q: "Can ratios have decimals?", a: "Yes. Decimal ratios are common in engineering and recipes. The calculator handles them and simplifies to clean values when possible." },
      { q: "How do I turn a ratio into a percentage?", a: "Each part as a percentage of the total: a/(a+b) \u00D7 100 and b/(a+b) \u00D7 100. For 2:3, that is 40% and 60%." }
    ],
    related: [
      { href: "fraction-calculator.html", label: "Fraction Calculator", icon: "\u2159" },
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "greatest-common-factor-calculator.html", label: "GCF Calculator", icon: "\u2248" }
    ]
  },

  {
    name: "Root Calculator",
    filename: "root-calculator.html",
    title: "Root Calculator - Square, Cube & nth Root with Radical Form",
    description: "Free root calculator. Compute square, cube and nth roots, with simplified radical form for clean exact answers.",
    keywords: "root calculator, nth root, square root calculator, cube root calculator, simplify radicals",
    tagline: "Square, cube and nth roots with simplified radical form.",
    intro: "Enter a number and the root you want (2 for square, 3 for cube, or any n). The calculator gives the exact decimal value and simplified radical form.",
    card: `<div class="card">
<h2>Nth root calculator</h2>
<div class="form-grid">
<div class="form-group"><label>Number</label><input type="number" id="num" value="72" step="any"></div>
<div class="form-group"><label>Root (n)</label><input type="number" id="root" value="2" min="1" step="any"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var n=parseFloat(document.getElementById("num").value);
var r=parseFloat(document.getElementById("root").value);
if(isNaN(n)||isNaN(r)||r<=0){document.getElementById("resultMain").textContent="Enter a valid number and root";document.getElementById("resultGrid").innerHTML="";return;}
var res=MathCalc.rootCalc(n,r);
if(res.error){document.getElementById("resultMain").textContent=res.error;document.getElementById("resultGrid").innerHTML="";return;}
var grid="";
document.getElementById("resultMain").textContent=MathCalc.fmt(res.value,8);
var word=r===2?"square":r===3?"cube":r+"th";
grid+=item(word.charAt(0).toUpperCase()+word.slice(1)+" root of "+n,MathCalc.fmt(res.value,8));
var simp=MathCalc.simplifyNthRoot(n,Math.round(r));
if(simp.radicand!==Math.abs(n)||Math.abs(simp.coeff)!==1){
var rad=simp.radicand===1?String(simp.coeff):(Math.abs(simp.coeff)===1?"":(simp.coeff<0?"-":"")+Math.abs(simp.coeff))+"\u221A("+simp.radicand+")";
grid+=item("Simplified radical form",rad);
}
grid+=item("Check","("+MathCalc.fmt(res.value,4)+")^"+r+" \u2248 "+n);
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Square root", v: "\u221Ax = x^(1/2)" },
      { k: "Cube root", v: "\u221Bx = x^(1/3)" },
      { k: "nth root", v: "\u221Ax = x^(1/n)" },
      { k: "Exact form", v: "Radicals simplified automatically" }
    ],
    sections: [
      {
        title: "What is a root?",
        body: [
          "The nth root of a number x is the value that, multiplied by itself n times, gives x. For example the 4th root of 16 is 2 because 2 \u00D7 2 \u00D7 2 \u00D7 2 = 16. The square root (n = 2) and cube root (n = 3) are the most common.",
          "Roots and exponents are inverse operations: the nth root of x equals x^(1/n). A fractional exponent like 1/2 is another way of writing a square root."
        ]
      },
      {
        title: "Simplified radical form",
        body: [
          "Many roots are not whole numbers, but they can still be written exactly. For example \u221A72 = 6\u221A2 because 72 = 36 \u00D7 2 and \u221A36 = 6. This 'simplified radical form' keeps answers exact instead of rounding.",
          "The calculator extracts the largest perfect power from under the radical. It also handles odd roots of negative numbers, which are defined for real numbers (for example \u221B(-8) = -2)."
        ]
      }
    ],
    steps: [
      "Enter the number you want to take a root of.",
      "Enter the root value (2 for square, 3 for cube, any n for nth root).",
      "Press Calculate to see the decimal value.",
      "Read the simplified radical form when one exists."
    ],
    tips: [
      "Use root 2 for square roots and root 3 for cube roots.",
      "To take a fourth root of 16, enter 16 with root 4.",
      "Odd roots (3, 5, 7...) work with negative numbers; even roots do not."
    ],
    pros: [
      "Any root from square to nth",
      "Simplified radical form for exact answers",
      "Shows a verification check for every result"
    ],
    cons: [
      "Even roots of negative numbers are not real",
      "Non-integer roots are evaluated numerically"
    ],
    faqs: [
      { q: "What is the nth root?", a: "The nth root of x is the number y such that y\u207F = x. For example the 4th root of 16 is 2 because 2\u2074 = 16." },
      { q: "How do I find the square root?", a: "Enter the number and set the root to 2. For example \u221A144 = 12." },
      { q: "What is \u221A72 simplified?", a: "Since 72 = 36 \u00D7 2 and \u221A36 = 6, the simplified form is 6\u221A2 \u2248 8.485." },
      { q: "Can I take the cube root of a negative number?", a: "Yes. Odd roots of negative numbers are real: \u221B(-8) = -2 because (-2)\u00B3 = -8. Even roots of negatives are not real." },
      { q: "What is the difference between a root and an exponent?", a: "They are inverses. The nth root of x equals x^(1/n). Raising to the power n undoes taking the nth root." }
    ],
    related: [
      { href: "exponent-calculator.html", label: "Exponent Calculator", icon: "\u00B2" },
      { href: "factor-calculator.html", label: "Factor Calculator", icon: "\u00F7" },
      { href: "quadratic-formula-calculator.html", label: "Quadratic Formula", icon: "\u00B2" }
    ]
  },

  {
    name: "Least Common Multiple Calculator",
    filename: "least-common-multiple-calculator.html",
    title: "LCM Calculator - Least Common Multiple of Two or More Numbers",
    description: "Free LCM calculator. Find the least common multiple of two or more numbers with GCF and prime factorization shown.",
    keywords: "lcm calculator, least common multiple, lcm of numbers, prime factorization",
    tagline: "Least common multiple with GCF and prime factorization.",
    intro: "Enter two or more numbers separated by commas to find their least common multiple (LCM), greatest common factor (GCF) and prime factorization.",
    card: `<div class="card">
<h2>Least common multiple (LCM)</h2>
<div class="form-group"><label>Numbers (comma separated)</label><input type="text" id="nums" value="12, 18, 24" placeholder="e.g. 12, 18, 24"></div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate LCM</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var raw=document.getElementById("nums").value.split(",").map(function(s){return parseInt(s.trim(),10);});
var nums=raw.filter(function(n){return !isNaN(n)&&n>0;});
if(nums.length<2){document.getElementById("resultMain").textContent="Enter at least two positive numbers";document.getElementById("resultGrid").innerHTML="";return;}
var l=MathCalc.lcmMulti(nums).value;
var g=MathCalc.gcfMulti(nums).value;
var grid="";
grid+=item("LCM of "+nums.join(", "),MathCalc.fmt(l,0))+item("GCF of "+nums.join(", "),MathCalc.fmt(g,0));
var pf="";
nums.forEach(function(n,i){pf+=item("Prime factors of "+n,MathCalc.primeFactors(n).join(" \u00D7 "));});
grid+=pf;
document.getElementById("resultMain").textContent=MathCalc.fmt(l,0);
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Definition", v: "Smallest common multiple" },
      { k: "Formula", v: "LCM(a,b) = |a\u00B7b| / GCF(a,b)" },
      { k: "Inputs", v: "Two or more numbers" },
      { k: "Use case", v: "Common denominators, scheduling" }
    ],
    sections: [
      {
        title: "What is the least common multiple?",
        body: [
          "The least common multiple of a set of numbers is the smallest positive number that is a multiple of every number in the set. For 4 and 6, the multiples of 4 are 4, 8, 12, 16... and the multiples of 6 are 6, 12, 18... so the LCM is 12.",
          "The fastest way to compute it is LCM(a, b) = |a \u00D7 b| / GCF(a, b). For more than two numbers, apply the formula repeatedly. The calculator does this automatically and reports the result for any list you enter."
        ]
      },
      {
        title: "Why the LCM matters",
        body: [
          "The LCM gives the common denominator when adding or subtracting fractions, which is why fraction calculators rely on it. It also solves scheduling problems: two buses that arrive every 6 and 8 minutes both arrive at the station together every 24 minutes.",
          "Prime factorization shows how the LCM is built: take each prime factor to the highest power that appears in any number. The calculator displays these factorizations for every input."
        ]
      }
    ],
    steps: [
      "Type the numbers separated by commas, for example 12, 18, 24.",
      "Press Calculate LCM.",
      "Read the LCM and GCF of the whole list.",
      "Check the prime factorization of each number to see why."
    ],
    tips: [
      "Use the LCM as a common denominator when adding fractions by hand.",
      "The LCM of two co-prime numbers is always their product.",
      "Order does not matter \u2014 the LCM is the same for any arrangement of the list."
    ],
    pros: [
      "Works with two or more numbers",
      "Shows GCF and prime factorizations",
      "Instant results for common-denominator problems"
    ],
    cons: [
      "Only accepts positive integers",
      "Very large lists are best kept under a dozen numbers"
    ],
    faqs: [
      { q: "What is the LCM of 4 and 6?", a: "12. It is the smallest number divisible by both: multiples of 4 are 4, 8, 12... and multiples of 6 are 6, 12, 18... so the first common multiple is 12." },
      { q: "How is LCM calculated?", a: "Using LCM(a,b) = |a \u00D7 b| / GCF(a,b). For more numbers, apply the formula repeatedly, or use prime factors raised to their highest powers." },
      { q: "What is LCM used for?", a: "It finds common denominators for fractions and solves periodic scheduling problems where events repeat at different intervals." },
      { q: "What is the LCM of two prime numbers?", a: "Since primes share no factors, their LCM is simply their product. For example LCM(3, 5) = 15." },
      { q: "What is the difference between LCM and GCF?", a: "The LCM is the smallest shared multiple; the GCF is the largest shared divisor. They are related by LCM(a,b) \u00D7 GCF(a,b) = a \u00D7 b." }
    ],
    related: [
      { href: "greatest-common-factor-calculator.html", label: "GCF Calculator", icon: "\u2248" },
      { href: "factor-calculator.html", label: "Factor Calculator", icon: "\u00F7" },
      { href: "fraction-calculator.html", label: "Fraction Calculator", icon: "\u2159" }
    ]
  },

  {
    name: "Greatest Common Factor Calculator",
    filename: "greatest-common-factor-calculator.html",
    title: "GCF Calculator - Greatest Common Factor of Two or More Numbers",
    description: "Free GCF calculator. Find the greatest common factor of two or more numbers with LCM and prime factorization shown.",
    keywords: "gcf calculator, greatest common factor, gcd calculator, highest common factor",
    tagline: "Greatest common factor with LCM and prime factorization.",
    intro: "Enter two or more numbers separated by commas to find their greatest common factor (GCF), least common multiple (LCM) and prime factorization.",
    card: `<div class="card">
<h2>Greatest common factor (GCF)</h2>
<div class="form-group"><label>Numbers (comma separated)</label><input type="text" id="nums" value="24, 36, 60" placeholder="e.g. 24, 36, 60"></div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate GCF</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var raw=document.getElementById("nums").value.split(",").map(function(s){return parseInt(s.trim(),10);});
var nums=raw.filter(function(n){return !isNaN(n)&&n>0;});
if(nums.length<2){document.getElementById("resultMain").textContent="Enter at least two positive numbers";document.getElementById("resultGrid").innerHTML="";return;}
var g=MathCalc.gcfMulti(nums).value;
var l=MathCalc.lcmMulti(nums).value;
var grid="";
grid+=item("GCF of "+nums.join(", "),MathCalc.fmt(g,0))+item("LCM of "+nums.join(", "),MathCalc.fmt(l,0));
var pf="";
nums.forEach(function(n,i){pf+=item("Prime factors of "+n,MathCalc.primeFactors(n).join(" \u00D7 "));});
grid+=pf;
document.getElementById("resultMain").textContent=MathCalc.fmt(g,0);
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Definition", v: "Largest shared divisor" },
      { k: "Method", v: "Euclidean algorithm or prime factors" },
      { k: "Inputs", v: "Two or more numbers" },
      { k: "Use case", v: "Simplifying fractions, grouping, layout" }
    ],
    sections: [
      {
        title: "What is the greatest common factor?",
        body: [
          "The greatest common factor of a set of numbers is the largest whole number that divides every one of them without a remainder. For 24, 36 and 60, the GCF is 12 because 12 divides all three and nothing larger does.",
          "There are two common methods: the Euclidean algorithm (repeated division) and prime factorization (multiply the shared prime factors at their lowest powers). The calculator uses the fastest reliable approach and also shows the LCM, since the two are related by LCM(a,b) \u00D7 GCF(a,b) = a \u00D7 b."
        ]
      },
      {
        title: "Why the GCF matters",
        body: [
          "The GCF is the key to simplifying fractions: 18/24 reduces to 3/4 because both divide by 6, their GCF. It also helps split groups evenly, arrange tiles or photos into grids, and combine measurements in recipes.",
          "Finding the GCF of three or more numbers works the same way: compute the GCF pairwise, or factor all numbers and take the common prime factors. The calculator handles any list you type."
        ]
      }
    ],
    steps: [
      "Type the numbers separated by commas, for example 24, 36, 60.",
      "Press Calculate GCF.",
      "Read the GCF and LCM of the whole list.",
      "Check the prime factorization of each number to confirm."
    ],
    tips: [
      "Use the GCF to simplify fractions instantly: divide top and bottom by it.",
      "The GCF of two co-prime numbers is always 1.",
      "The GCF of a set is never larger than the smallest number in the set."
    ],
    pros: [
      "Works with two or more numbers",
      "Shows LCM and prime factorizations",
      "Instant answers for fraction simplification"
    ],
    cons: [
      "Only accepts positive integers",
      "Numbers must fit in standard integer precision"
    ],
    faqs: [
      { q: "What is the GCF of 24 and 36?", a: "12. It is the largest number that divides both: the factors of 24 are 1, 2, 3, 4, 6, 8, 12, 24 and the factors of 36 include 1, 2, 3, 4, 6, 9, 12, 18, 36, so the largest shared one is 12." },
      { q: "How is GCF calculated?", a: "By the Euclidean algorithm or by multiplying the common prime factors at their lowest powers. Both give the same result." },
      { q: "What is GCF used for?", a: "Simplifying fractions, distributing items into equal groups, and arranging things into even grids or layouts." },
      { q: "What is the GCF of two prime numbers?", a: "1, because primes have no common factor other than 1. Such numbers are called co-prime." },
      { q: "What is the difference between GCF and LCM?", a: "The GCF is the largest shared divisor, while the LCM is the smallest shared multiple. They are related by LCM \u00D7 GCF = product of the two numbers." }
    ],
    related: [
      { href: "least-common-multiple-calculator.html", label: "LCM Calculator", icon: "\u00D7" },
      { href: "factor-calculator.html", label: "Factor Calculator", icon: "\u00F7" },
      { href: "fraction-calculator.html", label: "Fraction Calculator", icon: "\u2159" }
    ]
  },

  {
    name: "Factor Calculator",
    filename: "factor-calculator.html",
    title: "Factor Calculator - List Factors & Prime Factorization",
    description: "Free factor calculator. List every factor and factor pair of any number, with prime factorization, factor count and sum.",
    keywords: "factor calculator, factorization, prime factorization, factor pairs, divisors",
    tagline: "Every factor, factor pair and the prime factorization of any number.",
    intro: "Enter a positive whole number to see all of its factors, factor pairs, prime factorization, and whether it is prime.",
    card: `<div class="card">
<h2>Factors of a number</h2>
<div class="form-group"><label>Number</label><input type="number" id="num" value="120" min="1" max="9007199254740991"></div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Find factors</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var n=parseInt(document.getElementById("num").value,10);
if(isNaN(n)||n<1||n>9007199254740991){document.getElementById("resultMain").textContent="Enter a positive whole number";document.getElementById("resultGrid").innerHTML="";return;}
var f=MathCalc.factor(n).value;
document.getElementById("resultMain").textContent=f.join(", ");
var grid=item("Factors ("+f.length+")",f.join(", "));
var pairs=f.slice(0,Math.ceil(f.length/2)).map(function(x){return x+" \u00D7 "+(n/x);});
grid+=item("Factor pairs",pairs.join("; "))+item("Prime factorization",MathCalc.primeFactors(n).join(" \u00D7 "))+item("Number of factors",f.length)+item("Sum of factors",MathCalc.fmt(f.reduce(function(a,b){return a+b;},0),0))+item("Is prime",f.length===2?"Yes":"No")+item("Perfect square",Number.isInteger(Math.sqrt(n))?"Yes":"No");
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Definition", v: "Factors divide n with no remainder" },
      { k: "Prime", v: "Exactly two factors: 1 and itself" },
      { k: "Outputs", v: "Factors, pairs, prime factors" },
      { k: "Use case", v: "Fractions, roots, algebra" }
    ],
    sections: [
      {
        title: "What are factors?",
        body: [
          "A factor of a number n is any whole number that divides n exactly, leaving no remainder. The number 12 has six factors: 1, 2, 3, 4, 6 and 12. Every factor can be paired with another so that the pair multiplies back to 12, like 3 \u00D7 4.",
          "The prime factorization breaks a number into its prime building blocks. For example 120 = 2 \u00D7 2 \u00D7 2 \u00D7 3 \u00D7 5, often written 2\u00B3 \u00D7 3 \u00D7 5. Every whole number greater than 1 has a unique prime factorization, a result called the Fundamental Theorem of Arithmetic."
        ]
      },
      {
        title: "Why factoring matters",
        body: [
          "Factoring is the foundation of simplifying fractions, finding square roots, solving quadratic equations and working with ratios. Knowing a number's factors tells you instantly what it divides by.",
          "The calculator also reports the count and sum of the factors, and whether the number is prime (exactly two factors) or a perfect square (an odd count of factors, because the square root pairs with itself)."
        ]
      }
    ],
    steps: [
      "Enter a positive whole number.",
      "Press Find factors.",
      "Read the full factor list and factor pairs.",
      "Check the prime factorization, factor count, sum and prime/perfect-square flags."
    ],
    tips: [
      "A prime number has exactly two factors: 1 and itself.",
      "Perfect squares always have an odd number of factors.",
      "The sum of factors of 1 is 1; all other numbers' factor sums include at least 1 + n."
    ],
    pros: [
      "Lists factors, pairs and prime factorization",
      "Reports count, sum, prime and square flags",
      "Handles large numbers up to 9 quadrillion"
    ],
    cons: [
      "Only accepts whole numbers",
      "Very large primes take longer to verify"
    ],
    faqs: [
      { q: "What are the factors of 12?", a: "1, 2, 3, 4, 6 and 12. They pair as 1\u00D712, 2\u00D76 and 3\u00D74." },
      { q: "What is prime factorization?", a: "Writing a number as a product of primes only. For example 120 = 2\u00B3 \u00D7 3 \u00D7 5. Every number has exactly one such form." },
      { q: "Is 1 a prime number?", a: "No. A prime has exactly two factors, but 1 has only one factor (itself), so it is neither prime nor composite." },
      { q: "How do I know if a number is a perfect square? ", a: "Its square root is a whole number. Perfect squares have an odd number of factors because the square root pairs with itself." },
      { q: "Why is factoring useful?", a: "It powers fraction simplification, radical simplification, algebra and number theory. Knowing the factors lets you divide, reduce and rearrange numbers confidently." }
    ],
    related: [
      { href: "greatest-common-factor-calculator.html", label: "GCF Calculator", icon: "\u2248" },
      { href: "least-common-multiple-calculator.html", label: "LCM Calculator", icon: "\u00D7" },
      { href: "root-calculator.html", label: "Root Calculator", icon: "\u221A" },
      { href: "quadratic-formula-calculator.html", label: "Quadratic Formula", icon: "\u00B2" }
    ]
  },

  {
    name: "Rounding Calculator",
    filename: "rounding-calculator.html",
    title: "Rounding Calculator - Round to Decimal Places & Significant Figures",
    description: "Free rounding calculator. Round any number to decimal places, nearest whole number, nearest 5/10/100/1000 or significant figures.",
    keywords: "rounding calculator, round to nearest, significant figures, round decimal places",
    tagline: "Round to decimal places, significant figures or any nearest value.",
    intro: "Enter a number and the calculator rounds it to decimal places, significant figures and common nearest values all at once.",
    card: `<div class="card">
<h2>Round a number</h2>
<div class="form-grid">
<div class="form-group"><label>Number</label><input type="number" id="num" value="1234.5678" step="any"></div>
<div class="form-group"><label>Decimal places</label><input type="number" id="dp" value="2" min="0" max="10"></div>
<div class="form-group"><label>Significant figures</label><input type="number" id="sig" value="4" min="1" max="10"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Round</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var n=parseFloat(document.getElementById("num").value);
var dp=parseInt(document.getElementById("dp").value,10);
var sig=parseInt(document.getElementById("sig").value,10);
if(isNaN(n)){document.getElementById("resultMain").textContent="Enter a valid number";document.getElementById("resultGrid").innerHTML="";return;}
if(isNaN(dp)||dp<0||dp>10){dp=2;}
if(isNaN(sig)||sig<1||sig>10){sig=4;}
var rDp=MathCalc.roundTo(n,dp).value;
var rSig=MathCalc.roundSig(n,sig).value;
var grid=item("Original",n)+item("To "+dp+" decimal places",MathCalc.fmt(rDp,dp))+item("To "+sig+" significant figures",MathCalc.fmt(rSig,sig));
[[0.01,"nearest hundredth"],[0.1,"nearest tenth"],[1,"nearest integer"],[5,"nearest 5"],[10,"nearest 10"],[100,"nearest 100"],[1000,"nearest 1000"],[0.5,"nearest 0.5"]].forEach(function(pair){
grid+=item("To "+pair[1],MathCalc.fmt(MathCalc.roundToNearest(n,pair[0]).value,Math.max(2,dp)));
});
document.getElementById("resultMain").textContent=MathCalc.fmt(rDp,dp);
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Common rule", v: "Round half up at 5 and above" },
      { k: "Decimal places", v: "Round to 0.01, 0.1, 1, ..." },
      { k: "Significant figures", v: "Keeps meaningful digits only" },
      { k: "Nearest values", v: "5, 10, 100, 1000, 0.5" }
    ],
    sections: [
      {
        title: "How rounding works",
        body: [
          "Rounding replaces a number with a nearby value that is simpler but close in size. The usual rule is to look at the digit just after the rounding position: if it is 5 or more, round up; otherwise round down.",
          "For example 1234.5678 rounded to 2 decimal places becomes 1234.57, and to the nearest ten it becomes 1230. The calculator applies this rule consistently to every rounding target."
        ]
      },
      {
        title: "Decimal places vs significant figures",
        body: [
          "Decimal places count digits after the decimal point. Significant figures count all meaningful digits from the first non-zero digit. The number 0.0045 has two significant figures but four decimal places.",
          "Significant figures matter in science and engineering because they reflect measurement precision: 12.30 implies more precision than 12.3. The calculator shows both styles side by side."
        ]
      }
    ],
    steps: [
      "Enter the number you want to round.",
      "Set the number of decimal places and significant figures.",
      "Press Round to see both, plus common nearest-value results.",
      "Use the result that fits your context (money, measurement, statistics)."
    ],
    tips: [
      "For money, round to 2 decimal places.",
      "For statistics, report significant figures based on instrument precision.",
      "Rounding to the nearest 0.5 is handy for half-point grades and measurements."
    ],
    pros: [
      "Shows many rounding targets at once",
      "Supports significant figures",
      "Round-half-up rule matches everyday expectations"
    ],
    cons: [
      "Uses the standard half-up convention only",
      "Rounding can accumulate error in long computations"
    ],
    faqs: [
      { q: "How do I round to 2 decimal places?", a: "Look at the third decimal digit. If it is 5 or more, increase the second decimal digit by 1; otherwise leave it. For example 3.14159 becomes 3.14." },
      { q: "What are significant figures?", a: "The digits that carry meaning in a measurement, starting from the first non-zero digit. 0.0045 has two; 12.30 has four." },
      { q: "What does round half up mean?", a: "When the dropped digit is exactly 5, the number rounds upward. For example 2.5 rounds to 3, and 3.15 to 2 decimal places rounds to 3.15's next value up." },
      { q: "How do I round to the nearest ten?", a: "Look at the ones digit: 5 or more rounds the tens digit up, otherwise it stays. 1234 rounds to 1230, and 1236 rounds to 1240." },
      { q: "Is rounding the same as truncating?", a: "No. Truncation always cuts digits off, while rounding adjusts the last kept digit based on the dropped part. 12.99 truncated is 12, but rounded is 13." }
    ],
    related: [
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "scientific-notation-calculator.html", label: "Scientific Notation", icon: "\u00D710" },
      { href: "big-number-calculator.html", label: "Big Number Calculator", icon: "#" }
    ]
  },

  {
    name: "Matrix Calculator",
    filename: "matrix-calculator.html",
    title: "Matrix Calculator - Add, Multiply, Determinant & Inverse",
    description: "Free matrix calculator for 2x2 and 3x3 matrices. Add, subtract, multiply, transpose, find determinants and inverses with steps.",
    keywords: "matrix calculator, matrix multiplication, determinant calculator, inverse matrix, 2x2 matrix, 3x3 matrix",
    tagline: "Add, multiply, transpose, determinants and inverses for 2x2 and 3x3 matrices.",
    intro: "Choose 2x2 or 3x3 matrices, fill in the entries of A and B, pick an operation, and get the exact result.",
    card: `<div class="card">
<h2>Matrix operations</h2>
<div class="form-grid">
<div class="form-group"><label>Matrix size</label><select id="dim"><option value="2">2 x 2</option><option value="3">3 x 3</option></select></div>
<div class="form-group"><label>Operation</label>
<select id="op">
<option value="add">A + B</option>
<option value="sub">A - B</option>
<option value="mul">A \u00D7 B</option>
<option value="detA">Determinant of A</option>
<option value="detB">Determinant of B</option>
<option value="tA">Transpose of A</option>
<option value="invA">Inverse of A</option>
<option value="invB">Inverse of B</option>
</select>
</div>
</div>
<div class="matrix-grid">
<div class="matrix-box">
<label>Matrix A</label>
<div id="mA"></div>
</div>
<div class="matrix-box">
<label>Matrix B</label>
<div id="mB"></div>
</div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
function buildMats(){
var dim=parseInt(document.getElementById("dim").value,10);
var a="",b="";
for(var i=0;i<dim;i++){
a+='<div class="matrix-row">';b+='<div class="matrix-row">';
for(var j=0;j<dim;j++){a+='<input type="number" class="ai" data-i="'+i+'" data-j="'+j+'" value="'+(i===j?1:0)+'">';b+='<input type="number" class="bi" data-i="'+i+'" data-j="'+j+'" value="'+(i===j?1:0)+'">';}
a+='</div>';b+='</div>';}
document.getElementById("mA").innerHTML=a;
document.getElementById("mB").innerHTML=b;}
buildMats();
document.getElementById("dim").onchange=buildMats;
function readMats(){
var dim=parseInt(document.getElementById("dim").value,10);
var A=[],B=[];
for(var i=0;i<dim;i++){A[i]=[];B[i]=[];for(var j=0;j<dim;j++){A[i][j]=parseFloat(document.querySelector('#mA .ai[data-i="'+i+'"][data-j="'+j+'"]').value)||0;B[i][j]=parseFloat(document.querySelector('#mB .bi[data-i="'+i+'"][data-j="'+j+'"]').value)||0;}}
return {A:A,B:B,dim:dim};}
function matHtml(m){return '<div class="frac-display" style="display:inline-block;vertical-align:middle;padding:8px;">'+m.map(function(row){return '<div class="matrix-row" style="justify-content:center;">'+row.map(function(v){return '<span style="min-width:44px;display:inline-block;text-align:center;padding:2px 6px;">'+v+'</span>';}).join("")+'</div>';}).join("")+'</div>';}
document.getElementById("calcBtn").onclick=function(){
var inpt=readMats();
var op=document.getElementById("op").value;
var out="",grid="";
if(op==="add"){out=MathCalc.matrixAdd(inpt.A,inpt.B);}
else if(op==="sub"){out=MathCalc.matrixSub(inpt.A,inpt.B);}
else if(op==="mul"){out=MathCalc.matrixMul(inpt.A,inpt.B);}
else if(op==="detA"){var d=inpt.dim===2?MathCalc.matrixDet2(inpt.A):MathCalc.matrixDet3(inpt.A);document.getElementById("resultMain").textContent=MathCalc.fmt(d,6);document.getElementById("resultGrid").innerHTML=item("Determinant of A",MathCalc.fmt(d,6));return;}
else if(op==="detB"){var d2=inpt.dim===2?MathCalc.matrixDet2(inpt.B):MathCalc.matrixDet3(inpt.B);document.getElementById("resultMain").textContent=MathCalc.fmt(d2,6);document.getElementById("resultGrid").innerHTML=item("Determinant of B",MathCalc.fmt(d2,6));return;}
else if(op==="tA"){out=MathCalc.matrixTranspose(inpt.A);}
else if(op==="invA"){var inv=inpt.dim===2?MathCalc.matrixInverse2(inpt.A):MathCalc.matrixInverse3(inpt.A);if(inv.error){document.getElementById("resultMain").textContent=inv.error;return;}out=inv.value;}
else{var inv2=inpt.dim===2?MathCalc.matrixInverse2(inpt.B):MathCalc.matrixInverse3(inpt.B);if(inv2.error){document.getElementById("resultMain").textContent=inv2.error;return;}out=inv2.value;}
var clean=out.map(function(row){return row.map(function(v){return Math.round(v*1e6)/1e6;});});
document.getElementById("resultMain").innerHTML=matHtml(clean);
document.getElementById("resultGrid").innerHTML=item("Operation",op)+item("Size",inpt.dim+" x "+inpt.dim);};`,
    facts: [
      { k: "Sizes", v: "2 x 2 and 3 x 3" },
      { k: "Operations", v: "Add, subtract, multiply, transpose" },
      { k: "Advanced", v: "Determinants and inverses" },
      { k: "Use case", v: "Linear algebra, graphics, systems of equations" }
    ],
    sections: [
      {
        title: "What is a matrix?",
        body: [
          "A matrix is a rectangular grid of numbers arranged in rows and columns. A 2x2 matrix has two rows and two columns. Matrices are the building blocks of linear algebra, used to solve systems of equations, transform coordinates in graphics, and represent data in machine learning.",
          "Matrix addition and subtraction work entry by entry: add (or subtract) the numbers in matching positions. Multiplication is different: each entry of the product is the sum of row-times-column products, so the matrices must have compatible sizes."
        ]
      },
      {
        title: "Determinants and inverses",
        body: [
          "The determinant is a single number computed from a square matrix that tells you about scaling and invertibility. A determinant of zero means the matrix is singular and has no inverse.",
          "The inverse of a matrix is the matrix that, when multiplied by the original, gives the identity matrix. Inverses solve matrix equations the way division solves ordinary equations. The calculator finds 2x2 and 3x3 inverses with cofactor expansion."
        ]
      }
    ],
    steps: [
      "Choose 2 x 2 or 3 x 3 from the size dropdown.",
      "Enter the entries of matrix A and matrix B.",
      "Pick an operation and press Calculate.",
      "Read the resulting matrix or the scalar value (determinant)."
    ],
    tips: [
      "For A \u00D7 B, the number of columns of A must equal the rows of B \u2014 the calculator uses square matrices so this always holds.",
      "Check a determinant of 0 before trying to invert: the matrix is singular.",
      "Multiplying a matrix by its inverse gives the identity matrix \u2014 a quick way to verify."
    ],
    pros: [
      "All core matrix operations in one tool",
      "2x2 and 3x3 support",
      "Detects singular matrices before inverting"
    ],
    cons: [
      "Limited to 2x2 and 3x3 sizes",
      "Matrix entries are numeric only"
    ],
    faqs: [
      { q: "How do I multiply two matrices?", a: "For each entry in the result, multiply each element of the row in A by the matching element of the column in B and add the products. The calculator does this automatically for square matrices." },
      { q: "What is the determinant of a matrix?", a: "A single number that summarizes a square matrix. For a 2x2 matrix [a b; c d] it is ad - bc. A zero determinant means the matrix has no inverse." },
      { q: "What is an inverse matrix?", a: "The inverse of A, written A\u207B\u00B9, satisfies A \u00D7 A\u207B\u00B9 = identity matrix. It acts like division for matrices and only exists when the determinant is not zero." },
      { q: "What is the identity matrix?", a: "A square matrix with 1s on the main diagonal and 0s elsewhere. Multiplying any matrix by the identity of the right size leaves it unchanged." },
      { q: "What are matrices used for?", a: "Solving linear systems, computer graphics transformations, physics simulations, economics models and machine learning." }
    ],
    related: [
      { href: "binary-calculator.html", label: "Binary Calculator", icon: "01" },
      { href: "scientific-notation-calculator.html", label: "Scientific Notation", icon: "\u00D710" },
      { href: "quadratic-formula-calculator.html", label: "Quadratic Formula", icon: "\u00B2" }
    ]
  },

  {
    name: "Scientific Notation Calculator",
    filename: "scientific-notation-calculator.html",
    title: "Scientific Notation Calculator - Convert & Calculate in Scientific Notation",
    description: "Free scientific notation calculator. Convert numbers to scientific notation and E-notation, and add, subtract, multiply or divide them.",
    keywords: "scientific notation calculator, standard form calculator, e notation, scientific notation converter",
    tagline: "Convert to scientific notation and do arithmetic with exponents.",
    intro: "Convert any number to scientific notation, or perform arithmetic on two numbers in scientific notation with full precision.",
    card: `<div class="card">
<h2>Number to scientific notation</h2>
<div class="form-group"><label>Number (or use E-notation like 1.2e5)</label><input type="text" id="num" value="123456789" placeholder="e.g. 123456789 or 1.2e5"></div>
<div class="form-actions"><button class="btn btn-primary" id="convBtn" type="button">Convert</button></div>
</div>

<div class="card">
<h2>Arithmetic in scientific notation</h2>
<div class="form-grid">
<div class="form-group"><label>A mantissa</label><input type="number" id="ma" value="3.2" step="any"></div>
<div class="form-group"><label>A exponent</label><input type="number" id="ea" value="4" step="any"></div>
<div class="form-group"><label>B mantissa</label><input type="number" id="mb" value="1.5" step="any"></div>
<div class="form-group"><label>B exponent</label><input type="number" id="eb" value="3" step="any"></div>
<div class="form-group"><label>Operation</label>
<select id="op"><option value="add">+ Add</option><option value="sub">- Subtract</option><option value="mul">\u00D7 Multiply</option><option value="div">\u00F7 Divide</option></select>
</div>
</div>
<div class="form-actions"><button class="btn btn-outline" id="arithBtn" type="button">Calculate</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
function sciStr(r){return MathCalc.fmt(r.m,6)+" \u00D7 10^"+r.e;}
document.getElementById("convBtn").onclick=function(){
var raw=document.getElementById("num").value.trim();
if(raw===""){document.getElementById("resultMain").textContent="Enter a number";return;}
var n=Number(raw);
if(isNaN(n)){document.getElementById("resultMain").textContent="Invalid number";return;}
var sci=MathCalc.toScientific(n,8);
var eNot=n.toExponential(6);
document.getElementById("resultMain").textContent=sci.value;
document.getElementById("resultGrid").innerHTML=item("Number",raw)+item("Scientific notation",sci.value)+item("E-notation",eNot)+item("Digits",String(n).replace("-","").split(".").join("").length);};
document.getElementById("arithBtn").onclick=function(){
var ma=parseFloat(document.getElementById("ma").value);
var ea=parseFloat(document.getElementById("ea").value);
var mb=parseFloat(document.getElementById("mb").value);
var eb=parseFloat(document.getElementById("eb").value);
var op=document.getElementById("op").value;
if([ma,ea,mb,eb].some(isNaN)){document.getElementById("resultMain").textContent="Enter valid values";document.getElementById("resultGrid").innerHTML="";return;}
var A={m:ma,e:ea},B={m:mb,e:eb},r;
if(op==="add"){r=MathCalc.sciAdd(A,B,6);}
else if(op==="sub"){r=MathCalc.sciSub(A,B,6);}
else if(op==="mul"){r=MathCalc.sciMul(A,B,6);}
else{r=MathCalc.sciDiv(A,B,6);}
if(r.error){document.getElementById("resultMain").textContent=r.error;return;}
document.getElementById("resultMain").textContent=sciStr(r);
var dec=A.m*Math.pow(10,A.e)+(op==="sub"?-1:op==="div"||op==="mul"?0:1)*(op==="add"||op==="sub"?B.m*Math.pow(10,B.e):0);
if(op==="mul"){dec=A.m*Math.pow(10,A.e)*B.m*Math.pow(10,B.e);}
if(op==="div"){dec=(A.m*Math.pow(10,A.e))/(B.m*Math.pow(10,B.e));}
document.getElementById("resultGrid").innerHTML=item("Input A",sciStr(A))+item("Input B",sciStr(B))+item("Result",sciStr(r))+item("Decimal form",MathCalc.fmt(dec,8));};`,
    facts: [
      { k: "Form", v: "a \u00D7 10^n with 1 \u2264 a < 10" },
      { k: "E-notation", v: "e.g. 1.2e5 = 120000" },
      { k: "Arithmetic", v: "Add, subtract, multiply, divide" },
      { k: "Use case", v: "Physics, astronomy, very large/small numbers" }
    ],
    sections: [
      {
        title: "What is scientific notation?",
        body: [
          "Scientific notation writes a number as a mantissa between 1 and 10 multiplied by a power of 10. For example 123456789 becomes 1.23456789 \u00D7 10\u2078, and 0.00005 becomes 5 \u00D7 10\u207B\u2075.",
          "It makes very large and very small numbers readable and easy to compare. The exponent tells you how many places the decimal point moves: positive exponents mean big numbers, negative exponents mean small ones."
        ]
      },
      {
        title: "Arithmetic with exponents",
        body: [
          "To multiply, multiply the mantissas and add the exponents. To divide, divide the mantissas and subtract the exponents. Addition and subtraction require matching exponents first.",
          "For example (3.2 \u00D7 10\u2074) + (1.5 \u00D7 10\u00B3) = 3.35 \u00D7 10\u2074. The calculator normalizes every result so the mantissa always stays between 1 and 10."
        ]
      }
    ],
    steps: [
      "To convert, type a number (plain or E-notation like 1.2e5) and press Convert.",
      "Read the scientific notation, E-notation and digit count.",
      "For arithmetic, enter the mantissa and exponent of A and B.",
      "Pick an operation and press Calculate for the normalized result."
    ],
    tips: [
      "E-notation uses the letter e: 1.2e5 means 1.2 \u00D7 10\u2075.",
      "The mantissa of a properly normalized number is always between 1 and 10.",
      "Adding numbers with very different exponents gives an answer dominated by the larger exponent."
    ],
    pros: [
      "Converts between forms instantly",
      "Full arithmetic in scientific notation",
      "Normalizes results automatically"
    ],
    cons: [
      "Displays up to 8 significant digits",
      "Extreme exponents may lose precision"
    ],
    faqs: [
      { q: "What is scientific notation?", a: "A compact way to write numbers as a mantissa times a power of 10, like 1.234 \u00D7 10\u2078. It is standard in science and engineering." },
      { q: "How do I convert a number to scientific notation?", a: "Move the decimal point until one non-zero digit remains on the left. Count the moves: that count is the exponent (negative if you moved right)." },
      { q: "What is E-notation?", a: "E-notation replaces 'times ten to the power' with the letter e: 1.2e5 equals 1.2 \u00D7 10\u2075 = 120000. It is common in calculators and programming." },
      { q: "How do I multiply numbers in scientific notation?", a: "Multiply the mantissas and add the exponents, then normalize. For example (2 \u00D7 10\u00B3) \u00D7 (3 \u00D7 10\u00B2) = 6 \u00D7 10\u2075." },
      { q: "Why is scientific notation useful?", a: "It handles astronomically large and tiny numbers without long strings of zeros, prevents errors, and makes comparisons and arithmetic much easier." }
    ],
    related: [
      { href: "big-number-calculator.html", label: "Big Number Calculator", icon: "#" },
      { href: "exponent-calculator.html", label: "Exponent Calculator", icon: "\u00B2" },
      { href: "rounding-calculator.html", label: "Rounding Calculator", icon: "\u00B1" }
    ]
  },

  {
    name: "Big Number Calculator",
    filename: "big-number-calculator.html",
    title: "Big Number Calculator - Exact Arithmetic for Huge Numbers",
    description: "Free big number calculator. Add, subtract, multiply and divide arbitrarily large integers exactly, with number names and digit counts.",
    keywords: "big number calculator, big integer calculator, large number arithmetic, number to words",
    tagline: "Exact arithmetic for numbers far beyond normal calculator limits.",
    intro: "Enter two huge integers (any number of digits) and choose an operation. The calculator gives the exact result using arbitrary-precision arithmetic.",
    card: `<div class="card">
<h2>Big integer arithmetic</h2>
<div class="form-grid">
<div class="form-group"><label>Number A</label><input type="text" id="a" value="123456789012345678901234567890"></div>
<div class="form-group"><label>Operation</label>
<select id="op"><option value="add">+ Add</option><option value="sub">- Subtract</option><option value="mul">\u00D7 Multiply</option><option value="div">\u00F7 Divide (quotient)</option><option value="mod">mod Remainder</option></select>
</div>
<div class="form-group"><label>Number B</label><input type="text" id="b" value="987654321098765432109876543210"></div>
</div>
<div class="form-actions"><button class="btn btn-primary" id="calcBtn" type="button">Calculate</button></div>
</div>

<div class="card">
<h2>Describe a big number</h2>
<div class="form-group"><label>Number</label><input type="text" id="desc" value="1234567890123456789"></div>
<div class="form-actions"><button class="btn btn-outline" id="descBtn" type="button">Describe</button></div>
</div>`,
    script: `function item(l,v){return '<div class="result-item"><div class="label">'+l+'</div><div class="value">'+v+'</div></div>';}
document.getElementById("calcBtn").onclick=function(){
var a=document.getElementById("a").value.trim();
var b=document.getElementById("b").value.trim();
var op=document.getElementById("op").value;
var r=MathCalc.bigArith(a,b,op);
if(r.error){document.getElementById("resultMain").textContent=r.error;document.getElementById("resultGrid").innerHTML="";return;}
var v=r.value;
var grid="";
document.getElementById("resultMain").textContent=v;
grid+=item("Operation",{add:"Addition",sub:"Subtraction",mul:"Multiplication",div:"Division",mod:"Remainder"}[op])+item("Result",v)+item("Digits in result",MathCalc.digitCount(v));
if(op==="div"){var rem=MathCalc.bigArith(a,b,"mod");grid+=item("Remainder",rem.value);}
if(op==="mul"||op==="add"||op==="sub"){grid+=item("Number name (approx)","About "+MathCalc.numberToWords(parseFloat(v.slice(0,15)))+" ...");}
document.getElementById("resultGrid").innerHTML=grid;};
document.getElementById("descBtn").onclick=function(){
var s=document.getElementById("desc").value.trim();
if(!/^-?\\d+$/.test(s)){document.getElementById("resultMain").textContent="Enter a valid integer (digits only)";document.getElementById("resultGrid").innerHTML="";return;}
var n=parseFloat(s);
document.getElementById("resultMain").textContent=s;
var grid=item("Number",s)+item("Digits",MathCalc.digitCount(s))+item("Scientific notation",n.toExponential(6));
if(Math.abs(n)<1e66){grid+=item("Number name",MathCalc.numberToWords(n));}
document.getElementById("resultGrid").innerHTML=grid;};`,
    facts: [
      { k: "Precision", v: "Arbitrarily large integers, exact" },
      { k: "Operations", v: "+ - \u00D7 \u00F7 and remainder" },
      { k: "Extras", v: "Number names and digit counts" },
      { k: "Use case", v: "Cryptography, factorials, finance" }
    ],
    sections: [
      {
        title: "Why big numbers need a special calculator",
        body: [
          "Ordinary calculators work with floating-point numbers that are limited to about 15 to 17 significant digits, so they silently round large values. This calculator uses arbitrary-precision integer arithmetic, which keeps every single digit exact no matter how long the numbers are.",
          "You can add two 100-digit numbers, multiply a 50-digit number by another, or compute remainders for cryptography exercises, and the answer will be complete and exact."
        ]
      },
      {
        title: "Reading huge numbers",
        body: [
          "Large numbers follow a regular naming pattern in groups of three digits: thousand, million, billion, trillion, quadrillion, and so on. For example 1,234,567,890 is one billion two hundred thirty-four million five hundred sixty-seven thousand eight hundred ninety.",
          "The calculator can spell any number up to decillions (10\u00B3\u00B3), and reports the digit count and scientific notation so you always know the scale of the result."
        ]
      }
    ],
    steps: [
      "Type two whole numbers (positive or negative) into the fields.",
      "Choose an operation: add, subtract, multiply, divide or remainder.",
      "Press Calculate to see the exact result.",
      "Use the Describe tool to spell any number or get its digit count."
    ],
    tips: [
      "Do not include commas in the inputs \u2014 digits only, plus an optional minus sign.",
      "Use Division to get the quotient and Remainder to get what is left over.",
      "The number-name tool works up to about a decillion (33 digits)."
    ],
    pros: [
      "Exact results with unlimited digit counts",
      "All four operations plus remainder",
      "Number-to-words and digit counting included"
    ],
    cons: [
      "Whole numbers only (no decimals)",
      "Number names are limited to decillions"
    ],
    faqs: [
      { q: "Why do regular calculators lose digits?", a: "They store numbers in floating point, which keeps only about 15 significant digits and rounds the rest. This calculator stores integers as arbitrary-precision values, so nothing is lost." },
      { q: "How big a number can I enter?", a: "Practically any size. A 100-digit or even 1000-digit number works; the only limit is your browser's memory and patience." },
      { q: "How do I divide big numbers?", a: "Choose Divide for the quotient and Remainder for the leftover. Division of integers always produces a quotient and a remainder, exactly like long division." },
      { q: "What is a quintillion? ", a: "A quintillion is 10\u00B9\u2078, written as 1 followed by 18 zeros. The scale table goes thousand, million, billion, trillion, quadrillion, quintillion, sextillion, and beyond." },
      { q: "Can I enter negative numbers?", a: "Yes. Prefix a number with a minus sign, for example -1234567890. All operations handle signs exactly." }
    ],
    related: [
      { href: "scientific-notation-calculator.html", label: "Scientific Notation", icon: "\u00D710" },
      { href: "binary-calculator.html", label: "Binary Calculator", icon: "01" },
      { href: "rounding-calculator.html", label: "Rounding Calculator", icon: "\u00B1" }
    ]
  }

];
