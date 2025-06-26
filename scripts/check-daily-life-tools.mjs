import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function checkDailyLifeTools() {
  try {
    console.log('Checking existing tools in Daily Life category...')
    
    const { data: tools, error } = await supabase
      .from('tools')
      .select('*')
      .eq('category', 'daily-life')
    
    if (error) {
      console.error('Error fetching tools:', error)
      return
    }
    
    console.log(`Found ${tools.length} existing tools in Daily Life category:`)
    tools.forEach((tool, index) => {
      console.log(`${index + 1}. ${tool.name} - ${tool.description}`)
    })
    
    return tools
  } catch (error) {
    console.error('Error:', error)
  }
}

checkDailyLifeTools()
