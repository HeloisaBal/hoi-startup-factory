/**
 * Storyblok webhook → refreshes the live site the moment something is published.
 * In Storyblok: Settings → Webhooks → "Story published / unpublished" →
 *   https://YOUR-DOMAIN/api/revalidate?secret=STORYBLOK_WEBHOOK_SECRET
 */
import { revalidatePath } from 'next/cache'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  if (request.nextUrl.searchParams.get('secret') !== process.env.STORYBLOK_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 })
  }
  revalidatePath('/', 'layout') // small site: refresh every page
  return NextResponse.json({ ok: true })
}
