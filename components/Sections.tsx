import { Hero } from './blocks/Hero'
import { AudienceHero } from './blocks/AudienceHero'
import { FeatureGrid } from './blocks/FeatureGrid'
import { Stats } from './blocks/Stats'
import { TextImage } from './blocks/TextImage'
import { LogoWall } from './blocks/LogoWall'
import { CTA } from './blocks/CTA'

/* Add a new block: import it, add one line here, done. */
const blocks: Record<string, any> = {
  hero: Hero,
  audienceHero: AudienceHero,
  featureGrid: FeatureGrid,
  stats: Stats,
  textImage: TextImage,
  logoWall: LogoWall,
  cta: CTA,
}

export function Sections({ sections }: { sections?: any[] }) {
  if (!sections) return null
  return (
    <>
      {sections.map((section) => {
        const Block = blocks[section._type]
        return Block ? <Block key={section._key} {...section} /> : null
      })}
    </>
  )
}
