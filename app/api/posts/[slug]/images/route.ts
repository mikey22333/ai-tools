import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/services/blogService'

interface RouteParams {
  params: {
    slug: string
  }
}

/**
 * GET /api/posts/[slug]/images
 * Fetch additional images for a blog post
 */
export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = params
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const images = await BlogService.getPostImages(slug)
    
    return NextResponse.json(images)
  } catch (error) {
    console.error('Error fetching post images:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post images' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/posts/[slug]/images
 * Save additional images for a blog post
 */
export async function POST(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { slug } = params
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    const { imageUrls } = await request.json()
    
    if (!Array.isArray(imageUrls)) {
      return NextResponse.json(
        { error: 'imageUrls must be an array' },
        { status: 400 }
      )
    }

    await BlogService.savePostImages(slug, imageUrls)
    
    return NextResponse.json({ message: 'Images saved successfully' })
  } catch (error) {
    console.error('Error saving post images:', error)
    return NextResponse.json(
      { error: 'Failed to save post images' },
      { status: 500 }
    )
  }
}
