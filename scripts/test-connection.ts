// Test script to verify Supabase connection
// Run this with: npx tsx scripts/test-connection.ts

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

async function testConnection() {
  console.log('🔧 Testing Supabase connection...\n')
  
  // Check if environment variables are set
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Missing environment variables!')
    console.log('Make sure you have set:')
    console.log('- NEXT_PUBLIC_SUPABASE_URL')
    console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY')
    console.log('in your .env.local file')
    return
  }

  console.log('✅ Environment variables found')
  console.log(`📍 Project URL: ${SUPABASE_URL}`)
  console.log(`🔑 Using anon key: ${SUPABASE_ANON_KEY.substring(0, 20)}...`)

  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    
    // Test basic connection
    const { data, error } = await supabase
      .from('categories')
      .select('count')
      .single()

    if (error) {
      console.log('\n⚠️  Database tables not created yet')
      console.log('Next steps:')
      console.log('1. Go to your Supabase SQL Editor')
      console.log('2. Run the contents of database/schema.sql')
      console.log('3. Run this test again')
    } else {
      console.log('\n🎉 Connection successful!')
      console.log('Database is ready for migration')
    }

  } catch (error) {
    console.error('\n❌ Connection failed:', error)
  }
}

testConnection()
