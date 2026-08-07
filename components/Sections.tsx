import { Hero } from './blocks/Hero'
import { CardGrid } from './blocks/CardGrid'

const blocks: Record<string, any> = { hero: Hero, cardGrid: CardGrid }

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