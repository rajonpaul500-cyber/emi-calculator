/* ==========================================================================
   EMI Master - Advanced Rent Calculator (calculator.net style)
   Three comprehensive calculation engines:
     1. 'afford': How Much Rent Can I Afford? (30% rule, 40x rule, 50/30/20, DTI 43%, Custom)
     2. 'required': Required Income to Rent an Apartment (40x rule, 3x monthly, hourly wage)
     3. 'roommate': Roommate Rent Split Calculator (equal, sq ft, amenities, income-weighted)
   Features:
     - 4 Quick Renter Profiles (Starter, Urban Pro, Couple, Frugal)
     - Complete Move-in Cash Estimator (Deposit, First/Last month, Broker, Moving)
     - Multi-Rule Benchmark Comparison Table
     - Interactive Canvas Visual Charts (Income Allocation Donut & Rule Comparison Bar)
     - Export to CSV, Print Summary, and Copy Summary to Clipboard
   ========================================================================== */

(function () {
  'use strict';

  var $ = function (id) { return document.getElementById(id); };

  function fmt(v) {
    if (window.I18N && window.I18N.fmt) return window.I18N.fmt(v);
    return '$' + Math.round(v).toLocaleString('en-US');
  }

  function fmtDec(v) {
    var sym = (window.I18N && window.I18N.currencySymbol) ? window.I18N.currencySymbol() : '$';
    return sym + ' ' + Number(v).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function num(id) {
    var el = $(id);
    return el ? (parseFloat(el.value) || 0) : 0;
  }

  function setText(id, text) {
    var el = $(id);
    if (el) el.textContent = text;
  }

  var currentMode = 'afford'; // 'afford' | 'required' | 'roommate'
  var currentChartTab = 'budget'; // 'budget' | 'rules'
  var lastAffordResult = null;
  var lastRequiredResult = null;
  var lastRoommateResult = null;

  /* Mode 1: Affordability Engine */
  function solveAffordability() {
    var rawIncome = num('rentIncome');
    var incomeFreq = $('rentIncomeFreq') ? $('rentIncomeFreq').value : 'annual';
    var annualGross = (incomeFreq === 'monthly') ? rawIncome * 12 : rawIncome;
    var monthlyGross = annualGross / 12;

    var debts = num('rentDebts');
    var utilities = num('rentUtilities');
    var insurance = num('rentInsurance');
    var taxRatePct = num('rentTaxRate') || 22; // estimated effective tax rate
    var takeHomeRatio = Math.max(0.4, 1 - (taxRatePct / 100));
    var monthlyNet = monthlyGross * takeHomeRatio;

    var ruleKey = $('rentRule') ? $('rentRule').value : '30pct';
    var affordableRent = 0;
    var ruleLabel = '';

    if (ruleKey === '30pct') {
      affordableRent = monthlyGross * 0.30;
      ruleLabel = '30% of Gross Income';
    } else if (ruleKey === '40x') {
      affordableRent = annualGross / 40;
      ruleLabel = '40x Landlord Screening Rule';
    } else if (ruleKey === 'conservative') {
      affordableRent = monthlyGross * 0.20;
      ruleLabel = '20% Conservative Rule';
    } else if (ruleKey === 'balanced') {
      affordableRent = monthlyGross * 0.25;
      ruleLabel = '25% Balanced Budget Rule';
    } else if (ruleKey === 'aggressive') {
      affordableRent = monthlyGross * 0.35;
      ruleLabel = '35% High-Cost City Rule';
    } else if (ruleKey === 'dti43') {
      // Total Debt + Rent + Utilities + Insurance <= 43% of Gross
      var maxHousingDebt = monthlyGross * 0.43;
      affordableRent = Math.max(0, maxHousingDebt - debts - utilities - insurance);
      ruleLabel = '43% Total Debt-to-Income (DTI) Cap';
    } else if (ruleKey === '503020') {
      // 50% of take-home for needs (Rent + Utilities + Insurance + Debts + $400 basic food/essentials)
      var maxNeeds = monthlyNet * 0.50;
      affordableRent = Math.max(0, maxNeeds - debts - utilities - insurance);
      ruleLabel = '50/30/20 Budgeting Rule (50% Needs)';
    } else if (ruleKey === 'custom') {
      var customPct = (num('customRentPct') || 30) / 100;
      affordableRent = monthlyGross * customPct;
      ruleLabel = 'Custom ' + (customPct * 100).toFixed(0) + '% Rule';
    }

    var totalMonthlyHousing = affordableRent + utilities + insurance;
    var annualRent = affordableRent * 12;
    var annualTotalHousing = totalMonthlyHousing * 12;

    // Remaining cash flows from monthly net take-home
    var remainingNet = Math.max(0, monthlyNet - totalMonthlyHousing - debts);
    var housingPctGross = monthlyGross > 0 ? (totalMonthlyHousing / monthlyGross) * 100 : 0;
    var housingPctNet = monthlyNet > 0 ? (totalMonthlyHousing / monthlyNet) * 100 : 0;
    var totalDti = monthlyGross > 0 ? ((totalMonthlyHousing + debts) / monthlyGross) * 100 : 0;

    // Multi-Rule Benchmark Scenarios Table
    var ruleTiers = [
      { key: '20pct', name: 'Conservative (20%)', pct: 0.20, rent: monthlyGross * 0.20, note: 'Ideal for rapid investing & debt elimination' },
      { key: '25pct', name: 'Balanced Budget (25%)', pct: 0.25, rent: monthlyGross * 0.25, note: 'Comfortable financial breathing room' },
      { key: '30pct', name: 'Standard 30% Rule', pct: 0.30, rent: monthlyGross * 0.30, note: 'Nationwide standard benchmark' },
      { key: '40x',   name: '40x Rule (Landlord Standard)', pct: 0.30, rent: annualGross / 40, note: 'Standard landlord qualification screening' },
      { key: '35pct', name: 'High-Cost Urban (35%)', pct: 0.35, rent: monthlyGross * 0.35, note: 'Common in NYC, SF, Boston, London' },
      { key: '43dti', name: 'Max DTI Limit (43%)', pct: 0.43, rent: Math.max(0, monthlyGross * 0.43 - debts - utilities - insurance), note: 'Maximum upper debt qualification ceiling' }
    ];

    // Upfront Move-In Cost Calculation
    var firstMonth = affordableRent;
    var secDepositMonths = num('upfrontSecMonths') || 1;
    var securityDeposit = affordableRent * secDepositMonths;
    var lastMonth = $('upfrontLastMonth') && $('upfrontLastMonth').checked ? affordableRent : 0;
    var brokerType = $('upfrontBrokerType') ? $('upfrontBrokerType').value : 'none';
    var brokerFee = 0;
    if (brokerType === 'oneMonth') brokerFee = affordableRent;
    else if (brokerType === 'fifteenPct') brokerFee = annualRent * 0.15;
    var movingCost = num('upfrontMoving') || 0;
    var utilitySetup = num('upfrontUtilitySetup') || 0;
    var totalMoveInCash = firstMonth + securityDeposit + lastMonth + brokerFee + movingCost + utilitySetup;

    return {
      annualGross: annualGross,
      monthlyGross: monthlyGross,
      monthlyNet: monthlyNet,
      debts: debts,
      utilities: utilities,
      insurance: insurance,
      affordableRent: affordableRent,
      totalMonthlyHousing: totalMonthlyHousing,
      annualRent: annualRent,
      annualTotalHousing: annualTotalHousing,
      remainingNet: remainingNet,
      housingPctGross: housingPctGross,
      housingPctNet: housingPctNet,
      totalDti: totalDti,
      ruleLabel: ruleLabel,
      ruleTiers: ruleTiers,
      moveIn: {
        firstMonth: firstMonth,
        securityDeposit: securityDeposit,
        lastMonth: lastMonth,
        brokerFee: brokerFee,
        movingCost: movingCost,
        utilitySetup: utilitySetup,
        total: totalMoveInCash
      }
    };
  }

  /* Mode 2: Required Income Engine */
  function solveRequiredIncome() {
    var targetRent = num('targetRent');
    var util = num('targetUtilities');
    var ins = num('targetInsurance');
    var debts = num('targetDebts');
    var standard = $('targetStandard') ? $('targetStandard').value : '40x';

    var reqAnnual = 0;
    var reqMonthly = 0;
    var ruleDesc = '';

    if (standard === '40x') {
      reqAnnual = targetRent * 40;
      reqMonthly = reqAnnual / 12;
      ruleDesc = 'Landlord 40x Rule (Annual income = 40 × Monthly rent)';
    } else if (standard === '30pct') {
      reqMonthly = (targetRent + util + ins) / 0.30;
      reqAnnual = reqMonthly * 12;
      ruleDesc = '30% Housing Rule (Rent + Utilities ≤ 30% of gross)';
    } else if (standard === '3xMonthly') {
      reqMonthly = targetRent * 3;
      reqAnnual = reqMonthly * 12;
      ruleDesc = '3x Monthly Rent Rule (Common suburban landlord rule)';
    } else if (standard === 'dti43') {
      reqMonthly = (targetRent + util + ins + debts) / 0.43;
      reqAnnual = reqMonthly * 12;
      ruleDesc = '43% Total Debt-to-Income Cap (Including current loans)';
    }

    var hourlyWage = reqAnnual / 2080; // 40 hrs/wk * 52 wks
    var weeklyWage = reqAnnual / 52;
    var annualRent = targetRent * 12;
    var totalMonthlyHousing = targetRent + util + ins;

    return {
      targetRent: targetRent,
      util: util,
      ins: ins,
      debts: debts,
      reqAnnual: reqAnnual,
      reqMonthly: reqMonthly,
      hourlyWage: hourlyWage,
      weeklyWage: weeklyWage,
      annualRent: annualRent,
      totalMonthlyHousing: totalMonthlyHousing,
      ruleDesc: ruleDesc
    };
  }

  /* Mode 3: Roommate Rent Split Engine */
  function solveRoommateSplit() {
    var totalRent = num('roommateTotalRent');
    var count = parseInt($('roommateCount') ? $('roommateCount').value : '2', 10) || 2;
    var method = $('roommateMethod') ? $('roommateMethod').value : 'sqft';

    var roommates = [];
    var sumShares = 0;

    for (var i = 1; i <= count; i++) {
      var name = ($('rmName' + i) && $('rmName' + i).value.trim()) || ('Roommate ' + i);
      var sqft = num('rmSqft' + i) || 150;
      var hasBath = $('rmBath' + i) && $('rmBath' + i).checked;
      var hasBalcony = $('rmBalcony' + i) && $('rmBalcony' + i).checked;
      var hasParking = $('rmParking' + i) && $('rmParking' + i).checked;
      var income = num('rmIncome' + i) || 50000;

      roommates.push({
        idx: i,
        name: name,
        sqft: sqft,
        hasBath: hasBath,
        hasBalcony: hasBalcony,
        hasParking: hasParking,
        income: income,
        share: 0
      });
    }

    if (method === 'equal') {
      var eq = totalRent / count;
      roommates.forEach(function (r) { r.share = eq; });
    } else if (method === 'income') {
      var totalIncome = 0;
      roommates.forEach(function (r) { totalIncome += r.income; });
      if (totalIncome <= 0) totalIncome = 1;
      roommates.forEach(function (r) {
        r.share = (r.income / totalIncome) * totalRent;
      });
    } else {
      // Square Footage & Amenities Method
      // 50% of rent is common shared space (split equally), 50% is private space weighted by sqft + amenity points
      var commonRent = totalRent * 0.40;
      var privateRent = totalRent * 0.60;
      var equalBase = commonRent / count;

      var totalPoints = 0;
      roommates.forEach(function (r) {
        var pts = r.sqft;
        if (r.hasBath) pts += 40; // private bath equal to ~40 sqft
        if (r.hasBalcony) pts += 20;
        if (r.hasParking) pts += 25;
        r.points = pts;
        totalPoints += pts;
      });

      if (totalPoints <= 0) totalPoints = 1;

      roommates.forEach(function (r) {
        r.share = equalBase + (r.points / totalPoints) * privateRent;
      });
    }

    return {
      totalRent: totalRent,
      count: count,
      method: method,
      roommates: roommates
    };
  }

  /* Render Affordability Output */
  function renderAffordUI(res) {
    if (!res) return;

    setText('affordResultMain', fmt(res.affordableRent));
    var comfortableMin = Math.round(res.affordableRent * 0.85);
    setText('affordHeroRange', 'Comfortable rent range: ' + fmt(comfortableMin) + ' – ' + fmt(res.affordableRent) + ' / month');
    setText('affordRuleLabel', 'Calculated using: ' + res.ruleLabel);

    // 4 Top Metric Cards
    setText('statAffordRent', fmt(res.affordableRent));
    setText('statTotalHousing', fmt(res.totalMonthlyHousing) + ' / mo');
    setText('statRemainingCash', fmt(res.remainingNet) + ' / mo');
    setText('statUpfrontCash', fmt(res.moveIn.total));

    // Budget Breakdown Table
    setText('bbRent', fmtDec(res.affordableRent));
    setText('bbUtil', fmtDec(res.utilities));
    setText('bbIns', fmtDec(res.insurance));
    setText('bbTotalHousing', fmtDec(res.totalMonthlyHousing));
    setText('bbDebts', fmtDec(res.debts));
    setText('bbNetIncome', fmtDec(res.monthlyNet));
    setText('bbRemaining', fmtDec(res.remainingNet));

    var totalH = res.totalMonthlyHousing || 1;
    setText('pctBbRent', ((res.affordableRent / totalH) * 100).toFixed(1) + '%');
    setText('pctBbUtil', ((res.utilities / totalH) * 100).toFixed(1) + '%');
    setText('pctBbIns', ((res.insurance / totalH) * 100).toFixed(1) + '%');

    // Health / Rent-to-Income Badge
    var badge = $('affordRentBadge');
    if (badge) {
      if (res.housingPctGross <= 25) {
        badge.textContent = 'Excellent (Under 25%)';
        badge.className = 'dti-badge badge-green';
      } else if (res.housingPctGross <= 30) {
        badge.textContent = 'Standard (25% - 30%)';
        badge.className = 'dti-badge badge-green';
      } else if (res.housingPctGross <= 35) {
        badge.textContent = 'High-Cost (30% - 35%)';
        badge.className = 'dti-badge badge-yellow';
      } else {
        badge.textContent = 'Cost-Burdened (> 35%)';
        badge.className = 'dti-badge badge-red';
      }
    }

    setText('affordHousingPctGross', res.housingPctGross.toFixed(1) + '%');
    setText('affordHousingPctNet', res.housingPctNet.toFixed(1) + '%');
    setText('affordTotalDti', res.totalDti.toFixed(1) + '%');

    // Render Rule Benchmark Table
    renderBenchmarkTable(res);

    // Render Upfront Move-in Table
    renderMoveInTable(res);

    // Render Canvas Chart
    renderChart(res);
  }

  /* Render Benchmark Table */
  function renderBenchmarkTable(res) {
    var tbody = $('rentBenchmarkBody');
    if (!tbody) return;

    var html = '';
    res.ruleTiers.forEach(function (t) {
      var isCurrent = Math.abs(t.rent - res.affordableRent) < 25;
      var annual = t.rent * 12;
      html += '<tr class="' + (isCurrent ? 'highlight-current-tier' : '') + '">' +
        '<td><strong>' + t.name + '</strong>' + (isCurrent ? ' <span class="current-tier-tag">Active</span>' : '') + '</td>' +
        '<td class="num font-bold text-primary">' + fmt(t.rent) + ' / mo</td>' +
        '<td class="num">' + fmt(annual) + ' / yr</td>' +
        '<td style="font-size:0.82rem;color:var(--text-muted);">' + t.note + '</td>' +
        '</tr>';
    });
    tbody.innerHTML = html;
  }

  /* Render Move-in Table */
  function renderMoveInTable(res) {
    var m = res.moveIn;
    setText('miFirstMonth', fmtDec(m.firstMonth));
    setText('miSecurity', fmtDec(m.securityDeposit));
    setText('miLastMonth', fmtDec(m.lastMonth));
    setText('miBroker', fmtDec(m.brokerFee));
    setText('miMoving', fmtDec(m.movingCost));
    setText('miUtilitySetup', fmtDec(m.utilitySetup));
    setText('miTotal', fmtDec(m.total));
  }

  /* Render Required Income Output */
  function renderRequiredUI(res) {
    if (!res) return;

    setText('reqAnnualIncome', fmt(res.reqAnnual) + ' / yr');
    setText('reqMonthlyIncome', fmt(res.reqMonthly) + ' / mo');
    setText('reqHourlyWage', fmtDec(res.hourlyWage) + ' / hr');
    setText('reqWeeklyWage', fmt(res.weeklyWage) + ' / wk');
    setText('reqRuleDesc', res.ruleDesc);

    setText('reqStatAnnual', fmt(res.reqAnnual));
    setText('reqStatMonthly', fmt(res.reqMonthly));
    setText('reqStatHourly', fmtDec(res.hourlyWage) + '/hr');
    setText('reqStatHousing', fmt(res.totalMonthlyHousing) + '/mo');

    var emergMin = res.targetRent * 3;
    var emergMax = res.targetRent * 6;
    setText('reqEmergencyFund', fmt(emergMin) + ' – ' + fmt(emergMax) + ' (3 to 6 months rent)');
  }

  /* Render Roommate Split Output */
  function renderRoommateUI(res) {
    if (!res) return;

    var tbody = $('roommateResultBody');
    if (!tbody) return;

    var html = '';
    var totalPct = 0;

    res.roommates.forEach(function (r) {
      var pct = res.totalRent > 0 ? (r.share / res.totalRent) * 100 : 0;
      totalPct += pct;

      var perks = [];
      if (r.hasBath) perks.push('Private Bath');
      if (r.hasBalcony) perks.push('Balcony');
      if (r.hasParking) perks.push('Parking');
      var perksStr = perks.length > 0 ? perks.join(', ') : 'Standard Room';

      html += '<tr>' +
        '<td><strong>' + r.name + '</strong></td>' +
        '<td class="num font-bold text-primary" style="font-size:1.05rem;">' + fmt(r.share) + '</td>' +
        '<td class="num">' + pct.toFixed(1) + '%</td>' +
        '<td class="num">' + r.sqft + ' sq ft</td>' +
        '<td><span style="font-size:0.8rem;color:var(--text-muted);">' + perksStr + '</span></td>' +
        '</tr>';
    });

    tbody.innerHTML = html;
  }

  /* Visual Chart (Canvas) */
  function renderChart(res) {
    var canvas = $('rentChartCanvas');
    if (!canvas || !canvas.getContext) return;

    var dpr = window.devicePixelRatio || 1;
    var w = canvas.clientWidth || (canvas.parentElement ? canvas.parentElement.clientWidth : 600);
    var h = 280;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    var ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    var isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    var textColor = isDark ? '#cbd5e1' : '#475569';
    var gridColor = isDark ? '#334155' : '#e2e8f0';

    if (currentChartTab === 'budget') {
      renderBudgetDonut(ctx, w, h, res, isDark, textColor);
    } else {
      renderRulesBarChart(ctx, w, h, res, isDark, textColor, gridColor);
    }
  }

  /* Donut: Monthly Net Income Allocation */
  function renderBudgetDonut(ctx, w, h, res, isDark, textColor) {
    var cx = w / 2;
    var cy = h / 2 + 10;
    var outerR = Math.min(cx - 90, cy - 25, 95);
    var innerR = outerR * 0.62;

    var net = res.monthlyNet;
    if (net <= 0) return;

    var rentVal = res.affordableRent;
    var utilVal = res.utilities + res.insurance;
    var debtVal = res.debts;
    var remVal = Math.max(0, net - rentVal - utilVal - debtVal);

    var slices = [
      { label: 'Base Rent', val: rentVal, color: '#2563eb' },
      { label: 'Utilities & Insurance', val: utilVal, color: '#f59e0b' },
      { label: 'Non-Housing Debts', val: debtVal, color: '#ef4444' },
      { label: 'Living, Savings & Extras', val: remVal, color: '#10b981' }
    ].filter(function (s) { return s.val > 0.01; });

    var total = net;
    var startAngle = -Math.PI / 2;

    slices.forEach(function (s) {
      var sliceAngle = (s.val / total) * (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(cx, cy, outerR, startAngle, startAngle + sliceAngle);
      ctx.arc(cx, cy, innerR, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();
      ctx.fillStyle = s.color;
      ctx.fill();
      startAngle += sliceAngle;
    });

    // Center text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillStyle = textColor;
    ctx.fillText(fmt(net), cx, cy - 8);
    ctx.font = '11px sans-serif';
    ctx.fillStyle = isDark ? '#94a3b8' : '#64748b';
    ctx.fillText('Take-Home / mo', cx, cy + 12);

    // Legend on left/top
    var legX = 18;
    var legY = 24;
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.font = '11.5px sans-serif';

    slices.forEach(function (s, idx) {
      var pct = ((s.val / total) * 100).toFixed(1) + '%';
      ctx.fillStyle = s.color;
      ctx.fillRect(legX, legY + idx * 22 - 10, 11, 11);
      ctx.fillStyle = textColor;
      ctx.fillText(s.label + ': ' + fmt(s.val) + ' (' + pct + ')', legX + 18, legY + idx * 22);
    });
  }

  /* Bar: Rent by Rule */
  function renderRulesBarChart(ctx, w, h, res, isDark, textColor, gridColor) {
    var tiers = res.ruleTiers;
    if (!tiers || tiers.length === 0) return;

    var padL = 65, padR = 20, padT = 30, padB = 55;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;

    var maxRent = 0;
    tiers.forEach(function (t) { if (t.rent > maxRent) maxRent = t.rent; });
    if (maxRent <= 0) maxRent = 1;

    // Grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    ctx.fillStyle = textColor;
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'right';

    var yTicks = 4;
    for (var i = 0; i <= yTicks; i++) {
      var val = (maxRent / yTicks) * (yTicks - i);
      var y = padT + (plotH / yTicks) * i;
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(w - padR, y);
      ctx.stroke();
      ctx.fillText('$' + Math.round(val).toLocaleString(), padL - 8, y + 4);
    }

    var groupW = plotW / tiers.length;
    var barW = Math.max(14, Math.min(38, groupW * 0.52));

    tiers.forEach(function (t, idx) {
      var cx = padL + (idx + 0.5) * groupW;
      var barH = (t.rent / maxRent) * plotH;
      var barY = padT + plotH - barH;

      var isCurrent = Math.abs(t.rent - res.affordableRent) < 25;

      ctx.fillStyle = isCurrent ? '#2563eb' : (isDark ? '#475569' : '#94a3b8');
      ctx.fillRect(cx - barW / 2, barY, barW, barH);

      // Top value label
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.font = '10px sans-serif';
      ctx.fillText('$' + Math.round(t.rent), cx, barY - 6);

      // X labels
      var shortName = t.name.split(' ')[0];
      ctx.fillText(shortName, cx, padT + plotH + 16);
      ctx.fillText((t.pct * 100).toFixed(0) + '%', cx, padT + plotH + 30);
    });
  }

  /* Preset Scenarios */
  function applyPreset(preset) {
    setMode('afford');
    if (preset === 'starter') {
      // Recent Grad ($55k, $350 debt, $150 util, $15 ins)
      $('rentIncome').value = 55000;
      if ($('rentIncomeFreq')) $('rentIncomeFreq').value = 'annual';
      $('rentDebts').value = 350;
      $('rentUtilities').value = 150;
      $('rentInsurance').value = 15;
      $('rentRule').value = '30pct';
    } else if (preset === 'urban') {
      // Urban Pro ($95k, $500 debt, $200 util, $20 ins)
      $('rentIncome').value = 95000;
      if ($('rentIncomeFreq')) $('rentIncomeFreq').value = 'annual';
      $('rentDebts').value = 500;
      $('rentUtilities').value = 200;
      $('rentInsurance').value = 20;
      $('rentRule').value = '30pct';
    } else if (preset === 'couple') {
      // Dual Income Couple ($160k, $800 debt, $250 util, $25 ins)
      $('rentIncome').value = 160000;
      if ($('rentIncomeFreq')) $('rentIncomeFreq').value = 'annual';
      $('rentDebts').value = 800;
      $('rentUtilities').value = 250;
      $('rentInsurance').value = 25;
      $('rentRule').value = '30pct';
    } else if (preset === 'frugal') {
      // Frugal Saver ($70k, $200 debt, 20% rule)
      $('rentIncome').value = 70000;
      if ($('rentIncomeFreq')) $('rentIncomeFreq').value = 'annual';
      $('rentDebts').value = 200;
      $('rentUtilities').value = 150;
      $('rentInsurance').value = 15;
      $('rentRule').value = 'conservative';
    }

    var pBtns = document.querySelectorAll('.afford-preset-btn');
    pBtns.forEach(function (b) {
      if (b.getAttribute('data-preset') === preset) b.classList.add('active');
      else b.classList.remove('active');
    });

    runUpdate();
  }

  /* Switch Calculation Mode */
  function setMode(mode) {
    currentMode = mode;
    var modeBtns = document.querySelectorAll('.rent-mode-btn');
    modeBtns.forEach(function (btn) {
      if (btn.getAttribute('data-mode') === mode) btn.classList.add('active');
      else btn.classList.remove('active');
    });

    var panelAfford = $('panelModeAfford');
    var panelRequired = $('panelModeRequired');
    var panelRoommate = $('panelModeRoommate');

    if (panelAfford) panelAfford.style.display = (mode === 'afford') ? 'block' : 'none';
    if (panelRequired) panelRequired.style.display = (mode === 'required') ? 'block' : 'none';
    if (panelRoommate) panelRoommate.style.display = (mode === 'roommate') ? 'block' : 'none';

    runUpdate();
  }

  /* Sliders synchronization */
  function bindRange(inpId, rngId) {
    var inp = $(inpId);
    var rng = $(rngId);
    if (!inp || !rng) return;

    inp.addEventListener('input', function () {
      var v = parseFloat(inp.value);
      var min = parseFloat(rng.min) || 0;
      var max = parseFloat(rng.max) || 10000000;
      if (!isNaN(v)) rng.value = Math.min(max, Math.max(min, v));
      runUpdate();
    });

    rng.addEventListener('input', function () {
      inp.value = rng.value;
      runUpdate();
    });
  }

  /* Dynamic Roommate Form Rows */
  function updateRoommateRows() {
    var count = parseInt($('roommateCount') ? $('roommateCount').value : '2', 10) || 2;
    var container = $('roommatesList');
    if (!container) return;

    var html = '';
    for (var i = 1; i <= count; i++) {
      html += '<div class="roommate-item-card" style="background:var(--card-bg);border:1px solid var(--border);border-radius:var(--radius);padding:14px;margin-bottom:12px;">' +
        '<div style="font-weight:700;font-size:0.92rem;margin-bottom:10px;color:var(--primary);">&#128100; Roommate ' + i + '</div>' +
        '<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(130px, 1fr));gap:10px;align-items:center;">' +
          '<div>' +
            '<label style="font-size:0.75rem;font-weight:600;display:block;margin-bottom:4px;">Name</label>' +
            '<input type="text" id="rmName' + i + '" value="Roommate ' + i + '" style="width:100%;padding:6px 8px;font-size:0.85rem;border:1px solid var(--border);border-radius:4px;">' +
          '</div>' +
          '<div>' +
            '<label style="font-size:0.75rem;font-weight:600;display:block;margin-bottom:4px;">Bedroom Sq Ft</label>' +
            '<input type="number" id="rmSqft' + i + '" value="' + (130 + i * 20) + '" min="50" max="1000" style="width:100%;padding:6px 8px;font-size:0.85rem;border:1px solid var(--border);border-radius:4px;">' +
          '</div>' +
          '<div>' +
            '<label style="font-size:0.75rem;font-weight:600;display:block;margin-bottom:4px;">Annual Income ($)</label>' +
            '<input type="number" id="rmIncome' + i + '" value="' + (50000 + i * 15000) + '" min="1000" step="5000" style="width:100%;padding:6px 8px;font-size:0.85rem;border:1px solid var(--border);border-radius:4px;">' +
          '</div>' +
          '<div style="display:flex;flex-direction:column;gap:6px;font-size:0.78rem;">' +
            '<label><input type="checkbox" id="rmBath' + i + '" ' + (i === 1 ? 'checked' : '') + '> Private Bath</label>' +
            '<label><input type="checkbox" id="rmBalcony' + i + '"> Private Balcony</label>' +
            '<label><input type="checkbox" id="rmParking' + i + '"> Parking Spot</label>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
    container.innerHTML = html;

    // Attach listener to newly created inputs
    var inputs = container.querySelectorAll('input');
    inputs.forEach(function (inp) {
      inp.addEventListener('input', runUpdate);
      inp.addEventListener('change', runUpdate);
    });
  }

  /* Export CSV */
  function exportCsv() {
    if (currentMode === 'afford' && lastAffordResult) {
      var r = lastAffordResult;
      var lines = [
        ['Rule Standard', 'Affordable Monthly Rent', 'Annual Rent Outlay', 'Notes'].join(','),
        ['30% Rule Standard', r.affordableRent.toFixed(2), r.annualRent.toFixed(2), 'Standard Benchmark'].join(','),
        ['Total Monthly Housing', r.totalMonthlyHousing.toFixed(2), r.annualTotalHousing.toFixed(2), 'Includes Utilities & Insurance'].join(','),
        ['Estimated Take-Home Pay', r.monthlyNet.toFixed(2), (r.monthlyNet * 12).toFixed(2), 'After Tax Income'].join(','),
        ['Remaining Cash Flow', r.remainingNet.toFixed(2), (r.remainingNet * 12).toFixed(2), 'For Food, Savings & Living'].join(',')
      ];
      r.ruleTiers.forEach(function (t) {
        lines.push(['"' + t.name + '"', t.rent.toFixed(2), (t.rent * 12).toFixed(2), '"' + t.note + '"'].join(','));
      });
      downloadBlob(lines.join('\r\n'), 'Rent_Affordability_Budget.csv');
    } else if (currentMode === 'roommate' && lastRoommateResult) {
      var lines = [
        ['Roommate', 'Monthly Rent Share', 'Percentage of Total', 'Sq Footage'].join(',')
      ];
      lastRoommateResult.roommates.forEach(function (rm) {
        var pct = (rm.share / lastRoommateResult.totalRent) * 100;
        lines.push(['"' + rm.name + '"', rm.share.toFixed(2), pct.toFixed(1) + '%', rm.sqft].join(','));
      });
      downloadBlob(lines.join('\r\n'), 'Roommate_Rent_Split.csv');
    }
  }

  function downloadBlob(content, filename) {
    var blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /* Copy Summary */
  function copySummary() {
    var text = '';
    if (currentMode === 'afford' && lastAffordResult) {
      var r = lastAffordResult;
      text = "EMI Master - Rent Affordability Summary\n" +
        "======================================\n" +
        "Affordable Monthly Rent: " + fmt(r.affordableRent) + " / mo\n" +
        "Total Monthly Housing (Rent + Utilities + Insurance): " + fmt(r.totalMonthlyHousing) + " / mo\n" +
        "Annual Rent Outlay: " + fmt(r.annualRent) + " / yr\n" +
        "Gross Monthly Income: " + fmt(r.monthlyGross) + " / mo\n" +
        "Estimated Take-Home Pay: " + fmt(r.monthlyNet) + " / mo\n" +
        "Remaining Cash After Housing & Debts: " + fmt(r.remainingNet) + " / mo\n" +
        "Upfront Move-In Cash Needed: " + fmt(r.moveIn.total) + "\n" +
        "Applied Rule: " + r.ruleLabel + "\n" +
        "======================================\n" +
        "Calculated at: " + window.location.href;
    } else if (currentMode === 'required' && lastRequiredResult) {
      var q = lastRequiredResult;
      text = "EMI Master - Required Income for Rent\n" +
        "======================================\n" +
        "Target Monthly Rent: " + fmt(q.targetRent) + " / mo\n" +
        "Minimum Required Annual Income: " + fmt(q.reqAnnual) + " / yr\n" +
        "Minimum Required Monthly Income: " + fmt(q.reqMonthly) + " / mo\n" +
        "Required Hourly Wage: " + fmtDec(q.hourlyWage) + " / hr\n" +
        "Screening Standard: " + q.ruleDesc + "\n" +
        "======================================\n" +
        "Calculated at: " + window.location.href;
    } else if (currentMode === 'roommate' && lastRoommateResult) {
      var rm = lastRoommateResult;
      text = "EMI Master - Roommate Rent Split\n" +
        "======================================\n" +
        "Total Monthly Rent: " + fmt(rm.totalRent) + " / mo\n";
      rm.roommates.forEach(function (r) {
        text += "  " + r.name + ": " + fmt(r.share) + " / mo (" + ((r.share / rm.totalRent) * 100).toFixed(1) + "%)\n";
      });
      text += "======================================\n" +
        "Calculated at: " + window.location.href;
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (window.showToast) window.showToast('Rent calculation summary copied to clipboard!');
      });
    } else {
      var ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (window.showToast) window.showToast('Rent calculation summary copied to clipboard!');
    }
  }

  function runUpdate() {
    if (currentMode === 'afford') {
      lastAffordResult = solveAffordability();
      renderAffordUI(lastAffordResult);
    } else if (currentMode === 'required') {
      lastRequiredResult = solveRequiredIncome();
      renderRequiredUI(lastRequiredResult);
    } else if (currentMode === 'roommate') {
      lastRoommateResult = solveRoommateSplit();
      renderRoommateUI(lastRoommateResult);
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Mode buttons
    var modeBtns = document.querySelectorAll('.rent-mode-btn');
    modeBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        setMode(btn.getAttribute('data-mode'));
      });
    });

    // Preset buttons
    var presetBtns = document.querySelectorAll('.afford-preset-btn');
    presetBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyPreset(btn.getAttribute('data-preset'));
      });
    });

    // Rule change dropdown
    var ruleSelect = $('rentRule');
    if (ruleSelect) {
      ruleSelect.addEventListener('change', function () {
        var customWrap = $('customRentRuleWrap');
        if (customWrap) {
          customWrap.style.display = (ruleSelect.value === 'custom') ? 'block' : 'none';
        }
        runUpdate();
      });
    }

    // Chart switcher
    var chartBtns = document.querySelectorAll('.chart-tab-btn');
    chartBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        currentChartTab = btn.getAttribute('data-chart');
        chartBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        if (lastAffordResult) renderChart(lastAffordResult);
      });
    });

    // Sliders
    bindRange('rentIncome', 'rentIncomeRange');
    bindRange('targetRent', 'targetRentRange');

    // Roommate count changer
    var rmCountSelect = $('roommateCount');
    if (rmCountSelect) {
      rmCountSelect.addEventListener('change', function () {
        updateRoommateRows();
        runUpdate();
      });
    }

    var rmMethodSelect = $('roommateMethod');
    if (rmMethodSelect) {
      rmMethodSelect.addEventListener('change', runUpdate);
    }

    // Action buttons
    var csvBtn = $('downloadCsv');
    if (csvBtn) csvBtn.addEventListener('click', exportCsv);

    var printBtn = $('printSchedule');
    if (printBtn) {
      printBtn.addEventListener('click', function () {
        window.print();
      });
    }

    var copyBtn = $('copySummaryBtn');
    if (copyBtn) copyBtn.addEventListener('click', copySummary);

    var calcBtn = $('calculateBtn');
    if (calcBtn) calcBtn.addEventListener('click', runUpdate);

    var resetBtn = $('resetBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        applyPreset('starter');
      });
    }

    // Attach change/input listeners to all controls
    var allInputs = document.querySelectorAll('#affordForm input, #affordForm select, #requiredForm input, #requiredForm select, #roommateForm input, #roommateForm select');
    allInputs.forEach(function (inp) {
      inp.addEventListener('input', runUpdate);
      inp.addEventListener('change', runUpdate);
    });

    // Window resize observer for canvas chart
    window.addEventListener('resize', function () {
      if (currentMode === 'afford' && lastAffordResult) renderChart(lastAffordResult);
    });

    // Initialize roommates dynamic inputs and starter preset
    updateRoommateRows();
    applyPreset('starter');
  });

})();
