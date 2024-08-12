import { useState, useEffect } from 'react';
import { TelegramWebApp } from '../types/telegram-webapp';

export const useTelegramWebApp = () => {
  const [webApp, setWebApp] = useState<TelegramWebApp | null>(null);

  useEffect(() => {
    const initTelegramWebApp = () => {
      if (typeof window !== 'undefined' && window.Telegram && window.Telegram.WebApp) {
        setWebApp(window.Telegram.WebApp);
      } else {
        setTimeout(initTelegramWebApp, 100);
      }
    };

    initTelegramWebApp();
  }, []);

  return webApp;
};