'use client'

import { useIsPresentationTool } from 'next-sanity/hooks'

/** Small bar shown when someone views drafts OUTSIDE the Studio, so they know they're not on the live site. */
export function DraftModeBanner() {
  const isPresentationTool = useIsPresentationTool()
  if (isPresentationTool !== false) return null
  return (
    <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-ink px-5 py-2.5 text-sm text-white shadow-lg">
      Preview mode — you’re seeing unpublished changes.{' '}
      {/* plain <a>: this is an API route that must do a full page load */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/api/draft-mode/disable" className="font-semibold underline">Exit</a>
    </div>
  )
}
