# Инструкция по развертыванию бота на Vercel

## Проблема
Бот не обновлялся при изменениях во фронтенде и не запускался на Vercel, потому что:
1. Vercel предназначен для serverless функций, а не для долго работающих процессов
2. Telegram бот требует webhook для работы на serverless платформах
3. Не было правильной интеграции между ботом и API

## Решение

### 1. Созданы serverless функции для Vercel:
- `api/bot.js` - обработчик webhook для Telegram бота
- `api/crypto.js` - API для получения данных о криптовалютах
- `api/test.js` - тестовый endpoint

### 2. Настроена конфигурация Vercel:
- Обновлен `vercel.json` для поддержки serverless функций
- Добавлена поддержка переменных окружения

### 3. Создан скрипт настройки webhook:
- `setup-webhook.js` - автоматическая настройка webhook для бота

## Шаги развертывания

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка переменных окружения в Vercel
В панели Vercel добавьте переменные:
- `TOKEN` - токен вашего Telegram бота
- `WEBAPP_URL` - URL вашего приложения на Vercel
- `WEBHOOK_URL` - URL webhook (обычно `https://your-app.vercel.app/api/bot`)

### 3. Развертывание на Vercel
```bash
# Если используете Vercel CLI
vercel --prod

# Или через Git push (если настроен автодеплой)
git add .
git commit -m "Add serverless bot functions"
git push origin main
```

### 4. Настройка webhook бота
После развертывания выполните:
```bash
npm run setup:webhook
```

Или вручную отправьте POST запрос:
```bash
curl -X POST "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-app.vercel.app/api/bot"}'
```

## Проверка работы

### 1. Тест API
```bash
npm run test:api
```

### 2. Проверка endpoints
- `https://your-app.vercel.app/api/test` - тестовый endpoint
- `https://your-app.vercel.app/api/crypto` - API криптовалют
- `https://your-app.vercel.app/api/bot` - webhook бота

### 3. Тест бота
Отправьте команду `/start` вашему боту в Telegram

## Структура проекта

```
├── api/
│   ├── bot.js          # Serverless функция для бота
│   ├── crypto.js       # API криптовалют
│   └── test.js         # Тестовый endpoint
├── bot/
│   └── bot.js          # Локальный бот (для разработки)
├── src/
│   └── services/
│       └── cryptoApi.ts # Обновленный API сервис
├── setup-webhook.js    # Скрипт настройки webhook
├── vercel.json         # Конфигурация Vercel
└── package.json        # Обновленные скрипты
```

## Преимущества нового решения

1. **Автоматическое обновление** - бот обновляется при каждом деплое
2. **Масштабируемость** - serverless функции автоматически масштабируются
3. **Интеграция** - бот и API работают в единой экосистеме
4. **Надежность** - Vercel обеспечивает высокую доступность
5. **Простота** - один деплой для всего приложения

## Отладка

### Проверка логов Vercel
```bash
vercel logs
```

### Проверка webhook
```bash
curl "https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getWebhookInfo"
```

### Локальная разработка
```bash
# Запуск фронтенда
npm run dev

# Запуск локального бота (для тестирования)
npm run bot:simple
```

