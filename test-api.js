// Тестовый файл для проверки API CoinPaprika

const testAPI = async () => {
  console.log('🔄 Тестируем API CoinPaprika...\n');
  
  try {
    // Тест 1: Получение списка топ криптовалют
    console.log('📊 Тест 1: Получение топ-10 криптовалют');
    const response1 = await fetch('https://api.coinpaprika.com/v1/tickers?limit=10');
    
    if (!response1.ok) {
      throw new Error(`HTTP error! status: ${response1.status}`);
    }
    
    const cryptos = await response1.json();
    console.log(`✅ Получено ${cryptos.length} криптовалют:`);
    
    cryptos.slice(0, 5).forEach((crypto, index) => {
      console.log(`  ${index + 1}. ${crypto.name} (${crypto.symbol}): $${crypto.quotes.USD.price.toFixed(4)}`);
    });
    
    console.log('\n');
    
    // Тест 2: Получение конкретной криптовалюты
    console.log('🔍 Тест 2: Получение информации о Bitcoin');
    const response2 = await fetch('https://api.coinpaprika.com/v1/tickers/btc-bitcoin');
    
    if (!response2.ok) {
      throw new Error(`HTTP error! status: ${response2.status}`);
    }
    
    const bitcoin = await response2.json();
    console.log(`✅ Bitcoin: $${bitcoin.quotes.USD.price.toFixed(2)} (${bitcoin.quotes.USD.percent_change_24h.toFixed(2)}% за 24ч)`);
    
    console.log('\n');
    
    // Тест 3: Конвертация
    console.log('💱 Тест 3: Конвертация 1 BTC в ETH');
    const btcPrice = bitcoin.quotes.USD.price;
    
    const response3 = await fetch('https://api.coinpaprika.com/v1/tickers/eth-ethereum');
    if (!response3.ok) {
      throw new Error(`HTTP error! status: ${response3.status}`);
    }
    
    const ethereum = await response3.json();
    const ethPrice = ethereum.quotes.USD.price;
    
    const ethAmount = btcPrice / ethPrice;
    console.log(`✅ 1 BTC = ${ethAmount.toFixed(6)} ETH`);
    console.log(`   BTC цена: $${btcPrice.toFixed(2)}`);
    console.log(`   ETH цена: $${ethPrice.toFixed(2)}`);
    
    console.log('\n🎉 Все тесты API прошли успешно!');
    console.log('🚀 API CoinPaprika работает корректно и готов к использованию!');
    
  } catch (error) {
    console.error('❌ Ошибка при тестировании API:', error.message);
  }
};

// Запускаем тест
testAPI();