// Quick test to check blog_images table
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = 'https://rtqgxxrdpvetsjeobpxj.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cWd4eHJkcHZldHNqZW9icHhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTgyNTI2OSwiZXhwIjoyMDY1NDAxMjY5fQ.BSsXlfpo_rmm4h-cJmOgq0nMnppWYvEJ-NYGGDAzfQM'

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

async function testBlogImages() {
  console.log('Testing blog_images table...')
  
  try {
    // Test if we can query the table
    const { data, error } = await supabaseAdmin
      .from('blog_images')
      .select('*')
      .limit(1)
    
    if (error) {
      console.error('Error querying blog_images table:', error)
    } else {
      console.log('blog_images table exists and is accessible')
      console.log('Sample structure:', data[0] ? Object.keys(data[0]) : 'No images found')
    }
    
    // Test insert
    const testSlug = 'test-' + Date.now()
    const testImage = {
      post_slug: testSlug,
      image_url: 'https://example.com/test.jpg',
      display_order: 1
    }
    
    console.log('\nTesting insert...')
    const { data: insertData, error: insertError } = await supabaseAdmin
      .from('blog_images')
      .insert(testImage)
      .select()
    
    if (insertError) {
      console.error('Insert error:', insertError)
    } else {
      console.log('Insert successful:', insertData)
      
      // Clean up
      await supabaseAdmin
        .from('blog_images')
        .delete()
        .eq('post_slug', testSlug)
      console.log('Test data cleaned up')
    }
    
  } catch (error) {
    console.error('Test failed:', error)
  }
}

testBlogImages()
