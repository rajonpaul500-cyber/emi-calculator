const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");

const replacements = [
  {
    files: ["mortgage-payoff.html", "js/seo-content.js"],
    rules: [
      [/Save:<\/strong> Lakhs in interest/g, "Save:</strong> Thousands in interest"],
      [/\$5,000 extra\/month on a \$40 lakh mortgage saves lakhs and cuts years\./g, "$200 extra/month on a $350,000 mortgage saves thousands and cuts years."],
      [/a \$1,00,000 yearly bonus applied to principal/g, "a $5,000 yearly tax refund or bonus applied to principal"]
    ]
  },
  {
    files: ["va-loan.html", "js/seo-content.js"],
    rules: [
      [/a \$40 lakh conventional loan with 5% down carries ~\$19,000\/year in PMI/g, "a $400,000 conventional loan with 5% down carries ~$2,500 to $3,500/year in PMI"]
    ]
  },
  {
    files: ["home-loan.html", "js/seo-content.js"],
    rules: [
      [/In India, lenders cap your total EMI at 40–50% of net take-home income and usually require a down payment of 15–25%\./g, "In the US, mortgage lenders generally follow the 28/36 qualifying ratio rule and require down payments ranging from 3% to 20%."],
      [/For a \$10 lakh annual income, expect eligibility around \$40–50 lakh\./g, "For a $100,000 annual income, expect home purchasing power around $350,000 to $450,000."],
      [/on a \$40L, 20-year loan saves roughly \$4–5 lakh in interest\./g, "on a $400,000, 30-year loan saves over $40,000 in interest."],
      [/Claim tax deductions under 80C and 24\(b\) to reduce your effective cost\./g, "Deduct qualified mortgage interest on IRS Form 1040 Schedule A to lower your tax bill."]
    ]
  },
  {
    files: ["house-affordability.html", "js/seo-content.js"],
    rules: [
      [/How much house can I afford with \$1 lakh\/month income\?/g, "How much house can I afford with $10,000/month income?"],
      [/Housing budget ≈ \$28,000\/month\. At 6\.5% for 20 years with 20% down, that supports roughly a \$50,00,000–55,00,000 home\./g, "Housing budget ≈ $2,800/month (28% front-end ratio). At 6.5% for 30 years with 20% down, that supports roughly a $450,000–$500,000 home."]
    ]
  },
  {
    files: ["home-equity-loan.html", "js/seo-content.js"],
    rules: [
      [/On a \$1 crore home with a \$40 lakh mortgage, you may access \$40–45 lakh\./g, "On a $500,000 home with a $250,000 mortgage, you may access $150,000 to $175,000 in home equity."]
    ]
  },
  {
    files: ["down-payment-calculator.html", "js/seo-content.js"],
    rules: [
      [/A \$10,00,000 down payment in 3 years at 7% needs about \$25,000\/month saved — 10% of a \$2\.5 lakh monthly income\./g, "A $60,000 down payment in 3 years at 5% return needs about $1,550/month in dedicated savings."],
      [/Keep down-payment savings in FDs or liquid funds — never equity/g, "Keep down-payment savings in high-yield savings or CDs — never volatile stocks"]
    ]
  },
  {
    files: ["future-value-calculator.html", "js/seo-content.js"],
    rules: [
      [/Education: a \$20 lakh cost today at 10% inflation will be \$52\.9 lakh in 10 years — plan FV, not PV\./g, "College fund: a $100,000 tuition cost today at 5% inflation will be $162,889 in 10 years — plan FV, not PV."],
      [/Retirement: today\'s \$40,000 monthly expense at 6% inflation becomes \$1,28,000\/month in 20 years\./g, "Retirement: today's $5,000 monthly living expense at 3% inflation becomes $9,030/month in 20 years."]
    ]
  },
  {
    files: ["mutual-fund-calculator.html", "js/seo-content.js"],
    rules: [
      [/\$5,000\/month at 12% for 20 years becomes about \$50 lakh against \$12 lakh invested — \$38 lakh of wealth/g, "$500/month at 10% for 20 years becomes about $380,000 against $120,000 invested — $260,000 of wealth"]
    ]
  },
  {
    files: ["pension-calculator.html", "js/seo-content.js"],
    rules: [
      [/for 25 years totals about \$1\.74 crore — far more than the \$1\.2 crore without COLA\./g, "for 25 years totals about $1.74 million — far more than the $1.2 million without COLA."],
      [/has a present value near \$55 lakh\./g, "has a present value near $550,000."]
    ]
  },
  {
    files: ["irr-calculator.html", "js/seo-content.js"],
    rules: [
      [/a 50% IRR on \$1 lakh is worth less than 20% IRR on \$1 crore\./g, "a 50% IRR on $10,000 produces far less absolute wealth than 20% IRR on $1,000,000."]
    ]
  },
  {
    files: ["rental-property.html", "js/seo-content.js"],
    rules: [
      [/e\.g\. \$90,000 rent on a \$90 lakh property/g, "e.g. $3,000 rent on a $300,000 property"],
      [/Many Indian metros fall short/g, "Many high-demand housing markets fall short"]
    ]
  },
  {
    files: ["emi-calculator.html", "js/seo-content.js"],
    rules: [
      [/saving lakhs over 20 years\./g, "saving tens of thousands over the life of the loan."]
    ]
  }
];

let totalMod = 0;
for (const item of replacements) {
  for (const relFile of item.files) {
    const full = path.join(root, relFile);
    if (!fs.existsSync(full)) continue;
    let text = fs.readFileSync(full, "utf8");
    let orig = text;
    for (const [re, rep] of item.rules) {
      text = text.replace(re, rep);
    }
    if (text !== orig) {
      fs.writeFileSync(full, text, "utf8");
      totalMod++;
      console.log("Replaced terms in:", relFile);
    }
  }
}

console.log("Completed second pass. Total files touched:", totalMod);
