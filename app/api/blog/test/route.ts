import { NextRequest, NextResponse } from 'next/server'
import { BlogService } from '@/services/blogService'

/**
 * GET /api/blog/test
 * Test database connectivity and posts table
 */
export async function GET(request: NextRequest) {
  try {
    console.log('Testing database connectivity...')
    
    // Test if we can fetch posts
    const posts = await BlogService.getAllPosts()
    console.log('Fetched posts count:', posts.length)
    
    // Test posts structure
    const samplePost = posts[0]
    console.log('Sample post structure:', samplePost ? Object.keys(samplePost) : 'No posts found')
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      postsCount: posts.length,
      samplePostKeys: samplePost ? Object.keys(samplePost) : [],
      posts: posts.map(p => ({ id: p.id, title: p.title, slug: p.slug }))
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Database test failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
