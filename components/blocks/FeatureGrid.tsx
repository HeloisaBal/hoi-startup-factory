import Link from 'next/link'
import { SectionHeading, Icon } from '../ui'

export function FeatureGrid({ eyebrow, heading, intro, items }: any) {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} heading={heading} intro={intro} />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items?.map((item: any) => {
            const Card = (
              <div className="group h-full rounded-[var(--radius-card)] border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-brand-300 hover:shadow-lg">
                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                  <Icon name={item.icon} className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold leading-snug">{item.title}</h3>
                {item.body && <p className="mt-3 text-muted leading-relaxed">{item.body}</p>}
                {item.href && (
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Mehr erfahren
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                )}
              </div>
            )
            return item.href
              ? <Link key={item._key} href={item.href}>{Card}</Link>
              : <div key={item._key}>{Card}</div>
          })}
        </div>
      </div>
    </section>
  )
}
