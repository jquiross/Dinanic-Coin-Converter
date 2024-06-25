document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'ac1a1777a3facfc817846c43';
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`;

    const fromCurrency = document.getElementById('from-currency');
    const toCurrency = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const convertBtn = document.getElementById('convert-btn');
    const resultDiv = document.getElementById('result');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const currencies = Object.keys(data.conversion_rates);
            populateCurrencyOptions(currencies);
        })
        .catch(error => console.error('Error al obtener las monedas:', error));

    function populateCurrencyOptions(currencies) {
        currencies.forEach(currency => {
            const optionFrom = document.createElement('option');
            optionFrom.value = currency;
            optionFrom.textContent = currency;
            fromCurrency.appendChild(optionFrom);

            const optionTo = document.createElement('option');
            optionTo.value = currency;
            optionTo.textContent = currency;
            toCurrency.appendChild(optionTo);
        });
    }

    convertBtn.addEventListener('click', () => {
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const amount = amountInput.value;

        if (from && to && amount) {
            convertCurrency(from, to, amount);
        } else {
            showResult('Por favor, complete todos los campos.', 'danger');
        }
    });

    function convertCurrency(from, to, amount) {
        fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}/${amount}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.conversion_rate;
                const convertedAmount = (rate * amount).toFixed(2);
                showResult(`${amount} ${from} = ${convertedAmount} ${to}`, 'info');
            })
            .catch(error => {
                console.error('Error al convertir la moneda:', error);
                showResult('Hubo un error al realizar la conversión.', 'danger');
            });
    }

    function showResult(message, type) {
        resultDiv.className = `mt-4 text-center alert alert-${type}`;
        resultDiv.textContent = message;
        resultDiv.classList.remove('d-none');
    }
});
