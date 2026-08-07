import { client } from '@/sanity/lib/client'
import { Sections } from '@/components/Sections'

const QUERY = `*[_type == "page" && slug.current == "home"][0]{ title, sections }`

export const revalidate = 60

export default async function Home() {
  const page = await client.fetch(QUERY)
  if (!page) {
    return (
      <div className="container-x py-32 text-center">
        <p className="text-muted">
          No page with slug <code className="font-mono">home</code> found in Sanity.
        </p>
      </div>
    )
  }
  return <Sections sections={page.sections} />
}
