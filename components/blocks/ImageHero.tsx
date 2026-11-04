import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc'
import { sbImage } from '@/lib/storyblok-helpers'

export function ImageHero({ blok }: { blok: SbBlokData & Record<string, any> }) {
  const { eyebrow, heading, image } = blok
  const imageUrl = sbImage(image, 800)
  return (
    <section {...storyblokEditable(blok)} className="brand-gradient relative overflow-hidden text-white">
      <div className="container-x relative z-10 flex flex-col items-center py-20 md:py-28 text-center">
        {eyebrow && (
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.14em] text-white/80">{eyebrow}</p>
        )}
        {heading && (
          <h1 className="mx-auto max-w-3xl text-3xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-balance">
            {heading}
          </h1>
        )}
        {imageUrl && (
          <img src={imageUrl} alt={image?.alt || ''}
            className={`${heading || eyebrow ? 'mt-12' : ''} w-full max-w-sm rounded-[var(--radius-card)] shadow-2xl`} />
        )}
      </div>
    </section>
  )
}
