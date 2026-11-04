import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StoryblokStory } from '@storyblok/react/rsc'
import { getStory } from '@/lib/storyblok'

export const revalidate = 600

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = await getStory(`events/${slug}`)
  if (!story) return {}
  return {
    title: `${story.content.title || story.name} — hoi Events`,
    ...(story.content.summary && { description: story.content.summary }),
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  const story = await getStory(`events/${slug}`)
  if (!story || story.content.component !== 'event') notFound()
  // StoryblokStory = renders the event and connects the Visual Editor (click-to-edit, live preview)
  return <StoryblokStory story={story} />
}
