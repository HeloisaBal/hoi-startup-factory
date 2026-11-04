import { sbHref } from './storyblok-helpers'

/* The header/footer data in a simple shape, so Header.tsx and Footer.tsx don't need to know about Storyblok. */
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

type SbNavLink = { _uid: string; label?: string; link?: Parameters<typeof sbHref>[0] }
const links = (list?: SbNavLink[]): Link[] | undefined =>
  list?.map((l) => ({ _key: l._uid, label: l.label, href: sbHref(l.link) }))

/** Convert the "site-settings" story content (Storyblok field names) into SiteSettings. */
export function toSiteSettings(content?: Record<string, any> | null): SiteSettings | undefined {
  if (!content) return undefined
  return {
    nav: links(content.nav),
    headerButton: content.header_button_label
      ? { label: content.header_button_label, href: sbHref(content.header_button_link) }
      : undefined,
    footerTagline: content.footer_tagline,
    address: content.address,
    footerColumns: content.footer_columns?.map((c: any) => ({ _key: c._uid, title: c.title, links: links(c.links) })),
    legalLinks: links(content.legal_links),
    copyright: content.copyright,
    siteTitle: content.site_title,
    siteDescription: content.site_description,
  }
}
