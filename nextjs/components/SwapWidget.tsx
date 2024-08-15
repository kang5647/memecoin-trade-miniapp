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

  const darkTheme = {
    text: "#ffffff", // White text for high contrast
    subText: "#a0aec0", // Soft gray for secondary text
    primary: "#1a202c", // Very dark blue-gray for primary background
    dialog: "#2d3748", // Slightly lighter dark blue-gray for dialogs
    secondary: "#4a5568", // Medium gray for secondary elements
    interactive: "#4299e1", // Bright blue for interactive elements
    stroke: "#718096", // Medium-light gray for borders
    accent: "#ed64a6", // Bright pink for accents
    success: "#48bb78", // Green for success states
    warning: "#ecc94b", // Yellow for warnings
    error: "#f56565", // Red for errors
    fontFamily: "Open Sans", // Modern, clean font
    borderRadius: "12px", // Rounded corners for containers
    buttonRadius: "8px", // Slightly less rounded for buttons
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)", // Subtle shadow for depth
  };

  return (
    <Widget
      client="Memecoin Fiesta"
      enableDexes="kyberswap-elastic,uniswapv3,uniswap,uniswapv2"
      provider={provider}
      title={<div>Swap Memecoin</div>}
      width={310}
      tokenList={tokenList}
      defaultTokenOut={defaultTokenOut}
      theme={darkTheme}
    />
  );
}

export default SwapWidget;
