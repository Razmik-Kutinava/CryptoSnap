// Настройка webhook для Telegram Bot
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const BOT_TOKEN = process.env.TOKEN || '8485812370:AAGVm0q_CCzcS6HflE4uc8AFXbRt0ECEFIM';
  const WEBHOOK_URL = `${process.env.WEBAPP_URL || 'https://crypto-snap-lilac.vercel.app'}/api/bot`;

  try {
    // Устанавливаем webhook
    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        allowed_updates: ['message']
      })
    });

    const result = await response.json();

    if (result.ok) {
      console.log('✅ Webhook установлен:', WEBHOOK_URL);
      res.status(200).json({
        success: true,
        message: 'Webhook установлен',
        webhook_url: WEBHOOK_URL,
        result: result
      });
    } else {
      console.error('❌ Ошибка установки webhook:', result);
      res.status(400).json({
        success: false,
        error: result.description || 'Ошибка установки webhook'
      });
    }
  } catch (error) {
    console.error('❌ Ошибка:', error);
    res.status(500).json({
      success: false,
      error: 'Внутренняя ошибка сервера'
    });
  }
}