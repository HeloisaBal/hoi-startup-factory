import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc'
import { SectionHeading } from '../ui'
import { sbImage } from '@/lib/storyblok-helpers'

export function TextImage({ blok }: { blok: SbBlokData & Record<string, any> }) {
  const { eyebrow, heading, body, bullets, image, image_side, background } = blok
  const flip = image_side === 'left'
  const imageUrl = sbImage(image, 1000, 750)
  // bullets: one per line in a "Textarea" field
  const bulletList: string[] = (bullets || '').split('\n').map((b: string) => b.trim()).filter(Boolean)

  return (
    <section {...storyblokEditable(blok)} className={background === 'surface' ? 'bg-surface py-20 md:py-28' : 'py-20 md:py-28'}>
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={flip ? 'lg:order-2' : ''}>
            <SectionHeading eyebrow={eyebrow} heading={heading} />
            {body && <p className="mt-5 text-lg text-muted leading-relaxed">{body}</p>}
            {bulletList.length > 0 && (
              <ul className="mt-7 space-y-3">
                {bulletList.map((b, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">✓</span>
                    <span className="text-muted">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {imageUrl && (
            <div className={flip ? 'lg:order-1' : ''}>
              <img src={imageUrl} alt={image?.alt || ''}
                className="w-full rounded-[var(--radius-card)] object-cover shadow-lg" />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
