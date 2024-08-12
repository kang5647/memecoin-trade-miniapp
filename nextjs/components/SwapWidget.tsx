'use client'

import { useState, useEffect } from 'react'
import {  BrowserProvider  } from 'ethers'
import { Widget } from '@kyberswap/widgets'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react'

const tokenList = [
  {
    "name": "Mister Miggles",
    "address": "0xB1a03EdA10342529bBF8EB700a06C60441fEf25d",
    "symbol": "MIGGLES",
    "decimals": 18,
    "chainId": 8453,
    "logoURI" :""

  }, 
  
]

const defaultTokenOut = "0xB1a03EdA10342529bBF8EB700a06C60441fEf25d"

function SwapWidget() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  let provider = null
  useEffect(() => {
    if (isConnected && walletProvider) {
      provider = new BrowserProvider(walletProvider)
    } else {
    }
  }, [isConnected, walletProvider])

  if (!isConnected) {
    return <div>Please connect your wallet</div>
  }

  if (!walletProvider) {
    return <div>Loading...</div>
  }

  return (
      <Widget
        client="Memecoin Fiesta"
        enableDexes="kyberswap-elastic,uniswapv3,uniswap"
        provider={provider}
        title={<div>Swap Memecoin</div>}
        width={300}
        tokenList={tokenList}
        defaultTokenOut= {defaultTokenOut}
      />
  )
}

export default SwapWidget