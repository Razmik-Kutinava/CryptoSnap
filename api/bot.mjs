export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const BOT_TOKEN = process.env.TOKEN || '8485812370:AAGVm0q_CCzcS6HflE4uc8AFXbRt0ECEFIM';
  const WEB_APP_URL = process.env.WEBAPP_URL || 'https://crypto-snap-lilac.vercel.app';

  console.log('Bot API called:', req.method, req.url);

  if (req.method === 'POST') {
    // Webhook для Telegram
    const { message } = req.body || {};
    
    if (message && message.text === '/start') {
      const chatId = message.chat.id;
      const userId = message.from.id;
      const userName = message.from.first_name || 'Пользователь';

      console.log(`💬 Пользователь ${userName} (${userId}) запустил бота`);

      // Отправляем ответ с кнопкой Mini App
      const replyMarkup = {
        inline_keyboard: [[
          {
            text: '🚀 Открыть Крипто Табло',
            web_app: { url: WEB_APP_URL }
          }
        ]]
      };

      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: `🎉 Добро пожаловать в Крипто Табло!\n\n📊 Актуальные цены криптовалют\n💱 Конвертор валют\n📈 Данные в реальном времени\n\nНажмите кнопку ниже, чтобы открыть приложение:`,
          reply_markup: replyMarkup
        })
      }).then(response => response.json()).then(result => {
        console.log('Telegram response:', result);
      }).catch(error => {
        console.error('❌ Ошибка отправки в Telegram:', error);
      });
    }

    return res.status(200).json({ ok: true });
  } 
  
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'Bot is running',
      webAppUrl: WEB_APP_URL,
      botToken: BOT_TOKEN ? 'Set' : 'Not set',
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url
    });
  }
  
  return res.status(405).json({ error: 'Method not allowed' });
}