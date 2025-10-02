// Vercel Serverless Function для API криптовалют
export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'GET') {
      const { limit = 10, symbol } = req.query;
      
      if (symbol) {
        // Получение конкретной криптовалюты
        const response = await fetch(`https://api.coinpaprika.com/v1/tickers/${symbol}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const crypto = await response.json();
        
        return res.status(200).json({
          success: true,
          data: {
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            price: crypto.quotes.USD.price,
            change24h: crypto.quotes.USD.percent_change_24h,
            marketCap: crypto.quotes.USD.market_cap,
            volume24h: crypto.quotes.USD.volume_24h
          }
        });
      } else {
        // Получение списка криптовалют
        const response = await fetch(`https://api.coinpaprika.com/v1/tickers?limit=${limit}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const cryptos = await response.json();
        
        const formattedCryptos = cryptos.map(crypto => ({
          id: crypto.id,
          name: crypto.name,
          symbol: crypto.symbol,
          price: crypto.quotes.USD.price,
          change24h: crypto.quotes.USD.percent_change_24h,
          marketCap: crypto.quotes.USD.market_cap,
          volume24h: crypto.quotes.USD.volume_24h
        }));
        
        return res.status(200).json({
          success: true,
          data: formattedCryptos
        });
      }
    }
    
    return res.status(405).json({ 
      success: false, 
      error: 'Method not allowed' 
    });
    
  } catch (error) {
    console.error('❌ Ошибка API криптовалют:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

