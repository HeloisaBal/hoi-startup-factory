import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Sections } from '@/components/Sections'
import { sanityFetch } from '@/sanity/lib/live'
import type { PageData } from '@/sanity/lib/types'
import { PAGE_QUERY, PAGE_SLUGS_QUERY } from '@/sanity/lib/queries'

export const revalidate = 3600

type Props = { params: Promise<{ slug: string }> }

/* Pre-build every page at deploy time; new pages created later are built on first visit. */
export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: PAGE_SLUGS_QUERY, perspective: 'published', stega: false })
  return data as { slug: string }[]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: PAGE_QUERY, params: { slug }, stega: false })
  const page = data as PageData | null
  if (!page) return {}
  return {
    title: page.seoTitle || page.title,
    ...(page.seoDescription && { description: page.seoDescription }),
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: PAGE_QUERY, params: { slug } })
  const page = data as PageData | null
  if (!page) notFound()
  return <Sections documentId={page._id} documentType={page._type} sections={page.sections} />
}
