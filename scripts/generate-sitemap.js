const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const domain = "https://emimaster.com";
const today = "2026-09-15";

const files = fs.readdirSync(root).filter((f) => f.endsWith(".html") && f !== "404.html").sort();

// Priority mapping
function getPriority(file) {
  if (file === "index.html") return "1.0";
  if (["mortgage-calculator.html", "amortization-calculator.html", "emi-calculator.html", "car-loan.html", "personal-loan.html", "compound-interest-calculator.html", "investment-calculator.html", "retirement-calculator.html"].includes(file)) {
    return "0.9";
  }
  if (file === "privacy-policy.html") return "0.3";
  if (file === "sitemap.html") return "0.8";
  return "0.8";
}

function getFreq(file) {
  if (file === "index.html" || file === "mortgage-calculator.html" || file === "amortization-calculator.html") {
    return "daily";
  }
  if (file === "privacy-policy.html") return "yearly";
  return "weekly";
}

let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Homepage first
xml += '  <url>\n';
xml += '    <loc>' + domain + '/</loc>\n';
xml += '    <lastmod>' + today + '</lastmod>\n';
xml += '    <changefreq>daily</changefreq>\n';
xml += '    <priority>1.0</priority>\n';
xml += '  </url>\n';

for (const file of files) {
  if (file === "index.html") continue;
  xml += '  <url>\n';
  xml += '    <loc>' + domain + '/' + file + '</loc>\n';
  xml += '    <lastmod>' + today + '</lastmod>\n';
  xml += '    <changefreq>' + getFreq(file) + '</changefreq>\n';
  xml += '    <priority>' + getPriority(file) + '</priority>\n';
  xml += '  </url>\n';
}

xml += '</urlset>\n';

fs.writeFileSync(path.join(root, "sitemap.xml"), xml, "utf8");
console.log("Successfully generated sitemap.xml with " + (files.length) + " URLs.");
