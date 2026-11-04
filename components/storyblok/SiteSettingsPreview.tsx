import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { toSiteSettings } from '@/lib/settings'

/**
 * What the Visual Editor shows when you open the "Site settings" story:
 * the header and footer, updating live as you type.
 */
export function SiteSettingsPreview({ blok }: { blok: SbBlokData & Record<string, any> }) {
  const settings = toSiteSettings(blok)
  return (
    <div {...storyblokEditable(blok)} className="bg-surface">
      <p className="container-x py-6 text-sm text-muted">
        Header &amp; footer preview — these appear on every page once published.
      </p>
      <Header settings={settings} />
      <div className="h-40" />
      <Footer settings={settings} />
    </div>
  )
}
