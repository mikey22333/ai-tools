import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/blog/env-check
 * Check if required environment variables are set
 */
export async function GET(request: NextRequest) {
  try {
    const hasSupabaseUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL
    const hasAnonKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    const hasServiceKey = !!process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log('Environment check:')
    console.log('- SUPABASE_URL:', hasSupabaseUrl)
    console.log('- ANON_KEY:', hasAnonKey)
    console.log('- SERVICE_KEY:', hasServiceKey)
    
    return NextResponse.json({
      environment: {
        supabaseUrl: hasSupabaseUrl,
        anonKey: hasAnonKey,
        serviceKey: hasServiceKey
      },
      ready: hasSupabaseUrl && hasAnonKey && hasServiceKey,
      message: hasServiceKey ? 
        'All environment variables are set!' : 
        'Missing SUPABASE_SERVICE_ROLE_KEY - add it to .env.local'
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Environment check failed' },
      { status: 500 }
    )
  }
}
