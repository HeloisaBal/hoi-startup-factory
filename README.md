# hoi startup factory — website (Storyblok version)

Custom Next.js site for **hoi startup factory** (Bremen), built by GroundUp.
This branch uses **Storyblok** as the editor. The `sanity` branch is the same site with Sanity.

> **Design stays in code, content stays with the client.** Editors pick from a fixed set of
> pre-designed sections, fill in text/images and reorder them. New designs or layouts are developer work.

## How it fits together

```
Storyblok (cloud)                         This repo (Next.js on Vercel)
──────────────────                        ─────────────────────────────
Stories (pages)  ── Content Delivery API ─▶ lib/storyblok.ts  getStory("home")
  "home", "partner", …                        app/page.tsx, app/[slug]/page.tsx
  "site-settings" (header/footer)             app/layout.tsx → Header / Footer
Block Library (field definitions)          components/storyblok/registry.ts
  ↑ pushed from scripts/storyblok-schema.mjs  maps block name → React component
Visual Editor ── iframe + bridge ──────────▶ <StoryblokStory> = click-to-edit + live preview
```

| Path | What it is |
|---|---|
| `components/blocks/*.tsx` | The 8 section designs (Hero, AudienceHero, ImageHero, FeatureGrid, Stats, TextImage, LogoWall, CTA). Each reads its fields from `blok`. |
| `components/storyblok/registry.ts` | Storyblok block name → React component. |
| `components/storyblok/Page.tsx` | The "page" content type: renders its sections in order. |
| `components/storyblok/SiteSettingsPreview.tsx` | What the Visual Editor shows when editing "Site settings". |
| `components/Header.tsx`, `Footer.tsx` | Read from the "site-settings" story; fall back to hard-coded links if it's empty. |
| `lib/storyblok.ts` | Storyblok client + `getStory(slug)`. Draft vs published is decided by `STORYBLOK_VERSION`. |
| `lib/storyblok-helpers.ts` | `sbImage()` (resized image URLs) and `sbHref()` (link field → href). |
| `lib/settings.ts` | Converts the settings story into the simple shape Header/Footer use. |
| `scripts/storyblok-schema.mjs` | **The Block Library as code**: every block and its fields, limits and help texts. |
| `scripts/storyblok-setup.mjs` | Pushes that schema to a space and seeds demo "home" + "site-settings" stories. |
| `app/api/revalidate/route.ts` | Webhook: refreshes the live site when something is published. |
| `app/globals.css` | Brand tokens (purple `#9A00FF`, blue `#003EFE`, teal `#00D7B8`), gradient, marquee. |

## Set up from scratch (≈15 min)

1. **Install:** `npm install`
2. **Tokens.** Copy `.env.example` to `.env.local` and fill in:
   - `STORYBLOK_ACCESS_TOKEN`: Storyblok → Settings → Access Tokens → *Preview* token.
   - `STORYBLOK_SPACE_ID`: Settings → Space.
   - `STORYBLOK_PERSONAL_TOKEN`: your avatar → My account → Personal access tokens.
3. **Create the blocks and demo content.** On a brand-new space, run:
   ```bash
   npm run storyblok:setup -- --reset --remove-demo
   ```
   This replaces Storyblok's starter "Home" with the demo homepage and deletes the starter teaser/grid/feature blocks. Later, run `npm run storyblok:setup` with no flags after editing `storyblok-schema.mjs`. It updates the blocks and never touches existing content.
4. **Run locally over HTTPS** (the Visual Editor requires it): `npm run dev:https` → https://localhost:3000
5. **Point the Visual Editor at it.** Storyblok → Settings → Visual Editor → Location: `https://localhost:3000/`.
   - On the "Home" story → Config, set **Real path** to `/` (the setup script tries to do this).
   - On "Site settings", set the Real path to `/site-settings`.

## Deploy (Vercel)

Use **two environments**, which is Storyblok's recommended setup:
- **Production** (the public site): `STORYBLOK_VERSION=published`.
- **Preview** (what the Visual Editor loads): `STORYBLOK_VERSION=draft`. Put this deployment's URL in Settings → Visual Editor.

Then add a webhook: Settings → Webhooks → triggers *Story published* and *unpublished* → `https://<production-domain>/api/revalidate?secret=<STORYBLOK_WEBHOOK_SECRET>`. Without it, published changes still appear within 60 seconds.

## Events

- Event stories live in the **Events** folder in Storyblok (content type `event`). Their URL is `/events/<slug>`, and they open in the Visual Editor like any page.
- `/events` lists upcoming events as cards and past ones as a list. The split happens automatically by date and time (Bremen time).
- The **Upcoming events** section (`upcoming_events`) can go on any page. It shows the next 1–6 events and loads them itself.
- Demo content: `npm run storyblok:setup` creates the folder and 8 weekly demo events (2 in the past). It only creates them if missing; add `--reset` to regenerate their dates from today.
- Shared code (the same in the Sanity branch): `lib/events.ts` (types, date formatting), `components/events/*`, `scripts/demo-events.mjs`. CMS-specific code: `lib/storyblok-events.ts`.

- **Repeating events:** set "Repeats" to every week, every 2 weeks or monthly (same weekday, e.g. 1st Thursday), with an optional end date. The site works out the next dates in Bremen time (`occurrences()` in `lib/events.ts`). It shows each event once, at its next date, with "Jeden Donnerstag", and the event page lists "Weitere Termine".

## Adding a new section type

1. Create `components/blocks/MyBlock.tsx` reading from `blok`, with `{...storyblokEditable(blok)}` on the root.
2. Add it to `components/storyblok/registry.ts`.
3. Add its fields to `scripts/storyblok-schema.mjs`, and its name to `SECTION_TYPES`.
4. Run `npm run storyblok:setup`.

## Known gaps / TODO

- The **EN** button in the header does nothing yet. Storyblok has field-level translations for when it's needed.
- Blocks are typed loosely (`any`), so field names aren't type-checked.
- Images are plain `<img>` (served resized by Storyblok's image service); there is no `next/image`.
- Pages linked in the nav (`/ueber-uns`, `/partner`, `/programm`, `/kontakt`, …) don't exist as stories yet. Create them in Storyblok with matching slugs.
