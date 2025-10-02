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
const API_BASE_URL = '/api'; // Используем локальные API endpoints

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

  // Получить топ криптовалют через локальный API
  static async getTopCryptosLocal(limit: number = 10): Promise<CryptoCurrency[]> {
    try {
      console.log(`🔄 Запрашиваем топ-${limit} криптовалют через локальный API...`);
      
      const response = await fetch(`${API_BASE_URL}/crypto?limit=${limit}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Ошибка API');
      }
      
      console.log(`✅ Получено ${result.data.length} криптовалют через локальный API`);
      
      return result.data.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        symbol: coin.symbol,
        price: coin.price,
        change24h: (coin.price * coin.change24h) / 100,
        changePercent24h: coin.change24h,
        marketCap: coin.marketCap,
        volume24h: coin.volume24h
      }));
    } catch (error) {
      console.error('❌ Ошибка загрузки через локальный API:', error);
      // Fallback к прямому API
      return this.getTopCryptos(limit);
    }
  }

  // Получить конкретную криптовалюту через локальный API
  static async getCryptoLocal(coinId: string): Promise<CryptoCurrency> {
    try {
      console.log(`🔄 Запрашиваем данные для ${coinId} через локальный API...`);
      
      const response = await fetch(`${API_BASE_URL}/crypto?symbol=${coinId}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Ошибка API');
      }
      
      console.log(`✅ Получены данные для ${result.data.name}: $${result.data.price.toFixed(2)}`);
      
      return {
        id: result.data.id,
        name: result.data.name,
        symbol: result.data.symbol,
        price: result.data.price,
        change24h: (result.data.price * result.data.change24h) / 100,
        changePercent24h: result.data.change24h,
        marketCap: result.data.marketCap,
        volume24h: result.data.volume24h
      };
    } catch (error) {
      console.error(`❌ Ошибка загрузки ${coinId} через локальный API:`, error);
      // Fallback к прямому API
      return this.getCrypto(coinId);
    }
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

  // Тестовый метод для проверки локального API
  static async testLocalApi(): Promise<boolean> {
    try {
      console.log('🧪 Тестируем локальный API...');
      
      const response = await fetch(`${API_BASE_URL}/test`);
      
      if (!response.ok) {
        console.error(`❌ Локальный API тест провален: HTTP ${response.status}`);
        return false;
      }
      
      const data = await response.json();
      
      console.log('✅ Локальный API тест успешен!', data);
      return true;
    } catch (error) {
      console.error('❌ Ошибка тестирования локального API:', error);
      return false;
    }
  }
}