"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SwapWidget from "../components/SwapWidget";
import { useTelegramWebApp } from "../hooks/useTelegramWebApp";
import { AppKit } from "../context";
import { Token } from "../types/telegram-webapp";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const webApp = useTelegramWebApp();
  const [token, setToken] = useState<Token | null>(null);

  useEffect(() => {
    const fetchToken = async () => {
      if (webApp) {
        console.log("Telegram WebApp parameters:", webApp.initData);

        // Extract the start_param (contract address) from initDataUnsafe
        if (webApp.initDataUnsafe && webApp.initDataUnsafe.start_param) {
          const [contractAddress, chain] =
            webApp.initDataUnsafe.start_param.split("-");
          console.log("Contract address:", contractAddress, "Chain:", chain);
          const newToken = await fetchTokenInfo(chain, contractAddress);
          console.log("Token info:", newToken);
          setToken(newToken);

          await recordUserInteraction(webApp.initDataUnsafe.user, "app_open");
        }
      }
    };
    fetchToken();
  }, [webApp]);

  //  useEffect(() => {
  //   const testFetchToken = async () => {
  //     // Test values - replace with actual values you want to test
  //     const testChain = 'base';
  //     const testAddress = '0xb1a03eda10342529bbf8eb700a06c60441fef25d';

  //     console.log('Testing fetchTokenInfo with:', testChain, testAddress);
  //     const testToken = await fetchTokenInfo(testChain, testAddress);
  //     console.log('Test token info:', testToken);

  //     // Optionally set the token state if you want to see it in the UI
  //      setToken(testToken);
  //   };

  //   testFetchToken();
  // }, []); // Empty dependency array means this runs once on component mount

  const recordUserInteraction = async (user: any, interactionType: string) => {
    if (!user) return;

    const { data, error } = await supabase.from("user_interactions").insert([
      {
        user_id: user.id,
        first_name: user.first_name,
        username: user.username,
        interaction_type: interactionType,
        timestamp: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error("Error recording user interaction:", error);
    } else {
      console.log("User interaction recorded successfully:", data);
    }
  };

  const fetchTokenInfo = async (
    chain: string,
    address: string
  ): Promise<Token | null> => {
    const apiUrl = `/api/dextools-proxy?chain=${chain}&address=${address}`;

    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorData.error}`
        );
      }

      const data = await response.json();

      if (data.data) {
        const tokenData = data.data;
        const newToken: Token = {
          address: tokenData.address,
          name: tokenData.name,
          symbol: tokenData.symbol,
          decimals: tokenData.decimals,
          chainId: getChainId(chain), // You'll need to implement this function
          logoURI: tokenData.logo || "",
        };

        return newToken;
      } else {
        throw new Error("Token data not found in API response");
      }
    } catch (error) {
      console.error("Error fetching token info:", error);
      return null;
    }
  };

  // Helper function to get chainId from chain name
  const getChainId = (chain: string): number => {
    const chainMap: { [key: string]: number } = {
      ethereum: 1,
      base: 8453,
    };
    return chainMap[chain.toLowerCase()] || 8453;
  };

  return (
    <AppKit>
      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-orange-100">
        <div className="w-full max-w-md bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-lg p-6 relative">
          <div className="flex justify-between items-center mb-4">
            {webApp?.initDataUnsafe.user && (
              <p className="text-white text-sm truncate flex-grow mr-2">
                Hello, {webApp.initDataUnsafe.user.first_name}!
              </p>
            )}
            <Link
              href={`/leaderboard?symbol=${token?.symbol}`}
              className="bg-white text-indigo-600 text-sm font-bold py-2 px-4 rounded hover:bg-indigo-100 transition-colors whitespace-nowrap"
            >
              Leaderboard
            </Link>
          </div>
          <div className="mb-6 flex justify-center mt-4">
            <w3m-button />
          </div>
          <div className="flex justify-center">
            <SwapWidget token={token} />
          </div>
        </div>
      </main>
    </AppKit>
  );
}
