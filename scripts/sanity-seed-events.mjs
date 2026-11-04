#!/usr/bin/env node
/**
 * Adds the demo events to the Sanity dataset (one a week, dates relative to today)
 * and an "Upcoming events" section to the homepage, plus an "Events" link in the menu.
 * Safe to run again: it refreshes the demo events' dates and never duplicates anything.
 *
 * Needs in .env.local (besides the usual NEXT_PUBLIC_SANITY_* values):
 *   SANITY_API_WRITE_TOKEN=...   sanity.io/manage → API → Tokens → Add API token, role "Editor".
 *                                Only needed for this script — do NOT add it to Vercel.
 *
 *   npm run sanity:seed-events
 */
import { randomUUID } from 'node:crypto'
import { createClient } from '@sanity/client'
import { demoEvents } from './demo-events.mjs'

const { NEXT_PUBLIC_SANITY_PROJECT_ID: projectId, NEXT_PUBLIC_SANITY_DATASET: dataset, SANITY_API_WRITE_TOKEN: token } = process.env
if (!projectId || !dataset || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET or SANITY_API_WRITE_TOKEN in .env.local')
  process.exit(1)
}
const client = createClient({ projectId, dataset, token, apiVersion: '2026-08-07', useCdn: false, perspective: 'raw' }) // raw: also see and patch drafts
const key = () => randomUUID().slice(0, 12)

/* 1. events (fixed ids → re-running updates instead of duplicating) */
const tx = client.transaction()
for (const e of demoEvents) {
  tx.createOrReplace({
    _id: e.key,
    _type: 'event',
    title: e.title,
    slug: { _type: 'slug', current: e.slug },
    start: e.start,
    end: e.end,
    category: e.category,
    location: e.location,
    summary: e.summary,
    description: e.description,
    registrationUrl: e.registrationUrl,
    registrationLabel: e.registrationLabel,
    repeat: e.repeat,
  })
}
await tx.commit()
console.log(`  ${demoEvents.length} demo events created/updated`)

/* 2. homepage: add an "Upcoming events" section after the first section, if there isn't one */
const homes = await client.fetch(`*[_type == "page" && slug.current == "home"]{ _id, "has": count(sections[_type == "upcomingEvents"]) > 0 }`)
if (homes.length === 0) console.log('  no homepage (slug "home") found — add the section yourself in the Studio')
for (const home of homes) {
  if (home.has) { console.log(`  ${home._id}: already has an Upcoming events section`); continue }
  await client
    .patch(home._id)
    .setIfMissing({ sections: [] })
    .insert('after', 'sections[0]', [{
      _key: key(), _type: 'upcomingEvents',
      eyebrow: 'Events', heading: 'Jede Woche bei hoi',
      intro: 'Workshops, Pitch Nights und Meetups — kommen Sie vorbei.',
      count: 3, showLink: true,
    }])
    .commit()
  console.log(`  ${home._id}: added Upcoming events section`)
}

/* 3. menu: add "Events" if Site settings has a menu without it */
const settings = await client.fetch(`*[_type == "siteSettings"]{ _id, "has": count(nav[href == "/events"]) > 0, "hasNav": count(nav) > 0 }`)
for (const s of settings) {
  if (!s.hasNav || s.has) continue // empty menu → the site's built-in menu (which includes Events) is used
  await client.patch(s._id).append('nav', [{ _key: key(), _type: 'link', label: 'Events', href: '/events' }]).commit()
  console.log(`  ${s._id}: added "Events" to the menu`)
}

console.log('\nDone. Open /studio → Events.')
