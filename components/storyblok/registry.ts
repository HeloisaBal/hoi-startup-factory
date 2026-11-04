/* Storyblok component name (technical name in the Block Library) → React component.
   Add a new block: create it in components/blocks, add one line here, and add it to scripts/storyblok-schema.mjs. */
import { Page } from './Page'
import { SiteSettingsPreview } from './SiteSettingsPreview'
import { Hero } from '../blocks/Hero'
import { AudienceHero } from '../blocks/AudienceHero'
import { ImageHero } from '../blocks/ImageHero'
import { FeatureGrid } from '../blocks/FeatureGrid'
import { Stats } from '../blocks/Stats'
import { TextImage } from '../blocks/TextImage'
import { LogoWall } from '../blocks/LogoWall'
import { CTA } from '../blocks/CTA'
import { UpcomingEvents } from '../blocks/UpcomingEvents'
import { EventStory } from './EventStory'

export const components = {
  page: Page,
  site_settings: SiteSettingsPreview,
  event: EventStory,
  hero: Hero,
  audience_hero: AudienceHero,
  image_hero: ImageHero,
  feature_grid: FeatureGrid,
  stats: Stats,
  text_image: TextImage,
  logo_wall: LogoWall,
  cta: CTA,
  upcoming_events: UpcomingEvents,
}
