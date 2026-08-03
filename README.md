# EMI Calculator

A simple, responsive web app to calculate monthly loan EMI (Equated Monthly Installment) with a payment breakdown.

## Features

- Loan amount, interest rate, and tenure inputs with sliders
- Instant EMI, total payment, and total interest calculation
- Visual principal vs. interest breakdown bar
- Indian Rupee (INR) formatting

## Formula

```
EMI = P × r × (1 + r)^n / ((1 + r)^n − 1)
```

Where:

- `P` = principal loan amount
- `r` = monthly interest rate (annual rate / 12 / 100)
- `n` = number of monthly payments (years × 12)

## Usage

Open `index.html` in any browser, or serve locally:

```bash
python -m http.server 8080
```

Then visit http://localhost:8080

## Files

- `index.html` — page structure
- `style.css` — styling
- `script.js` — EMI calculation logic
