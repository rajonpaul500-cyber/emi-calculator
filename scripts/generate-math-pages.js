/* ==========================================================================
   EMI Master - Math calculator page generator
   Builds advanced, calculator.net-style, SEO-rich pages for all 20 math
   calculators from scripts/math-data.js. All content is original.

   Usage: node scripts/generate-math-pages.js
   ========================================================================== */

const fs = require('fs');
const path = require('path');
const data = require('./math-data.js');

const rootDir = path.resolve(__dirname, '..');
const GA = `<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-M8XM9611FL"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-M8XM9611FL');
</script>`;

const THEME = `<script>try{if(localStorage.getItem("emimaster-theme")==="dark")document.documentElement.setAttribute("data-theme","dark")}catch(e){}</script>`;

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildPage(p) {
  const webApp = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: p.name,
    url: 'https://emimaster.com/' + p.filename,
    description: p.description,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }
  });

  const faqJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: p.faqs.map(function (f) {
      return {
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a }
      };
    })
  });

  const relatedJson = JSON.stringify(p.related || []);

  const facts = (p.facts || []).map(function (f) {
    return '<div class="fact-chip"><strong>' + esc(f.k) + ':</strong> ' + f.v + '</div>';
  }).join('\n    ');

  const sections = (p.sections || []).map(function (s) {
    const anchor = s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const body = (Array.isArray(s.body) ? s.body : [s.body]).map(function (b) {
      return '<p>' + b + '</p>';
    }).join('\n      ');
    return '<div class="content-section"><h2 id="' + anchor + '">' + s.title + '</h2>' + body + '</div>';
  }).join('\n    ');

  const steps = (p.steps && p.steps.length)
    ? '<div class="content-section"><h2 id="how-to-use">How to use this calculator</h2><ol>' +
      p.steps.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ol></div>'
    : '';

  const tips = (p.tips && p.tips.length)
    ? '<div class="content-section tips-box"><h2>Pro tips</h2><ul>' +
      p.tips.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul></div>'
    : '';

  const prosCons =
    '<div class="content-section"><h2>Advantages &amp; considerations</h2>' +
    '<div class="pros-cons">' +
    '<div class="pros"><h3>&#9989; Advantages</h3><ul>' + p.pros.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>' +
    '<div class="cons"><h3>&#9888;&#65039; Considerations</h3><ul>' + p.cons.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ul></div>' +
    '</div></div>';

  const faqHtml =
    '<div class="content-section"><h2 id="faq">Frequently asked questions</h2>' +
    p.faqs.map(function (f) {
      return '<div class="faq-item"><div class="faq-q">' + f.q + '<span class="arrow">&#9654;</span></div><div class="faq-a">' + f.a + '</div></div>';
    }).join('\n      ') + '</div>';

  return `<!DOCTYPE html>
<html lang="en">
<head>
${GA}
${THEME}
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="keywords" content="${esc(p.keywords)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://emimaster.com/${p.filename}">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:type" content="website">
<meta property="og:url" content="https://emimaster.com/${p.filename}">
<script type="application/ld+json">${webApp}</script>
<script type="application/ld+json">${faqJson}</script>
<script type="application/json" id="relatedData">${relatedJson}</script>
<link rel="stylesheet" href="css/style.css">
<link rel="icon" type="image/svg+xml" href="favicon.svg">
${p.extraStyle || ''}
</head>
<body>

<div id="siteHeader"></div>

<section class="hero hero-compact">
  <div class="container">
    <h1>${esc(p.name)}</h1>
    <p>${esc(p.tagline)}</p>
  </div>
</section>

<div class="layout">
  <div id="siteSidebar"></div>

  <main class="main-content">
    <div class="breadcrumb"><a href="index.html">Home</a> &rsaquo; <a href="index.html#math">Math Calculators</a> &rsaquo; ${esc(p.name)}</div>
    <h1 class="page-title">${esc(p.name)}</h1>
    <p class="page-subtitle">${p.intro}</p>

${p.card}

    <div class="result-panel" id="resultPanel">
      <h3>Result</h3>
      <div class="result-main" id="resultMain">&mdash;</div>
      <div class="result-grid" id="resultGrid"></div>
    </div>

    <div class="ad-slot ad-slot-responsive"><span class="ad-slot-label">Advertisement</span></div>

    <div class="quick-facts">
    ${facts}
    </div>

${sections}
${steps}
${tips}
${prosCons}
${faqHtml}
  </main>
</div>

<div id="siteFooter"></div>

<script src="js/math.js"></script>
<script>
${p.script}
</script>
<script src="js/currency.js"></script>
<script src="js/seo-content.js"></script>
<script src="js/common.js"></script>
</body>
</html>
`;
}

let count = 0;
data.forEach(function (p) {
  const html = buildPage(p);
  const file = path.join(rootDir, p.filename);
  fs.writeFileSync(file, html, 'utf8');
  count++;
  console.log('Wrote ' + p.filename + ' (' + html.length + ' bytes)');
});
console.log('Generated ' + count + ' math calculator pages.');
