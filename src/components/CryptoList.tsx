import { Component, For, onMount, createSignal, createResource } from 'solid-js';
import { A } from '@solidjs/router';
import { CryptoApiService, type CryptoCurrency } from '../services/cryptoApi';
import { formatPrice, formatPercentChange, getChangeClass } from '../data/mockData';

const CryptoList: Component = () => {
  // Используем createResource для загрузки данных из API
  const [cryptos, { refetch }] = createResource(() => CryptoApiService.getTopCryptos(10));

  return (
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">📈 Криптовалюты</h1>
        <A href="/" class="btn btn-secondary">Назад</A>
      </div>

      {cryptos.loading && (
        <div style="text-align: center; padding: 40px;">
          <p>🔄 Загружаем актуальные данные из CoinPaprika...</p>
          <p style="font-size: 14px; color: var(--tg-hint-color, #707579);">
            Это может занять несколько секунд
          </p>
        </div>
      )}

      {cryptos.error && (
        <div style="text-align: center; padding: 40px; color: #e53935;">
          <p>❌ Ошибка загрузки: {cryptos.error.message}</p>
          <p style="font-size: 14px; margin: 16px 0;">
            Проверьте подключение к интернету
          </p>
          <button 
            class="btn" 
            onClick={() => refetch()}
            style="margin-top: 16px;"
          >
            🔄 Попробовать снова
          </button>
        </div>
      )}

      {cryptos() && (
        <>
          <div style="text-align: center; padding: 8px; background: rgba(0,0,0,0.05); border-radius: 8px; margin-bottom: 16px;">
            <p style="margin: 0; font-size: 12px; color: var(--tg-hint-color, #707579);">
              ✅ Данные загружены из CoinPaprika API • {cryptos()!.length} монет
            </p>
          </div>
          
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
        </>
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