const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));

const staticFooter = `<div id="siteFooter">
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-col">
        <h4>EMI Master</h4>
        <p>Free, instant, and private online calculators for mortgages, loans, investments, retirement, and mathematics. Your inputs never leave your browser.</p>
        <p><a href="sitemap.html"><strong>&rarr; All 50+ Calculators (Directory)</strong></a></p>
      </div>
      <div class="footer-col">
        <h4>Popular Calculators</h4>
        <ul>
          <li><a href="mortgage-calculator.html">Mortgage Calculator</a></li>
          <li><a href="amortization-calculator.html">Amortization Calculator</a></li>
          <li><a href="emi-calculator.html">EMI Calculator</a></li>
          <li><a href="home-loan.html">Home Loan Calculator</a></li>
          <li><a href="car-loan.html">Car Loan Calculator</a></li>
          <li><a href="personal-loan.html">Personal Loan Calculator</a></li>
          <li><a href="compound-interest-calculator.html">Compound Interest</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Loans &amp; Real Estate</h4>
        <ul>
          <li><a href="refinance-calculator.html">Refinance Calculator</a></li>
          <li><a href="fha-loan.html">FHA Loan Calculator</a></li>
          <li><a href="va-loan.html">VA Mortgage Calculator</a></li>
          <li><a href="home-equity-loan.html">Home Equity Loan</a></li>
          <li><a href="heloc-calculator.html">HELOC Calculator</a></li>
          <li><a href="loan-payoff.html">Loan Payoff Calculator</a></li>
          <li><a href="house-affordability.html">House Affordability</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Investment &amp; Tools</h4>
        <ul>
          <li><a href="investment-calculator.html">Investment Calculator</a></li>
          <li><a href="retirement-calculator.html">Retirement Calculator</a></li>
          <li><a href="social-security-calculator.html">Social Security</a></li>
          <li><a href="scientific-calculator.html">Scientific Calculator</a></li>
          <li><a href="percentage-calculator.html">Percentage Calculator</a></li>
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

let updated = 0;
for (const file of files) {
  const full = path.join(root, file);
  let html = fs.readFileSync(full, "utf8");
  if (html.includes('<div id="siteFooter"></div>')) {
    html = html.replace('<div id="siteFooter"></div>', staticFooter);
    fs.writeFileSync(full, html, "utf8");
    updated++;
  }
}

console.log("Injected crawlable static footer into " + updated + " pages.");
