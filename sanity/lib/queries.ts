// GROQ queries used by the site. (Plain strings: no TypeGen set up, so results are untyped.)

const EVENT_FIELDS = `_id, title, "slug": slug.current, start, end, category, location, summary, description, image, registrationUrl, registrationLabel`

// "Upcoming events" sections get their events attached here, so the page needs one fetch.
export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id, _type, title, seoTitle, seoDescription,
  sections[]{
    ...,
    _type == "upcomingEvents" => {
      "events": *[_type == "event" && defined(slug.current) && dateTime(coalesce(end, start)) >= dateTime(now())] | order(start asc)[0...6]{ ${EVENT_FIELDS} }
    }
  }
}`

export const PAGE_SLUGS_QUERY = `*[_type == "page" && defined(slug.current) && slug.current != "home"]{ "slug": slug.current }`

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]`

export const EVENTS_QUERY = `*[_type == "event" && defined(slug.current) && defined(start)] | order(start asc){ ${EVENT_FIELDS} }`

export const EVENT_QUERY = `*[_type == "event" && slug.current == $slug][0]{ ${EVENT_FIELDS} }`
