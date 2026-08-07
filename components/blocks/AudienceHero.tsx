import Link from 'next/link'

/* ---------- icons ---------- */
const icons: Record<string, React.ReactNode> = {
  student: (
    <>
      <path d="M12 4 2 9l10 5 10-5-10-5Z" />
      <path d="M5 11v5.5c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V11" />
      <path d="M20 9.5V15" />
    </>
  ),
  investor: (
    <>
      <path d="M3 20h18" />
      <path d="M6 20v-6M11 20V9M16 20v-9M21 20V5" />
      <path d="m4 11 5-5 4 3 6-6" />
    </>
  ),
  startup: (
    <>
      <path d="M5 13c-1.5 1.5-2 5-2 5s3.5-.5 5-2" />
      <path d="M14.5 4.5c3-3 6.5-2.5 6.5-2.5s.5 3.5-2.5 6.5L14 13l-3-3z" />
      <circle cx="16" cy="8" r="1.2" />
      <path d="M11 10 8 9l-2 3 3 1M14 13l1 3-3 2-1-3" />
    </>
  ),
  company: (
    <>
      <path d="M3 21h18M5 21V5a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v16M14 21V9h4a1 1 0 0 1 1 1v11" />
      <path d="M8 8h3M8 12h3M8 16h3" />
    </>
  ),
  researcher: (
    <>
      <path d="M9 3h6M10 3v6L5.6 17.4A2 2 0 0 0 7.4 20h9.2a2 2 0 0 0 1.8-2.6L14 9V3" />
      <path d="M7.5 14h9" />
    </>
  ),
}

function Icon({ name }: { name?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
      aria-hidden="true"
    >
      {icons[name || 'student'] ?? icons.student}
    </svg>
  )
}

/* ---------- block ---------- */
export function AudienceHero({ eyebrow, question, subtext, cards }: any) {
  return (
    <section className="brand-gradient relative overflow-hidden text-white">
      <div className="container-x relative z-10 pt-20 pb-32 md:pt-24 md:pb-44 text-center">
        {eyebrow && (
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
            {eyebrow}
          </p>
        )}

        <h1 className="mx-auto max-w-3xl text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight text-balance">
          {question}
        </h1>

        {subtext && (
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85">
            {subtext}
          </p>
        )}

        {/* floating cards */}
        <div className="mt-14 flex flex-wrap justify-center gap-5 md:gap-7">
          {cards?.map((card: any, i: number) => (
            <Link
              key={card._key}
              href={card.href || '#'}
              className="group float-card relative w-full max-w-[16rem] sm:w-64 rounded-[1.5rem] border border-white/25 bg-white/12 p-7 text-left backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-white/50 hover:bg-white/20 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              style={{ animationDelay: `${i * 0.9}s` }}
            >
              <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 text-white transition-colors duration-300 group-hover:bg-white group-hover:text-brand-600">
                <Icon name={card.icon} />
              </span>

              <span className="block text-xl font-bold leading-snug">{card.label}</span>

              {card.description && (
                <span className="mt-2 block text-sm leading-relaxed text-white/80">
                  {card.description}
                </span>
              )}

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold">
                Weiter
                <span className="transition-transform duration-300 group-hover:translate-x-1.5">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Bremen skyline */}
      <img
        src="/skyline.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none opacity-90 mix-blend-multiply"
      />
    </section>
  )
}
