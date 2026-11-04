import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, studioUrl } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  // Stega = invisible markers in text that tell the click-to-edit overlay which field
  // a piece of text came from. Only switched on in draft mode (see sanity/lib/live.ts).
  stega: { studioUrl },
})
