/* ==========================================================================
   Site-Wide SEO, Schema & Mobile UX Upgrade Script
   - Removes duplicate hero-compact <h1> blocks so tools load immediately above the fold
   - Removes empty .ad-slot advertisement placeholders
   - Adds Google Fonts (Plus Jakarta Sans & JetBrains Mono) across all pages
   - Injects og:site_name, og:image, Twitter/X summary_large_image cards, and rich robots directives
   - Adds BreadcrumbList JSON-LD & upgrades WebApplication JSON-LD across all pages
   - Pre-renders static Related Calculators grid on pages with #relatedData for crawler discovery
   - Validates every JSON-LD script block
   ========================================================================== */

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const DOMAIN = "https://emimaster.com";
const OG_IMAGE = DOMAIN + "/icons/og-banner.jpg";

const CATEGORY_MAP = {
  // Loans
  "emi-calculator.html": { name: "Loan & EMI Calculators", anchor: "sitemap.html#loans" },
  "home-loan.html": { name: "Loan & EMI Calculators", anchor: "sitemap.html#loans" },
  "car-loan.html": { name: "Loan & EMI Calculators", anchor: "sitemap.html#loans" },
  "personal-loan.html": { name: "Loan & EMI Calculators", anchor: "sitemap.html#loans" },
  "loan-payoff.html": { name: "Loan & EMI Calculators", anchor: "sitemap.html#loans" },
  "debt-to-income.html": { name: "Loan & EMI Calculators", anchor: "sitemap.html#loans" },
  "apr-calculator.html": { name: "Loan & EMI Calculators", anchor: "sitemap.html#loans" },
  // Mortgage & Real Estate
  "mortgage-calculator.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "amortization-calculator.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "mortgage-payoff.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "house-affordability.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "rent-calculator.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "real-estate-calculator.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "refinance-calculator.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "rental-property.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "fha-loan.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "va-loan.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "home-equity-loan.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "heloc-calculator.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "down-payment-calculator.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  "rent-vs-buy.html": { name: "Mortgage & Real Estate", anchor: "sitemap.html#mortgages" },
  // Investment & Savings
  "dps.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "fdr.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "interest-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "investment-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "finance-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "compound-interest-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "interest-rate-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "savings-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "simple-interest-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "cd-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "bond-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "mutual-fund-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "average-return-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "irr-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "roi-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "payback-period-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "present-value-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  "future-value-calculator.html": { name: "Investment & Savings", anchor: "sitemap.html#investment" },
  // Retirement
  "retirement-calculator.html": { name: "Retirement & Pension", anchor: "sitemap.html#retirement" },
  "pension-calculator.html": { name: "Retirement & Pension", anchor: "sitemap.html#retirement" },
  "social-security-calculator.html": { name: "Retirement & Pension", anchor: "sitemap.html#retirement" },
  "annuity-calculator.html": { name: "Retirement & Pension", anchor: "sitemap.html#retirement" },
  "annuity-payout-calculator.html": { name: "Retirement & Pension", anchor: "sitemap.html#retirement" },
  // Business
  "depreciation-calculator.html": { name: "Business Calculators", anchor: "sitemap.html#business" },
  // Math
  "scientific-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "fraction-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "percentage-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "random-number-generator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "percent-error-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "exponent-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "binary-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "hex-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "half-life-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "quadratic-formula-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "log-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "ratio-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "root-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "least-common-multiple-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "greatest-common-factor-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "factor-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "rounding-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "matrix-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "scientific-notation-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" },
  "big-number-calculator.html": { name: "Math & Scientific", anchor: "sitemap.html#math" }
};

function decodeEntities(str) {
  return String(str || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, "'")
    .replace(/&ndash;/g, "-")
    .replace(/&mdash;/g, "-")
    .replace(/&plusmn;/g, "+/-")
    .replace(/\s+/g, " ")
    .trim();
}

function escAttr(str) {
  return decodeEntities(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function extractMeta(html, attrName, attrVal) {
  const re = new RegExp(`<meta\\s+[^>]*${attrName}=["']${attrVal}["'][^>]*content=["']([^"']*)["'][^>]*>`, "i");
  const m = html.match(re);
  if (m) return m[1];
  const re2 = new RegExp(`<meta\\s+[^>]*content=["']([^"']*)["'][^>]*${attrName}=["']${attrVal}["'][^>]*>`, "i");
  const m2 = html.match(re2);
  return m2 ? m2[1] : "";
}

const FONT_BLOCK =
  '  <link rel="preconnect" href="https://fonts.googleapis.com">\n' +
  '  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n' +
  '  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">\n';

const files = fs.readdirSync(root).filter((f) => f.endsWith(".html") && f !== "index.html" && f !== "404.html").sort();

let updatedCount = 0;
let jsonErrors = [];

for (const file of files) {
  const fullPath = path.join(root, file);
  let html = fs.readFileSync(fullPath, "utf8");
  const orig = html;

  // 1. Remove duplicate <section class="hero hero-compact">...</section>
  html = html.replace(/<section\s+class=["']hero\s+hero-compact["']>[\s\S]*?<\/section>\s*/gi, "");

  // 2. Remove empty <div class="ad-slot ...">...</div>
  html = html.replace(/<div\s+class=["']ad-slot[^"']*["'][^>]*>[\s\S]*?<\/div>\s*/gi, "");

  // 3. Upgrade robots meta directive
  html = html.replace(
    /<meta\s+name=["']robots["']\s+content=["'][^"']*["']\s*>/i,
    '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">'
  );

  // 4. Update outdated 50+ counts to 65+ in directory/footer copy
  html = html.replace(/50\+ free calculators/gi, "65+ free calculators");
  html = html.replace(/50\+ free online/gi, "65+ free online");
  html = html.replace(/All 50\+ Calculators/g, "All 65+ Calculators");
  html = html.replace(/all 50\+ tools/gi, "all 65+ tools");

  // 5. Extract title & description for OG / Twitter metadata
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const rawTitle = titleMatch ? decodeEntities(titleMatch[1]) : file;
  const rawDesc = decodeEntities(extractMeta(html, "name", "description"));
  const pageUrl = DOMAIN + "/" + file;
  const ogTitle = decodeEntities(extractMeta(html, "property", "og:title")) || rawTitle;
  const ogDesc = decodeEntities(extractMeta(html, "property", "og:description")) || rawDesc;

  // 6. Inject missing og:site_name, og:title, og:description, og:type, og:url, og:image, twitter:* tags
  let socialExtras = "";
  if (!/property=["']og:site_name["']/i.test(html)) {
    socialExtras += `  <meta property="og:site_name" content="EMI Master">\n`;
  }
  if (!/property=["']og:title["']/i.test(html)) {
    socialExtras += `  <meta property="og:title" content="${escAttr(ogTitle)}">\n`;
  }
  if (!/property=["']og:description["']/i.test(html) && ogDesc) {
    socialExtras += `  <meta property="og:description" content="${escAttr(ogDesc)}">\n`;
  }
  if (!/property=["']og:type["']/i.test(html)) {
    socialExtras += `  <meta property="og:type" content="website">\n`;
  }
  if (!/property=["']og:url["']/i.test(html)) {
    socialExtras += `  <meta property="og:url" content="${pageUrl}">\n`;
  }
  if (!/property=["']og:image["']/i.test(html)) {
    socialExtras += `  <meta property="og:image" content="${OG_IMAGE}">\n`;
  }
  if (!/name=["']twitter:card["']/i.test(html)) {
    socialExtras += `  <meta name="twitter:card" content="summary_large_image">\n`;
  }
  if (!/name=["']twitter:title["']/i.test(html)) {
    socialExtras += `  <meta name="twitter:title" content="${escAttr(ogTitle)}">\n`;
  }
  if (!/name=["']twitter:description["']/i.test(html) && ogDesc) {
    socialExtras += `  <meta name="twitter:description" content="${escAttr(ogDesc)}">\n`;
  }
  if (!/name=["']twitter:image["']/i.test(html)) {
    socialExtras += `  <meta name="twitter:image" content="${OG_IMAGE}">\n`;
  }

  if (socialExtras) {
    if (/<link\s+rel=["']stylesheet["']\s+href=["']css\/style\.css["']\s*>/i.test(html)) {
      html = html.replace(
        /(<link\s+rel=["']stylesheet["']\s+href=["']css\/style\.css["']\s*>)/i,
        socialExtras + "$1"
      );
    } else {
      html = html.replace(/<\/head>/i, socialExtras + "</head>");
    }
  }

  // 7. Inject Google Fonts right before css/style.css if not present
  if (!/fonts\.googleapis\.com/i.test(html)) {
    html = html.replace(
      /(<link\s+rel=["']stylesheet["']\s+href=["']css\/style\.css["']\s*>)/i,
      FONT_BLOCK + "  $1"
    );
  }

  // 8. Upgrade WebApplication JSON-LD with browserRequirements
  html = html.replace(
    /(<script\s+type=["']application\/ld\+json["']>)([\s\S]*?)(<\/script>)/gi,
    (full, openTag, body, closeTag) => {
      try {
        const obj = JSON.parse(body);
        if (obj["@type"] === "WebApplication") {
          obj.operatingSystem = "All";
          if (!obj.browserRequirements) {
            obj.browserRequirements = "Requires JavaScript";
          }
          return openTag + JSON.stringify(obj) + closeTag;
        }
      } catch (e) {
        // leave unparsed for final validation catch
      }
      return full;
    }
  );

  // 9. Inject BreadcrumbList JSON-LD if missing
  if (!/"BreadcrumbList"/.test(html)) {
    const h1Match = html.match(/<h1[^>]*class=["'][^"']*page-title[^"']*["'][^>]*>([\s\S]*?)<\/h1>/i);
    const toolName = h1Match ? decodeEntities(h1Match[1].replace(/<[^>]+>/g, "")) : rawTitle.split(" - ")[0].split(" | ")[0];
    let itemList;
    if (file === "sitemap.html") {
      itemList = [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN + "/" },
        { "@type": "ListItem", position: 2, name: "All Calculators Directory", item: pageUrl }
      ];
    } else if (file === "privacy-policy.html") {
      itemList = [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN + "/" },
        { "@type": "ListItem", position: 2, name: "Privacy Policy", item: pageUrl }
      ];
    } else {
      const cat = CATEGORY_MAP[file] || { name: "Calculators", anchor: "sitemap.html" };
      itemList = [
        { "@type": "ListItem", position: 1, name: "Home", item: DOMAIN + "/" },
        { "@type": "ListItem", position: 2, name: cat.name, item: DOMAIN + "/" + cat.anchor },
        { "@type": "ListItem", position: 3, name: toolName, item: pageUrl }
      ];
    }
    const bcSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: itemList
    };
    const bcTag = `  <script type="application/ld+json">${JSON.stringify(bcSchema)}</script>\n`;
    html = html.replace(/<\/head>/i, bcTag + "</head>");
  }

  // 10. Pre-render static Related Calculators section from #relatedData on pages lacking .related-grid
  const relMatch = html.match(/<script\s+type=["']application\/json["']\s+id=["']relatedData["']>([\s\S]*?)<\/script>/i);
  if (relMatch && !/class=["'][^"']*related-grid[^"']*["']/i.test(html)) {
    try {
      const list = JSON.parse(relMatch[1]);
      if (Array.isArray(list) && list.length > 0) {
        let relHtml = '\n    <div class="content-section"><h2>Related calculators</h2><div class="related-grid">';
        for (const r of list) {
          relHtml += `<a class="related-card" href="${escHtml(r.href)}"><span class="related-icon">${escHtml(r.icon || "📊")}</span><span>${escHtml(r.label)}</span></a>`;
        }
        relHtml += "</div></div>\n";
        html = html.replace(/<\/main>/i, relHtml + "  </main>");
      }
    } catch (e) {
      jsonErrors.push({ file, error: "relatedData JSON error: " + e.message });
    }
  }

  // Validate all JSON-LD scripts in this file
  const ldMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];
  ldMatches.forEach((m, idx) => {
    try {
      JSON.parse(m[1]);
    } catch (e) {
      jsonErrors.push({ file, ldIndex: idx, error: e.message });
    }
  });

  if (html !== orig) {
    fs.writeFileSync(fullPath, html, "utf8");
    updatedCount++;
  }
}

console.log(`Processed ${files.length} HTML files, updated ${updatedCount} files.`);
if (jsonErrors.length) {
  console.error("JSON-LD errors detected:", JSON.stringify(jsonErrors, null, 2));
  process.exit(1);
} else {
  console.log("All JSON-LD blocks validated cleanly.");
}
