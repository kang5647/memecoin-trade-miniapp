'use client'

import  SwapWidget  from '../components/SwapWidget'
import {AppKit} from '../context'
import { useEffect } from 'react';
import { useTelegramWebApp } from "../hooks/useTelegramWebApp"
export default function Home() {
  
  const webApp = useTelegramWebApp();
  useEffect(() => {
    if (webApp) {
      // You can access Telegram WebApp parameters here
      console.log('Telegram WebApp parameters:', webApp.initData);
      
    }
  }, [webApp]);

  return (
    <AppKit>
      <main className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm rounded-3xl shadow-lg p-8 max-w-md w-full">
          <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">
            Welcome to Memecoin Fiesta
          </h1>
           {webApp?.initDataUnsafe.user && (
            <p className="text-center mb-4">
              Hello, {webApp.initDataUnsafe.user.first_name}!
            </p>
          )}
          <div className="mb-6 flex justify-center">
            <w3m-button />
          </div>
          <div className="bg-white rounded-2xl shadow-md p-4">
            <SwapWidget />
          </div>
        </div>
      </main>
    </AppKit>
  )
}