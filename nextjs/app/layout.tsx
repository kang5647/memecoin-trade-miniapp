// import './globals.css'
// import type { Metadata } from 'next'
// import { headers } from 'next/headers'
// import { cookieToInitialState } from 'wagmi'
// import { config } from '@/config'
// import Web3Provider from '@/context'

// export const metadata: Metadata = {
//   title: 'KyberSwap Widget with WalletConnect',
//   description: 'Swap tokens easily with KyberSwap and WalletConnect'
// }

// export default function RootLayout({
//   children
// }: Readonly<{
//   children: React.ReactNode
// }>) {
//   const initialState = cookieToInitialState(config, headers().get('cookie'))
//   return (
//     <html lang="en">
//       <body>
//         <Web3Provider initialState={initialState}>{children}</Web3Provider>
//       </body>
//     </html>
//   )
// }

import './globals.css'

import { AppKit } from '../context'

export const metadata = {
  title: 'AppKit',
  description: 'AppKit Example'
}

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppKit>{children}</AppKit>
      </body>
    </html>
  )
}