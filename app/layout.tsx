import type { Metadata } from 'next'
import { Bricolage_Grotesque } from 'next/font/google'
import { draftMode } from 'next/headers'
import { VisualEditing } from 'next-sanity/visual-editing'
import './globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { DraftModeBanner } from '@/components/DraftModeBanner'
import { HideOnStudio } from '@/components/HideOnStudio'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/lib/types'

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
})

const FALLBACK_TITLE = 'hoi startup factory — Harbour of ideas'
const FALLBACK_DESCRIPTION =
  'Wir verbinden Wissenschaft, Wirtschaft und Gründergeist im Nordwesten und machen aus Forschung marktfähige Ausgründungen.'

/* Site-wide title/description now come from Site settings → SEO defaults in the Studio. */
export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: SETTINGS_QUERY, stega: false })
  const settings = data as SiteSettings | null
  return {
    title: settings?.siteTitle || FALLBACK_TITLE,
    description: settings?.siteDescription || FALLBACK_DESCRIPTION,
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode()
  const { data } = await sanityFetch({ query: SETTINGS_QUERY })
  const settings = data as SiteSettings | null

  return (
    <html lang="de" className={bricolageGrotesque.variable}>
      <body>
        <HideOnStudio><Header settings={settings ?? undefined} /></HideOnStudio>
        <main>{children}</main>
        <HideOnStudio><Footer settings={settings ?? undefined} /></HideOnStudio>

        {/* Live updates: published changes appear without a redeploy */}
        <SanityLive />
        {/* Click-to-edit overlays, only while previewing from the Studio */}
        {isDraftMode && (
          <>
            <VisualEditing />
            <DraftModeBanner />
          </>
        )}
      </body>
    </html>
  )
}
