import { client } from '@/sanity/lib/client'
import { Sections } from '@/components/Sections'

const QUERY = `*[_type == "page" && slug.current == $slug][0]{ title, sections }`

export const revalidate = 60

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await client.fetch(QUERY, { slug })
  if (!page) {
    return <div className="container-x py-32 text-center text-muted">Seite nicht gefunden</div>
  }
  return <Sections sections={page.sections} />
}
