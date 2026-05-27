import type { Metadata } from 'next'
import Script from 'next/script'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'SeikoScripts - YouTube Video Scripts',
  description: 'Browse and download YouTube video scripts',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <head>
        <Script 
          async 
          data-cfasync="false" 
          src="https://pl29569663.effectivecpmnetwork.com/d3ee70cf47b025074ce490bacad3b6e3/invoke.js"
          strategy="afterInteractive"
        />
        <Script 
          src="https://pl29569715.effectivecpmnetwork.com/78/4a/05/784a05af05be9d9dfa3211db7635e8ce.js"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased">
        <div id="container-d3ee70cf47b025074ce490bacad3b6e3"></div>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
