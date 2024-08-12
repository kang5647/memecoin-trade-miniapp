import { useState, useEffect } from 'react';
import { TelegramWebApp } from "../types/telegram-webapp";

export function useTelegramWebApp() {
    const [webApp, setWebApp] = useState < TelegramWebApp | null > (null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
            setWebApp(window.Telegram.WebApp);
        }
    }, []);

    return webApp;
}