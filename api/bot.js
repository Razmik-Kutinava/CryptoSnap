// Vercel Serverless Function для Telegram бота
const TelegramBot = require('node-telegram-bot-api');

// Токен бота из переменных окружения
const token = process.env.TOKEN || '8319585111:AAF8kp_kxMe1ZC_iFSB3s2ESTMbKRcZ6qJo';
const webAppUrl = process.env.WEBAPP_URL || 'https://crypto-snap-lilac.vercel.app';

// Создаем экземпляр бота (без polling для serverless)
const bot = new TelegramBot(token);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    if (req.method === 'POST') {
      const update = req.body;
      
      // Обработка команды /start
      if (update.message && update.message.text === '/start') {
        const chatId = update.message.chat.id;
        const userName = update.message.from.first_name || 'Пользователь';
        
        console.log(`💬 Пользователь ${userName} (${chatId}) запустил бота`);
        
        const welcomeMessage = `Привет, ${userName}! 👋\n\n💰 Добро пожаловать в Крипто Табло!\n\nЗдесь вы можете:\n📈 Отслеживать курсы криптовалют\n🔄 Конвертировать валюты\n📊 Получать актуальную информацию\n\nНажмите на кнопку ниже, чтобы открыть приложение:`;
        
        const options = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "📱 Открыть Крипто Табло",
                  web_app: {
                    url: webAppUrl
                  }
                }
              ]
            ]
          }
        };
        
        await bot.sendMessage(chatId, welcomeMessage, options);
        
        return res.status(200).json({ 
          success: true, 
          message: 'Приветственное сообщение отправлено' 
        });
      }
      
      // Обработка обычных сообщений
      if (update.message && update.message.text && !update.message.text.startsWith('/')) {
        const chatId = update.message.chat.id;
        const messageText = update.message.text;
        
        console.log(`📝 Получено сообщение: ${messageText}`);
        
        const responseMessage = `🤖 Для работы с криптовалютами используйте кнопку "Открыть Крипто Табло" или отправьте команду /start`;
        
        const options = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: "📱 Открыть Крипто Табло",
                  web_app: {
                    url: webAppUrl
                  }
                }
              ]
            ]
          }
        };
        
        await bot.sendMessage(chatId, responseMessage, options);
        
        return res.status(200).json({ 
          success: true, 
          message: 'Ответ отправлен' 
        });
      }
      
      // Обработка web_app_data
      if (update.message && update.message.web_app_data) {
        const chatId = update.message.chat.id;
        const data = JSON.parse(update.message.web_app_data.data);
        
        console.log('📊 Получены данные из веб-приложения:', data);
        
        await bot.sendMessage(chatId, `✅ Данные получены: ${JSON.stringify(data)}`);
        
        return res.status(200).json({ 
          success: true, 
          message: 'Данные обработаны' 
        });
      }
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Webhook получен' 
    });
    
  } catch (error) {
    console.error('❌ Ошибка обработки webhook:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
}

