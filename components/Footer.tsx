import Link from 'next/link'

const columns = [
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
]

export function Footer() {
  return (
    <footer className="bg-brand-950 text-brand-100">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img src="/logo-white.png" alt="hoi startup factory" className="h-10 w-auto" />
            <p className="mt-8 text-sm leading-relaxed text-brand-200">
              Harbour of ideas — wir verbinden Wissenschaft, Wirtschaft und Gründergeist
              im Nordwesten.
            </p>
            <p className="mt-5 text-sm text-brand-300">
              Arberger Hafendamm 1<br />28309 Bremen
            </p>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.14em] text-teal-400">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-brand-200 transition-colors hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} hoi startup factory GmbH, Bremen</p>
          <div className="flex gap-6">
            <Link href="/impressum" className="hover:text-white">Impressum</Link>
            <Link href="/datenschutz" className="hover:text-white">Datenschutz</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
