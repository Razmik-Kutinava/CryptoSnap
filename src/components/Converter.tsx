import { Component, createSignal, For } from 'solid-js';
import { A } from '@solidjs/router';
import { mockCryptoData, type CryptoCurrency } from '../data/mockData';

const Converter: Component = () => {
  const [fromCurrency, setFromCurrency] = createSignal('bitcoin');
  const [toCurrency, setToCurrency] = createSignal('ethereum');
  const [amount, setAmount] = createSignal(1);
  const [result, setResult] = createSignal<number | null>(null);

  const convert = () => {
    const fromCrypto = mockCryptoData.find(c => c.id === fromCurrency());
    const toCrypto = mockCryptoData.find(c => c.id === toCurrency());
    
    if (fromCrypto && toCrypto) {
      const fromPrice = fromCrypto.price;
      const toPrice = toCrypto.price;
      const convertedAmount = (amount() * fromPrice) / toPrice;
      setResult(convertedAmount);
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency();
    setFromCurrency(toCurrency());
    setToCurrency(temp);
    convert();
  };

  return (
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">🔄 Конвертор</h1>
        <A href="/" class="btn btn-secondary">Назад</A>
      </div>

      <div class="converter-form">
        <div class="form-group">
          <label class="form-label">Количество:</label>
          <input
            type="number"
            class="form-input"
            value={amount()}
            onInput={(e) => setAmount(parseFloat(e.currentTarget.value) || 0)}
            placeholder="Введите количество"
            min="0"
            step="0.01"
          />
        </div>

        <div class="form-group">
          <label class="form-label">Из:</label>
          <select
            class="form-select"
            value={fromCurrency()}
            onChange={(e) => setFromCurrency(e.currentTarget.value)}
          >
            <For each={mockCryptoData}>
              {(crypto) => (
                <option value={crypto.id}>
                  {crypto.name} ({crypto.symbol})
                </option>
              )}
            </For>
          </select>
        </div>

        <div style="text-align: center; margin: 16px 0;">
          <button class="btn btn-secondary" onClick={swapCurrencies}>
            ⇅ Поменять местами
          </button>
        </div>

        <div class="form-group">
          <label class="form-label">В:</label>
          <select
            class="form-select"
            value={toCurrency()}
            onChange={(e) => setToCurrency(e.currentTarget.value)}
          >
            <For each={mockCryptoData}>
              {(crypto) => (
                <option value={crypto.id}>
                  {crypto.name} ({crypto.symbol})
                </option>
              )}
            </For>
          </select>
        </div>

        <button class="btn" onClick={convert} style="width: 100%; margin-top: 16px;">
          💱 Конвертировать
        </button>
      </div>

      {result() !== null && (
        <div class="result-card">
          <h3 style="margin-top: 0;">Результат конвертации:</h3>
          <p class="result-value">
            {result()?.toFixed(6)} {mockCryptoData.find(c => c.id === toCurrency())?.symbol}
          </p>
          <p style="margin-bottom: 0; opacity: 0.8;">
            {amount()} {mockCryptoData.find(c => c.id === fromCurrency())?.symbol} = {result()?.toFixed(6)} {mockCryptoData.find(c => c.id === toCurrency())?.symbol}
          </p>
        </div>
      )}

      <div class="navigation">
        <A href="/" class="nav-item">
          🏠 Главная
        </A>
        <A href="/crypto" class="nav-item">
          📈 Крипто
        </A>
        <A href="/converter" class="nav-item active">
          🔄 Конвертор
        </A>
      </div>
    </div>
  );
};

export default Converter;