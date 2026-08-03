const loanAmount = document.getElementById('loanAmount');
const loanAmountRange = document.getElementById('loanAmountRange');
const interestRate = document.getElementById('interestRate');
const interestRateRange = document.getElementById('interestRateRange');
const loanTenure = document.getElementById('loanTenure');
const loanTenureRange = document.getElementById('loanTenureRange');

const emiOutput = document.getElementById('emi');
const totalPaymentOutput = document.getElementById('totalPayment');
const totalInterestOutput = document.getElementById('totalInterest');
const principalBar = document.getElementById('principalBar');
const interestBar = document.getElementById('interestBar');
const legendPrincipal = document.getElementById('legendPrincipal');
const legendInterest = document.getElementById('legendInterest');

function formatINR(value) {
  return 'Rs ' + Math.round(value).toLocaleString('en-IN');
}

function calculateEMI(principal, annualRate, years) {
  const monthlyRate = annualRate / 12 / 100;
  const months = years * 12;

  if (monthlyRate === 0) {
    return principal / months;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

function update() {
  const principal = parseFloat(loanAmount.value) || 0;
  const rate = parseFloat(interestRate.value) || 0;
  const years = parseFloat(loanTenure.value) || 0;

  loanAmountRange.value = principal;
  interestRateRange.value = rate;
  loanTenureRange.value = years;

  if (principal <= 0 || rate < 0 || years <= 0) {
    emiOutput.textContent = 'Rs 0';
    totalPaymentOutput.textContent = 'Total Payment: Rs 0';
    totalInterestOutput.textContent = 'Total Interest: Rs 0';
    principalBar.style.width = '100%';
    interestBar.style.width = '0%';
    legendPrincipal.textContent = 'Rs 0';
    legendInterest.textContent = 'Rs 0';
    return;
  }

  const emi = calculateEMI(principal, rate, years);
  const totalPayment = emi * years * 12;
  const totalInterest = totalPayment - principal;

  const principalPct = (principal / totalPayment) * 100;
  const interestPct = 100 - principalPct;

  emiOutput.textContent = formatINR(emi);
  totalPaymentOutput.textContent = 'Total Payment: ' + formatINR(totalPayment);
  totalInterestOutput.textContent = 'Total Interest: ' + formatINR(totalInterest);
  principalBar.style.width = principalPct + '%';
  interestBar.style.width = interestPct + '%';
  legendPrincipal.textContent = formatINR(principal);
  legendInterest.textContent = formatINR(totalInterest);
}

loanAmount.addEventListener('input', update);
loanAmountRange.addEventListener('input', update);
interestRate.addEventListener('input', update);
interestRateRange.addEventListener('input', update);
loanTenure.addEventListener('input', update);
loanTenureRange.addEventListener('input', update);

update();
