import Link from 'next/link'

import type { Link as FooterLink, SiteSettings } from '@/lib/settings'

type Column = NonNullable<SiteSettings['footerColumns']>[number]

/* Used until "Site settings" is filled in the Studio. */
const fallback = {
  tagline: 'Harbour of ideas — wir verbinden Wissenschaft, Wirtschaft und Gründergeist im Nordwesten.',
  address: 'Arberger Hafendamm 1\n28309 Bremen',
  copyright: 'hoi startup factory GmbH, Bremen',
  columns: [
    { title: 'Angebot', links: [
      { label: 'Science Start-up Funnel', href: '/programm' },
      { label: 'Venture Studio', href: '/programm' },
      { label: 'Corporate Cooperations', href: '/programm' },
      { label: 'Kapital & Netzwerk', href: '/programm' },
    ]},
    { title: 'Über hoi', links: [
      { label: 'Über uns', href: '/ueber-uns' },
      { label: 'Partner', href: '/partner' },
      { label: 'News', href: '/news' },
    ]},
    { title: 'Kontakt', links: [
      { label: 'team@hoi-startup-factory.de', href: 'mailto:team@hoi-startup-factory.de' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/hoi-startup-factory/' },
    ]},
  ] as Column[],
  legal: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
  ] as FooterLink[],
}

export function Footer({ settings }: { settings?: SiteSettings }) {
  const tagline = settings?.footerTagline || fallback.tagline
  const address: string = settings?.address || fallback.address
  const columns: Column[] = settings?.footerColumns?.length ? settings.footerColumns : fallback.columns
  const legal: FooterLink[] = settings?.legalLinks?.length ? settings.legalLinks : fallback.legal
  const copyright = settings?.copyright || fallback.copyright

  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="/logo-white.png" alt="hoi startup factory" className="h-10 w-auto" />
            <p className="mt-8 text-sm leading-relaxed text-brand-200">{tagline}</p>
            <p className="mt-5 whitespace-pre-line text-sm text-brand-300">{address}</p>
          </div>

          {columns.map((col) => (
            <div key={col._key ?? col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-teal-400">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links?.map((l) => (
                  <li key={l._key ?? l.label}>
                    <Link href={l.href || '#'} className="text-sm text-brand-200 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {copyright}</p>
          <div className="flex gap-6">
            {legal.map((l) => (
              <Link key={l._key ?? l.label} href={l.href || '#'} className="hover:text-white">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
