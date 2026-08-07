import { urlFor } from '@/sanity/lib/image'
import { SectionHeading } from '../ui'

function Logo({ logo }: { logo: any }) {
  return (
    <div className="flex h-16 w-40 shrink-0 items-center justify-center px-4">
      <img
        src={urlFor(logo.image).width(300).url()}
        alt={logo.name}
        className="max-h-12 w-auto object-contain opacity-60 grayscale transition hover:opacity-100 hover:grayscale-0"
      />
    </div>
  )
}

export function LogoWall({ eyebrow, heading, logos, scroll = true }: any) {
  if (!logos?.length) return null

  return (
    <section className="border-y border-line bg-surface py-16 md:py-20">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} heading={heading} align="center" />
      </div>

      {scroll ? (
        <div className="marquee-mask mt-12 overflow-hidden">
          <div className="animate-marquee flex w-max">
            {[...logos, ...logos].map((l: any, i: number) => <Logo key={`${l._key}-${i}`} logo={l} />)}
          </div>
        </div>
      ) : (
        <div className="container-x mt-12">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-6">
            {logos.map((l: any) => <Logo key={l._key} logo={l} />)}
          </div>
        </div>
      )}
    </section>
  )
}
