import { storyblokEditable, StoryblokServerComponent, type SbBlokData } from '@storyblok/react/rsc'

/** The "page" content type: a list of section blocks, top to bottom. */
export function Page({ blok }: { blok: SbBlokData & { body?: SbBlokData[] } }) {
  return (
    <div {...storyblokEditable(blok)}>
      {blok.body?.map((section) => (
        <StoryblokServerComponent blok={section} key={section._uid} />
      ))}
    </div>
  )
}
