import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/services/blogService'

/**
 * POST /api/blog/test-delete
 * Test delete functionality with detailed logging
 */
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }
    
    console.log('=== TEST DELETE START ===')
    console.log('Testing delete for slug:', slug)
    
    // Step 1: Find the post
    console.log('Step 1: Finding post...')
    let existingPost = await BlogService.getPublishedPostBySlug(slug)
    
    if (!existingPost) {
      console.log('Not found in published posts, checking all posts...')
      const allPosts = await BlogService.getAllPosts()
      existingPost = allPosts.find(post => post.slug === slug) || null
    }
    
    if (!existingPost) {
      console.log('Post not found anywhere')
      return NextResponse.json({ error: 'Post not found' }, { status: 404 })
    }
    
    console.log('Found post:', existingPost.id, existingPost.title)
    
    // Step 2: Count posts before deletion
    const postsBefore = await BlogService.getAllPosts()
    console.log('Posts count before deletion:', postsBefore.length)
    
    // Step 3: Delete the post
    console.log('Step 3: Deleting post...')
    await BlogService.deletePost(existingPost.id)
    
    // Step 4: Count posts after deletion
    const postsAfter = await BlogService.getAllPosts()
    console.log('Posts count after deletion:', postsAfter.length)
    
    // Step 5: Verify the specific post is gone
    const deletedPostCheck = postsAfter.find(p => p.id === existingPost.id)
    console.log('Deleted post still exists?', !!deletedPostCheck)
    
    console.log('=== TEST DELETE END ===')
    
    return NextResponse.json({
      success: true,
      message: 'Test delete completed',
      details: {
        postId: existingPost.id,
        postTitle: existingPost.title,
        postsCountBefore: postsBefore.length,
        postsCountAfter: postsAfter.length,
        postActuallyDeleted: !deletedPostCheck
      }
    })
    
  } catch (error) {
    console.error('Test delete failed:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Test delete failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
