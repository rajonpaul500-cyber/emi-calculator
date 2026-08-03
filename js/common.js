/* ==========================================================================
   EMI Master - Shared layout: header, sidebar, footer injection + helpers
   ========================================================================== */

(function () {
  "use strict";

  var SITE_NAME = "EMI Master";
  var SITE_TAGLINE = "Free Online Calculators";

  var CATEGORIES = [
    {
      name: "Loan & Mortgage",
      icon: "\uD83D\uDCB0",
      items: [
        { href: "emi-calculator.html", label: "EMI Calculator", page: "emi-calculator.html" },
        { href: "home-loan.html", label: "Home Loan Calculator", page: "home-loan.html" },
        { href: "car-loan.html", label: "Car Loan Calculator", page: "car-loan.html" },
        { href: "personal-loan.html", label: "Personal Loan Calculator", page: "personal-loan.html" },
        { href: "loan-payoff.html", label: "Loan Payoff Calculator", page: "loan-payoff.html" }
      ]
    },
    {
      name: "Savings & Investment",
      icon: "\uD83D\uDCC8",
      items: [
        { href: "dps.html", label: "DPS Calculator", page: "dps.html" },
        { href: "fdr.html", label: "FDR Calculator", page: "fdr.html" }
      ]
    },
    {
      name: "Mortgage & Real Estate",
      icon: "\uD83C\uDFE1",
      items: [
        { href: "mortgage-calculator.html", label: "Mortgage Calculator", page: "mortgage-calculator.html" },
        { href: "amortization-calculator.html", label: "Amortization Calculator", page: "amortization-calculator.html" },
        { href: "mortgage-payoff.html", label: "Mortgage Payoff Calculator", page: "mortgage-payoff.html" },
        { href: "house-affordability.html", label: "House Affordability Calculator", page: "house-affordability.html" },
        { href: "rent-calculator.html", label: "Rent Calculator", page: "rent-calculator.html" },
        { href: "debt-to-income.html", label: "Debt-to-Income Ratio Calculator", page: "debt-to-income.html" },
        { href: "real-estate-calculator.html", label: "Real Estate Calculator", page: "real-estate-calculator.html" },
        { href: "refinance-calculator.html", label: "Refinance Calculator", page: "refinance-calculator.html" },
        { href: "rental-property.html", label: "Rental Property Calculator", page: "rental-property.html" },
        { href: "apr-calculator.html", label: "APR Calculator", page: "apr-calculator.html" },
        { href: "fha-loan.html", label: "FHA Loan Calculator", page: "fha-loan.html" },
        { href: "va-loan.html", label: "VA Mortgage Calculator", page: "va-loan.html" },
        { href: "home-equity-loan.html", label: "Home Equity Loan Calculator", page: "home-equity-loan.html" },
        { href: "heloc-calculator.html", label: "HELOC Calculator", page: "heloc-calculator.html" },
        { href: "down-payment-calculator.html", label: "Down Payment Calculator", page: "down-payment-calculator.html" },
        { href: "rent-vs-buy.html", label: "Rent vs. Buy Calculator", page: "rent-vs-buy.html" }
      ]
    }
  ];

  function currentPage() {
    var path = window.location.pathname.split("/").pop();
    return path || "index.html";
  }

  function buildHeader() {
    var nav = "";
    nav += '<ul>';
    nav += '<li><a href="index.html" data-nav="index.html">Home</a></li>';
    nav += '<li><a href="emi-calculator.html" data-nav="emi-calculator.html">EMI</a></li>';
    nav += '<li><a href="home-loan.html" data-nav="home-loan.html">Home Loan</a></li>';
    nav += '<li><a href="car-loan.html" data-nav="car-loan.html">Car Loan</a></li>';
    nav += '<li><a href="personal-loan.html" data-nav="personal-loan.html">Personal</a></li>';
    nav += '<li><a href="dps.html" data-nav="dps.html">DPS</a></li>';
    nav += '<li><a href="fdr.html" data-nav="fdr.html">FDR</a></li>';
    nav += '</ul>';

    return (
      '<header class="site-header">' +
      '<div class="header-inner">' +
      '<a href="index.html" class="brand">' +
      '<span class="brand-logo">' + SITE_NAME.charAt(0) + '</span>' +
      '<span>' + SITE_NAME + '</span>' +
      '</a>' +
      '<nav class="main-nav" id="mainNav">' + nav + '</nav>' +
      '<button class="theme-toggle" id="themeToggle" title="Switch theme" aria-label="Toggle dark mode">&#127769;</button>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Menu">&#9776;</button>' +
      '</div>' +
      '</header>'
    );
  }

  function buildSidebar() {
    var current = currentPage();
    var html = '<aside class="sidebar">';
    html += '<div class="sidebar-card"><h3>Calculators</h3><ul class="calc-nav">';
    html += '<li><a href="index.html"' + (current === "index.html" ? ' class="active"' : "") + '>' +
      '<span class="sidebar-icon">&#127968;</span>All Calculators</a></li>';

    CATEGORIES.forEach(function (cat, ci) {
      var open = false;
      cat.items.forEach(function (it) {
        if (it.page === current) open = true;
      });
      html += '<li class="cat-group' + (open ? " open" : "") + '">';
      html += '<button class="cat-toggle" data-group="cat-' + ci + '" aria-expanded="' + open + '">' +
        '<span class="sidebar-icon">' + cat.icon + '</span>' + cat.name +
        '<span class="cat-arrow">&#9662;</span></button>';
      html += '<ul class="cat-items" id="cat-' + ci + '">';
      cat.items.forEach(function (it) {
        html += '<li><a href="' + it.href + '"' + (it.page === current ? ' class="active"' : "") + '>' +
          it.label + '</a></li>';
      });
      html += '</ul></li>';
    });
    html += '</ul></div>';

    html += '<div class="sidebar-card"><h3>Quick Links</h3><ul>';
    html += '<li><a href="privacy-policy.html"><span class="sidebar-icon">&#128274;</span>Privacy Policy</a></li>';
    html += '</ul></div>';

    html += '<div class="ad-slot ad-slot-sidebar"><span class="ad-slot-label">Advertisement</span></div>';
    html += '</aside>';
    return html;
  }

  function buildFooter() {
    var year = new Date().getFullYear();
    var html = '<footer class="site-footer">';
    html += '<div class="footer-inner">';
    html += '<div class="footer-col">';
    html += '<h4>' + SITE_NAME + '</h4>';
    html += '<p>' + SITE_TAGLINE + '. Fast, accurate and free tools for EMI, loans, ' +
      'savings and everyday calculations. Your data never leaves your device.</p>';
    html += '</div>';
    html += '<div class="footer-col">';
    html += '<h4>Popular Calculators</h4><ul>';
    html += '<li><a href="emi-calculator.html">EMI Calculator</a></li>';
    html += '<li><a href="mortgage-calculator.html">Mortgage Calculator</a></li>';
    html += '<li><a href="home-loan.html">Home Loan Calculator</a></li>';
    html += '<li><a href="house-affordability.html">House Affordability</a></li>';
    html += '<li><a href="car-loan.html">Car Loan Calculator</a></li>';
    html += '<li><a href="dps.html">DPS Calculator</a></li>';
    html += '<li><a href="fdr.html">FDR Calculator</a></li>';
    html += '</ul></div>';
    html += '<div class="footer-col">';
    html += '<h4>Company</h4><ul>';
    html += '<li><a href="index.html">Home</a></li>';
    html += '<li><a href="loan-payoff.html">Loan Payoff Calculator</a></li>';
    html += '<li><a href="personal-loan.html">Personal Loan Calculator</a></li>';
    html += '<li><a href="privacy-policy.html">Privacy Policy</a></li>';
    html += '</ul></div>';
    html += '</div>';
    html += '<div class="footer-bottom">';
    html += '&copy; ' + year + ' ' + SITE_NAME + '. All rights reserved. ' +
      'Information provided for educational purposes only, not financial advice.';
    html += '</div>';
    html += '</footer>';
    return html;
  }

  function highlightNav() {
    var current = currentPage();
    var links = document.querySelectorAll(".main-nav a[data-nav]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === current) {
        links[i].classList.add("active");
      }
    }
  }

  function initSidebarAccordion() {
    var sidebar = document.getElementById("siteSidebar");
    if (!sidebar) return;
    sidebar.addEventListener("click", function (e) {
      var btn = e.target.closest(".cat-toggle");
      if (!btn) return;
      var group = btn.closest(".cat-group");
      if (!group) return;
      var willOpen = !group.classList.contains("open");
      group.classList.toggle("open");
      btn.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  }

  var THEME_KEY = "emimaster-theme";

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.innerHTML = theme === "dark" ? "&#9728;&#65039;" : "&#127769;";
    }
  }

  function initTheme() {
    var saved = "light";
    try {
      saved = localStorage.getItem(THEME_KEY) || "light";
    } catch (e) { /* storage unavailable */ }
    applyTheme(saved === "dark" ? "dark" : "light");
    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
        try {
          localStorage.setItem(THEME_KEY, next);
        } catch (e) { /* ignore */ }
      });
    }
  }

  function init() {
    var headerSlot = document.getElementById("siteHeader");
    if (headerSlot) {
      headerSlot.innerHTML = buildHeader();
      var toggle = document.getElementById("navToggle");
      if (toggle) {
        toggle.addEventListener("click", function () {
          document.getElementById("mainNav").classList.toggle("open");
        });
      }
      initTheme();
    }

    var sidebarSlot = document.getElementById("siteSidebar");
    if (sidebarSlot) {
      sidebarSlot.innerHTML = buildSidebar();
      initSidebarAccordion();
    }

    var footerSlot = document.getElementById("siteFooter");
    if (footerSlot) {
      footerSlot.innerHTML = buildFooter();
    }

    highlightNav();
    initBackToTop();
    initFaqs();
    initHomeSearch();
  }

  function initBackToTop() {
    var btn = document.createElement("button");
    btn.className = "back-top";
    btn.innerHTML = "&#8679;";
    btn.title = "Back to top";
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    document.body.appendChild(btn);

    window.addEventListener("scroll", function () {
      if (window.scrollY > 400) {
        btn.classList.add("show");
      } else {
        btn.classList.remove("show");
      }
    });
  }

  function initFaqs() {
    var items = document.querySelectorAll(".faq-item");
    for (var i = 0; i < items.length; i++) {
      (function (item) {
        var q = item.querySelector(".faq-q");
        if (q) {
          q.addEventListener("click", function () {
            item.classList.toggle("open");
          });
        }
      })(items[i]);
    }
  }

  function initHomeSearch() {
    var form = document.getElementById("heroSearchForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("heroSearchInput");
      var q = (input ? input.value : "").toLowerCase().trim();
      if (!q) return;
      var map = {
        "house affordability": "house-affordability.html",
        "rent vs buy": "rent-vs-buy.html",
        "rental property": "rental-property.html",
        "real estate": "real-estate-calculator.html",
        "down payment": "down-payment-calculator.html",
        "debt to income": "debt-to-income.html",
        "refinance": "refinance-calculator.html",
        "amortization": "amortization-calculator.html",
        "home equity": "home-equity-loan.html",
        "heloc": "heloc-calculator.html",
        "deposit pension": "dps.html",
        "fixed deposit": "fdr.html",
        "mortgage payoff": "mortgage-payoff.html",
        "mortgage": "mortgage-calculator.html",
        "affordability": "house-affordability.html",
        "apr": "apr-calculator.html",
        "fha": "fha-loan.html",
        "va loan": "va-loan.html",
        "va mortgage": "va-loan.html",
        "home loan": "home-loan.html",
        "auto loan": "car-loan.html",
        "car loan": "car-loan.html",
        "personal": "personal-loan.html",
        "payoff": "loan-payoff.html",
        "extra payment": "loan-payoff.html",
        "schedule": "amortization-calculator.html",
        "pension": "dps.html",
        "interest": "emi-calculator.html",
        "rent": "rent-calculator.html",
        "dps": "dps.html",
        "fdr": "fdr.html",
        "fd": "fdr.html",
        "car": "car-loan.html",
        "loan": "emi-calculator.html",
        "emi": "emi-calculator.html",
        "deposit": "fdr.html"
      };
      var keys = Object.keys(map).sort(function (a, b) { return b.length - a.length; });
      var dest = null;
      for (var i = 0; i < keys.length; i++) {
        if (q.indexOf(keys[i]) !== -1) {
          dest = map[keys[i]];
          break;
        }
      }
      if (dest) {
        window.location.href = dest;
      } else {
        showToast("Try searching for 'EMI', 'DPS', 'FDR' or 'Loan'");
      }
    });
  }

  /* ----- formatting helpers ----- */
  function formatMoney(n) {
    return Number(n).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function formatMoneyWhole(n) {
    return Number(n).toLocaleString("en-IN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    });
  }

  function formatNumber(n) {
    return Number(n).toLocaleString("en-IN", {
      maximumFractionDigits: 2
    });
  }

  function formatPercent(n) {
    return Number(n).toFixed(2) + "%";
  }

  /* ----- input helpers ----- */
  function parseNum(id) {
    var el = document.getElementById(id);
    if (!el) return NaN;
    var val = parseFloat(el.value);
    return isFinite(val) ? val : NaN;
  }

  function setRangeText(rangeId, displayId) {
    var range = document.getElementById(rangeId);
    var display = document.getElementById(displayId);
    if (range && display) {
      range.addEventListener("input", function () {
        display.textContent = Number(range.value).toLocaleString("en-IN");
      });
    }
  }

  /* ----- toast ----- */
  var toastTimer = null;
  function showToast(msg) {
    var existing = document.querySelector(".toast");
    if (!existing) {
      existing = document.createElement("div");
      existing.className = "toast";
      document.body.appendChild(existing);
    }
    existing.textContent = msg;
    existing.classList.add("show");
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      existing.classList.remove("show");
    }, 2600);
  }

  function validateInputs(ids) {
    var firstInvalid = null;
    for (var i = 0; i < ids.length; i++) {
      var el = document.getElementById(ids[i]);
      if (!el) continue;
      var val = parseFloat(el.value);
      if (!isFinite(val)) {
        el.focus();
        el.style.borderColor = "#dc2626";
        showToast("Please enter a valid value");
        setTimeout(function () { el.style.borderColor = ""; }, 2500);
        return false;
      }
    }
    return true;
  }

  /* ----- export ----- */
  window.EMIMaster = {
    formatMoney: formatMoney,
    formatMoneyWhole: formatMoneyWhole,
    formatNumber: formatNumber,
    formatPercent: formatPercent,
    parseNum: parseNum,
    setRangeText: setRangeText,
    showToast: showToast,
    validateInputs: validateInputs
  };

  document.addEventListener("DOMContentLoaded", init);
})();
