'use client'

import { createDataAttribute } from 'next-sanity'
import { useOptimistic } from 'next-sanity/hooks'
import { Hero } from './blocks/Hero'
import { AudienceHero } from './blocks/AudienceHero'
import { ImageHero } from './blocks/ImageHero'
import { FeatureGrid } from './blocks/FeatureGrid'
import { Stats } from './blocks/Stats'
import { TextImage } from './blocks/TextImage'
import { LogoWall } from './blocks/LogoWall'
import { CTA } from './blocks/CTA'
import { UpcomingEvents } from './blocks/UpcomingEvents'

/* Add a new block: import it, add one line here, done. */
const blocks: Record<string, any> = {
  hero: Hero,
  audienceHero: AudienceHero,
  imageHero: ImageHero,
  featureGrid: FeatureGrid,
  stats: Stats,
  textImage: TextImage,
  logoWall: LogoWall,
  cta: CTA,
  upcomingEvents: UpcomingEvents,
}

type Props = { documentId: string; documentType: string; sections?: any[] }

export function Sections({ documentId, documentType, sections: initial }: Props) {
  // In the Presentation tool, editors can drag sections to reorder them ON the page.
  // useOptimistic shows the new order instantly while the change is saved.
  const sections = useOptimistic<any[] | undefined, any>(initial, (current, action) => {
    if (action.id === documentId && action.document?.sections) {
      return action.document.sections.map(
        (s: any) => current?.find((c) => c._key === s._key) ?? s
      )
    }
    return current
  })

  if (!sections) return null

  return (
    <div
      data-sanity={createDataAttribute({ id: documentId, type: documentType, path: 'sections' }).toString()}
    >
      {sections.map((section) => {
        const Block = blocks[section._type]
        if (!Block) return null
        return (
          <div
            key={section._key}
            data-sanity={createDataAttribute({
              id: documentId,
              type: documentType,
              path: `sections[_key=="${section._key}"]`,
            }).toString()}
          >
            <Block {...section} />
          </div>
        )
      })}
    </div>
  )
}
