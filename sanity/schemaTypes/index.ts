import { type SchemaTypeDefinition } from 'sanity'

import { hero } from './blocks/hero'
import { audienceHero } from './blocks/audienceHero'
import { imageHero } from './blocks/imageHero'
import { featureGrid } from './blocks/featureGrid'
import { stats } from './blocks/stats'
import { textImage } from './blocks/textImage'
import { logoWall } from './blocks/logoWall'
import { cta } from './blocks/cta'
import { page } from './documents/page'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, hero, audienceHero, imageHero, featureGrid, stats, textImage, logoWall, cta],
}
