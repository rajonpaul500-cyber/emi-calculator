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
    if (!path) return "index.html";
    // Normalize clean URLs (e.g. /debt-to-income) to .html page keys
    if (path.indexOf(".html") === -1) path += ".html";
    return path;
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
      '<img src="logo.svg" class="brand-logo" alt="EMI Master logo" width="34" height="34">' +
      '<span>' + SITE_NAME + '</span>' +
      '</a>' +
      '<nav class="main-nav" id="mainNav">' + nav + '</nav>' +
      '<div class="header-tools">' +
      '<button type="button" class="header-search-btn" id="headerSearchBtn" title="Search Calculators (Ctrl+K)" aria-label="Search Calculators">' +
      '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
      '<span class="search-btn-text">Search...</span><span class="search-shortcut">⌘K</span>' +
      '</button>' +
      '<select class="lang-select" id="currencySelect" aria-label="Currency">' + buildCurrencyOptions() + '</select>' +
      '<button class="theme-toggle" id="themeToggle" title="Switch theme" aria-label="Toggle dark mode">&#127769;</button>' +
      '<button class="nav-toggle" id="navToggle" aria-label="Menu">&#9776;</button>' +
      '</div>' +
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
    html += '<div class="sidebar-card"><h3>All Calculators</h3><ul class="calc-nav">';
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
    html += '<li><a href="sitemap.html"><span class="sidebar-icon">&#128506;&#65039;</span>All Calculators (Sitemap)</a></li>';
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
    html += '<li><a href="sitemap.html"><strong>All Calculators (Sitemap)</strong></a></li>';
    html += '<li><a href="loan-payoff.html">Loan Payoff Calculator</a></li>';
    html += '<li><a href="personal-loan.html">Personal Loan Calculator</a></li>';
    html += '<li><a href="debt-to-income.html">Debt-to-Income Ratio</a></li>';
    html += '<li><a href="apr-calculator.html">APR Calculator</a></li>';
    html += '<li><a href="refinance-calculator.html">Refinance Calculator</a></li>';
    html += '<li><a href="privacy-policy.html">' + tr('sidebar.privacy') + '</a></li>';
    html += '</ul></div>';
    html += '<div class="footer-col">';
    html += '<h4>Math &amp; Tools</h4><ul>';
    html += '<li><a href="scientific-calculator.html">Scientific Calculator</a></li>';
    html += '<li><a href="percentage-calculator.html">Percentage Calculator</a></li>';
    html += '<li><a href="fraction-calculator.html">Fraction Calculator</a></li>';
    html += '<li><a href="amortization-calculator.html">Amortization Schedule</a></li>';
    html += '<li><a href="random-number-generator.html">Random Number Gen</a></li>';
    html += '<li><a href="binary-calculator.html">Binary Calculator</a></li>';
    html += '<li><a href="sitemap.html">&rarr; View All 50+ Tools</a></li>';
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
      var mainNav = document.getElementById("mainNav");
      if (toggle && mainNav) {
        toggle.addEventListener("click", function (e) {
          e.stopPropagation();
          mainNav.classList.toggle("open");
        });
        document.addEventListener("click", function (e) {
          if (mainNav.classList.contains("open") && !mainNav.contains(e.target) && !toggle.contains(e.target)) {
            mainNav.classList.remove("open");
          }
        });
        mainNav.addEventListener("click", function (e) {
          if (e.target.tagName === "A") {
            mainNav.classList.remove("open");
          }
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
    initGlobalQuickSearchModal();
    initIndexCategoryPills();
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

    var resultPanel = document.querySelector(".result-panel");
    if (resultPanel && !resultPanel.querySelector(".copy-result-btn")) {
      var copyBtn = document.createElement("button");
      copyBtn.className = "btn btn-outline copy-result-btn";
      copyBtn.type = "button";
      copyBtn.style.margin = "10px 0 0";
      copyBtn.style.padding = "7px 14px";
      copyBtn.style.fontSize = "0.82rem";
      copyBtn.style.borderRadius = "20px";
      copyBtn.innerHTML = "&#128203; Copy calculation summary";
      copyBtn.addEventListener("click", function () {
        var mainVal = resultPanel.querySelector(".result-main");
        var title = document.querySelector(".page-title");
        var text = (title ? title.textContent.trim() : document.title) + "\n";
        if (mainVal) text += "Result: " + mainVal.textContent.trim() + "\n";
        var items = resultPanel.querySelectorAll(".result-item");
        items.forEach(function (it) {
          var l = it.querySelector(".label");
          var v = it.querySelector(".value");
          if (l && v) text += l.textContent.trim() + ": " + v.textContent.trim() + "\n";
        });
        text += "\nCalculated at: " + window.location.href;
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            showToast("Results copied to clipboard!");
          });
        } else {
          var tmp = document.createElement("textarea");
          tmp.value = text;
          document.body.appendChild(tmp);
          tmp.select();
          document.execCommand("copy");
          document.body.removeChild(tmp);
          showToast("Results copied to clipboard!");
        }
      });
      var actions = resultPanel.querySelector(".result-actions");
      if (actions) {
        actions.appendChild(copyBtn);
      } else {
        resultPanel.appendChild(copyBtn);
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
    // If the SEO content was pre-rendered statically (see scripts/prerender-seo.js),
    // skip JS injection to avoid duplicate content on the page.
    if (main.innerHTML.indexOf("<!--SEO-CONTENT-START-->") !== -1) return;
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
     Master Calculators Registry & Search Engine
     ================================================================ */

  var CALCULATORS_REGISTRY = [
    // Math Category
    { title: "Scientific Calculator", url: "scientific-calculator.html", cat: "Math", icon: "📐", desc: "Scientific fx-991 PRO expression evaluator, trigonometry, logarithms, statistics", keywords: "scientific calc trig sin cos tan ln log power root pi e exponent radian degree fx 991 bangla gonona shastrio" },
    { title: "Fraction Calculator", url: "fraction-calculator.html", cat: "Math", icon: "➗", desc: "Add, subtract, multiply, divide fractions, mixed numbers, simplify & decimals", keywords: "fraction bhognangsho mixed number simplify reduce lcd numerator denominator divide add minus multiply" },
    { title: "Percentage Calculator", url: "percentage-calculator.html", cat: "Math", icon: "％", desc: "Percent of number, percentage change, increase, decrease & reverse percentage", keywords: "percentage percent shotokora discount tip tax mark up increase decrease change rate" },
    { title: "Random Number Generator", url: "random-number-generator.html", cat: "Math", icon: "🎲", desc: "Generate random integers, decimals, roll dice, flip coins, shuffle lists", keywords: "random number generator dice roll coin flip lottery pick sample shuffle integer min max" },
    { title: "Percent Error Calculator", url: "percent-error-calculator.html", cat: "Math", icon: "🎯", desc: "Experimental vs theoretical percent error, accuracy and deviation", keywords: "percent error experimental theoretical true observed value accuracy deviation physics lab chemistry" },
    { title: "Exponent Calculator", url: "exponent-calculator.html", cat: "Math", icon: "📈", desc: "Powers, negative exponents, fractional powers & power tables", keywords: "exponent power base index power of square cube power table negative exponent" },
    { title: "Binary Calculator", url: "binary-calculator.html", cat: "Math", icon: "01", desc: "Binary arithmetic (+ - × ÷) and bitwise operations (AND, OR, XOR, NOT)", keywords: "binary base 2 bitwise and or xor not 8bit 16bit 32bit bits nibble byte two's complement" },
    { title: "Hex Calculator", url: "hex-calculator.html", cat: "Math", icon: "0x", desc: "Hexadecimal converter & arithmetic between Decimal, Hex, Binary & Octal", keywords: "hex hexadecimal base 16 base 8 octal decimal converter bitwise arithmetic hex keypad" },
    { title: "Half-Life Calculator", url: "half-life-calculator.html", cat: "Math", icon: "⏳", desc: "Radioactive decay, carbon dating, half-life elapsed time and remaining mass", keywords: "half life decay radioactive isotope carbon 14 nuclear radiation remaining mass half-life period" },
    { title: "Quadratic Formula Calculator", url: "quadratic-formula-calculator.html", cat: "Math", icon: "🧮", desc: "Solve ax² + bx + c = 0 with real & complex roots, vertex and interactive curve", keywords: "quadratic formula equation roots discriminant vertex parabola axis symmetry complex solutions solver" },
    { title: "Log Calculator", url: "log-calculator.html", cat: "Math", icon: "🪵", desc: "Logarithm solver for Natural log (ln), Base 10, Base 2 & custom base with antilog", keywords: "log logarithm ln log10 log2 natural log euler antilog base change exponent inverse" },
    { title: "Ratio Calculator", url: "ratio-calculator.html", cat: "Math", icon: "⚖️", desc: "Simplify ratios, solve proportions A:B = C:D, and scale multi-part ratio splits", keywords: "ratio proportion simplify scaling divide share aspect ratio cross multiply anupat" },
    { title: "Root Calculator", url: "root-calculator.html", cat: "Math", icon: "√", desc: "Square root, cube root, nth roots with radical simplification and factors", keywords: "root square root cube root nth root radical surd radical simplify sqrt cbrt bormul" },
    { title: "Least Common Multiple (LCM)", url: "least-common-multiple-calculator.html", cat: "Math", icon: "🔢", desc: "LCM of two or more numbers with Prime Factorization & Division steps", keywords: "lcm least common multiple lcd losagu prime factor division ladder method" },
    { title: "Greatest Common Factor (GCF / GCD)", url: "greatest-common-factor-calculator.html", cat: "Math", icon: "🏛️", desc: "GCF & GCD finder with Euclidean algorithm and prime factor tree", keywords: "gcf gcd greatest common factor divisor hcf gosagu euclidean algorithm prime factors" },
    { title: "Factor Calculator", url: "factor-calculator.html", cat: "Math", icon: "🧩", desc: "List all factors, factor pairs, prime factorization, divisor sum and count", keywords: "factor prime factors divisors factor pairs prime composite gunoniyok factor tree" },
    { title: "Rounding Calculator", url: "rounding-calculator.html", cat: "Math", icon: "🪙", desc: "Round to decimal places, nearest multiple, significant figures, floor & ceiling", keywords: "rounding round decimal places sig figs significant figures nearest multiple floor ceil doshomik" },
    { title: "Matrix Calculator", url: "matrix-calculator.html", cat: "Math", icon: "▦", desc: "2x2 and 3x3 Matrix addition, multiplication, determinant, inverse & transpose", keywords: "matrix matrices determinant inverse transpose add multiply 2x2 3x3 linear algebra cramer" },
    { title: "Scientific Notation Calculator", url: "scientific-notation-calculator.html", cat: "Math", icon: "🔬", desc: "Standard to scientific notation, E-notation, engineering notation and arithmetic", keywords: "scientific notation e notation standard engineering powers of 10 mantissa exponent metric prefix" },
    { title: "Big Number Calculator", url: "big-number-calculator.html", cat: "Math", icon: "🐘", desc: "Arbitrary precision arithmetic, words in Western (Trillion) & Indian (Crore/Lakh)", keywords: "big number large number words lakh crore billion trillion bigint huge numbers arbitary precision" },

    // Financial & Loan Category
    { title: "Mortgage Calculator", url: "mortgage-calculator.html", cat: "Financial", icon: "🏡", desc: "Complete home mortgage payment with principal, interest, taxes, and insurance", keywords: "mortgage home loan monthly payment pmi property tax interest housing" },
    { title: "Amortization Calculator", url: "amortization-calculator.html", cat: "Financial", icon: "📊", desc: "Detailed month-by-month and annual amortization payment schedule", keywords: "amortization schedule payoff principal interest balance monthly table breakdown" },
    { title: "EMI Calculator", url: "emi-calculator.html", cat: "Financial", icon: "💳", desc: "Equal Monthly Installments for any loan with live payment schedule", keywords: "emi loan monthly payment installments interest calculator" },
    { title: "Home Loan Calculator", url: "home-loan.html", cat: "Financial", icon: "🏠", desc: "Home loan repayment estimator with prepayment and amortization", keywords: "home loan house finance mortgage loan emi property" },
    { title: "Car Loan Calculator", url: "car-loan.html", cat: "Financial", icon: "🚗", desc: "Auto loan calculator with trade-in, sales tax, fees, and monthly payment", keywords: "car loan auto vehicle financing down payment trade in automobile" },
    { title: "Personal Loan Calculator", url: "personal-loan.html", cat: "Financial", icon: "👤", desc: "Unsecured personal loan installments, interest costs, and repayment term", keywords: "personal loan signature loan unsecured emergency cash borrowing" },
    { title: "Refinance Calculator", url: "refinance-calculator.html", cat: "Financial", icon: "🔄", desc: "Compare new vs current mortgage, monthly savings and breakeven point", keywords: "refinance refi break even lower rate term mortgage savings" },
    { title: "FHA Loan Calculator", url: "fha-loan.html", cat: "Financial", icon: "🏛️", desc: "Government-backed FHA mortgage with Upfront & Annual MIP calculations", keywords: "fha loan government mortgage mip upfront annual 3.5 down payment" },
    { title: "VA Mortgage Calculator", url: "va-loan.html", cat: "Financial", icon: "🎖️", desc: "Zero down payment VA mortgage for US military veterans with funding fee", keywords: "va loan veterans military zero down funding fee certificate eligibility" },
    { title: "Home Equity Loan Calculator", url: "home-equity-loan.html", cat: "Financial", icon: "🧱", desc: "Fixed-rate second mortgage borrowing against your built-up home equity", keywords: "home equity second mortgage borrowing equity cash out ltv cltv" },
    { title: "HELOC Calculator", url: "heloc-calculator.html", cat: "Financial", icon: "📑", desc: "Home Equity Line of Credit draw period interest vs repayment phase", keywords: "heloc line of credit draw period interest only repayment variable rate" },
    { title: "House Affordability Calculator", url: "house-affordability.html", cat: "Financial", icon: "💰", desc: "How much house can you afford based on income, debt, and down payment", keywords: "house affordability how much home budget 28 36 rule income qualified" },
    { title: "Rent vs Buy Calculator", url: "rent-vs-buy.html", cat: "Financial", icon: "⚖️", desc: "Comprehensive financial comparison between renting and buying a home", keywords: "rent vs buy renting buying comparison wealth homeownership net worth" },
    { title: "Rent Calculator", url: "rent-calculator.html", cat: "Financial", icon: "🏢", desc: "Rent affordability based on gross income, 30% rule, and 50/30/20 budget", keywords: "rent rent affordability apartment lease 30 percent rule monthly rent" },
    { title: "Loan Payoff Calculator", url: "loan-payoff.html", cat: "Financial", icon: "🚀", desc: "Calculate early loan payoff savings with extra monthly or lump-sum payments", keywords: "loan payoff extra payment debt free principal reduction early mortgage" },
    { title: "APR Calculator", url: "apr-calculator.html", cat: "Financial", icon: "📉", desc: "True Annual Percentage Rate factoring in points, closing costs and lender fees", keywords: "apr annual percentage rate effective rate points closing costs true cost" },
    { title: "Debt-to-Income (DTI) Calculator", url: "debt-to-income.html", cat: "Financial", icon: "⚖️", desc: "Calculate your Front-End and Back-End DTI ratios for loan approval", keywords: "debt to income dti ratio front end back end mortgage qualification" },
    { title: "Down Payment Calculator", url: "down-payment-calculator.html", cat: "Financial", icon: "💵", desc: "Down payment savings timeline, target percentage, and PMI reduction", keywords: "down payment pmi savings target goal purchase price cash down" },
    { title: "Real Estate Calculator", url: "real-estate-calculator.html", cat: "Financial", icon: "🏘️", desc: "Real estate investment return, cap rate, cash on cash, and net income", keywords: "real estate property investment cap rate noi cash on cash return" },
    { title: "Rental Property Calculator", url: "rental-property.html", cat: "Financial", icon: "🏬", desc: "Rental cash flow, gross yield, vacancy rate, expenses, and ROI", keywords: "rental property landlord cash flow vacancy cap rate yield gross operating income" },

    // Investment & Savings
    { title: "Compound Interest Calculator", url: "compound-interest-calculator.html", cat: "Investment", icon: "📈", desc: "Compound interest growth with regular deposits and compounding frequencies", keywords: "compound interest compounding apy daily monthly annual future growth wealth" },
    { title: "Simple Interest Calculator", url: "simple-interest-calculator.html", cat: "Investment", icon: "📊", desc: "Simple interest I = P × r × t with total future value and rate solver", keywords: "simple interest principal rate time maturity value basic interest" },
    { title: "Investment Calculator", url: "investment-calculator.html", cat: "Investment", icon: "💼", desc: "Portfolio investment growth projection with asset allocation and contributions", keywords: "investment portfolio stocks bonds returns wealth building projections" },
    { title: "Savings Calculator", url: "savings-calculator.html", cat: "Investment", icon: "🐖", desc: "Savings goal tracker, monthly deposit requirements, and target completion date", keywords: "savings goal target timeline monthly deposit emergency fund" },
    { title: "Retirement Calculator", url: "retirement-calculator.html", cat: "Investment", icon: "🏖️", desc: "Retirement nest egg, 4% safe withdrawal rule, and retirement readiness", keywords: "retirement pension 401k ira nest egg safe withdrawal fire retirement age" },
    { title: "Social Security Calculator", url: "social-security-calculator.html", cat: "Investment", icon: "🇺🇸", desc: "Estimate US Social Security benefits at ages 62, Full Retirement Age (67), and 70", keywords: "social security retirement benefit ss pia full retirement age 62 70" },
    { title: "DPS Calculator", url: "dps.html", cat: "Investment", icon: "🏦", desc: "Deposit Pension Scheme maturity amount with compounding interest", keywords: "dps deposit pension scheme bangladesh monthly installment maturity" },
    { title: "FDR Calculator", url: "fdr.html", cat: "Investment", icon: "📜", desc: "Fixed Deposit Receipt interest earnings and maturity value", keywords: "fdr fixed deposit term deposit cd fixed return maturity interest" },
    { title: "Mutual Fund Calculator", url: "mutual-fund-calculator.html", cat: "Investment", icon: "💹", desc: "SIP & Lumpsum mutual fund return calculator with expense ratio", keywords: "mutual fund sip systematic investment lumpsum nav expense ratio returns" },
    { title: "Annuity Calculator", url: "annuity-calculator.html", cat: "Investment", icon: "🪙", desc: "Future value of ordinary annuity and annuity due with regular payments", keywords: "annuity ordinary due future value payment stream retirement cash flow" },
    { title: "Annuity Payout Calculator", url: "annuity-payout-calculator.html", cat: "Investment", icon: "💸", desc: "Calculate how long your capital will last with regular monthly withdrawals", keywords: "annuity payout withdrawal drawdown longevity capital exhaust" },
    { title: "Pension Calculator", url: "pension-calculator.html", cat: "Investment", icon: "🧓", desc: "Defined benefit pension payout estimator based on years of service and salary", keywords: "pension defined benefit retirement service salary monthly benefit" },
    { title: "Interest Calculator", url: "interest-calculator.html", cat: "Investment", icon: "💲", desc: "Calculate interest on any principal with custom compounding terms", keywords: "interest earning rate per annum annual yield simple compound" },
    { title: "Interest Rate Calculator", url: "interest-rate-calculator.html", cat: "Investment", icon: "🔍", desc: "Solve for the effective annual interest rate or APR on any loan or investment", keywords: "interest rate solve find rate apr ear effective rate yield" },
    { title: "Future Value Calculator", url: "future-value-calculator.html", cat: "Investment", icon: "🔮", desc: "Time value of money: calculate the future value (FV) of present cash flows", keywords: "future value fv time value money tvm discounting cash flow" },
    { title: "Present Value Calculator", url: "present-value-calculator.html", cat: "Investment", icon: "⏱️", desc: "Discount future cash flows back to today's present value (PV)", keywords: "present value pv discounting discount rate time value money" },
    { title: "ROI Calculator", url: "roi-calculator.html", cat: "Investment", icon: "🏆", desc: "Return on Investment percentage and annualized ROI for projects & businesses", keywords: "roi return on investment profit annualized gain margin performance" },
    { title: "Payback Period Calculator", url: "payback-period-calculator.html", cat: "Investment", icon: "⏳", desc: "Calculate exact time required to recover initial capital investment", keywords: "payback period capital recovery breakeven cash flows investment time" },
    { title: "Average Return Calculator", url: "average-return-calculator.html", cat: "Investment", icon: "📊", desc: "Arithmetic vs Geometric Mean (CAGR) returns on multi-year investments", keywords: "average return arithmetic mean geometric mean cagr compound annual return" },
    { title: "Bond Calculator", url: "bond-calculator.html", cat: "Investment", icon: "📜", desc: "Bond price, Yield to Maturity (YTM), and current yield evaluation", keywords: "bond ytm yield to maturity coupon price par value bond pricing" },
    { title: "IRR Calculator", url: "irr-calculator.html", cat: "Investment", icon: "🎯", desc: "Internal Rate of Return for series of positive & negative cash flows", keywords: "irr internal rate return npv cash flows hurdle rate financial evaluation" },
    { title: "CD Calculator", url: "cd-calculator.html", cat: "Investment", icon: "💿", desc: "Certificate of Deposit earnings, APY compounding, and maturity value", keywords: "cd certificate deposit apy bank interest term deposit penalty" },
    { title: "Finance Calculator", url: "finance-calculator.html", cat: "Investment", icon: "💼", desc: "General TVM solver for N, I/Y, PV, PMT, and FV financial equations", keywords: "finance tvm time value money ba ii plus solver financial math" },
    { title: "Depreciation Calculator", url: "depreciation-calculator.html", cat: "Investment", icon: "📉", desc: "Asset depreciation schedules: Straight-Line, Declining Balance, SYD, Units", keywords: "depreciation straight line slm wdv written down diminishing balance sum of years syd double declining" }
  ];

  function searchCalculators(query) {
    if (!query) return CALCULATORS_REGISTRY.slice(0, 10);
    var q = query.toLowerCase().trim();
    var words = q.split(/\s+/).filter(Boolean);

    var scored = CALCULATORS_REGISTRY.map(function (item) {
      var score = 0;
      var titleLower = item.title.toLowerCase();
      var descLower = item.desc.toLowerCase();
      var kwLower = item.keywords.toLowerCase();
      var catLower = item.cat.toLowerCase();

      if (titleLower === q) score += 100;
      else if (titleLower.indexOf(q) === 0) score += 60;
      else if (titleLower.indexOf(q) !== -1) score += 40;

      if (kwLower.indexOf(q) !== -1) score += 35;
      if (descLower.indexOf(q) !== -1) score += 20;
      if (catLower.indexOf(q) !== -1) score += 15;

      words.forEach(function (w) {
        if (titleLower.indexOf(w) !== -1) score += 15;
        if (kwLower.indexOf(w) !== -1) score += 10;
        if (descLower.indexOf(w) !== -1) score += 5;
      });

      return { item: item, score: score };
    });

    return scored
      .filter(function (s) { return s.score > 0; })
      .sort(function (a, b) { return b.score - a.score; })
      .map(function (s) { return s.item; });
  }

  function initGlobalQuickSearchModal() {
    // Inject modal HTML if not already present
    if (!document.getElementById("quickSearchModalOverlay")) {
      var modalHtml =
        '<div class="search-modal-overlay" id="quickSearchModalOverlay" role="dialog" aria-modal="true" aria-label="Search Calculators">' +
        '<div class="search-modal">' +
        '<div class="search-modal-header">' +
        '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>' +
        '<input type="text" class="search-modal-input" id="quickSearchModalInput" placeholder="Search 50+ calculators (e.g., fraction, quadratic, percentage, EMI)..." autocomplete="off">' +
        '<button type="button" class="search-modal-close" id="quickSearchModalClose" aria-label="Close search">&times;</button>' +
        '</div>' +
        '<div class="search-modal-results" id="quickSearchModalResults"></div>' +
        '<div class="search-modal-footer">' +
        '<span><strong>ProTip:</strong> Press <kbd>ESC</kbd> to close &bull; <kbd>&uarr;</kbd><kbd>&darr;</kbd> to navigate</span>' +
        '<span>50+ Free Calculators</span>' +
        '</div>' +
        '</div>' +
        '</div>';
      document.body.insertAdjacentHTML("beforeend", modalHtml);
    }

    var overlay = document.getElementById("quickSearchModalOverlay");
    var input = document.getElementById("quickSearchModalInput");
    var resultsBox = document.getElementById("quickSearchModalResults");
    var closeBtn = document.getElementById("quickSearchModalClose");
    var headerBtn = document.getElementById("headerSearchBtn");

    function renderModalResults(list) {
      if (!list || !list.length) {
        resultsBox.innerHTML = '<div style="padding: 24px; text-align: center; color: var(--text-muted, #64748b);">No calculators found matching your query. Try "Math", "Fraction", "Percentage", "Loan" or "EMI".</div>';
        return;
      }
      var html = "";
      list.slice(0, 12).forEach(function (c, idx) {
        html += '<a href="' + c.url + '" class="search-result-item' + (idx === 0 ? ' selected' : '') + '">' +
          '<div class="search-item-icon">' + c.icon + '</div>' +
          '<div class="search-item-info">' +
          '<div class="search-item-title">' + c.title + '</div>' +
          '<div class="search-item-desc">' + c.desc + '</div>' +
          '</div>' +
          '<span class="search-item-category">' + c.cat + '</span>' +
          '</a>';
      });
      resultsBox.innerHTML = html;
    }

    function openModal() {
      if (!overlay) return;
      overlay.classList.add("active");
      if (input) {
        input.value = "";
        input.focus();
        renderModalResults(CALCULATORS_REGISTRY.slice(0, 8));
      }
    }

    function closeModal() {
      if (!overlay) return;
      overlay.classList.remove("active");
    }

    if (headerBtn) {
      headerBtn.addEventListener("click", openModal);
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", closeModal);
    }

    if (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal();
      });
    }

    if (input) {
      input.addEventListener("input", function () {
        var query = input.value;
        var list = searchCalculators(query);
        renderModalResults(list);
      });

      input.addEventListener("keydown", function (e) {
        var items = resultsBox.querySelectorAll(".search-result-item");
        var selected = resultsBox.querySelector(".search-result-item.selected");
        var selIdx = -1;
        items.forEach(function (it, i) { if (it === selected) selIdx = i; });

        if (e.key === "ArrowDown") {
          e.preventDefault();
          if (selIdx < items.length - 1) {
            if (selected) selected.classList.remove("selected");
            items[selIdx + 1].classList.add("selected");
            items[selIdx + 1].scrollIntoView({ block: "nearest" });
          }
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          if (selIdx > 0) {
            if (selected) selected.classList.remove("selected");
            items[selIdx - 1].classList.add("selected");
            items[selIdx - 1].scrollIntoView({ block: "nearest" });
          }
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (selected) {
            window.location.href = selected.getAttribute("href");
          } else if (items.length > 0) {
            window.location.href = items[0].getAttribute("href");
          }
        } else if (e.key === "Escape") {
          closeModal();
        }
      });
    }

    // Global keyboard shortcut: Ctrl+K or / or Command+K
    window.addEventListener("keydown", function (e) {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        openModal();
      } else if (e.key === "/" && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        e.preventDefault();
        openModal();
      } else if (e.key === "Escape" && overlay && overlay.classList.contains("active")) {
        closeModal();
      }
    });
  }

  function initHomeSearch() {
    var form = document.getElementById("heroSearchForm");
    var input = document.getElementById("heroSearchInput");
    var heroWrap = document.querySelector(".hero-search");

    // Add floating dropdown for index hero search
    var dropdown = null;
    if (heroWrap && (currentPage() === "index.html" || currentPage() === "")) {
      heroWrap.classList.add("hero-search-wrapper");
      dropdown = document.createElement("div");
      dropdown.className = "hero-search-dropdown";
      dropdown.id = "heroSearchDropdown";
      heroWrap.appendChild(dropdown);
    }

    // Real-time live filtering on index.html
    if (input && (currentPage() === "index.html" || currentPage() === "")) {
      input.addEventListener("input", function () {
        var query = input.value.toLowerCase().trim();
        var cards = document.querySelectorAll(".calc-card");

        // Filter cards in grid
        cards.forEach(function (card) {
          var text = card.textContent.toLowerCase();
          var href = card.getAttribute("href") || "";
          var matchRegistry = CALCULATORS_REGISTRY.some(function (reg) {
            if (reg.url === href) {
              return reg.keywords.toLowerCase().indexOf(query) !== -1 || reg.title.toLowerCase().indexOf(query) !== -1;
            }
            return false;
          });

          if (!query || text.indexOf(query) !== -1 || matchRegistry) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });

        // Hide section headers if all cards inside are hidden
        var grids = document.querySelectorAll(".calc-grid");
        grids.forEach(function (grid) {
          var visibleCards = grid.querySelectorAll('.calc-card:not([style*="display: none"])');
          var sec = grid.closest(".calc-section") || grid.parentElement;
          if (sec && sec !== document.querySelector(".main-content")) {
            sec.style.display = (query && visibleCards.length === 0) ? "none" : "";
          }
        });

        // Live autocomplete dropdown on index
        if (dropdown) {
          if (query.length > 0) {
            var matches = searchCalculators(query);
            if (matches.length > 0) {
              var dropHtml = "";
              matches.slice(0, 6).forEach(function (m) {
                dropHtml += '<a href="' + m.url + '" class="search-result-item" style="padding:8px 12px; border-bottom: 1px solid var(--border, #f1f5f9);">' +
                  '<div class="search-item-icon" style="width:30px;height:30px;font-size:0.95rem;">' + m.icon + '</div>' +
                  '<div class="search-item-info">' +
                  '<div class="search-item-title" style="font-size:0.9rem;">' + m.title + '</div>' +
                  '<div class="search-item-desc" style="font-size:0.75rem;">' + m.desc + '</div>' +
                  '</div>' +
                  '<span class="search-item-category" style="font-size:0.68rem;">' + m.cat + '</span>' +
                  '</a>';
              });
              dropdown.innerHTML = dropHtml;
              dropdown.style.display = "block";
            } else {
              dropdown.style.display = "none";
            }
          } else {
            dropdown.style.display = "none";
          }
        }
      });

      // Close dropdown on outside click
      document.addEventListener("click", function (e) {
        if (dropdown && !heroWrap.contains(e.target)) {
          dropdown.style.display = "none";
        }
      });
    }

    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (input ? input.value : "").toLowerCase().trim();
      if (!q) return;

      var matches = searchCalculators(q);
      if (matches.length > 0) {
        window.location.href = matches[0].url;
      } else {
        showToast("Try searching for 'Fraction', 'Quadratic', 'Percentage', or 'EMI'");
      }
    });
  }

  function initIndexCategoryPills() {
    var pillBar = document.getElementById("catPills");
    if (!pillBar) return;
    pillBar.addEventListener("click", function (e) {
      var btn = e.target.closest(".cat-pill");
      if (!btn) return;
      pillBar.querySelectorAll(".cat-pill").forEach(function (p) { p.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-filter");

      var sections = document.querySelectorAll(".calc-section");
      if (filter === "all") {
        sections.forEach(function (sec) { sec.style.display = ""; });
      } else {
        sections.forEach(function (sec) {
          if (sec.getAttribute("data-cat") === filter) {
            sec.style.display = "";
          } else {
            sec.style.display = "none";
          }
        });
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
