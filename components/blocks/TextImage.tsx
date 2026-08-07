import { urlFor } from '@/sanity/lib/image'
import { SectionHeading } from '../ui'

export function TextImage({ eyebrow, heading, body, bullets, image, imageSide, background }: any) {
  const flip = imageSide === 'left'
  return (
    <section className={background === 'surface' ? 'bg-surface py-20 md:py-28' : 'py-20 md:py-28'}>
      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className={flip ? 'lg:order-2' : ''}>
            <SectionHeading eyebrow={eyebrow} heading={heading} />
            {body && <p className="mt-5 text-lg text-muted leading-relaxed">{body}</p>}
            {bullets?.length > 0 && (
              <ul className="mt-7 space-y-3">
                {bullets.map((b: string, i: number) => (
                  <li key={i} className="flex gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                      ✓
                    </span>
                    <span className="text-muted">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {image && (
            <div className={flip ? 'lg:order-1' : ''}>
              <img
                src={urlFor(image).width(1000).height(750).fit('crop').url()}
                alt={image.alt || ''}
                className="w-full rounded-[var(--radius-card)] object-cover shadow-lg"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
