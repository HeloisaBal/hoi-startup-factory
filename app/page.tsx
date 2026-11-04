import type { Metadata } from 'next'
import { StoryblokStory } from '@storyblok/react/rsc'
import { getStory } from '@/lib/storyblok'

export const revalidate = 60 // also refreshes the "Upcoming events" section

export async function generateMetadata(): Promise<Metadata> {
  const story = await getStory('home')
  return {
    ...(story?.content.seo_title && { title: story.content.seo_title }),
    ...(story?.content.seo_description && { description: story.content.seo_description }),
  }
}

export default async function Home() {
  const story = await getStory('home')
  if (!story) {
    return (
      <div className="container-x py-32 text-center">
        <p className="text-muted">
          No story with slug <code className="font-mono">home</code> found in Storyblok.
        </p>
      </div>
    )
  }
  // StoryblokStory renders the page AND connects to the Visual Editor for live, click-to-edit preview
  return <StoryblokStory story={story} />
}
