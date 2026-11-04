import 'server-only'

/**
 * Read token (Viewer role) — lets the site fetch DRAFT content in preview mode.
 * Create it at sanity.io/manage → project → API → Tokens, put it in SANITY_API_READ_TOKEN.
 * Never prefix it with NEXT_PUBLIC_.
 */
export const token = process.env.SANITY_API_READ_TOKEN

if (!token) {
  console.warn('SANITY_API_READ_TOKEN is not set — visual editing / draft preview will not work.')
}
