import { Component, createSignal, onMount } from 'solid-js';
import { Router, Routes, Route } from '@solidjs/router';
import Home from './components/Home';
import CryptoList from './components/CryptoList';
import Converter from './components/Converter';
import './App.css';

const App: Component = () => {
  const [currentPage, setCurrentPage] = createSignal('home');

  onMount(() => {
    // Применяем тему Telegram если доступна
    if (window.Telegram?.WebApp?.themeParams) {
      const theme = window.Telegram.WebApp.themeParams;
      document.documentElement.style.setProperty('--tg-bg-color', theme.bg_color || '#ffffff');
      document.documentElement.style.setProperty('--tg-text-color', theme.text_color || '#000000');
      document.documentElement.style.setProperty('--tg-hint-color', theme.hint_color || '#707579');
      document.documentElement.style.setProperty('--tg-link-color', theme.link_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-button-color', theme.button_color || '#2481cc');
      document.documentElement.style.setProperty('--tg-button-text-color', theme.button_text_color || '#ffffff');
    }
  });

  return (
    <div class="app">
      <Router>
        <Routes>
          <Route path="/" component={Home} />
          <Route path="/crypto" component={CryptoList} />
          <Route path="/converter" component={Converter} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;