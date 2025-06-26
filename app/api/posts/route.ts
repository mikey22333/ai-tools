import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { BlogService } from '@/services/blogService'

// Disable caching for this API route to ensure fresh data
export const dynamic = 'force-dynamic'

/**
 * GET /api/posts
 * Fetch published blog posts with optional pagination and filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')
    const includeDrafts = searchParams.get('includeDrafts') === 'true'

    // Validate limit
    if (limit > 100) {
      return NextResponse.json(
        { error: 'Limit cannot exceed 100' },
        { status: 400 }
      )
    }

    let posts
    if (includeDrafts) {
      // For admin use - would typically require authentication
      posts = await BlogService.getAllPosts()
    } else {
      posts = await BlogService.getPublishedPosts()
    }

    // Apply pagination
    const paginatedPosts = posts.slice(offset, offset + limit)
    
    // Calculate pagination info
    const total = posts.length
    const hasMore = offset + limit < total
    const currentPage = Math.floor(offset / limit) + 1
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      posts: paginatedPosts,
      pagination: {
        total,
        limit,
        offset,
        hasMore,
        currentPage,
        totalPages,
      },
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

/**
 * POST /api/posts
 * Create a new blog post (requires authentication)
 */
export async function POST(request: NextRequest) {
  try {
    // In a real application, you would check authentication here
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const body = await request.json()
    
    // Validate required fields
    const { title, content } = body
    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }    // Generate slug if not provided
    const slug = body.slug || BlogService.generateSlug(title)

    const newPost = await BlogService.createPost({
      title,
      slug,
      content,
      excerpt: body.excerpt,
      thumbnail: body.thumbnail,
      is_published: body.is_published || false,
      published_at: body.is_published ? new Date().toISOString() : null,
    })

    // Revalidate blog pages to show new content immediately
    revalidatePath('/blog')
    revalidatePath('/sitemap.xml')
    if (newPost.is_published) {
      revalidatePath(`/blog/${newPost.slug}`)
    }

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error('Error creating post:', error)
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
