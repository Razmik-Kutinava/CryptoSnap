import TelegramBot from 'node-telegram-bot-api';
import dotenv from 'dotenv';

// Загружаем переменные окружения
dotenv.config();

// Настройки бота
const BOT_TOKEN = '8485812370:AAGVm0q_CCzcS6HflE4uc8AFXbRt0ECEFIM';
const WEB_APP_URL = 'https://crypto-snap-lilac.vercel.app';

// Создаем экземпляр бота
const bot = new TelegramBot(BOT_TOKEN, {polling: true});

console.log('🤖 Бот запущен и готов к работе!');
console.log('🌐 URL веб-приложения:', WEB_APP_URL);

// Обработчик команды /start
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;
  const userName = msg.from.first_name || 'Пользователь';

  console.log(`💬 Пользователь ${userName} (${userId}) запустил бота`);

  // Создаем клавиатуру с кнопкой Mini App
  const replyMarkup = {
    inline_keyboard: [[
      {
        text: '🚀 Открыть Крипто Табло',
        web_app: { url: WEB_APP_URL }
      }
    ]]
  };

  // Отправляем приветственное сообщение
  bot.sendMessage(chatId, 
    `🎉 Добро пожаловать в Крипто Табло!\n\n📊 Актуальные цены криптовалют\n💱 Конвертор валют\n📈 Данные в реальном времени\n\nНажмите кнопку ниже, чтобы открыть приложение:`,
    { reply_markup: replyMarkup }
  ).then(() => {
    console.log(`✅ Сообщение отправлено пользователю ${userName}`);
  }).catch((error) => {
    console.error('❌ Ошибка отправки сообщения:', error);
  });
});

// Обработчик ошибок
bot.on('polling_error', (error) => {
  console.error('❌ Ошибка polling:', error);
});

// Обработчик всех сообщений для отладки
bot.on('message', (msg) => {
  const userName = msg.from.first_name || 'Пользователь';
  console.log(`📝 Сообщение от ${userName}: ${msg.text || '[нет текста]'}`);
});

console.log('🚀 Бот настроен и готов к работе!');
console.log('📝 Для остановки бота нажмите Ctrl+C');