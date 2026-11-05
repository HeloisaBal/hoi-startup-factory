'use client'

import { usePathname } from 'next/navigation'

/** Hides the website's own header/footer inside the editor (/studio), so the editor shows only the editor. */
export function HideOnStudio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname?.startsWith('/studio')) return null
  return <>{children}</>
}
