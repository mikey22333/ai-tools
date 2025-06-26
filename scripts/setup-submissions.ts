import { supabase } from '../lib/supabase'
import { readFileSync } from 'fs'
import { join } from 'path'

async function setupSubmissionsTable() {
  try {
    console.log('Setting up submissions table...')
    
    const sqlFile = readFileSync(
      join(process.cwd(), 'database', 'create-submissions-table.sql'),
      'utf8'
    )
    
    const { error } = await supabase.rpc('exec_sql', { sql: sqlFile })
    
    if (error) {
      console.error('Error creating submissions table:', error)
      return
    }
    
    console.log('✅ Submissions table created successfully!')
    
  } catch (error) {
    console.error('Setup error:', error)
  }
}

setupSubmissionsTable()
