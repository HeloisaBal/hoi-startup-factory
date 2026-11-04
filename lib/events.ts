/* Events: one shape for the event components, whichever CMS the data comes from. */

export type EventItem = {
  id: string
  slug: string
  title: string
  start: string // ISO date-time
  end?: string
  category?: string
  location?: string
  summary?: string
  description?: string
  imageUrl?: string | null
  imageAlt?: string
  registrationUrl?: string
  registrationLabel?: string
  /** Extra HTML attributes for click-to-edit in the CMS preview (Storyblok) */
  editable?: Record<string, string>
}

export const EVENT_CATEGORIES = [
  { title: 'Workshop', value: 'workshop' },
  { title: 'Pitch Night', value: 'pitch' },
  { title: 'Meetup', value: 'meetup' },
  { title: 'Infoveranstaltung', value: 'info' },
  { title: 'Demo Day', value: 'demoday' },
]

export const categoryLabel = (value?: string) =>
  EVENT_CATEGORIES.find((c) => c.value === value)?.title ?? value ?? ''

const TZ = 'Europe/Berlin' // always show Bremen time, wherever the visitor is
const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('de-DE', { timeZone: TZ, ...opts })

export const formatDay = (iso: string) => fmt({ day: '2-digit' }).format(new Date(iso))
export const formatMonth = (iso: string) => fmt({ month: 'short' }).format(new Date(iso)).replace('.', '')
export const formatWeekday = (iso: string) => fmt({ weekday: 'long' }).format(new Date(iso))
export const formatDate = (iso: string) =>
  fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
export const formatTime = (iso: string) => fmt({ hour: '2-digit', minute: '2-digit' }).format(new Date(iso))

export function formatTimeRange(start: string, end?: string) {
  return end ? `${formatTime(start)}–${formatTime(end)} Uhr` : `${formatTime(start)} Uhr`
}

/** An event counts as upcoming until it ends (or 3 hours after start if no end time). */
export function isUpcoming(e: EventItem, now = Date.now()) {
  const until = e.end ? new Date(e.end).getTime() : new Date(e.start).getTime() + 3 * 3600_000
  return until >= now
}

export function splitEvents(events: EventItem[], now = Date.now()) {
  const sorted = [...events].filter((e) => e.start).sort((a, b) => a.start.localeCompare(b.start))
  return {
    upcoming: sorted.filter((e) => isUpcoming(e, now)),
    past: sorted.filter((e) => !isUpcoming(e, now)).reverse(),
  }
}

/** Body text: blank line = new paragraph */
export const paragraphs = (text?: string) =>
  (text || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
