"use client";

import { useState, useEffect } from "react";
import { providers } from "ethers-v5";
import { Widget } from "@kyberswap/widgets";
import {
  useWeb3ModalProvider,
  useWeb3ModalAccount,
} from "@web3modal/ethers/react";
import { Token } from "../types/telegram-webapp";

import tokenListJson from "../token_list.json";

function SwapWidget({ token }: { token: Token | null }) {
  const { isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const [tokenList, setTokenList] = useState<Token[]>([]);
  const [defaultTokenOut, setDefaultTokenOut] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null);

  useEffect(() => {
    const initializeProvider = async () => {
      if (isConnected && walletProvider) {
        try {
          const newProvider = new providers.Web3Provider(walletProvider);
          console.log("Provider object:", newProvider);
          setProvider(newProvider);
          const network = await newProvider.getNetwork();
          console.log("Connected network:", {
            name: network.name,
            chainId: network.chainId,
          });
        } catch (error) {
          console.error("Error initializing provider:", error);
          setProvider(null);
        }
      } else {
        console.log("Wallet not connected or provider not available");
        setProvider(null); // Ensure provider is null if conditions are not met
      }
    };
    initializeProvider();
  }, [isConnected, walletProvider]);

  useEffect(() => {
    const initializeTokens = async () => {
      setIsLoading(true);
      // Load initial token list from JSON file
      const initialTokens = Object.values(tokenListJson.tokens);
      setTokenList(initialTokens);

      if (token) {
        setDefaultTokenOut(token.address);
        setTokenList((prevList) => {
          const updatedList = [...prevList, token];
          console.log("Updated token list:", updatedList);
          return updatedList;
        });
      }
      setIsLoading(false);
    };

    initializeTokens();
  }, [token]);

  if (!isConnected) {
    return <div>Please connect your wallet</div>;
  }

  if (!provider || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Widget
      client="Memecoin Fiesta"
      enableDexes="kyberswap-elastic,uniswapv3,uniswap,uniswapv2"
      provider={provider}
      title={<div>Swap Memecoin</div>}
      width={300}
      tokenList={tokenList}
      defaultTokenOut={defaultTokenOut}
    />
  );
}

export default SwapWidget;
