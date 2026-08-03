# EMIMaster — Free EMI Calculator Website

A professional, SEO-optimized loan calculator website. Free to use, mobile-responsive, and ready to monetize with Google AdSense.

## Live Site

Deploy on **Netlify** by connecting this GitHub repository (see [Netlify guide](https://docs.netlify.com/git/overview/)).

**Planned domain:** `https://emimaster.com` — after purchasing the domain, update all `canonical` links, `sitemap.xml`, and `robots.txt` from `emimaster.com` to your actual domain (e.g. `https://emimaster.com`).

## Pages

### Core Calculators
| Page | Description |
|------|-------------|
| `index.html` | Homepage with hero search and calculator card grid |
| `emi-calculator.html` | Main EMI calculator with amortization schedule, compound frequency, payback frequency, and extra payments |
| `home-loan.html` | Home loan calculator including property tax, home insurance, PMI, and HOA fees |
| `car-loan.html` | Car loan calculator with down payment, trade-in, sales tax, and fees |
| `personal-loan.html` | Personal loan calculator with origination fee and extra payments |
| `loan-payoff.html` | Loan payoff comparison — extra payments vs standard payments |
| `dps.html` | DPS (Deposit Pension Scheme) maturity calculator with monthly growth schedule |
| `fdr.html` | FDR (Fixed Deposit) maturity calculator with compounding options |
| `privacy-policy.html` | Privacy policy (required for Google AdSense approval) |
| `404.html` | Custom 404 page |

### Mortgage & Real Estate
| Page | Description |
|------|-------------|
| `mortgage-calculator.html` | Mortgage payment including tax, insurance, PMI and HOA |
| `amortization-calculator.html` | Full loan amortization schedule with extra payments |
| `mortgage-payoff.html` | Mortgage payoff with extra payment comparison |
| `house-affordability.html` | How much house you can afford (28/36 rule) |
| `rent-calculator.html` | Rent affordability with the 30% rule |
| `debt-to-income.html` | Front-end and back-end debt-to-income ratios |
| `real-estate-calculator.html` | Property investment cash flow and returns |
| `refinance-calculator.html` | Refinance savings and break-even analysis |
| `rental-property.html` | Rental property cash flow, cap rate and ROI |
| `apr-calculator.html` | True cost of a loan including fees |
| `fha-loan.html` | FHA mortgage with upfront and annual MIP |
| `va-loan.html` | VA mortgage with funding fee, no PMI |
| `home-equity-loan.html` | Fixed-rate home equity loan payments |
| `heloc-calculator.html` | HELOC draw and repayment payments |
| `down-payment-calculator.html` | Down payment, loan amount and PMI planning |
| `rent-vs-buy.html` | Rent vs buy net-worth comparison |

## Features

- Live calculation — results update as you type or drag sliders
- Full amortization schedule with CSV export
- Extra monthly and one-time payment support
- DPS and FDR savings calculators with monthly growth schedules
- Mortgage & real estate suite (16 calculators)
- Dark mode with theme persistence
- Shared layout (header, sidebar, footer) injected by `js/common.js`
- Compound frequency (monthly → continuous) and payback frequency (monthly → weekly)
- Indian Rupee (₹) formatting
- SEO: meta tags, Open Graph, JSON-LD structured data (WebApplication + FAQPage), sitemap.xml, robots.txt
- Ad slot placeholders marked with `<!-- Advertisement -->` for Google AdSense
- Mobile responsive with sticky header navigation

## EMI Formula

```
EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
```

- `P` = loan amount
- `r` = periodic interest rate (adjusted for compound and payback frequency)
- `n` = total number of payments

## Run Locally

```bash
python -m http.server 8080
```

Then open http://localhost:8080

## Files

- `index.html`, `emi-calculator.html`, `home-loan.html`, `car-loan.html`, `personal-loan.html`, `loan-payoff.html`, `dps.html`, `fdr.html`, `privacy-policy.html`, `404.html` — core pages
- `mortgage-calculator.html`, `amortization-calculator.html`, `mortgage-payoff.html`, `house-affordability.html`, `rent-calculator.html`, `debt-to-income.html`, `real-estate-calculator.html`, `refinance-calculator.html`, `rental-property.html`, `apr-calculator.html`, `fha-loan.html`, `va-loan.html`, `home-equity-loan.html`, `heloc-calculator.html`, `down-payment-calculator.html`, `rent-vs-buy.html` — mortgage & real estate pages
- `css/style.css` — shared styles
- `js/common.js` — shared layout (header, sidebar, footer), theme toggle, search
- `js/emi.js` — loan / savings calculation engine (EMI, amortization, CSV)
- `js/mortgage.js` — mortgage & real estate calculation engine
- `favicon.svg` — site icon
- `robots.txt`, `sitemap.xml` — SEO
- `netlify.toml` — Netlify configuration (headers + 404 redirect)

## Before Going Live

1. Buy the `emimaster.com` domain and connect it to Netlify.
2. Replace `emimaster.com` in canonical tags, sitemap.xml, and robots.txt with your live domain.
3. Add your Google AdSense code in the marked `ad-slot` placeholder blocks.
4. Update the contact email in the privacy policy.
5. Submit `https://emimaster.com/sitemap.xml` in Google Search Console.
