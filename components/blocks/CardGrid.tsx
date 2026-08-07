export function CardGrid({ heading, cards }: any) {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      {heading && <h2 className="text-3xl font-bold mb-8">{heading}</h2>}
      <div className="grid gap-6 md:grid-cols-3">
        {cards?.map((card: any) => (
          <div key={card._key} className="border rounded-lg p-6">
            <h3 className="font-semibold mb-2">{card.title}</h3>
            <p className="text-gray-600">{card.body}</p>
          </div>
        ))}
      </div>
    </section>
  )
}