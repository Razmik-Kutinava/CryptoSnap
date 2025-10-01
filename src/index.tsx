/* @refresh reload */
import { render } from 'solid-js/web';
import App from './App';

// Инициализация Telegram Web App
declare global {
  interface Window {
    Telegram: {
      WebApp: {
        ready(): void;
        expand(): void;
        close(): void;
        sendData(data: string): void;
        MainButton: {
          text: string;
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
        };
        BackButton: {
          show(): void;
          hide(): void;
          onClick(callback: () => void): void;
          offClick(callback: () => void): void;
        };
        themeParams: {
          bg_color?: string;
          text_color?: string;
          hint_color?: string;
          link_color?: string;
          button_color?: string;
          button_text_color?: string;
          secondary_bg_color?: string;
        };
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
          };
          chat?: {
            id: number;
            type: string;
            title?: string;
            username?: string;
          };
          start_param?: string;
        };
        isExpanded: boolean;
        viewportHeight: number;
        viewportStableHeight: number;
      };
    };
  }
}

// Инициализируем Telegram Web App при загрузке
if (window.Telegram?.WebApp) {
  console.log('🚀 Инициализация Telegram Web App...');
  const tg = window.Telegram.WebApp;
  
  // Готовность приложения
  tg.ready();
  
  // Расширяем приложение на весь экран
  tg.expand();
  
  // Логируем информацию о пользователе (если доступна)
  if (tg.initDataUnsafe?.user) {
    console.log('👤 Пользователь:', tg.initDataUnsafe.user);
  }
  
  console.log('✅ Telegram Web App инициализирован');
  console.log('🎨 Тема:', tg.themeParams);
} else {
  console.log('⚠️ Telegram Web App SDK не обнаружен. Приложение работает в обычном браузере.');
}

const root = document.getElementById('root');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?',
  );
}

render(() => <App />, root!);