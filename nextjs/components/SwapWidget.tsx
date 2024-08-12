'use client'

// import { Widget } from '@kyberswap/widgets'
// import {  useEthersProvider } from '@/provider'
// import { config } from '@/config'
// import { useState, useEffect } from 'react'
// import { useEthersSigner } from '@/signer'

// export default function SwapWidget() {
  
//   // const [provider, setProvider] = useState<providers.Provider | undefined>(undefined);

//   // useEffect(() => {
//   //   // Assuming you have a config object and possibly a chainId
//   //   const ethersProvider = getEthersProvider(config, { chainId: 1 }); // Example chainId: 1 for Ethereum mainnet
//   //   setProvider(ethersProvider);
//   // }, []);

//   // if (!provider) {
//   //   return <div>Loading...</div>;
//   // }
//   const provider = useEthersProvider();

//   return (
//     <Widget
//       client="Memecoin Fiesta"
//       enableDexes="kyberswap-elastic,uniswapv3,uniswap"
//       provider={provider}
//       title={<div>Swap Memecoin</div>}
//       width={360}
//     />
//   );
// }

// File: components/SwapWidget.tsx

import { useState, useEffect } from 'react'
import { ethers, providers  } from 'ethers'
import { Widget } from '@kyberswap/widgets'
import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers5/react'

const tokenList = [
  {
    "name": "Mister Miggles",
    "address": "0xB1a03EdA10342529bBF8EB700a06C60441fEf25d",
    "symbol": "MIGGLES",
    "decimals": 18,
    "chainId": 8453,
    "logoURI" :""

  }
]
function SwapWidget() {
  const { address, chainId, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const [provider, setProvider] = useState<providers.Web3Provider | null>(null)

  useEffect(() => {
    if (isConnected && walletProvider) {
      const newProvider = new providers.Web3Provider(walletProvider as providers.ExternalProvider)
      setProvider(newProvider)
    } else {
      setProvider(null)
    }
  }, [isConnected, walletProvider])

  if (!isConnected) {
    return <div>Please connect your wallet</div>
  }

  if (!provider) {
    return <div>Loading...</div>
  }

  return (
      <Widget
        client="Memecoin Fiesta"
        enableDexes="kyberswap-elastic,uniswapv3,uniswap"
        provider={provider}
        title={<div>Swap Memecoin</div>}
        width={360}
        tokenList={tokenList}
      />
  )
}

export default SwapWidget