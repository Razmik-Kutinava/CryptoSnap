export default function handler(req, res) {
  return res.status(200).json({
    message: 'API Endpoints доступны',
    endpoints: [
      '/api/bot - Telegram webhook',
      '/api/setup-webhook - Настройка webhook',
      '/api/test - Тестовый endpoint'
    ],
    timestamp: new Date().toISOString()
  });
}