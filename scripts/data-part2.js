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
