// Скрипт для настройки webhook Telegram бота
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.TOKEN || '8319585111:AAF8kp_kxMe1ZC_iFSB3s2ESTMbKRcZ6qJo';
const WEBHOOK_URL = process.env.WEBHOOK_URL || 'https://crypto-snap-lilac.vercel.app/api/bot';

async function setupWebhook() {
  try {
    console.log('🔧 Настраиваем webhook для Telegram бота...');
    console.log(`📡 URL webhook: ${WEBHOOK_URL}`);
    
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        allowed_updates: ['message', 'callback_query']
      })
    });
    
    const result = await response.json();
    
    if (result.ok) {
      console.log('✅ Webhook успешно настроен!');
      console.log('📊 Результат:', result.result);
    } else {
      console.error('❌ Ошибка настройки webhook:', result.description);
    }
    
    // Проверяем информацию о webhook
    const infoResponse = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    const info = await infoResponse.json();
    
    if (info.ok) {
      console.log('\n📋 Информация о webhook:');
      console.log(`URL: ${info.result.url}`);
      console.log(`Pending updates: ${info.result.pending_update_count}`);
      console.log(`Last error: ${info.result.last_error_message || 'Нет ошибок'}`);
    }
    
  } catch (error) {
    console.error('❌ Ошибка:', error.message);
  }
}

// Запускаем настройку
setupWebhook();

