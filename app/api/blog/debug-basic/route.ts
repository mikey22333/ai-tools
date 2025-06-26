import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing basic supabase client with posts table...')
    
    // Test with regular supabase client first
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, is_published')
      .limit(5)

    if (error) {
      console.error('supabase error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Basic supabase client working',
      posts: data,
      count: data?.length || 0
    })
  } catch (error) {
    console.error('Caught error:', error)
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
  }
}
