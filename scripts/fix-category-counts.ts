// Fix category tool counts
// Run this with: npx tsx scripts/fix-category-counts.ts

import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

console.log('Supabase URL:', supabaseUrl ? 'Found' : 'Missing')
console.log('Supabase Key:', supabaseKey ? 'Found' : 'Missing')

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  console.error('Make sure .env.local exists with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function fixCategoryCounts() {
  try {
    console.log('🔍 Checking current category counts...')
    
    // Get all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('id, name, tool_count')
    
    if (categoriesError) {
      throw categoriesError
    }
    
    console.log('\n📊 Current vs Actual Tool Counts:')
    console.log('Category'.padEnd(25) + 'Current'.padEnd(10) + 'Actual'.padEnd(10) + 'Status')
    console.log('-'.repeat(50))
    
    // Check actual counts and update if needed
    for (const category of categories) {
      // Get actual tool count for this category
      const { count: actualCount, error: countError } = await supabase
        .from('tools')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', category.id)
      
      if (countError) {
        console.error(`Error counting tools for ${category.name}:`, countError)
        continue
      }
        const currentCount = category.tool_count || 0
      const actualCountValue = actualCount || 0
      const status = currentCount === actualCountValue ? '✅' : '❌'
      
      console.log(
        category.name.padEnd(25) + 
        currentCount.toString().padEnd(10) + 
        actualCountValue.toString().padEnd(10) + 
        status
      )
      
      // Update if counts don't match
      if (currentCount !== actualCountValue) {
        const { error: updateError } = await supabase
          .from('categories')
          .update({ tool_count: actualCountValue })
          .eq('id', category.id)
        
        if (updateError) {
          console.error(`Error updating ${category.name}:`, updateError)
        } else {
          console.log(`  ✅ Updated ${category.name} from ${currentCount} to ${actualCountValue}`)
        }
      }
    }
    
    console.log('\n🎉 Category count fix completed!')
    
  } catch (error) {
    console.error('❌ Error fixing category counts:', error)
  }
}

fixCategoryCounts()
