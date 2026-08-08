/* ==========================================================================
   EMI Master - Shared layout: header, sidebar, footer injection + helpers
   + Advanced: SEO content injection, related calculators, share/print,
   table of contents, calculator metadata.
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
    },
    {
      name: "Investment",
      icon: "\uD83D\uDCC8",
      items: [
        { href: "interest-calculator.html", label: "Interest Calculator", page: "interest-calculator.html" },
        { href: "investment-calculator.html", label: "Investment Calculator", page: "investment-calculator.html" },
        { href: "finance-calculator.html", label: "Finance Calculator", page: "finance-calculator.html" },
        { href: "compound-interest-calculator.html", label: "Compound Interest Calculator", page: "compound-interest-calculator.html" },
        { href: "interest-rate-calculator.html", label: "Interest Rate Calculator", page: "interest-rate-calculator.html" },
        { href: "savings-calculator.html", label: "Savings Calculator", page: "savings-calculator.html" },
        { href: "simple-interest-calculator.html", label: "Simple Interest Calculator", page: "simple-interest-calculator.html" },
        { href: "cd-calculator.html", label: "CD Calculator", page: "cd-calculator.html" },
        { href: "bond-calculator.html", label: "Bond Calculator", page: "bond-calculator.html" },
        { href: "mutual-fund-calculator.html", label: "Mutual Fund Calculator", page: "mutual-fund-calculator.html" },
        { href: "average-return-calculator.html", label: "Average Return Calculator", page: "average-return-calculator.html" },
        { href: "irr-calculator.html", label: "IRR Calculator", page: "irr-calculator.html" },
        { href: "roi-calculator.html", label: "ROI Calculator", page: "roi-calculator.html" },
        { href: "payback-period-calculator.html", label: "Payback Period Calculator", page: "payback-period-calculator.html" },
        { href: "present-value-calculator.html", label: "Present Value Calculator", page: "present-value-calculator.html" },
        { href: "future-value-calculator.html", label: "Future Value Calculator", page: "future-value-calculator.html" }
      ]
    },
    {
      name: "Retirement",
      icon: "\uD83E\uDDD3",
      items: [
        { href: "retirement-calculator.html", label: "Retirement Calculator", page: "retirement-calculator.html" },
        { href: "pension-calculator.html", label: "Pension Calculator", page: "pension-calculator.html" },
        { href: "social-security-calculator.html", label: "Social Security Calculator", page: "social-security-calculator.html" },
        { href: "annuity-calculator.html", label: "Annuity Calculator", page: "annuity-calculator.html" },
        { href: "annuity-payout-calculator.html", label: "Annuity Payout Calculator", page: "annuity-payout-calculator.html" }
      ]
    },
    {
      name: "Business",
      icon: "\uD83D\uDCCB",
      items: [
        { href: "depreciation-calculator.html", label: "Depreciation Calculator", page: "depreciation-calculator.html" }
      ]
    },
    {
      name: "Math",
      icon: "\uD83E\uDDEE",
      items: [
        { href: "scientific-calculator.html", label: "Scientific Calculator", page: "scientific-calculator.html" },
        { href: "fraction-calculator.html", label: "Fraction Calculator", page: "fraction-calculator.html" },
        { href: "percentage-calculator.html", label: "Percentage Calculator", page: "percentage-calculator.html" },
        { href: "random-number-generator.html", label: "Random Number Generator", page: "random-number-generator.html" },
        { href: "percent-error-calculator.html", label: "Percent Error Calculator", page: "percent-error-calculator.html" },
        { href: "exponent-calculator.html", label: "Exponent Calculator", page: "exponent-calculator.html" },
        { href: "binary-calculator.html", label: "Binary Calculator", page: "binary-calculator.html" },
        { href: "hex-calculator.html", label: "Hex Calculator", page: "hex-calculator.html" },
        { href: "half-life-calculator.html", label: "Half-Life Calculator", page: "half-life-calculator.html" },
        { href: "quadratic-formula-calculator.html", label: "Quadratic Formula Calculator", page: "quadratic-formula-calculator.html" },
        { href: "log-calculator.html", label: "Log Calculator", page: "log-calculator.html" },
        { href: "ratio-calculator.html", label: "Ratio Calculator", page: "ratio-calculator.html" },
        { href: "root-calculator.html", label: "Root Calculator", page: "root-calculator.html" },
        { href: "least-common-multiple-calculator.html", label: "Least Common Multiple Calculator", page: "least-common-multiple-calculator.html" },
        { href: "greatest-common-factor-calculator.html", label: "Greatest Common Factor Calculator", page: "greatest-common-factor-calculator.html" },
        { href: "factor-calculator.html", label: "Factor Calculator", page: "factor-calculator.html" },
        { href: "rounding-calculator.html", label: "Rounding Calculator", page: "rounding-calculator.html" },
        { href: "matrix-calculator.html", label: "Matrix Calculator", page: "matrix-calculator.html" },
        { href: "scientific-notation-calculator.html", label: "Scientific Notation Calculator", page: "scientific-notation-calculator.html" },
        { href: "big-number-calculator.html", label: "Big Number Calculator", page: "big-number-calculator.html" }
      ]
    }
  ];

  function currentPage() {
    var path = window.location.pathname.split("/").pop();
    return path || "index.html";
  }

  function tr(key) {
    return window.I18N ? window.I18N.t(key) : key;
  }

  function trPh(phrase) {
    return window.I18N ? window.I18N.p(phrase) : phrase;
  }

  function buildHeader() {
    var nav = "";
    nav += '<ul>';
    nav += '<li><a href="index.html" data-nav="index.html">' + tr("nav.home") + '</a></li>';
    nav += '<li><a href="emi-calculator.html" data-nav="emi-calculator.html">EMI</a></li>';
    nav += '<li><a href="home-loan.html" data-nav="home-loan.html">Home Loan</a></li>';
    nav += '<li><a href="car-loan.html" data-nav="car-loan.html">Car Loan</a></li>';
    nav += '<li><a href="personal-loan.html" data-nav="personal-loan.html">Personal</a></li>';
    nav += '<li><a href="dps.html" data-nav="dps.html">DPS</a></li>';
    nav += '<li><a href="fdr.html" data-nav="fdr.html">FDR</a></li>';
    nav += '<li><a href="retirement-calculator.html" data-nav="retirement-calculator.html">Retirement</a></li>';
    nav += '</ul>';

    return (
      '<header class="site-header">' +
      '<div class="header-inner">' +
      '<a href="index.html" class="brand">' +
      '<img src="logo.svg" class="brand-logo" alt="EMI Master logo" width="36" height="36">' +
      '<span>' + SITE_NAME + '</span>' +
      '</a>' +
      '<nav class="main-nav" id="mainNav">' + nav + '</nav>' +
      '<div class="header-tools">' +
      '<select class="lang-select" id="currencySelect" aria-label="Currency">' + buildCurrencyOptions() + '</select>' +
      '<button class="theme-toggle" id="themeToggle" title="Switch theme" aria-label="Toggle dark mode">&#127769;</button>' +
      '</div>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Menu">&#9776;</button>' +
      '</div>' +
      '</header>'
    );
  }

  function buildCurrencyOptions() {
    var flags = {
      USD: "\uD83C\uDDFA\uD83C\uDDF8", INR: "\uD83C\uDDEE\uD83C\uDDF3", BDT: "\uD83C\uDDE7\uD83C\uDDE9",
      EUR: "\uD83C\uDDEA\uD83C\uDDFA", GBP: "\uD83C\uDDEC\uD83C\uDDE7", CAD: "\uD83C\uDDE8\uD83C\uDDE6",
      AUD: "\uD83C\uDDE6\uD83C\uDDFA", JPY: "\uD83C\uDDEF\uD83C\uDDF5", CNY: "\uD83C\uDDE8\uD83C\uDDF3",
      AED: "\uD83C\uDDE6\uD83C\uDDEA", SAR: "\uD83C\uDDF8\uD83C\uDDE6", PKR: "\uD83C\uDDF5\uD83C\uDDF0",
      LKR: "\uD83C\uDDF1\uD83C\uDDF0", NPR: "\uD83C\uDDF3\uD83C\uDDF5", SGD: "\uD83C\uDDF8\uD83C\uDDEC",
      IDR: "\uD83C\uDDEE\uD83C\uDDE9", VND: "\uD83C\uDDFB\uD83C\uDDF3"
    };
    var opts = "";
    var current = window.I18N ? window.I18N.get() : "USD";
    var currencies = window.I18N ? window.I18N.currencies : { "USD": { name: "US Dollar", symbol: "$" } };
    for (var code in currencies) {
      if (!Object.prototype.hasOwnProperty.call(currencies, code)) continue;
      var flag = flags[code] || "";
      opts += '<option value="' + code + '"' + (code === current ? ' selected' : '') + '>' +
        flag + ' ' + currencies[code].symbol + ' ' + code + '</option>';
    }
    return opts;
  }

  function buildSidebar() {
    var current = currentPage();
    var html = '<aside class="sidebar">';
    html += '<div class="sidebar-card"><h3>Math Calculator</h3><ul class="calc-nav">';
    html += '<li><a href="index.html"' + (current === "index.html" ? ' class="active"' : "") + '>' +
      '<span class="sidebar-icon">&#127968;</span>' + tr('sidebar.all') + '</a></li>';

    CATEGORIES.forEach(function (cat, ci) {
      var open = false;
      cat.items.forEach(function (it) {
        if (it.page === current) open = true;
      });
      html += '<li class="cat-group' + (open ? " open" : "") + '">';
      html += '<button class="cat-toggle" data-group="cat-' + ci + '" aria-expanded="' + open + '">' +
        '<span class="sidebar-icon">' + cat.icon + '</span>' + trPh(cat.name) +
        '<span class="cat-arrow">&#9662;</span></button>';
      html += '<ul class="cat-items" id="cat-' + ci + '">';
      cat.items.forEach(function (it) {
        html += '<li><a href="' + it.href + '"' + (it.page === current ? ' class="active"' : "") + '>' +
          trPh(it.label) + '</a></li>';
      });
      html += '</ul></li>';
    });
    html += '</ul></div>';

    html += '<div class="sidebar-card"><h3>' + tr('sidebar.quicklinks') + '</h3><ul>';
    html += '<li><a href="privacy-policy.html"><span class="sidebar-icon">&#128274;</span>' + tr('sidebar.privacy') + '</a></li>';
    html += '</ul></div>';

    html += '<div class="ad-slot ad-slot-sidebar"><span class="ad-slot-label">' + tr('ad.label') + '</span></div>';
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
    html += '<p><strong>50+ advanced calculators</strong> for loans, mortgages, savings, ' +
      'investments, retirement and business finance.</p>';
    html += '</div>';
    html += '<div class="footer-col">';
    html += '<h4>' + tr('footer.popular') + '</h4><ul>';
    html += '<li><a href="emi-calculator.html">EMI Calculator</a></li>';
    html += '<li><a href="mortgage-calculator.html">Mortgage Calculator</a></li>';
    html += '<li><a href="home-loan.html">Home Loan Calculator</a></li>';
    html += '<li><a href="house-affordability.html">House Affordability</a></li>';
    html += '<li><a href="car-loan.html">Car Loan Calculator</a></li>';
    html += '<li><a href="compound-interest-calculator.html">Compound Interest</a></li>';
    html += '<li><a href="mutual-fund-calculator.html">Mutual Fund Calculator</a></li>';
    html += '<li><a href="roi-calculator.html">ROI Calculator</a></li>';
    html += '<li><a href="dps.html">DPS Calculator</a></li>';
    html += '<li><a href="fdr.html">FDR Calculator</a></li>';
    html += '<li><a href="retirement-calculator.html">Retirement Calculator</a></li>';
    html += '<li><a href="rent-vs-buy.html">Rent vs Buy</a></li>';
    html += '</ul></div>';
    html += '<div class="footer-col">';
    html += '<h4>' + tr('footer.company') + '</h4><ul>';
    html += '<li><a href="index.html">' + tr('nav.home') + '</a></li>';
    html += '<li><a href="loan-payoff.html">Loan Payoff Calculator</a></li>';
    html += '<li><a href="personal-loan.html">Personal Loan Calculator</a></li>';
    html += '<li><a href="debt-to-income.html">Debt-to-Income Ratio</a></li>';
    html += '<li><a href="apr-calculator.html">APR Calculator</a></li>';
    html += '<li><a href="refinance-calculator.html">Refinance Calculator</a></li>';
    html += '<li><a href="privacy-policy.html">' + tr('sidebar.privacy') + '</a></li>';
    html += '</ul></div>';
    html += '</div>';
    html += '<div class="footer-bottom">';
    html += '&copy; ' + year + ' ' + SITE_NAME + '. ' + tr('footer.rights') + ' ' +
      tr('footer.disclaimer');
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

  function renderChrome() {
    var headerSlot = document.getElementById("siteHeader");
    if (headerSlot) {
      headerSlot.innerHTML = buildHeader();
      var toggle = document.getElementById("navToggle");
      if (toggle) {
        toggle.addEventListener("click", function () {
          document.getElementById("mainNav").classList.toggle("open");
        });
      }
      var sel = document.getElementById("currencySelect");
      if (sel) {
        sel.value = window.I18N ? window.I18N.get() : "USD";
        sel.addEventListener("change", function () {
          if (window.I18N) window.I18N.setCurrency(sel.value);
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
  }

  function init() {
    renderChrome();
    window.addEventListener("localechange", renderChrome);
    initBackToTop();
    initFaqs();
    initHomeSearch();
    initToolbox();
    initPageTools();
    initSeoContent();
    initRelatedCalc();
  }

  /* ================================================================
     Advanced page toolbox: Table of Contents, Share, Print, Page tools
     ================================================================ */

  function initPageTools() {
    var main = document.querySelector(".main-content");
    if (!main || currentPage() === "index.html") return;
    if (main.querySelector(".content-section")) {
      var toolbar = document.createElement("div");
      toolbar.className = "page-tools";
      toolbar.innerHTML =
        '<button class="page-tool" id="toolPrint" title="Print this page">&#128424; Print</button>' +
        '<button class="page-tool" id="toolShare" title="Share this calculator">&#128279; Share</button>';
      main.insertBefore(toolbar, main.firstChild);

      var printBtn = document.getElementById("toolPrint");
      if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

      var shareBtn = document.getElementById("toolShare");
      if (shareBtn && navigator.share) {
        shareBtn.addEventListener("click", function () {
          navigator.share({
            title: document.title,
            text: document.querySelector('meta[name="description"]') ? document.querySelector('meta[name="description"]').content : "",
            url: window.location.href
          }).catch(function () { });
        });
      } else if (shareBtn) {
        shareBtn.addEventListener("click", function () {
          var tmp = document.createElement("input");
          tmp.value = window.location.href;
          document.body.appendChild(tmp);
          tmp.select();
          document.execCommand("copy");
          document.body.removeChild(tmp);
          showToast("Link copied to clipboard!");
        });
      }
    }
  }

  /* ================================================================
     SEO content injection: pulls rich content from seo-content.js
     ================================================================ */

  function initSeoContent() {
    var main = document.querySelector(".main-content");
    if (!main) return;
    var page = currentPage();
    if (page === "index.html" || page === "privacy-policy.html" || page === "404.html") return;
    if (!window.SEO_CONTENT || !window.SEO_CONTENT[page]) return;

    var data = window.SEO_CONTENT[page];
    var host = document.getElementById("siteFooter");

    var html = "";

    /* Quick facts bar */
    if (data.facts && data.facts.length) {
      html += '<div class="quick-facts">';
      data.facts.forEach(function (f) {
        html += '<div class="fact-chip"><strong>' + f.k + ':</strong> ' + f.v + '</div>';
      });
      html += '</div>';
    }

    /* Table of contents */
    if (data.sections && data.sections.length) {
      html += '<div class="content-section toc-card"><h2>On this page</h2><ol class="toc">';
      data.sections.forEach(function (s, i) {
        var anchor = s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        html += '<li><a href="#' + anchor + '">' + s.title + '</a></li>';
      });
      if (data.steps) html += '<li><a href="#how-to-use">How to use this calculator</a></li>';
      if (data.faqs) html += '<li><a href="#faq">Frequently asked questions</a></li>';
      html += '</ol></div>';
    }

    /* Intro */
    if (data.intro) {
      html += '<div class="content-section"><h2>' + (data.introTitle || 'About this calculator') + '</h2>';
      html += '<p>' + data.intro + '</p></div>';
    }

    /* Detailed sections */
    if (data.sections) {
      data.sections.forEach(function (s) {
        var anchor = s.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
        html += '<div class="content-section"><h2 id="' + anchor + '">' + s.title + '</h2>';
        if (Array.isArray(s.body)) {
          s.body.forEach(function (p) {
            html += '<p>' + p + '</p>';
          });
        } else {
          html += '<p>' + s.body + '</p>';
        }
        html += '</div>';
      });
    }

    /* How to use */
    if (data.steps && data.steps.length) {
      html += '<div class="content-section"><h2 id="how-to-use">How to use this calculator</h2><ol>';
      data.steps.forEach(function (s) {
        html += '<li>' + s + '</li>';
      });
      html += '</ol></div>';
    }

    /* Pro tips */
    if (data.tips && data.tips.length) {
      html += '<div class="content-section tips-box"><h2>Pro tips</h2><ul>';
      data.tips.forEach(function (t) {
        html += '<li>' + t + '</li>';
      });
      html += '</ul></div>';
    }

    /* Pros & cons */
    if (data.pros && data.cons) {
      html += '<div class="content-section"><h2>Advantages & considerations</h2>';
      html += '<div class="pros-cons">';
      html += '<div class="pros"><h3>&#9989; Advantages</h3><ul>';
      data.pros.forEach(function (p) { html += '<li>' + p + '</li>'; });
      html += '</ul></div>';
      html += '<div class="cons"><h3>&#9888;&#65039; Considerations</h3><ul>';
      data.cons.forEach(function (c) { html += '<li>' + c + '</li>'; });
      html += '</ul></div>';
      html += '</div></div>';
    }

    /* FAQ */
    if (data.faqs && data.faqs.length) {
      html += '<div class="content-section"><h2 id="faq">Frequently asked questions</h2>';
      data.faqs.forEach(function (f) {
        html += '<div class="faq-item"><div class="faq-q">' + f.q + '<span class="arrow">&#9654;</span></div>';
        html += '<div class="faq-a">' + f.a + '</div></div>';
      });
      html += '</div>';
    }

    /* Related calculators */
    if (data.related && data.related.length) {
      html += '<div class="content-section"><h2>Related calculators</h2><div class="related-grid">';
      data.related.forEach(function (r) {
        html += '<a class="related-card" href="' + r.href + '"><span class="related-icon">' + (r.icon || '&#128200;') + '</span><span>' + r.label + '</span></a>';
      });
      html += '</div></div>';
    }

    if (!html) return;

    var wrapper = document.createElement("div");
    wrapper.innerHTML = html;
    wrapper.className = "seo-content";
    main.appendChild(wrapper);
    initFaqs();
  }

  /* Related calculators from page header metadata */
  function initRelatedCalc() {
    var main = document.querySelector(".main-content");
    if (!main) return;
    var page = currentPage();
    var meta = document.getElementById("relatedData");
    if (!meta) return;
    try {
      var list = JSON.parse(meta.textContent);
      var html = '<div class="content-section"><h2>Related calculators</h2><div class="related-grid">';
      list.forEach(function (r) {
        html += '<a class="related-card" href="' + r.href + '"><span class="related-icon">' + (r.icon || '&#128200;') + '</span><span>' + r.label + '</span></a>';
      });
      html += '</div></div>';
      main.insertAdjacentHTML("beforeend", html);
    } catch (e) { /* ignore */ }
  }

  /* ================================================================
     Hero search / navigation helpers
     ================================================================ */

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
        "compound interest": "compound-interest-calculator.html",
        "simple interest": "simple-interest-calculator.html",
        "average return": "average-return-calculator.html",
        "payback period": "payback-period-calculator.html",
        "future value": "future-value-calculator.html",
        "present value": "present-value-calculator.html",
        "interest rate": "interest-rate-calculator.html",
        "interest calculator": "interest-calculator.html",
        "investment calculator": "investment-calculator.html",
        "mutual fund": "mutual-fund-calculator.html",
        "finance calculator": "finance-calculator.html",
        "savings calculator": "savings-calculator.html",
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
        "deposit pension scheme": "dps.html",
        "straight line": "depreciation-calculator.html",
        "depreciation": "depreciation-calculator.html",
        "written down value": "depreciation-calculator.html",
        "diminishing balance": "depreciation-calculator.html",
        "double declining": "depreciation-calculator.html",
        "units of production": "depreciation-calculator.html",
        "sum of years": "depreciation-calculator.html",
        "syd": "depreciation-calculator.html",
        "wdv": "depreciation-calculator.html",
        "slm": "depreciation-calculator.html",
        "ddb": "depreciation-calculator.html",
        "social security": "social-security-calculator.html",
        "retirement": "retirement-calculator.html",
        "annuity payout": "annuity-payout-calculator.html",
        "annuity": "annuity-calculator.html",
        "pension": "pension-calculator.html",
        "interest": "interest-calculator.html",
        "investment": "investment-calculator.html",
        "savings": "savings-calculator.html",
        "mutual": "mutual-fund-calculator.html",
        "bond": "bond-calculator.html",
        "irr": "irr-calculator.html",
        "roi": "roi-calculator.html",
        "payback": "payback-period-calculator.html",
        "cd": "cd-calculator.html",
        "rent": "rent-calculator.html",
        "dps": "dps.html",
        "fdr": "fdr.html",
        "fd": "fdr.html",
        "car": "car-loan.html",
        "loan": "emi-calculator.html",
        "emi": "emi-calculator.html",
        "deposit": "fdr.html",
        "scientific calculator": "scientific-calculator.html",
        "scientific": "scientific-calculator.html",
        "fraction": "fraction-calculator.html",
        "percentage": "percentage-calculator.html",
        "percent change": "percentage-calculator.html",
        "random number": "random-number-generator.html",
        "random": "random-number-generator.html",
        "percent error": "percent-error-calculator.html",
        "exponent": "exponent-calculator.html",
        "power": "exponent-calculator.html",
        "binary": "binary-calculator.html",
        "hex": "hex-calculator.html",
        "hexadecimal": "hex-calculator.html",
        "half life": "half-life-calculator.html",
        "half-life": "half-life-calculator.html",
        "quadratic": "quadratic-formula-calculator.html",
        "log": "log-calculator.html",
        "logarithm": "log-calculator.html",
        "ratio": "ratio-calculator.html",
        "root": "root-calculator.html",
        "square root": "root-calculator.html",
        "lcm": "least-common-multiple-calculator.html",
        "least common multiple": "least-common-multiple-calculator.html",
        "gcf": "greatest-common-factor-calculator.html",
        "greatest common factor": "greatest-common-factor-calculator.html",
        "factor": "factor-calculator.html",
        "rounding": "rounding-calculator.html",
        "matrix": "matrix-calculator.html",
        "scientific notation": "scientific-notation-calculator.html",
        "big number": "big-number-calculator.html",
        "math": "scientific-calculator.html"
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

  /* ================================================================
     Advanced toolbox: magic wand, live indicators
     ================================================================ */

  function initToolbox() {
    var main = document.querySelector(".main-content");
    if (!main || currentPage() === "index.html") return;
    if (main.querySelector(".card")) {
      var firstCard = main.querySelector(".card");
      if (!firstCard.querySelector(".form-actions")) {
        var actions = document.createElement("div");
        actions.className = "form-actions";
        actions.innerHTML =
          '<button class="btn btn-primary" id="calculateBtn" type="button">Calculate</button>' +
          '<button class="btn btn-outline" id="resetBtn" type="button">Reset</button>';
        firstCard.appendChild(actions);
      }
    }
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

  /* ----- advanced loan analytics ----- */
  function computeLoanInsights(principal, annualRate, termYears) {
    var insights = { enabled: principal > 0 && annualRate >= 0 && termYears > 0 };
    if (!insights.enabled) return insights;

    var monthlyRate = annualRate / 100 / 12;
    var totalMonths = Math.round(termYears * 12);
    var emi;

    if (monthlyRate === 0) {
      emi = principal / totalMonths;
    } else {
      var f = Math.pow(1 + monthlyRate, totalMonths);
      emi = (principal * monthlyRate * f) / (f - 1);
    }

    var totalInterest = emi * totalMonths - principal;
    var interestPctOfTotal = totalInterest > 0 ? (totalInterest / (principal + totalInterest)) * 100 : 0;
    var interestToPrincipal = principal > 0 ? totalInterest / principal : 0;
    var totalCost = principal + totalInterest;

    // find breakeven month where principal paid exceeds interest paid
    var balance = principal;
    var principalCum = 0;
    var interestCum = 0;
    var breakevenMonth = 0;
    var halfPaidMonth = 0;
    var halfInterestPaid = totalInterest / 2;
    var equity50Month = 0;

    for (var m = 1; m <= totalMonths; m++) {
      var intPart = balance * monthlyRate;
      var prinPart = emi - intPart;
      principalCum += prinPart;
      interestCum += intPart;
      balance = Math.max(0, balance - prinPart);

      if (breakevenMonth === 0 && principalCum >= interestCum) breakevenMonth = m;
      if (halfPaidMonth === 0 && interestCum >= halfInterestPaid) halfPaidMonth = m;
      if (equity50Month === 0 && principalCum >= principal * 0.5) equity50Month = m;
    }

    function fmtMonth(m) {
      if (m <= 0) return "—";
      var y = Math.floor(m / 12);
      var mm = m % 12;
      if (y === 0) return mm + "mo";
      if (mm === 0) return y + "y";
      return y + "y " + mm + "mo";
    }

    // effective rate doubling time via rule of 72 if investment comparison
    var doubleYears = annualRate > 0 ? 72 / annualRate : 0;

    insights.emi = emi;
    insights.totalInterest = totalInterest;
    insights.totalCost = totalCost;
    insights.interestPctOfTotal = interestPctOfTotal;
    insights.interestToPrincipal = interestToPrincipal;
    insights.breakevenMonth = breakevenMonth;
    insights.breakevenLabel = fmtMonth(breakevenMonth);
    insights.halfInterestMonth = halfPaidMonth;
    insights.halfInterestLabel = fmtMonth(halfPaidMonth);
    insights.equity50Month = equity50Month;
    insights.equity50Label = fmtMonth(equity50Month);
    insights.doubleYears = doubleYears;
    return insights;
  }

  function renderLoanInsights(principal, annualRate, termYears) {
    var container = document.getElementById("insightsPanel");
    if (!container) {
      var resultPanel = document.querySelector(".result-panel");
      if (!resultPanel) return;
      container = document.createElement("div");
      container.id = "insightsPanel";
      container.className = "content-section insights-panel";
      var title = document.createElement("h2");
      title.textContent = "Smart insights";
      container.appendChild(title);
      resultPanel.insertAdjacentElement("afterend", container);
    }

    var ins = computeLoanInsights(principal, annualRate, termYears);
    if (!ins.enabled) {
      container.innerHTML = '<div class="insights-empty">Enter valid loan details to see smart insights.</div>';
      return;
    }

    container.innerHTML =
      '<div class="insight-grid">' +
      '<div class="insight-card insight-primary">' +
      '<div class="insight-label">Interest vs Principal split</div>' +
      '<div class="insight-bar"><span class="bar-interest" style="width:' + ins.interestPctOfTotal.toFixed(1) + '%"></span></div>' +
      '<div class="insight-legend"><span>Interest ' + ins.interestPctOfTotal.toFixed(1) + '%</span><span>Principal ' + (100 - ins.interestPctOfTotal).toFixed(1) + '%</span></div>' +
      '</div>' +
      '<div class="insight-card">' +
      '<div class="insight-value">' + ins.breakevenLabel + '</div>' +
      '<div class="insight-label">Principal exceeds interest</div>' +
      '<div class="insight-desc">After this point, more of each payment builds equity.</div>' +
      '</div>' +
      '<div class="insight-card">' +
      '<div class="insight-value">' + ins.halfInterestLabel + '</div>' +
      '<div class="insight-label">Half of total interest paid</div>' +
      '<div class="insight-desc">Once past this, remaining interest is less than what you\'ve paid.</div>' +
      '</div>' +
      '<div class="insight-card">' +
      '<div class="insight-value">' + ins.equity50Label + '</div>' +
      '<div class="insight-label">50% equity owned</div>' +
      '<div class="insight-desc">When half the home is truly yours.</div>' +
      '</div>' +
      '<div class="insight-card">' +
      '<div class="insight-value">' + ins.interestToPrincipal.toFixed(2) + '×</div>' +
      '<div class="insight-label">Interest multiplier</div>' +
      '<div class="insight-desc">Total interest as a multiple of the loan amount.</div>' +
      '</div>' +
      '</div>';
  }

  /* ----- back to top ----- */
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

  /* ----- PWA: register service worker + inject manifest link ----- */
  function initPwa() {
    if (!document.querySelector('link[rel="manifest"]')) {
      var manifest = document.createElement("link");
      manifest.rel = "manifest";
      manifest.href = "manifest.json";
      document.head.appendChild(manifest);
    }
    if (!document.querySelector('meta[name="theme-color"]')) {
      var theme = document.createElement("meta");
      theme.name = "theme-color";
      theme.content = "#1d4ed8";
      document.head.appendChild(theme);
    }
    if (document.readyState === "complete" || document.readyState === "interactive") {
      registerSw();
    } else {
      window.addEventListener("load", registerSw);
    }
  }

  function registerSw() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").catch(function () { /* SW unavailable */ });
    }
  }

  initPwa();

  /* ----- export ----- */
  window.EMIMaster = {
    formatMoney: formatMoney,
    formatMoneyWhole: formatMoneyWhole,
    formatNumber: formatNumber,
    formatPercent: formatPercent,
    parseNum: parseNum,
    setRangeText: setRangeText,
    showToast: showToast,
    validateInputs: validateInputs,
    currentPage: currentPage,
    computeLoanInsights: computeLoanInsights,
    renderLoanInsights: renderLoanInsights
  };

  document.addEventListener("DOMContentLoaded", init);
})();
