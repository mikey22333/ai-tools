import { NextResponse } from 'next/server'
import { toolsService } from '@/services/toolsService'

export async function GET() {
  try {
    const [tools, categories] = await Promise.all([
      toolsService.getTools(),
      toolsService.getCategories()
    ])

    // Take first 5 tools for debugging
    const sampleTools = tools.slice(0, 5)
    const sampleCategories = categories.slice(0, 5)

    // Test filtering logic
    const testCategoryId = 'coding-development'
    const filteredTools = tools.filter(tool => tool.category === testCategoryId)

    return NextResponse.json({
      totalTools: tools.length,
      totalCategories: categories.length,
      sampleTools,
      sampleCategories,
      testFilter: {
        categoryId: testCategoryId,
        filteredCount: filteredTools.length,
        filteredSample: filteredTools.slice(0, 3)
      },
      debug: {
        firstToolCategory: tools[0]?.category,
        categoryMatch: tools[0]?.category === testCategoryId,
        availableCategories: categories.map(c => c.id).slice(0, 10)
      }
    })
  } catch (error) {
    console.error('Tools debug API error:', error)
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
