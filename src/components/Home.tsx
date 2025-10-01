import { Component, onMount, createSignal } from 'solid-js';
import { A } from '@solidjs/router';

const Home: Component = () => {
  const [userName, setUserName] = createSignal('Пользователь');
  const [isInTelegram, setIsInTelegram] = createSignal(false);

  onMount(() => {
    // Проверяем, запущено ли приложение в Telegram
    if (window.Telegram?.WebApp) {
      setIsInTelegram(true);
      
      // Получаем имя пользователя из Telegram
      const user = window.Telegram.WebApp.initDataUnsafe?.user;
      if (user?.first_name) {
        setUserName(user.first_name);
      }
      
      console.log('🏠 Главная страница загружена в Telegram');
    }
  });

  return (
    <div class="container">
      <div class="welcome-screen">
        <h1 class="welcome-title">
          💰 Крипто Табло
        </h1>
        <p class="welcome-subtitle">
          {isInTelegram() 
            ? `Привет, ${userName()}! 👋\nОтслеживайте курсы криптовалют и конвертируйте их в реальном времени`
            : 'Отслеживайте курсы криптовалют и конвертируйте их в реальном времени'
          }
        </p>
        
        <div class="welcome-buttons">
          <A href="/crypto" class="btn">
            📈 Посмотреть криптовалюты
          </A>
          <A href="/converter" class="btn btn-secondary">
            🔄 Открыть конвертор
          </A>
        </div>

        {isInTelegram() && (
          <div style="margin-top: 30px; padding: 16px; background: rgba(0,0,0,0.05); border-radius: 12px;">
            <p style="margin: 0; font-size: 14px; color: var(--tg-hint-color, #707579); text-align: center;">
              ✨ Приложение запущено в Telegram Mini App
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;