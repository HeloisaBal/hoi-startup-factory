import type { Metadata } from 'next'
import { Sections } from '@/components/Sections'
import { sanityFetch } from '@/sanity/lib/live'
import type { PageData } from '@/sanity/lib/types'
import { PAGE_QUERY } from '@/sanity/lib/queries'

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await sanityFetch({ query: PAGE_QUERY, params: { slug: 'home' }, stega: false })
  const page = data as PageData | null
  return {
    ...(page?.seoTitle && { title: page.seoTitle }),
    ...(page?.seoDescription && { description: page.seoDescription }),
  }
}

export default async function Home() {
  const { data } = await sanityFetch({ query: PAGE_QUERY, params: { slug: 'home' } })
  const page = data as PageData | null
  if (!page) {
    return (
      <div className="container-x py-32 text-center">
        <p className="text-muted">
          No page with slug <code className="font-mono">home</code> found in Sanity.
        </p>
      </div>
    )
  }
  return <Sections documentId={page._id} documentType={page._type} sections={page.sections} />
}
