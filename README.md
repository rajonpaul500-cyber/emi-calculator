# EMI Master — 50+ Free Online Calculators

A professional, SEO-optimized financial calculator website. **100% free**, mobile-responsive, privacy-first (all calculations run in your browser), and ready to monetize with Google AdSense.

![Calculators](https://img.shields.io/badge/calculators-50%2B-blue) ![Language](https://img.shields.io/badge/language-HTML%20%2F%20CSS%20%2F%20JS-orange) ![License](https://img.shields.io/badge/license-MIT-green)

---

## 🚀 Live Site

Deploy on **Netlify** by connecting this GitHub repository (see [Netlify guide](https://docs.netlify.com/git/overview/)).

**Planned domain:** `https://emimaster.com` — after purchasing the domain, update all `canonical` links, `sitemap.xml`, and `robots.txt` from `emimaster.com` to your actual domain.

---

## 📱 Features

### Core Engine
- **Live calculation** — results update instantly as you type or drag sliders
- **Full amortization schedule** with monthly breakdown of principal, interest, extra payments & balance
- **CSV export** — download any amortization or savings schedule as a CSV file
- **Extra payment support** — monthly extra and one-time extra payments with payoff savings comparison
- **Compound frequency** — monthly, quarterly, semi-annually, annually, continuous
- **Payback frequency** — monthly, semi-monthly, biweekly, weekly

### Advanced Analytics (NEW)
- **Smart Insighits Panel** — every loan calculator now shows:
  - Interest vs Principal split bar
  - Break-even point (when principal payments exceed interest)
  - Half-interest milestone
  - 50% equity ownership timeline
  - Interest multiplier (total interest as a multiple of the loan)
- **Compare calculator** — side-by-side standard vs extra-payment comparison with savings banner

### Website Features
- **Premium design system** — gradient hero, animated cards, glassmorphism result panel, smooth micro-animations
- **Dark / Night mode** with persistence via localStorage
- **Multi-currency support** — 18 currencies (USD, INR, BDT, EUR, GBP, CAD, AUD, JPY, CNY, AED, SAR, PKR, LKR, NPR, SGD, IDR, VND, and more)
- **Category sidebar** with collapsible accordion navigation
- **Hero live search** with smart keyword matching (e.g. "home loan", "DPS", "compound interest")
- **On-page tools** — Table of Contents, Print, Share, back-to-top button
- **FAQ accordions** on every page
- **AdSense-ready** ad slot placeholders marked with `<!-- Advertisement -->`
- **404 page**, privacy policy, sitemap, robots.txt

### SEO System (NEW)
- **Automated rich content injection** — every calculator page gets:
  - Quick facts bar with key statistics
  - Table of contents
  - Long-form intro & detailed sections (300+ words each)
  - "How to use" step-by-step guide
  - Pro tips
  - Pros & cons
  - FAQ (5–8 questions with answers)
  - Related calculators grid
- **JSON-LD structured data** — WebSite schema + per-page WebApplication & FAQPage schemas
- **Open Graph** & **Twitter Card** meta tags
- **Canonical URLs** on every page

---

## 📚 Pages (47 Calculators)

### 🏦 Core Loan Calculators

| Page | Description |
|------|-------------|
| `emi-calculator.html` | Main EMI calculator — compound/payback frequency, extra payments, amortization, CSV |
| `home-loan.html` | Home loan with property tax, home insurance, PMI & HOA fees |
| `car-loan.html` | Car loan with down payment, trade-in, sales tax & fees |
| `personal-loan.html` | Personal loan with origination fee & extra payments |
| `loan-payoff.html` | Loan payoff comparison — extra payments vs standard |
| `dps.html` | DPS (Deposit Pension Scheme) maturity with monthly growth schedule |
| `fdr.html` | FDR (Fixed Deposit) maturity with compounding options |
| `privacy-policy.html` | Privacy policy (required for AdSense) |
| `404.html` | Custom 404 page |

### 🏠 Mortgage & Real Estate (16)

| Page | Description |
|------|-------------|
| `mortgage-calculator.html` | True mortgage payment incl. tax, insurance, PMI, HOA |
| `amortization-calculator.html` | Full amortization schedule with extra payments |
| `mortgage-payoff.html` | Mortgage payoff with extra payment comparison |
| `house-affordability.html` | How much house you can afford (28/36 rule) |
| `rent-calculator.html` | Rent budget with the 30% rule |
| `debt-to-income.html` | Front & back-end DTI ratios |
| `real-estate-calculator.html` | Property investment cash flow & returns |
| `refinance-calculator.html` | Refinance savings & break-even |
| `rental-property.html` | Rental cash flow, cap rate, cash-on-cash return |
| `apr-calculator.html` | True loan cost including fees |
| `fha-loan.html` | FHA mortgage with upfront & annual MIP |
| `va-loan.html` | VA mortgage with funding fee, no PMI |
| `home-equity-loan.html` | Fixed-rate home equity loan payments |
| `heloc-calculator.html` | HELOC draw & repayment payments |
| `down-payment-calculator.html` | Down payment, loan amount & PMI planning |
| `rent-vs-buy.html` | Rent vs buy net-worth comparison |

### 📈 Investment (16)

| Page | Description |
|------|-------------|
| `investment-calculator.html` | Future value with regular contributions |
| `compound-interest-calculator.html` | Daily → annual compounding growth |
| `mutual-fund-calculator.html` | SIP & lump-sum return projections |
| `roi-calculator.html` | Return on investment & annualized ROI |
| `irr-calculator.html` | Internal rate of return for cash flows |
| `payback-period-calculator.html` | Investment payback period |
| `interest-calculator.html` | Simple & compound interest |
| `savings-calculator.html` | Savings growth with deposits & compounding |
| `finance-calculator.html` | Flexible loan/investment/savings tool |
| `simple-interest-calculator.html` | Fast simple interest |
| `cd-calculator.html` | Certificate of Deposit maturity & yield |
| `bond-calculator.html` | Bond price, yield, clean vs dirty |
| `average-return-calculator.html` | Arithmetic & geometric average returns |
| `interest-rate-calculator.html` | Solve for required interest rate |
| `present-value-calculator.html` | Discounted present value |
| `future-value-calculator.html` | Future value projections |

### 🧓 Retirement (5)

| Page | Description |
|------|-------------|
| `retirement-calculator.html` | Monthly savings needed for retirement goal |
| `pension-calculator.html` | Monthly pension & total benefits |
| `social-security-calculator.html` | Benefits at different claiming ages |
| `annuity-calculator.html` | Annuity future value |
| `annuity-payout-calculator.html` | Monthly annuity income |

### 💼 Business (1)

| Page | Description |
|------|-------------|
| `depreciation-calculator.html` | SLM, declining balance, DDB, units of production, SYD |

---

## 🏗️ Architecture

```
emi-calculator/
├── index.html              → Premium hub: 47 calculators in 6 categories + live search
├── *.html                  → 47 calculator pages (each with SEO content injection)
├── css/
│   └── style.css           → Shared design system (light/dark, responsive, animations)
├── js/
│   ├── common.js           → Layout injection, theme, currency, search, insights, SEO renderer
│   ├── seo-content.js      → Rich SEO content database (facts, sections, FAQ, related)
│   ├── emi.js              → Loan/savings engine (EMI, DPS, FDR, amortization, CSV)
│   ├── mortgage.js         → Mortgage & real estate engine
│   ├── investment.js       → Investment & interest engine
│   ├── retirement.js       → Retirement & annuity engine
│   ├── depreciation.js     → Depreciation engine
│   ├── chart.js            → Dependency-free canvas chart renderer
│   └── currency.js         → Multi-currency formatting & localization
├── scripts/
│   └── inject-seo-content.js → Dev script for generating/verifying SEO content
├── favicon.svg
├── robots.txt, sitemap.xml
├── netlify.toml
└── privacy-policy.html
```

### How the calculation engines work

| Engine | Handles | Key formulas |
|--------|---------|--------------|
| `js/emi.js` | EMI, home/car/personal loans, DPS, FDR | `EMI = P·r·(1+r)ⁿ / ((1+r)ⁿ−1)`, future value of annuity |
| `js/mortgage.js` | Mortgage, affordability, rent, DTI, refinance, FHA/VA, HELOC, rent-vs-buy | Monthly payment + tax/insurance/PMI/HOA, 28/36 rule, break-even |
| `js/investment.js` | ROI, IRR, compound, savings, CD, bond, PV/FV, payback | Compound growth, NPV = 0 solver for IRR, rule of 72 |
| `js/retirement.js` | Retirement, pension, social security, annuities | FV of growing annuity, payout formulas |
| `js/depreciation.js` | 5 depreciation methods | SLM, DDB, SYD, units of production |

---

## 🧮 Key Formulas

### EMI
```
EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)
```
- `P` = loan amount
- `r` = periodic interest rate (adjusted for compounding & payback frequency)
- `n` = total number of payments

### Continuous Compounding
```
Effective Annual Rate = e^r − 1
```

### House Affordability (28/36 rule)
- Front-end ratio: `monthly housing costs ≤ 28% of gross monthly income`
- Back-end ratio: `total debt payments ≤ 36% of gross monthly income`

### Rule of 72
```
Years to double = 72 / annual interest rate
```

---

## 🖥️ Run Locally

```bash
# Option 1: Python
python -m http.server 8080

# Option 2: Node
npx serve .
```

Then open http://localhost:8080

---

## 🔧 Development

### Adding a new calculator page
1. Create `new-calculator.html` with the standard layout (`#siteHeader`, `.layout > main.main-content`, `#siteFooter`).
2. Add your calculator form inside a `.card` and a `.result-panel`.
3. Load `js/currency.js`, `js/seo-content.js`, `js/common.js` at the bottom.
4. Add its SEO content to `js/seo-content.js` under the page key.

### SEO content injection
`js/common.js` automatically looks up the current page in `window.SEO_CONTENT` and appends rich content (facts, sections, steps, tips, pros/cons, FAQ, related calculators) to `main.main-content`. To add/update content, edit `js/seo-content.js` only.

### Currency
`js/currency.js` provides `window.I18N` with `fmt()`, `t()`, `p()` and currency switching. Set `window.calcConfig.defaultCurrency` for default values.

---

## 📦 Deployment

### Netlify
1. Push this repository to GitHub.
2. In Netlify, **Add new site → Import from Git**.
3. Build command: leave empty · Publish directory: leave empty (root).
4. `netlify.toml` handles headers and the 404 redirect automatically.

### Domain
1. Buy `emimaster.com` and connect it in **Netlify → Domain settings**.
2. Replace `emimaster.com` in canonical tags, `sitemap.xml`, `robots.txt` with your live domain.
3. Add your Google AdSense code in the marked `ad-slot` placeholder blocks.
4. Update the contact email in `privacy-policy.html`.
5. Submit `https://emimaster.com/sitemap.xml` in Google Search Console.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/amazing-calculator`).
3. Commit your changes.
4. Push to the branch.
5. Open a Pull Request.

---

## 📄 License

MIT License © EMI Master — free to use, modify and distribute.

---

Made with ❤️ for anyone planning their finances better.