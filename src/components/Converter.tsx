import { Component, createSignal, For, createResource } from 'solid-js';
import { A } from '@solidjs/router';
import { CryptoApiService, type CryptoCurrency } from '../services/cryptoApi';

const Converter: Component = () => {
  // Загружаем список криптовалют для конвертора
  const [cryptos] = createResource(() => CryptoApiService.getTopCryptos(20));
  
  const [fromCurrency, setFromCurrency] = createSignal('btc-bitcoin');
  const [toCurrency, setToCurrency] = createSignal('eth-ethereum');
  const [amount, setAmount] = createSignal(1);
  const [result, setResult] = createSignal<number | null>(null);

  const convert = () => {
    const cryptoList = cryptos();
    if (!cryptoList) return;

    const fromCrypto = cryptoList.find(c => c.id === fromCurrency());
    const toCrypto = cryptoList.find(c => c.id === toCurrency());
    
    if (fromCrypto && toCrypto) {
      const convertedAmount = CryptoApiService.convertCrypto(
        amount(), 
        fromCrypto.price, 
        toCrypto.price
      );
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

      {cryptos.loading && (
        <div style="text-align: center; padding: 20px;">
          <p>🔄 Загружаем валюты из CoinPaprika...</p>
        </div>
      )}

      {cryptos.error && (
        <div style="text-align: center; padding: 20px; color: #e53935;">
          <p>❌ Ошибка загрузки валют: {cryptos.error.message}</p>
        </div>
      )}

      {cryptos() && (
        <>
          <div style="text-align: center; padding: 8px; background: rgba(0,0,0,0.05); border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0; font-size: 12px; color: var(--tg-hint-color, #707579);">
              ✅ Загружено {cryptos()!.length} валют для конвертации
            </p>
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
                <For each={cryptos()}>
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
                <For each={cryptos()}>
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
        </>
      )}

      {result() !== null && cryptos() && (
        <div class="result-card">
          <h3 style="margin-top: 0;">Результат конвертации:</h3>
          <p class="result-value">
            {result()?.toFixed(6)} {cryptos()?.find(c => c.id === toCurrency())?.symbol}
          </p>
          <p style="margin-bottom: 0; opacity: 0.8;">
            {amount()} {cryptos()?.find(c => c.id === fromCurrency())?.symbol} = {result()?.toFixed(6)} {cryptos()?.find(c => c.id === toCurrency())?.symbol}
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