import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'
import { BlogService } from '@/services/blogService'
import { clearDeletedPostCache } from '@/lib/blog-actions'

interface RouteParams {
  params: {
    slug: string
  }
}

/**
 * GET /api/posts/[slug]
 * Fetch a single published blog post by slug
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

    const post = await BlogService.getPublishedPostBySlug(slug)
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

/**
 * PUT /api/posts/[slug]
 * Update a blog post by slug (requires authentication)
 */
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    // In a real application, you would check authentication here
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { slug } = params
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    // First, find the post by slug
    const existingPost = await BlogService.getPublishedPostBySlug(slug)
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    
    // If the title changed, update the slug
    if (body.title && body.title !== existingPost.title) {
      body.slug = BlogService.generateSlug(body.title)
    }

    // If changing to published, set published_at
    if (body.is_published && !existingPost.is_published) {
      body.published_at = new Date().toISOString()
    }    const updatedPost = await BlogService.updatePost(existingPost.id, body)

    // Revalidate relevant pages to show updates immediately
    revalidatePath('/blog')
    revalidatePath(`/blog/${existingPost.slug}`)
    revalidatePath('/sitemap.xml')
    
    // If slug changed, revalidate the new slug path too
    if (body.slug && body.slug !== existingPost.slug) {
      revalidatePath(`/blog/${body.slug}`)
    }

    return NextResponse.json(updatedPost)
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

/**
 * DELETE /api/posts/[slug]
 * Delete a blog post by slug (requires authentication)
 */
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {    // In a real application, you would check authentication here
    // const session = await getServerSession(authOptions)
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { slug } = params
    
    if (!slug) {
      return NextResponse.json(
        { error: 'Slug is required' },
        { status: 400 }
      )
    }

    console.log('DELETE request for slug:', slug)

    // First, find the post by slug (including drafts for admin operations)
    let existingPost = await BlogService.getPublishedPostBySlug(slug)
    
    // If not found in published posts, check all posts (for admin delete operations)
    if (!existingPost) {
      console.log('Post not found in published posts, checking all posts...')
      const allPosts = await BlogService.getAllPosts()
      existingPost = allPosts.find(post => post.slug === slug) || null
    }
    
    if (!existingPost) {
      console.log('Post not found:', slug)
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    console.log('Found post to delete:', existingPost.id, existingPost.title)

    await BlogService.deletePost(existingPost.id)
    
    console.log('Post deleted successfully:', existingPost.id)

    // Use aggressive cache clearing for deletions
    await clearDeletedPostCache(existingPost.slug)

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {
    console.error('Error deleting post:', error)
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
