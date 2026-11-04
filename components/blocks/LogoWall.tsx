import { storyblokEditable, type SbBlokData } from '@storyblok/react/rsc'
import { SectionHeading } from '../ui'
import { sbImage } from '@/lib/storyblok-helpers'

function Logo({ logo }: { logo: any }) {
  const src = sbImage(logo.image, 300)
  if (!src) return null
  return (
    <div className="flex h-16 w-40 shrink-0 items-center justify-center px-4">
      <img src={src} alt={logo.name}
        className="max-h-12 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0" />
    </div>
  )
}

export function LogoWall({ blok }: { blok: SbBlokData & Record<string, any> }) {
  const { eyebrow, heading, logos, scroll = true } = blok
  if (!logos?.length) return null

  return (
    <section {...storyblokEditable(blok)} className="border-y border-line bg-surface py-16 md:py-20">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} heading={heading} align="center" />
      </div>

      {scroll ? (
        <div className="marquee-mask mt-12 overflow-hidden">
          <div className="animate-marquee flex w-max">
            {[...logos, ...logos].map((l: any, i: number) => <Logo key={`${l._uid}-${i}`} logo={l} />)}
          </div>
        </div>
      ) : (
        <div className="container-x mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6">
            {logos.map((l: any) => <Logo key={l._uid} logo={l} />)}
          </div>
        </div>
      )}
    </section>
  )
}
