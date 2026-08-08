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
