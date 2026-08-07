export function Stats({ heading, items }: any) {
  return (
    <section className="py-16 md:py-20">
      <div className="container-x">
        <div className="rounded-[2rem] bg-brand-950 px-8 py-14 md:px-14 text-white">
          {heading && (
            <h2 className="mb-10 max-w-2xl text-2xl md:text-3xl font-bold tracking-tight text-balance">{heading}</h2>
          )}
          <dl className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {items?.map((s: any) => (
              <div key={s._key}>
                <dt className="text-4xl md:text-5xl font-bold tracking-tight text-accent-400">{s.value}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-brand-100">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
