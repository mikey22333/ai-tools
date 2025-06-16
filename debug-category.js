const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function checkCategoryData() {
  try {
    console.log('Checking Image Generation & Editing category...')
    
    // Get the category
    const { data: categories, error: catError } = await supabase
      .from('categories')
      .select('id, name, tool_count')
      .ilike('name', '%image generation%')
    
    if (catError) {
      console.error('Category error:', catError)
      return
    }
    
    console.log('Categories found:', categories)
    
    if (categories && categories[0]) {
      const categoryId = categories[0].id
      console.log('Category ID:', categoryId)
      
      // Get tools in this category
      const { data: tools, error: toolsError } = await supabase
        .from('tools')
        .select('id, name, category_id')
        .eq('category_id', categoryId)
        .limit(10)
      
      if (toolsError) {
        console.error('Tools error:', toolsError)
        return
      }
        
      console.log('Sample tools in category:')
      tools.forEach(tool => {
        console.log(`- ${tool.name} (category: ${tool.category_id})`)
      })
      
      // Get total count
      const { count } = await supabase
        .from('tools')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', categoryId)
      
      console.log('Total tools in category:', count)
    }
  } catch (error) {
    console.error('Error:', error)
  }
}

checkCategoryData()
