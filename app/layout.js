import { Playfair_Display, Lato } from 'next/font/google'
import '@/Styles/globals.css'
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react';
import '@/Styles/webflow.css'
import '@/Styles/lira-contest-3bca65.webflow.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair-display'
})
const lato = Lato({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lato'
})

export const metadata = {
  title: 'Międzynarodowy Konkurs Pianistyczny Gabriela Weiss in Memoriam',
  description: 'Międzynarodowy Konkurs Pianistyczny Gabriela Weiss in Memoriam',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pl">
      <body className={`${lato.variable} ${lato.variable}`}>
          <div className="h-screen overflow-auto bg-black">
            {children}
        </div>
      </body>
      <SpeedInsights />
      <Analytics />
    </html>
  )
}
