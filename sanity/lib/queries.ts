// GROQ queries used by the site. (Plain strings: no TypeGen set up, so results are untyped.)

export const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{ _id, _type, title, seoTitle, seoDescription, sections }`

export const PAGE_SLUGS_QUERY = `*[_type == "page" && defined(slug.current) && slug.current != "home"]{ "slug": slug.current }`

export const SETTINGS_QUERY = `*[_type == "siteSettings"][0]`
