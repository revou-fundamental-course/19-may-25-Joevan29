const form = document.getElementById('temperatureForm');
const input = document.getElementById('inputTemp');
const type = document.getElementById('conversionType');
const resultDiv = document.getElementById('result');
const explanationDiv = document.getElementById('explanation');
const historyList = document.getElementById('historyList');
const reverseBtn = document.getElementById('reverseBtn');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const value = parseFloat(input.value);

  if (isNaN(value)) {
    showError('⚠️ Masukkan angka yang valid.');
    return;
  }

  let result, explanationText, displayText;
  const isToF = type.value === 'toFahrenheit';

  if (isToF) {
    result = (value * 9 / 5) + 32;
    explanationText = `${value} × 9/5 + 32 = ${result.toFixed(2)}°F`;
    displayText = `${value}°C = ${result.toFixed(2)}°F 🔥`;
  } else {
    result = (value - 32) * 5 / 9;
    explanationText = `(${value} - 32) × 5/9 = ${result.toFixed(2)}°C`;
    displayText = `${value}°F = ${result.toFixed(2)}°C ❄️`;
  }

  showResult(displayText, explanationText);
  addHistory(displayText);
});

form.addEventListener('reset', () => {
  resultDiv.classList.add('hidden');
  explanationDiv.classList.add('hidden');
});

reverseBtn.addEventListener('click', () => {
  const current = type.value;
  type.value = current === 'toFahrenheit' ? 'toCelsius' : 'toFahrenheit';
});

function showResult(resultText, explanationText) {
  resultDiv.textContent = resultText;
  explanationDiv.textContent = '🔍 Cara Kalkulasi: ' + explanationText;
  resultDiv.classList.remove('error');
  resultDiv.classList.remove('hidden');
  explanationDiv.classList.remove('hidden');
}

function showError(msg) {
  resultDiv.textContent = msg;
  resultDiv.classList.add('error');
  resultDiv.classList.remove('hidden');
  explanationDiv.classList.add('hidden');
}

function addHistory(text) {
  const li = document.createElement('li');
  li.textContent = text;
  historyList.prepend(li);
}
