import { type SchemaTypeDefinition } from 'sanity'

import { hero } from './blocks/hero'
import { cardGrid } from './blocks/cardGrid'
import { page } from './documents/page'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, hero, cardGrid],
}