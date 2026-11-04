/* Hand-written shapes of what the queries in queries.ts return. */
export type PageData = {
  _id: string
  _type: string
  title?: string
  seoTitle?: string
  seoDescription?: string
  sections?: { _key: string; _type: string; [field: string]: unknown }[]
}

export type Link = { _key?: string; label?: string; href?: string }

export type SiteSettings = {
  nav?: Link[]
  headerButton?: { label?: string; href?: string }
  footerTagline?: string
  address?: string
  footerColumns?: { _key?: string; title?: string; links?: Link[] }[]
  legalLinks?: Link[]
  copyright?: string
  siteTitle?: string
  siteDescription?: string
}
