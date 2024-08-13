'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { ReactNode } from 'react'

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

const base = {
  chainId: 8453,
  name: 'Base Mainnet',
  currency: 'ETH',
  explorerUrl: 'https://base.blockscout.com',
  rpcUrl: 'https://mainnet.base.org'
}

const bsc = {
  chainId: 56,
  name: 'Binance Smart Chain',
  currency: 'BNB',
  explorerUrl: 'https://bscscan.com',
  rpcUrl: 'https://bsc-dataseed.binance.org/'
}

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,
  auth: {
    email: true, // default to true
    socials: ['google', 'x', 'github', 'discord', 'apple', 'facebook', 'farcaster'],
    showWallets: true, // default to true
    walletFeatures: true // default to true
  },
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1 // used for the Coinbase SDK
})

// 5. Create a AppKit instance
createWeb3Modal({
  ethersConfig,
  chains: [base],
  projectId,
  enableAnalytics: true, 
  themeVariables: {
    '--w3m-accent': '#000000',
  },
  enableOnramp: true,
})


export function AppKit({ children }: { children: ReactNode }) {
  return children
}