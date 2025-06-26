// Test script to check database connection and schema
const { createClient } = require('@supabase/supabase-js')

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://rtqgxxrdpvetsjeobpxj.supabase.co'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ0cWd4eHJkcHZldHNqZW9icHhqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0OTgyNTI2OSwiZXhwIjoyMDY1NDAxMjY5fQ.BSsXlfpo_rmm4h-cJmOgq0nMnppWYvEJ-NYGGDAzfQM'

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function testDatabase() {
  console.log('Testing database connection and schema...')
  
  try {
    // Test 1: Check if posts table exists and its structure
    console.log('\n1. Checking posts table structure...')
    const { data: posts, error: postsError } = await supabaseAdmin
      .from('posts')
      .select('*')
      .limit(1)
    
    if (postsError) {
      console.error('Posts table error:', postsError)
    } else {
      console.log('Posts table exists. Sample structure:', posts[0] ? Object.keys(posts[0]) : 'No posts found')
    }
    
    // Test 2: Check if blog_images table exists
    console.log('\n2. Checking blog_images table...')
    const { data: images, error: imagesError } = await supabaseAdmin
      .from('blog_images')
      .select('*')
      .limit(1)
    
    if (imagesError) {
      console.error('Blog images table error:', imagesError)
    } else {
      console.log('Blog images table exists. Sample structure:', images[0] ? Object.keys(images[0]) : 'No images found')
    }
    
    // Test 3: Try to create a simple post
    console.log('\n3. Testing post creation...')
    const testPost = {
      title: 'Test Post',
      slug: 'test-post-' + Date.now(),
      content: 'This is a test post content.',
      excerpt: 'Test excerpt',
      is_published: false,
      meta_title: 'Test Meta Title',
      meta_description: 'Test meta description',
      author_name: 'Test Author'
    }
    
    const { data: createResult, error: createError } = await supabaseAdmin
      .from('posts')
      .insert(testPost)
      .select()
      .single()
    
    if (createError) {
      console.error('Create test failed:', createError)
    } else {
      console.log('Create test successful:', createResult.id)
      
      // Test 4: Try to update the post
      console.log('\n4. Testing post update...')
      const { data: updateResult, error: updateError } = await supabaseAdmin
        .from('posts')
        .update({ 
          title: 'Updated Test Post',
          meta_keywords: 'test, keywords'
        })
        .eq('id', createResult.id)
        .select()
        .single()
      
      if (updateError) {
        console.error('Update test failed:', updateError)
      } else {
        console.log('Update test successful:', updateResult.title)
      }
      
      // Clean up
      await supabaseAdmin.from('posts').delete().eq('id', createResult.id)
      console.log('Test post cleaned up')
    }
    
  } catch (error) {
    console.error('Database test failed:', error)
  }
}

testDatabase()
