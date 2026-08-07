import { urlFor } from '@/sanity/lib/image'

export function Hero({ heading, subheading, image }: any) {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto">
      <h1 className="text-5xl font-bold mb-4">{heading}</h1>
      {subheading && <p className="text-xl text-gray-600">{subheading}</p>}
      {image && (
        <img
          src={urlFor(image).width(1200).url()}
          alt={image.alt || ''}
          className="mt-8 rounded-lg w-full"
        />
      )}
    </section>
  )
}