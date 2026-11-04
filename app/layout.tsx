import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { getStory } from '@/lib/storyblok'
import { toSiteSettings } from '@/lib/settings'

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
})

const FALLBACK_TITLE = 'hoi startup factory — Harbour of ideas'
const FALLBACK_DESCRIPTION =
  'Wir verbinden Wissenschaft, Wirtschaft und Gründergeist im Nordwesten und machen aus Forschung marktfähige Ausgründungen.'

async function getSettings() {
  return toSiteSettings((await getStory('site-settings'))?.content)
}

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings()
  return {
    title: settings?.siteTitle || FALLBACK_TITLE,
    description: settings?.siteDescription || FALLBACK_DESCRIPTION,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()
  return (
    <html lang="de" className={bricolageGrotesque.variable}>
      <body>
        <Header settings={settings} />
        <main>{children}</main>
        <Footer settings={settings} />
      </body>
    </html>
  )
}
