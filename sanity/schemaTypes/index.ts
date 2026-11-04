import { type SchemaTypeDefinition } from 'sanity'

import { hero } from './blocks/hero'
import { audienceHero } from './blocks/audienceHero'
import { imageHero } from './blocks/imageHero'
import { featureGrid } from './blocks/featureGrid'
import { stats } from './blocks/stats'
import { textImage } from './blocks/textImage'
import { logoWall } from './blocks/logoWall'
import { cta } from './blocks/cta'
import { upcomingEvents } from './blocks/upcomingEvents'
import { event } from './documents/event'
import { page } from './documents/page'
import { siteSettings } from './documents/siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [siteSettings, page, event, upcomingEvents, hero, audienceHero, imageHero, featureGrid, stats, textImage, logoWall, cta],
}

/** Document types that exist exactly once (no "create new", no delete/duplicate). */
export const singletonTypes = new Set(['siteSettings'])
