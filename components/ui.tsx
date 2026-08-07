import Link from 'next/link'

/* ---------- Button ---------- */
export function Button({
  href, children, variant = 'solid', size = 'md',
}: { href: string; children: React.ReactNode; variant?: 'solid' | 'outline' | 'ghost'; size?: 'md' | 'lg' }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600'
  const sizes = { md: 'px-5 py-2.5 text-sm', lg: 'px-7 py-3.5 text-base' }
  const variants = {
    solid: 'bg-brand-600 text-white hover:bg-brand-700 hover:-translate-y-0.5 shadow-sm hover:shadow-md',
    outline: 'border border-brand-600 text-brand-700 hover:bg-brand-50',
    ghost: 'text-brand-700 hover:bg-brand-50',
  }
  return (
    <Link href={href} className={`${base} ${sizes[size]} ${variants[variant]}`}>
      {children}
    </Link>
  )
}

/* ---------- Section heading ---------- */
export function SectionHeading({
  eyebrow, heading, intro, align = 'left',
}: { eyebrow?: string; heading?: string; intro?: string; align?: 'left' | 'center' }) {
  if (!heading && !eyebrow) return null
  return (
    <div className={align === 'center' ? 'text-center max-w-2xl mx-auto' : 'max-w-2xl'}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      {heading && (
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{heading}</h2>
      )}
      {intro && <p className="mt-4 text-lg text-muted leading-relaxed">{intro}</p>}
    </div>
  )
}

/* ---------- Icons (inline SVG, no dependency) ---------- */
const paths: Record<string, React.ReactNode> = {
  compass: <><circle cx="12" cy="12" r="9" /><path d="m15.5 8.5-2 5-5 2 2-5z" /></>,
  beaker: <><path d="M9 3h6M10 3v6L5.6 17.4A2 2 0 0 0 7.4 20h9.2a2 2 0 0 0 1.8-2.6L14 9V3" /><path d="M7.5 14h9" /></>,
  handshake: <><path d="m11 17 2 2a1.4 1.4 0 0 0 2-2" /><path d="m14 15 2.5 2.5a1.4 1.4 0 0 0 2-2L14 11" /><path d="M3 11l3-3 3.5 3.5a1.4 1.4 0 0 0 2-2L8 6l2-2 3 1 4-1 4 4-3 3" /><path d="M3 11l3 3" /></>,
  rocket: <><path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2" /><path d="M14.5 4.5c3-3 6.5-2.5 6.5-2.5s.5 3.5-2.5 6.5L14 13l-3-3z" /><circle cx="16" cy="8" r="1.2" /><path d="M11 10 8 9l-2 3 3 1" /><path d="m14 13 1 3-3 2-1-3" /></>,
  coins: <><circle cx="9" cy="9" r="5" /><path d="M14.5 5.3A5 5 0 0 1 15 19a5 5 0 0 1-3.6-1.5" /></>,
  anchor: <><circle cx="12" cy="5" r="2" /><path d="M12 7v14M5 13a7 7 0 0 0 14 0M3 13h4M17 13h4" /></>,
}

export function Icon({ name, className = '' }: { name?: string; className?: string }) {
  const d = paths[name || 'compass'] ?? paths.compass
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {d}
    </svg>
  )
}
