# 🚀 Быстрый деплой на GitHub Pages

## Шаг 1: Подготовка проекта для деплоя

1. Создайте файл деплоя:

```bash
npm run build
```

## Шаг 2: Настройка GitHub Pages

1. Создайте новый репозиторий на GitHub
2. Загрузите код:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/ВАШ_ПОЛЬЗОВАТЕЛЬ/crypto-mini-app.git
git push -u origin main
```

3. Настройте GitHub Pages:
   - Перейдите в Settings репозитория
   - Выберите Pages в левом меню
   - Source: Deploy from a branch
   - Branch: main / root
   - Сохраните

## Шаг 3: Автоматический деплой с GitHub Actions

Создайте файл `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Setup Pages
      uses: actions/configure-pages@v3
      
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: ./dist
        
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v2
```

## Шаг 4: Обновите URL бота

После деплоя ваше приложение будет доступно по адресу:
`https://ВАШ_ПОЛЬЗОВАТЕЛЬ.github.io/crypto-mini-app/`

Замените URL в файле `bot/setup-bot.js`:

```javascript
const webAppUrl = 'https://ВАШ_ПОЛЬЗОВАТЕЛЬ.github.io/crypto-mini-app/';
```

## Шаг 5: Альтернативные хостинги

### Netlify (рекомендуется)
1. Зарегистрируйтесь на netlify.com
2. Подключите GitHub репозиторий
3. Build command: `npm run build`
4. Publish directory: `dist`

### Vercel
1. Зарегистрируйтесь на vercel.com
2. Импортируйте GitHub репозиторий
3. Настройки сборки установятся автоматически

## Готово! 🎉

После деплоя:
1. Обновите URL в боте
2. Перезапустите бота: `npm run bot`
3. Отправьте `/start` в чат с ботом
4. Наслаждайтесь работающим Telegram Mini App!