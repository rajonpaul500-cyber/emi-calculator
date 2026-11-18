/* Generates 16 high-traffic Everyday, Utility, Financial & Math calculators */
const fs = require("fs");
const path = require("path");
const { buildCalculatorPage } = require("./page-shell");

const root = path.resolve(__dirname, "..");

const CALCS = [
  // 1. Age Calculator
  {
    file: "age-calculator.html",
    title: "Age Calculator - Exact Age in Years, Months, Weeks & Days | EMI Master",
    description: "Free exact age calculator. Find your chronological age in years, months, weeks, days, hours, and minutes, plus your birth weekday and next birthday countdown.",
    keywords: "age calculator, birthday calculator, exact age calculator, chronological age, how old am i",
    schemaCategory: "UtilitiesApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "Age Calculator",
    subtitle: "Calculate exact chronological age in years, months, weeks, days, hours, and see your next birthday countdown.",
    calculatorHtml: `
    <div class="card">
      <h2>Birth Date &amp; Target Date</h2>
      <div class="form-grid">
        <div class="form-group"><label for="dob">Date of Birth</label><input type="date" id="dob" value="1998-05-15"></div>
        <div class="form-group"><label for="targetDate">Age at the Date of</label><input type="date" id="targetDate"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Exact Age</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset to Today</button>
      </div>
    </div>

    <div class="result-panel" id="resultPanel">
      <h3>Exact Chronological Age</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Total Months &amp; Weeks</div><div class="value" id="mwOut">—</div></div>
        <div class="result-item"><div class="label">Total Days Lived</div><div class="value" id="daysOut">—</div></div>
        <div class="result-item"><div class="label">Next Birthday Countdown</div><div class="value positive" id="bdayOut">—</div></div>
      </div>
      <div class="payoff-note" id="ageNote"></div>
    </div>`,
    facts: [
      { k: "Calendar Precision", v: "Accounts for leap years & 28–31 day months" },
      { k: "Outputs", v: "Years, months, weeks, days, hours, minutes" },
      { k: "Extra", v: "Day of week born & next birthday timer" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>How Exact Age Is Computed Across Leap Years</h2>
      <p>Calendar months vary between 28, 29, 30, and 31 days. Rather than approximating a year as 365.25 days, this calculator steps month-by-month across actual Gregorian calendar boundaries while counting exact elapsed days (including every February 29 leap day) for total weeks, days, and hours.</p>
    </div>`,
    faqs: [
      { q: "Does the age calculator include leap years?", a: "Yes. Every February 29 between your birth date and target date is counted accurately in total days, weeks, and hours lived." },
      { q: "Can I calculate someone's age on a past or future date?", a: "Yes. Change the 'Age at the Date of' input to any historical or future calendar date." }
    ],
    related: [
      { href: "date-calculator.html", label: "Date Calculator", icon: "📅" },
      { href: "time-calculator.html", label: "Time Calculator", icon: "⏱️" },
      { href: "pregnancy-calculator.html", label: "Pregnancy Due Date", icon: "🤰" }
    ],
    script: `
(function(){
  function setToday() {
    document.getElementById("targetDate").value = new Date().toISOString().slice(0, 10);
  }
  function calc() {
    var d1 = document.getElementById("dob").value;
    var d2 = document.getElementById("targetDate").value;
    if (!d1 || !d2) return;
    var birth = new Date(d1 + "T00:00:00");
    var target = new Date(d2 + "T00:00:00");
    if (target < birth) {
      document.getElementById("resultMain").textContent = "Target date must be after birth date";
      return;
    }
    var years = target.getFullYear() - birth.getFullYear();
    var months = target.getMonth() - birth.getMonth();
    var days = target.getDate() - birth.getDate();
    if (days < 0) {
      months -= 1;
      var prevMonthDays = new Date(target.getFullYear(), target.getMonth(), 0).getDate();
      days += prevMonthDays;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    var totalDays = Math.round((target - birth) / 86400000);
    var totalWeeks = Math.floor(totalDays / 7);
    var totalMonths = years * 12 + months;
    var totalHours = totalDays * 24;

    var nextBday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday <= target) nextBday.setFullYear(nextBday.getFullYear() + 1);
    var daysUntil = Math.round((nextBday - target) / 86400000);
    var bornDay = birth.toLocaleDateString("en-US", { weekday: "long" });

    document.getElementById("resultMain").textContent = years + " years, " + months + " months, " + days + " days";
    document.getElementById("mwOut").textContent = totalMonths.toLocaleString("en-US") + " mo (" + totalWeeks.toLocaleString("en-US") + " wks)";
    document.getElementById("daysOut").textContent = totalDays.toLocaleString("en-US") + " days (" + totalHours.toLocaleString("en-US") + " hrs)";
    document.getElementById("bdayOut").textContent = daysUntil === 365 || daysUntil === 366 ? "Happy Birthday!" : daysUntil + " days left";
    document.getElementById("ageNote").textContent = "Born on a " + bornDay + " · Total minutes lived: ~" + (totalHours * 60).toLocaleString("en-US");
  }
  setToday();
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("dob").value = "1998-05-15";
    setToday();
    calc();
  });
  document.getElementById("dob").addEventListener("change", calc);
  document.getElementById("targetDate").addEventListener("change", calc);
  calc();
})();`
  },

  // 2. Date Calculator
  {
    file: "date-calculator.html",
    title: "Date Calculator - Days Between Dates & Add/Subtract Days | EMI Master",
    description: "Free online date calculator. Count exact days, weeks, and business weekdays between two dates, or add and subtract days, weeks, months, and years from any date.",
    keywords: "date calculator, days between dates, business days calculator, add days to date",
    schemaCategory: "UtilitiesApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "Date Calculator",
    subtitle: "Count calendar days and business weekdays between two dates, or add and subtract days, weeks, months, and years.",
    calculatorHtml: `
    <div class="unit-tabs" id="modeTabs">
      <button type="button" class="unit-tab active" data-mode="diff">Days Between Two Dates</button>
      <button type="button" class="unit-tab" data-mode="add">Add / Subtract From Date</button>
    </div>

    <div class="card" id="diffCard">
      <h2>Days Between Dates</h2>
      <div class="form-grid">
        <div class="form-group"><label for="startDate">Start Date</label><input type="date" id="startDate"></div>
        <div class="form-group"><label for="endDate">End Date</label><input type="date" id="endDate"></div>
      </div>
      <div class="form-actions"><button class="btn btn-primary" id="calcDiffBtn" type="button">Calculate Duration</button></div>
    </div>

    <div class="card" id="addCard" style="display:none;">
      <h2>Add or Subtract Time</h2>
      <div class="form-grid">
        <div class="form-group"><label for="baseDate">Start Date</label><input type="date" id="baseDate"></div>
        <div class="form-group"><label for="opDir">Operation</label><select id="opDir"><option value="1" selected>+ Add</option><option value="-1">- Subtract</option></select></div>
        <div class="form-group"><label for="addYears">Years</label><input type="number" id="addYears" value="0" min="0"></div>
        <div class="form-group"><label for="addMonths">Months</label><input type="number" id="addMonths" value="3" min="0"></div>
        <div class="form-group"><label for="addWeeks">Weeks</label><input type="number" id="addWeeks" value="0" min="0"></div>
        <div class="form-group"><label for="addDays">Days</label><input type="number" id="addDays" value="15" min="0"></div>
      </div>
      <div class="form-actions"><button class="btn btn-primary" id="calcAddBtn" type="button">Calculate Resulting Date</button></div>
    </div>

    <div class="result-panel" id="resultPanel">
      <h3 id="resLabel">Duration Between Dates</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid" id="resGrid">
        <div class="result-item"><div class="label">Weeks &amp; Remainder</div><div class="value" id="wksOut">—</div></div>
        <div class="result-item"><div class="label">Business Weekdays (Mon–Fri)</div><div class="value positive" id="bizOut">—</div></div>
        <div class="result-item"><div class="label">Weekend Days</div><div class="value" id="wkndOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Business Days", v: "Counts Mon–Fri weekdays automatically" },
      { k: "Calendar Units", v: "Exact leap-year & month-end handling" },
      { k: "Modes", v: "Date difference & Date arithmetic" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Counting Business Days vs. Calendar Days</h2>
      <p>Project deadlines, shipping estimates, and legal notice periods frequently specify either <strong>calendar days</strong> or <strong>business days (Monday through Friday)</strong>. Switching between both modes lets you calculate contract deadlines or travel itineraries in seconds.</p>
    </div>`,
    faqs: [
      { q: "Does the business day count exclude Saturdays and Sundays?", a: "Yes. Weekdays Monday through Friday are counted as business days, while Saturdays and Sundays are tallied separately." },
      { q: "How does adding months handle month ends like January 31 + 1 month?", a: "JavaScript date rolling adjusts overflow automatically; for fixed-day deadlines, adding exact days or weeks avoids calendar ambiguity." }
    ],
    related: [
      { href: "age-calculator.html", label: "Age Calculator", icon: "🎂" },
      { href: "time-calculator.html", label: "Time Calculator", icon: "⏱️" },
      { href: "hours-calculator.html", label: "Work Hours Calculator", icon: "🕒" }
    ],
    script: `
(function(){
  var mode = "diff";
  var now = new Date();
  var plus90 = new Date(now.getTime() + 90 * 86400000);
  document.getElementById("startDate").value = now.toISOString().slice(0,10);
  document.getElementById("endDate").value = plus90.toISOString().slice(0,10);
  document.getElementById("baseDate").value = now.toISOString().slice(0,10);

  document.querySelectorAll("#modeTabs .unit-tab").forEach(function(btn){
    btn.addEventListener("click", function(){
      document.querySelectorAll("#modeTabs .unit-tab").forEach(function(b){ b.classList.remove("active"); });
      btn.classList.add("active");
      mode = btn.getAttribute("data-mode");
      document.getElementById("diffCard").style.display = mode === "diff" ? "" : "none";
      document.getElementById("addCard").style.display = mode === "add" ? "" : "none";
      calc();
    });
  });

  function calc() {
    if (mode === "diff") {
      var s = document.getElementById("startDate").value;
      var e = document.getElementById("endDate").value;
      if (!s || !e) return;
      var d1 = new Date(s + "T00:00:00");
      var d2 = new Date(e + "T00:00:00");
      if (d2 < d1) { var tmp = d1; d1 = d2; d2 = tmp; }
      var total = Math.round((d2 - d1) / 86400000);
      var biz = 0, wknd = 0;
      for (var i = 0; i < total; i++) {
        var cur = new Date(d1.getTime() + i * 86400000);
        var dow = cur.getDay();
        if (dow === 0 || dow === 6) wknd++; else biz++;
      }
      document.getElementById("resLabel").textContent = "Duration Between Dates";
      document.getElementById("resultMain").textContent = total.toLocaleString("en-US") + " Calendar Days";
      document.getElementById("wksOut").textContent = Math.floor(total/7) + " weeks, " + (total%7) + " days";
      document.getElementById("bizOut").textContent = biz.toLocaleString("en-US") + " weekdays";
      document.getElementById("wkndOut").textContent = wknd.toLocaleString("en-US") + " weekend days";
    } else {
      var b = document.getElementById("baseDate").value;
      if (!b) return;
      var sign = parseInt(document.getElementById("opDir").value, 10) || 1;
      var y = (parseInt(document.getElementById("addYears").value, 10)||0) * sign;
      var m = (parseInt(document.getElementById("addMonths").value, 10)||0) * sign;
      var w = (parseInt(document.getElementById("addWeeks").value, 10)||0) * sign;
      var d = (parseInt(document.getElementById("addDays").value, 10)||0) * sign;
      var dt = new Date(b + "T00:00:00");
      dt.setFullYear(dt.getFullYear() + y);
      dt.setMonth(dt.getMonth() + m);
      dt.setDate(dt.getDate() + w * 7 + d);
      document.getElementById("resLabel").textContent = "Resulting Calendar Date";
      document.getElementById("resultMain").textContent = dt.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });
      var dayDiff = Math.round((dt - new Date(b + "T00:00:00")) / 86400000);
      document.getElementById("wksOut").textContent = (dayDiff >= 0 ? "+" : "") + dayDiff + " total days";
      document.getElementById("bizOut").textContent = dt.toISOString().slice(0,10);
      document.getElementById("wkndOut").textContent = (dt.getDay() === 0 || dt.getDay() === 6) ? "Weekend" : "Business Day";
    }
  }
  document.getElementById("calcDiffBtn").addEventListener("click", calc);
  document.getElementById("calcAddBtn").addEventListener("click", calc);
  ["startDate","endDate","baseDate","opDir","addYears","addMonths","addWeeks","addDays"].forEach(function(id){
    document.getElementById(id).addEventListener("input", calc);
    document.getElementById(id).addEventListener("change", calc);
  });
  calc();
})();`
  },

  // 3. Time Calculator
  {
    file: "time-calculator.html",
    title: "Time Calculator - Add & Subtract Hours, Minutes, Seconds | EMI Master",
    description: "Free online time calculator. Add or subtract days, hours, minutes, and seconds cleanly, and convert results into total hours, minutes, and seconds.",
    keywords: "time calculator, add hours and minutes, subtract time, time duration calculator",
    schemaCategory: "UtilitiesApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "Time Calculator",
    subtitle: "Add or subtract days, hours, minutes, and seconds with instant rollover and decimal hour totals.",
    calculatorHtml: `
    <div class="card">
      <h2>Add or Subtract Durations</h2>
      <div class="form-grid">
        <div class="form-group">
          <label>Time A (Days : Hrs : Min : Sec)</label>
          <div class="form-grid" style="grid-template-columns: repeat(4,1fr);">
            <input type="number" id="d1" value="1" min="0" aria-label="Days A">
            <input type="number" id="h1" value="6" min="0" aria-label="Hours A">
            <input type="number" id="m1" value="45" min="0" aria-label="Minutes A">
            <input type="number" id="s1" value="20" min="0" aria-label="Seconds A">
          </div>
        </div>
        <div class="form-group">
          <label for="tOp">Operation</label>
          <select id="tOp"><option value="add" selected>+ Add Time (A + B)</option><option value="sub">- Subtract Time (A - B)</option></select>
        </div>
        <div class="form-group" style="grid-column: 1 / -1;">
          <label>Time B (Days : Hrs : Min : Sec)</label>
          <div class="form-grid" style="grid-template-columns: repeat(4,1fr);">
            <input type="number" id="d2" value="0" min="0" aria-label="Days B">
            <input type="number" id="h2" value="4" min="0" aria-label="Hours B">
            <input type="number" id="m2" value="35" min="0" aria-label="Minutes B">
            <input type="number" id="s2" value="50" min="0" aria-label="Seconds B">
          </div>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Time</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Normalized Time Result</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Total Hours (Decimal)</div><div class="value" id="totHrOut">—</div></div>
        <div class="result-item"><div class="label">Total Minutes</div><div class="value" id="totMinOut">—</div></div>
        <div class="result-item"><div class="label">Total Seconds</div><div class="value" id="totSecOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Base-60 Rollover", v: "60 sec = 1 min · 60 min = 1 hr" },
      { k: "Day Rollover", v: "24 hours = 1 day (86,400 sec)" },
      { k: "Decimal Hours", v: "Ideal for billing & payroll timesheets" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Adding Hours, Minutes &amp; Seconds Without Base-10 Errors</h2>
      <p>Because time uses base-60 arithmetic for seconds and minutes and base-24 for days, standard calculators produce misleading decimals (for example 1.45 + 0.35 = 1.80 instead of 2:20). Converting every unit into total seconds first guarantees error-free rollover.</p>
    </div>`,
    faqs: [
      { q: "How do you convert hours and minutes to decimal hours?", a: "Divide minutes by 60 and add to hours. For example, 7 hours 45 minutes = 7 + 45/60 = 7.75 decimal hours." }
    ],
    related: [
      { href: "hours-calculator.html", label: "Work Hours & Timesheet", icon: "🕒" },
      { href: "date-calculator.html", label: "Date Calculator", icon: "📅" },
      { href: "pace-calculator.html", label: "Running Pace Calculator", icon: "🏃" }
    ],
    script: `
(function(){
  function calc() {
    var sec1 = ((+document.getElementById("d1").value||0)*86400) + ((+document.getElementById("h1").value||0)*3600) + ((+document.getElementById("m1").value||0)*60) + (+document.getElementById("s1").value||0);
    var sec2 = ((+document.getElementById("d2").value||0)*86400) + ((+document.getElementById("h2").value||0)*3600) + ((+document.getElementById("m2").value||0)*60) + (+document.getElementById("s2").value||0);
    var op = document.getElementById("tOp").value;
    var net = op === "add" ? sec1 + sec2 : sec1 - sec2;
    var sign = net < 0 ? "-" : "";
    var abs = Math.abs(Math.round(net));
    var d = Math.floor(abs / 86400);
    var h = Math.floor((abs % 86400) / 3600);
    var m = Math.floor((abs % 3600) / 60);
    var s = abs % 60;
    document.getElementById("resultMain").textContent = sign + d + "d " + h + "h " + m + "m " + s + "s";
    document.getElementById("totHrOut").textContent = (net / 3600).toFixed(2) + " hrs";
    document.getElementById("totMinOut").textContent = (net / 60).toFixed(2) + " min";
    document.getElementById("totSecOut").textContent = net.toLocaleString("en-US") + " sec";
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("d1").value=1; document.getElementById("h1").value=6; document.getElementById("m1").value=45; document.getElementById("s1").value=20;
    document.getElementById("d2").value=0; document.getElementById("h2").value=4; document.getElementById("m2").value=35; document.getElementById("s2").value=50;
    document.getElementById("tOp").value="add";
    calc();
  });
  ["d1","h1","m1","s1","d2","h2","m2","s2","tOp"].forEach(function(id){
    document.getElementById(id).addEventListener("input", calc);
    document.getElementById(id).addEventListener("change", calc);
  });
  calc();
})();`
  },

  // 4. Work Hours & Timesheet Calculator
  {
    file: "hours-calculator.html",
    title: "Work Hours & Weekly Timesheet Calculator with Overtime Pay | EMI Master",
    description: "Calculate weekly work hours, deduct unpaid lunch breaks, compute regular vs overtime hours, and estimate gross pay with our free mobile-ready timesheet calculator.",
    keywords: "hours calculator, work hours calculator, timesheet calculator, overtime hours calculator",
    schemaCategory: "UtilitiesApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "Work Hours & Timesheet Calculator",
    subtitle: "Log daily clock-in and clock-out times with unpaid breaks to calculate weekly hours, overtime, and gross pay.",
    calculatorHtml: `
    <div class="card">
      <h2>Weekly Timesheet (Mon – Sun)</h2>
      <div class="form-grid" style="margin-bottom:14px;">
        <div class="form-group"><label for="hourlyRate">Hourly Rate ($)</label><input type="number" id="hourlyRate" value="25" min="0" step="0.5"></div>
        <div class="form-group"><label for="otThreshold">Weekly Overtime Threshold (hrs)</label><input type="number" id="otThreshold" value="40" min="1" max="100"></div>
      </div>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Day</th><th>Start Time</th><th>End Time</th><th>Break (min)</th><th class="num">Net Hours</th></tr></thead>
          <tbody id="timesheetBody"></tbody>
        </table>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Timesheet</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset Default Week</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Total Weekly Hours</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Regular Hours</div><div class="value" id="regOut">—</div></div>
        <div class="result-item"><div class="label">Overtime Hours (1.5x)</div><div class="value positive" id="otOut">—</div></div>
        <div class="result-item"><div class="label">Estimated Gross Pay</div><div class="value" id="payOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Decimal Precision", v: "Minutes converted to exact hundredths" },
      { k: "Overtime Multiplier", v: "Standard 1.5x after threshold" },
      { k: "Break Support", v: "Subtracts unpaid lunch/break minutes" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Tracking Weekly Payroll &amp; Overtime Accurately</h2>
      <p>Whether you bill freelance hours or verify a paycheck, converting daily timecards from HH:MM into decimal payroll hours avoids rounding losses. Any shift where clock-out crosses midnight is handled cleanly too.</p>
    </div>`,
    faqs: [
      { q: "How are unpaid meal breaks handled?", a: "Each day's break minutes are subtracted directly from the elapsed duration between clock-in and clock-out." },
      { q: "How is overtime pay calculated?", a: "Hours exceeding your weekly threshold (40 hours by default) are multiplied by 1.5x your base hourly rate." }
    ],
    related: [
      { href: "salary-calculator.html", label: "Salary Calculator", icon: "💵" },
      { href: "time-calculator.html", label: "Time Calculator", icon: "⏱️" },
      { href: "date-calculator.html", label: "Date Calculator", icon: "📅" }
    ],
    script: `
(function(){
  var days = [
    ["Monday","09:00","17:30",30],
    ["Tuesday","09:00","17:30",30],
    ["Wednesday","09:00","17:30",30],
    ["Thursday","09:00","18:00",30],
    ["Friday","09:00","17:00",30],
    ["Saturday","","",0],
    ["Sunday","","",0]
  ];
  function buildRows() {
    document.getElementById("timesheetBody").innerHTML = days.map(function(d, idx){
      return "<tr><td><strong>" + d[0] + "</strong></td>" +
        "<td><input type='time' class='ts-in' data-i='" + idx + "' value='" + d[1] + "'></td>" +
        "<td><input type='time' class='ts-out' data-i='" + idx + "' value='" + d[2] + "'></td>" +
        "<td><input type='number' class='ts-brk' data-i='" + idx + "' value='" + d[3] + "' min='0' max='300' style='width:76px;'></td>" +
        "<td class='num' id='dayNet-" + idx + "'>0.00 hrs</td></tr>";
    }).join("");
    document.querySelectorAll(".ts-in, .ts-out, .ts-brk").forEach(function(el){
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    });
  }
  function toMin(str) {
    if (!str || str.indexOf(":") === -1) return null;
    var p = str.split(":");
    return parseInt(p[0],10)*60 + parseInt(p[1],10);
  }
  function calc() {
    var totalMin = 0;
    for (var i = 0; i < 7; i++) {
      var s = toMin(document.querySelector(".ts-in[data-i='"+i+"']").value);
      var e = toMin(document.querySelector(".ts-out[data-i='"+i+"']").value);
      var brk = parseFloat(document.querySelector(".ts-brk[data-i='"+i+"']").value) || 0;
      var netMin = 0;
      if (s !== null && e !== null) {
        var diff = e >= s ? (e - s) : (1440 - s + e);
        netMin = Math.max(0, diff - brk);
      }
      totalMin += netMin;
      document.getElementById("dayNet-" + i).textContent = (netMin / 60).toFixed(2) + " hrs";
    }
    var totHrs = totalMin / 60;
    var thresh = parseFloat(document.getElementById("otThreshold").value) || 40;
    var rate = parseFloat(document.getElementById("hourlyRate").value) || 0;
    var reg = Math.min(totHrs, thresh);
    var ot = Math.max(0, totHrs - thresh);
    var pay = reg * rate + ot * rate * 1.5;
    var hh = Math.floor(totalMin / 60), mm = Math.round(totalMin % 60);
    document.getElementById("resultMain").textContent = totHrs.toFixed(2) + " hrs (" + hh + "h " + mm + "m)";
    document.getElementById("regOut").textContent = reg.toFixed(2) + " hrs";
    document.getElementById("otOut").textContent = ot.toFixed(2) + " hrs";
    document.getElementById("payOut").textContent = "$" + pay.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  buildRows();
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){ buildRows(); calc(); });
  ["hourlyRate","otThreshold"].forEach(function(id){ document.getElementById(id).addEventListener("input", calc); });
  calc();
})();`
  },

  // 5. GPA Calculator
  {
    file: "gpa-calculator.html",
    title: "GPA Calculator - College & High School Grade Point Average | EMI Master",
    description: "Free interactive GPA calculator. Add courses, letter grades (A+ to F), credit hours, and optional prior cumulative GPA to compute your weighted semester and cumulative GPA.",
    keywords: "gpa calculator, college gpa calculator, cumulative gpa, grade point average calculator",
    schemaCategory: "EducationalApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "GPA Calculator",
    subtitle: "Calculate your semester and cumulative Grade Point Average (GPA) using standard 4.0 letter grades and credit hours.",
    calculatorHtml: `
    <div class="card">
      <h2>Semester Courses</h2>
      <div class="dynamic-rows" id="courseRows"></div>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px;">
        <button class="btn btn-outline btn-sm" id="addCourseBtn" type="button">+ Add Course</button>
      </div>
      <h3>Prior Cumulative GPA (Optional)</h3>
      <div class="form-grid" style="margin-top:8px;">
        <div class="form-group"><label for="priorGpa">Previous Cumulative GPA</label><input type="number" id="priorGpa" value="" placeholder="e.g. 3.45" min="0" max="4.3" step="0.01"></div>
        <div class="form-group"><label for="priorCreds">Previous Earned Credits</label><input type="number" id="priorCreds" value="" placeholder="e.g. 45" min="0" step="1"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate GPA</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Semester GPA</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Semester Credits</div><div class="value" id="semCredOut">—</div></div>
        <div class="result-item"><div class="label">Cumulative GPA</div><div class="value positive" id="cumGpaOut">—</div></div>
        <div class="result-item"><div class="label">Total Grade Points</div><div class="value" id="ptsOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Scale", v: "Standard 4.0 US Grading Scale" },
      { k: "Formula", v: "Sum(Grade Points x Credits) / Total Credits" },
      { k: "Honors Support", v: "Add unlimited courses & blend prior GPA" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>How College GPA Is Weighted by Credit Hours</h2>
      <p>Every course contributes grade points equal to its numeric grade value (A = 4.0, B = 3.0, C = 2.0) multiplied by its credit weight. A 4-credit science lab shifts your semester average twice as much as a 2-credit seminar.</p>
    </div>`,
    faqs: [
      { q: "What grade values are used on the 4.0 scale?", a: "A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D+ = 1.3, D = 1.0, F = 0.0." },
      { q: "How do I raise my cumulative GPA fastest?", a: "Earning A grades in higher-credit core courses raises cumulative quality points faster when total prior credits are still moderate." }
    ],
    related: [
      { href: "grade-calculator.html", label: "Weighted Grade Calculator", icon: "📝" },
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "average-return-calculator.html", label: "Average Calculator", icon: "📊" }
    ],
    script: `
(function(){
  var gradeMap = { "A+":4.0, "A":4.0, "A-":3.7, "B+":3.3, "B":3.0, "B-":2.7, "C+":2.3, "C":2.0, "C-":1.7, "D+":1.3, "D":1.0, "F":0.0 };
  var defaults = [
    ["Calculus I", "A", 4],
    ["Computer Science", "A-", 3],
    ["English Composition", "B+", 3],
    ["Physics Lab", "A", 3]
  ];
  function createRow(name, gr, cr) {
    var div = document.createElement("div");
    div.className = "dynamic-row";
    var opts = Object.keys(gradeMap).map(function(k){
      return "<option value='" + k + "'" + (k === gr ? " selected" : "") + ">" + k + " (" + gradeMap[k].toFixed(1) + ")</option>";
    }).join("");
    div.innerHTML =
      "<input type='text' placeholder='Course name' value='" + name + "' class='c-name'>" +
      "<select class='c-grade'>" + opts + "</select>" +
      "<input type='number' placeholder='Credits' value='" + cr + "' min='0.5' max='12' step='0.5' class='c-cred'>" +
      "<button type='button' class='row-remove-btn' title='Remove course'>&times;</button>";
    div.querySelector(".row-remove-btn").addEventListener("click", function(){
      if (document.querySelectorAll("#courseRows .dynamic-row").length > 1) { div.remove(); calc(); }
    });
    div.querySelectorAll("input, select").forEach(function(el){
      el.addEventListener("input", calc);
      el.addEventListener("change", calc);
    });
    return div;
  }
  function loadDefaults() {
    var box = document.getElementById("courseRows");
    box.innerHTML = "";
    defaults.forEach(function(r){ box.appendChild(createRow(r[0], r[1], r[2])); });
  }
  function calc() {
    var rows = document.querySelectorAll("#courseRows .dynamic-row");
    var semPts = 0, semCreds = 0;
    rows.forEach(function(r){
      var gr = r.querySelector(".c-grade").value;
      var cr = parseFloat(r.querySelector(".c-cred").value) || 0;
      if (cr > 0) {
        semCreds += cr;
        semPts += cr * (gradeMap[gr] !== undefined ? gradeMap[gr] : 0);
      }
    });
    var semGpa = semCreds > 0 ? semPts / semCreds : 0;
    var pGpa = parseFloat(document.getElementById("priorGpa").value);
    var pCreds = parseFloat(document.getElementById("priorCreds").value);
    var cumGpa = semGpa;
    if (isFinite(pGpa) && isFinite(pCreds) && pCreds > 0) {
      cumGpa = (semPts + pGpa * pCreds) / (semCreds + pCreds);
    }
    document.getElementById("resultMain").textContent = semGpa.toFixed(2) + " GPA";
    document.getElementById("semCredOut").textContent = semCreds.toFixed(1) + " credits";
    document.getElementById("cumGpaOut").textContent = cumGpa.toFixed(2) + " GPA";
    document.getElementById("ptsOut").textContent = semPts.toFixed(2) + " pts";
  }
  loadDefaults();
  document.getElementById("addCourseBtn").addEventListener("click", function(){
    document.getElementById("courseRows").appendChild(createRow("New Course", "B+", 3));
    calc();
  });
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("priorGpa").value = "";
    document.getElementById("priorCreds").value = "";
    loadDefaults();
    calc();
  });
  ["priorGpa","priorCreds"].forEach(function(id){ document.getElementById(id).addEventListener("input", calc); });
  calc();
})();`
  },

  // 6. Grade & Final Exam Calculator
  {
    file: "grade-calculator.html",
    title: "Weighted Grade & Final Exam Calculator | EMI Master",
    description: "Calculate your weighted class grade average across assignments, quizzes, and midterms, plus the exact score needed on your final exam to reach your target grade.",
    keywords: "grade calculator, final grade calculator, weighted grade calculator, what do i need on my final",
    schemaCategory: "EducationalApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "Weighted Grade & Final Exam Calculator",
    subtitle: "Compute your current weighted class percentage and discover what score you need on the final exam to hit your target grade.",
    calculatorHtml: `
    <div class="card">
      <h2>Graded Course Components</h2>
      <div class="dynamic-rows" id="gradeRows"></div>
      <button class="btn btn-outline btn-sm" id="addRowBtn" type="button" style="margin-bottom:16px;">+ Add Assignment / Exam</button>
      <h3>Final Exam Target Planner</h3>
      <div class="form-grid" style="margin-top:8px;">
        <div class="form-group"><label for="targetGrade">Target Overall Class Grade (%)</label><input type="number" id="targetGrade" value="90" min="0" max="100" step="0.5"></div>
        <div class="form-group"><label for="finalWeight">Final Exam Weight (%)</label><input type="number" id="finalWeight" value="25" min="1" max="99" step="1"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Grade</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Current Weighted Average</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Score Needed on Final</div><div class="value" id="finalNeedOut">—</div></div>
        <div class="result-item"><div class="label">Completed Weight</div><div class="value" id="wtDoneOut">—</div></div>
        <div class="result-item"><div class="label">Current Letter Grade</div><div class="value positive" id="letterOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Weighted Average", v: "Sum(Score x Weight) / Sum(Weights)" },
      { k: "Final Exam Solver", v: "(Target - Current x (1 - w)) / w" },
      { k: "Supports", v: "Arbitrary number of syllabus categories" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>How Final Exam Targets Are Solved</h2>
      <p>Before finals week, multiply each completed category score by its syllabus weight, divide by completed weight to get your standing average, and solve directly for the minimum final exam score needed for an A, B, or passing threshold.</p>
    </div>`,
    faqs: [
      { q: "What if the final exam needed score is over 100%?", a: "A required score above 100% indicates the target grade is mathematically unreachable without extra credit—adjust your target slightly to see what grade is realistic." }
    ],
    related: [
      { href: "gpa-calculator.html", label: "GPA Calculator", icon: "🎓" },
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "rounding-calculator.html", label: "Rounding Calculator", icon: "±" }
    ],
    script: `
(function(){
  var defs = [
    ["Homework & Labs", 94, 25],
    ["Quizzes", 86, 20],
    ["Midterm Exam", 84, 30]
  ];
  function toLetter(g) {
    if (g >= 93) return "A"; if (g >= 90) return "A-"; if (g >= 87) return "B+";
    if (g >= 83) return "B"; if (g >= 80) return "B-"; if (g >= 77) return "C+";
    if (g >= 73) return "C"; if (g >= 70) return "C-"; if (g >= 60) return "D"; return "F";
  }
  function createRow(label, score, wt) {
    var div = document.createElement("div");
    div.className = "dynamic-row";
    div.innerHTML =
      "<input type='text' value='" + label + "' placeholder='Category'>" +
      "<input type='number' class='g-score' value='" + score + "' step='0.1' placeholder='Score %'>" +
      "<input type='number' class='g-wt' value='" + wt + "' step='0.5' min='0' placeholder='Weight %'>" +
      "<button type='button' class='row-remove-btn' title='Remove'>&times;</button>";
    div.querySelector(".row-remove-btn").addEventListener("click", function(){
      if (document.querySelectorAll("#gradeRows .dynamic-row").length > 1) { div.remove(); calc(); }
    });
    div.querySelectorAll("input").forEach(function(inp){ inp.addEventListener("input", calc); });
    return div;
  }
  function loadDefs() {
    var box = document.getElementById("gradeRows");
    box.innerHTML = "";
    defs.forEach(function(r){ box.appendChild(createRow(r[0], r[1], r[2])); });
  }
  function calc() {
    var sumSW = 0, sumW = 0;
    document.querySelectorAll("#gradeRows .dynamic-row").forEach(function(r){
      var sc = parseFloat(r.querySelector(".g-score").value);
      var wt = parseFloat(r.querySelector(".g-wt").value);
      if (isFinite(sc) && isFinite(wt) && wt > 0) {
        sumSW += sc * wt;
        sumW += wt;
      }
    });
    var cur = sumW > 0 ? sumSW / sumW : 0;
    var tgt = parseFloat(document.getElementById("targetGrade").value) || 90;
    var fw = parseFloat(document.getElementById("finalWeight").value) || 25;
    var needed = fw > 0 ? ((tgt * (sumW + fw) - sumSW) / fw) : 0;
    document.getElementById("resultMain").textContent = cur.toFixed(2) + "% (" + toLetter(cur) + ")";
    document.getElementById("finalNeedOut").textContent = needed.toFixed(1) + "%";
    document.getElementById("wtDoneOut").textContent = sumW.toFixed(0) + "%";
    document.getElementById("letterOut").textContent = toLetter(cur);
  }
  loadDefs();
  document.getElementById("addRowBtn").addEventListener("click", function(){
    document.getElementById("gradeRows").appendChild(createRow("Project", 90, 10));
    calc();
  });
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("targetGrade").value = 90;
    document.getElementById("finalWeight").value = 25;
    loadDefs();
    calc();
  });
  ["targetGrade","finalWeight"].forEach(function(id){ document.getElementById(id).addEventListener("input", calc); });
  calc();
})();`
  },

  // 7. Tip Calculator
  {
    file: "tip-calculator.html",
    title: "Tip Calculator - Restaurant Tip & Bill Splitter | EMI Master",
    description: "Free tip calculator and bill splitter. Calculate exact tip amount, total bill, and fair per-person share in seconds on mobile or desktop.",
    keywords: "tip calculator, bill split calculator, restaurant tip calculator, gratuity calculator",
    schemaCategory: "FinanceApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "Tip & Bill Split Calculator",
    subtitle: "Instantly calculate gratuity, total bill, and exact per-person split amounts for dining or group expenses.",
    calculatorHtml: `
    <div class="card">
      <h2>Bill &amp; Gratuity</h2>
      <div class="preset-chips" id="tipPresets" style="margin-bottom:14px;">
        <span class="preset-label" style="font-size:0.84rem;font-weight:600;color:var(--text-muted);">Quick Tip:</span>
        <button type="button" class="preset-chip" data-tip="10">10%</button>
        <button type="button" class="preset-chip" data-tip="15">15%</button>
        <button type="button" class="preset-chip active" data-tip="18">18%</button>
        <button type="button" class="preset-chip" data-tip="20">20%</button>
        <button type="button" class="preset-chip" data-tip="25">25%</button>
      </div>
      <div class="form-grid">
        <div class="form-group"><label for="bill">Bill Amount ($)</label><input type="number" id="bill" value="120" min="0" step="0.5"></div>
        <div class="form-group"><label for="tipPct">Tip Percentage (%)</label><input type="number" id="tipPct" value="18" min="0" max="100" step="0.5"></div>
        <div class="form-group"><label for="people">Split Between (People)</label><input type="number" id="people" value="3" min="1" max="100" step="1"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Split</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Total Per Person</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Tip Amount</div><div class="value" id="tipOut">—</div></div>
        <div class="result-item"><div class="label">Total Bill (Incl. Tip)</div><div class="value" id="totalOut">—</div></div>
        <div class="result-item"><div class="label">Tip Per Person</div><div class="value" id="tipPersonOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Standard Dining Tip", v: "15% – 20% of pre-tax bill" },
      { k: "Group Split", v: "Divides bill + gratuity evenly" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Tipping Etiquette &amp; Splitting Checks</h2>
      <p>Use the one-tap preset buttons (10%, 15%, 18%, 20%, 25%) right at your table to verify gratuity and split the total fairly among everyone in your party.</p>
    </div>`,
    faqs: [
      { q: "Should tip be calculated before or after sales tax?", a: "Traditionally, gratuity is calculated on the pre-tax subtotal of food and drinks, though many receipts print suggestions on the post-tax total." }
    ],
    related: [
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "discount-calculator.html", label: "Discount Calculator", icon: "🏷️" },
      { href: "sales-tax-calculator.html", label: "Sales Tax Calculator", icon: "🧾" }
    ],
    script: `
(function(){
  document.querySelectorAll("#tipPresets .preset-chip").forEach(function(ch){
    ch.addEventListener("click", function(){
      document.querySelectorAll("#tipPresets .preset-chip").forEach(function(c){ c.classList.remove("active"); });
      ch.classList.add("active");
      document.getElementById("tipPct").value = ch.getAttribute("data-tip");
      calc();
    });
  });
  function money(v){ return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function calc() {
    var bill = parseFloat(document.getElementById("bill").value) || 0;
    var pct = parseFloat(document.getElementById("tipPct").value) || 0;
    var ppl = Math.max(1, parseInt(document.getElementById("people").value, 10) || 1);
    var tip = bill * (pct / 100);
    var total = bill + tip;
    document.getElementById("resultMain").textContent = money(total / ppl) + " / person";
    document.getElementById("tipOut").textContent = money(tip);
    document.getElementById("totalOut").textContent = money(total);
    document.getElementById("tipPersonOut").textContent = money(tip / ppl);
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("bill").value = 120;
    document.getElementById("tipPct").value = 18;
    document.getElementById("people").value = 3;
    calc();
  });
  ["bill","tipPct","people"].forEach(function(id){ document.getElementById(id).addEventListener("input", calc); });
  calc();
})();`
  },

  // 8. Salary Calculator
  {
    file: "salary-calculator.html",
    title: "Salary Calculator - Convert Hourly, Monthly & Annual Pay | EMI Master",
    description: "Convert any hourly wage or annual salary into daily, weekly, biweekly, semi-monthly, monthly, and annual paychecks, both unadjusted and adjusted for paid time off.",
    keywords: "salary calculator, hourly to salary, annual salary to hourly, paycheck converter",
    schemaCategory: "FinanceApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "Salary Converter Calculator",
    subtitle: "Convert hourly, weekly, biweekly, monthly, or annual pay across all paycheck schedules instantly.",
    calculatorHtml: `
    <div class="card">
      <h2>Compensation &amp; Work Schedule</h2>
      <div class="form-grid">
        <div class="form-group">
          <label for="salaryAmt">Salary / Wage Amount ($)</label>
          <input type="number" id="salaryAmt" value="35" min="0" step="0.5">
        </div>
        <div class="form-group">
          <label for="payPeriod">Per</label>
          <select id="payPeriod">
            <option value="hour" selected>Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="biweek">Bi-Week (2 Weeks)</option>
            <option value="month">Month</option>
            <option value="year">Year</option>
          </select>
        </div>
        <div class="form-group"><label for="hrsWeek">Hours per Week</label><input type="number" id="hrsWeek" value="40" min="1" max="100"></div>
        <div class="form-group"><label for="daysWeek">Days per Week</label><input type="number" id="daysWeek" value="5" min="1" max="7"></div>
        <div class="form-group"><label for="holidays">Unpaid Holidays + Vacation Days / Yr</label><input type="number" id="holidays" value="15" min="0" max="100"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Convert Salary</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Annual Salary (Unadjusted vs Adjusted)</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="table-wrap" style="margin-top:14px;">
        <table>
          <thead><tr><th>Pay Frequency</th><th class="num">Unadjusted (52 Weeks)</th><th class="num">Adjusted (Less Holidays/PTO)</th></tr></thead>
          <tbody id="salTable"></tbody>
        </table>
      </div>
    </div>`,
    facts: [
      { k: "Standard Full-Time", v: "40 hrs/week x 52 weeks = 2,080 hours/yr" },
      { k: "Biweekly vs Semi-Monthly", v: "26 paychecks vs 24 paychecks per year" },
      { k: "Quick Rule", v: "Hourly x 2,080 approx Annual Salary" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Converting Between Hourly Wages and Annual Salaries</h2>
      <p>Assuming a standard 40-hour workweek across 52 weeks (2,080 work hours per year), a $35/hour wage translates to $72,800 per year before taxes. If you are a contractor without paid holidays, subtracting 15 unpaid days shows your true holiday-adjusted annual take-home run rate.</p>
    </div>`,
    faqs: [
      { q: "How many hours are in a full-time work year?", a: "At 40 hours per week for 52 weeks, a standard work year has 2,080 hours." },
      { q: "What is the difference between biweekly and semi-monthly pay?", a: "Biweekly pays every 2 weeks (26 paychecks per year), while semi-monthly pays twice a month on fixed dates (24 paychecks per year)." }
    ],
    related: [
      { href: "hours-calculator.html", label: "Work Hours Calculator", icon: "🕒" },
      { href: "rent-calculator.html", label: "Rent Affordability Calculator", icon: "🏢" },
      { href: "debt-to-income.html", label: "Debt-to-Income Calculator", icon: "⚖️" }
    ],
    script: `
(function(){
  function money(v){ return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function calc() {
    var amt = parseFloat(document.getElementById("salaryAmt").value) || 0;
    var per = document.getElementById("payPeriod").value;
    var hrsW = Math.max(1, parseFloat(document.getElementById("hrsWeek").value) || 40);
    var daysW = Math.max(1, parseFloat(document.getElementById("daysWeek").value) || 5);
    var hol = Math.max(0, parseFloat(document.getElementById("holidays").value) || 0);

    var annual = amt;
    if (per === "hour") annual = amt * hrsW * 52;
    else if (per === "day") annual = amt * daysW * 52;
    else if (per === "week") annual = amt * 52;
    else if (per === "biweek") annual = amt * 26;
    else if (per === "month") annual = amt * 12;

    var totalWorkDays = daysW * 52;
    var adjFactor = Math.max(0, (totalWorkDays - hol) / totalWorkDays);
    var adjAnnual = annual * adjFactor;
    if (per !== "hour" && per !== "day") {
      // If user entered fixed annual salary, unadjusted is entered figure, adjusted reflects fewer worked days at higher effective hourly rate or vice versa; keep proportional unpaid leave view cleanly:
    }
    document.getElementById("resultMain").textContent = money(annual) + " / year";
    var rows = [
      ["Hourly", annual / (hrsW * 52), adjAnnual / (hrsW * 52)],
      ["Daily", annual / totalWorkDays, adjAnnual / totalWorkDays],
      ["Weekly", annual / 52, adjAnnual / 52],
      ["Bi-Weekly (26/yr)", annual / 26, adjAnnual / 26],
      ["Semi-Monthly (24/yr)", annual / 24, adjAnnual / 24],
      ["Monthly (12/yr)", annual / 12, adjAnnual / 12],
      ["Annual", annual, adjAnnual]
    ];
    document.getElementById("salTable").innerHTML = rows.map(function(r){
      return "<tr><td><strong>" + r[0] + "</strong></td><td class='num'>" + money(r[1]) + "</td><td class='num'>" + money(r[2]) + "</td></tr>";
    }).join("");
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("salaryAmt").value=35; document.getElementById("payPeriod").value="hour";
    document.getElementById("hrsWeek").value=40; document.getElementById("daysWeek").value=5; document.getElementById("holidays").value=15;
    calc();
  });
  ["salaryAmt","payPeriod","hrsWeek","daysWeek","holidays"].forEach(function(id){
    document.getElementById(id).addEventListener("input", calc);
    document.getElementById(id).addEventListener("change", calc);
  });
  calc();
})();`
  },

  // 9. Unit Converter
  {
    file: "unit-converter.html",
    title: "Unit Converter - Length, Weight, Temperature, Area, Volume & Data | EMI Master",
    description: "Fast, free online unit converter for Length, Weight/Mass, Temperature, Area, Volume, Speed, Time, and Digital Data Storage with one-tap unit swap.",
    keywords: "unit converter, length converter, weight converter, temperature converter, metric to imperial",
    schemaCategory: "UtilitiesApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "Universal Unit Converter",
    subtitle: "Convert instantly across Length, Weight/Mass, Temperature, Area, Volume, Speed, Time, and Digital Storage units.",
    calculatorHtml: `
    <div class="unit-tabs" id="catTabs">
      <button type="button" class="unit-tab active" data-c="length">Length</button>
      <button type="button" class="unit-tab" data-c="weight">Weight</button>
      <button type="button" class="unit-tab" data-c="temp">Temperature</button>
      <button type="button" class="unit-tab" data-c="area">Area</button>
      <button type="button" class="unit-tab" data-c="volume">Volume</button>
      <button type="button" class="unit-tab" data-c="speed">Speed</button>
      <button type="button" class="unit-tab" data-c="data">Digital Data</button>
    </div>
    <div class="card">
      <h2>Convert Values</h2>
      <div class="form-grid">
        <div class="form-group">
          <label for="uVal">Input Value</label>
          <input type="number" id="uVal" value="10" step="any">
        </div>
        <div class="form-group">
          <label for="uFrom">From Unit</label>
          <select id="uFrom"></select>
        </div>
        <div class="form-group">
          <label for="uTo">To Unit</label>
          <select id="uTo"></select>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="swapBtn" type="button">&#8646; Swap Units</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Converted Value</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="table-wrap" style="margin-top:14px;">
        <table>
          <thead><tr><th>Equivalent Unit</th><th class="num">Converted Value</th></tr></thead>
          <tbody id="allUnitsBody"></tbody>
        </table>
      </div>
    </div>`,
    facts: [
      { k: "7 Unit Systems", v: "Length, Weight, Temp, Area, Volume, Speed, Data" },
      { k: "Precision", v: "High-precision IEEE double scientific factors" },
      { k: "Quick Matrix", v: "Displays all equivalent units in one view" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Metric &amp; Imperial Conversion Factors</h2>
      <p>All conversions map through an exact SI base unit (meters, kilograms, square meters, liters, meters per second, bytes) or exact temperature scale offsets for Celsius, Fahrenheit, and Kelvin.</p>
    </div>`,
    faqs: [
      { q: "How accurate are the metric-to-imperial factors?", a: "Exact international standards are used: 1 inch = 2.54 cm, 1 foot = 0.3048 m, 1 mile = 1,609.344 m, and 1 pound = 0.45359237 kg." }
    ],
    related: [
      { href: "scientific-notation-calculator.html", label: "Scientific Notation", icon: "🔬" },
      { href: "pace-calculator.html", label: "Running Pace Calculator", icon: "🏃" },
      { href: "bmi-calculator.html", label: "BMI Calculator", icon: "⚖️" }
    ],
    script: `
(function(){
  var UNITS = {
    length: { m: ["Meter (m)", 1], km: ["Kilometer (km)", 1000], cm: ["Centimeter (cm)", 0.01], mm: ["Millimeter (mm)", 0.001], mi: ["Mile (mi)", 1609.344], yd: ["Yard (yd)", 0.9144], ft: ["Foot (ft)", 0.3048], in: ["Inch (in)", 0.0254] },
    weight: { kg: ["Kilogram (kg)", 1], g: ["Gram (g)", 0.001], mg: ["Milligram (mg)", 1e-6], lb: ["Pound (lb)", 0.45359237], oz: ["Ounce (oz)", 0.028349523125], t: ["Metric Ton (t)", 1000] },
    temp: { c: ["Celsius (°C)", 1], f: ["Fahrenheit (°F)", 1], k: ["Kelvin (K)", 1] },
    area: { sqm: ["Square Meter (m²)", 1], sqkm: ["Square Kilometer (km²)", 1e6], sqft: ["Square Foot (ft²)", 0.09290304], acre: ["Acre", 4046.8564224], ha: ["Hectare", 10000] },
    volume: { l: ["Liter (L)", 1], ml: ["Milliliter (mL)", 0.001], gal: ["US Gallon", 3.785411784], qt: ["US Quart", 0.946352946], cup: ["US Cup", 0.2365882365], floz: ["US Fluid Oz", 0.02957352956] },
    speed: { kmh: ["km/h", 1/3.6], mph: ["mph", 0.44704], ms: ["m/s", 1], kn: ["Knots", 0.514444444] },
    data: { b: ["Byte (B)", 1], kb: ["Kilobyte (KB)", 1024], mb: ["Megabyte (MB)", 1048576], gb: ["Gigabyte (GB)", 1073741824], tb: ["Terabyte (TB)", 1099511627776] }
  };
  var cat = "length";
  function populate() {
    var map = UNITS[cat];
    var keys = Object.keys(map);
    var opts = keys.map(function(k){ return "<option value='" + k + "'>" + map[k][0] + "</option>"; }).join("");
    document.getElementById("uFrom").innerHTML = opts;
    document.getElementById("uTo").innerHTML = opts;
    document.getElementById("uFrom").value = keys[0];
    document.getElementById("uTo").value = keys[keys.length > 4 ? 4 : 1];
    calc();
  }
  function fmt(v) {
    if (!isFinite(v)) return "—";
    if (Math.abs(v) !== 0 && (Math.abs(v) < 1e-4 || Math.abs(v) >= 1e9)) return v.toExponential(6);
    return Number(v.toFixed(6)).toString();
  }
  function convertTemp(v, from, to) {
    var c = from === "c" ? v : from === "f" ? (v - 32) * 5/9 : v - 273.15;
    if (to === "c") return c;
    if (to === "f") return c * 9/5 + 32;
    return c + 273.15;
  }
  function calc() {
    var v = parseFloat(document.getElementById("uVal").value);
    var f = document.getElementById("uFrom").value;
    var t = document.getElementById("uTo").value;
    if (!isFinite(v)) return;
    var map = UNITS[cat];
    var out = cat === "temp" ? convertTemp(v, f, t) : (v * map[f][1]) / map[t][1];
    document.getElementById("resultMain").textContent = fmt(out) + " " + map[t][0];
    document.getElementById("allUnitsBody").innerHTML = Object.keys(map).map(function(k){
      var val = cat === "temp" ? convertTemp(v, f, k) : (v * map[f][1]) / map[k][1];
      return "<tr><td>" + map[k][0] + "</td><td class='num'><strong>" + fmt(val) + "</strong></td></tr>";
    }).join("");
  }
  document.querySelectorAll("#catTabs .unit-tab").forEach(function(b){
    b.addEventListener("click", function(){
      document.querySelectorAll("#catTabs .unit-tab").forEach(function(x){ x.classList.remove("active"); });
      b.classList.add("active");
      cat = b.getAttribute("data-c");
      populate();
    });
  });
  document.getElementById("swapBtn").addEventListener("click", function(){
    var f = document.getElementById("uFrom").value;
    document.getElementById("uFrom").value = document.getElementById("uTo").value;
    document.getElementById("uTo").value = f;
    calc();
  });
  document.getElementById("resetBtn").addEventListener("click", function(){ document.getElementById("uVal").value = 10; calc(); });
  ["uVal","uFrom","uTo"].forEach(function(id){
    document.getElementById(id).addEventListener("input", calc);
    document.getElementById(id).addEventListener("change", calc);
  });
  populate();
})();`
  },

  // 10. Password Generator
  {
    file: "password-generator.html",
    title: "Strong Password Generator - Cryptographic Entropy & Security | EMI Master",
    description: "Generate strong, cryptographically random passwords locally in your browser using Web Crypto API. Customize length, symbols, numbers, and inspect entropy bits.",
    keywords: "password generator, strong password generator, random password, secure password",
    schemaCategory: "SecurityApplication",
    catName: "Date, Time & Everyday",
    catAnchor: "sitemap.html#everyday",
    h1: "Strong Password Generator",
    subtitle: "Create cryptographically secure random passwords locally in your browser using the Web Crypto API.",
    calculatorHtml: `
    <div class="card">
      <h2>Password Rules</h2>
      <div class="form-grid">
        <div class="form-group">
          <label for="pwLen">Length (<span id="lenLabel">16</span> characters)</label>
          <input type="range" id="pwLen" min="6" max="64" value="16">
        </div>
        <div class="form-group">
          <label>Character Sets</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;padding-top:4px;">
            <label style="display:flex;align-items:center;gap:6px;font-weight:500;"><input type="checkbox" id="useUpper" checked> Uppercase (A–Z)</label>
            <label style="display:flex;align-items:center;gap:6px;font-weight:500;"><input type="checkbox" id="useLower" checked> Lowercase (a–z)</label>
            <label style="display:flex;align-items:center;gap:6px;font-weight:500;"><input type="checkbox" id="useNum" checked> Numbers (0–9)</label>
            <label style="display:flex;align-items:center;gap:6px;font-weight:500;"><input type="checkbox" id="useSym" checked> Symbols (!@#$%^&amp;*)</label>
          </div>
        </div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="genBtn" type="button">&#8635; Generate New Password</button>
        <button class="btn btn-outline" id="copyPwBtn" type="button">&#128203; Copy Password</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Generated Password</h3>
      <div class="result-main" id="resultMain" style="font-family:var(--font-mono);letter-spacing:0.03em;">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Entropy Strength</div><div class="value positive" id="entOut">—</div></div>
        <div class="result-item"><div class="label">Security Rating</div><div class="value" id="rateOut">—</div></div>
        <div class="result-item"><div class="label">Character Pool</div><div class="value" id="poolOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Randomness Source", v: "crypto.getRandomValues (CSPRNG)" },
      { k: "Recommended Length", v: "14 – 20+ characters for accounts" },
      { k: "Zero Network Calls", v: "Passwords never leave your device" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Why Cryptographic Entropy Beats Predictable Patterns</h2>
      <p>Modern GPU cracking rigs test tens of billions of dictionary combinations per second. A 16-character password drawn uniformly from 90+ characters provides over 100 bits of entropy, making brute-force guessing computationally infeasible.</p>
    </div>`,
    faqs: [
      { q: "Are generated passwords transmitted or saved anywhere?", a: "No. Generation happens 100% locally via window.crypto.getRandomValues inside your browser memory." }
    ],
    related: [
      { href: "random-number-generator.html", label: "Random Number Generator", icon: "🎲" },
      { href: "binary-calculator.html", label: "Binary Calculator", icon: "01" },
      { href: "hex-calculator.html", label: "Hex Calculator", icon: "0x" }
    ],
    script: `
(function(){
  function randIdx(max) {
    var arr = new Uint32Array(1);
    window.crypto.getRandomValues(arr);
    return arr[0] % max;
  }
  function generate() {
    var len = parseInt(document.getElementById("pwLen").value, 10) || 16;
    document.getElementById("lenLabel").textContent = len;
    var sets = [];
    if (document.getElementById("useUpper").checked) sets.push("ABCDEFGHJKLMNPQRSTUVWXYZ");
    if (document.getElementById("useLower").checked) sets.push("abcdefghijkmnopqrstuvwxyz");
    if (document.getElementById("useNum").checked) sets.push("23456789");
    if (document.getElementById("useSym").checked) sets.push("!@#$%^&*()-_=+[]{}?");
    if (!sets.length) sets.push("abcdefghijkmnopqrstuvwxyz");
    var pool = sets.join("");
    var chars = [];
    sets.forEach(function(s){ chars.push(s[randIdx(s.length)]); });
    while (chars.length < len) chars.push(pool[randIdx(pool.length)]);
    for (var i = chars.length - 1; i > 0; i--) {
      var j = randIdx(i + 1);
      var tmp = chars[i]; chars[i] = chars[j]; chars[j] = tmp;
    }
    var pw = chars.slice(0, len).join("");
    var entropy = len * Math.log2(pool.length);
    var rating = entropy >= 100 ? "Very Strong" : entropy >= 70 ? "Strong" : entropy >= 50 ? "Moderate" : "Weak";
    document.getElementById("resultMain").textContent = pw;
    document.getElementById("entOut").textContent = entropy.toFixed(1) + " bits";
    document.getElementById("rateOut").textContent = rating;
    document.getElementById("poolOut").textContent = pool.length + " unique chars";
  }
  document.getElementById("genBtn").addEventListener("click", generate);
  document.getElementById("copyPwBtn").addEventListener("click", function(){
    var pw = document.getElementById("resultMain").textContent;
    if (navigator.clipboard) navigator.clipboard.writeText(pw);
    if (window.EMIMaster) window.EMIMaster.showToast("Password copied!");
  });
  ["pwLen","useUpper","useLower","useNum","useSym"].forEach(function(id){
    document.getElementById(id).addEventListener("input", generate);
    document.getElementById(id).addEventListener("change", generate);
  });
  generate();
})();`
  },

  // 11. Sales Tax Calculator
  {
    file: "sales-tax-calculator.html",
    title: "Sales Tax & Reverse Pre-Tax Calculator | EMI Master",
    description: "Calculate after-tax total price from subtotal and tax rate, or work backward from a tax-inclusive receipt to find the original pre-tax price and tax paid.",
    keywords: "sales tax calculator, reverse sales tax, vat calculator, pre tax price",
    schemaCategory: "FinanceApplication",
    catName: "Investment & Savings",
    catAnchor: "sitemap.html#investment",
    h1: "Sales Tax Calculator",
    subtitle: "Calculate total checkout price with sales tax/VAT, or reverse-calculate the before-tax price from a tax-inclusive receipt.",
    calculatorHtml: `
    <div class="unit-tabs" id="modeTabs">
      <button type="button" class="unit-tab active" data-m="forward">Before Tax &rarr; Total</button>
      <button type="button" class="unit-tab" data-m="reverse">Total Price &rarr; Pre-Tax (Reverse)</button>
    </div>
    <div class="card">
      <h2>Price &amp; Tax Rate</h2>
      <div class="form-grid">
        <div class="form-group"><label for="price" id="priceLbl">Before-Tax Price ($)</label><input type="number" id="price" value="250" min="0" step="0.01"></div>
        <div class="form-group"><label for="taxRate">Sales Tax / VAT Rate (%)</label><input type="number" id="taxRate" value="8.25" min="0" max="100" step="0.05"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3 id="resHdr">After-Tax Total Price</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Before-Tax Price</div><div class="value" id="preOut">—</div></div>
        <div class="result-item"><div class="label">Sales Tax Amount</div><div class="value negative" id="taxOut">—</div></div>
        <div class="result-item"><div class="label">Tax-Inclusive Total</div><div class="value" id="totOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Forward", v: "Total = Pre-Tax x (1 + Rate/100)" },
      { k: "Reverse", v: "Pre-Tax = Total / (1 + Rate/100)" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Avoiding the Common Reverse Sales Tax Mistake</h2>
      <p>If an item costs $108 including 8% tax, multiplying $108 by 8% incorrectly yields $8.64 instead of the true $8.00 tax. Always divide by <code>(1 + tax rate)</code> to isolate the genuine pre-tax base price.</p>
    </div>`,
    faqs: [
      { q: "How do I reverse-calculate VAT or GST from a total?", a: "Divide the gross receipt amount by (1 + VAT rate). For 15% VAT on a $115 receipt, the pre-tax price is $115 / 1.15 = $100." }
    ],
    related: [
      { href: "discount-calculator.html", label: "Discount Calculator", icon: "🏷️" },
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "tip-calculator.html", label: "Tip Calculator", icon: "🍽️" }
    ],
    script: `
(function(){
  var mode = "forward";
  document.querySelectorAll("#modeTabs .unit-tab").forEach(function(b){
    b.addEventListener("click", function(){
      document.querySelectorAll("#modeTabs .unit-tab").forEach(function(x){ x.classList.remove("active"); });
      b.classList.add("active");
      mode = b.getAttribute("data-m");
      document.getElementById("priceLbl").textContent = mode === "forward" ? "Before-Tax Price ($)" : "Tax-Inclusive Total Price ($)";
      document.getElementById("resHdr").textContent = mode === "forward" ? "After-Tax Total Price" : "Original Before-Tax Price";
      calc();
    });
  });
  function money(v){ return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function calc() {
    var p = parseFloat(document.getElementById("price").value) || 0;
    var r = (parseFloat(document.getElementById("taxRate").value) || 0) / 100;
    var pre, tax, tot;
    if (mode === "forward") { pre = p; tax = p * r; tot = p + tax; document.getElementById("resultMain").textContent = money(tot); }
    else { tot = p; pre = p / (1 + r); tax = tot - pre; document.getElementById("resultMain").textContent = money(pre); }
    document.getElementById("preOut").textContent = money(pre);
    document.getElementById("taxOut").textContent = money(tax);
    document.getElementById("totOut").textContent = money(tot);
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){ document.getElementById("price").value=250; document.getElementById("taxRate").value=8.25; calc(); });
  ["price","taxRate"].forEach(function(id){ document.getElementById(id).addEventListener("input", calc); });
  calc();
})();`
  },

  // 12. Discount Calculator
  {
    file: "discount-calculator.html",
    title: "Discount Calculator - Sale Price, Savings & Double Discounts | EMI Master",
    description: "Free shopping discount calculator. Compute sale price, total dollar savings, stacked extra clearance discounts, and optional sales tax.",
    keywords: "discount calculator, sale price calculator, double discount calculator, percent off",
    schemaCategory: "FinanceApplication",
    catName: "Investment & Savings",
    catAnchor: "sitemap.html#investment",
    h1: "Discount Calculator",
    subtitle: "Calculate final sale price, total money saved, stacked extra clearance discounts, and post-tax checkout totals.",
    calculatorHtml: `
    <div class="card">
      <h2>Original Price &amp; Discounts</h2>
      <div class="form-grid">
        <div class="form-group"><label for="origPrice">Original Price ($)</label><input type="number" id="origPrice" value="180" min="0" step="0.5"></div>
        <div class="form-group"><label for="disc1">Primary Discount (%)</label><input type="number" id="disc1" value="25" min="0" max="100" step="0.5"></div>
        <div class="form-group"><label for="disc2">Extra Clearance Discount (% optional)</label><input type="number" id="disc2" value="10" min="0" max="100" step="0.5"></div>
        <div class="form-group"><label for="taxPct">Sales Tax (% optional)</label><input type="number" id="taxPct" value="0" min="0" max="50" step="0.25"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Sale Price</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Final Checkout Price</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Total You Save</div><div class="value positive" id="savedOut">—</div></div>
        <div class="result-item"><div class="label">Effective Discount %</div><div class="value" id="effOut">—</div></div>
        <div class="result-item"><div class="label">Pre-Tax Sale Price</div><div class="value" id="preTaxOut">—</div></div>
      </div>
    </div>`,
    facts: [
      { k: "Stacked Discounts", v: "25% off + extra 10% off = 32.5% total off (not 35%)" },
      { k: "Formula", v: "Sale = Original x (1 - d1) x (1 - d2)" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Why Stacked Discounts Don't Simply Add Together</h2>
      <p>When a retailer advertises "25% off plus an extra 10% off," the second discount applies to the already-reduced price—not the original tag. On a $100 item, 25% off drops the price to $75, and 10% off $75 saves $7.50, making the final pre-tax price $67.50 (a true 32.5% discount).</p>
    </div>`,
    faqs: [
      { q: "Does a 20% + 20% discount equal 40% off?", a: "No. Applying 20% leaves 80%, and taking another 20% off 80% leaves 64%, which is a 36% total discount." }
    ],
    related: [
      { href: "sales-tax-calculator.html", label: "Sales Tax Calculator", icon: "🧾" },
      { href: "percentage-calculator.html", label: "Percentage Calculator", icon: "%" },
      { href: "tip-calculator.html", label: "Tip Calculator", icon: "🍽️" }
    ],
    script: `
(function(){
  function money(v){ return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function calc() {
    var orig = parseFloat(document.getElementById("origPrice").value) || 0;
    var d1 = (parseFloat(document.getElementById("disc1").value) || 0) / 100;
    var d2 = (parseFloat(document.getElementById("disc2").value) || 0) / 100;
    var tx = (parseFloat(document.getElementById("taxPct").value) || 0) / 100;
    var preTax = orig * (1 - d1) * (1 - d2);
    var saved = orig - preTax;
    var eff = orig > 0 ? (saved / orig) * 100 : 0;
    var finalTot = preTax * (1 + tx);
    document.getElementById("resultMain").textContent = money(finalTot);
    document.getElementById("savedOut").textContent = money(saved);
    document.getElementById("effOut").textContent = eff.toFixed(2) + "%";
    document.getElementById("preTaxOut").textContent = money(preTax);
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("origPrice").value=180; document.getElementById("disc1").value=25;
    document.getElementById("disc2").value=10; document.getElementById("taxPct").value=0; calc();
  });
  ["origPrice","disc1","disc2","taxPct"].forEach(function(id){ document.getElementById(id).addEventListener("input", calc); });
  calc();
})();`
  },

  // 13. Inflation & Purchasing Power Calculator
  {
    file: "inflation-calculator.html",
    title: "Inflation & Purchasing Power Calculator | EMI Master",
    description: "Calculate how inflation erodes purchasing power or increases future living expenses over 5 to 40 years with a year-by-year table.",
    keywords: "inflation calculator, purchasing power calculator, future cost inflation, cpi calculator",
    schemaCategory: "FinanceApplication",
    catName: "Investment & Savings",
    catAnchor: "sitemap.html#investment",
    h1: "Inflation & Purchasing Power Calculator",
    subtitle: "Project future prices and measure how annual inflation erodes the buying power of cash over time.",
    calculatorHtml: `
    <div class="card">
      <h2>Inflation Parameters</h2>
      <div class="form-grid">
        <div class="form-group"><label for="amount">Current Dollar Amount ($)</label><input type="number" id="amount" value="10000" min="0" step="100"></div>
        <div class="form-group"><label for="infRate">Annual Inflation Rate (%)</label><input type="number" id="infRate" value="3.2" min="0" max="50" step="0.1"></div>
        <div class="form-group"><label for="years">Time Horizon (Years)</label><input type="number" id="years" value="15" min="1" max="60" step="1"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Inflation Impact</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Equivalent Future Cost Needed</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Today's Buying Power in Year <span id="yrSpan">15</span></div><div class="value negative" id="powOut">—</div></div>
        <div class="result-item"><div class="label">Cumulative Price Increase</div><div class="value" id="cumOut">—</div></div>
        <div class="result-item"><div class="label">Rule of 70 (Halving Time)</div><div class="value" id="halfOut">—</div></div>
      </div>
    </div>
    <div class="card">
      <h2>Year-by-Year Inflation Schedule</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Year</th><th class="num">Equivalent Future Price</th><th class="num">Buying Power of Initial Cash</th></tr></thead>
          <tbody id="infBody"></tbody>
        </table>
      </div>
    </div>`,
    facts: [
      { k: "Future Price", v: "Current x (1 + r)^t" },
      { k: "Purchasing Power", v: "Current / (1 + r)^t" },
      { k: "Rule of 70", v: "70 / inflation% approx years to halve buying power" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Why Inflation Must Factor Into Retirement &amp; Savings</h2>
      <p>Even a modest 3.2% annual inflation rate doubles living expenses every ~22 years. Keeping long-term savings in a 0% checking account guarantees steady purchasing-power erosion. Pair this tool with the <a href="compound-interest-calculator.html">Compound Interest Calculator</a> to compare nominal vs. inflation-adjusted returns.</p>
    </div>`,
    faqs: [
      { q: "What is the historical average US inflation rate?", a: "Over the past century, US Consumer Price Index (CPI) inflation has averaged roughly 3.0% to 3.3% per year." }
    ],
    related: [
      { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
      { href: "retirement-calculator.html", label: "Retirement Calculator", icon: "🏖️" },
      { href: "future-value-calculator.html", label: "Future Value Calculator", icon: "🔮" }
    ],
    script: `
(function(){
  function money(v){ return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function calc() {
    var amt = parseFloat(document.getElementById("amount").value) || 0;
    var r = (parseFloat(document.getElementById("infRate").value) || 0) / 100;
    var yrs = Math.min(60, Math.max(1, parseInt(document.getElementById("years").value, 10) || 15));
    var fut = amt * Math.pow(1 + r, yrs);
    var pow = amt / Math.pow(1 + r, yrs);
    var cumPct = (Math.pow(1 + r, yrs) - 1) * 100;
    var halfYrs = r > 0 ? (70 / (r * 100)).toFixed(1) + " yrs" : "Never";
    document.getElementById("yrSpan").textContent = yrs;
    document.getElementById("resultMain").textContent = money(fut);
    document.getElementById("powOut").textContent = money(pow);
    document.getElementById("cumOut").textContent = "+" + cumPct.toFixed(1) + "%";
    document.getElementById("halfOut").textContent = halfYrs;
    var rows = "";
    for (var y = 1; y <= yrs; y++) {
      rows += "<tr><td>Year " + y + "</td><td class='num'>" + money(amt * Math.pow(1+r, y)) + "</td><td class='num'>" + money(amt / Math.pow(1+r, y)) + "</td></tr>";
    }
    document.getElementById("infBody").innerHTML = rows;
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("amount").value=10000; document.getElementById("infRate").value=3.2; document.getElementById("years").value=15; calc();
  });
  ["amount","infRate","years"].forEach(function(id){ document.getElementById(id).addEventListener("input", calc); });
  calc();
})();`
  },

  // 14. Credit Card Payoff Calculator
  {
    file: "credit-card-payoff-calculator.html",
    title: "Credit Card Payoff Calculator - Payoff Timeline & Interest Saved | EMI Master",
    description: "Calculate how many months it takes to pay off your credit card balance, total interest charged, and how much extra monthly payments save.",
    keywords: "credit card payoff calculator, credit card interest calculator, debt payoff timeline",
    schemaCategory: "FinanceApplication",
    catName: "Loan & EMI Calculators",
    catAnchor: "sitemap.html#loans",
    h1: "Credit Card Payoff Calculator",
    subtitle: "See your exact debt-free date, total interest cost, and how boosting your monthly payment cuts years off payoff.",
    calculatorHtml: `
    <div class="card">
      <h2>Card Balance &amp; Payment Plan</h2>
      <div class="form-grid">
        <div class="form-group"><label for="bal">Credit Card Balance ($)</label><input type="number" id="bal" value="6500" min="0" step="100"></div>
        <div class="form-group"><label for="apr">Interest Rate (APR %)</label><input type="number" id="apr" value="21.9" min="0" max="60" step="0.1"></div>
        <div class="form-group"><label for="pmt">Planned Monthly Payment ($)</label><input type="number" id="pmt" value="250" min="1" step="10"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Payoff</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Time to Debt-Free</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Total Interest Paid</div><div class="value negative" id="intOut">—</div></div>
        <div class="result-item"><div class="label">Total Paid</div><div class="value" id="totOut">—</div></div>
        <div class="result-item"><div class="label">Estimated Payoff Date</div><div class="value positive" id="dateOut">—</div></div>
      </div>
      <div class="payoff-note" id="ccNote"></div>
    </div>
    <div class="card">
      <h2>Payoff Schedule</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>Month</th><th class="num">Payment</th><th class="num">Principal</th><th class="num">Interest</th><th class="num">Remaining Balance</th></tr></thead>
          <tbody id="ccBody"></tbody>
        </table>
      </div>
    </div>`,
    facts: [
      { k: "Compounding", v: "Monthly periodic rate = APR / 12" },
      { k: "Strategy", v: "Paying even +$50/mo above minimum slashes interest" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Escaping the High-APR Minimum Payment Trap</h2>
      <p>Credit cards carry some of the highest interest rates in consumer finance (19%–29% APR). Whenever your monthly payment barely clears monthly accrued interest, principal reduction stalls. Read our <a href="blog-debt-avalanche-vs-snowball.html">Debt Snowball vs. Debt Avalanche Guide</a> to eliminate balances systematically.</p>
    </div>`,
    faqs: [
      { q: "What happens if my monthly payment is lower than the first month's interest?", a: "Your balance grows instead of shrinking—negative amortization. Increasing your payment above the monthly interest charge is essential." }
    ],
    related: [
      { href: "loan-payoff.html", label: "Loan Payoff Calculator", icon: "⏱️" },
      { href: "debt-to-income.html", label: "Debt-to-Income Calculator", icon: "⚖️" },
      { href: "blog-debt-avalanche-vs-snowball.html", label: "Guide: Avalanche vs Snowball", icon: "📘" }
    ],
    script: `
(function(){
  function money(v){ return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function calc() {
    var bal = parseFloat(document.getElementById("bal").value) || 0;
    var apr = parseFloat(document.getElementById("apr").value) || 0;
    var pmt = parseFloat(document.getElementById("pmt").value) || 0;
    var mr = apr / 100 / 12;
    if (bal <= 0 || pmt <= 0) return;
    if (pmt <= bal * mr) {
      document.getElementById("resultMain").textContent = "Payment too low (covers < 1 mo interest)";
      document.getElementById("ccNote").textContent = "Monthly interest alone is " + money(bal * mr) + ". Increase payment above this to pay down debt.";
      document.getElementById("ccBody").innerHTML = "";
      return;
    }
    var m = 0, totInt = 0, totPaid = 0, b = bal, rows = "";
    while (b > 0.005 && m < 600) {
      m++;
      var interest = b * mr;
      var actualPmt = Math.min(pmt, b + interest);
      var prin = actualPmt - interest;
      b = Math.max(0, b - prin);
      totInt += interest;
      totPaid += actualPmt;
      if (m <= 120) {
        rows += "<tr><td>Month " + m + "</td><td class='num'>" + money(actualPmt) + "</td><td class='num'>" + money(prin) + "</td><td class='num'>" + money(interest) + "</td><td class='num'>" + money(b) + "</td></tr>";
      }
    }
    var yrs = Math.floor(m / 12), remM = m % 12;
    var timeStr = yrs > 0 ? (yrs + " yr" + (yrs>1?"s":"") + (remM ? " " + remM + " mo" : "")) : (m + " months");
    var payoffDt = new Date(); payoffDt.setMonth(payoffDt.getMonth() + m);
    document.getElementById("resultMain").textContent = timeStr + " (" + m + " payments)";
    document.getElementById("intOut").textContent = money(totInt);
    document.getElementById("totOut").textContent = money(totPaid);
    document.getElementById("dateOut").textContent = payoffDt.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    document.getElementById("ccNote").textContent = "Adding $50/mo extra cuts payoff time and saves significant interest.";
    document.getElementById("ccBody").innerHTML = rows;
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("bal").value=6500; document.getElementById("apr").value=21.9; document.getElementById("pmt").value=250; calc();
  });
  ["bal","apr","pmt"].forEach(function(id){ document.getElementById(id).addEventListener("input", calc); });
  calc();
})();`
  },

  // 15. Standard Deviation & Statistics Calculator
  {
    file: "standard-deviation-calculator.html",
    title: "Standard Deviation Calculator - Sample, Population, Mean & Variance | EMI Master",
    description: "Free statistics and standard deviation calculator. Compute sample and population SD, variance, mean, median, mode, range, and 95% confidence margin.",
    keywords: "standard deviation calculator, variance calculator, mean median mode calculator, statistics calculator",
    schemaCategory: "EducationalApplication",
    catName: "Math & Scientific",
    catAnchor: "sitemap.html#math",
    h1: "Standard Deviation Calculator",
    subtitle: "Compute sample & population standard deviation, variance, mean, median, mode, sum, and squared-deviation steps.",
    calculatorHtml: `
    <div class="card">
      <h2>Dataset Values</h2>
      <div class="form-group">
        <label for="dataset">Enter numbers separated by commas, spaces, or newlines</label>
        <textarea id="dataset" rows="4" style="width:100%;padding:10px 12px;border:1px solid var(--border);border-radius:8px;background:var(--card-bg);color:var(--text);font-family:var(--font-mono);">10, 12, 23, 23, 16, 23, 21, 16</textarea>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Calculate Statistics</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Sample Standard Deviation (s)</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Population SD (&sigma;)</div><div class="value" id="popOut">—</div></div>
        <div class="result-item"><div class="label">Mean / Median</div><div class="value" id="meanOut">—</div></div>
        <div class="result-item"><div class="label">Sample Variance (s&sup2;)</div><div class="value" id="varOut">—</div></div>
      </div>
      <div class="payoff-note" id="statExtra"></div>
    </div>`,
    facts: [
      { k: "Sample SD", v: "Uses Bessel correction (N - 1)" },
      { k: "Population SD", v: "Divides squared deviations by N" },
      { k: "Metrics", v: "Count, Sum, Mean, Median, Mode, Range, SEM" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Sample vs. Population Standard Deviation</h2>
      <p>Use <strong>Sample Standard Deviation (s)</strong> when your numbers represent a subset drawn from a larger population (standard in science labs and surveys; divides by <code>N - 1</code>). Use <strong>Population Standard Deviation (&sigma;)</strong> when your dataset contains every single member of the group (divides by <code>N</code>).</p>
    </div>`,
    faqs: [
      { q: "Why does Sample SD divide by N - 1 instead of N?", a: "Dividing by N - 1 (Bessel's correction) removes downward bias when estimating true population spread from a smaller sample." }
    ],
    related: [
      { href: "percent-error-calculator.html", label: "Percent Error Calculator", icon: "🎯" },
      { href: "average-return-calculator.html", label: "Average Return Calculator", icon: "📊" },
      { href: "scientific-calculator.html", label: "Scientific Calculator", icon: "📐" }
    ],
    script: `
(function(){
  function calc() {
    var raw = document.getElementById("dataset").value;
    var nums = raw.split(/[\s,;]+/).map(Number).filter(function(x){ return isFinite(x) && raw.trim() !== ""; });
    if (nums.length < 1) {
      document.getElementById("resultMain").textContent = "Enter at least 1 number";
      return;
    }
    var n = nums.length;
    var sum = nums.reduce(function(a,b){ return a + b; }, 0);
    var mean = sum / n;
    var sqDiff = nums.reduce(function(a,b){ return a + Math.pow(b - mean, 2); }, 0);
    var popVar = sqDiff / n;
    var samVar = n > 1 ? sqDiff / (n - 1) : 0;
    var popSd = Math.sqrt(popVar);
    var samSd = Math.sqrt(samVar);
    var sorted = nums.slice().sort(function(a,b){ return a - b; });
    var median = n % 2 ? sorted[(n-1)/2] : (sorted[n/2 - 1] + sorted[n/2]) / 2;
    var sem = samSd / Math.sqrt(n);
    document.getElementById("resultMain").textContent = samSd.toFixed(6).replace(/\\.?0+$/,"");
    document.getElementById("popOut").textContent = popSd.toFixed(6).replace(/\\.?0+$/,"");
    document.getElementById("meanOut").textContent = mean.toFixed(4).replace(/\\.?0+$/,"") + " / " + median;
    document.getElementById("varOut").textContent = samVar.toFixed(4).replace(/\\.?0+$/,"");
    document.getElementById("statExtra").textContent = "Count: " + n + " · Sum: " + sum + " · Min/Max: " + sorted[0] + " / " + sorted[n-1] + " · Std Error (SEM): " + sem.toFixed(4);
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("dataset").value = "10, 12, 23, 23, 16, 23, 21, 16"; calc();
  });
  document.getElementById("dataset").addEventListener("input", calc);
  calc();
})();`
  },

  // 16. Triangle Calculator (SSS / SAS / ASA with live SVG diagram!)
  {
    file: "triangle-calculator.html",
    title: "Triangle Calculator - Sides, Angles, Area & SVG Visualizer | EMI Master",
    description: "Free geometry triangle solver. Enter 3 sides (SSS) or 2 sides & angle (SAS) to compute all missing angles, perimeter, area, height, and see a live SVG triangle.",
    keywords: "triangle calculator, triangle solver, area of triangle, law of cosines calculator",
    schemaCategory: "EducationalApplication",
    catName: "Math & Scientific",
    catAnchor: "sitemap.html#math",
    h1: "Triangle Calculator",
    subtitle: "Solve all sides, interior angles, perimeter, and area using SSS or SAS with a live proportional SVG triangle diagram.",
    calculatorHtml: `
    <div class="unit-tabs" id="triMode">
      <button type="button" class="unit-tab active" data-m="sss">3 Sides (SSS)</button>
      <button type="button" class="unit-tab" data-m="sas">2 Sides &amp; Angle (SAS)</button>
    </div>
    <div class="card">
      <h2>Triangle Dimensions</h2>
      <div class="form-grid">
        <div class="form-group"><label for="sideA">Side a</label><input type="number" id="sideA" value="5" min="0.01" step="any"></div>
        <div class="form-group"><label for="sideB">Side b</label><input type="number" id="sideB" value="6" min="0.01" step="any"></div>
        <div class="form-group" id="sideCGroup"><label for="sideC">Side c</label><input type="number" id="sideC" value="7" min="0.01" step="any"></div>
        <div class="form-group" id="angCGroup" style="display:none;"><label for="angC">Included Angle C (degrees)</label><input type="number" id="angC" value="60" min="0.1" max="179.9" step="any"></div>
      </div>
      <div class="form-actions">
        <button class="btn btn-primary" id="calculateBtn" type="button">Solve Triangle</button>
        <button class="btn btn-outline" id="resetBtn" type="button">Reset (5-6-7)</button>
      </div>
    </div>
    <div class="result-panel" id="resultPanel">
      <h3>Triangle Solution</h3>
      <div class="result-main" id="resultMain">—</div>
      <div class="result-grid">
        <div class="result-item"><div class="label">Interior Angles (A, B, C)</div><div class="value" id="angOut">—</div></div>
        <div class="result-item"><div class="label">Perimeter</div><div class="value" id="perimOut">—</div></div>
        <div class="result-item"><div class="label">Type</div><div class="value" id="typeOut">—</div></div>
      </div>
      <div style="margin-top:16px;text-align:center;">
        <svg id="triSvg" viewBox="0 0 320 200" style="max-width:340px;width:100%;height:auto;background:var(--bg);border:1px solid var(--border);border-radius:10px;" aria-label="Triangle diagram"></svg>
      </div>
    </div>`,
    facts: [
      { k: "SSS Solver", v: "Heron's Area + Law of Cosines" },
      { k: "SAS Solver", v: "c^2 = a^2 + b^2 - 2ab cos(C)" },
      { k: "Angle Sum", v: "A + B + C = 180 degrees" }
    ],
    editorialHtml: `
    <div class="content-section">
      <h2>Solving Any Triangle with Law of Cosines &amp; Heron's Formula</h2>
      <p>Given all three sides (SSS) where the sum of any two sides exceeds the third, Heron's formula computes exact area directly from the semiperimeter <code>s = (a + b + c)/2</code>, while the Law of Cosines resolves every interior angle accurately.</p>
    </div>`,
    faqs: [
      { q: "What makes three side lengths an invalid triangle?", a: "Under the Triangle Inequality Theorem, the sum of the two shortest sides must be strictly greater than the longest side." }
    ],
    related: [
      { href: "root-calculator.html", label: "Root Calculator", icon: "√" },
      { href: "quadratic-formula-calculator.html", label: "Quadratic Solver", icon: "🧮" },
      { href: "scientific-calculator.html", label: "Scientific Calculator", icon: "📐" }
    ],
    script: `
(function(){
  var mode = "sss";
  document.querySelectorAll("#triMode .unit-tab").forEach(function(b){
    b.addEventListener("click", function(){
      document.querySelectorAll("#triMode .unit-tab").forEach(function(x){ x.classList.remove("active"); });
      b.classList.add("active");
      mode = b.getAttribute("data-m");
      document.getElementById("sideCGroup").style.display = mode === "sss" ? "" : "none";
      document.getElementById("angCGroup").style.display = mode === "sas" ? "" : "none";
      calc();
    });
  });
  function calc() {
    var a = parseFloat(document.getElementById("sideA").value);
    var b = parseFloat(document.getElementById("sideB").value);
    var c, Cdeg;
    if (mode === "sss") {
      c = parseFloat(document.getElementById("sideC").value);
      if (!(a > 0 && b > 0 && c > 0 && a + b > c && a + c > b && b + c > a)) {
        document.getElementById("resultMain").textContent = "Invalid triangle inequality (sum of 2 sides must exceed 3rd)";
        document.getElementById("triSvg").innerHTML = "";
        return;
      }
      Cdeg = Math.acos(Math.min(1, Math.max(-1, (a*a + b*b - c*c)/(2*a*b)))) * 180 / Math.PI;
    } else {
      Cdeg = parseFloat(document.getElementById("angC").value);
      if (!(a > 0 && b > 0 && Cdeg > 0 && Cdeg < 180)) return;
      c = Math.sqrt(a*a + b*b - 2*a*b*Math.cos(Cdeg * Math.PI / 180));
    }
    var Adeg = Math.acos(Math.min(1, Math.max(-1, (b*b + c*c - a*a)/(2*b*c)))) * 180 / Math.PI;
    var Bdeg = 180 - Adeg - Cdeg;
    var s = (a + b + c) / 2;
    var area = Math.sqrt(Math.max(0, s*(s-a)*(s-b)*(s-c)));
    var sideType = (Math.abs(a-b)<1e-6 && Math.abs(b-c)<1e-6) ? "Equilateral" : (Math.abs(a-b)<1e-6||Math.abs(b-c)<1e-6||Math.abs(a-c)<1e-6) ? "Isosceles" : "Scalene";
    var maxAng = Math.max(Adeg, Bdeg, Cdeg);
    var angType = Math.abs(maxAng - 90) < 0.05 ? "Right" : maxAng > 90 ? "Obtuse" : "Acute";

    document.getElementById("resultMain").textContent = "Area = " + area.toFixed(3) + " sq units";
    document.getElementById("angOut").textContent = Adeg.toFixed(1) + "°, " + Bdeg.toFixed(1) + "°, " + Cdeg.toFixed(1) + "°";
    document.getElementById("perimOut").textContent = (a + b + c).toFixed(3);
    document.getElementById("typeOut").textContent = angType + " " + sideType;

    // Draw proportional SVG triangle inside 320x200
    var radA = Adeg * Math.PI / 180;
    var x0 = 0, y0 = 0;
    var x1 = c, y1 = 0;
    var x2 = b * Math.cos(radA), y2 = b * Math.sin(radA);
    var minX = Math.min(x0,x1,x2), maxX = Math.max(x0,x1,x2);
    var minY = Math.min(y0,y1,y2), maxY = Math.max(y0,y1,y2);
    var scale = Math.min(250 / (maxX - minX || 1), 140 / (maxY - minY || 1));
    function px(x){ return 35 + (x - minX) * scale; }
    function py(y){ return 170 - (y - minY) * scale; }
    var p0 = px(x0).toFixed(1)+","+py(y0).toFixed(1);
    var p1 = px(x1).toFixed(1)+","+py(y1).toFixed(1);
    var p2 = px(x2).toFixed(1)+","+py(y2).toFixed(1);
    document.getElementById("triSvg").innerHTML =
      "<polygon points='"+p0+" "+p1+" "+p2+"' fill='rgba(30,64,175,0.12)' stroke='#1e40af' stroke-width='2.5'/>" +
      "<text x='"+((px(x0)+px(x1))/2)+"' y='"+(py(0)+16)+"' text-anchor='middle' font-size='12' fill='currentColor'>c="+c.toFixed(2)+"</text>";
  }
  document.getElementById("calculateBtn").addEventListener("click", calc);
  document.getElementById("resetBtn").addEventListener("click", function(){
    document.getElementById("sideA").value=5; document.getElementById("sideB").value=6; document.getElementById("sideC").value=7; document.getElementById("angC").value=60; calc();
  });
  ["sideA","sideB","sideC","angC"].forEach(function(id){ document.getElementById(id).addEventListener("input", calc); });
  calc();
})();`
  }
];

let count = 0;
for (const cfg of CALCS) {
  fs.writeFileSync(path.join(root, cfg.file), buildCalculatorPage(cfg), "utf8");
  count++;
}
console.log("Generated " + count + " Everyday, Financial & Math calculators.");
