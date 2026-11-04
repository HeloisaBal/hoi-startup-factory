/* Events: one shape for the event components, whichever CMS the data comes from. */

export type Repeat = 'none' | 'weekly' | 'biweekly' | 'monthly'

export type EventItem = {
  id: string
  slug: string
  title: string
  start: string // ISO date-time of the first (or only) session
  end?: string
  category?: string
  location?: string
  summary?: string
  description?: string
  imageUrl?: string | null
  imageAlt?: string
  registrationUrl?: string
  registrationLabel?: string
  /** Repeating events: entered once, the site shows the next dates automatically */
  repeat?: Repeat
  /** Last day the event repeats (YYYY-MM-DD, Bremen date). Empty = keeps repeating. */
  repeatUntil?: string
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

export const REPEAT_OPTIONS: { title: string; value: Repeat }[] = [
  { title: 'Does not repeat', value: 'none' },
  { title: 'Every week', value: 'weekly' },
  { title: 'Every 2 weeks', value: 'biweekly' },
  { title: 'Every month (same weekday, e.g. 1st Thursday)', value: 'monthly' },
]

export const categoryLabel = (value?: string) =>
  EVENT_CATEGORIES.find((c) => c.value === value)?.title ?? value ?? ''

/* ---------------- Bremen time ---------------- */

const TZ = 'Europe/Berlin' // always show Bremen time, wherever the visitor is
const fmt = (opts: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('de-DE', { timeZone: TZ, ...opts })

export const formatDay = (iso: string) => fmt({ day: '2-digit' }).format(new Date(iso))
export const formatMonth = (iso: string) => fmt({ month: 'short' }).format(new Date(iso)).replace('.', '')
export const formatWeekday = (iso: string) => fmt({ weekday: 'long' }).format(new Date(iso))
export const formatDate = (iso: string) =>
  fmt({ weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).format(new Date(iso))
export const formatShortDate = (iso: string) =>
  fmt({ weekday: 'short', day: 'numeric', month: 'long' }).format(new Date(iso))
export const formatTime = (iso: string) => fmt({ hour: '2-digit', minute: '2-digit' }).format(new Date(iso))

export function formatTimeRange(start: string, end?: string) {
  return end ? `${formatTime(start)}–${formatTime(end)} Uhr` : `${formatTime(start)} Uhr`
}

type Local = { y: number; m: number; d: number; h: number; mi: number; wd: number }

/** A moment → its date and time on a Bremen wall clock. */
function toLocal(ms: number): Local {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, year: 'numeric', month: 'numeric', day: 'numeric',
      hour: 'numeric', minute: 'numeric', weekday: 'short', hourCycle: 'h23',
    }).formatToParts(new Date(ms)).map((x) => [x.type, x.value])
  )
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday)
  return { y: +p.year, m: +p.month, d: +p.day, h: +p.hour, mi: +p.minute, wd }
}

/** A Bremen wall-clock date/time → the moment (handles summer/winter time). */
function fromLocal(y: number, m: number, d: number, h: number, mi: number): number {
  const wall = Date.UTC(y, m - 1, d, h, mi)
  let ms = wall
  for (let i = 0; i < 2; i++) {
    const l = toLocal(ms)
    ms += wall - Date.UTC(l.y, l.m - 1, l.d, l.h, l.mi)
  }
  return ms
}

const localDateKey = (ms: number) => {
  const l = toLocal(ms)
  return `${l.y}-${String(l.m).padStart(2, '0')}-${String(l.d).padStart(2, '0')}`
}

/* ---------------- repeating events ---------------- */

const HORIZON_DAYS = 120 // show repeating events up to ~4 months ahead
const DAY = 86_400_000

/** "Jeden Donnerstag", "Jeden 2. Donnerstag", "Jeden 1. Donnerstag im Monat" */
export function repeatLabel(e: EventItem): string | null {
  if (!e.repeat || e.repeat === 'none' || !e.start) return null
  const weekday = formatWeekday(e.start)
  if (e.repeat === 'weekly') return `Jeden ${weekday}`
  if (e.repeat === 'biweekly') return `Jeden zweiten ${weekday}`
  const l = toLocal(new Date(e.start).getTime())
  return `Jeden ${Math.ceil(l.d / 7)}. ${weekday} im Monat`
}

/**
 * All sessions of an event between `fromMs` and `toMs` (by start time). A one-off event has one.
 * Sessions keep the same Bremen clock time across summer/winter time changes.
 */
export function occurrences(e: EventItem, fromMs: number, toMs: number): EventItem[] {
  if (!e.start) return []
  const startMs = new Date(e.start).getTime()
  const durMs = e.end ? new Date(e.end).getTime() - startMs : 0
  const at = (ms: number, k: number): EventItem => ({
    ...e,
    id: k === 0 ? e.id : `${e.id}~${k}`,
    start: new Date(ms).toISOString(),
    end: e.end ? new Date(ms + durMs).toISOString() : undefined,
  })

  if (!e.repeat || e.repeat === 'none') return startMs <= toMs && startMs + Math.max(durMs, 0) >= fromMs ? [at(startMs, 0)] : []

  const first = toLocal(startMs)
  const nth = Math.ceil(first.d / 7) // for monthly: 1st, 2nd … weekday of the month
  const out: EventItem[] = []
  // skip straight to just before `fromMs` instead of walking from the first date
  const approxStep = e.repeat === 'monthly' ? 28 * DAY : (e.repeat === 'biweekly' ? 14 : 7) * DAY
  const k0 = Math.max(0, Math.floor((fromMs - startMs - Math.max(durMs, 0)) / approxStep) - 2)
  for (let k = e.repeat === 'monthly' ? Math.max(0, k0 - Math.floor(k0 / 10)) : k0; k < k0 + 400; k++) {
    let ms: number
    if (e.repeat === 'monthly') {
      const monthIndex = first.m - 1 + k
      const y = first.y + Math.floor(monthIndex / 12)
      const m = (monthIndex % 12) + 1
      const firstOfMonthWd = new Date(Date.UTC(y, m - 1, 1)).getUTCDay()
      const day = 1 + ((first.wd - firstOfMonthWd + 7) % 7) + (nth - 1) * 7
      if (day > new Date(Date.UTC(y, m, 0)).getUTCDate()) continue // e.g. no 5th Thursday this month
      ms = fromLocal(y, m, day, first.h, first.mi)
    } else {
      const step = e.repeat === 'biweekly' ? 14 : 7
      const base = new Date(Date.UTC(first.y, first.m - 1, first.d + step * k))
      ms = fromLocal(base.getUTCFullYear(), base.getUTCMonth() + 1, base.getUTCDate(), first.h, first.mi)
    }
    if (ms > toMs) break
    if (e.repeatUntil && localDateKey(ms) > e.repeatUntil.slice(0, 10)) break
    if (ms + Math.max(durMs, 0) >= fromMs) out.push(at(ms, k))
  }
  return out
}

/** An event counts as upcoming until it ends (or 3 hours after start if no end time). */
export function isUpcoming(e: EventItem, now = Date.now()) {
  const until = e.end ? new Date(e.end).getTime() : new Date(e.start).getTime() + 3 * 3600_000
  return until >= now
}

/**
 * Upcoming events, each shown once at its next date (a weekly event appears once, with "Jeden …"),
 * and past one-off events. A repeating event shows under "past" only once its series has ended.
 */
export function splitEvents(events: EventItem[], now = Date.now()) {
  const horizon = now + HORIZON_DAYS * DAY
  const upcoming: EventItem[] = []
  const past: EventItem[] = []
  for (const e of events) {
    if (!e.start) continue
    const isSeries = e.repeat && e.repeat !== 'none'
    upcoming.push(...occurrences(e, now - 3 * 3600_000, horizon).filter((o) => isUpcoming(o, now)))
    if (!isSeries) {
      if (!isUpcoming(e, now)) past.push(e)
    } else {
      const all = occurrences(e, 0, now)
      const last = all[all.length - 1]
      const ended = occurrences(e, now - 3 * 3600_000, horizon).length === 0
      if (ended && last) past.push(last)
    }
  }
  upcoming.sort((a, b) => a.start.localeCompare(b.start))
  const seen = new Set<string>()
  const nextPerEvent = upcoming.filter((o) => {
    const base = o.id.split('~')[0]
    if (seen.has(base)) return false
    seen.add(base)
    return true
  })
  past.sort((a, b) => b.start.localeCompare(a.start))
  return { upcoming: nextPerEvent, past }
}

/** For an event page: the next session (or the last one if all are over) and the dates after it. */
export function nextSessions(e: EventItem, count = 5, now = Date.now()) {
  const next = occurrences(e, now - 3 * 3600_000, now + HORIZON_DAYS * DAY).filter((o) => isUpcoming(o, now))
  if (next.length) return { current: next[0], later: next.slice(1, count) }
  const all = occurrences(e, 0, now)
  return { current: all[all.length - 1] ?? e, later: [] as EventItem[] }
}

/** Body text: blank line = new paragraph */
export const paragraphs = (text?: string) =>
  (text || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
