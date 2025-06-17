import { NextRequest, NextResponse } from 'next/server'
import { forceBlogCacheRefresh } from '@/lib/blog-actions'

/**
 * POST /api/blog/clear-cache
 * Manually clear all blog caches (for testing/debugging)
 */
export async function POST(request: NextRequest) {
  try {
    const result = await forceBlogCacheRefresh()
    
    return NextResponse.json({ 
      message: 'Blog cache cleared successfully',
      result 
    })
  } catch (error) {
    console.error('Error clearing blog cache:', error)
    return NextResponse.json(
      { error: 'Failed to clear blog cache' },
      { status: 500 }
    )
  }
}
