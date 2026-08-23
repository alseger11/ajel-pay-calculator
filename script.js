const form = document.querySelector('#calculator-form');
const cashPriceInput = document.querySelector('#cash-price');
const markupInput = document.querySelector('#markup-rate');
const installmentsInput = document.querySelector('#installments');
const results = document.querySelector('#results');
const errorMessage = document.querySelector('#form-error');

const formatSar = (value) => new Intl.NumberFormat('ar-SA', {
  style: 'currency',
  currency: 'SAR',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
}).format(value);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const cashPrice = Number(cashPriceInput.value);
  const markupRate = Number(markupInput.value);
  const installments = Number(installmentsInput.value);

  if (!Number.isFinite(cashPrice) || cashPrice <= 0) {
    errorMessage.textContent = 'يرجى إدخال سعر منتج أكبر من صفر.';
    cashPriceInput.focus();
    return;
  }

  if (!Number.isFinite(markupRate) || markupRate < 0 || markupRate >= 100) {
    errorMessage.textContent = 'يرجى إدخال نسبة عمولة صحيحة من 0 إلى أقل من 100.';
    markupInput.focus();
    return;
  }

  errorMessage.textContent = '';
  const commissionRate = markupRate / 100;
  const ajelTotal = cashPrice / (1 - commissionRate);
  const difference = ajelTotal - cashPrice;
  const installmentValue = ajelTotal / installments;

  document.querySelector('#cash-result').textContent = formatSar(cashPrice);
  document.querySelector('#ajel-result').textContent = formatSar(ajelTotal);
  document.querySelector('#difference-result').textContent = formatSar(difference);
  document.querySelector('#installment-result').textContent = formatSar(installmentValue);
  document.querySelector('#installment-count').textContent = installments.toLocaleString('ar-SA');
  document.querySelector('#formula-note').textContent = `تم احتساب عمولة آجل باي بنسبة ${markupRate.toLocaleString('ar-SA')}% من إجمالي قيمة آجل باي.`;

  results.hidden = false;
  results.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('#year').textContent = new Date().getFullYear().toLocaleString('ar-SA', { useGrouping: false });
