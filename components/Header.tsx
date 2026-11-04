'use client'

import Link from 'next/link'
import { useState } from 'react'
import { stegaClean } from 'next-sanity'

import type { Link as NavLink, SiteSettings } from '@/sanity/lib/types'

/* Used until "Site settings" is filled in the Studio. */
const fallbackNav: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Über uns', href: '/ueber-uns' },
  { label: 'Events', href: '/events' },
]
const fallbackButton = { label: 'Kontakt', href: '/kontakt' }

export function Header({ settings }: { settings?: SiteSettings }) {
  const [open, setOpen] = useState(false)

  const nav: NavLink[] = settings?.nav?.length ? settings.nav : fallbackNav
  const button = settings?.headerButton?.label ? settings.headerButton : fallbackButton
  const buttonHref = stegaClean(button.href) || '#'

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-white/90 backdrop-blur-md">
      <div className="container-x flex items-center justify-between py-4">
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((n) => (
            <Link key={n._key ?? n.href} href={stegaClean(n.href) || '#'}
              className="text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-brand-500">
              {n.label}
            </Link>
          ))}
        </nav>

        <Link href="/" className="md:absolute md:left-1/2 md:-translate-x-1/2">
          <img src="/logo.png" alt="hoi startup factory" className="h-10 w-auto" />
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          {/* TODO: language switch is not built yet — the button does nothing */}
          <button className="text-sm font-medium text-muted transition-colors hover:text-ink">EN</button>
          <Link href={buttonHref}
            className="rounded-full bg-brand-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 hover:-translate-y-0.5">
            {button.label}
          </Link>
        </div>

        <button onClick={() => setOpen(!open)} aria-label="Menü" aria-expanded={open}
          className="md:hidden p-2 -mr-2">
          <span className="mb-1.5 block h-0.5 w-6 bg-ink" />
          <span className="mb-1.5 block h-0.5 w-6 bg-ink" />
          <span className="block h-0.5 w-6 bg-ink" />
        </button>
      </div>

      {open && (
        <div className="border-t border-line bg-white md:hidden">
          <nav className="container-x flex flex-col gap-1 py-4">
            {nav.map((n) => (
              <Link key={n._key ?? n.href} href={stegaClean(n.href) || '#'} onClick={() => setOpen(false)}
                className="py-2.5 text-base font-semibold uppercase tracking-wide">
                {n.label}
              </Link>
            ))}
            <Link href={buttonHref} onClick={() => setOpen(false)}
              className="mt-3 rounded-full bg-brand-500 px-6 py-3 text-center text-sm font-semibold text-white">
              {button.label}
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
