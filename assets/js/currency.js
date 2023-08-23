// Fetch available currency symbols and names
const symbolsURL = 'https://api.exchangerate.host/symbols';
fetch(symbolsURL)
  .then(response => response.json())
  .then(data => {
    const currencies = data.symbols;

    // This is showing the different currency options
    for (const currencyCode in currencies) {
      const option1 = new Option(`${currencyCode}`, currencyCode);
      const option2 = new Option(`${currencyCode}`, currencyCode);
      fromCurrencySelect.appendChild(option1);
      toCurrencySelect.appendChild(option2);
    }

    // Setting the default values on selected currency
    fromCurrencySelect.value = 'GBP';
    toCurrencySelect.value = 'USD';
  });


// When form is submitted it will show the new currency
const currencyConverterForm = document.getElementById('currencyConverterForm');
currencyConverterForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const amount = parseFloat(amountInput.value);
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;

  const queryURL = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}`;

  fetch(queryURL)
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.result;
      const convertedAmount = (amount * exchangeRate).toFixed(2);

      resultDiv.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    });
});
