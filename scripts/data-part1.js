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
