'use client'

import SwapWidget from '../components/SwapWidget'
import { AppKit } from '../context'
import { useEffect } from 'react'
import { useTelegramWebApp } from "../hooks/useTelegramWebApp"

export default function Home() {
  const webApp = useTelegramWebApp()
  
  useEffect(() => {
    if (webApp) {
      console.log('Telegram WebApp parameters:', webApp.initData)
    }
  }, [webApp])

  return (
    <AppKit>
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
          {webApp?.initDataUnsafe.user && (
            <p className="text-center mb-4 text-gray-700">
              Hello, {webApp.initDataUnsafe.user.first_name}!
            </p>
          )}
          <div className="mb-6 flex justify-center">
            <w3m-button />
          </div>
          <div className="flex justify-center">
            <SwapWidget />
          </div>
        </div>
      </main>
    </AppKit>
  )
}