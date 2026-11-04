import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { StoryblokStory } from '@storyblok/react/rsc'
import { getStory } from '@/lib/storyblok'

export const revalidate = 60

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const story = await getStory(slug)
  if (!story) return {}
  return {
    title: story.content.seo_title || story.name,
    ...(story.content.seo_description && { description: story.content.seo_description }),
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const story = await getStory(slug)
  if (!story) notFound()
  return <StoryblokStory story={story} />
}
