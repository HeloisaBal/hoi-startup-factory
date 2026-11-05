import Link from 'next/link'

// Shown for any page that doesn't exist (yet). For the client demo, links like "Über uns"
// lead here on purpose: those pages are not part of the demo.
export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <p className="eyebrow mb-3">Demo</p>
      <h1 className="text-3xl md:text-4xl font-bold">Not built yet</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">
        This page is not part of this demo. In the real website, it will be here.
      </p>
      <Link href="/" className="mt-8 inline-block font-semibold text-brand-600 hover:underline">
        Back to the homepage
      </Link>
    </div>
  )
}
