import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    console.log('Testing supabaseAdmin client...')
    
    // Test simple query with supabaseAdmin
    const { data, error } = await supabaseAdmin
      .from('posts')
      .select('count')
      .single()

    if (error) {
      console.error('supabaseAdmin error:', error)
      return NextResponse.json({ 
        success: false, 
        error: error.message,
        details: error
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'supabaseAdmin working',
      count: data
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
