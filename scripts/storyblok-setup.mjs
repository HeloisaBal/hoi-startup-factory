#!/usr/bin/env node
/**
 * One-time setup of a Storyblok space for this site:
 *   1. creates/updates every block type from scripts/storyblok-schema.mjs
 *   2. creates the "home" page and "site-settings" stories with demo content (only if missing)
 *
 * Usage (values in .env.local):
 *   STORYBLOK_SPACE_ID=...          Settings → Space → Space ID
 *   STORYBLOK_PERSONAL_TOKEN=...    My account (top right) → Personal access tokens → Generate
 *   STORYBLOK_REGION=eu             eu | us | ca | ap
 *
 *   npm run storyblok:setup                 # safe: never overwrites existing stories
 *   npm run storyblok:setup -- --reset      # also overwrites "home" and "site-settings" with the demo content
 *   npm run storyblok:setup -- --remove-demo  # also deletes Storyblok's starter blocks (teaser, grid, feature)
 *
 * It also creates the "Events" folder with weekly demo events (if missing), adds an "Upcoming events"
 * section to Home and an "Events" menu link to Site settings (if missing). --reset also refreshes the demo events' dates.
 */
import { randomUUID } from 'node:crypto'
import { components } from './storyblok-schema.mjs'
import { demoEvents } from './demo-events.mjs'

const { STORYBLOK_SPACE_ID: space, STORYBLOK_PERSONAL_TOKEN: token, STORYBLOK_REGION: region = 'eu' } = process.env
if (!space || !token) {
  console.error('Missing STORYBLOK_SPACE_ID or STORYBLOK_PERSONAL_TOKEN (see the comment at the top of this file).')
  process.exit(1)
}
const RESET = process.argv.includes('--reset')
const REMOVE_DEMO = process.argv.includes('--remove-demo')

const BASE = {
  eu: 'https://mapi.storyblok.com',
  us: 'https://api-us.storyblok.com',
  ca: 'https://api-ca.storyblok.com',
  ap: 'https://api-ap.storyblok.com',
}[region]

async function api(method, path, body) {
  for (let attempt = 0; attempt < 5; attempt++) {
    const res = await fetch(`${BASE}/v1/spaces/${space}${path}`, {
      method,
      headers: { Authorization: token, 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
    })
    if (res.status === 429) { await new Promise((r) => setTimeout(r, 1000 * (attempt + 1))); continue } // rate limit
    const text = await res.text()
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status} ${text}`)
    return text ? JSON.parse(text) : {}
  }
  throw new Error(`${method} ${path} → rate limited`)
}

/* ---------- demo content helpers ---------- */
const uid = () => randomUUID()
const url = (u) => ({ fieldtype: 'multilink', linktype: u.startsWith('mailto:') ? 'email' : 'url',
  ...(u.startsWith('mailto:') ? { email: u.slice(7) } : { url: u, cached_url: u }) })
const navLink = (label, href) => ({ _uid: uid(), component: 'nav_link', label, link: url(href) })

const homeContent = {
  component: 'page',
  seo_title: 'hoi startup factory — Harbour of ideas',
  body: [
    {
      _uid: uid(), component: 'audience_hero',
      eyebrow: 'Founding in the Northwest',
      question: 'Wer besucht uns heute?',
      subtext: 'Wählen Sie Ihren Weg — wir zeigen Ihnen, was hoi für Sie tun kann.',
      cards: [
        { _uid: uid(), component: 'audience_card', label: 'Gründer:innen', description: 'Von der Forschung zur Ausgründung', link: url('/startups'), icon: 'startup' },
        { _uid: uid(), component: 'audience_card', label: 'Forschende', description: 'Ihre Idee marktfähig machen', link: url('/forschung'), icon: 'researcher' },
        { _uid: uid(), component: 'audience_card', label: 'Unternehmen', description: 'Kooperieren mit jungen Teams', link: url('/partner'), icon: 'company' },
      ],
    },
    {
      _uid: uid(), component: 'feature_grid',
      eyebrow: 'Angebot',
      heading: 'Was wir machen',
      intro: 'Wir verbinden Wissenschaft, Wirtschaft und Gründergeist im Nordwesten.',
      items: [
        { _uid: uid(), component: 'feature_card', title: 'Science Start-up Funnel', body: 'Aus Forschung werden Geschäftsideen.', icon: 'beaker' },
        { _uid: uid(), component: 'feature_card', title: 'Venture Studio', body: 'Gemeinsam Unternehmen aufbauen.', icon: 'rocket' },
        { _uid: uid(), component: 'feature_card', title: 'Corporate Cooperations', body: 'Etablierte Firmen treffen junge Teams.', icon: 'handshake' },
        { _uid: uid(), component: 'feature_card', title: 'Kapital & Netzwerk', body: 'Zugang zu Investoren und Partnern.', icon: 'coins' },
      ],
    },
    {
      _uid: uid(), component: 'text_image',
      eyebrow: 'Über hoi', heading: 'Harbour of ideas',
      body: 'Demo-Text: Hier steht, wer hoi ist und warum Gründen im Nordwesten Rückenwind hat. Klicken Sie im Visual Editor auf diesen Text, um ihn zu ändern.',
      bullets: 'Begleitung von der Idee bis zur Gründung\nZugang zu Forschungseinrichtungen\nStarkes regionales Netzwerk',
      image_side: 'right', background: 'surface',
    },
    {
      _uid: uid(), component: 'cta',
      heading: 'Bereit, Ihre Idee zu starten?',
      body: 'Sprechen Sie mit uns — unverbindlich.',
      button_label: 'Kontakt aufnehmen', button_link: url('mailto:team@hoi-startup-factory.de'),
    },
  ],
}

const settingsContent = {
  component: 'site_settings',
  nav: [navLink('Home', '/'), navLink('Über uns', '/ueber-uns'), navLink('Partner', '/partner')],
  header_button_label: 'Kontakt',
  header_button_link: url('/kontakt'),
  footer_tagline: 'Harbour of ideas — wir verbinden Wissenschaft, Wirtschaft und Gründergeist im Nordwesten.',
  address: 'Arberger Hafendamm 1\n28309 Bremen',
  footer_columns: [
    { _uid: uid(), component: 'footer_column', title: 'Angebot', links: [
      navLink('Science Start-up Funnel', '/programm'), navLink('Venture Studio', '/programm'),
      navLink('Corporate Cooperations', '/programm'), navLink('Kapital & Netzwerk', '/programm'),
    ]},
    { _uid: uid(), component: 'footer_column', title: 'Über hoi', links: [
      navLink('Über uns', '/ueber-uns'), navLink('Partner', '/partner'), navLink('News', '/news'),
    ]},
    { _uid: uid(), component: 'footer_column', title: 'Kontakt', links: [
      navLink('team@hoi-startup-factory.de', 'mailto:team@hoi-startup-factory.de'),
      navLink('LinkedIn', 'https://www.linkedin.com/company/hoi-startup-factory/'),
    ]},
  ],
  legal_links: [navLink('Impressum', '/impressum'), navLink('Datenschutz', '/datenschutz')],
  copyright: 'hoi startup factory GmbH, Bremen',
  site_title: 'hoi startup factory — Harbour of ideas',
  site_description: 'Wir verbinden Wissenschaft, Wirtschaft und Gründergeist im Nordwesten und machen aus Forschung marktfähige Ausgründungen.',
}

/* ---------- 1. components ---------- */
console.log(`Space ${space} (${region})`)
const { components: existing } = await api('GET', '/components')
const byName = new Map(existing.map((c) => [c.name, c]))

for (const c of components) {
  const found = byName.get(c.name)
  if (found) {
    await api('PUT', `/components/${found.id}`, { component: { ...c, id: found.id } })
    console.log(`  updated block  ${c.name}`)
  } else {
    await api('POST', '/components', { component: c })
    console.log(`  created block  ${c.name}`)
  }
}

/* ---------- 2. stories ---------- */
async function upsertStory({ name, slug, content, path }) {
  const { stories } = await api('GET', `/stories?with_slug=${slug}`)
  const story = stories?.[0]
  if (story && !RESET) {
    console.log(`  kept story     ${slug} (exists — use --reset to overwrite with demo content)`)
    return
  }
  const payload = { story: { name, slug, content, ...(path && { path }) }, publish: 1 }
  if (story) {
    await api('PUT', `/stories/${story.id}`, { ...payload, force_update: 1 })
    console.log(`  reset story    ${slug}`)
  } else {
    await api('POST', '/stories', payload)
    console.log(`  created story  ${slug}`)
  }
}

await upsertStory({ name: 'Home', slug: 'home', content: homeContent, path: '/' })
await upsertStory({ name: 'Site settings', slug: 'site-settings', content: settingsContent })

/* ---------- 3. events ---------- */
// Storyblok datetime fields are UTC "YYYY-MM-DD HH:mm"
const sbDate = (iso) => iso.slice(0, 16).replace('T', ' ')

async function findStory(fullSlug) {
  const { stories } = await api('GET', `/stories?with_slug=${encodeURIComponent(fullSlug)}`)
  return stories?.[0]
}

let folder = await findStory('events')
if (!folder) {
  ;({ story: folder } = await api('POST', '/stories', {
    story: { name: 'Events', slug: 'events', is_folder: true, default_root: 'event' },
  }))
  console.log('  created folder events/')
}

for (const e of demoEvents) {
  const content = {
    component: 'event', title: e.title, start: sbDate(e.start), end: sbDate(e.end), category: e.category,
    location: e.location, summary: e.summary, description: e.description,
    registration_link: url(e.registrationUrl), registration_label: e.registrationLabel,
  }
  const existing = await findStory(`events/${e.slug}`)
  if (existing && !RESET) continue
  const payload = { story: { name: e.title, slug: e.slug, parent_id: folder.id, content }, publish: 1 }
  if (existing) await api('PUT', `/stories/${existing.id}`, { ...payload, force_update: 1 })
  else await api('POST', '/stories', payload)
  console.log(`  ${existing ? 'reset' : 'created'} event  ${e.slug}`)
}

/* Add things to existing stories only if missing (publishes the story). */
async function patchStory(fullSlug, change) {
  const found = await findStory(fullSlug)
  if (!found) return
  const { story } = await api('GET', `/stories/${found.id}`)
  if (!change(story.content)) return
  await api('PUT', `/stories/${story.id}`, { story: { content: story.content }, publish: 1, force_update: 1 })
  console.log(`  updated story  ${fullSlug}`)
}

await patchStory('home', (c) => {
  if (!Array.isArray(c.body) || c.body.some((b) => b.component === 'upcoming_events')) return false
  c.body.splice(1, 0, {
    _uid: uid(), component: 'upcoming_events', eyebrow: 'Events', heading: 'Jede Woche bei hoi',
    intro: 'Workshops, Pitch Nights und Meetups — kommen Sie vorbei.', count: '3', show_link: true,
  })
  return true
})

await patchStory('site-settings', (c) => {
  if (!Array.isArray(c.nav) || c.nav.length === 0) return false
  if (c.nav.some((l) => (l.link?.url || l.link?.cached_url) === '/events')) return false
  c.nav.push(navLink('Events', '/events'))
  return true
})

/* ---------- 4. optional: remove Storyblok starter blocks ---------- */
if (REMOVE_DEMO) {
  for (const name of ['teaser', 'grid', 'feature']) {
    const found = byName.get(name)
    if (found) { await api('DELETE', `/components/${found.id}`); console.log(`  deleted starter block ${name}`) }
  }
}

console.log('\nDone. Open the Visual Editor on the "Home" story.')
