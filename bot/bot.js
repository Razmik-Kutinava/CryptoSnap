import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Загружаем переменные окружения из .env файла
dotenv.config();

// Токен бота из .env файла
const token = process.env.TOKEN || '8485812370:AAGVm0q_CCzcS6HflE4uc8AFXbRt0ECEFIM';

// URL будет обновлен автоматически из переменной окружения или ngrok
const webAppUrl = process.env.WEBAPP_URL || 'https://crypto-snap-lilac.vercel.app';

// Создаем экземпляр бота
const bot = new TelegramBot(token, {polling: true});

console.log('🤖 Бот запущен и готов к работе!');
console.log('🌐 URL веб-приложения:', webAppUrl);

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userName = msg.from.first_name || 'Пользователь';
  
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
  
  bot.sendMessage(chatId, welcomeMessage, options);
});

// Обработчик для любого текстового сообщения
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  
  // Игнорируем команды, которые уже обработаны
  if (messageText && !messageText.startsWith('/')) {
    console.log(`📝 Получено сообщение от ${msg.from.first_name}: ${messageText}`);
    
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
    
    bot.sendMessage(chatId, responseMessage, options);
  }
});

// Обработчик ошибок
bot.on('error', (error) => {
  console.error('❌ Ошибка бота:', error);
});

// Обработчик для web_app_data (данные из веб-приложения)
bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = JSON.parse(msg.web_app_data.data);
  
  console.log('📊 Получены данные из веб-приложения:', data);
  
  // Здесь можно обработать данные, полученные из веб-приложения
  bot.sendMessage(chatId, `✅ Данные получены: ${JSON.stringify(data)}`);
});

console.log(`🚀 Бот настроен и готов к работе с HTTPS!`);
console.log(`🌐 URL веб-приложения: ${webAppUrl}`);
console.log(`📝 Для остановки бота нажмите Ctrl+C`);

// Настройка команд бота
bot.setMyCommands([
  {
    command: 'start',
    description: '🚀 Запустить Крипто Табло'
  }
]).then(() => {
  console.log('✅ Команды бота настроены успешно!');
}).catch((error) => {
  console.error('❌ Ошибка настройки команд:', error);
});