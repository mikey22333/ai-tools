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
) {  try {
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

    console.log('PUT request for slug:', slug)

    // First, find the post by slug
    const existingPost = await BlogService.getPostBySlug(slug)
    if (!existingPost) {
      console.log('Post not found for slug:', slug)
      console.log('Available posts:')
      try {
        const allPosts = await BlogService.getAllPosts()
        allPosts.forEach(p => console.log(`  - ${p.title} (${p.slug})`))
      } catch (e) {
        console.log('Could not fetch posts for debugging:', e)
      }
      return NextResponse.json(
        { error: `Post not found with slug: ${slug}` },
        { status: 404 }
      )
    }    console.log('Found existing post:', existingPost.id, existingPost.title)

    const body = await request.json()
    console.log('Update data:', body)
    
    // If the title changed, update the slug
    if (body.title && body.title !== existingPost.title) {
      body.slug = BlogService.generateSlug(body.title)
    }

    // If changing to published, set published_at
    if (body.is_published && !existingPost.is_published) {
      body.published_at = new Date().toISOString()
    }    // Extract additional images if provided
    const additionalImages = body.additional_images || []
    delete body.additional_images // Remove from body to avoid DB conflicts

    console.log('Updating post with data:', body)
    console.log('Updating post ID:', existingPost.id)
    
    try {
      const updatedPost = await BlogService.updatePost(existingPost.id, body)

      console.log('Post updated successfully, result:', updatedPost)
        // Save additional images if provided
      if (additionalImages.length > 0) {
        console.log('Saving additional images:', additionalImages)
        console.log('Images to save count:', additionalImages.length)
        console.log('Post slug for images:', updatedPost.slug)
        
        try {
          await BlogService.savePostImages(updatedPost.slug, additionalImages)
          console.log('Additional images saved successfully')
        } catch (imageError) {
          console.error('Error saving additional images:', imageError)
          console.error('Image error details:', {
            message: imageError instanceof Error ? imageError.message : 'Unknown image error',
            stack: imageError instanceof Error ? imageError.stack : undefined,
            additionalImages,
            slug: updatedPost.slug
          })
          // Re-throw the error so the user knows something went wrong
          throw new Error(`Failed to save images: ${imageError instanceof Error ? imageError.message : 'Unknown error'}`)
        }
      } else {
        console.log('No additional images to save')
      }
      
      // Revalidate relevant pages to show updates immediately
      revalidatePath('/blog')
      revalidatePath(`/blog/${existingPost.slug}`)
      revalidatePath('/sitemap.xml')
      
      // If slug changed, revalidate the new slug path too
      if (body.slug && body.slug !== existingPost.slug) {
        revalidatePath(`/blog/${body.slug}`)
      }

      console.log('Post updated successfully:', updatedPost.id)
      return NextResponse.json(updatedPost)    } catch (updateError) {
      console.error('Error in BlogService.updatePost:', updateError)
      console.error('Update error details:', {
        message: updateError instanceof Error ? updateError.message : 'Unknown error',
        stack: updateError instanceof Error ? updateError.stack : undefined
      })
      throw updateError
    }
  } catch (error) {
    console.error('Error updating post:', error)
    return NextResponse.json(
      { error: `Failed to update post: ${error instanceof Error ? error.message : 'Unknown error'}` },
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

    console.log('DELETE request for slug:', slug)    // First, find the post by slug (including drafts for admin operations)
    let existingPost = await BlogService.getPostBySlug(slug)
    
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
