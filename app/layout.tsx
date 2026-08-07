import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
  title: 'hoi startup factory — Harbour of ideas',
  description:
    'Wir verbinden Wissenschaft, Wirtschaft und Gründergeist im Nordwesten und machen aus Forschung marktfähige Ausgründungen.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
