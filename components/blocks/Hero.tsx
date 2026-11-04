import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc'
import { sbHref, sbImage } from '@/lib/storyblok-helpers'

export function Hero({ blok }: { blok: SbBlokData & Record<string, any> }) {
  const { eyebrow, heading, heading_mark, subheading, buttons, image } = blok
  const imageUrl = sbImage(image, 1600, 700)
  return (
    <section {...storyblokEditable(blok)} className="brand-gradient relative overflow-hidden text-white">
      <div className="container-x relative z-10 pt-20 pb-32 md:pt-28 md:pb-40 text-center">
        {eyebrow && (
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-white/80">{eyebrow}</p>
        )}

        <h1 className="mx-auto max-w-4xl text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase leading-[1.05] tracking-tight text-balance">
          {heading}
          {heading_mark && (
            <>
              <br />
              <span className="mark">{heading_mark}</span>
            </>
          )}
        </h1>

        {subheading && (
          <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-white/90">
            {subheading}
          </p>
        )}

        {buttons?.length > 0 && (
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {buttons.map((b: any) =>
              b.style === 'outline' ? (
                <a key={b._uid} {...storyblokEditable(b)} href={sbHref(b.link)}
                  className="inline-flex items-center rounded-full border-2 border-white/70 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-white/10">
                  {b.label}
                </a>
              ) : (
                <a key={b._uid} {...storyblokEditable(b)} href={sbHref(b.link)}
                  className="inline-flex items-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-brand-700 transition hover:-translate-y-0.5 hover:shadow-xl">
                  {b.label}
                </a>
              )
            )}
          </div>
        )}
      </div>

      {/* Bremen skyline — decorative, sits at the bottom of the hero */}
      <img src="/skyline.png" alt="" aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 w-full select-none opacity-90 mix-blend-multiply" />

      {imageUrl && (
        <div className="container-x relative z-10 -mb-24 pb-8">
          <img src={imageUrl} alt={image?.alt || ''} className="w-full rounded-[2rem] object-cover shadow-2xl" />
        </div>
      )}
    </section>
  )
}
