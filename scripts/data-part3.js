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
