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

// Моковые данные для демонстрации
export const mockCryptoData: CryptoCurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43250.75,
    change24h: 1250.30,
    changePercent24h: 2.98,
    marketCap: 847000000000,
    volume24h: 28500000000
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2630.42,
    change24h: -45.20,
    changePercent24h: -1.69,
    marketCap: 316000000000,
    volume24h: 15200000000
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    symbol: 'BNB',
    price: 315.67,
    change24h: 8.90,
    changePercent24h: 2.90,
    marketCap: 48700000000,
    volume24h: 1800000000
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    price: 98.34,
    change24h: 4.22,
    changePercent24h: 4.48,
    marketCap: 43500000000,
    volume24h: 2100000000
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    price: 0.5234,
    change24h: 0.0156,
    changePercent24h: 3.07,
    marketCap: 28400000000,
    volume24h: 1650000000
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.4876,
    change24h: -0.0234,
    changePercent24h: -4.58,
    marketCap: 17200000000,
    volume24h: 890000000
  },
  {
    id: 'avalanche',
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 36.78,
    change24h: 1.45,
    changePercent24h: 4.10,
    marketCap: 14500000000,
    volume24h: 720000000
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.0832,
    change24h: -0.0021,
    changePercent24h: -2.46,
    marketCap: 11900000000,
    volume24h: 1200000000
  },
  {
    id: 'polygon',
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.7456,
    change24h: 0.0345,
    changePercent24h: 4.85,
    marketCap: 6950000000,
    volume24h: 450000000
  },
  {
    id: 'chainlink',
    name: 'Chainlink',
    symbol: 'LINK',
    price: 14.23,
    change24h: -0.67,
    changePercent24h: -4.50,
    marketCap: 8340000000,
    volume24h: 630000000
  }
];

// Функция для форматирования цены
export const formatPrice = (price: number): string => {
  if (price < 1) {
    return price.toFixed(4);
  } else if (price < 1000) {
    return price.toFixed(2);
  } else {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(price).replace('$', '$');
  }
};

// Функция для форматирования изменения в процентах
export const formatPercentChange = (change: number): string => {
  const sign = change >= 0 ? '+' : '';
  return `${sign}${change.toFixed(2)}%`;
};

// Функция для получения цвета изменения
export const getChangeClass = (change: number): string => {
  return change >= 0 ? 'positive' : 'negative';
};

// Функция для форматирования больших чисел (market cap, volume)
export const formatLargeNumber = (num: number): string => {
  if (num >= 1e12) {
    return (num / 1e12).toFixed(1) + 'T';
  } else if (num >= 1e9) {
    return (num / 1e9).toFixed(1) + 'B';
  } else if (num >= 1e6) {
    return (num / 1e6).toFixed(1) + 'M';
  } else if (num >= 1e3) {
    return (num / 1e3).toFixed(1) + 'K';
  }
  return num.toString();
};