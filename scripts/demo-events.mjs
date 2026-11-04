/**
 * Demo events for the client demo: one-off events over the coming weeks, two past ones, and three
 * repeating events (weekly breakfast, biweekly office hours, monthly pitch night) so the demo
 * always has upcoming events, however long ago the seed ran.
 */

/** Bremen local date + time → ISO string in UTC (handles summer/winter time). */
function berlin(date, time) {
  const [h, m] = time.split(':').map(Number)
  const guess = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), h, m))
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Berlin', timeZoneName: 'shortOffset' })
    .formatToParts(guess).find((p) => p.type === 'timeZoneName').value // e.g. "GMT+1"
  const offset = Number(parts.replace('GMT', '') || 0)
  return new Date(guess.getTime() - offset * 3600_000).toISOString()
}

/** The Thursday `weeks` weeks from this week (negative = in the past). */
function thursday(weeks) {
  const d = new Date()
  d.setUTCHours(12, 0, 0, 0)
  const daysToThu = (4 - d.getUTCDay() + 7) % 7 || 7 // next Thursday, never today
  d.setUTCDate(d.getUTCDate() + daysToThu + 7 * weeks)
  return d
}

const HOI = 'hoi startup factory, Arberger Hafendamm 1, Bremen'

const list = [
  { w: -2, from: '18:00', to: '20:00', slug: 'office-hours-investoren', category: 'meetup', repeat: 'biweekly',
    title: 'Office Hours mit Investoren',
    summary: '15-Minuten-Gespräche mit Business Angels aus der Region.',
    description: 'Bringen Sie Ihre Fragen zu Finanzierung, Bewertung und Term Sheets mit.\n\nJedes Team bekommt ein 15-minütiges Gespräch mit einem Business Angel aus unserem Netzwerk.' },
  { w: -1, from: '17:00', to: '19:30', slug: 'workshop-business-model-canvas', category: 'workshop',
    title: 'Workshop: Business Model Canvas',
    summary: 'Vom Forschungsergebnis zum Geschäftsmodell auf einer Seite.',
    description: 'In diesem praktischen Workshop arbeiten Sie mit dem Business Model Canvas an Ihrer eigenen Idee.\n\nFür Forschende und Gründungsteams in der frühen Phase.' },
  { w: 0, from: '18:30', to: '21:00', slug: 'pitch-night-science-startups', category: 'pitch', repeat: 'monthly',
    title: 'Pitch Night: Science Start-ups',
    summary: 'Fünf Teams aus Bremer Hochschulen pitchen vor Investoren und Publikum.',
    description: 'Fünf Science Start-ups stellen ihre Ideen in jeweils fünf Minuten vor. Danach Feedback von unserer Jury und Networking bei Getränken.\n\nDer Eintritt ist frei, die Plätze sind begrenzt.',
    register: 'mailto:team@hoi-startup-factory.de?subject=Anmeldung%20Pitch%20Night' },
  { w: -3, from: '08:30', to: '10:00', slug: 'founders-breakfast', category: 'meetup', repeat: 'weekly',
    title: "Founders' Breakfast",
    summary: 'Kaffee, Croissants und ehrlicher Austausch unter Gründer:innen.',
    description: 'Ein lockeres Frühstück für alle, die gründen oder gründen wollen. Keine Vorträge, nur Gespräche.' },
  { w: 2, from: '16:00', to: '18:00', slug: 'workshop-fundraising-101', category: 'workshop',
    title: 'Workshop: Fundraising 101',
    summary: 'Pre-Seed, Seed, Förderprogramme: welche Finanzierung passt wann?',
    description: 'Wir erklären die wichtigsten Finanzierungswege für junge Start-ups im Nordwesten, von EXIST bis Business Angels.\n\nMit Praxisbeispielen aus dem hoi-Portfolio.',
    register: 'mailto:team@hoi-startup-factory.de?subject=Anmeldung%20Fundraising%20101' },
  { w: 3, from: '12:00', to: '13:00', slug: 'info-session-venture-studio', category: 'info', location: 'Online (Zoom)',
    title: 'Infoveranstaltung: Venture Studio',
    summary: 'Wie das hoi Venture Studio funktioniert und wer sich bewerben kann.',
    description: 'In einer Stunde erklären wir das Venture Studio: Ablauf, Unterstützung, Bewerbung. Danach Zeit für Ihre Fragen.' },
  { w: 4, from: '17:00', to: '20:00', slug: 'corporate-matchmaking', category: 'meetup',
    title: 'Corporate Matchmaking',
    summary: 'Etablierte Unternehmen aus der Region treffen junge Teams.',
    description: 'Unternehmen stellen konkrete Herausforderungen vor, Start-ups zeigen passende Lösungen. Ziel sind Pilotprojekte.' },
  { w: 5, from: '15:00', to: '20:00', slug: 'demo-day-winter', category: 'demoday',
    title: 'hoi Demo Day',
    summary: 'Unsere aktuelle Kohorte präsentiert sich vor Investoren und Partnern.',
    description: 'Der Höhepunkt des Programms: Alle Teams der aktuellen Kohorte präsentieren ihre Fortschritte.\n\nAnschließend Empfang und Networking.',
    register: 'mailto:team@hoi-startup-factory.de?subject=Anmeldung%20Demo%20Day' },
]

export const demoEvents = list.map((e, i) => {
  const day = thursday(e.w)
  return {
    key: `demo-event-${i + 1}`,
    slug: e.slug,
    title: e.title,
    start: berlin(day, e.from),
    end: berlin(day, e.to),
    category: e.category,
    location: e.location ?? HOI,
    summary: e.summary,
    description: e.description,
    registrationUrl: e.register ?? 'mailto:team@hoi-startup-factory.de',
    registrationLabel: 'Jetzt anmelden',
    repeat: e.repeat ?? 'none',
  }
})
