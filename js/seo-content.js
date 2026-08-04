/* ==========================================================================
   EMI Master - SEO Content Database
   Rich, Google-friendly content injected into every calculator page.
   Each entry provides: quick facts, detailed sections, how-to steps,
   pro tips, advantages/considerations, FAQs and related calculators.
   ========================================================================== */

window.SEO_CONTENT = {
    /* ----------------------------------------------------------------
       EMI CALCULATOR
       ---------------------------------------------------------------- */
    "emi-calculator.html": {
        facts: [
            { k: "EMI", v: "Equated Monthly Instalment" },
            { k: "Formula", v: "P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1)" },
            { k: "Inputs", v: "Loan amount, rate, tenure" },
            { k: "Outputs", v: "EMI, total interest, amortization" }
        ],
        introTitle: "What is an EMI and how does it work?",
        intro: "EMI stands for Equated Monthly Instalment — the fixed amount you pay your lender every month until the loan is fully repaid. Each EMI has two parts: the principal (the money you borrowed) and the interest (the lender's fee). Early in the loan, most of your EMI goes toward interest; as the loan matures, the principal share grows. This calculator uses the standard amortization formula to give you the exact EMI, total interest and a complete month-by-month repayment schedule.",
        sections: [
            {
                title: "The EMI formula explained",
                body: [
                    "EMI = P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the loan principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly payments (tenure in years × 12).",
                    "For example, a ₹20,00,000 loan at 8.5% for 20 years gives r = 0.7083% and n = 240. Plugging into the formula produces an EMI of about ₹17,350.",
                    "Banks add processing fees and GST on top, so your effective cost is slightly higher than the pure EMI shown here."
                ]
            },
            {
                title: "Why the interest component is highest at the start",
                body: [
                    "Interest is charged on the outstanding balance, which is largest at the beginning. In month 1 of the example above, interest is about ₹14,167 and principal only ₹3,183.",
                    "By year 15 the balance has shrunk so much that the principal share of each EMI exceeds the interest share. This is called an amortizing loan.",
                    "Because interest is front-loaded, paying extra in the early years reduces total interest dramatically — completing a few extra payments in year 1 can save years of payments later."
                ]
            },
            {
                title: "How banks calculate your eligibility",
                body: [
                    "Most lenders use the FOIR (Fixed Obligation to Income Ratio) method: your total EMIs, including this new loan, should stay below 40–50% of your net monthly income.",
                    "Some use the multiplier approach — loan amount = annual income × 3 to 4.5, depending on your age and the lender.",
                    "Your credit score (CIBIL) heavily influences both approval and the interest rate offered. A score above 750 usually secures the best rates."
                ]
            }
        ],
        steps: [
            "Enter the loan amount you wish to borrow in the first field.",
            "Type the annual interest rate offered by your lender (for example 8.5).",
            "Choose the loan tenure in years.",
            "The EMI, total interest and amortization schedule update instantly as you type.",
            "Use the sliders (if visible) to explore how different tenures change your EMI."
        ],
        tips: [
            "A longer tenure lowers your EMI but more than doubles total interest — always compare total cost, not just the monthly number.",
            "A higher credit score (750+) typically gets you 0.25–0.50% lower interest, saving lakhs over 20 years.",
            "Making one extra EMI per year can reduce a 20-year loan by roughly 3–4 years."
        ],
        pros: [
            "Instant, accurate EMI with no sign-up",
            "Full amortization schedule included",
            "Compare rates by tweaking inputs live"
        ],
        cons: [
            "Does not include processing fees or GST automatically",
            "Actual bank rates vary by credit profile"
        ],
        faqs: [
            {
                q: "How is EMI calculated?",
                a: "EMI is calculated using the formula P × r × (1+r)ⁿ ÷ ((1+r)ⁿ − 1), where P is the principal, r the monthly interest rate, and n the number of months. This formula gives a constant monthly payment that fully repays the loan by the end of the tenure."
            },
            {
                q: "What is a good EMI-to-income ratio?",
                a: "Financial advisors recommend keeping all your EMIs below 40–50% of your net monthly income. If your EMI alone exceeds this, lenders will usually reject or reduce the loan amount."
            },
            {
                q: "Can I prepay my loan?",
                a: "Yes. Most lenders allow part-prepayment after a lock-in period. Since interest is front-loaded, prepaying early saves the most interest. Some banks charge a prepayment penalty, so check your loan agreement."
            },
            {
                q: "What is the difference between fixed and floating interest rates?",
                a: "A fixed rate stays constant for the entire loan or a lock-in period. A floating rate moves with the repo rate / MCLR. Floating loans are usually cheaper but carry uncertainty about future EMIs."
            },
            {
                q: "Does the EMI change if I increase my tenure?",
                a: "Increasing the tenure reduces the EMI but increases the total interest paid because you pay interest for a longer period. Use the sliders to see this trade-off visually."
            }
        ],
        related: [
            { href: "home-loan.html", label: "Home Loan Calculator", icon: "🏠" },
            { href: "car-loan.html", label: "Car Loan Calculator", icon: "🚗" },
            { href: "personal-loan.html", label: "Personal Loan Calculator", icon: "👤" },
            { href: "amortization-calculator.html", label: "Amortization Calculator", icon: "📊" },
            { href: "loan-payoff.html", label: "Loan Payoff Calculator", icon: "⏱️" }
        ]
    },

    /* ----------------------------------------------------------------
       HOME LOAN
       ---------------------------------------------------------------- */
    "home-loan.html": {
        facts: [
            { k: "Purpose", v: "Buy / construct a home" },
            { k: "Typical rate", v: "8.4% – 10.5% p.a." },
            { k: "Max tenure", v: "30 years" },
            { k: "Tax benefit", v: "Sec 24(b): ₹2L int. / Sec 80C: ₹1.5L principal" }
        ],
        introTitle: "Home Loan Calculator — plan your dream home",
        intro: "A home loan is the largest financial commitment most people ever make. This calculator helps you understand exactly what your monthly EMI will be, how much interest you will pay over the full tenure, and how much of each payment builds your equity. Compare tenures, explore the effect of a slightly lower interest rate, and plan your home purchase with confidence.",
        sections: [
            {
                title: "Current home loan interest rates in India (2025)",
                body: [
                    "SBI, HDFC, ICICI and other major banks offer home loans between 8.4% and 10.5% p.a. depending on your credit score, loan amount and employer category.",
                    "Women borrowers and properties with green certification often qualify for 0.05–0.15% rate discounts.",
                    "The repo rate set by the RBI is the single biggest driver of floating home loan rates. When the repo rate falls, your EMI can be reduced or the tenure shortened."
                ]
            },
            {
                title: "Tax benefits of a home loan",
                body: [
                    "Under Section 24(b), interest paid on a self-occupied home loan is deductible up to ₹2,00,000 per year. For a let-out property, there is no upper cap on the interest deduction.",
                    "Under Section 80C, principal repayment qualifies for deduction up to ₹1,50,000, shared with other eligible investments like PPF and ELSS.",
                    "First-time home buyers can claim an additional ₹50,000 interest deduction under Section 80EE (conditions apply)."
                ]
            },
            {
                title: "How much home loan can you afford?",
                body: [
                    "The 28/36 rule: keep your housing payment below 28% of gross income, and total debts below 36%.",
                    "In India, lenders cap your total EMI at 40–50% of net take-home income and usually require a down payment of 15–25%.",
                    "A common multiplier is 4–5× your annual income. For a ₹10 lakh annual income, expect eligibility around ₹40–50 lakh."
                ]
            }
        ],
        steps: [
            "Enter the home loan amount you plan to borrow.",
            "Input the interest rate — check your bank's current rate or use 8.5% as a starting point.",
            "Set the tenure, typically 20–30 years.",
            "Review the EMI, total interest and amortization results.",
            "Adjust the tenure slider to see how much interest you can save with a shorter term."
        ],
        tips: [
            "A 0.5% lower rate on a ₹40L, 20-year loan saves roughly ₹4–5 lakh in interest.",
            "Claim tax deductions under 80C and 24(b) to reduce your effective cost.",
            "If your income grows, use annual bonuses for part-prepayment — it cuts interest massively."
        ],
        pros: [
            "Longest tenure available (up to 30 years) keeps EMI low",
            "Major tax deductions on both interest and principal",
            "Real estate historically appreciates with inflation"
        ],
        cons: [
            "Long tenures mean huge total interest payouts",
            "Bank charges processing fees, legal and valuation charges",
            "Fall in property value can leave you with negative equity"
        ],
        faqs: [
            {
                q: "Which bank gives the lowest home loan rate?",
                a: "Rates keep changing with the RBI repo rate. As a rule, SBI, HDFC, ICICI and Kotak are typically among the lowest. Your final rate depends on your CIBIL score, income and loan amount."
            },
            {
                q: "Should I choose a fixed or floating rate?",
                a: "If you expect rates to fall, floating is better. If you want certainty, fixed offers peace of mind but usually at a premium of 0.5–1%. In India, most borrowers choose floating rates."
            },
            {
                q: "What is the maximum home loan tenure?",
                a: "Most banks offer up to 30 years, but your age at loan maturity is usually capped at 60–65 for salaried employees and 70 for self-employed."
            }
        ],
        related: [
            { href: "emi-calculator.html", label: "EMI Calculator", icon: "💹" },
            { href: "house-affordability.html", label: "House Affordability", icon: "🏠" },
            { href: "mortgage-calculator.html", label: "Mortgage Calculator", icon: "🏡" },
            { href: "down-payment-calculator.html", label: "Down Payment", icon: "💵" },
            { href: "loan-payoff.html", label: "Loan Payoff", icon: "⏱️" }
        ]
    },

    /* ----------------------------------------------------------------
       CAR LOAN
       ---------------------------------------------------------------- */
    "car-loan.html": {
        facts: [
            { k: "Typical rate", v: "8.5% – 11% p.a." },
            { k: "Max tenure", v: "7–8 years" },
            { k: "Down payment", v: "10–20% usually" },
            { k: "Processing fee", v: "0.5 – 1%" }
        ],
        introTitle: "Car Loan Calculator — drive your new car home",
        intro: "Buying a car with a loan means deciding between a higher down payment, a shorter tenure and a higher EMI, or a longer tenure and lower EMI. This car loan calculator shows you every combination instantly — including total interest, principal split and a full amortization schedule — so you can choose a plan that fits your budget without overpaying.",
        sections: [
            {
                title: "Car loan vs. other financing options",
                body: [
                    "Car loans are secured by the vehicle itself, so rates (8.5–11%) are far lower than credit card or personal loan rates.",
                    "A bigger down payment (20%+) lowers the financed amount and reduces the risk of being underwater when the car depreciates.",
                    "Some dealers offer 'low rate' schemes but compensate with higher add-ons and insurance costs — compare the total outlay, not just the rate."
                ]
            },
            {
                title: "The true cost of car ownership",
                body: [
                    "For a ₹10 lakh car financed over 5 years, the interest alone can exceed ₹2 lakh. Adding fuel, insurance, maintenance and depreciation, the true cost is roughly 1.5–2× the sticker price.",
                    "New cars lose 20–30% of their value in the first year. A 3-year used car often costs half of a new one with minimal additional risk.",
                    "Always insure comprehensive cover — lenders require it, and a single accident can erase years of savings."
                ]
            }
        ],
        steps: [
            "Enter the car's on-road price or the loan amount you need.",
            "Input the interest rate quoted by the bank or NBFC.",
            "Set the tenure — 4 to 7 years is common.",
            "Review your EMI, total interest and amortization schedule.",
            "Try adding a bigger down payment to see lower EMIs."
        ],
        tips: [
            "Keep the tenure to 5 years or less — cars depreciate faster than you repay otherwise.",
            "Pre-approved offers from your bank can save 0.5% compared to dealer financing.",
            "Check for balloon payment options; they lower EMI but create a large final payment."
        ],
        faqs: [
            {
                q: "What is the down payment for a car loan?",
                a: "Most banks require 10–20% of the on-road price. A larger down payment reduces both the EMI and the total interest, and avoids negative equity in a depreciating asset."
            },
            {
                q: "Can I prepay a car loan?",
                a: "Yes, most lenders allow full or part prepayment, often after 6–12 months. Foreclosure charges are usually 3–5% for floating-rate loans."
            }
        ],
        related: [
            { href: "emi-calculator.html", label: "EMI Calculator", icon: "💹" },
            { href: "loan-payoff.html", label: "Loan Payoff", icon: "⏱️" },
            { href: "personal-loan.html", label: "Personal Loan", icon: "👤" },
            { href: "apr-calculator.html", label: "APR Calculator", icon: "📊" }
        ]
    },

    /* ----------------------------------------------------------------
       PERSONAL LOAN
       ---------------------------------------------------------------- */
    "personal-loan.html": {
        facts: [
            { k: "Typical rate", v: "10.5% – 24% p.a." },
            { k: "Max tenure", v: "5–7 years" },
            { k: "No collateral", v: "Unsecured loan" },
            { k: "Disbursal", v: "Often 24–48 hours" }
        ],
        introTitle: "Personal Loan Calculator — borrow smart, repay smart",
        intro: "Personal loans are convenient but expensive. With interest rates of 10.5–24% p.a., even a small loan can cost a lot in interest. This calculator shows your exact EMI, the total interest you will pay, and how short tenures save money — so you can make an informed decision instead of just accepting the bank's offer.",
        sections: [
            {
                title: "Why personal loans are expensive",
                body: [
                    "Because personal loans are unsecured (no collateral), lenders price in higher default risk with rates of 10.5–24%.",
                    "Processing fees of 1–2% and GST add to the cost. Your effective interest rate is higher than the advertised rate.",
                    "Your CIBIL score directly determines your rate: 750+ gets 10.5–13%, 700–749 gets 14–18%, below 700 can exceed 20%."
                ]
            },
            {
                title: "Alternatives to a personal loan",
                body: [
                    "A credit card EMI scheme may cost 18–36% — usually worse. A top-up on an existing home loan costs just 8.5–9.5% and is far cheaper.",
                    "A loan against fixed deposit or gold is secured and costs 9–12%, a meaningful saving on large amounts.",
                    "If the need is non-urgent, a short-term SIP or fixed deposit could fund the goal entirely without debt."
                ]
            }
        ],
        steps: [
            "Enter the personal loan amount (e.g. ₹5,00,000).",
            "Input the applicable interest rate from your bank.",
            "Choose the tenure — 1 to 5 years.",
            "Instantly see the EMI, total payment and total interest.",
            "Shorten the tenure to see how much interest you save."
        ],
        tips: [
            "Never take a personal loan for consumption — it's among the most expensive debt.",
            "Check your CIBIL score before applying; one bad score can double your rate.",
            "A shorter tenure of 2–3 years is often optimal despite a higher EMI."
        ],
        faqs: [
            {
                q: "How fast can I get a personal loan?",
                a: "With instant-approval APIs, many banks and NBFCs disburse personal loans within 24–48 hours, sometimes in minutes for pre-approved customers."
            },
            {
                q: "What credit score do I need?",
                a: "A CIBIL score of 750+ is considered excellent and unlocks the lowest rates. Scores below 650 are often rejected."
            }
        ],
        related: [
            { href: "emi-calculator.html", label: "EMI Calculator", icon: "💹" },
            { href: "debt-to-income.html", label: "Debt-to-Income", icon: "⚖️" },
            { href: "loan-payoff.html", label: "Loan Payoff", icon: "⏱️" },
            { href: "finance-calculator.html", label: "Finance Calculator", icon: "🧮" }
        ]
    },

    /* ----------------------------------------------------------------
       DPS (Deposit Pension Scheme - Bangladesh)
       ---------------------------------------------------------------- */
    "dps.html": {
        facts: [
            { k: "What", v: "Deposit Pension Scheme (Bangladesh)" },
            { k: "Tenure", v: "3, 5 or 10 years" },
            { k: "Payout", v: "Monthly, quarterly, half-yearly or yearly" },
            { k: "Provider", v: "Bank / financial institution" }
        ],
        introTitle: "DPS Calculator (Bangladesh) — grow your monthly savings",
        intro: "The Deposit Pension Scheme (DPS) is one of Bangladesh's most popular low-risk savings tools. You deposit a fixed amount every month and receive a guaranteed maturity amount after 3, 5 or 10 years. This DPS calculator instantly converts your monthly deposit, tenure and interest rate into a precise maturity amount, total deposit and interest earned.",
        sections: [
            {
                title: "How DPS works in Bangladesh",
                body: [
                    "You choose a monthly deposit (commonly 500–50,000 BDT) and a tenure of 3, 5 or 10 years.",
                    "Interest is compounded, typically quarterly or monthly, at rates of 4.5–7% depending on the bank and tenure. Longer tenures earn higher rates.",
                    "At maturity, banks usually pay the full amount including the final month's compounding. Some banks allow monthly, quarterly or yearly payout options instead, where interest is paid out periodically rather than compounded."
                ]
            },
            {
                title: "Comparing DPS with FDR and savings accounts",
                body: [
                    "A DPS enforces disciplined monthly saving, unlike a fixed deposit which requires one lump sum.",
                    "DPS rates are usually 0.25–1% lower than FDR (Fixed Deposit Receipt) but beat regular savings accounts by 2–3%.",
                    "A 10-year DPS with monthly compounding grows substantially: a 2,000 BDT monthly deposit at 6% is worth about 3.3 lakh BDT at maturity, of which interest alone is roughly 92,000 BDT."
                ]
            }
        ],
        steps: [
            "Enter your monthly DPS deposit amount in BDT.",
            "Input the annual interest rate your bank offers (typically 4.5–7%).",
            "Select the tenure in years (3, 5 or 10 are standard).",
            "The calculator shows your maturity amount, total deposits and total interest earned.",
            "Use monthly compounding for the most accurate result."
        ],
        tips: [
            "Choose the longest tenure you can manage — 10-year DPS accounts offer the highest rates and maximum compounding.",
            "Set up an auto-debit from your savings account to avoid missed-instalment penalties.",
            "Compare at least 3 banks; the 'promotional' rates for new DPS accounts can be 0.5–1% higher."
        ],
        pros: [
            "Guaranteed returns backed by the bank",
            "Develops a disciplined saving habit",
            "Withdrawal restrictions protect the goal"
        ],
        cons: [
            "Withdrawal before maturity incurs penalties",
            "Returns barely beat inflation in many years",
            "Interest income above thresholds is taxable"
        ],
        faqs: [
            {
                q: "Can I withdraw DPS before maturity?",
                a: "Most banks allow premature closure after 3 years, but you will receive a reduced rate — often savings account interest or a penalty. The DPS is designed to be held to maturity."
            },
            {
                q: "What is the minimum DPS deposit in Bangladesh?",
                a: "Most banks offer DPS from 500 BDT per month, with maximum monthly deposits typically 25,000–50,000 BDT depending on the bank."
            },
            {
                q: "How much interest does a DPS earn?",
                a: "Rates vary from 4.5% to 7% p.a. depending on the bank and tenure. Government and large private banks usually pay 5–6%, while some Islamic banks offer profit rates up to 7%."
            }
        ],
        related: [
            { href: "fdr.html", label: "FDR Calculator", icon: "🏦" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "savings-calculator.html", label: "Savings Goal", icon: "🎯" },
            { href: "interest-calculator.html", label: "Interest Calculator", icon: "💹" }
        ]
    },

    /* ----------------------------------------------------------------
       FDR (Fixed Deposit Receipt - Bangladesh)
       ---------------------------------------------------------------- */
    "fdr.html": {
        facts: [
            { k: "What", v: "Fixed Deposit Receipt (Bangladesh)" },
            { k: "Tenure", v: "1 month – 5 years" },
            { k: "Payout", v: "Monthly / quarterly / at maturity" },
            { k: "Laddering", v: "Split deposits for periodic income" }
        ],
        introTitle: "FDR Calculator (Bangladesh) — the reliable fixed deposit",
        intro: "A Fixed Deposit Receipt (FDR) is Bangladeshi banks' term deposit — you invest a lump sum for a fixed period at a guaranteed rate. This FDR calculator computes your maturity amount, total interest and effective yield for monthly, quarterly, half-yearly or yearly interest payout and compounding options.",
        sections: [
            {
                title: "FDR interest rates and options in Bangladesh",
                body: [
                    "FDR rates currently range from 5% to 9.5% p.a. depending on the bank, deposit size and tenure. Special 'school savings' and 'senior citizen' FDRs may pay 1% more.",
                    "You can choose monthly interest payout (common for retirees) or reinvest/compound to maturity for maximum growth.",
                    "A 12-month FDR is renewable, and most banks provide an auto-renewal facility — check whether interest is added to principal or paid out at renewal."
                ]
            },
            {
                title: "FDR laddering strategy",
                body: [
                    "Instead of one large FDR, split your money into 3–4 FDRs with staggered maturities (e.g. 6, 12, 18, 24 months).",
                    "This creates a rolling income stream and lets you reinvest each tranche at the prevailing rate, protecting against rate drops in any single year.",
                    "Always compare the 'effective annual yield' — deposits compounded quarterly earn more than those with simple interest."
                ]
            }
        ],
        steps: [
            "Enter the FDR deposit amount in BDT.",
            "Input the annual interest rate from your bank.",
            "Choose the tenure in years.",
            "Select how often interest is paid or compounded (monthly/quarterly/yearly).",
            "Review the maturity amount and effective annual yield."
        ],
        tips: [
            "Senior citizens often receive up to 1% higher FDR rates — ask for it.",
            "Do not break an FDR early without checking penalties; they can erase the interest.",
            "For retirees, a monthly payout FDR ladder provides steady income with capital safety."
        ],
        pros: [
            "Guaranteed, risk-free returns",
            "Flexible tenure from 1 month to 5 years",
            "Monthly interest options for steady income"
        ],
        cons: [
            "Lock-in: early withdrawal penalties apply",
            "Returns may not beat inflation in high-inflation years",
            "Interest over the exemption threshold is taxable"
        ],
        faqs: [
            {
                q: "What is the minimum FDR amount in Bangladesh?",
                a: "Most banks accept FDRs from 10,000–50,000 BDT, though schemes for smaller amounts (e.g. 5,000 BDT) exist at several institutions."
            },
            {
                q: "Is FDR income taxable?",
                a: "Interest income is added to your taxable income. In Bangladesh, interest below the annual tax-free threshold (300,000 BDT in 2024–25) with a NID declaration is not taxed."
            },
            {
                q: "Can I take a loan against my FDR?",
                a: "Yes. Banks typically allow loans of 80–90% of the FDR value at rates just 1–2% above the FDR rate, making it one of the cheapest borrowing options available."
            }
        ],
        related: [
            { href: "dps.html", label: "DPS Calculator", icon: "💰" },
            { href: "interest-calculator.html", label: "Interest Calculator", icon: "💹" },
            { href: "cd-calculator.html", label: "CD Calculator", icon: "🏛️" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" }
        ]
    },

    /* ----------------------------------------------------------------
       MORTGAGE CALCULATOR
       ---------------------------------------------------------------- */
    "mortgage-calculator.html": {
        facts: [
            { k: "PITI", v: "Principal, Interest, Taxes, Insurance" },
            { k: "Common terms", v: "15 / 30 years" },
            { k: "20% down", v: "Avoids PMI" },
            { k: "28/36 rule", v: "Housing ≤28% gross income" }
        ],
        introTitle: "Mortgage Calculator — know your true monthly payment",
        intro: "Your real mortgage payment is more than just principal and interest. Property tax, homeowners insurance, PMI and HOA fees all add up. This complete PITI mortgage calculator shows your true monthly outlay, the principal-and-interest split, and a full amortization schedule — perfect for buyers comparing houses or refinancing.",
        sections: [
            {
                title: "Understanding PITI and DTI",
                body: [
                    "PITI = Principal + Interest + Taxes + Insurance. Lenders underwrite primarily on PITI and total Debt-to-Income (DTI).",
                    "The 28/36 rule: keep PITI under 28% of gross income and total debts under 36%.",
                    "A 300,000 monetary-unit loan at 6.5% for 30 years has a base EMI near 1,896; adding 200/month taxes, 100 insurance and 50 HOA brings the real payment to about 2,246 — 18% higher than the quoted EMI."
                ]
            },
            {
                title: "PMI — when you must pay it",
                body: [
                    "PMI (Private Mortgage Insurance) is required when your down payment is below 20%. It costs roughly 0.3–1.5% of the loan per year.",
                    "PMI automatically ends at 78% loan-to-value and can be cancelled at 80% by request.",
                    "Ways to avoid PMI: a 20% down payment, a piggyback second loan, or lender-paid PMI with a slightly higher rate."
                ]
            },
            {
                title: "15 vs 30 year mortgage",
                body: [
                    "A 30-year loan maximizes affordability but roughly doubles total interest. On 300,000 at 6.5%, 30 years costs 383,000 in interest, while 15 years at 6.0% costs just 156,000.",
                    "The 15-year loan also builds equity twice as fast and is a forced savings plan.",
                    "Many borrowers choose 30 years with biweekly payments — the equivalent of one extra payment a year — giving much of the 15-year benefit with flexibility."
                ]
            }
        ],
        steps: [
            "Enter the mortgage amount (home price minus down payment).",
            "Input your interest rate — check today's market rates.",
            "Choose the term: 15, 20 or 30 years.",
            "Add annual property tax, home insurance and PMI if applicable.",
            "Read the true monthly payment and amortization schedule below."
        ],
        tips: [
            "Shop rates from at least 3 lenders; even 0.25% saves thousands over 30 years.",
            "Buying discount points (paying upfront to lower rate) pays off if you stay 7+ years.",
            "Refinance when rates drop 0.75–1% and you plan to stay at least 2 years."
        ],
        faqs: [
            {
                q: "What is a good mortgage rate?",
                a: "Rates follow the 10-year Treasury and vary by credit, down payment and loan type. Compare current averages for 15- and 30-year fixed loans to see if your quote is competitive."
            },
            {
                q: "How much can I afford?",
                a: "Follow the 28/36 rule. Multiply gross monthly income by 0.28 for housing, 0.36 for total debt. This calculator includes taxes and insurance so the number is realistic."
            },
            {
                q: "What happens if I pay extra?",
                a: "Extra payments reduce the balance directly, saving interest and shortening the term. An extra payment each year on a 30-year loan typically saves 3–4 years of payments."
            }
        ],
        related: [
            { href: "amortization-calculator.html", label: "Amortization", icon: "📊" },
            { href: "house-affordability.html", label: "Affordability", icon: "🏠" },
            { href: "refinance-calculator.html", label: "Refinance", icon: "🔄" },
            { href: "mortgage-payoff.html", label: "Payoff", icon: "⏱️" }
        ]
    },

    /* ----------------------------------------------------------------
       RETIREMENT CALCULATOR
       ---------------------------------------------------------------- */
    "retirement-calculator.html": {
        facts: [
            { k: "15% rule", v: "Save 15% of income" },
            { k: "4% rule", v: "Safe withdrawal test" },
            { k: "Real return", v: "Nominal − inflation" },
            { k: "Corpus", v: "25× expenses as rule of thumb" }
        ],
        introTitle: "Retirement Calculator — build your retirement plan like a professional",
        intro: "This professional retirement calculator projects your savings at retirement, the inflation-adjusted corpus you will actually need, your monthly income, and the shortfall or surplus of your current plan. It uses the real (inflation-adjusted) return method used by financial planners — not a rough guess.",
        sections: [
            {
                title: "The professional method explained",
                body: [
                    "Step 1: grow today's annual expenses by inflation until retirement to find future expenses.",
                    "Step 2: calculate the corpus needed to fund those expenses for life — using real return as the annuity factor over your retirement period.",
                    "Step 3: project what your current savings and monthly contributions will grow to at your expected return.",
                    "Step 4: subtract. The difference is your shortfall (or surplus)."
                ]
            },
            {
                title: "The 4% rule and why it's just a shortcut",
                body: [
                    "The 4% rule (corpus = 25× annual expenses) comes from US data and assumes a 30-year retirement with a balanced portfolio.",
                    "In India, with 6% inflation and longer retirements, a safer planning band is 3–3.5% or a corpus of 28–33× expenses.",
                    "This calculator is more precise because it uses your actual age, retirement age, life expectancy and real return."
                ]
            },
            {
                title: "How much should you save?",
                body: [
                    "The 15% rule: start saving 15% of gross income in your 20s for a comfortable retirement at 60.",
                    "Start at 35? You may need 25–30%. Start at 45? 40%+ or a delayed retirement.",
                    "Tax-advantaged accounts (PPF, NPS, EPF) should be maxed first because the compounding inside is tax-free."
                ]
            }
        ],
        steps: [
            "Enter your current age and planned retirement age.",
            "Set your life expectancy (use 85 if unsure).",
            "Enter current annual expenses and current retirement savings.",
            "Add your monthly contribution and expected return before tax.",
            "Enter the inflation rate and read your corpus, shortfall and monthly income."
        ],
        tips: [
            "Use a conservative expected return of 7–8% and inflation of 5–6% for India.",
            "Rebalance annually: shift 5% from equity to debt each 5 years as retirement nears.",
            "Include NPS and PPF in the 'monthly contribution' along with mutual fund SIPs."
        ],
        faqs: [
            {
                q: "How much money do I need to retire in India?",
                a: "A basic estimate is 25–30× your annual expenses at retirement. A precise figure is corpus = future annual expense × [1 − (1+real return)^−years retired] ÷ real return, which is exactly what this calculator computes."
            },
            {
                q: "What is a safe withdrawal rate in India?",
                a: "Most Indian planners use 3–3.5% (corpus of 28–33× expenses) to account for higher inflation and medical costs. The US 4% rule is riskier in India."
            },
            {
                q: "Are mutual fund returns assured for retirement?",
                a: "No. Equity returns are market-linked. Use a conservative 7–8% blended return for planning and review your plan annually."
            }
        ],
        related: [
            { href: "pension-calculator.html", label: "Pension", icon: "👵" },
            { href: "social-security-calculator.html", label: "Social Security", icon: "🛡️" },
            { href: "annuity-calculator.html", label: "Annuity", icon: "📅" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" }
        ]
    },

    /* ----------------------------------------------------------------
       COMPOUND INTEREST CALCULATOR
       ---------------------------------------------------------------- */
    "compound-interest-calculator.html": {
        facts: [
            { k: "Superpower", v: "Eighth wonder of the world" },
            { k: "Frequency", v: "Daily to annual compounding" },
            { k: "Effect", v: "Interest on interest" },
            { k: "Rule of 72", v: "Years to double = 72 ÷ rate" }
        ],
        introTitle: "Compound Interest Calculator — see the eighth wonder of the world",
        intro: "Compound interest is interest earned on your interest. Over long periods it creates exponential growth that simple interest cannot match. This calculator combines a lump sum and monthly contributions with a compounding frequency of your choice — monthly, quarterly, semi-annually, annually or continuous — to show your exact maturity value, interest earned and effective annual rate.",
        sections: [
            {
                title: "The compound interest formula",
                body: [
                    "Maturity = P × (1 + r/m)^(m×t) + C × [((1 + r/m)^(m×t) − 1) ÷ (r/m)], where P is the initial amount, C the monthly contribution, r the annual rate, m the compounding frequency and t the term in years.",
                    "A ₹1,00,000 lump sum plus ₹2,000/month at 7% for 10 years becomes roughly ₹5,50,000 — nearly double the ₹3,40,000 invested, thanks to compounding.",
                    "Continuous compounding (e^rt) is the theoretical maximum and is used by some modern digital savings products."
                ]
            },
            {
                title: "Why starting early beats investing more",
                body: [
                    "Investor A invests ₹5,000/month from age 25 to 35 (₹6 lakh total). Investor B invests ₹5,000/month from 35 to 60 (₹15 lakh total). At 10% p.a., A's money grows to about ₹1.06 crore vs B's ₹99 lakh — A ends with more despite investing 2.5× less!",
                    "The first decade of contributions does roughly 60% of the work over a 40-year horizon because every rupee compounds for decades.",
                    "This is why financial advisors repeat: start yesterday."
                ]
            },
            {
                title: "Simple vs compound interest",
                body: [
                    "Simple interest is calculated only on the original principal: ₹1,00,000 at 10% for 20 years grows to ₹3,00,000.",
                    "Compound interest at the same rate and term grows to ₹6,72,750 — more than double.",
                    "For long-term goals (retirement, education), always use compound-interest products. For short-term debt, avoid compound-interest charges on credit cards."
                ]
            }
        ],
        steps: [
            "Enter the initial (lump sum) amount.",
            "Add a monthly contribution if you plan to save regularly.",
            "Set the annual interest rate.",
            "Choose the number of years.",
            "Pick the compounding frequency and read your results instantly."
        ],
        tips: [
            "Use the Rule of 72: divide 72 by your rate to approximate doubling time (72 ÷ 9 = 8 years).",
            "Higher compounding frequency earns slightly more — prefer daily/monthly products over annual.",
            "Never pay compound interest on credit cards; always pay the full statement balance."
        ],
        pros: [
            "Exponential growth for long horizons",
            "Encourages regular investing discipline",
            "Accurate for FD, mutual fund and PPF growth"
        ],
        cons: [
            "Returns on equity are not guaranteed",
            "Inflation erodes growth — use real return for planning"
        ],
        faqs: [
            {
                q: "What is the difference between simple and compound interest?",
                a: "Simple interest is charged only on the original principal. Compound interest is charged on the principal plus previously earned interest, creating accelerating growth over time."
            },
            {
                q: "How often should I compound?",
                a: "More frequent compounding earns slightly more. Daily compounding of a 7% rate yields an effective 7.25%, vs 7.0% for annual. For long-term investing, monthly is the practical standard."
            },
            {
                q: "Can I use this for a fixed deposit?",
                a: "Yes. Select quarterly compounding and enter the FD rate. Indian FDs typically compound quarterly, matching this calculator's result."
            }
        ],
        related: [
            { href: "simple-interest-calculator.html", label: "Simple Interest", icon: "🧮" },
            { href: "investment-calculator.html", label: "Investment", icon: "📈" },
            { href: "savings-calculator.html", label: "Savings Goal", icon: "🎯" },
            { href: "future-value-calculator.html", label: "Future Value", icon: "🔮" }
        ]
    },

    /* ----------------------------------------------------------------
       SAVINGS CALCULATOR
       ---------------------------------------------------------------- */
    "savings-calculator.html": {
        facts: [
            { k: "Goal", v: "Monthly deposit to reach target" },
            { k: "Reverse", v: "Solve for contribution" },
            { k: "Inflation", v: "Adjust goal for rising costs" },
            { k: "Automate", v: "Rich first, spend rest" }
        ],
        introTitle: "Savings Goal Calculator — what monthly deposit hits your target?",
        intro: "Instead of guessing, this savings calculator works backwards: you tell it the goal amount, the rate and the time horizon, and it tells you exactly how much to deposit each month to get there. Whether it's a down payment, a dream vacation or an emergency fund, plan it precisely.",
        sections: [
            {
                title: "The math behind the monthly deposit",
                body: [
                    "Monthly deposit = Goal × r ÷ [(1 + r)^n − 1], where r is the monthly rate and n the number of months.",
                    "To save ₹10,00,000 in 5 years at 8%: the deposit is about ₹13,600/month, not the ₹16,667/month simple division would suggest — the gap is compounding working for you.",
                    "A 6-month emergency fund (3–6× monthly expenses) is the first goal every planner recommends before investing."
                ]
            },
            {
                title: "Inflation-proofing the goal",
                body: [
                    "A ₹50,00,000 retirement goal today is worth far less in 20 years. Use a real rate (return − inflation) to automatically inflate the target.",
                    "For education costs growing at 10% p.a., a ₹20,00,000 college cost in 15 years is ₹83,55,000 — plan with the inflated number.",
                    "Review the goal annually and adjust deposits for salary increases and actual inflation."
                ]
            }
        ],
        steps: [
            "Enter your savings goal amount.",
            "Set the annual rate of return you expect on your savings.",
            "Choose the time horizon in years.",
            "The calculator shows the required monthly deposit, total deposited and total interest earned."
        ],
        tips: [
            "Pay yourself first: automate the deposit on salary day.",
            "Use a higher rate only if you invest in equity; use 5–6% for pure deposits.",
            "Split big goals into yearly milestones for motivation."
        ],
        faqs: [
            {
                q: "How much should I save each month?",
                a: "The 50/30/20 rule suggests 20% of income to savings. The right '20%' depends on your goal — this calculator tells you the exact number for a specific target."
            },
            {
                q: "What is an emergency fund?",
                a: "3–6 months of essential expenses kept liquid (savings account or FDR). It prevents debt when unexpected costs hit."
            }
        ],
        related: [
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "investment-calculator.html", label: "Investment", icon: "📈" },
            { href: "future-value-calculator.html", label: "Future Value", icon: "🔮" },
            { href: "dps.html", label: "DPS", icon: "💰" }
        ]
    },

    /* ----------------------------------------------------------------
       AMORTIZATION CALCULATOR
       ---------------------------------------------------------------- */
    "amortization-calculator.html": {
        facts: [
            { k: "Amortize", v: "Repay in equal instalments" },
            { k: "Schedule", v: "Month-by-month breakdown" },
            { k: "Equity", v: "Balance minus interest" },
            { k: "Extra", v: "Payment = term & interest cut" }
        ],
        introTitle: "Amortization Calculator — your complete loan repayment schedule",
        intro: "An amortization schedule is the month-by-month map of your loan: how much of each payment goes to principal, how much to interest, and your remaining balance. This calculator produces the full schedule instantly and shows how extra payments shorten the term and slash total interest.",
        sections: [
            {
                title: "Reading an amortization schedule",
                body: [
                    "Each row shows payment number, EMI, principal portion, interest portion and outstanding balance.",
                    "Early rows are interest-heavy; later rows flip to principal-heavy. Interest is calculated on the declining balance each month.",
                    "The total interest is the sum of the interest column — this is what costs more than double on long loans."
                ]
            },
            {
                title: "The power of extra payments",
                body: [
                    "Add just 5% extra to each EMI and a 20-year loan finishes about 3 years early, saving 10–15% of total interest.",
                    "A single yearly lump sum (like a bonus) applied to principal has an even larger effect because it avoids future interest on that amount.",
                    "Two strategies to compare: reduce EMI (recast) vs shorten term. Shortening term always saves more interest."
                ]
            }
        ],
        steps: [
            "Enter the loan amount.",
            "Add the annual interest rate.",
            "Choose the loan term in years.",
            "Optionally add an extra monthly payment.",
            "Scroll the schedule to follow your balance to zero — and see interest saved."
        ],
        tips: [
            "Use the schedule to find your break-even month for refinancing.",
            "Make sure extra payments are applied to principal, not 'paid ahead'.",
            "For a mortgage, extra payments before year 10 save the most."
        ],
        faqs: [
            {
                q: "What is an amortization schedule used for?",
                a: "It shows the exact repayment path of a loan, helping borrowers see equity growth, plan prepayments and compare loan offers by total interest."
            },
            {
                q: "Does the EMI change during the loan?",
                a: "For fixed-rate loans the EMI is constant, but the principal-interest split changes each month. For floating-rate loans, the EMI changes when rates reset."
            }
        ],
        related: [
            { href: "emi-calculator.html", label: "EMI Calculator", icon: "💹" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "loan-payoff.html", label: "Loan Payoff", icon: "⏱️" },
            { href: "mortgage-payoff.html", label: "Mortgage Payoff", icon: "🏠" }
        ]
    },

    /* ----------------------------------------------------------------
       LOAN PAYOFF CALCULATOR
       ---------------------------------------------------------------- */
    "loan-payoff.html": {
        facts: [
            { k: "Goal", v: "Become debt-free faster" },
            { k: "Extra payment", v: "Cuts interest & term" },
            { k: "Snowball", v: "Pay smallest debts first" },
            { k: "Avalanche", v: "Pay highest rate first" }
        ],
        introTitle: "Loan Payoff Calculator — a clear plan to be debt-free",
        intro: "Drowning in loans? This calculator shows how adding extra to your monthly payment shortens your loan term and reduces total interest — and how long you'll be debt-free with the debt snowball or avalanche strategy.",
        sections: [
            {
                title: "Debt snowball vs debt avalanche",
                body: [
                    "Snowball: pay off the smallest balance first, then roll that payment to the next. Psychologically motivating — quick wins build momentum.",
                    "Avalanche: pay off the highest interest rate first. Mathematically optimal — saves the most interest overall.",
                    "Avalanche saves more money; snowball keeps you consistent. Choose what you'll actually stick with."
                ]
            },
            {
                title: "How much faster do you finish?",
                body: [
                    "A ₹5,00,000 loan at 12% for 5 years with a ₹1,000 extra payment finishes 6 months early and saves about ₹30,000 in interest.",
                    "Doubling the minimum payment can cut the term roughly in half.",
                    "Every ₹100 of extra payment in the first year is worth closer to ₹250 of savings over the loan life."
                ]
            }
        ],
        steps: [
            "Enter your current balance and interest rate.",
            "Input your current monthly minimum payment.",
            "Optionally add an extra monthly payment.",
            "Read the new payoff date, term reduction and interest saved."
        ],
        tips: [
            "Direct extra payments to principal only.",
            "Fund 1–2 months of 'buffer' before aggressive prepayment to avoid reborrowing.",
            "Never pay extra on a loan at 0% interest when you have high-rate debt elsewhere."
        ],
        faqs: [
            {
                q: "Should I invest or pay off debt?",
                a: "Generally, pay off debt above 8–9% interest before investing in low-return assets. If your debt is below 5% (home loan) and equity returns higher, investing may win — but the risk-free 'return' of paying debt is guaranteed."
            },
            {
                q: "What is debt consolidation?",
                a: "Combining multiple high-rate loans into one loan at a lower rate. Useful if the new rate is meaningfully lower and you don't run up the old cards again."
            }
        ],
        related: [
            { href: "emi-calculator.html", label: "EMI Calculator", icon: "💹" },
            { href: "amortization-calculator.html", label: "Amortization", icon: "📊" },
            { href: "debt-to-income.html", label: "Debt-to-Income", icon: "⚖️" },
            { href: "personal-loan.html", label: "Personal Loan", icon: "👤" }
        ]
    },

    /* ----------------------------------------------------------------
       HOUSE AFFORDABILITY CALCULATOR
       ---------------------------------------------------------------- */
    "house-affordability.html": {
        facts: [
            { k: "28% rule", v: "Housing ≤ 28% gross" },
            { k: "36% rule", v: "Total debt ≤ 36% gross" },
            { k: "Down payment", v: "20% avoids PMI" },
            { k: "Budget", v: "3.5× annual income typical" }
        ],
        introTitle: "House Affordability Calculator — what home price fits your salary?",
        intro: "Determine the maximum home price you can afford based on your income, debts, down payment and interest rate — using the same 28/36 rules lenders apply. See whether a 20% down payment or a lower rate moves you into a bigger home.",
        sections: [
            {
                title: "The 28/36 rule explained",
                body: [
                    "Housing costs (PITI) should not exceed 28% of gross monthly income.",
                    "Total monthly debt payments (housing + car + student loans + cards) should not exceed 36%.",
                    "Example: ₹90,000/month income → housing budget ₹25,200; total debt ₹32,400. With a 6.5% rate and 20% down, that supports about ₹45,00,000 of home price."
                ]
            },
            {
                title: "Why down payment matters",
                body: [
                    "At 20% down you avoid PMI — saving roughly 0.5–1% of the loan value per year.",
                    "A lower loan amount also means lower EMI for the same home price.",
                    "In high-interest periods, a 30% or 40% down payment may be needed to keep EMI within the 28% budget."
                ]
            }
        ],
        steps: [
            "Enter your gross monthly income.",
            "Add all existing monthly debt payments (EMIs, cards).",
            "Enter your down payment and available cash.",
            "Input the interest rate and term.",
            "Read the maximum affordable home price and your comfortable EMI."
        ],
        tips: [
            "Keep a 3–6 month emergency fund AFTER the down payment.",
            "Include property tax and insurance in your budget — the calculator does.",
            "Shop within 90% of the max to stay comfortable."
        ],
        faqs: [
            {
                q: "What if my DTI is over 36%?",
                a: "Reduce debts first (pay off cards), increase your down payment, or choose a cheaper home. Some lenders accept 43–45% DTI with compensating factors like high savings."
            },
            {
                q: "How much house can I afford with ₹1 lakh/month income?",
                a: "Housing budget ≈ ₹28,000/month. At 6.5% for 20 years with 20% down, that supports roughly a ₹50,00,000–55,00,000 home."
            }
        ],
        related: [
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "down-payment-calculator.html", label: "Down Payment", icon: "💵" },
            { href: "home-loan.html", label: "Home Loan", icon: "🏠" },
            { href: "debt-to-income.html", label: "DTI Ratio", icon: "⚖️" }
        ]
    },

    /* ----------------------------------------------------------------
       SIMPLE INTEREST CALCULATOR
       ---------------------------------------------------------------- */
    "simple-interest-calculator.html": {
        facts: [
            { k: "Formula", v: "SI = P × R × T ÷ 100" },
            { k: "Basis", v: "Principal only" },
            { k: "Uses", v: "Short-term loans, bonds" },
            { k: "Growth", v: "Linear, not exponential" }
        ],
        introTitle: "Simple Interest Calculator — clear, predictable interest",
        intro: "Simple interest is calculated only on the original principal, making it easy to predict and understand. It's used for short-term loans, savings bonds and many bank products. This calculator instantly computes interest and maturity for years, months or days.",
        sections: [
            {
                title: "Simple vs compound interest",
                body: [
                    "Simple interest = P × R × T, where P is the principal, R the annual rate and T the time in years.",
                    "₹1,00,000 at 8% simple for 5 years earns ₹40,000, maturing at ₹1,40,000.",
                    "Compound interest at the same rate and term earns ₹46,933 — the difference grows with time, which is why long-term investments prefer compounding."
                ]
            },
            {
                title: "Where simple interest is used",
                body: [
                    "Short-term personal loans and payday advances.",
                    "Some government savings schemes and discount instruments (T-bills).",
                    "Bonds that pay a fixed coupon without reinvestment."
                ]
            }
        ],
        steps: [
            "Enter the principal amount.",
            "Input the annual interest rate (%).",
            "Choose the time period and unit (years, months or days).",
            "Read the simple interest and total maturity instantly."
        ],
        tips: [
            "Convert months to years (÷12) and days to years (÷365) for precision.",
            "For any goal beyond 2–3 years, compound-interest products deliver meaningfully more.",
            "Check whether your loan uses simple or compound interest — it changes the total cost."
        ],
        faqs: [
            {
                q: "What is the simple interest formula?",
                a: "SI = (P × R × T) ÷ 100, where P is principal, R the annual interest rate, and T the time in years. Maturity = P + SI."
            },
            {
                q: "Is simple interest better or worse?",
                a: "For borrowers, simple interest is cheaper. For savers, compound interest earns more. Always compare both for the same amount and term."
            }
        ],
        related: [
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "interest-calculator.html", label: "Interest Calculator", icon: "💹" },
            { href: "interest-rate-calculator.html", label: "Interest Rate", icon: "📐" },
            { href: "fdr.html", label: "FDR", icon: "🏦" }
        ]
    },

    /* ----------------------------------------------------------------
       INTEREST CALCULATOR
       ---------------------------------------------------------------- */
    "interest-calculator.html": {
        facts: [
            { k: "Two modes", v: "Fixed & recurring deposit" },
            { k: "Simple", v: "Principal-based interest" },
            { k: "Compound", v: "Interest-on-interest growth" },
            { k: "Frequency", v: "Monthly/quarterly/yearly" }
        ],
        introTitle: "Interest Calculator — fixed and recurring deposits, one tool",
        intro: "Whether you're evaluating a fixed deposit (FD) or a recurring deposit (RD), this interest calculator tells you exactly how much your money grows — with a choice of simple or compound interest and the correct payout frequency for Indian banks.",
        sections: [
            {
                title: "FD vs RD explained",
                body: [
                    "Fixed Deposit: one lump sum for a fixed term, typically compounded quarterly at 5.5–8%.",
                    "Recurring Deposit: fixed monthly contributions for a term, ideal for salaried savers building a goal gradually.",
                    "Both are safer than equity and produce guaranteed returns, making them the core of an emergency fund and short-term goal planning."
                ]
            },
            {
                title: "Why compounding frequency matters",
                body: [
                    "Quarterly compounding (used by most Indian FDs) earns more than annual compounding on the same rate.",
                    "₹1,00,000 at 7% over 5 years: annual compounding gives ₹1,40,255, quarterly gives ₹1,41,475 — about ₹1,200 more.",
                    "Effective annual rate = (1 + r/n)^n − 1. A 7% rate compounded quarterly is effectively 7.19%."
                ]
            }
        ],
        steps: [
            "Choose FD (lump sum) or RD (monthly deposit) mode.",
            "Enter the deposit amount(s).",
            "Input the rate and tenure.",
            "Select the compounding frequency and read total maturity and interest earned."
        ],
        tips: [
            "For FDs, book deposits in a ladder (1, 2, 3 years) for flexibility.",
            "Senior citizens earn up to 0.5–1% more on FDs.",
            "Reinvest the interest for maximum compounding."
        ],
        faqs: [
            {
                q: "What is the best FD tenure for interest?",
                a: "Tenures around 18 months to 3 years usually offer the highest rates, beyond which rates often plateau or drop slightly. Check each bank's rate card."
            },
            {
                q: "Is FD interest taxed?",
                a: "Yes, as per your income slab. Banks deduct TDS if interest exceeds ₹40,000/year (₹50,000 for seniors), but you must still declare it in your return."
            }
        ],
        related: [
            { href: "fdr.html", label: "FDR Calculator", icon: "🏦" },
            { href: "simple-interest-calculator.html", label: "Simple Interest", icon: "🧮" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "cd-calculator.html", label: "CD Calculator", icon: "🏛️" }
        ]
    },

    /* ----------------------------------------------------------------
       INVESTMENT CALCULATOR
       ---------------------------------------------------------------- */
    "investment-calculator.html": {
        facts: [
            { k: "FV", v: "Future value of investments" },
            { k: "SIP", v: "Monthly systematic investing" },
            { k: "Inflation", v: "Real value after inflation" },
            { k: "CAGR", v: "True annualized growth" }
        ],
        introTitle: "Investment Calculator — project your wealth with a SIP or lump sum",
        intro: "See how a one-time lump sum plus monthly SIP investments grow over time at your expected return — and what that future value is really worth after inflation. Ideal for mutual funds, PPF, EPF and stock portfolios.",
        sections: [
            {
                title: "SIP: the disciplined investor's tool",
                body: [
                    "SIP (Systematic Investment Plan) invests a fixed amount monthly, averaging the purchase price through market ups and downs (rupee-cost averaging).",
                    "A ₹10,000/month SIP at 12% for 15 years grows to about ₹50 lakh — six times more than the ₹18 lakh invested.",
                    "Even small delays matter: starting 3 years late on the same plan costs roughly ₹12 lakh of terminal value."
                ]
            },
            {
                title: "Nominal vs real returns",
                body: [
                    "Nominal return is the headline return; real return subtracts inflation to show true purchasing-power growth.",
                    "At 12% nominal with 6% inflation, the real return is about 5.7% — your money grows 5.7% in actual buying power.",
                    "This calculator shows both, so you can plan a retirement or a goal in today's rupees."
                ]
            }
        ],
        steps: [
            "Enter your initial lump sum investment.",
            "Add the monthly SIP contribution.",
            "Set the expected annual return and time horizon.",
            "Enter the inflation rate for real-value results.",
            "Read the future value, total invested, growth and real value."
        ],
        tips: [
            "Use 10–12% for equity-dominant funds, 6–7% for balanced, 5–6% for debt funds.",
            "Increase SIPs by 10% each year to match income growth.",
            "Never stop a SIP during a market crash — that's when compounding does the heavy lifting."
        ],
        faqs: [
            {
                q: "What is a good expected return for SIP?",
                a: "Historically, Indian equity mutual funds have returned 11–14% over 10+ years. Use 12% for optimistic planning and 10% for conservative planning."
            },
            {
                q: "Are investment returns guaranteed?",
                a: "Equity investments carry market risk and returns are not guaranteed. Only debt instruments like FD/PPF offer guaranteed returns, at lower rates."
            }
        ],
        related: [
            { href: "mutual-fund-calculator.html", label: "Mutual Fund", icon: "📊" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "retirement-calculator.html", label: "Retirement", icon: "👵" },
            { href: "future-value-calculator.html", label: "Future Value", icon: "🔮" }
        ]
    },

    /* ----------------------------------------------------------------
       MUTUAL FUND CALCULATOR
       ---------------------------------------------------------------- */
    "mutual-fund-calculator.html": {
        facts: [
            { k: "SIP + Lumpsum", v: "Both supported" },
            { k: "CAGR", v: "Annualized growth rate" },
            { k: "Power of SIP", v: "Market-cost averaging" },
            { k: "Emerging market", v: "11–14% long-term equity" }
        ],
        introTitle: "Mutual Fund Calculator — SIP and lump sum returns",
        intro: "Estimate the future value of your mutual fund investments with this SIP + lump sum calculator. Enter your amounts, expected annual return and horizon, and see the maturity value, total invested, capital gains and CAGR — the true measure of your fund's performance.",
        sections: [
            {
                title: "How SIP returns build up",
                body: [
                    "Each monthly contribution buys units at that month's NAV (Net Asset Value), naturally averaging your entry price.",
                    "₹5,000/month at 12% for 20 years becomes about ₹50 lakh against ₹12 lakh invested — ₹38 lakh of wealth from market returns.",
                    "CAGR (Compound Annual Growth Rate) is the annualized return: the single number that lets you compare funds fairly."
                ]
            },
            {
                title: "Choosing between SIP and lump sum",
                body: [
                    "Lump sum suits large windfalls (bonuses, inheritance) when markets are reasonably valued.",
                    "SIP suits steady income earners and removes market-timing risk.",
                    "A hybrid strategy — monthly SIPs plus annual lump-top-ups from bonuses — historically delivers the best risk-adjusted growth."
                ]
            }
        ],
        steps: [
            "Enter the one-time lump sum investment (or 0).",
            "Add the monthly SIP amount.",
            "Input the expected annual return (12% is a common 10+ year equity assumption).",
            "Set the investment duration in years.",
            "Read maturity value, gains, total invested and CAGR."
        ],
        tips: [
            "Choose direct-growth plans over regular-dividend plans to avoid tax drag and distributor commissions.",
            "Rebalance annually between equity and debt as your goal approaches.",
            "Check fund track record over 10 years; short track records under 3 years are not meaningful."
        ],
        faqs: [
            {
                q: "What is CAGR?",
                a: "CAGR (Compound Annual Growth Rate) is the annualized rate at which an investment grows from its start value to its end value, smoothing volatility into one comparable percentage."
            },
            {
                q: "Which mutual fund is best for 10 years?",
                a: "For 10+ years, flexi-cap and index (Nifty 50) funds with expense ratios below 0.5% are popular choices. Past performance is not a guarantee of future returns."
            }
        ],
        related: [
            { href: "investment-calculator.html", label: "Investment", icon: "📈" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "average-return-calculator.html", label: "Average Return", icon: "📐" },
            { href: "irr-calculator.html", label: "IRR", icon: "🧮" }
        ]
    },

    /* ----------------------------------------------------------------
       INTEREST RATE CALCULATOR
       ---------------------------------------------------------------- */
    "interest-rate-calculator.html": {
        facts: [
            { k: "Solve for", v: "Required interest rate" },
            { k: "Inputs", v: "Principal, maturity, years" },
            { k: "Use", v: "What rate do I need?" },
            { k: "Power", v: "Compounding frequency matters" }
        ],
        introTitle: "Interest Rate Calculator — what rate turns your principal into a target?",
        intro: "Working forwards is easy; working backwards is powerful. Enter the principal, the target maturity amount and the time horizon, and this calculator reveals the exact interest rate you need — with proper compounding — to hit your goal.",
        sections: [
            {
                title: "The reverse compound formula",
                body: [
                    "Rate = n × [(Maturity ÷ Principal)^(1/(n×years)) − 1] × 100, where n is the compounding frequency per year.",
                    "To grow ₹5,00,000 to ₹10,00,000 in 8 years, you need about 9.05% annual compounding — a rate achievable with a balanced equity fund but not with an FD.",
                    "Compounding frequency slightly changes the required nominal rate: quarterly compounding needs a lower nominal rate than annual."
                ]
            },
            {
                title: "Realistic rate expectations",
                body: [
                    "FD / debt funds: 5–8% | Balanced funds: 7–9% | Equity funds: 10–14% (long-term).",
                    "If the required rate exceeds what's realistic, extend the horizon or increase contributions — the calculator makes the trade-off visible.",
                    "A shorter horizon and a fat target may force defensive assets, reducing risk — sometimes the wisest adjustment."
                ]
            }
        ],
        steps: [
            "Enter the current principal amount.",
            "Enter the target maturity amount.",
            "Set the number of years.",
            "Select the compounding frequency.",
            "Read the required annual rate and total interest."
        ],
        tips: [
            "Use this to sanity-check 'guaranteed return' schemes — an unrealistic required rate is a red flag.",
            "Conservative plan: always assume the lower realistic rate for goal planning.",
            "Compare the required rate against current FD and equity expectations before committing."
        ],
        faqs: [
            {
                q: "How do I calculate the interest rate from principal and maturity?",
                a: "For compounding, rate = n × [(M/P)^(1/(n×t)) − 1] × 100. For simple interest, rate = (Interest × 100) ÷ (P × t)."
            },
            {
                q: "What is a realistic rate for doubling money?",
                a: "Using the Rule of 72, doubling in 8 years needs about 9% p.a.; in 6 years about 12% p.a. Equity funds can achieve this over the long term, with volatility."
            }
        ],
        related: [
            { href: "interest-calculator.html", label: "Interest Calculator", icon: "💹" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "finance-calculator.html", label: "Finance Calculator", icon: "🧮" },
            { href: "future-value-calculator.html", label: "Future Value", icon: "🔮" }
        ]
    },

    /* ----------------------------------------------------------------
       FINANCE CALCULATOR (TVM)
       ---------------------------------------------------------------- */
    "finance-calculator.html": {
        facts: [
            { k: "TVM", v: "Time value of money" },
            { k: "Solve", v: "Payment / amount / future / term / rate" },
            { k: "5 variables", v: "PV, FV, rate, payment, term" },
            { k: "Use", v: "Loans and investments" }
        ],
        introTitle: "Finance Calculator — the time value of money, solved",
        intro: "This professional TVM (Time Value of Money) calculator solves for any one of five variables — monthly payment, loan amount, future value, term or interest rate — given the other four. The same tool powers your mortgage, savings goal and annuity planning.",
        sections: [
            {
                title: "The five TVM variables",
                body: [
                    "PV (present value), FV (future value), PMT (periodic payment), rate and term are linked by one equation. Give four, solve the fifth.",
                    "Solving for payment: how much monthly EMI? Solving for amount: how big a loan? Solving for term: how long to pay off? Solving for rate: what yield does this investment deliver?",
                    "This is the same engine inside Excel's PMT, PV, FV, NPER and RATE functions — giving you spreadsheet-grade accuracy in the browser."
                ]
            },
            {
                title: "Practical uses",
                body: [
                    "Compare a 15 vs 30 year loan by solving for payment at the same rate.",
                    "Find how many years until a goal amount at a given SIP — instant NPER.",
                    "Reverse-engineer the hidden interest rate on any 'easy EMI' scheme — many are far costlier than they appear."
                ]
            }
        ],
        steps: [
            "Select the variable to solve for (payment, amount, future, term or rate).",
            "Enter the four known variables.",
            "Read the solved variable instantly.",
            "Switch the 'solve for' selection to answer different questions on the same inputs."
        ],
        tips: [
            "Use 'solve for rate' before signing any buy-now-pay-later or EMI plan.",
            "Use 'solve for term' to see the true payoff years with extra payments.",
            "Remember: negative cash flows (payments) vs positive (receipts) keep signs consistent when doing TVM by hand."
        ],
        faqs: [
            {
                q: "What is time value of money?",
                a: "A rupee today is worth more than a rupee tomorrow because it can earn interest. TVM accounts for this when comparing cash flows at different points in time."
            },
            {
                q: "What is the annuity formula?",
                a: "Payment = P × r ÷ [1 − (1+r)^−n], where r is the periodic rate and n the number of periods. This is the formula behind equal monthly payments on a loan."
            }
        ],
        related: [
            { href: "present-value-calculator.html", label: "Present Value", icon: "⏪" },
            { href: "future-value-calculator.html", label: "Future Value", icon: "⏩" },
            { href: "emi-calculator.html", label: "EMI", icon: "💹" },
            { href: "interest-rate-calculator.html", label: "Interest Rate", icon: "📐" }
        ]
    },

    /* ----------------------------------------------------------------
       PRESENT VALUE CALCULATOR
       ---------------------------------------------------------------- */
    "present-value-calculator.html": {
        facts: [
            { k: "PV", v: "What future money is worth today" },
            { k: "Discount", v: "Future value × discount rate" },
            { k: "Use", v: "Fair price, valuations, goals" },
            { k: "Inverse", v: "Future value in reverse" }
        ],
        introTitle: "Present Value Calculator — what is future money worth today?",
        intro: "A rupee you'll receive in 10 years is not worth a rupee today. Present value (PV) discounts future money back to today's rupees using a discount rate — the core of investing, bond pricing and fair-valuation thinking.",
        sections: [
            {
                title: "The discounting concept",
                body: [
                    "PV = FV ÷ (1 + r)^n, where r is the monthly equivalent of your discount rate and n the number of periods.",
                    "If you need ₹50,00,000 in 12 years at 8%, today's value is about ₹19,60,000 — that's the lump sum to invest now.",
                    "Higher discount rates shrink present values sharply; that's why high-risk investments are 'cheaper' in present-value terms."
                ]
            },
            {
                title: "Where PV is used in real life",
                body: [
                    "Bond pricing: a bond's price is the PV of its future coupons and face value.",
                    "Business valuation: a company's value is the PV of its future free cash flows.",
                    "Personal decisions: compare a 'higher EMI later' vs 'lower EMI now' by discounting."
                ]
            }
        ],
        steps: [
            "Enter the future amount you will receive or need.",
            "Input the annual discount (interest) rate.",
            "Set the number of years.",
            "Choose the compounding frequency.",
            "Read today's present value and the total discount."
        ],
        tips: [
            "For retirement goals, discount the inflated future expense — not today's cost.",
            "Use your opportunity cost (what your money could earn elsewhere) as the rate.",
            "A lower discount rate means you need a bigger investment today — be honest about the rate."
        ],
        faqs: [
            {
                q: "What is present value used for?",
                a: "Present value discounts future cash flows to today's money, letting you compare investments, price bonds, and know how much to invest today to hit a future goal."
            },
            {
                q: "What discount rate should I use?",
                a: "Use the rate your money could realistically earn (opportunity cost): 6–8% for balanced portfolios, 8–12% for equity, or the relevant bond yield for debt instruments."
            }
        ],
        related: [
            { href: "future-value-calculator.html", label: "Future Value", icon: "⏩" },
            { href: "finance-calculator.html", label: "Finance (TVM)", icon: "🧮" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "investment-calculator.html", label: "Investment", icon: "📈" }
        ]
    },

    /* ----------------------------------------------------------------
       FUTURE VALUE CALCULATOR
       ---------------------------------------------------------------- */
    "future-value-calculator.html": {
        facts: [
            { k: "FV", v: "What today's money grows into" },
            { k: "Compounding", v: "Growth engine" },
            { k: "Use", v: "Goals, retirement, education" },
            { k: "Inverse", v: "Present value in reverse" }
        ],
        introTitle: "Future Value Calculator — how much will your money grow to?",
        intro: "The future value (FV) of money tells you what an investment today will be worth at a future date, given a rate of return. This calculator grows your present amount with the exact compounding you choose — essential for goal planning and comparing investments.",
        sections: [
            {
                title: "The growth formula",
                body: [
                    "FV = PV × (1 + r/m)^(m×t), where PV is the present amount, r the annual rate, m compounding frequency and t the years.",
                    "₹10,00,000 at 10% for 10 years compounded annually grows to ₹25,93,742; compounded monthly, slightly more.",
                    "The 'rule of 72' reverse-checks your numbers: 72 ÷ rate ≈ years to double."
                ]
            },
            {
                title: "Planning goals accurately",
                body: [
                    "Education: a ₹20 lakh cost today at 10% inflation will be ₹52.9 lakh in 10 years — plan FV, not PV.",
                    "Retirement: today's ₹40,000 monthly expense at 6% inflation becomes ₹1,28,000/month in 20 years.",
                    "The difference between assuming 8% vs 10% over 30 years is nearly double the terminal amount — choose your rate carefully."
                ]
            }
        ],
        steps: [
            "Enter the present amount you have today.",
            "Input the annual rate of return.",
            "Set the number of years.",
            "Select the compounding frequency.",
            "Read the future value and total interest earned."
        ],
        tips: [
            "For inflation-adjusted goals, use the real rate (return − inflation) as your rate.",
            "Use monthly compounding when comparing with bank products.",
            "Recheck with the rule of 72 to catch input errors."
        ],
        faqs: [
            {
                q: "What is future value?",
                a: "Future value is the amount a present sum will grow to at a given interest rate over a specified period, accounting for compounding. It's the reverse of present value."
            },
            {
                q: "Does compounding frequency affect future value?",
                a: "Yes, but modestly. More frequent compounding (monthly vs annual) adds a small effective-rate premium. Over long horizons the difference compounds too."
            }
        ],
        related: [
            { href: "present-value-calculator.html", label: "Present Value", icon: "⏪" },
            { href: "investment-calculator.html", label: "Investment", icon: "📈" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "interest-rate-calculator.html", label: "Interest Rate", icon: "📐" }
        ]
    },

    /* ----------------------------------------------------------------
       DEPRECIATION CALCULATOR
       ---------------------------------------------------------------- */
    "depreciation-calculator.html": {
        facts: [
            { k: "5 methods", v: "SLM, WDV, DDB, UOP, SYD" },
            { k: "Tax", v: "WDV used in India" },
            { k: "Book", v: "SLM for company accounts" },
            { k: "Salvage", v: "Residual value at end" }
        ],
        introTitle: "Depreciation Calculator — five methods with a full schedule",
        intro: "Depreciation allocates an asset's cost over its useful life. This advanced calculator supports all five major methods — Straight Line (SLM), Written Down Value (WDV), Double Declining Balance (DDB), Units of Production (UoP) and Sum of Years' Digits (SYD) — with a complete yearly schedule and chart.",
        sections: [
            {
                title: "The five methods compared",
                body: [
                    "Straight Line (SLM): equal depreciation every year. Simple, used for financial reporting.",
                    "Written Down Value (WDV): a fixed percentage of the reducing balance. This is the method prescribed for income tax in India for most assets.",
                    "Double Declining Balance (DDB): accelerates depreciation — twice the SLM rate, reducing each year. Useful for tech assets.",
                    "Units of Production (UoP): depreciates by actual usage/output — best for vehicles and machinery.",
                    "Sum of Years' Digits (SYD): accelerated but more gradual than DDB, based on remaining life fractions."
                ]
            },
            {
                title: "Indian tax depreciation rules",
                body: [
                    "Under the Income Tax Act, buildings depreciate at 10% (WDV, on a 10% block), furniture at 10%, plant & machinery at 15%, cars at 15%, computers at 40%.",
                    "Half of the normal rate applies in the year of acquisition if the asset is used for less than 180 days.",
                    "For accounting, companies follow the Companies Act 2013 using useful-life schedules, often different from tax rates — hence the separate book and tax schedules."
                ]
            }
        ],
        steps: [
            "Enter the asset's original cost.",
            "Enter the salvage (scrap) value at the end of life.",
            "Set the useful life in years.",
            "Choose the method (and rate/units for WDV or UoP).",
            "Read first-year depreciation, total depreciation and the yearly schedule."
        ],
        tips: [
            "Use WDV for tax compliance in India and SLM for internal book accounting.",
            "Vehicles and equipment: Units of Production is the most accurate reflection of wear.",
            "DDB is aggressive; combine with a salvage floor to avoid depreciating below scrap."
        ],
        faqs: [
            {
                q: "Which depreciation method is best?",
                a: "For tax, use WDV as prescribed. For financial statements matching asset usage, use SLM or Units of Production. Accelerated methods (DDB, SYD) suit assets losing value fastest early in life."
            },
            {
                q: "What is the depreciation rate for computers in India?",
                a: "For income tax, computers and software depreciate at 40% WDV. For accounting under the Companies Act 2013, the useful life is 3 years (roughly 33% SLM)."
            }
        ],
        related: [
            { href: "roi-calculator.html", label: "ROI Calculator", icon: "📈" },
            { href: "payback-period-calculator.html", label: "Payback Period", icon: "⏱️" },
            { href: "average-return-calculator.html", label: "Average Return", icon: "📐" },
            { href: "irr-calculator.html", label: "IRR", icon: "🧮" }
        ]
    },

    /* ----------------------------------------------------------------
       ROI CALCULATOR
       ---------------------------------------------------------------- */
    "roi-calculator.html": {
        facts: [
            { k: "ROI", v: "Return on Investment" },
            { k: "Formula", v: "Profit ÷ Cost × 100" },
            { k: "Annualized", v: "CAGR of the return" },
            { k: "Uses", v: "Compare any investment" }
        ],
        introTitle: "ROI Calculator — measure your return on any investment",
        intro: "Return on Investment (ROI) is the most universal performance measure: profit divided by cost. This calculator also annualizes the return (CAGR) so you can compare investments held for different periods on an equal footing.",
        sections: [
            {
                title: "ROI vs annualized return",
                body: [
                    "ROI = (Final value − Cost) ÷ Cost × 100. A ₹50,000 gain on ₹2,00,000 cost is 25% ROI.",
                    "But 25% over 5 years (5% p.a.) is very different from 25% in 1 year. CAGR fixes this: CAGR = (Final ÷ Cost)^(1/years) − 1.",
                    "Always compare annualized returns across different time horizons — a financial planner never compares raw ROI across periods."
                ]
            },
            {
                title: "Beyond ROI: risk-adjusted returns",
                body: [
                    "ROI ignores risk. A 15% ROI from FD is risk-free; the same from a startup is a gamble.",
                    "Use Sharpе-ratio thinking: higher return per unit of volatility is 'better' ROI.",
                    "Real ROI subtracts inflation — 12% nominal with 6% inflation is only ~5.7% real."
                ]
            }
        ],
        steps: [
            "Enter the total cost / invested amount.",
            "Enter the current or final value.",
            "Optionally enter the number of years held.",
            "Read ROI percentage and annualized (CAGR) return."
        ],
        tips: [
            "Include all costs (fees, brokerage, taxes) in 'cost' for an honest ROI.",
            "For property, add renovation and maintenance costs to the cost side.",
            "Annualize to compare a 1-year stock trade with a 10-year FD."
        ],
        faqs: [
            {
                q: "What is a good ROI?",
                a: "It depends on risk. Risk-free FDs give 5–8%. A good equity or business ROI is 12–15% annualized over the long term. Compare against your cost of capital."
            },
            {
                q: "How is annualized ROI calculated?",
                a: "CAGR = (Final ÷ Cost)^(1/years) − 1, expressed as a percentage. It smooths the multi-year return into an equivalent yearly rate."
            }
        ],
        related: [
            { href: "average-return-calculator.html", label: "Average Return", icon: "📐" },
            { href: "irr-calculator.html", label: "IRR", icon: "🧮" },
            { href: "payback-period-calculator.html", label: "Payback", icon: "⏱️" },
            { href: "investment-calculator.html", label: "Investment", icon: "📈" }
        ]
    },

    /* ----------------------------------------------------------------
       AVERAGE RETURN CALCULATOR
       ---------------------------------------------------------------- */
    "average-return-calculator.html": {
        facts: [
            { k: "CAGR", v: "True annualized growth" },
            { k: "Arithmetic", v: "Simple average" },
            { k: "Total return", v: "Overall gain %" },
            { k: "Compare", v: "Across time horizons" }
        ],
        introTitle: "Average Return Calculator — CAGR and arithmetic return",
        intro: "There are two common ways to average an investment's return, and they tell different stories. This calculator computes your total return, arithmetic average and the CAGR (geometric average) — the honest measure of annualized performance.",
        sections: [
            {
                title: "Arithmetic vs geometric (CAGR) average",
                body: [
                    "Arithmetic average adds up yearly returns and divides by years. If a stock gains 50% then loses 50%, the arithmetic average is 0% — but you've actually lost 25%!",
                    "CAGR (geometric) multiplies yearly factors and takes the root: (1.5 × 0.5)^(1/2) − 1 = −13.4%. That's the honest number.",
                    "For any volatile investment, CAGR is always ≤ arithmetic average. The gap is the 'volatility drag'."
                ]
            },
            {
                title: "What really matters",
                body: [
                    "Use CAGR for comparing investments and setting expectations.",
                    "A fund's 'average annual' 15% is often an arithmetic number — its actual 10-year CAGR may be 12%. Always ask for CAGR.",
                    "This calculator converts an initial and final value into both averages so you can see the difference clearly."
                ]
            }
        ],
        steps: [
            "Enter the initial investment value.",
            "Enter the final value.",
            "Enter the holding period in years.",
            "Read total return, arithmetic average and CAGR."
        ],
        tips: [
            "Prefer CAGR whenever a planner quotes 'average returns'.",
            "Subtract inflation from CAGR to get real growth.",
            "Verify with the rule of 72: doubling in 6 years ≈ 12% CAGR."
        ],
        faqs: [
            {
                q: "What is the difference between ROI and CAGR?",
                a: "ROI is the total gain percentage over the whole period. CAGR annualizes it — the equivalent yearly compounding rate that would produce that total."
            },
            {
                q: "Why is my fund's average higher than my actual return?",
                a: "Arithmetic averages include volatility drag. The geometric average (CAGR) reflects the compounding reality, which is always lower for volatile assets."
            }
        ],
        related: [
            { href: "roi-calculator.html", label: "ROI", icon: "📈" },
            { href: "irr-calculator.html", label: "IRR", icon: "🧮" },
            { href: "investment-calculator.html", label: "Investment", icon: "📈" },
            { href: "mutual-fund-calculator.html", label: "Mutual Fund", icon: "📊" }
        ]
    },

    /* ----------------------------------------------------------------
       IRR CALCULATOR
       ---------------------------------------------------------------- */
    "irr-calculator.html": {
        facts: [
            { k: "IRR", v: "Internal Rate of Return" },
            { k: "Meaning", v: "Rate where NPV = 0" },
            { k: "Use", v: "Compare business projects" },
            { k: "Decision", v: "Accept if IRR > cost of capital" }
        ],
        introTitle: "IRR Calculator — the rate that makes an investment worth it",
        intro: "The Internal Rate of Return (IRR) is the discount rate at which a project's future cash flows exactly offset its initial investment (NPV = 0). It's the gold standard for evaluating business projects and large investments — this calculator solves it numerically in the browser.",
        sections: [
            {
                title: "Understanding IRR",
                body: [
                    "IRR is the implied annual return of a series of cash flows: an initial outflow followed by inflows.",
                    "Decision rule: accept a project if IRR exceeds your cost of capital (e.g. 12%). Reject if IRR < hurdle rate.",
                    "For the example of a ₹10,00,000 investment returning ₹2,50,000/year for 5 years plus a ₹2,00,000 residual, IRR ≈ 12.3%."
                ]
            },
            {
                title: "IRR vs NPV vs payback",
                body: [
                    "NPV tells you the absolute value created (in money) at your discount rate; IRR tells you the percentage return.",
                    "IRR alone can mislead when projects have different scales — a 50% IRR on ₹1 lakh is worth less than 20% IRR on ₹1 crore.",
                    "Payback period is the simplest but ignores profitability after breakeven — use all three for big decisions."
                ]
            }
        ],
        steps: [
            "Enter the initial investment (negative cash flow).",
            "Enter the annual cash flow expected each year.",
            "Set the number of years.",
            "Optionally add a residual/salvage value at the end.",
            "Read the IRR percentage and total cash inflows."
        ],
        tips: [
            "Compare IRR against your true cost of capital, not a random benchmark.",
            "For real estate, include rental income, tax benefits and resale value as cash flows.",
            "When comparing two projects, prioritize NPV at your hurdle rate."
        ],
        faqs: [
            {
                q: "What is a good IRR?",
                a: "A 'good' IRR is one above your cost of capital. For most businesses, 15–25% is strong; 8–12% is moderate for stable real estate and infrastructure projects."
            },
            {
                q: "What if IRR is negative?",
                a: "A negative IRR means the project loses money in present-value terms — the cash flows don't recover the initial investment at any positive discount rate. Reject it."
            }
        ],
        related: [
            { href: "roi-calculator.html", label: "ROI", icon: "📈" },
            { href: "payback-period-calculator.html", label: "Payback", icon: "⏱️" },
            { href: "average-return-calculator.html", label: "Average Return", icon: "📐" },
            { href: "finance-calculator.html", label: "Finance (TVM)", icon: "🧮" }
        ]
    },

    /* ----------------------------------------------------------------
       PAYBACK PERIOD CALCULATOR
       ---------------------------------------------------------------- */
    "payback-period-calculator.html": {
        facts: [
            { k: "Payback", v: "Time to recover investment" },
            { k: "Simple", v: "Investment ÷ annual cash flow" },
            { k: "Use", v: "Quick project screening" },
            { k: "Limitation", v: "Ignores profits after breakeven" }
        ],
        introTitle: "Payback Period Calculator — how fast will you recover your investment?",
        intro: "The payback period is the time it takes for an investment's cash inflows to recover its original cost. It's the first screen every business uses before committing capital — this calculator gives you years, months and the cash recovered.",
        sections: [
            {
                title: "Simple vs discounted payback",
                body: [
                    "Simple payback = Investment ÷ annual cash flow. A ₹10,00,000 machine generating ₹2,50,000/year pays back in 4 years.",
                    "Discounted payback discounts each year's cash flow first — more conservative, and what this calculator's time-value-aware cousin (NPV/IRR) uses.",
                    "Short paybacks reduce risk: the faster capital returns, the sooner you can reinvest."
                ]
            },
            {
                title: "Limits of payback",
                body: [
                    "Payback ignores cash flows after breakeven — a 4-year payback with no profits after year 5 is worse than a 5-year payback that generates profits for 15 more years.",
                    "It also ignores the time value of money in its simple form.",
                    "Use it as a first screen, then confirm with NPV and IRR for the final decision."
                ]
            }
        ],
        steps: [
            "Enter the total initial investment.",
            "Enter the expected annual cash flow.",
            "Read the payback period in years and months, plus total cash recovered."
        ],
        tips: [
            "For solar panels, compare payback against your electricity bill to find breakeven.",
            "Use conservative cash flow estimates — payback is only as good as your projection.",
            "Subtract maintenance costs from cash flow before entering."
        ],
        faqs: [
            {
                q: "What is a good payback period?",
                a: "Industries differ — 3–5 years is typical for machinery and solar; software often pays back within 2 years; real estate may take 8–12 years. Compare against your industry norm."
            },
            {
                q: "Does payback consider the time value of money?",
                a: "Simple payback doesn't. Use discounted payback or IRR for a time-value-correct picture. This tool shows the simple version for quick screening."
            }
        ],
        related: [
            { href: "irr-calculator.html", label: "IRR", icon: "🧮" },
            { href: "roi-calculator.html", label: "ROI", icon: "📈" },
            { href: "average-return-calculator.html", label: "Average Return", icon: "📐" },
            { href: "depreciation-calculator.html", label: "Depreciation", icon: "📉" }
        ]
    },

    /* ----------------------------------------------------------------
       CD CALCULATOR
       ---------------------------------------------------------------- */
    "cd-calculator.html": {
        facts: [
            { k: "CD", v: "Certificate of Deposit" },
            { k: "Fixed term", v: "1 month – 5 years" },
            { k: "APY", v: "Annual percentage yield" },
            { k: "FDIC", v: "Insured in the US" }
        ],
        introTitle: "CD Calculator — Certificate of Deposit maturity",
        intro: "A Certificate of Deposit (CD) is a fixed-term deposit that earns a guaranteed, typically higher rate than a savings account. This calculator shows your maturity amount, interest earned and the true annual percentage yield (APY) for any compounding frequency.",
        sections: [
            {
                title: "How CDs work",
                body: [
                    "You lock money for a term — 1 month to 5 years (or longer) — at a fixed rate. Withdrawing early triggers penalties (often several months of interest).",
                    "Longer terms generally pay higher rates, but rates can also be higher for shorter terms during unusual yield curves.",
                    "In the US, CDs are FDIC-insured up to 250,000 USD per depositor, per bank — making them one of the safest investments available."
                ]
            },
            {
                title: "CD laddering",
                body: [
                    "Split your money into 4 CDs maturing at 3, 6, 9 and 12 months, rolling each into a new 1-year CD on maturity.",
                    "This gives a maturing CD every quarter — income and access — while capturing long-term rates.",
                    "When rates rise, ladders let you capture higher rates each rollover without locking everything at today's low rate."
                ]
            }
        ],
        steps: [
            "Enter your deposit amount.",
            "Input the CD's annual interest rate.",
            "Set the term in years.",
            "Choose the compounding frequency (daily, monthly, quarterly, yearly).",
            "Read the maturity amount, interest and APY."
        ],
        tips: [
            "Compare APY, not the nominal rate — APY includes compounding effects.",
            "Watch early-withdrawal penalties; CD rates are higher precisely because the money is locked.",
            "Consider a brokered CD or CD ladder for flexibility."
        ],
        faqs: [
            {
                q: "What is the difference between an FD and a CD?",
                a: "They're the same concept (fixed-term deposit). 'CD' is the US term; 'FD' is used in India, Bangladesh and the UK. Rules and insurance vary by country."
            },
            {
                q: "What happens if I withdraw a CD early?",
                a: "You'll pay a penalty — typically 3–6 months of interest (or more for long terms). In some cases, the penalty can exceed the interest earned."
            }
        ],
        related: [
            { href: "fdr.html", label: "FDR Calculator", icon: "🏦" },
            { href: "interest-calculator.html", label: "Interest Calculator", icon: "💹" },
            { href: "compound-interest-calculator.html", label: "Compound Interest", icon: "📈" },
            { href: "interest-rate-calculator.html", label: "Interest Rate", icon: "📐" }
        ]
    },

    /* ----------------------------------------------------------------
       BOND CALCULATOR
       ---------------------------------------------------------------- */
    "bond-calculator.html": {
        facts: [
            { k: "Bond", v: "Fixed-income security" },
            { k: "Coupon", v: "Annual interest payment" },
            { k: "YTM", v: "Yield to maturity" },
            { k: "Current yield", v: "Coupon ÷ price" }
        ],
        introTitle: "Bond Calculator — coupon, current yield and YTM",
        intro: "Bonds pay fixed coupons and return the face value at maturity. This calculator computes your annual coupon payment, current yield, yield to maturity (YTM) and total coupon income — the core metrics for any bond purchase or comparison.",
        sections: [
            {
                title: "Bond basics every investor should know",
                body: [
                    "Face value (par) is what the issuer repays at maturity. The coupon is the annual interest paid (coupon rate × face value).",
                    "If you buy below face value (discount), your YTM exceeds the coupon rate; buy above (premium) and YTM falls below the coupon.",
                    "Current yield = annual coupon ÷ market price. YTM additionally accounts for the gain/loss between price and face value over remaining life."
                ]
            },
            {
                title: "Bond prices and interest rates",
                body: [
                    "Bond prices and interest rates move inversely: when rates rise, existing bonds with lower coupons fall in price; when rates fall, prices rise.",
                    "Duration measures price sensitivity — longer-term bonds swing more with rate changes.",
                    "Government bonds are considered risk-free in most countries; corporate bonds pay higher coupons but carry default risk (credit spread)."
                ]
            }
        ],
        steps: [
            "Enter the bond's face value.",
            "Input the annual coupon rate (%).",
            "Set the number of years to maturity.",
            "Enter the price you pay (market price).",
            "Read coupon payment, current yield, YTM and total coupons."
        ],
        tips: [
            "Compare YTM across bonds — it's the true return, not the coupon.",
            "Hold to maturity to avoid price volatility losses.",
            "Prefer short-duration bonds when rates are expected to rise."
        ],
        faqs: [
            {
                q: "What is yield to maturity (YTM)?",
                a: "YTM is the total return anticipated on a bond if held to maturity, including all coupon payments and the gain or loss from buying at a price different from face value."
            },
            {
                q: "Are bonds risk-free?",
                a: "Government bonds of stable countries carry minimal default risk. Corporate bonds carry default risk. All bonds carry interest-rate risk — prices fall when rates rise."
            }
        ],
        related: [
            { href: "cd-calculator.html", label: "CD Calculator", icon: "🏛️" },
            { href: "interest-calculator.html", label: "Interest", icon: "💹" },
            { href: "interest-rate-calculator.html", label: "Interest Rate", icon: "📐" },
            { href: "present-value-calculator.html", label: "Present Value", icon: "⏪" }
        ]
    },

    /* ----------------------------------------------------------------
       ANNUITY CALCULATOR
       ---------------------------------------------------------------- */
    "annuity-calculator.html": {
        facts: [
            { k: "Annuity", v: "Series of payments" },
            { k: "Two types", v: "Contribute then receive" },
            { k: "Use", v: "Pension-like income" },
            { k: "Power", v: "Interest on every deposit" }
        ],
        introTitle: "Annuity Calculator — family future value for regular payments",
        intro: "An annuity is a series of regular payments — either contributions growing for the future or payouts received in retirement. This calculator projects the future value of your annuity contributions (lump sum plus regular deposits) including every rupee of compound interest.",
        sections: [
            {
                title: "Annuity future value explained",
                body: [
                    "FV = P × (1+r)^n + C × [((1+r)^n − 1) ÷ r], where P is the initial lump, C the regular contribution and r the periodic rate.",
                    "Annuities are the backbone of pensions, insurance savings plans and NPS — the same math powers your retirement corpus growth.",
                    "Ordinary annuities pay at the end of each period; annuity-due pays at the beginning (worth slightly more)."
                ]
            }
        ],
        steps: [
            "Enter the starting lump sum (0 if starting fresh).",
            "Add the regular monthly contribution.",
            "Set the annual rate and the number of years.",
            "Read the future value, total contributed and interest earned."
        ],
        tips: [
            "Use annuities for guaranteed pension-building; they sacrifice some upside for certainty.",
            "Tax treatment varies: NPS and pension plans differ from taxable insurance annuities.",
            "Compare the annuity's internal rate against a simple index fund before locking in."
        ],
        faqs: [
            {
                q: "What is an annuity in simple terms?",
                a: "An annuity is a contract or plan that converts payments into a future income stream. You contribute regularly and later receive a steady stream of payments — like a self-built pension."
            },
            {
                q: "Is an annuity a good investment?",
                a: "Annuities guarantee income for life, but returns often trail equity markets and fees can be high. They suit conservative retirees seeking certainty."
            }
        ],
        related: [
            { href: "annuity-payout-calculator.html", label: "Annuity Payout", icon: "💸" },
            { href: "pension-calculator.html", label: "Pension", icon: "👵" },
            { href: "retirement-calculator.html", label: "Retirement", icon: "🏖️" },
            { href: "future-value-calculator.html", label: "Future Value", icon: "⏩" }
        ]
    },

    /* ----------------------------------------------------------------
       ANNUITY PAYOUT CALCULATOR
       ---------------------------------------------------------------- */
    "annuity-payout-calculator.html": {
        facts: [
            { k: "Payout", v: "Monthly income from lump sum" },
            { k: "Fixed period", v: "Income for N years" },
            { k: "Inverse", v: "Reverse of annuity" },
            { k: "Retirees", v: "Convert corpus to income" }
        ],
        introTitle: "Annuity Payout Calculator — income from your lump sum",
        intro: "You've built a corpus — now how much can you safely withdraw each month? This annuity payout calculator answers it: given your lump sum, rate and the number of years, it computes the exact monthly payout, total payout and interest portion.",
        sections: [
            {
                title: "The payout formula",
                body: [
                    "Monthly payout = P × r ÷ [1 − (1+r)^−n], where P is the lump sum, r the monthly rate and n the number of months.",
                    "A ₹50,00,000 corpus at 6% for 20 years pays about ₹35,800/month.",
                    "Extending to 30 years drops the payout to about ₹30,000/month — trade income for longevity."
                ]
            },
            {
                title: "Planning the withdrawal rate",
                body: [
                    "A 4% annual withdrawal is the classic conservative rule for a 30-year retirement; at 6% return you'd withdraw ~4% and keep the rest growing.",
                    "This fixed-period payout spends both principal and interest — your corpus hits zero at the end.",
                    "For lifetime income instead, consider an immediate annuity product or a withdrawal policy tied to market performance."
                ]
            }
        ],
        steps: [
            "Enter your lump sum (retirement corpus).",
            "Input the expected annual return.",
            "Set the number of years income must last.",
            "Read the monthly payout, total payout and interest earned."
        ],
        tips: [
            "Be conservative with the return during withdrawal phase — 5–6% is prudent.",
            "Add inflation: a fixed payout buys less every year. Consider an inflation-indexed withdrawal.",
            "Keep 2–3 years of expenses in cash to avoid selling investments in a downturn."
        ],
        faqs: [
            {
                q: "How much can I withdraw per month?",
                a: "With a 4% rule, divide your corpus by 300 for a rough monthly figure. This calculator gives the exact amount for your specific return and time horizon."
            },
            {
                q: "What is a lifetime annuity?",
                a: "A lifetime annuity pays a guaranteed income until death in exchange for your corpus. It protects against outliving savings but usually offers lower income than a managed withdrawal plan."
            }
        ],
        related: [
            { href: "annuity-calculator.html", label: "Annuity", icon: "📅" },
            { href: "retirement-calculator.html", label: "Retirement", icon: "🏖️" },
            { href: "pension-calculator.html", label: "Pension", icon: "👵" },
            { href: "present-value-calculator.html", label: "Present Value", icon: "⏪" }
        ]
    },

    /* ----------------------------------------------------------------
       PENSION CALCULATOR
       ---------------------------------------------------------------- */
    "pension-calculator.html": {
        facts: [
            { k: "Pension", v: "Regular retirement income" },
            { k: "COLA", v: "Cost of living adjustment" },
            { k: "Inflation", v: "Erodes fixed income" },
            { k: "Value", v: "Total lifetime payout" }
        ],
        introTitle: "Pension Calculator — total value, COLA and real purchasing power",
        intro: "A monthly pension may sound simple, but its real value depends on how long it lasts and how it grows (or shrinks) relative to inflation. This calculator projects your total pension received, the impact of a COLA (cost-of-living adjustment), and the inflation-adjusted real value.",
        sections: [
            {
                title: "Why pension math matters",
                body: [
                    "A ₹40,000/month pension with 3% annual COLA for 25 years totals about ₹1.74 crore — far more than the ₹1.2 crore without COLA.",
                    "Without COLA, inflation halves your purchasing power roughly every 12 years at 6% inflation.",
                    "Deciding to take a lump sum vs a pension? Compare the pension's present value against the lump sum offer — this calculator shows the lifetime picture."
                ]
            },
            {
                title: "Pension vs lump sum (commutation)",
                body: [
                    "Many schemes let you 'commute' part of your pension into a one-time lump sum, reducing the monthly amount.",
                    "The breakeven question: if the lump sum invested earns more than the pension you give up, commutation wins.",
                    "Typical factor: 1/3rd of pension commuted for a lump sum of about 8–11× that third, depending on age and scheme rules."
                ]
            }
        ],
        steps: [
            "Enter your monthly pension amount.",
            "Add the annual COLA (0 if your pension is fixed).",
            "Enter the inflation rate to see real value.",
            "Set the number of retirement years.",
            "Read total pension, final monthly amount and inflation-adjusted (real) total."
        ],
        tips: [
            "Ask your employer for the COLA history before assuming a rate.",
            "If your pension lacks COLA, invest some of it to offset inflation.",
            "Compare the pension's present value with any commutation offer."
        ],
        faqs: [
            {
                q: "What is COLA?",
                a: "COLA (Cost of Living Adjustment) is the annual percentage increase a pension applies to keep pace with inflation. A 3% COLA preserves around half of purchasing power over 25 years that would otherwise be lost."
            },
            {
                q: "How is a pension's present value calculated?",
                a: "Sum each future monthly payment discounted to today's money at your discount rate. A ₹40,000 pension for 25 years at 7% has a present value near ₹55 lakh."
            }
        ],
        related: [
            { href: "retirement-calculator.html", label: "Retirement", icon: "🏖️" },
            { href: "annuity-payout-calculator.html", label: "Annuity Payout", icon: "💸" },
            { href: "social-security-calculator.html", label: "Social Security", icon: "🛡️" },
            { href: "present-value-calculator.html", label: "Present Value", icon: "⏪" }
        ]
    },

    /* ----------------------------------------------------------------
       SOCIAL SECURITY CALCULATOR
       ---------------------------------------------------------------- */
    "social-security-calculator.html": {
        facts: [
            { k: "FRA", v: "Full retirement age (67 for most)" },
            { k: "Early", v: "62 = ~30% reduced" },
            { k: "Delayed", v: "70 = +24–32% bonus" },
            { k: "Breakeven", v: "~80 years of age" }
        ],
        introTitle: "Social Security Calculator — when should you claim?",
        intro: "The age you claim Social Security can change your lifetime benefit by hundreds of thousands. This calculator applies the official reduction/increase percentages to show your monthly benefit and lifetime total at any claiming age from 62 to 70.",
        sections: [
            {
                title: "How claiming age changes your benefit",
                body: [
                    "Claiming before Full Retirement Age (FRA, 67 for people born after 1960) reduces benefits by 5/9 of 1% per month for the first 36 months and 5/12 of 1% beyond.",
                    "Claiming at 62 reduces a $2,000 FRA benefit to about $1,400 — a 30% cut for life.",
                    "Delaying past FRA adds 8% per year up to age 70 — roughly a 24–32% increase for life."
                ]
            },
            {
                title: "The breakeven analysis",
                body: [
                    "Claiming early pays more total early on, but delayed claiming catches up around age 80.",
                    "If you live past ~80–83, delayed claiming wins; under that, early claiming pays more total.",
                    "Health, spousal benefits and other income all matter — a $1,500+ early claim may also push you over the earnings limit if you keep working."
                ]
            }
        ],
        steps: [
            "Enter your planned claiming age (62–70).",
            "Enter your full retirement age (use 67 if born after 1960).",
            "Enter your benefit amount at full retirement age.",
            "Enter your life expectancy.",
            "Read your monthly benefit, lifetime total and change vs FRA."
        ],
        tips: [
            "If married, coordinate: the higher earner delaying to 70 boosts survivor benefits.",
            "Avoid claiming while still earning above the annual limit (2025: $23,400) — benefits get clawed back.",
            "Use your health history to estimate longevity honestly."
        ],
        faqs: [
            {
                q: "Is it better to take Social Security at 62 or 70?",
                a: "Financially, claiming at 70 maximizes lifetime income if you live past the breakeven (~80). Claiming at 62 helps if you have health concerns or need cash flow now. Many planners choose ~67–70 for longevity protection."
            },
            {
                q: "How is the early retirement reduction calculated?",
                a: "Benefits decrease by 5/9% per month for the first 36 months before FRA, and 5/12% per month after that — about a 30% total cut for the earliest claim at 62."
            }
        ],
        related: [
            { href: "retirement-calculator.html", label: "Retirement", icon: "🏖️" },
            { href: "pension-calculator.html", label: "Pension", icon: "👵" },
            { href: "annuity-payout-calculator.html", label: "Annuity Payout", icon: "💸" },
            { href: "annuity-calculator.html", label: "Annuity", icon: "📅" }
        ]
    },

    /* ----------------------------------------------------------------
       DEBT TO INCOME CALCULATOR
       ---------------------------------------------------------------- */
    "debt-to-income.html": {
        facts: [
            { k: "DTI", v: "Monthly debt ÷ gross income" },
            { k: "Good", v: "Below 36%" },
            { k: "Mortgage", v: "Front ratio ≤ 28%" },
            { k: "Lenders", v: "Max ~43–45%" }
        ],
        introTitle: "Debt-to-Income Ratio Calculator — your lending health score",
        intro: "Your debt-to-income (DTI) ratio is how lenders judge whether you can handle new debt. This calculator adds up your monthly obligations and divides by gross income to compute your front (housing-only) and back (total debt) ratios — instantly showing your lending health.",
        sections: [
            {
                title: "Understanding front and back DTI",
                body: [
                    "Front-end ratio: housing costs (mortgage, tax, insurance) ÷ gross income. Target ≤ 28%.",
                    "Back-end ratio: ALL debt payments ÷ gross income. Target ≤ 36%.",
                    "Example: ₹30,000 housing + ₹18,000 other debts on ₹1,20,000 income → front 25%, back 40%. A second loan would push you over the 36% norm."
                ]
            },
            {
                title: "Improving your DTI",
                body: [
                    "Pay off small high-rate debts first — each closed account lowers monthly obligations.",
                    "Increase income (side income, rental) or make a larger down payment to shrink the housing payment.",
                    "Avoid new credit lines 6 months before applying for a mortgage — lenders pull updated DTI on day one."
                ]
            }
        ],
        steps: [
            "Enter your gross monthly income.",
            "Enter monthly debt payments: housing, car, personal loans, cards, student loans, other.",
            "Read your front-end and back-end DTI ratios with health status.",
            "Check whether you're in the 'good' (≤36%) or 'caution' (37–45%) range."
        ],
        tips: [
            "Lenders approve up to 43–45% DTI, but 36% keeps you comfortable with life's surprises.",
            "A zero-balance credit card still shows a minimum payment — close or settle old cards before applying.",
            "Rent counts in the back-end ratio too, though not the front."
        ],
        faqs: [
            {
                q: "What is a good debt-to-income ratio?",
                a: "Lenders prefer a back-end DTI of 36% or below. 37–45% may qualify with strong credit and savings; above 45% rarely qualifies for prime mortgages.",
            },
            {
                q: "How do I calculate DTI?",
                a: "Add all monthly debt payments (housing, loans, cards, alimony) and divide by gross monthly income. Multiply by 100 for the percentage."
            }
        ],
        related: [
            { href: "house-affordability.html", label: "Affordability", icon: "🏠" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "loan-payoff.html", label: "Loan Payoff", icon: "⏱️" },
            { href: "personal-loan.html", label: "Personal Loan", icon: "👤" }
        ]
    },

    /* ----------------------------------------------------------------
       DOWN PAYMENT CALCULATOR
       ---------------------------------------------------------------- */
    "down-payment-calculator.html": {
        facts: [
            { k: "20%", v: "Avoids PMI" },
            { k: "3.5%", v: "FHA minimum" },
            { k: "0%", v: "VA / USDA options" },
            { k: "Save", v: "Higher DP = lower EMI" }
        ],
        introTitle: "Down Payment Calculator — save the right amount",
        intro: "How much down payment do you need, and how long will it take to save? This calculator works both ways: compute the required down payment for a home price, and the monthly savings needed to reach it — with PMI consequences clearly shown.",
        sections: [
            {
                title: "Down payment thresholds",
                body: [
                    "20% is the sweet spot — it avoids PMI and gives instant equity. For a ₹50,00,000 home, that's ₹10,00,000 cash.",
                    "FHA loans allow as little as 3.5%, but add mortgage insurance premiums for life of the loan in many cases.",
                    "VA (0%) and USDA (0%) loans exist for eligible buyers — no PMI either. Private lenders often offer 5–10% down with PMI."
                ]
            },
            {
                title: "Saving for the down payment",
                body: [
                    "A ₹10,00,000 down payment in 3 years at 7% needs about ₹25,000/month saved — 10% of a ₹2.5 lakh monthly income.",
                    "Keep down-payment savings in FDs or liquid funds — never equity you may need at a market low.",
                    "Gift funds from family are allowed by most lenders but must be documented."
                ]
            }
        ],
        steps: [
            "Enter the home price or target amount.",
            "Enter your down payment percentage (20% is benchmark).",
            "Optionally enter your monthly savings and rate to see how long it takes.",
            "Read the down payment amount and, if applicable, the savings timeline."
        ],
        tips: [
            "Aim for 20% or combine 10% + lender PMI that drops off at 20% equity.",
            "Include stamp duty and registration (6–8% in many Indian states) in your cash needs.",
            "Never drain your emergency fund for the down payment."
        ],
        faqs: [
            {
                q: "What is the minimum down payment for a house?",
                a: "Conventional loans start at 3–5%; FHA accepts 3.5%; VA and USDA allow 0% for eligible borrowers. The 20% benchmark avoids private mortgage insurance."
            },
            {
                q: "How much house can I afford with my down payment?",
                a: "Divide your cash by your planned down payment percentage. With ₹10,00,000 at 20%, you can afford a ₹50,00,000 home. Use the house affordability calculator for the full picture."
            }
        ],
        related: [
            { href: "house-affordability.html", label: "Affordability", icon: "🏠" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "savings-calculator.html", label: "Savings Goal", icon: "🎯" },
            { href: "home-loan.html", label: "Home Loan", icon: "🏠" }
        ]
    },

    /* ----------------------------------------------------------------
       REFINANCE CALCULATOR
       ---------------------------------------------------------------- */
    "refinance-calculator.html": {
        facts: [
            { k: "Refinance", v: "Replace loan with better terms" },
            { k: "Rule", v: "Save > 0.75% generally" },
            { k: "Costs", v: "2–5% of loan value" },
            { k: "Breakeven", v: "Months to recover costs" }
        ],
        introTitle: "Refinance Calculator — is it worth it?",
        intro: "Refinancing replaces your current loan with a new one at a lower rate or longer term. This calculator compares your current payment with the new proposed payment, computes the closing costs, and finds your breakeven — the months until savings offset costs.",
        sections: [
            {
                title: "When refinancing makes sense",
                body: [
                    "Rate drop of 0.75–1% or more usually justifies refinancing if you plan to stay past the breakeven point.",
                    "Cash-out refinancing can convert home equity into cash — but never for consumption; use it for debt consolidation or renovation that adds value.",
                    "Shorten the term (e.g. 30→15 years) to build equity faster, even at a similar rate."
                ]
            },
            {
                title: "The breakeven calculation",
                body: [
                    "Breakeven months = total closing costs ÷ monthly savings. If costs are ₹2,00,000 and you save ₹8,000/month, breakeven is 25 months.",
                    "If you plan to move or refinance again before breakeven, the refi loses money.",
                    "Online 'no-cost' refinances embed costs in a higher rate — compare total cost over your planned stay."
                ]
            }
        ],
        steps: [
            "Enter your current loan balance, rate and remaining term.",
            "Enter the proposed new rate and term.",
            "Add expected closing costs (2–5% of the loan).",
            "Read the new monthly payment, monthly savings, total interest saved and breakeven period."
        ],
        tips: [
            "Lock your rate only after comparing 3+ lenders.",
            "Refinance to a shorter term when income allows — combine it with the lower rate for maximum savings.",
            "Check if you can 'recast' instead: a lump-sum principal reduction keeps your rate but lowers the EMI at low or no cost."
        ],
        faqs: [
            {
                q: "Is refinancing worth it?",
                a: "Yes if the new rate is 0.75–1% lower AND you stay beyond the breakeven period (typically 1–3 years). Calculate your exact breakeven with this tool before committing."
            },
            {
                q: "What are typical refinance closing costs?",
                a: "Expect 2–5% of the loan amount — appraisal, title, origination and processing fees. Lender-credit options can reduce these at the cost of a higher rate."
            }
        ],
        related: [
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "amortization-calculator.html", label: "Amortization", icon: "📊" },
            { href: "mortgage-payoff.html", label: "Mortgage Payoff", icon: "⏱️" },
            { href: "home-equity-loan.html", label: "Home Equity", icon: "🏠" }
        ]
    },

    /* ----------------------------------------------------------------
       MORTGAGE PAYOFF CALCULATOR
       ---------------------------------------------------------------- */
    "mortgage-payoff.html": {
        facts: [
            { k: "Extra payment", v: "Beat the clock" },
            { k: "Biweekly", v: "26 payments = 13 EMIs/year" },
            { k: "Save", v: "Lakhs in interest" },
            { k: "Equity", v: "Own the home sooner" }
        ],
        introTitle: "Mortgage Payoff Calculator — own your home years sooner",
        intro: "Adding even a small amount to your monthly mortgage payment dramatically shortens the term and saves interest. This calculator shows exactly when you'll be mortgage-free with extra payments — and the interest you'll save.",
        sections: [
            {
                title: "Strategies to pay off early",
                body: [
                    "Extra monthly payment: ₹5,000 extra/month on a ₹40 lakh mortgage saves lakhs and cuts years.",
                    "Biweekly payments: paying half the EMI every two weeks creates one extra full payment each year — a classic zero-pain accelerator.",
                    "Annual lump sums from bonuses: a ₹1,00,000 yearly bonus applied to principal works like compounding in reverse."
                ]
            },
            {
                title: "Should you pay off the mortgage early?",
                body: [
                    "Mathematically, paying off cheap debt (5–7% home loan) could lose vs investing (10–12% equity) — but the guaranteed interest savings and peace of mind are real.",
                    "The sweet spot: keep the home loan tax deductions (80C/24b) but direct surplus to debt if the rate exceeds what you can earn risk-free.",
                    "Many choose 'debt-light': pay down to a comfortable 30% of income, invest the rest."
                ]
            }
        ],
        steps: [
            "Enter your current mortgage balance and interest rate.",
            "Enter your current monthly payment.",
            "Optionally add an extra monthly payment and/or annual lump sum.",
            "Read your payoff date, years saved and interest saved."
        ],
        tips: [
            "Verify the lender applies extra payments to principal — not 'next month's payment'.",
            "Keep emergency cash before making accelerated payments.",
            "Consider recasting to lower the monthly bill instead if cash flow is the goal."
        ],
        faqs: [
            {
                q: "How much does an extra payment per year help?",
                a: "One extra full payment per year (biweekly schedule) typically cuts a 30-year mortgage to about 25.5 years and saves roughly 10–12% of total interest."
            },
            {
                q: "Should I invest instead of paying off my mortgage?",
                a: "If your mortgage rate is below 6–7% and you have a long horizon, investing in equity may return more. The guaranteed savings from prepaying, however, carry zero risk. Balance based on your risk tolerance."
            }
        ],
        related: [
            { href: "amortization-calculator.html", label: "Amortization", icon: "📊" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "refinance-calculator.html", label: "Refinance", icon: "🔄" },
            { href: "loan-payoff.html", label: "Loan Payoff", icon: "⏱️" }
        ]
    },

    /* ----------------------------------------------------------------
       RENT CALCULATOR
       ---------------------------------------------------------------- */
    "rent-calculator.html": {
        facts: [
            { k: "Budget", v: "30% of income max" },
            { k: "Share", v: "Split with roommates" },
            { k: "Afford", v: "Rent ~ Gross income ÷ 40" },
            { k: "Includes", v: "Utilities & deposit" }
        ],
        introTitle: "Rent Calculator — what rent can you really afford?",
        intro: "The classic advice: keep housing under 30% of gross income. This rent calculator turns your income and expenses into a realistic monthly rent figure — including utilities and deposit, plus smart roommate-splitting guidance.",
        sections: [
            {
                title: "The 30% rule and reality",
                body: [
                    "30% of gross income is the affordability benchmark: ₹40,000/month income → ₹12,000 rent.",
                    "In high-cost cities, many renters hit 40–50%; that's the reality of metro cities — compensate by cutting other variable costs.",
                    "The 3× income rule for annual rent is another check: annual rent should be ≤ 3× annual gross income."
                ]
            },
            {
                title: "Hidden costs renters forget",
                body: [
                    "Security deposits (usually 1–3 months' rent), brokerage, utilities, internet and moving costs.",
                    "Renter's insurance is cheap insurance against theft and liability — typically under ₹5,000/year.",
                    "Use this calculator's budget view to keep total housing within your comfort zone."
                ]
            }
        ],
        steps: [
            "Enter your monthly net (or gross) income.",
            "Add fixed monthly expenses (EMIs, bills, savings goals).",
            "Read the recommended rent range for comfort (30% rule) and max (50%).",
            "Use the budget line to negotiate with roommates or landlords."
        ],
        tips: [
            "Target 25–30% of income for rent; the 20% buffer covers utilities and rent increases.",
            "Negotiate renewals: 5% less than asking is often accepted to avoid vacancy.",
            "Roommate splitting by room size (40/60 instead of 50/50) is fairer in 2-BHKs with a master bedroom."
        ],
        faqs: [
            {
                q: "How much rent can I afford?",
                a: "Most advisors cap rent at 30% of gross income. On ₹60,000/month income, that's ₹18,000. Factor utilities separately — they can add ₹2,000–5,000."
            },
            {
                q: "What is the rule of thumb for rent?",
                a: "Spend no more than 30% of gross income on housing, including rent and utilities. Some metro renters push to 40% by trimming food and travel budgets."
            }
        ],
        related: [
            { href: "rent-vs-buy.html", label: "Rent vs Buy", icon: "⚖️" },
            { href: "house-affordability.html", label: "Affordability", icon: "🏠" },
            { href: "debt-to-income.html", label: "DTI", icon: "📊" },
            { href: "real-estate-calculator.html", label: "Real Estate", icon: "🏢" }
        ]
    },

    /* ----------------------------------------------------------------
       RENT VS BUY CALCULATOR
       ---------------------------------------------------------------- */
    "rent-vs-buy.html": {
        facts: [
            { k: "Compare", v: "Own vs rent over N years" },
            { k: "Key", v: "Stay period decides" },
            { k: "5-year rule", v: "Own usually wins after 5–7 yrs" },
            { k: "Hidden", v: "Maintenance & taxes" }
        ],
        introTitle: "Rent vs Buy Calculator — the honest financial comparison",
        intro: "Should you rent or buy? The answer depends on home appreciation, rent growth, your investment returns and — critically — how long you'll stay. This calculator compares renting and owning side by side over any period, revealing which builds more wealth.",
        sections: [
            {
                title: "Ownership costs most people forget",
                body: [
                    "Beyond the EMI: property tax, insurance, maintenance (1–2% of home value yearly), renovation and vacancy risk.",
                    "The opportunity cost: your down payment could earn returns invested elsewhere.",
                    "Home appreciation must outrun all these costs to beat renting — historically 6–9% in Indian metros over decades."
                ]
            },
            {
                title: "Why the stay period decides everything",
                body: [
                    "Buying costs 3–6% upfront (stamp duty, registration, brokerage) — these must be spread across the years you stay.",
                    "Stay 2 years? Renting almost always wins — buying costs are amortized over too few years.",
                    "Stay 10+ years? Buying usually wins, especially with rent inflation at 6–8% per year."
                ]
            },
            {
                title: "The rent-versus-mortgage comparison",
                body: [
                    "Compare: wealth after N years owning (home equity + appreciation − costs) vs wealth renting (invested savings + down-payment growth).",
                    "If your extra monthly cost of owning stays below your invested down payment's growth, buying wins.",
                    "Non-financial factors — stability, freedom, flexibility — matter too. Put a value on them."
                ]
            }
        ],
        steps: [
            "Enter the home price you'd buy.",
            "Enter the down payment and expected home appreciation.",
            "Enter the monthly rent and expected rent increase.",
            "Enter the number of years you plan to stay.",
            "Read the net cost and wealth comparison for both paths."
        ],
        tips: [
            "If you might move within 5 years, rent unless confident in appreciation.",
            "Include the tax benefit of a home loan (80C + 24b) in the ownership column.",
            "Run the comparison with 0% appreciation too — it reveals your downside."
        ],
        faqs: [
            {
                q: "Is renting or buying better?",
                a: "For stays of 7+ years with normal appreciation, buying usually wins because rent inflation and equity growth compound. For short stays or uncertain plans, renting is lower-risk."
            },
            {
                q: "What costs should I include when comparing?",
                a: "For owning: EMI, tax, insurance, maintenance, stamp duty, and the opportunity cost of the down payment. For renting: rent, rent increases, deposit interest, and investing the difference."
            }
        ],
        related: [
            { href: "rent-calculator.html", label: "Rent", icon: "🏠" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "house-affordability.html", label: "Affordability", icon: "🏠" },
            { href: "real-estate-calculator.html", label: "Real Estate", icon: "🏢" }
        ]
    },

    /* ----------------------------------------------------------------
       REAL ESTATE CALCULATOR
       ---------------------------------------------------------------- */
    "real-estate-calculator.html": {
        facts: [
            { k: "Rental yield", v: "Annual rent ÷ property value" },
            { k: "Good yield", v: "4–6% in Indian metros" },
            { k: "Appreciation", v: "6–9% historical" },
            { k: "Total return", v: "Yield + appreciation" }
        ],
        introTitle: "Real Estate Calculator — rental yield and total return",
        intro: "Is that property a good investment? This real estate calculator computes the gross rental yield, net yield after expenses, total return with appreciation, and cash flow — the numbers serious property investors run before signing.",
        sections: [
            {
                title: "Rental yield explained",
                body: [
                    "Gross yield = annual rent ÷ property price × 100. A ₹30,000/month rent on a ₹90 lakh property is a 4% gross yield.",
                    "Net yield subtracts maintenance (0.5–1% of value/year), property tax, insurance and vacancy (1 month/year typical).",
                    "In Indian metros, rental yields of 3–5% are common; the profit often comes from appreciation over 10+ years."
                ]
            },
            {
                title: "The full return picture",
                body: [
                    "Total return = rental yield + capital appreciation. A 4% yield + 7% appreciation = ~11% annualized — competitive with equity.",
                    "Leverage amplifies: with a 20% down payment, apartment appreciation applies to the full property value, boosting equity returns.",
                    "But leverage cuts both ways — vacancies, interest-rate hikes and no appreciation can turn the same property negative."
                ]
            }
        ],
        steps: [
            "Enter the property purchase price.",
            "Enter the monthly rent you expect.",
            "Optionally add annual expenses (maintenance, tax, insurance).",
            "Enter the expected annual appreciation.",
            "Read gross yield, net yield, cash flow and total annual return."
        ],
        tips: [
            "Buy for rental cash flow, not hope-value — appreciation is never guaranteed.",
            "Tier-2/3 cities often yield 5–8% vs metro 3–4% — compare carefully.",
            "Add a 1-month vacancy and 3% annual rent escalation to be realistic."
        ],
        faqs: [
            {
                q: "What is a good rental yield in India?",
                a: "4–6% is good in metros; 6–8% in tier-2/3 cities and commercial properties. Below 3% usually means you're paying for appreciation only."
            },
            {
                q: "How do I calculate property return?",
                a: "Total return = (gross rent − expenses + appreciation) ÷ property value. For leveraged deals, compute the return on your down payment instead."
            }
        ],
        related: [
            { href: "rental-property.html", label: "Rental Property", icon: "🏢" },
            { href: "rent-vs-buy.html", label: "Rent vs Buy", icon: "⚖️" },
            { href: "roi-calculator.html", label: "ROI", icon: "📈" },
            { href: "home-loan.html", label: "Home Loan", icon: "🏠" }
        ]
    },

    /* ----------------------------------------------------------------
       RENTAL PROPERTY CALCULATOR
       ---------------------------------------------------------------- */
    "rental-property.html": {
        facts: [
            { k: "Cash flow", v: "Rent − all costs" },
            { k: "Cap rate", v: "NOI ÷ price" },
            { k: "1% rule", v: "Monthly rent ≥ 1% price" },
            { k: "CoC", v: "Cash-on-cash return" }
        ],
        introTitle: "Rental Property Calculator — analyze any income property",
        intro: "Professional landlords analyze rentals with cash flow, cap rate and cash-on-cash return. This calculator runs those numbers for you — rent minus mortgage, tax, insurance, maintenance and vacancy — so you know whether the property makes money before you commit.",
        sections: [
            {
                title: "The key rental metrics",
                body: [
                    "Net operating income (NOI) = gross rent − vacancy − operating expenses (before mortgage).",
                    "Cap rate = NOI ÷ property price × 100 — the unleveraged return. 4–6% is typical for residential in metros.",
                    "Cash-on-cash = annual cash flow ÷ down payment × 100 — measures the return on YOUR money after financing."
                ]
            },
            {
                title: "The 1% and 50% rules",
                body: [
                    "1% rule: monthly rent should be at least 1% of purchase price (e.g. ₹90,000 rent on a ₹90 lakh property). Many Indian metros fall short — the rule is a filter, not a law.",
                    "50% rule: roughly 50% of gross rent goes to vacancy, maintenance, taxes and insurance (before mortgage).",
                    "If cash flow is negative month one, it rarely self-corrects without appreciation — run the numbers cold."
                ]
            }
        ],
        steps: [
            "Enter the purchase price and down payment.",
            "Enter your mortgage rate and term.",
            "Enter expected monthly rent.",
            "Add expenses: property tax, insurance, maintenance, vacancy.",
            "Read your monthly cash flow, cap rate and cash-on-cash return."
        ],
        tips: [
            "Budget 1–2% of property value annually for maintenance.",
            "Check the local tenant market — vacancy months hurt cash flow badly.",
            "Keep a 6-month buffer of mortgage payments for vacant periods."
        ],
        faqs: [
            {
                q: "What is a good cap rate?",
                a: "Residential: 3–5%; commercial and tier-2/3: 6–9%. Higher cap rates usually mean higher risk or lower growth areas."
            },
            {
                q: "Is my rental property a good investment?",
                a: "Aim for positive monthly cash flow after all costs, a cap rate above your local norm, and total return (cash flow + appreciation) exceeding 8–10% annualized."
            }
        ],
        related: [
            { href: "real-estate-calculator.html", label: "Real Estate", icon: "🏢" },
            { href: "roi-calculator.html", label: "ROI", icon: "📈" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "depreciation-calculator.html", label: "Depreciation", icon: "📉" }
        ]
    },

    /* ----------------------------------------------------------------
       APR CALCULATOR
       ---------------------------------------------------------------- */
    "apr-calculator.html": {
        facts: [
            { k: "APR", v: "Annual Percentage Rate" },
            { k: "True cost", v: "Rate + fees + points" },
            { k: "Compare", v: "Banks by APR not rate" },
            { k: "Us", v: "Zero APR = free money (rare)" }
        ],
        introTitle: "APR Calculator — the true cost of borrowing",
        intro: "The advertised interest rate hides the real cost. APR (Annual Percentage Rate) includes fees, points and closing costs, giving the honest yearly cost of the loan. This calculator converts your loan amount, monthly payment and fees into the true APR — the number regulators require lenders to show.",
        sections: [
            {
                title: "APR vs interest rate",
                body: [
                    "The interest rate is the cost of the principal; APR adds origination fees, points, mortgage insurance and some closing costs divided over the loan term.",
                    "For a ₹10,00,000 loan at 10% with 2% fees, the APR is about 10.3–10.5% — the real cost.",
                    "Always compare APR across lenders. On a 30-year loan, 0.2% APR difference equals lakhs of rupees."
                ]
            },
            {
                title: "APR traps to watch",
                body: [
                    "A 0% 'promotional APR' reverts to 20%+ after the promo — calculate the blended cost of holding a balance.",
                    "Some lenders exclude certain fees from APR advertisements — ask for the 'all-in' APR.",
                    "Payday and BNPL products quote 'fees' instead of rates; APR pulls them together for comparison."
                ]
            }
        ],
        steps: [
            "Enter the loan amount you're borrowing.",
            "Enter the annual interest rate quoted.",
            "Add the fees in monetary units, and the monthly payment if known.",
            "Read the true APR with and without fees.",
            "When comparing two loans, compare their APRs, not rates."
        ],
        tips: [
            "For mortgages, compare APR with the same assumptions — term and fees basis matter.",
            "Short loans: fees hit APR harder (spread over fewer months).",
            "Never sign a loan without asking 'what's the all-in APR?'"
        ],
        faqs: [
            {
                q: "What is the difference between APR and APY?",
                a: "APR is the annual cost of borrowing (rate + fees). APY (Annual Percentage Yield) includes compound interest and is used for savings products. APR understates credit card costs because of compounding daily."
            },
            {
                q: "How is APR calculated?",
                a: "APR is the rate that makes the present value of all loan payments plus fees equal the loan amount. It's solved iteratively — exactly what this calculator does numerically."
            }
        ],
        related: [
            { href: "emi-calculator.html", label: "EMI", icon: "💹" },
            { href: "personal-loan.html", label: "Personal Loan", icon: "👤" },
            { href: "interest-rate-calculator.html", label: "Interest Rate", icon: "📐" },
            { href: "finance-calculator.html", label: "Finance (TVM)", icon: "🧮" }
        ]
    },

    /* ----------------------------------------------------------------
       FHA LOAN CALCULATOR
       ---------------------------------------------------------------- */
    "fha-loan.html": {
        facts: [
            { k: "FHA", v: "Federal Housing Administration" },
            { k: "Down", v: "Only 3.5% minimum" },
            { k: "Credit", v: "580+ for 3.5% down" },
            { k: "MIP", v: "Mortgage insurance required" }
        ],
        introTitle: "FHA Loan Calculator — low down-payment home buying",
        intro: "FHA loans let buyers in with just 3.5% down and credit scores as low as 580. But they carry upfront and annual mortgage insurance premiums (MIP). This calculator shows your true FHA monthly payment with MIP included, plus the full amortization schedule.",
        sections: [
            {
                title: "FHA loan basics",
                body: [
                    "FHA loans are insured by the Federal Housing Administration, letting lenders offer 3.5% down with lower credit requirements — ideal for first-time buyers.",
                    "Upfront MIP (UFMIP) = 1.75% of the loan, financed into the balance. Annual MIP = 0.15–0.75% of the balance, paid monthly.",
                    "MIP stays for the life of the loan on most new FHA loans with <10% down — a significant cost vs conventional PMI that drops off."
                ]
            },
            {
                title: "FHA vs conventional",
                body: [
                    "FHA: 3.5% down, credit-friendly, but permanent MIP and stricter loan limits.",
                    "Conventional: 3–5% down options with private mortgage insurance that falls off at 20% equity; better for strong credit.",
                    "Compare total costs — a conventional loan with a slightly higher down payment often becomes cheaper in year 5–8."
                ]
            }
        ],
        steps: [
            "Enter the home purchase price.",
            "Enter your down payment amount (3.5% minimum).",
            "Input the FHA interest rate.",
            "Add the annual MIP rate (0.55% is typical).",
            "Read the true monthly payment including MIP and the schedule below."
        ],
        tips: [
            "Your credit score decides the MIP: 580–639 pays ~0.75%; 640+ pays ~0.55%.",
            "A 10% down payment removes the 11-year MIP cancellation restriction on some loans.",
            "FHA 203(k) loans can finance renovation into the same mortgage."
        ],
        faqs: [
            {
                q: "How much is FHA mortgage insurance?",
                a: "Upfront MIP is 1.75% of the loan, and annual MIP runs 0.15–0.75% depending on loan size, down payment and term — divided and added to each monthly payment."
            },
            {
                q: "Can PMI be removed from an FHA loan?",
                a: "For loans with ≥10% down, MIP cancels after 11 years. Below 10% down, MIP remains for the life of the loan unless you refinance into a conventional loan."
            }
        ],
        related: [
            { href: "va-loan.html", label: "VA Loan", icon: "🎖️" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "house-affordability.html", label: "Affordability", icon: "🏠" },
            { href: "down-payment-calculator.html", label: "Down Payment", icon: "💵" }
        ]
    },

    /* ----------------------------------------------------------------
       VA LOAN CALCULATOR
       ---------------------------------------------------------------- */
    "va-loan.html": {
        facts: [
            { k: "VA", v: "Veterans Administration" },
            { k: "0% down", v: "No down payment needed" },
            { k: "No PMI", v: "No mortgage insurance" },
            { k: "Funding fee", v: "1.25–3.3% (waivable)" }
        ],
        introTitle: "VA Loan Calculator — benefits for veterans and military families",
        intro: "VA loans reward service with 0% down, no PMI and competitive rates. The main cost is a one-time funding fee (0.5–3.3%, waived for service-connected disabilities). This calculator shows your VA payment including the funding fee and savings vs conventional financing.",
        sections: [
            {
                title: "VA loan advantages",
                body: [
                    "0% down and no PMI — the only major loan with both. Compare: a ₹40 lakh conventional loan with 5% down carries ~₹19,000/year in PMI at the typical rate.",
                    "Rates are typically 0.25–0.5% below conventional and there's no minimum credit score (lenders set their own, often 620).",
                    "The funding fee is 2.15% for first use with 0% down (regular military) — it can be financed into the loan or waived entirely for disabled veterans."
                ]
            },
            {
                title: "Using your VA loan more than once",
                body: [
                    "The VA loan benefit is reusable — after payoff or sale, your full entitlement returns.",
                    "With remaining entitlement, you can buy again without selling (subject to county loan limits).",
                    "IRRRL (Interest Rate Reduction Refinance Loan) lets you refinance at a lower rate with minimal paperwork and no appraisal."
                ]
            }
        ],
        steps: [
            "Enter the home price.",
            "Enter your down payment (0% for VA).",
            "Input the VA loan interest rate.",
            "Add the funding fee percentage (0–3.3% based on your status).",
            "Read your payment, funding fee amount and total costs."
        ],
        tips: [
            "Request a Certificate of Eligibility (COE) — required before any lender quote.",
            "Disabled veterans: the funding fee is fully waived.",
            "Compare 'no-points' VA options when refinancing through IRRRL."
        ],
        faqs: [
            {
                q: "Do VA loans require PMI?",
                a: "No. VA loans never require PMI, even at 0% down — a major saving versus conventional and FHA loans."
            },
            {
                q: "What is the VA funding fee?",
                a: "A one-time fee (0.5–3.3%) that helps fund the program. It depends on type of service, down payment and whether it's your first use. Many borrowers finance it into the loan."
            }
        ],
        related: [
            { href: "fha-loan.html", label: "FHA Loan", icon: "🏠" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "house-affordability.html", label: "Affordability", icon: "🏠" },
            { href: "refinance-calculator.html", label: "Refinance", icon: "🔄" }
        ]
    },

    /* ----------------------------------------------------------------
       HOME EQUITY LOAN CALCULATOR
       ---------------------------------------------------------------- */
    "home-equity-loan.html": {
        facts: [
            { k: "HEL", v: "Lump-sum second mortgage" },
            { k: "Rate", v: "Fixed, 5–9%" },
            { k: "LTV", v: "Combined max ~80–85%" },
            { k: "Tax", v: "Interest may be deductible" }
        ],
        introTitle: "Home Equity Loan Calculator — fixed borrowing against your home",
        intro: "A home equity loan lets you borrow a lump sum against your ownership stake, repaid in fixed installments at a fixed rate. This calculator shows the monthly payment, total interest and amortization for your home-equity borrowing.",
        sections: [
            {
                title: "Home equity loan basics",
                body: [
                    "Equity = home value − outstanding mortgage. Lenders cap combined loan-to-value (mortgage + HEL) at 80–85%.",
                    "In India, equivalent 'top-up home loans' let you borrow on repaid principal at 8.5–10.5% — tax-deductible if used for construction/renovation.",
                    "Funds are typically used for debt consolidation, renovation or educational expenses — but never fund consumption on your home."
                ]
            },
            {
                title: "HEL vs HELOC",
                body: [
                    "Home equity loan: one lump sum, fixed rate, fixed payment — predictable, like a mortgage.",
                    "HELOC: revolving credit line, variable rate, interest-only option — flexible, for ongoing costs.",
                    "Fixed-rate HELs suit known expenses; HELOCs suit staggered spending but carry rate risk."
                ]
            }
        ],
        steps: [
            "Enter the loan amount you want to borrow.",
            "Input the fixed interest rate.",
            "Choose the repayment term (5–15 years common).",
            "Read your monthly payment, total interest and payoff schedule."
        ],
        tips: [
            "Borrow only for value-creating purposes — the home is your security.",
            "Compare with a personal loan: HELs are 5–9% vs personal loans 11–24%.",
            "If rates fall, a refinance can reduce your fixed HEL rate later."
        ],
        faqs: [
            {
                q: "What is the difference between home equity loan and HELOC?",
                a: "A home equity loan provides a fixed lump sum at a fixed rate with fixed payments. A HELOC is a variable-rate revolving line of credit you can draw from as needed."
            },
            {
                q: "How much can I borrow?",
                a: "Typically 80–85% of the home value minus the outstanding mortgage. On a ₹1 crore home with a ₹40 lakh mortgage, you may access ₹40–45 lakh."
            }
        ],
        related: [
            { href: "heloc-calculator.html", label: "HELOC", icon: "💳" },
            { href: "home-loan.html", label: "Home Loan", icon: "🏠" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "refinance-calculator.html", label: "Refinance", icon: "🔄" }
        ]
    },

    /* ----------------------------------------------------------------
       HELOC CALCULATOR
       ---------------------------------------------------------------- */
    "heloc-calculator.html": {
        facts: [
            { k: "HELOC", v: "Revolving home-equity credit" },
            { k: "Draw period", v: "Usually 5–10 years" },
            { k: "Repayment", v: "10–20 years after" },
            { k: "Variable rate", v: "Prime + margin" }
        ],
        introTitle: "HELOC Calculator — draw, repayment and costs",
        intro: "A HELOC (Home Equity Line of Credit) lets you draw against your home equity as needed during a draw period, then repay over a longer term. This calculator models both the interest-only draw phase and the amortizing repayment phase.",
        sections: [
            {
                title: "How a HELOC works",
                body: [
                    "Draw period (typically 10 years): borrow as needed, often paying interest only on the drawn amount.",
                    "Repayment period (typically 10–20 years): pay principal + interest to clear the balance.",
                    "Rate is usually variable: 8% to 12% depending on the prime rate and your credit (in India, personal loan against property lines behave similarly)."
                ]
            },
            {
                title: "The danger of interest-only payments",
                body: [
                    "Interest-only draws feel cheap but the principal is deferred to the repayment phase — your payment can triple when it begins.",
                    "A ₹20,00,000 draw at 9% costs ~₹15,000/month interest-only, then ~₹25,000/month once principal amortizes over 10 years.",
                    "Plan the repayment-phase payment before drawing — this calculator makes it visible."
                ]
            }
        ],
        steps: [
            "Enter the HELOC amount you plan to draw.",
            "Enter the annual rate (draw period).",
            "Set the draw period years and repayment years.",
            "Read the interest-only payment, repayment payment and total cost."
        ],
        tips: [
            "Keep HELOC use to value-building projects; a variable rate can bite.",
            "Convert to a fixed-rate home equity loan if rates start climbing.",
            "Never draw for vacations or shopping — repurpose your budget instead."
        ],
        faqs: [
            {
                q: "What is the difference between a HELOC and home equity loan?",
                a: "A HELOC is a variable-rate credit line you can draw repeatedly during a draw period, then repay. A home equity loan is a fixed-rate, fixed-amount lump sum repaid immediately."
            },
            {
                q: "How is HELOC interest calculated?",
                a: "Interest is charged daily on your outstanding balance at the variable rate (prime + margin) — not on the full credit limit unless fully drawn."
            }
        ],
        related: [
            { href: "home-equity-loan.html", label: "Home Equity Loan", icon: "🏠" },
            { href: "mortgage-calculator.html", label: "Mortgage", icon: "🏡" },
            { href: "refinance-calculator.html", label: "Refinance", icon: "🔄" }
        ]
    }
};