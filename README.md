# hoi startup factory — website (Sanity version)

Custom Next.js site for **hoi startup factory** (Bremen), built by GroundUp.
This branch uses **Sanity** as the editor. The `storyblok` branch is the same site with Storyblok.

> **Design stays in code, content stays with the client.** Editors pick from a fixed set of
> pre-designed sections, fill in text/images and reorder them. New designs or layouts are developer work.

## How it fits together

```
Sanity Content Lake (cloud)                This repo (Next.js 16 on Vercel)
───────────────────────────                ─────────────────────────────────
documents: page, siteSettings  ◀── edits ── /studio  (Sanity Studio, embedded in this app)
        │                                     ├─ Structure tab: forms
        │                                     └─ Presentation tab: the site in an iframe, click to edit
        └── sanityFetch() ───────────────▶  app/layout.tsx  → Header / Footer (siteSettings)
            (live: updates on publish)      app/page.tsx, app/[slug]/page.tsx → <Sections>
                                            components/blocks/*  the 8 section designs
```

| Path | What it is |
|---|---|
| `sanity/schemaTypes/blocks/*.ts` | The fields of each section, with limits and help texts editors see. |
| `sanity/schemaTypes/documents/page.ts` | A page: title, web address (slug), sections, SEO. Slug `home` = homepage. |
| `sanity/schemaTypes/documents/siteSettings.ts` | One document for the header menu, header button, footer, legal links and SEO defaults. |
| `sanity/structure.ts` | Studio sidebar: "Pages" and "Site settings". |
| `sanity.config.ts` | Studio config: Presentation tool, singleton rules, Vision. |
| `sanity/presentation/resolve.ts` | Which URL shows which document, for click-to-edit. |
| `sanity/lib/live.ts` | `sanityFetch` + `<SanityLive />`: drafts in preview, instant updates on publish. |
| `sanity/lib/queries.ts`, `types.ts` | GROQ queries and the shape of their results. |
| `app/api/draft-mode/*` | Turns preview (draft) mode on and off for the Presentation tool. |
| `components/Sections.tsx` | Renders a page's sections in order; supports drag-to-reorder in preview. |
| `components/blocks/*.tsx` | The 8 section designs: Hero, AudienceHero, ImageHero, FeatureGrid, Stats, TextImage, LogoWall, CTA. |
| `components/Header.tsx`, `Footer.tsx` | Read from Site settings; fall back to hard-coded links if it's empty. |
| `app/globals.css` | Brand tokens (purple `#9A00FF`, blue `#003EFE`, teal `#00D7B8`), gradient, marquee. |

## Run it locally

1. `npm install`
2. Copy `.env.example` to `.env.local` and fill it in from https://www.sanity.io/manage → your project:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` (usually `production`).
   - `SANITY_API_READ_TOKEN`: API → Tokens → Add API token, role **Viewer**.
3. In the same place, go to API → CORS origins → add `http://localhost:3000` with **Allow credentials** ticked.
4. `npm run dev` → site at http://localhost:3000, editor at http://localhost:3000/studio.

## Deploy (Vercel)

1. Import the repo in Vercel and add the three env variables above.
2. In Sanity → API → CORS origins, add the Vercel domain, with credentials.
3. Invite the client in Sanity → Members. She logs in at `https://<domain>/studio`.

No webhook is needed: `<SanityLive />` refreshes the site the moment something is published.

## For the editor (the client)

- **Presentation** tab: browse the site, click any text to edit it, drag sections to reorder.
- **Pages**: add a page by giving it a title and a web address. Then add sections with **+**.
- **Site settings**: menu, header button, footer, legal links, Google defaults.
- Nothing goes live until **Publish** is pressed.

## Events

- **Events** is its own list in the Studio sidebar, sorted by date. Each event has a URL at `/events/<slug>` and click-to-edit in the Presentation tab.
- `/events` lists upcoming events as cards and past ones as a list. The split happens automatically by date and time (Bremen time), re-checked hourly.
- The **Upcoming events** section (`upcomingEvents`) can go on any page. `PAGE_QUERY` attaches the next 6 events to it, and the editor chooses how many to show.
- Demo content: `npm run sanity:seed-events` (needs `SANITY_API_WRITE_TOKEN`, role Editor, locally only). It creates or refreshes 8 weekly demo events, adds the section to the homepage and adds "Events" to the menu. It's safe to re-run.
- Shared code (the same in the Storyblok branch): `lib/events.ts`, `components/events/*`, `scripts/demo-events.mjs`. CMS-specific code: `sanity/lib/events.ts`, `sanity/schemaTypes/documents/event.ts`.

## Adding a new section type

1. Schema: `sanity/schemaTypes/blocks/myBlock.ts`. Register it in `schemaTypes/index.ts`, and in `page.ts` (in `of` and in an insert-menu group).
2. Component: `components/blocks/MyBlock.tsx`. Register it in `components/Sections.tsx`.
3. Wrap option values with `stegaClean()` before comparing them, and do the same for any URL you build. In preview mode, text carries invisible edit markers, so `style === 'outline'` would fail without cleaning.

## Known gaps / TODO

- The **EN** button in the header does nothing yet. Sanity supports document-level translations for when it's needed.
- Blocks are typed loosely (`any`). Sanity TypeGen could generate exact types.
- Images are plain `<img>` (served resized by Sanity's image CDN); there is no `next/image`.
- Pages linked in the nav (`/ueber-uns`, `/partner`, `/programm`, `/kontakt`, …) must exist in the Studio with matching slugs.
