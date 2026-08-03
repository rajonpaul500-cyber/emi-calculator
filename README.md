# EMIMaster — Free EMI Calculator Website

A professional, SEO-optimized loan calculator website. Free to use, mobile-responsive, and ready to monetize with Google AdSense.

## Live Site

Deploy on **Netlify** by connecting this GitHub repository (see [Netlify guide](https://docs.netlify.com/git/overview/)).

**Planned domain:** `https://emimaster.com` — after purchasing the domain, update all `canonical` links, `sitemap.xml`, and `robots.txt` from `emimaster.com` to your actual domain (e.g. `https://emimaster.com`).

## Pages

| Page | Description |
|------|-------------|
| `index.html` | Main EMI / Loan calculator with amortization schedule, compound frequency, payback frequency, and extra payments |
| `home-loan.html` | Home loan calculator including property tax, home insurance, PMI, and HOA fees |
| `car-loan.html` | Car loan calculator with down payment, trade-in, sales tax, and fees |
| `personal-loan.html` | Personal loan calculator with origination fee and extra payments |
| `loan-payoff.html` | Loan payoff comparison — extra payments vs standard payments |
| `privacy-policy.html` | Privacy policy (required for Google AdSense approval) |
| `404.html` | Custom 404 page |

## Features

- Live calculation — results update as you type or drag sliders
- Full amortization schedule with CSV export
- Extra monthly and one-time payment support
- Principal vs interest visual breakdown
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

- `index.html`, `home-loan.html`, `car-loan.html`, `personal-loan.html`, `loan-payoff.html`, `privacy-policy.html`, `404.html` — pages
- `style.css` — shared styles
- `script.js` — shared calculation engine (EMI, amortization, CSV)
- `favicon.svg` — site icon
- `robots.txt`, `sitemap.xml` — SEO
- `netlify.toml` — Netlify configuration (headers + 404 redirect)

## Before Going Live

1. Buy the `emimaster.com` domain and connect it to Netlify.
2. Replace `emimaster.com` in canonical tags, sitemap.xml, and robots.txt with your live domain.
3. Add your Google AdSense code in the marked `ad-slot` placeholder blocks.
4. Update the contact email in the privacy policy.
5. Submit `https://emimaster.com/sitemap.xml` in Google Search Console.
