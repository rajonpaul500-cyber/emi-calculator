/* ==========================================================================
   EMI Master - Pre-render SEO content into static HTML
   ==========================================================================
   The site currently injects rich SEO content via JavaScript (js/seo-content.js
   + initSeoContent()). Google sees thin raw HTML → "Crawled - currently not
   indexed". This script bakes the exact same content directly into each
   calculator page as static HTML, so crawlers see it without executing JS.

   Safe to re-run (idempotent): matches and rewrites a marker comment.
   ========================================================================== */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const contentJs = path.join(root, "js", "seo-content.js");
const homeFile = path.join(root, "index.html");

/* ---- Load SEO_CONTENT from the JS file without executing page code ---- */
const sandbox = { window: {} };
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync(contentJs, "utf8"), sandbox, { filename: "seo-content.js" });
const SEO_CONTENT = sandbox.window.SEO_CONTENT || {};
console.log("Loaded SEO content for " + Object.keys(SEO_CONTENT).length + " pages.");

/* ---- Build the same static HTML that initSeoContent() would render ---- */
function slugify(s) {
    return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function esc(s) {
    var amp = String.fromCharCode(38); // &
    return String(s)
        .replace(/&/g, amp + "amp;")
        .replace(/</g, amp + "lt;")
        .replace(/>/g, amp + "gt;")
        .replace(/"/g, amp + "quot;");
}

function buildStaticContent(data) {
    var html = "";
    html += "<!-- =====================================================\n";
    html += "     SEO CONTENT (pre-rendered static) - do not remove\n";
    html += "     ===================================================== -->\n";

    /* Quick facts bar */
    if (data.facts && data.facts.length) {
        html += '<div class="content-section quick-facts">';
        data.facts.forEach(function (f) {
            html += '<div class="fact-chip"><strong>' + esc(f.k) + ':</strong> ' + esc(f.v) + "</div>";
        });
        html += "</div>\n";
    }

    /* Table of contents */
    if (data.sections && data.sections.length) {
        html += '<div class="content-section toc-card"><h2>On this page</h2><ol class="toc">';
        data.sections.forEach(function (s) {
            html += '<li><a href="#' + slugify(s.title) + '">' + esc(s.title) + "</a></li>";
        });
        if (data.steps) html += '<li><a href="#how-to-use">How to use this calculator</a></li>';
        if (data.faqs) html += '<li><a href="#faq">Frequently asked questions</a></li>';
        html += "</ol></div>\n";
    }

    /* Intro */
    if (data.intro) {
        html += '<div class="content-section"><h2>' + esc(data.introTitle || "About this calculator") + "</h2>";
        html += "<p>" + esc(data.intro) + "</p></div>\n";
    }

    /* Detailed sections */
    if (data.sections) {
        data.sections.forEach(function (s) {
            html += '<div class="content-section"><h2 id="' + slugify(s.title) + '">' + esc(s.title) + "</h2>";
            if (Array.isArray(s.body)) {
                s.body.forEach(function (p) { html += "<p>" + esc(p) + "</p>"; });
            } else {
                html += "<p>" + esc(s.body) + "</p>";
            }
            html += "</div>\n";
        });
    }

    /* How to use */
    if (data.steps && data.steps.length) {
        html += '<div class="content-section"><h2 id="how-to-use">How to use this calculator</h2><ol>';
        data.steps.forEach(function (s) { html += "<li>" + esc(s) + "</li>"; });
        html += "</ol></div>\n";
    }

    /* Pro tips */
    if (data.tips && data.tips.length) {
        html += '<div class="content-section tips-box"><h2>Pro tips</h2><ul>';
        data.tips.forEach(function (t) { html += "<li>" + esc(t) + "</li>"; });
        html += "</ul></div>\n";
    }

    /* Pros & cons */
    if (data.pros && data.cons) {
        html += '<div class="content-section"><h2>Advantages & considerations</h2>';
        html += '<div class="pros-cons">';
        html += '<div class="pros"><h3>&#9989; Advantages</h3><ul>';
        data.pros.forEach(function (p) { html += "<li>" + esc(p) + "</li>"; });
        html += "</ul></div>";
        html += '<div class="cons"><h3>&#9888;&#65039; Considerations</h3><ul>';
        data.cons.forEach(function (c) { html += "<li>" + esc(c) + "</li>"; });
        html += "</ul></div>";
        html += "</div></div>\n";
    }

    /* FAQ */
    if (data.faqs && data.faqs.length) {
        html += '<div class="content-section"><h2 id="faq">Frequently asked questions</h2>';
        data.faqs.forEach(function (f) {
            html += '<div class="faq-item"><div class="faq-q">' + esc(f.q) + '<span class="arrow">&#9654;</span></div>';
            html += '<div class="faq-a">' + esc(f.a) + "</div></div>";
        });
        html += "</div>\n";
    }

    /* Related calculators */
    if (data.related && data.related.length) {
        html += '<div class="content-section"><h2>Related calculators</h2><div class="related-grid">';
        data.related.forEach(function (r) {
            html += '<a class="related-card" href="' + esc(r.href) + '"><span class="related-icon">' + (r.icon || "&#128200;") + "</span><span>" + esc(r.label) + "</span></a>";
        });
        html += "</div></div>\n";
    }

    return html;
}

const MARKER_START = "<!--SEO-CONTENT-START-->";
const MARKER_END = "<!--SEO-CONTENT-END-->";

function injectStaticContent(filePath, data) {
    let html = fs.readFileSync(filePath, "utf8");
    const block = MARKER_START + "\n" + buildStaticContent(data) + MARKER_END + "\n";

    // Remove any previously injected block (idempotent)
    const startIdx = html.indexOf(MARKER_START);
    const endIdx = html.indexOf(MARKER_END);
    if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        html = html.slice(0, startIdx) + html.slice(endIdx + MARKER_END.length);
    }

    // Insert before </main> (preferred) or before <div id="siteFooter">
    let insertIndex = html.indexOf("</main>");
    if (insertIndex === -1) insertIndex = html.indexOf('<div id="siteFooter">');
    if (insertIndex === -1) {
        console.log("  SKIP (no insertion point): " + path.basename(filePath));
        return false;
    }

    html = html.slice(0, insertIndex) + "\n" + block + html.slice(insertIndex);
    fs.writeFileSync(filePath, html, "utf8");
    return true;
}

let updated = 0;
let skipped = 0;

const files = fs.readdirSync(root).filter(function (f) { return f.endsWith(".html") && f !== "index.html" && f !== "privacy-policy.html" && f !== "404.html"; });

files.forEach(function (file) {
    const key = file; // page key = filename, e.g. "loan-payoff.html"
    if (!SEO_CONTENT[key]) {
        skipped++;
        return;
    }
    const data = SEO_CONTENT[key];
    const full = path.join(root, file);
    const ok = injectStaticContent(full, data);
    if (ok) {
        updated++;
        console.log("  Baked in: " + file);
    } else {
        skipped++;
    }
});

console.log("\nDone. Baked static SEO content into " + updated + " page(s), skipped " + skipped + ".");