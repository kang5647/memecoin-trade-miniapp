"use client";

import React, { Suspense } from "react";
import { useTelegramWebApp } from "../../hooks/useTelegramWebApp";
import { TrendingUp, TrendingDown } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const truncateAddress = (address: string) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

// Function to generate a random Ethereum-like address
const generateRandomAddress = () => {
  const chars = "0123456789abcdef";
  let address = "0x";
  for (let i = 0; i < 40; i++) {
    address += chars[Math.floor(Math.random() * chars.length)];
  }
  return address;
};

// Function to generate a random P&L value between -100 and 100
const generateRandomPL = () => {
  return Math.round((Math.random() * 200 - 100) * 100) / 100;
};

// Generate an array of 20 mock traders
const generateMockTraders = (count: number) => {
  return Array.from({ length: count }, () => ({
    address: generateRandomAddress(),
    pl: generateRandomPL(),
  }));
};

const mockTraders = generateMockTraders(5);

function LeaderboardContent() {
  const searchParams = useSearchParams();
  const symbol = searchParams?.get("symbol") || null;

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 relative">
      <Link
        href="/"
        className="absolute top-2 right-2 bg-white text-indigo-600 text-sm font-bold py-1 px-2 rounded hover:bg-indigo-100 transition-colors"
      >
        Home
      </Link>
      <h1 className="text-2xl font-bold mb-4 mt-8 text-center text-white">
        Who traded ${symbol ? `${symbol}` : ""}?
      </h1>
      <div className="space-y-2 bg-white bg-opacity-70 backdrop-filter backdrop-blur-sm rounded-lg p-4">
        {mockTraders.map((trader) => (
          <div
            key={trader.address}
            className="bg-gray-100 p-3 rounded-lg flex justify-between items-center"
          >
            <span className="font-mono text-sm text-black">
              {truncateAddress(trader.address)}
            </span>
            <div
              className={`flex items-center ${
                trader.pl >= 0 ? "text-green-500" : "text-red-500"
              }`}
            >
              {trader.pl >= 0 ? (
                <TrendingUp size={16} className="mr-1" />
              ) : (
                <TrendingDown size={16} className="mr-1" />
              )}
              <span className="font-semibold">{trader.pl.toFixed(2)}%</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center text-sm text-white">
        Total traders: {mockTraders.length}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const webApp = useTelegramWebApp();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-orange-100">
      {webApp?.initDataUnsafe.user && (
        <p className="text-center mb-4 text-white">
          Hello, {webApp.initDataUnsafe.user.first_name}!
        </p>
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <LeaderboardContent />
      </Suspense>
    </main>
  );
}
