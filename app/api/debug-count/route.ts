import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    // Get total count first
    const { count: totalCount, error: countError } = await supabase
      .from('tools')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Count error:', countError)
      return NextResponse.json({ error: 'Failed to get count' }, { status: 500 })
    }

    // Get all tools without limit to see actual data
    const { data: allTools, error: toolsError } = await supabase
      .from('tools')
      .select('id, name, category_id')
      .order('rating', { ascending: false })

    if (toolsError) {
      console.error('Tools error:', toolsError)
      return NextResponse.json({ error: 'Failed to fetch tools' }, { status: 500 })
    }

    // Test with current service method
    const { data: limitedTools, error: limitedError } = await supabase
      .from('tools')
      .select('id, name, category_id')
      .order('rating', { ascending: false })
      .limit(5000)

    if (limitedError) {
      console.error('Limited tools error:', limitedError)
    }    // Count tools by category from the unlimited fetch
    const categoryCount: Record<string, number> = {}
    allTools?.forEach(tool => {
      const cat = tool.category_id
      categoryCount[cat] = (categoryCount[cat] || 0) + 1
    })

    return NextResponse.json({
      totalCount,
      actualFetched: allTools?.length || 0,
      limitedFetched: limitedTools?.length || 0,      topCategories: Object.entries(categoryCount)
        .sort(([,a], [,b]) => (b as number) - (a as number))
        .slice(0, 10)
        .map(([cat, count]) => ({ category: cat, count })),
      debug: {
        firstTool: allTools?.[0],
        lastTool: allTools?.[allTools?.length - 1],
        sampleCategories: allTools?.slice(0, 5).map(t => t.category_id)
      }
    })

  } catch (error) {
    console.error('Count debug API error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
