import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get tools count
    const { count: toolsCount, error: toolsError } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })

    if (toolsError) {
      console.error('Error fetching tools count:', toolsError)
    }

    // Get categories count
    const { count: categoriesCount, error: categoriesError } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })

    if (categoriesError) {
      console.error('Error fetching categories count:', categoriesError)
    }

    return NextResponse.json({
      tools: toolsCount || 0,
      categories: categoriesCount || 0,
      users: '1M+' // Hardcoded as requested
    })

  } catch (error) {
    console.error('Stats API error:', error)
    return NextResponse.json(
      { 
        tools: 0, 
        categories: 0, 
        users: '1M+' 
      },
      { status: 200 } // Still return 200 with fallback data
    )
  }
}
