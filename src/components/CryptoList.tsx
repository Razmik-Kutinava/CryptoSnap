import { Component, For, onMount, createSignal } from 'solid-js';
import { A } from '@solidjs/router';
import { mockCryptoData, formatPrice, formatPercentChange, getChangeClass, type CryptoCurrency } from '../data/mockData';

const CryptoList: Component = () => {
  const [cryptos, setCryptos] = createSignal<CryptoCurrency[]>([]);
  const [loading, setLoading] = createSignal(true);

  onMount(async () => {
    // Имитируем загрузку данных
    setTimeout(() => {
      setCryptos(mockCryptoData);
      setLoading(false);
    }, 1000);
  });

  return (
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">📈 Криптовалюты</h1>
        <A href="/" class="btn btn-secondary">Назад</A>
      </div>

      {loading() ? (
        <div style="text-align: center; padding: 40px;">
          <p>Загрузка данных...</p>
        </div>
      ) : (
        <div class="crypto-list">
          <For each={cryptos()}>
            {(crypto) => (
              <div class="crypto-item">
                <div class="crypto-info">
                  <div class="crypto-icon">
                    {crypto.symbol.substring(0, 2)}
                  </div>
                  <div class="crypto-details">
                    <h3>{crypto.name}</h3>
                    <p>{crypto.symbol}</p>
                  </div>
                </div>
                <div class="crypto-price">
                  <p class="price">{formatPrice(crypto.price)}</p>
                  <p class={`change ${getChangeClass(crypto.changePercent24h)}`}>
                    {formatPercentChange(crypto.changePercent24h)}
                  </p>
                </div>
              </div>
            )}
          </For>
        </div>
      )}

      <div class="navigation">
        <A href="/" class="nav-item">
          🏠 Главная
        </A>
        <A href="/crypto" class="nav-item active">
          📈 Крипто
        </A>
        <A href="/converter" class="nav-item">
          🔄 Конвертор
        </A>
      </div>
    </div>
  );
};

export default CryptoList;