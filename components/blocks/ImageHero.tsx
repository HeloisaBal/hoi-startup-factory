import { urlFor } from '@/sanity/lib/image'

export function ImageHero({ eyebrow, heading, image }: any) {
  return (
    <section className="brand-gradient relative overflow-hidden text-white">
      <div className="container-x relative z-10 flex flex-col items-center py-20 md:py-28 text-center">
        {eyebrow && (
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-white/80">
            {eyebrow}
          </p>
        )}

        {heading && (
          <h1 className="mx-auto max-w-3xl text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-balance">
            {heading}
          </h1>
        )}

        {image && (
          <img
            src={urlFor(image).width(800).url()}
            alt={image.alt || ''}
            className={`${heading || eyebrow ? 'mt-12' : ''} w-full max-w-sm rounded-[var(--radius-card)] shadow-2xl`}
          />
        )}
      </div>
    </section>
  )
}
