import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * POST /api/blog/debug-delete
 * Debug delete issues with RLS bypass
 */
export async function POST(request: NextRequest) {
  try {
    const { slug } = await request.json()
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
    }
    
    console.log('=== DEBUG DELETE START ===')
    console.log('Debug delete for slug:', slug)
    
    // First, let's check RLS policies and authentication
    const { data: authData, error: authError } = await supabase.auth.getUser()
    console.log('Auth data:', authData?.user?.id || 'No user')
    console.log('Auth error:', authError?.message || 'No auth error')
    
    // Check if we can see posts at all
    const { data: allPosts, error: fetchError } = await supabase
      .from('posts')
      .select('id, title, slug, is_published')
    
    console.log('Can fetch posts?', !fetchError)
    console.log('Posts count:', allPosts?.length || 0)
    console.log('Fetch error:', fetchError?.message || 'No fetch error')
    
    // Find the specific post
    const targetPost = allPosts?.find(p => p.slug === slug)
    console.log('Found target post?', !!targetPost)
    
    if (!targetPost) {
      return NextResponse.json({ 
        error: 'Post not found',
        debug: {
          authUser: authData?.user?.id || null,
          postsCount: allPosts?.length || 0,
          allSlugs: allPosts?.map(p => p.slug) || []
        }
      }, { status: 404 })
    }
    
    console.log('Target post:', targetPost)
    
    // Try to delete with detailed error handling
    const { error: deleteError } = await supabase
      .from('posts')
      .delete()
      .eq('id', targetPost.id)
    
    console.log('Delete error:', deleteError?.message || 'No delete error')
    console.log('Delete error code:', deleteError?.code || 'No error code')
    console.log('Delete error details:', deleteError?.details || 'No error details')
    
    if (deleteError) {
      return NextResponse.json({
        success: false,
        error: 'Delete failed',
        debug: {
          supabaseError: deleteError.message,
          errorCode: deleteError.code,
          errorDetails: deleteError.details,
          postId: targetPost.id,
          authUser: authData?.user?.id || null
        }
      }, { status: 500 })
    }
    
    // Verify deletion
    const { data: postsAfter, error: fetchAfterError } = await supabase
      .from('posts')
      .select('id, title, slug')
    
    const postStillExists = postsAfter?.find(p => p.id === targetPost.id)
    
    console.log('=== DEBUG DELETE END ===')
    
    return NextResponse.json({
      success: true,
      message: 'Debug delete completed',
      debug: {
        postId: targetPost.id,
        postTitle: targetPost.title,
        postActuallyDeleted: !postStillExists,
        postsCountAfter: postsAfter?.length || 0,
        authUser: authData?.user?.id || null
      }
    })
    
  } catch (error) {
    console.error('Debug delete failed:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Debug delete failed',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
