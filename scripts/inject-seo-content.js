/* One-time maintenance script: injects <script src="js/seo-content.js">
   before js/common.js on every HTML page that loads common.js but not
   seo-content.js. Safe to re-run (idempotent). */
const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
let updated = 0;
let skipped = 0;

for (const file of files) {
    const full = path.join(root, file);
    let html = fs.readFileSync(full, "utf8");

    if (html.includes('src="js/seo-content.js"')) {
        skipped++;
        continue;
    }
    if (!html.includes('src="js/common.js"')) {
        skipped++;
        continue;
    }

    const needle = '<script src="js/common.js"></script>';
    if (!html.includes(needle)) {
        // Try a more flexible match
        const commonIdx = html.indexOf('src="js/common.js"');
        if (commonIdx === -1) {
            skipped++;
            continue;
        }
        // Find the closing > of the script tag
        let end = html.indexOf(">", commonIdx);
        if (end === -1) {
            skipped++;
            continue;
        }
        html = html.slice(0, commonIdx) + 'src="js/seo-content.js"></script>\n<script src="js/common.js"' + html.slice(end + 1);
    } else {
        html = html.replace(
            needle,
            '<script src="js/seo-content.js"></script>\n' + needle
        );
    }

    fs.writeFileSync(full, html, "utf8");
    updated++;
    console.log("Updated: " + file);
}

console.log("Done. Updated " + updated + " file(s), skipped " + skipped + ".");