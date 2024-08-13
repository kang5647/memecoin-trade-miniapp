'use client'

import React from 'react';
import { useTelegramWebApp } from '../../hooks/useTelegramWebApp';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

const mockTraders = [
  { address: '0x1234567890123456789012345678901234567890', pl: 150.25 },
  { address: '0xabcdefabcdefabcdefabcdefabcdefabcdefabcd', pl: -75.50 },
  { address: '0x9876543210987654321098765432109876543210', pl: 300.00 },
  { address: '0xfedcbafedcbafedcbafedcbafedcbafedc', pl: -10.75 },
  { address: '0xa1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2', pl: 50.00 },
];

export default function LeaderboardPage() {
  const webApp = useTelegramWebApp();
  const searchParams = useSearchParams();
  const symbol = searchParams.get('symbol');

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-orange-100">
      <div className="w-full max-w-md bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 relative">
        <Link href="/" className="absolute top-2 right-2 bg-white text-indigo-600 text-sm font-bold py-1 px-2 rounded hover:bg-indigo-100 transition-colors">
          Home
        </Link>
        {webApp?.initDataUnsafe.user && (
          <p className="text-center mb-4 text-white">
            Hello, {webApp.initDataUnsafe.user.first_name}!
          </p>
        )}

        <h1 className="text-2xl font-bold mb-4 mt-8 text-center text-white">Who traded {symbol ? `${symbol}` : ''}</h1>
        <div className="space-y-2 bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm rounded-lg p-4">
          {mockTraders.map((trader) => (
            <div key={trader.address} className="bg-gray-100 p-3 rounded-lg flex justify-between items-center">
              <span className="font-mono text-sm text-black">{truncateAddress(trader.address)}</span>
              <div className={`flex items-center ${trader.pl >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trader.pl >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
                <span className="font-semibold">{trader.pl.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center text-sm text-white">
          Total traders: {mockTraders.length}
        </div>
      </div>
    </main>
  );
}