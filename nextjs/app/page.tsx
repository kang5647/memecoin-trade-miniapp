'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import SwapWidget from '../components/SwapWidget'
import { useTelegramWebApp } from "../hooks/useTelegramWebApp"
import { AppKit } from '../context'

export default function Home() {
  const webApp = useTelegramWebApp();
  const [contractAddress, setContractAddress] = useState('');

   useEffect(() => {
    if (webApp) {
      console.log('Telegram WebApp parameters:', webApp.initData);
      
      // Extract the start_param (contract address) from initDataUnsafe
      if (webApp.initDataUnsafe && webApp.initDataUnsafe.start_param) {
        setContractAddress(webApp.initDataUnsafe.start_param);
      }
    }
  }, [webApp]);

  return (
    <AppKit>
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-orange-100">
        <div className="w-full max-w-md bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 relative">
          <Link href="/leaderboard" className="absolute top-4 right-4 bg-white text-indigo-600 text-sm font-bold py-2 px-4 rounded hover:bg-indigo-100 transition-colors">
            Leaderboard
          </Link>
          {webApp?.initDataUnsafe.user && (
            <p className="text-center mb-4 text-white mt-8">
              Hello, {webApp.initDataUnsafe.user.first_name}!
            </p>
          )}
          {contractAddress && (
            <p className="text-center mb-4 text-white">
              Contract Address: {contractAddress}
            </p>
          )}
          <div className="mb-6 flex justify-center mt-8">
            <w3m-button/>
          </div>
          <div className="flex justify-center">
            <SwapWidget />
          </div>
        </div>
      </main>
    </AppKit>
  )
}