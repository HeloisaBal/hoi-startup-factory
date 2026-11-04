import Link from 'next/link'
import { categoryLabel, formatDay, formatMonth, formatTimeRange, formatWeekday, type EventItem } from '@/lib/events'

export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link
      href={`/events/${event.slug}`}
      {...event.editable}
      className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg"
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.imageAlt || ''} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="brand-gradient h-full w-full" aria-hidden="true" />
        )}
        <div className="absolute left-4 top-4 flex flex-col items-center rounded-xl bg-white px-3 py-2 text-center shadow-md">
          <span className="text-2xl font-extrabold leading-none text-brand-600">{formatDay(event.start)}</span>
          <span className="mt-1 text-[11px] font-bold uppercase tracking-wider text-muted">{formatMonth(event.start)}</span>
        </div>
        {event.category && (
          <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            {categoryLabel(event.category)}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-medium text-brand-600">
          {formatWeekday(event.start)}, {formatTimeRange(event.start, event.end)}
        </p>
        <h3 className="mt-2 text-lg font-bold leading-snug">{event.title}</h3>
        {event.summary && <p className="mt-2 text-sm leading-relaxed text-muted">{event.summary}</p>}
        {event.location && (
          <p className="mt-auto flex items-center gap-1.5 pt-5 text-sm text-muted">
            <PinIcon /> {event.location}
          </p>
        )}
      </div>
    </Link>
  )
}

export function PinIcon({ className = 'h-4 w-4 shrink-0' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" />
    </svg>
  )
}
