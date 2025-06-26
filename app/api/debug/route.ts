import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get a sample of tools with their category data
    const { data: tools, error: toolsError } = await supabase
      .from('tools')
      .select('id, name, category_id, rating')
      .limit(10)
      .order('rating', { ascending: false })

    if (toolsError) {
      console.error('Tools error:', toolsError)
      return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 })
    }

    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, tool_count')
      .order('name')

    if (categoriesError) {
      console.error('Categories error:', categoriesError)
      return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 })
    }

    // Get counts for comparison
    const { count: totalTools } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })

    const { count: totalCategories } = await supabase
      .from('categories')
      .select('*', { count: 'exact', head: true })

    return NextResponse.json({
      sampleTools: tools,
      categories: categories,
      totalTools,
      totalCategories,
      debug: {
        message: 'This endpoint shows the raw data structure for debugging',
        toolsStructure: tools?.[0] || 'No tools found',
        categoriesStructure: categories?.[0] || 'No categories found'
      }
    })

  } catch (error) {
    console.error('Debug API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
