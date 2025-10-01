export interface CoinPaprikaResponse {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  quotes: {
    USD: {
      price: number;
      percent_change_24h: number;
      market_cap: number;
      volume_24h: number;
    };
  };
}

export interface CryptoCurrency {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  changePercent24h: number;
  marketCap: number;
  volume24h: number;
}

const BASE_URL = 'https://api.coinpaprika.com/v1';

export class CryptoApiService {
  // Получить топ криптовалют
  static async getTopCryptos(limit: number = 10): Promise<CryptoCurrency[]> {
    try {
      console.log(`🔄 Запрашиваем топ-${limit} криптовалют из CoinPaprika...`);
      
      const response = await fetch(`${BASE_URL}/tickers?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: CoinPaprikaResponse[] = await response.json();
      
      console.log(`✅ Получено ${data.length} криптовалют от CoinPaprika`);
      console.log('📊 Первые 3 монеты:', data.slice(0, 3).map(c => `${c.name}: $${c.quotes.USD.price.toFixed(2)}`));
      
      return data.map(coin => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.quotes.USD.price,
        change24h: (coin.quotes.USD.price * coin.quotes.USD.percent_change_24h) / 100,
        changePercent24h: coin.quotes.USD.percent_change_24h,
        marketCap: coin.quotes.USD.market_cap,
        volume24h: coin.quotes.USD.volume_24h
      }));
    } catch (error) {
      console.error('❌ Ошибка загрузки данных от CoinPaprika:', error);
      throw new Error('Не удалось загрузить данные о криптовалютах');
    }
  }

  // Получить конкретную криптовалюту
  static async getCrypto(coinId: string): Promise<CryptoCurrency> {
    try {
      console.log(`🔄 Запрашиваем данные для ${coinId}...`);
      
      const response = await fetch(`${BASE_URL}/tickers/${coinId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const coin: CoinPaprikaResponse = await response.json();
      
      console.log(`✅ Получены данные для ${coin.name}: $${coin.quotes.USD.price.toFixed(2)}`);
      
      return {
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.quotes.USD.price,
        change24h: (coin.quotes.USD.price * coin.quotes.USD.percent_change_24h) / 100,
        changePercent24h: coin.quotes.USD.percent_change_24h,
        marketCap: coin.quotes.USD.market_cap,
        volume24h: coin.quotes.USD.volume_24h
      };
    } catch (error) {
      console.error(`❌ Ошибка загрузки ${coinId}:`, error);
      throw new Error('Не удалось загрузить данные о криптовалюте');
    }
  }

  // Конвертация между криптовалютами
  static convertCrypto(
    amount: number, 
    fromPrice: number, 
    toPrice: number
  ): number {
    const result = (amount * fromPrice) / toPrice;
    console.log(`💱 Конвертация: ${amount} × $${fromPrice} / $${toPrice} = ${result.toFixed(6)}`);
    return result;
  }

  // Тестовый метод для проверки API
  static async testApi(): Promise<boolean> {
    try {
      console.log('🧪 Тестируем подключение к CoinPaprika API...');
      
      const response = await fetch(`${BASE_URL}/tickers?limit=1`);
      
      if (!response.ok) {
        console.error(`❌ API тест провален: HTTP ${response.status}`);
        return false;
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        console.log('✅ API тест успешен! Пример данных:', {
          name: data[0].name,
          price: data[0].quotes?.USD?.price,
          symbol: data[0].symbol
        });
        return true;
      } else {
        console.error('❌ API вернул пустые данные');
        return false;
      }
    } catch (error) {
      console.error('❌ Ошибка тестирования API:', error);
      return false;
    }
  }
}