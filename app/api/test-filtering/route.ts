import { NextResponse } from 'next/server'
import { toolsService } from '@/services/toolsService'

export async function GET() {
  try {
    const [tools, categories] = await Promise.all([
      toolsService.getTools(),
      toolsService.getCategories()
    ])    // Test several category filters
    const testCategories = ['coding-development', 'art-creative-design', 'chatbots-virtual-companions']
    const filterResults: Record<string, any> = {}

    testCategories.forEach(categoryId => {
      const filteredTools = tools.filter(tool => tool.category === categoryId)
      const categoryInfo = categories.find(c => c.id === categoryId)
      
      filterResults[categoryId] = {
        actualCount: filteredTools.length,
        expectedCount: categoryInfo?.toolCount || 0,
        matches: filteredTools.length === categoryInfo?.toolCount,
        categoryExists: !!categoryInfo
      }
    })

    return NextResponse.json({
      success: true,
      totalTools: tools.length,
      totalCategories: categories.length,
      filterTests: filterResults,
      summary: {
        allFiltersWorking: Object.values(filterResults).every(r => r.matches),
        message: 'All Tools page filtering verification complete'
      }
    })

  } catch (error) {
    console.error('Final test error:', error)
    return NextResponse.json({ 
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}
