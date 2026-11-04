import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { stegaClean } from 'next-sanity'
import { EventDetail } from '@/components/events/EventDetail'
import { sanityFetch } from '@/sanity/lib/live'
import { EVENT_QUERY } from '@/sanity/lib/queries'
import { toEventItem, type SanityEvent } from '@/sanity/lib/events'

type Props = { params: Promise<{ slug: string }> }

export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: EVENT_QUERY, params: { slug }, stega: false })
  const e = data as SanityEvent | null
  if (!e) return {}
  return { title: `${e.title} — hoi Events`, ...(e.summary && { description: stegaClean(e.summary) }) }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: EVENT_QUERY, params: { slug } })
  if (!data) notFound()
  return <EventDetail event={toEventItem(data as SanityEvent, 1400, 700)} />
}
