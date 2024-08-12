

import './globals.css'

import { AppKit } from '../context'
import { ScriptsBlock } from '../components/ScriptsBlock'

export const metadata = {
  title: 'Memecoin Fiesta',
}

export default function RootLayout({ children } : { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppKit>
          <ScriptsBlock />
            {children}
        </AppKit>
      </body>
    </html>
  )
}