import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container-x py-32 text-center">
      <p className="eyebrow mb-3">404</p>
      <h1 className="text-3xl md:text-4xl font-bold">Seite nicht gefunden</h1>
      <Link href="/" className="mt-8 inline-block font-semibold text-brand-600 hover:underline">
        Zur Startseite
      </Link>
    </div>
  )
}
