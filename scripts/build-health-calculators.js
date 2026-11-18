/* Generates 8 high-traffic Fitness & Health Calculators */
const fs = require("fs");
const path = require("path");
const { buildCalculatorPage } = require("./page-shell");

const root = path.resolve(__dirname, "..");

const HEALTH_CALCS = [
  // 1. BMI Calculator
  {
    file: "bmi-calculator.html",
    title: "BMI Calculator - Body Mass Index, Healthy Weight & Prime Score | EMI Master",
    description: "Free BMI calculator for adults and teens. Calculate your Body Mass Index using US or Metric units, see your healthy weight range, BMI Prime, and Ponderal Index.",
    keywords: "bmi calculator, body mass index calculator, healthy weight range, bmi chart, bmi prime, ponderal index",
    schemaCategory: "HealthApplication",
    catName: "Fitness & Health",
    catAnchor: "sitemap.html#fitness",
    h1: "BMI Calculator",
    subtitle: "Calculate your Body Mass Index (BMI), healthy target weight range, BMI Prime, and Ponderal Index using US or Metric units.",
    calculatorHtml: `
    <div class="unit-tabs" id="unitTabs">
      <button type="button" class="unit-tab active" data-unit="us">US Units (ft, in, lbs)</button>
      <button type="button" class="unit-tab" data-unit="metric">Metric (cm, kg)</button>
    </div>

    <div class="card">
      <h2>Body Measurements</h2>
      <div class="form-grid">
        <div class="form-group">
          <label for="age">Age (2 – 120 years)</label>
          <input type="number" id="age" value="28" min="2" max="120" step="1">
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <select id="gender">
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="form-group us-only">
          <label for="heightFt">Height (Feet &amp; Inches)</label>
          <div class="form-duo">
            <div class="input-wrap"><span class="suffix">ft</span><input type="number" id="heightFt" value="5" min="1" max="8" step="1"></div>
            <div class="input-wrap"><span class="suffix">in</span><input type="number" id="heightIn" value="9" min="0" max="11" step="0.5"></div>
          </div>
        </div>
        <div class="form-group us-only">
          <label for="weightLb">Weight (lbs)</label>
          <div class="input-wrap"><span class="suffix">lbs</span><input type="number" id="weightLb" value="165" min="10" max="1000" step="0.5"></div>
        </div>
        <div class="form-group metric-only" style="display:none;">
          <label for="heightCm">Height (cm)</label>
          <div class="input-wrap"><span class="suffix">cm</span><input type="number" id="heightCm" value="175" min="40" max="260" step="0.5"></div>
        </div>
        <div class="form-group metric-only" style="display:none;">
          <label for="weightKg">Weight (kg)</label>
          <div class="input-wrap"><span class="suffix">kg</span><input type="number" id="weightKg" value="75" min="5" max="450" step="0.5"></div>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate BMI</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>

    <div class="result-panel" id="resultPanel">
      <h3>Your Body Mass Index</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Category</div><div class="value" id="bmiCatOut">—</div></div>
        <div class="result-item"><div class="label">Healthy Weight Range</div><div class="value" id="healthyRangeOut">—</div></div>
        <div class="result-item"><div class="label">BMI Prime / Ponderal</div><div class="value" id="bmiPrimeOut">—</div></div>
      </div>
      <div class="health-gauge-wrap">
        <div class="health-gauge-track"><div class="health-gauge-marker" id="bmiMarker" style="left:40%;"></div></div>
        <div class="health-gauge-labels">
          <span>Underweight (&lt;18.5)</span>
          <span>Normal (18.5–24.9)</span>
          <span>Overweight (25–29.9)</span>
          <span>Obese (30+)</span>
        </div>
      </div>
      <div class="payoff-note" id="bmiNote"></div>
    </div>

    <div class="card">
      <h2>WHO Adult BMI Classification Table</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Classification</th><th class="num">BMI Range (kg/m&sup2;)</th><th>Health Risk Profile</th></tr></thead>
          <tbody>
            <tr><td>Severe Thinness</td><td class="num">&lt; 16.0</td><td>High nutritional deficiency risk</td></tr>
            <tr><td>Moderate Thinness</td><td class="num">16.0 – 16.9</td><td>Elevated risk</td></tr>
            <tr><td>Mild Thinness</td><td class="num">17.0 – 18.4</td><td>Below healthy band</td></tr>
            <tr><td><strong>Normal / Healthy Weight</strong></td><td class="num"><strong>18.5 – 24.9</strong></td><td><strong>Lowest baseline weight-related risk</strong></td></tr>
            <tr><td>Overweight (Pre-obese)</td><td class="num">25.0 – 29.9</td><td>Mild to moderate metabolic risk</td></tr>
            <tr><td>Obese Class I</td><td class="num">30.0 – 34.9</td><td>Elevated cardiovascular &amp; metabolic risk</td></tr>
            <tr><td>Obese Class II</td><td class="num">35.0 – 39.9</td><td>Severe clinical risk</td></tr>
            <tr><td>Obese Class III</td><td class="num">&ge; 40.0</td><td>Very high clinical risk</td></tr>
          </tbody>
        </table>
      </div>
    </div>`,
    facts: [
      { k: "Metric Formula", v: "Weight (kg) / Height (m)^2" },
      { k: "US Formula", v: "703 x Weight (lb) / Height (in)^2" },
      { k: "Healthy Adult Range", v: "18.5 to 24.9 kg/m^2" },
      { k: "BMI Prime", v: "BMI / 25.0 (ideal <= 1.0)" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>How Body Mass Index (BMI) Works</h2>
      <p>Body Mass Index (BMI) is a rapid screening metric developed to estimate whether an adult's weight falls inside a healthy proportion relative to their height. Because tall people naturally carry more tissue mass than shorter individuals, squaring height in meters normalizes body weight across statures.</p>
      <div class="definition">
        <p><strong>BMI = weight (kg) &divide; [height (m)]&sup2;</strong> &nbsp;|&nbsp; <strong>US: BMI = 703 &times; weight (lbs) &divide; [height (in)]&sup2;</strong></p>
      </div>
      <p>While BMI is trusted worldwide by clinicians for population screening, it does not distinguish between dense skeletal muscle and body fat. For a deeper body composition check, combine your BMI with our <a href="body-fat-calculator.html">Body Fat Calculator</a> or read our <a href="blog-bmi-vs-body-fat-guide.html">BMI vs. Body Fat Guide</a>.</p>
    </div>`,
    faqs: [
      { q: "What is a healthy BMI range for adults?", a: "For most adults age 20 and older, the World Health Organization defines a healthy BMI as 18.5 to 24.9. Values below 18.5 are underweight, 25.0 to 29.9 are overweight, and 30.0 or higher fall in the obese range." },
      { q: "What is BMI Prime?", a: "BMI Prime is the ratio of your actual BMI to the upper limit of normal BMI (25.0). A BMI Prime below 0.74 indicates underweight, 0.74 to 1.00 is healthy, and values above 1.00 show how far above the normal threshold your weight sits." },
      { q: "Why can athletes have a high BMI?", a: "Muscle tissue is roughly 18% denser than fat tissue. Muscular athletes often score in the 25–28 BMI range despite having low body fat. Combining BMI with waist-to-height ratio or the U.S. Navy body fat test gives a clearer picture." }
    ],
    related: [
      { href: "calorie-calculator.html", label: "Calorie & TDEE Calculator", icon: "🔥" },
      { href: "body-fat-calculator.html", label: "Body Fat Calculator", icon: "📏" },
      { href: "ideal-weight-calculator.html", label: "Ideal Weight Calculator", icon: "⚖️" },
      { href: "bmr-calculator.html", label: "BMR Calculator", icon: "⚡" },
      { href: "blog-bmi-vs-body-fat-guide.html", label: "Guide: BMI vs Body Fat", icon: "📘" }
    ],
    script: `
(function(){
  var unit = "us";
  document.querySelectorAll("#unitTabs .unit-tab").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll("#unitTabs .unit-tab").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      unit = btn.getAttribute("data-unit");
      document.querySelectorAll(".us-only").forEach(function(el){ el.style.display = unit === "us" ? "" : "none"; });
      document.querySelectorAll(".metric-only").forEach(function(el){ el.style.display = unit === "metric" ? "" : "none"; });
      calc();
    });
  });

  function calc() {
    var hM = 0, wKg = 0;
    if (unit === "us") {
      var ft = parseFloat(document.getElementById("heightFt").value) || 0;
      var inc = parseFloat(document.getElementById("heightIn").value) || 0;
      var lb = parseFloat(document.getElementById("weightLb").value) || 0;
      var totalIn = ft * 12 + inc;
      hM = totalIn * 0.0254;
      wKg = lb * 0.45359237;
    } else {
      var cm = parseFloat(document.getElementById("heightCm").value) || 0;
      wKg = parseFloat(document.getElementById("weightKg").value) || 0;
      hM = cm / 100;
    }
    if (hM <= 0 || wKg <= 0) {
      document.getElementById("resultMain").textContent = "Enter valid height & weight";
      return;
    }
    var bmi = wKg / (hM * hM);
    var prime = bmi / 25;
    var ponderal = wKg / Math.pow(hM, 3);
    var cat = "Normal Weight", cls = "positive";
    if (bmi < 16) { cat = "Severe Thinness"; cls = "negative"; }
    else if (bmi < 18.5) { cat = "Underweight"; cls = ""; }
    else if (bmi < 25) { cat = "Normal Weight"; cls = "positive"; }
    else if (bmi < 30) { cat = "Overweight"; cls = ""; }
    else if (bmi < 35) { cat = "Obese Class I"; cls = "negative"; }
    else if (bmi < 40) { cat = "Obese Class II"; cls = "negative"; }
    else { cat = "Obese Class III"; cls = "negative"; }

    var minKg = 18.5 * hM * hM;
    var maxKg = 24.9 * hM * hM;
    var rangeText = unit === "us"
      ? (minKg * 2.20462).toFixed(1) + " – " + (maxKg * 2.20462).toFixed(1) + " lbs"
      : minKg.toFixed(1) + " – " + maxKg.toFixed(1) + " kg";

    document.getElementById("resultMain").textContent = bmi.toFixed(1) + " kg/m\u00B2 (" + cat + ")";
    var catEl = document.getElementById("bmiCatOut");
    catEl.textContent = cat;
    catEl.className = "value " + cls;
    document.getElementById("healthyRangeOut").textContent = rangeText;
    document.getElementById("bmiPrimeOut").textContent = prime.toFixed(2) + " / " + ponderal.toFixed(1);

    var pct = Math.min(98, Math.max(2, ((bmi - 13) / (40 - 13)) * 100));
    document.getElementById("bmiMarker").style.left = pct.toFixed(1) + "%";

    var diffNote = "";
    if (wKg < minKg) {
      var gain = minKg - wKg;
      diffNote = "Gain roughly " + (unit === "us" ? (gain * 2.20462).toFixed(1) + " lbs" : gain.toFixed(1) + " kg") + " to enter the healthy BMI range.";
    } else if (wKg > maxKg) {
      var lose = wKg - maxKg;
      diffNote = "Lose roughly " + (unit === "us" ? (lose * 2.20462).toFixed(1) + " lbs" : lose.toFixed(1) + " kg") + " to reach the upper healthy limit (BMI 24.9).";
    } else {
      diffNote = "Your weight is inside the standard healthy range for your height.";
    }
    document.getElementById("bmiNote").textContent = diffNote;
  }

  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("age").value = 28;
    document.getElementById("heightFt").value = 5;
    document.getElementById("heightIn").value = 9;
    document.getElementById("weightLb").value = 165;
    document.getElementById("heightCm").value = 175;
    document.getElementById("weightKg").value = 75;
    calc();
  });
  ["age","gender","heightFt","heightIn","weightLb","heightCm","weightKg"].forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
  });
  calc();
})();`
  },

  // 2. Calorie & TDEE Calculator
  {
    file: "calorie-calculator.html",
    title: "Calorie & TDEE Calculator - Daily Weight Loss & Maintenance | EMI Master",
    description: "Free daily calorie and TDEE calculator using Mifflin-St Jeor formula. Find maintenance calories, weight loss deficit targets, and protein/carb/fat macros.",
    keywords: "calorie calculator, tdee calculator, maintenance calories, weight loss calorie calculator, macro calculator",
    schemaCategory: "HealthApplication",
    catName: "Fitness & Health",
    catAnchor: "sitemap.html#fitness",
    h1: "Calorie & TDEE Calculator",
    subtitle: "Estimate daily calories burned (TDEE) and exact intake targets for weight maintenance, fat loss, or lean muscle gain.",
    calculatorHtml: `
    <div class="unit-tabs" id="unitTabs">
      <button type="button" class="unit-tab active" data-unit="us">US Units</button>
      <button type="button" class="unit-tab" data-unit="metric">Metric</button>
    </div>

    <div class="card">
      <h2>Personal Metrics &amp; Activity</h2>
      <div class="form-grid">
        <div class="form-group">
          <label for="age">Age</label>
          <input type="number" id="age" value="28" min="15" max="95" step="1">
        </div>
        <div class="form-group">
          <label for="gender">Gender</label>
          <select id="gender"><option value="male" selected>Male</option><option value="female">Female</option></select>
        </div>
        <div class="form-group us-only">
          <label>Height (ft / in)</label>
          <div class="form-duo">
            <div class="input-wrap"><span class="suffix">ft</span><input type="number" id="heightFt" value="5" min="3" max="8" step="1"></div>
            <div class="input-wrap"><span class="suffix">in</span><input type="number" id="heightIn" value="10" min="0" max="11" step="0.5"></div>
          </div>
        </div>
        <div class="form-group us-only">
          <label for="weightLb">Weight (lbs)</label>
          <div class="input-wrap"><span class="suffix">lbs</span><input type="number" id="weightLb" value="175" min="60" max="700" step="1"></div>
        </div>
        <div class="form-group metric-only" style="display:none;">
          <label for="heightCm">Height (cm)</label>
          <div class="input-wrap"><span class="suffix">cm</span><input type="number" id="heightCm" value="178" min="100" max="250" step="1"></div>
        </div>
        <div class="form-group metric-only" style="display:none;">
          <label for="weightKg">Weight (kg)</label>
          <div class="input-wrap"><span class="suffix">kg</span><input type="number" id="weightKg" value="79" min="30" max="320" step="0.5"></div>
        </div>
        <div class="form-group" style="grid-column: 1 / -1;">
          <label for="activity">Activity Level</label>
          <select id="activity">
            <option value="1.2">Sedentary (little or no exercise, desk job)</option>
            <option value="1.375">Lightly Active (light exercise 1–3 days/week)</option>
            <option value="1.55" selected>Moderately Active (moderate exercise 3–5 days/week)</option>
            <option value="1.725">Very Active (hard exercise 6–7 days/week)</option>
            <option value="1.9">Extra Active (physical job + daily intense training)</option>
          </select>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Calories</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>

    <div class="result-panel" id="resultPanel">
      <h3>Maintenance Calories (TDEE)</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Basal Metabolic Rate (BMR)</div><div class="value" id="bmrOut">—</div></div>
        <div class="result-item"><div class="label">Mild Loss (-0.25 kg/wk)</div><div class="value positive" id="mildLossOut">—</div></div>
        <div class="result-item"><div class="label">Standard Loss (-0.5 kg/wk)</div><div class="value positive" id="lossOut">—</div></div>
      </div>
      <div class="macro-bar" id="macroBar">
        <div style="width:30%;background:#1e40af;"></div>
        <div style="width:40%;background:#059669;"></div>
        <div style="width:30%;background:#d97706;"></div>
      </div>
      <div class="macro-legend" id="macroLegend"></div>
    </div>

    <div class="card">
      <h2>Daily Calorie Targets by Goal</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Weight Goal</th><th class="num">Daily Calories</th><th class="num">% of TDEE</th><th>Weekly Pace</th></tr></thead>
          <tbody id="goalTableBody"></tbody>
        </table>
      </div>
    </div>`,
    facts: [
      { k: "Core Equation", v: "Mifflin-St Jeor (1990)" },
      { k: "1 lb / 0.45 kg Fat", v: "~3,500 kcal energy" },
      { k: "Safe Deficit", v: "300 – 500 kcal/day below TDEE" },
      { k: "Balanced Macros", v: "30% Protein / 40% Carbs / 30% Fat" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Understanding BMR vs. TDEE</h2>
      <p>Your <strong>Basal Metabolic Rate (BMR)</strong> is the energy your body burns purely to stay alive at complete rest. Your <strong>Total Daily Energy Expenditure (TDEE)</strong> multiplies BMR by your daily movement and exercise factor. Eating at TDEE maintains weight; eating 500 kcal below TDEE yields roughly 1 lb (0.45 kg) of fat loss per week.</p>
      <p>Learn how to set sustainable targets in our <a href="blog-calorie-deficit-macro-guide.html">Complete Calorie Deficit, BMR &amp; Macro Guide</a>.</p>
    </div>`,
    faqs: [
      { q: "How accurate is the Mifflin-St Jeor calorie formula?", a: "Clinical nutrition studies consistently rank Mifflin-St Jeor as the most accurate standard equation for predicting resting calorie burn within +/- 10% for most non-athlete adults." },
      { q: "What is the minimum safe daily calorie intake?", a: "Most medical guidelines advise not dropping below 1,200 kcal/day for women or 1,500 kcal/day for men without direct physician supervision, as steeper deficits risk muscle loss and nutrient deficiency." },
      { q: "How many calories equal one pound of body weight?", a: "Roughly 3,500 calories equals one pound (0.454 kg) of fat tissue. A 500-calorie daily deficit creates a 3,500-calorie weekly deficit, targeting about 1 pound per week." }
    ],
    related: [
      { href: "bmr-calculator.html", label: "BMR Calculator", icon: "⚡" },
      { href: "bmi-calculator.html", label: "BMI Calculator", icon: "⚖️" },
      { href: "body-fat-calculator.html", label: "Body Fat Calculator", icon: "📏" },
      { href: "water-intake-calculator.html", label: "Water Intake Calculator", icon: "💧" },
      { href: "blog-calorie-deficit-macro-guide.html", label: "Guide: TDEE & Macros", icon: "📘" }
    ],
    script: `
(function(){
  var unit = "us";
  document.querySelectorAll("#unitTabs .unit-tab").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll("#unitTabs .unit-tab").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      unit = btn.getAttribute("data-unit");
      document.querySelectorAll(".us-only").forEach(function(el){ el.style.display = unit === "us" ? "" : "none"; });
      document.querySelectorAll(".metric-only").forEach(function(el){ el.style.display = unit === "metric" ? "" : "none"; });
      calc();
    });
  });

  function calc() {
    var age = parseFloat(document.getElementById("age").value) || 28;
    var gender = document.getElementById("gender").value;
    var act = parseFloat(document.getElementById("activity").value) || 1.55;
    var cm = 0, kg = 0;
    if (unit === "us") {
      var ft = parseFloat(document.getElementById("heightFt").value) || 0;
      var inc = parseFloat(document.getElementById("heightIn").value) || 0;
      var lb = parseFloat(document.getElementById("weightLb").value) || 0;
      cm = (ft * 12 + inc) * 2.54;
      kg = lb * 0.45359237;
    } else {
      cm = parseFloat(document.getElementById("heightCm").value) || 0;
      kg = parseFloat(document.getElementById("weightKg").value) || 0;
    }
    if (cm <= 0 || kg <= 0) return;

    var bmr = 10 * kg + 6.25 * cm - 5 * age + (gender === "male" ? 5 : -161);
    var tdee = bmr * act;
    var mildLoss = Math.max(1200, tdee - 250);
    var stdLoss = Math.max(1200, tdee - 500);
    var fastLoss = Math.max(1200, tdee - 750);
    var leanGain = tdee + 300;
    var bulkGain = tdee + 500;

    document.getElementById("resultMain").textContent = Math.round(tdee).toLocaleString("en-US") + " kcal / day";
    document.getElementById("bmrOut").textContent = Math.round(bmr).toLocaleString("en-US") + " kcal";
    document.getElementById("mildLossOut").textContent = Math.round(mildLoss).toLocaleString("en-US") + " kcal";
    document.getElementById("lossOut").textContent = Math.round(stdLoss).toLocaleString("en-US") + " kcal";

    var pG = Math.round((tdee * 0.30) / 4);
    var cG = Math.round((tdee * 0.40) / 4);
    var fG = Math.round((tdee * 0.30) / 9);
    document.getElementById("macroLegend").innerHTML =
      "<span><strong>Protein (30%):</strong> " + pG + "g</span>" +
      "<span><strong>Carbs (40%):</strong> " + cG + "g</span>" +
      "<span><strong>Fat (30%):</strong> " + fG + "g</span>";

    var rows = [
      ["Maintain Weight", tdee, "100%", "0 lbs / week"],
      ["Mild Weight Loss", mildLoss, ((mildLoss / tdee) * 100).toFixed(0) + "%", "-0.5 lb (-0.25 kg) / wk"],
      ["Standard Fat Loss", stdLoss, ((stdLoss / tdee) * 100).toFixed(0) + "%", "-1 lb (-0.45 kg) / wk"],
      ["Aggressive Fat Loss", fastLoss, ((fastLoss / tdee) * 100).toFixed(0) + "%", "-1.5 lbs (-0.7 kg) / wk"],
      ["Lean Muscle Gain", leanGain, ((leanGain / tdee) * 100).toFixed(0) + "%", "+0.6 lb (+0.27 kg) / wk"],
      ["Weight Gain", bulkGain, ((bulkGain / tdee) * 100).toFixed(0) + "%", "+1 lb (+0.45 kg) / wk"]
    ];
    document.getElementById("goalTableBody").innerHTML = rows.map(function(r){
      return "<tr><td>" + r[0] + "</td><td class='num'>" + Math.round(r[1]).toLocaleString("en-US") + " kcal</td><td class='num'>" + r[2] + "</td><td>" + r[3] + "</td></tr>";
    }).join("");
  }

  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("age").value = 28;
    document.getElementById("heightFt").value = 5;
    document.getElementById("heightIn").value = 10;
    document.getElementById("weightLb").value = 175;
    document.getElementById("heightCm").value = 178;
    document.getElementById("weightKg").value = 79;
    document.getElementById("activity").value = "1.55";
    calc();
  });
  ["age","gender","heightFt","heightIn","weightLb","heightCm","weightKg","activity"].forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
  });
  calc();
})();`
  },

  // 3. BMR Calculator
  {
    file: "bmr-calculator.html",
    title: "BMR Calculator - Basal Metabolic Rate & Activity Burn | EMI Master",
    description: "Calculate your Basal Metabolic Rate (BMR) using Mifflin-St Jeor, Harris-Benedict, and Katch-McArdle equations plus daily calorie burn across activity levels.",
    keywords: "bmr calculator, basal metabolic rate, resting metabolic rate, mifflin st jeor, harris benedict",
    schemaCategory: "HealthApplication",
    catName: "Fitness & Health",
    catAnchor: "sitemap.html#fitness",
    h1: "BMR Calculator",
    subtitle: "Find out how many calories your body burns at complete rest and across five daily activity profiles.",
    calculatorHtml: `
    <div class="unit-tabs" id="unitTabs">
      <button type="button" class="unit-tab active" data-unit="metric">Metric (cm, kg)</button>
      <button type="button" class="unit-tab" data-unit="us">US Units (ft, in, lbs)</button>
    </div>

    <div class="card">
      <h2>Body Details</h2>
      <div class="form-grid">
        <div class="form-group"><label for="age">Age</label><input type="number" id="age" value="30" min="15" max="95"></div>
        <div class="form-group"><label for="gender">Gender</label><select id="gender"><option value="male" selected>Male</option><option value="female">Female</option></select></div>
        <div class="form-group metric-only"><label for="heightCm">Height (cm)</label><input type="number" id="heightCm" value="175" min="100" max="250"></div>
        <div class="form-group metric-only"><label for="weightKg">Weight (kg)</label><input type="number" id="weightKg" value="72" min="30" max="300" step="0.5"></div>
        <div class="form-group us-only" style="display:none;"><label>Height (ft / in)</label><div class="form-duo"><input type="number" id="heightFt" value="5" min="3" max="8"><input type="number" id="heightIn" value="9" min="0" max="11"></div></div>
        <div class="form-group us-only" style="display:none;"><label for="weightLb">Weight (lbs)</label><input type="number" id="weightLb" value="159" min="60" max="650"></div>
        <div class="form-group"><label for="bodyFat">Body Fat % (optional for Katch-McArdle)</label><input type="number" id="bodyFat" value="18" min="3" max="60" step="0.5"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate BMR</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>

    <div class="result-panel" id="resultPanel">
      <h3>Basal Metabolic Rate (Mifflin-St Jeor)</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Revised Harris-Benedict</div><div class="value" id="hbOut">—</div></div>
        <div class="result-item"><div class="label">Katch-McArdle (Lean Mass)</div><div class="value" id="kmOut">—</div></div>
        <div class="result-item"><div class="label">Hourly Resting Burn</div><div class="value" id="hrOut">—</div></div>
      </div>
    </div>

    <div class="card">
      <h2>Daily Calorie Needs by Activity Level</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Activity Level</th><th class="num">Multiplier</th><th class="num">Daily Calories</th></tr></thead>
          <tbody id="actBody"></tbody>
        </table>
      </div>
    </div>`,
    facts: [
      { k: "Mifflin-St Jeor (Men)", v: "10W + 6.25H - 5A + 5" },
      { k: "Mifflin-St Jeor (Women)", v: "10W + 6.25H - 5A - 161" },
      { k: "Share of Daily Burn", v: "~60% – 75% of total TDEE" },
      { k: "Lean Mass Driver", v: "Katch-McArdle = 370 + 21.6 x LBM" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>What Is Basal Metabolic Rate?</h2>
      <p>Your Basal Metabolic Rate (BMR) represents the baseline calories your organs, brain, heart, and muscles require over 24 hours purely to sustain breathing, circulation, and cellular repair. Even if you stayed in bed all day, your body would burn roughly your BMR.</p>
      <p>Next, use the <a href="calorie-calculator.html">Calorie &amp; TDEE Calculator</a> to translate your BMR into fat-loss or muscle-building meal plans.</p>
    </div>`,
    faqs: [
      { q: "Which BMR equation should I use?", a: "Use Mifflin-St Jeor for general adults, and use Katch-McArdle if you already know your body fat percentage accurately and carry above-average muscle mass." },
      { q: "Should I eat below my BMR to lose weight?", a: "Most coaches recommend eating below TDEE rather than drastically below BMR. Going far beneath BMR for extended periods increases fatigue and lean muscle loss." }
    ],
    related: [
      { href: "calorie-calculator.html", label: "Calorie & TDEE Calculator", icon: "🔥" },
      { href: "body-fat-calculator.html", label: "Body Fat Calculator", icon: "📏" },
      { href: "bmi-calculator.html", label: "BMI Calculator", icon: "⚖️" },
      { href: "ideal-weight-calculator.html", label: "Ideal Weight Calculator", icon: "🎯" }
    ],
    script: `
(function(){
  var unit = "metric";
  document.querySelectorAll("#unitTabs .unit-tab").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll("#unitTabs .unit-tab").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      unit = btn.getAttribute("data-unit");
      document.querySelectorAll(".us-only").forEach(function(el){ el.style.display = unit === "us" ? "" : "none"; });
      document.querySelectorAll(".metric-only").forEach(function(el){ el.style.display = unit === "metric" ? "" : "none"; });
      calc();
    });
  });

  function calc() {
    var age = parseFloat(document.getElementById("age").value) || 30;
    var gender = document.getElementById("gender").value;
    var bf = parseFloat(document.getElementById("bodyFat").value);
    var cm = 0, kg = 0;
    if (unit === "metric") {
      cm = parseFloat(document.getElementById("heightCm").value) || 0;
      kg = parseFloat(document.getElementById("weightKg").value) || 0;
    } else {
      cm = ((parseFloat(document.getElementById("heightFt").value)||0)*12 + (parseFloat(document.getElementById("heightIn").value)||0)) * 2.54;
      kg = (parseFloat(document.getElementById("weightLb").value)||0) * 0.45359237;
    }
    if (cm <= 0 || kg <= 0) return;
    var mifflin = 10 * kg + 6.25 * cm - 5 * age + (gender === "male" ? 5 : -161);
    var hb = gender === "male"
      ? 13.397 * kg + 4.799 * cm - 5.677 * age + 88.362
      : 9.247 * kg + 3.098 * cm - 4.330 * age + 447.593;
    var lbm = (isFinite(bf) && bf > 0 && bf < 70) ? kg * (1 - bf / 100) : kg * 0.8;
    var km = 370 + 21.6 * lbm;

    document.getElementById("resultMain").textContent = Math.round(mifflin).toLocaleString("en-US") + " kcal / day";
    document.getElementById("hbOut").textContent = Math.round(hb).toLocaleString("en-US") + " kcal";
    document.getElementById("kmOut").textContent = Math.round(km).toLocaleString("en-US") + " kcal";
    document.getElementById("hrOut").textContent = (mifflin / 24).toFixed(1) + " kcal/hr";

    var levels = [
      ["Sedentary (little or no exercise)", 1.2],
      ["Lightly active (1–3 days/week)", 1.375],
      ["Moderately active (3–5 days/week)", 1.55],
      ["Very active (6–7 days/week)", 1.725],
      ["Extra active (heavy physical labor/athlete)", 1.9]
    ];
    document.getElementById("actBody").innerHTML = levels.map(function(l){
      return "<tr><td>" + l[0] + "</td><td class='num'>" + l[1] + "x</td><td class='num'><strong>" + Math.round(mifflin * l[1]).toLocaleString("en-US") + " kcal</strong></td></tr>";
    }).join("");
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("age").value = 30;
    document.getElementById("heightCm").value = 175;
    document.getElementById("weightKg").value = 72;
    document.getElementById("bodyFat").value = 18;
    calc();
  });
  ["age","gender","heightCm","weightKg","heightFt","heightIn","weightLb","bodyFat"].forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
  });
  calc();
})();`
  },

  // 4. Body Fat Calculator
  {
    file: "body-fat-calculator.html",
    title: "Body Fat Calculator - U.S. Navy Method & Lean Body Mass | EMI Master",
    description: "Free body fat percentage calculator using the U.S. Navy circumference formula and BMI method. Find your fat mass, lean body mass, and ACE fitness category.",
    keywords: "body fat calculator, navy body fat calculator, lean body mass calculator, body fat percentage",
    schemaCategory: "HealthApplication",
    catName: "Fitness & Health",
    catAnchor: "sitemap.html#fitness",
    h1: "Body Fat Calculator",
    subtitle: "Estimate body fat percentage, fat mass, and lean muscle mass with the U.S. Navy tape-measure method.",
    calculatorHtml: `
    <div class="unit-tabs" id="unitTabs">
      <button type="button" class="unit-tab active" data-unit="us">US Units (in, lbs)</button>
      <button type="button" class="unit-tab" data-unit="metric">Metric (cm, kg)</button>
    </div>

    <div class="card">
      <h2>Circumference Measurements</h2>
      <div class="form-grid">
        <div class="form-group"><label for="gender">Gender</label><select id="gender"><option value="male" selected>Male</option><option value="female">Female</option></select></div>
        <div class="form-group"><label for="age">Age</label><input type="number" id="age" value="28" min="15" max="90"></div>
        <div class="form-group us-only"><label for="heightIn">Height (inches)</label><input type="number" id="heightIn" value="70" min="36" max="96" step="0.5"></div>
        <div class="form-group us-only"><label for="weightLb">Weight (lbs)</label><input type="number" id="weightLb" value="175" min="60" max="600" step="0.5"></div>
        <div class="form-group us-only"><label for="neckIn">Neck (inches)</label><input type="number" id="neckIn" value="15.5" min="8" max="30" step="0.1"></div>
        <div class="form-group us-only"><label for="waistIn">Waist at navel (inches)</label><input type="number" id="waistIn" value="33" min="18" max="80" step="0.1"></div>
        <div class="form-group us-only female-only" style="display:none;"><label for="hipIn">Hip widest point (inches)</label><input type="number" id="hipIn" value="38" min="20" max="80" step="0.1"></div>

        <div class="form-group metric-only" style="display:none;"><label for="heightCm">Height (cm)</label><input type="number" id="heightCm" value="178" min="90" max="245" step="0.5"></div>
        <div class="form-group metric-only" style="display:none;"><label for="weightKg">Weight (kg)</label><input type="number" id="weightKg" value="79" min="25" max="300" step="0.5"></div>
        <div class="form-group metric-only" style="display:none;"><label for="neckCm">Neck (cm)</label><input type="number" id="neckCm" value="39" min="20" max="75" step="0.5"></div>
        <div class="form-group metric-only" style="display:none;"><label for="waistCm">Waist (cm)</label><input type="number" id="waistCm" value="84" min="45" max="200" step="0.5"></div>
        <div class="form-group metric-only female-only" style="display:none;"><label for="hipCm">Hip (cm)</label><input type="number" id="hipCm" value="96" min="50" max="200" step="0.5"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Body Fat</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>

    <div class="result-panel" id="resultPanel">
      <h3>Estimated Body Fat (U.S. Navy Method)</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">ACE Category</div><div class="value" id="catOut">—</div></div>
        <div class="result-item"><div class="label">Body Fat Mass</div><div class="value negative" id="fatMassOut">—</div></div>
        <div class="result-item"><div class="label">Lean Body Mass</div><div class="value positive" id="leanMassOut">—</div></div>
      </div>
      <div class="payoff-note" id="bfNote"></div>
    </div>`,
    facts: [
      { k: "Method", v: "Hodgdon-Beckett U.S. Navy Equation" },
      { k: "Essential Fat", v: "2–5% (Men) / 10–13% (Women)" },
      { k: "Athletic Range", v: "6–13% (Men) / 14–20% (Women)" },
      { k: "Fitness Range", v: "14–17% (Men) / 21–24% (Women)" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>How the U.S. Navy Body Fat Formula Works</h2>
      <p>Unlike standard scale weight or <a href="bmi-calculator.html">BMI</a>, the U.S. Navy circumference formula isolates abdominal girth relative to neck circumference and height (plus hips for women). Because visceral and subcutaneous trunk fat expand the waist much faster than neck tissue, a single tape measure estimates body fat within roughly 3%–4% of DEXA scans.</p>
      <p>See our <a href="blog-bmi-vs-body-fat-guide.html">BMI vs. Body Fat Guide</a> for practical measurement tips.</p>
    </div>`,
    faqs: [
      { q: "Where should I measure my waist for the Navy formula?", a: "Men should measure horizontally right across the belly button (navel). Women should measure at the narrowest natural waist point, plus the widest point around the hips and glutes." },
      { q: "What is lean body mass?", a: "Lean body mass equals total body weight minus fat weight—including skeletal muscle, bones, organs, and water." }
    ],
    related: [
      { href: "bmi-calculator.html", label: "BMI Calculator", icon: "⚖️" },
      { href: "calorie-calculator.html", label: "Calorie & TDEE Calculator", icon: "🔥" },
      { href: "bmr-calculator.html", label: "BMR Calculator", icon: "⚡" },
      { href: "blog-bmi-vs-body-fat-guide.html", label: "Guide: BMI vs Body Fat", icon: "📘" }
    ],
    script: `
(function(){
  var unit = "us";
  function syncVisibility() {
    var g = document.getElementById("gender").value;
    document.querySelectorAll(".us-only").forEach(function(el){
      var isFem = el.classList.contains("female-only");
      el.style.display = (unit === "us" && (!isFem || g === "female")) ? "" : "none";
    });
    document.querySelectorAll(".metric-only").forEach(function(el){
      var isFem = el.classList.contains("female-only");
      el.style.display = (unit === "metric" && (!isFem || g === "female")) ? "" : "none";
    });
  }
  document.querySelectorAll("#unitTabs .unit-tab").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll("#unitTabs .unit-tab").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      unit = btn.getAttribute("data-unit");
      syncVisibility();
      calc();
    });
  });
  function calc() {
    syncVisibility();
    var g = document.getElementById("gender").value;
    var age = parseFloat(document.getElementById("age").value) || 28;
    var hCm, wKg, neckCm, waistCm, hipCm;
    if (unit === "us") {
      hCm = (parseFloat(document.getElementById("heightIn").value) || 0) * 2.54;
      wKg = (parseFloat(document.getElementById("weightLb").value) || 0) * 0.45359237;
      neckCm = (parseFloat(document.getElementById("neckIn").value) || 0) * 2.54;
      waistCm = (parseFloat(document.getElementById("waistIn").value) || 0) * 2.54;
      hipCm = (parseFloat(document.getElementById("hipIn").value) || 0) * 2.54;
    } else {
      hCm = parseFloat(document.getElementById("heightCm").value) || 0;
      wKg = parseFloat(document.getElementById("weightKg").value) || 0;
      neckCm = parseFloat(document.getElementById("neckCm").value) || 0;
      waistCm = parseFloat(document.getElementById("waistCm").value) || 0;
      hipCm = parseFloat(document.getElementById("hipCm").value) || 0;
    }
    if (hCm <= 0 || wKg <= 0 || neckCm <= 0 || waistCm <= neckCm) return;
    var bf;
    if (g === "male") {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(waistCm - neckCm) + 0.15456 * Math.log10(hCm)) - 450;
    } else {
      if (waistCm + hipCm <= neckCm) return;
      bf = 495 / (1.29579 - 0.35004 * Math.log10(waistCm + hipCm - neckCm) + 0.22100 * Math.log10(hCm)) - 450;
    }
    bf = Math.max(2, Math.min(60, bf));
    var fatKg = wKg * (bf / 100);
    var leanKg = wKg - fatKg;
    var cat = "Fitness";
    if (g === "male") {
      if (bf < 6) cat = "Essential Fat";
      else if (bf < 14) cat = "Athletes";
      else if (bf < 18) cat = "Fitness";
      else if (bf < 25) cat = "Average";
      else cat = "Obese";
    } else {
      if (bf < 14) cat = "Essential Fat";
      else if (bf < 21) cat = "Athletes";
      else if (bf < 25) cat = "Fitness";
      else if (bf < 32) cat = "Average";
      else cat = "Obese";
    }
    var bmi = wKg / Math.pow(hCm / 100, 2);
    var bmiBf = 1.2 * bmi + 0.23 * age - (g === "male" ? 16.2 : 5.4);
    var suffix = unit === "us" ? " lbs" : " kg";
    var conv = unit === "us" ? 2.20462 : 1;

    document.getElementById("resultMain").textContent = bf.toFixed(1) + "% (" + cat + ")";
    document.getElementById("catOut").textContent = cat;
    document.getElementById("fatMassOut").textContent = (fatKg * conv).toFixed(1) + suffix;
    document.getElementById("leanMassOut").textContent = (leanKg * conv).toFixed(1) + suffix;
    document.getElementById("bfNote").textContent = "BMI-based Deurenberg estimate: " + bmiBf.toFixed(1) + "% body fat.";
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("heightIn").value = 70;
    document.getElementById("weightLb").value = 175;
    document.getElementById("neckIn").value = 15.5;
    document.getElementById("waistIn").value = 33;
    document.getElementById("hipIn").value = 38;
    calc();
  });
  ["gender","age","heightIn","weightLb","neckIn","waistIn","hipIn","heightCm","weightKg","neckCm","waistCm","hipCm"].forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
  });
  calc();
})();`
  },

  // 5. Ideal Weight Calculator
  {
    file: "ideal-weight-calculator.html",
    title: "Ideal Weight Calculator - Devine, Robinson, Miller & Hamwi | EMI Master",
    description: "Calculate your ideal body weight (IBW) across four medical formulas (Devine, Robinson, Miller, Hamwi) and the WHO healthy BMI weight band.",
    keywords: "ideal weight calculator, ideal body weight, devine formula, robinson formula, healthy weight by height",
    schemaCategory: "HealthApplication",
    catName: "Fitness & Health",
    catAnchor: "sitemap.html#fitness",
    h1: "Ideal Weight Calculator",
    subtitle: "Compare ideal weight estimates across Devine, Robinson, Miller, and Hamwi clinical formulas plus the healthy BMI weight range.",
    calculatorHtml: `
    <div class="unit-tabs" id="unitTabs">
      <button type="button" class="unit-tab active" data-unit="us">US Units (ft, in)</button>
      <button type="button" class="unit-tab" data-unit="metric">Metric (cm)</button>
    </div>
    <div class="card">
      <h2>Height &amp; Gender</h2>
      <div class="form-grid">
        <div class="form-group"><label for="gender">Gender</label><select id="gender"><option value="male" selected>Male</option><option value="female">Female</option></select></div>
        <div class="form-group us-only"><label>Height (ft / in)</label><div class="form-duo"><input type="number" id="heightFt" value="5" min="4" max="8"><input type="number" id="heightIn" value="10" min="0" max="11"></div></div>
        <div class="form-group metric-only" style="display:none;"><label for="heightCm">Height (cm)</label><input type="number" id="heightCm" value="178" min="120" max="240"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Ideal Weight</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Healthy BMI Weight Range</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Devine (1974)</div><div class="value" id="devOut">—</div></div>
        <div class="result-item"><div class="label">Robinson (1983)</div><div class="value" id="robOut">—</div></div>
        <div class="result-item"><div class="label">Miller / Hamwi</div><div class="value" id="milOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Base Benchmark", v: "5 feet (60 inches) baseline" },
      { k: "Devine (Male)", v: "50 kg + 2.3 kg per inch over 5 ft" },
      { k: "Devine (Female)", v: "45.5 kg + 2.3 kg per inch over 5 ft" },
      { k: "BMI Range", v: "18.5 – 24.9 kg/m^2" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Comparing Clinical Ideal Weight Formulas</h2>
      <p>The Devine formula remains the standard baseline used in hospitals for medical dosing, while Robinson and Miller adjusted coefficients to reflect modern healthy body frames. Rather than aiming for one exact pound or kilogram, most nutritionists recommend targeting a comfortable weight inside the <strong>WHO healthy BMI range</strong>.</p>
    </div>`,
    faqs: [
      { q: "Why do Devine, Robinson, Miller, and Hamwi give slightly different weights?", a: "Each formula was calibrated on different clinical datasets between 1964 and 1983. Viewing all four together gives a realistic target band rather than a rigid single figure." },
      { q: "Does ideal weight account for muscle frame?", a: "Standard IBW formulas only take height and sex as inputs. Athletes with higher lean mass naturally sit near or above the upper end of the range." }
    ],
    related: [
      { href: "bmi-calculator.html", label: "BMI Calculator", icon: "⚖️" },
      { href: "body-fat-calculator.html", label: "Body Fat Calculator", icon: "📏" },
      { href: "calorie-calculator.html", label: "Calorie & TDEE Calculator", icon: "🔥" }
    ],
    script: `
(function(){
  var unit = "us";
  document.querySelectorAll("#unitTabs .unit-tab").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll("#unitTabs .unit-tab").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      unit = btn.getAttribute("data-unit");
      document.querySelectorAll(".us-only").forEach(function(el){ el.style.display = unit === "us" ? "" : "none"; });
      document.querySelectorAll(".metric-only").forEach(function(el){ el.style.display = unit === "metric" ? "" : "none"; });
      calc();
    });
  });
  function fmt(kg) {
    return unit === "us" ? (kg * 2.20462).toFixed(1) + " lbs" : kg.toFixed(1) + " kg";
  }
  function calc() {
    var g = document.getElementById("gender").value;
    var totalIn = unit === "us"
      ? ((parseFloat(document.getElementById("heightFt").value)||0)*12 + (parseFloat(document.getElementById("heightIn").value)||0))
      : (parseFloat(document.getElementById("heightCm").value)||0) / 2.54;
    if (totalIn <= 0) return;
    var over5 = Math.max(0, totalIn - 60);
    var hM = totalIn * 0.0254;
    var dev = g === "male" ? 50 + 2.3 * over5 : 45.5 + 2.3 * over5;
    var rob = g === "male" ? 52 + 1.9 * over5 : 49 + 1.7 * over5;
    var mil = g === "male" ? 56.2 + 1.41 * over5 : 53.1 + 1.36 * over5;
    var ham = g === "male" ? 48 + 2.7 * over5 : 45.5 + 2.2 * over5;
    var minBmi = 18.5 * hM * hM;
    var maxBmi = 24.9 * hM * hM;
    document.getElementById("resultMain").textContent = fmt(minBmi) + " – " + fmt(maxBmi);
    document.getElementById("devOut").textContent = fmt(dev);
    document.getElementById("robOut").textContent = fmt(rob);
    document.getElementById("milOut").textContent = fmt(mil) + " / " + fmt(ham);
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("heightFt").value = 5;
    document.getElementById("heightIn").value = 10;
    document.getElementById("heightCm").value = 178;
    calc();
  });
  ["gender","heightFt","heightIn","heightCm"].forEach(function(id){
    var el = document.getElementById(id);
    if (el) { el.addEventListener("input", calc); el.addEventListener("change", calc); }
  });
  calc();
})();`
  },

  // 6. Running Pace Calculator
  {
    file: "pace-calculator.html",
    title: "Running Pace Calculator - Pace, Speed, Time & Race Splits | EMI Master",
    description: "Calculate running pace per km or mile, finish time, or total distance with automatic 5K, 10K, Half Marathon, and Marathon split predictions.",
    keywords: "pace calculator, running pace calculator, marathon pace, min per km, min per mile",
    schemaCategory: "HealthApplication",
    catName: "Fitness & Health",
    catAnchor: "sitemap.html#fitness",
    h1: "Running Pace Calculator",
    subtitle: "Calculate your pace per mile or kilometer, speed, and projected finish times across 5K, 10K, Half Marathon, and Marathon distances.",
    calculatorHtml: `
    <div class="card">
      <h2>Run Inputs</h2>
      <div class="form-grid">
        <div class="form-group">
          <label for="dist">Distance</label>
          <div class="form-duo">
            <input type="number" id="dist" value="10" min="0.1" step="0.1">
            <select id="distUnit">
              <option value="km" selected>Kilometers (km)</option>
              <option value="mi">Miles (mi)</option>
              <option value="m">Meters (m)</option>
            </select>
          </div>
        </div>
        <div class="form-group">
          <label>Quick Race Preset</label>
          <select id="racePreset">
            <option value="">Custom Distance</option>
            <option value="5">5K (5 km)</option>
            <option value="10" selected>10K (10 km)</option>
            <option value="21.0975">Half Marathon (21.1 km)</option>
            <option value="42.195">Marathon (42.2 km)</option>
          </select>
        </div>
        <div class="form-group" style="grid-column: 1 / -1;">
          <label>Finish Time (Hours : Minutes : Seconds)</label>
          <div class="form-grid" style="grid-template-columns: repeat(3, 1fr);">
            <div class="input-wrap"><span class="suffix">hr</span><input type="number" id="tHr" value="0" min="0" max="100"></div>
            <div class="input-wrap"><span class="suffix">min</span><input type="number" id="tMin" value="50" min="0" max="59"></div>
            <div class="input-wrap"><span class="suffix">sec</span><input type="number" id="tSec" value="0" min="0" max="59"></div>
          </div>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Pace</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>

    <div class="result-panel" id="resultPanel">
      <h3>Average Pace</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Pace per Mile</div><div class="value" id="paceMiOut">—</div></div>
        <div class="result-item"><div class="label">Speed (km/h &amp; mph)</div><div class="value" id="speedOut">—</div></div>
        <div class="result-item"><div class="label">Total Duration</div><div class="value" id="durOut">—</div></div>
      </div>
    </div>

    <div class="card">
      <h2>Equivalent Finish Times at This Pace</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Race Distance</th><th class="num">Distance (km)</th><th class="num">Projected Time</th></tr></thead>
          <tbody id="splitsBody"></tbody>
        </table>
      </div>
    </div>`,
    facts: [
      { k: "Pace Formula", v: "Total Time / Distance" },
      { k: "Half Marathon", v: "21.0975 km (13.1094 mi)" },
      { k: "Full Marathon", v: "42.195 km (26.2188 mi)" },
      { k: "Conversion", v: "1 mile = 1.60934 km" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>How to Use Pace Splits for Race Day</h2>
      <p>Consistent pacing prevents burning out in the first half of a race. Entering your target finish time for a 5K, 10K, or Marathon instantly gives you exact per-kilometer and per-mile split checkpoints so you can keep steady cadence on your GPS watch.</p>
    </div>`,
    faqs: [
      { q: "What is the difference between pace and speed?", a: "Pace measures time per unit distance (e.g. 5:00 min/km), while speed measures distance per unit time (e.g. 12.0 km/h)." },
      { q: "What is a good beginner 5K pace?", a: "Most first-time 5K runners finish between 30 and 38 minutes, corresponding to a comfortable pace of 6:00 to 7:35 minutes per kilometer." }
    ],
    related: [
      { href: "calorie-calculator.html", label: "Calorie & TDEE Calculator", icon: "🔥" },
      { href: "time-calculator.html", label: "Time Calculator", icon: "⏱️" },
      { href: "unit-converter.html", label: "Unit Converter", icon: "📐" }
    ],
    script: `
(function(){
  function fmtSec(sec) {
    sec = Math.max(0, Math.round(sec));
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    var mm = String(m).padStart(2, "0");
    var ss = String(s).padStart(2, "0");
    return h > 0 ? (h + ":" + mm + ":" + ss) : (m + ":" + ss);
  }
  document.getElementById("racePreset").addEventListener("change", function(){
    if (this.value) {
      document.getElementById("dist").value = this.value;
      document.getElementById("distUnit").value = "km";
      calc();
    }
  });
  function calc() {
    var d = parseFloat(document.getElementById("dist").value) || 0;
    var u = document.getElementById("distUnit").value;
    var km = u === "km" ? d : u === "mi" ? d * 1.609344 : d / 1000;
    var sec = (parseFloat(document.getElementById("tHr").value)||0)*3600 + (parseFloat(document.getElementById("tMin").value)||0)*60 + (parseFloat(document.getElementById("tSec").value)||0);
    if (km <= 0 || sec <= 0) return;
    var secPerKm = sec / km;
    var secPerMi = secPerKm * 1.609344;
    var kmh = km / (sec / 3600);
    var mph = kmh / 1.609344;

    document.getElementById("resultMain").textContent = fmtSec(secPerKm) + " / km";
    document.getElementById("paceMiOut").textContent = fmtSec(secPerMi) + " / mi";
    document.getElementById("speedOut").textContent = kmh.toFixed(2) + " km/h (" + mph.toFixed(2) + " mph)";
    document.getElementById("durOut").textContent = fmtSec(sec);

    var races = [
      ["1 Mile", 1.60934],
      ["5K", 5],
      ["10K", 10],
      ["10 Miles", 16.0934],
      ["Half Marathon", 21.0975],
      ["Marathon", 42.195]
    ];
    document.getElementById("splitsBody").innerHTML = races.map(function(r){
      return "<tr><td>" + r[0] + "</td><td class='num'>" + r[1].toFixed(2) + " km</td><td class='num'><strong>" + fmtSec(r[1] * secPerKm) + "</strong></td></tr>";
    }).join("");
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("dist").value = 10;
    document.getElementById("distUnit").value = "km";
    document.getElementById("tHr").value = 0;
    document.getElementById("tMin").value = 50;
    document.getElementById("tSec").value = 0;
    calc();
  });
  ["dist","distUnit","tHr","tMin","tSec"].forEach(function(id){
    document.getElementById(id).addEventListener("input", calc);
    document.getElementById(id).addEventListener("change", calc);
  });
  calc();
})();`
  },

  // 7. Pregnancy Due Date Calculator
  {
    file: "pregnancy-calculator.html",
    title: "Pregnancy Due Date Calculator - Gestational Age & Trimesters | EMI Master",
    description: "Free pregnancy due date calculator based on Last Menstrual Period (LMP), conception date, IVF transfer, or cycle length. View current week, trimester, and milestones.",
    keywords: "pregnancy calculator, due date calculator, gestational age calculator, ivf due date, pregnancy weeks",
    schemaCategory: "HealthApplication",
    catName: "Fitness & Health",
    catAnchor: "sitemap.html#fitness",
    h1: "Pregnancy Due Date Calculator",
    subtitle: "Estimate your expected delivery date, current gestational week, conception window, and key trimester milestones.",
    calculatorHtml: `
    <div class="card">
      <h2>Pregnancy Date Details</h2>
      <div class="form-grid">
        <div class="form-group">
          <label for="calcMethod">Calculation Method</label>
          <select id="calcMethod">
            <option value="lmp" selected>First Day of Last Period (LMP)</option>
            <option value="conception">Conception Date</option>
            <option value="ivf3">IVF 3-Day Embryo Transfer</option>
            <option value="ivf5">IVF 5-Day Blastocyst Transfer</option>
          </select>
        </div>
        <div class="form-group">
          <label for="refDate">Reference Date</label>
          <input type="date" id="refDate">
        </div>
        <div class="form-group" id="cycleGroup">
          <label for="cycleLen">Average Cycle Length (days)</label>
          <input type="number" id="cycleLen" value="28" min="20" max="45">
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Estimate Due Date</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>

    <div class="result-panel" id="resultPanel">
      <h3>Estimated Due Date</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Gestational Age</div><div class="value" id="weekOut">—</div></div>
        <div class="result-item"><div class="label">Current Trimester</div><div class="value" id="trimOut">—</div></div>
        <div class="result-item"><div class="label">Estimated Conception</div><div class="value" id="concOut">—</div></div>
      </div>
      <div class="payoff-note" id="pregNote"></div>
    </div>

    <div class="card">
      <h2>Trimester &amp; Milestone Timeline</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Milestone</th><th>Gestational Week</th><th class="num">Estimated Date</th></tr></thead>
          <tbody id="milestoneBody"></tbody>
        </table>
      </div>
    </div>`,
    facts: [
      { k: "Standard Gestation", v: "40 weeks (280 days) from LMP" },
      { k: "First Trimester", v: "Weeks 1 – 12" },
      { k: "Second Trimester", v: "Weeks 13 – 26" },
      { k: "Third Trimester", v: "Weeks 27 – 40" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>How Estimated Due Dates Are Calculated</h2>
      <p>Obstetricians calculate standard due dates by adding <strong>280 days (40 weeks)</strong> to the first day of your last menstrual period (adjusted if your cycle differs from 28 days). Only about 4% of babies arrive on the exact predicted day—most healthy full-term births occur between weeks 37 and 42.</p>
    </div>`,
    faqs: [
      { q: "How accurate is an LMP-based due date?", a: "It gives a reliable baseline within about 1–2 weeks if menstrual cycles are regular. A first-trimester dating ultrasound between weeks 8 and 13 provides the highest clinical precision." },
      { q: "How are IVF transfer dates calculated?", a: "For a 3-day transfer, gestational age begins 17 days prior to transfer (add 263 days for due date). For a 5-day blastocyst, add 261 days from transfer." }
    ],
    related: [
      { href: "date-calculator.html", label: "Date Calculator", icon: "📅" },
      { href: "age-calculator.html", label: "Age Calculator", icon: "🎂" },
      { href: "water-intake-calculator.html", label: "Water Intake Calculator", icon: "💧" }
    ],
    script: `
(function(){
  function setDefaultDate() {
    var d = new Date();
    d.setDate(d.getDate() - 70); // ~10 weeks ago default
    document.getElementById("refDate").value = d.toISOString().slice(0, 10);
  }
  function addDays(dateObj, days) {
    var copy = new Date(dateObj.getTime());
    copy.setDate(copy.getDate() + days);
    return copy;
  }
  function fmtDate(d) {
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }
  function calc() {
    var method = document.getElementById("calcMethod").value;
    document.getElementById("cycleGroup").style.display = method === "lmp" ? "" : "none";
    var raw = document.getElementById("refDate").value;
    if (!raw) return;
    var ref = new Date(raw + "T00:00:00");
    var cycle = parseInt(document.getElementById("cycleLen").value, 10) || 28;
    var lmp;
    if (method === "lmp") lmp = addDays(ref, cycle - 28);
    else if (method === "conception") lmp = addDays(ref, -14);
    else if (method === "ivf3") lmp = addDays(ref, -17);
    else lmp = addDays(ref, -19);

    var due = addDays(lmp, 280);
    var conc = addDays(lmp, 14);
    var today = new Date();
    today.setHours(0,0,0,0);
    var daysElapsed = Math.floor((today - lmp) / 86400000);
    var wk = Math.floor(daysElapsed / 7);
    var remD = daysElapsed % 7;
    var gaText = daysElapsed < 0 ? "Pre-conception" : (wk + " wks, " + remD + " days");
    var trim = wk < 13 ? "1st Trimester" : wk < 27 ? "2nd Trimester" : "3rd Trimester";
    var pct = Math.min(100, Math.max(0, Math.round((daysElapsed / 280) * 100)));

    document.getElementById("resultMain").textContent = fmtDate(due);
    document.getElementById("weekOut").textContent = gaText;
    document.getElementById("trimOut").textContent = trim;
    document.getElementById("concOut").textContent = fmtDate(conc);
    document.getElementById("pregNote").textContent = "Pregnancy progress: " + pct + "% of 40-week full term (" + Math.max(0, 280 - daysElapsed) + " days remaining).";

    var miles = [
      ["Conception / Ovulation", "Week 2", conc],
      ["First Heartbeat Visible (Ultrasound)", "Week 6", addDays(lmp, 42)],
      ["End of 1st Trimester", "Week 12", addDays(lmp, 84)],
      ["Anatomy Ultrasound Window", "Week 20", addDays(lmp, 140)],
      ["Start of 3rd Trimester", "Week 27", addDays(lmp, 189)],
      ["Early Term", "Week 37", addDays(lmp, 259)],
      ["Estimated Due Date (Full Term)", "Week 40", due]
    ];
    document.getElementById("milestoneBody").innerHTML = miles.map(function(m){
      return "<tr><td>" + m[0] + "</td><td>" + m[1] + "</td><td class='num'><strong>" + fmtDate(m[2]) + "</strong></td></tr>";
    }).join("");
  }
  setDefaultDate();
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("calcMethod").value = "lmp";
    document.getElementById("cycleLen").value = 28;
    setDefaultDate();
    calc();
  });
  ["calcMethod","refDate","cycleLen"].forEach(function(id){
    document.getElementById(id).addEventListener("input", calc);
    document.getElementById(id).addEventListener("change", calc);
  });
  calc();
})();`
  },

  // 8. Daily Water Intake Calculator
  {
    file: "water-intake-calculator.html",
    title: "Daily Water Intake Calculator - Hydration Goal (Liters & Oz) | EMI Master",
    description: "Calculate how much water you should drink per day based on body weight, daily workout minutes, and climate in liters, fluid ounces, and 250 ml glasses.",
    keywords: "water intake calculator, how much water should i drink, daily hydration calculator",
    schemaCategory: "HealthApplication",
    catName: "Fitness & Health",
    catAnchor: "sitemap.html#fitness",
    h1: "Daily Water Intake Calculator",
    subtitle: "Estimate personalized daily hydration needs in liters, fluid ounces, and glasses based on weight, exercise, and climate.",
    calculatorHtml: `
    <div class="card">
      <h2>Hydration Inputs</h2>
      <div class="form-grid">
        <div class="form-group">
          <label for="weight">Body Weight</label>
          <div class="form-duo">
            <input type="number" id="weight" value="70" min="15" max="350" step="0.5">
            <select id="wUnit"><option value="kg" selected>kg</option><option value="lb">lbs</option></select>
          </div>
        </div>
        <div class="form-group"><label for="exMin">Daily Exercise (minutes)</label><input type="number" id="exMin" value="45" min="0" max="480" step="5"></div>
        <div class="form-group"><label for="climate">Climate / Environment</label>
          <select id="climate">
            <option value="1.0" selected>Temperate / Indoor</option>
            <option value="1.12">Warm / Humid (+12%)</option>
            <option value="1.2">Hot / Dry / High Altitude (+20%)</option>
          </select>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Hydration</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Recommended Daily Water Intake</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Fluid Ounces</div><div class="value" id="ozOut">—</div></div>
        <div class="result-item"><div class="label">250 ml Glasses</div><div class="value" id="glassOut">—</div></div>
        <div class="result-item"><div class="label">500 ml Bottles</div><div class="value" id="bottleOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Baseline Rule", v: "~35 ml per kg body weight" },
      { k: "Exercise Add-On", v: "+350 ml per 30 min workout" },
      { k: "1 Liter", v: "33.814 US fl oz (four 250 ml cups)" },
      { k: "Food Hydration", v: "~20% comes from water-rich foods" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Personalized Hydration vs. the 8-Glass Myth</h2>
      <p>The popular "8 glasses a day" guideline ignores body size and sweat loss. A 55 kg office worker and a 95 kg athlete training outdoors require noticeably different fluid volumes. Scaling intake by roughly 35 ml per kilogram plus workout sweat replenishment keeps electrolytes and energy steady.</p>
    </div>`,
    faqs: [
      { q: "Does coffee or tea count toward daily water intake?", a: "Yes. Plain coffee, herbal tea, milk, and high-water fruits and vegetables all contribute toward total daily fluid balance." },
      { q: "How do I know if I am properly hydrated?", a: "Pale straw-colored urine and steady daytime energy are reliable practical indicators of adequate hydration." }
    ],
    related: [
      { href: "calorie-calculator.html", label: "Calorie & TDEE Calculator", icon: "🔥" },
      { href: "bmi-calculator.html", label: "BMI Calculator", icon: "⚖️" },
      { href: "pace-calculator.html", label: "Running Pace Calculator", icon: "🏃" }
    ],
    script: `
(function(){
  function calc() {
    var w = parseFloat(document.getElementById("weight").value) || 0;
    var u = document.getElementById("wUnit").value;
    var kg = u === "kg" ? w : w * 0.45359237;
    var ex = parseFloat(document.getElementById("exMin").value) || 0;
    var clim = parseFloat(document.getElementById("climate").value) || 1;
    if (kg <= 0) return;
    var baseMl = kg * 35;
    var exMl = (ex / 30) * 350;
    var totalMl = (baseMl + exMl) * clim;
    var liters = totalMl / 1000;
    var oz = liters * 33.814;
    document.getElementById("resultMain").textContent = liters.toFixed(2) + " Liters / day";
    document.getElementById("ozOut").textContent = Math.round(oz) + " fl oz";
    document.getElementById("glassOut").textContent = Math.ceil(totalMl / 250) + " glasses";
    document.getElementById("bottleOut").textContent = (totalMl / 500).toFixed(1) + " bottles";
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("weight").value = 70;
    document.getElementById("wUnit").value = "kg";
    document.getElementById("exMin").value = 45;
    document.getElementById("climate").value = "1.0";
    calc();
  });
  ["weight","wUnit","exMin","climate"].forEach(function(id){
    document.getElementById(id).addEventListener("input", calc);
    document.getElementById(id).addEventListener("change", calc);
  });
  calc();
})();`
  }
];

let created = 0;
for (const cfg of HEALTH_CALCS) {
  const html = buildCalculatorPage(cfg);
  fs.writeFileSync(path.join(root, cfg.file), html, "utf8");
  created++;
}
console.log("Generated " + created + " Fitness & Health calculators.");
