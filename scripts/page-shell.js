/* Shared static HTML template builder for new EMI Master calculators & blog pages */

const DOMAIN = "https://emimaster.com";
const OG_IMAGE = DOMAIN + "/icons/og-banner.jpg";

function escHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildStaticFooter() {
  return `<div id="siteFooter">
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col">
        <h4>EMI Master</h4>
        <p>Free, instant, and private online calculators for finance, health, math, and everyday planning. Your inputs never leave your browser.</p>
        <p><a href="sitemap.html"><strong>&rarr; All 89 Calculators (Directory)</strong></a></p>
      </div>
      <div class="footer-col">
        <h4>Popular Calculators</h4>
        <ul>
          <li><a href="mortgage-calculator.html">Mortgage Calculator</a></li>
          <li><a href="emi-calculator.html">EMI Calculator</a></li>
          <li><a href="bmi-calculator.html">BMI Calculator</a></li>
          <li><a href="calorie-calculator.html">Calorie Calculator</a></li>
          <li><a href="age-calculator.html">Age Calculator</a></li>
          <li><a href="percentage-calculator.html">Percentage Calculator</a></li>
          <li><a href="scientific-calculator.html">Scientific Calculator</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Health &amp; Everyday</h4>
        <ul>
          <li><a href="bmr-calculator.html">BMR Calculator</a></li>
          <li><a href="body-fat-calculator.html">Body Fat Calculator</a></li>
          <li><a href="gpa-calculator.html">GPA Calculator</a></li>
          <li><a href="salary-calculator.html">Salary Calculator</a></li>
          <li><a href="date-calculator.html">Date Calculator</a></li>
          <li><a href="unit-converter.html">Unit Converter</a></li>
          <li><a href="password-generator.html">Password Generator</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Guides &amp; Info</h4>
        <ul>
          <li><a href="blog.html"><strong>Guides &amp; Blog</strong></a></li>
          <li><a href="blog-how-to-reduce-home-loan-interest.html">Save Loan Interest</a></li>
          <li><a href="blog-compound-interest-wealth-guide.html">Compound Interest Guide</a></li>
          <li><a href="blog-bmi-vs-body-fat-guide.html">BMI vs Body Fat</a></li>
          <li><a href="privacy-policy.html">Privacy Policy</a></li>
          <li><a href="sitemap.html"><strong>Complete HTML Sitemap</strong></a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      &copy; 2026 EMI Master. All rights reserved. For educational and planning purposes only.
    </div>
  </footer>
</div>`;
}

function buildCalculatorPage(cfg) {
  const canonical = DOMAIN + "/" + cfg.file;
  const webAppLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: cfg.h1,
    url: canonical,
    description: cfg.description,
    applicationCategory: cfg.schemaCategory || "UtilitiesApplication",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" }
  };

  const faqLd = cfg.faqs && cfg.faqs.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cfg.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  } : null;

  const bcLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN + "/" },
      { "@type": "ListItem", position: 2, name: cfg.catName, item: DOMAIN + "/" + cfg.catAnchor },
      { "@type": "ListItem", position: 3, name: cfg.h1, item: canonical }
    ]
  };

  const relatedHtml = (cfg.related && cfg.related.length) ? `
    <div class="content-section">
      <h2>Related calculators</h2>
      <div class="related-grid">
        ${cfg.related.map((r) => `<a class="related-card" href="${escHtml(r.href)}"><span class="related-icon">${r.icon || "📊"}</span><span>${escHtml(r.label)}</span></a>`).join("")}
      </div>
    </div>` : "";

  const faqHtml = (cfg.faqs && cfg.faqs.length) ? `
    <div class="content-section">
      <h2 id="faq">Frequently asked questions</h2>
      ${cfg.faqs.map((f) => `<div class="faq-item"><div class="faq-q">${escHtml(f.q)}<span class="arrow">&#9654;</span></div><div class="faq-a">${escHtml(f.a)}</div></div>`).join("\n      ")}
    </div>` : "";

  const quickFactsHtml = (cfg.facts && cfg.facts.length) ? `
    <div class="quick-facts">
      ${cfg.facts.map((f) => `<div class="fact-chip"><strong>${escHtml(f.k)}:</strong> ${escHtml(f.v)}</div>`).join("\n      ")}
    </div>` : "";

  const renderedCalcHtml = String(cfg.calculatorHtml || "")
    .replace(/class="result-panel"/g, 'class="result-panel show"')
    .replace(/class="payoff-note"/g, 'class="payoff-note show"');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Google tag (gtag.js) -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=G-M8XM9611FL"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-M8XM9611FL');
  </script>
  <script>try{if(localStorage.getItem("emimaster-theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}</script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escHtml(cfg.title)}</title>
  <meta name="description" content="${escHtml(cfg.description)}">
  <meta name="keywords" content="${escHtml(cfg.keywords)}">
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
  <link rel="canonical" href="${canonical}">
  <meta property="og:site_name" content="EMI Master">
  <meta property="og:title" content="${escHtml(cfg.title)}">
  <meta property="og:description" content="${escHtml(cfg.description)}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escHtml(cfg.title)}">
  <meta name="twitter:description" content="${escHtml(cfg.description)}">
  <meta name="twitter:image" content="${OG_IMAGE}">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
  <script type="application/ld+json">${JSON.stringify(webAppLd)}</script>
  ${faqLd ? `<script type="application/ld+json">${JSON.stringify(faqLd)}</script>` : ""}
  <script type="application/ld+json">${JSON.stringify(bcLd)}</script>
  <link rel="stylesheet" href="css/style.css">
  <link rel="icon" type="image/svg+xml" href="favicon.svg">
</head>
<body>

<div id="siteHeader"></div>

<div class="layout">
  <div id="siteSidebar"></div>

  <main class="main-content">
    <div class="breadcrumb"><a href="index.html">Home</a> &rsaquo; <a href="${escHtml(cfg.catAnchor)}">${escHtml(cfg.catName)}</a> &rsaquo; ${escHtml(cfg.h1)}</div>
    <h1 class="page-title">${escHtml(cfg.h1)}</h1>
    <p class="page-subtitle">${escHtml(cfg.subtitle)}</p>

    ${renderedCalcHtml}

    ${quickFactsHtml}

    ${cfg.editorialHtml}

    ${faqHtml}

    ${relatedHtml}
  </main>
</div>

${buildStaticFooter()}

<script>
${cfg.script}
</script>
<script src="js/currency.js"></script>
<script src="js/seo-content.js"></script>
<script src="js/common.js"></script>
</body>
</html>
`;
}

module.exports = { DOMAIN, OG_IMAGE, escHtml, buildStaticFooter, buildCalculatorPage };
