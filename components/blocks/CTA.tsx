import { stegaClean } from 'next-sanity'

export function CTA({ eyebrow, heading, body, buttonLabel, buttonHref }: any) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-[2rem] bg-brand-600 px-8 py-16 md:px-16 md:py-20 text-center text-white">
          <div aria-hidden className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
          <div aria-hidden className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-accent-400/20 blur-2xl" />

          <div className="relative mx-auto max-w-2xl">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-brand-100">{eyebrow}</p>
            )}
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-balance">{heading}</h2>
            {body && <p className="mt-5 text-lg leading-relaxed text-brand-50">{body}</p>}
            {buttonLabel && (
              <div className="mt-9 flex justify-center">
                <a href={stegaClean(buttonHref) || '#'}
                  className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 transition hover:-translate-y-0.5 hover:shadow-lg">
                  {buttonLabel}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
