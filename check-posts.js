// Test the exact API call that's failing

async function testUpdateAPI() {
  console.log('Testing update API call...')
  
  // First test: GET request with correct slug
  console.log('\n1. Testing GET with correct slug...')
  try {
    const fetch = (await import('node-fetch')).default
    const response = await fetch('http://localhost:3001/api/posts/5-trending-ai-tools-unveiled-at-superai-singapore-2025')
    console.log('GET Response status:', response.status)
    if (response.ok) {
      const data = await response.json()
      console.log('GET Success:', data.title)
    } else {
      const error = await response.text()
      console.log('GET Error:', error)
    }
  } catch (error) {
    console.error('GET Request failed:', error.message)
  }
  
  // Second test: GET request with incorrect slug (the one that's failing)
  console.log('\n2. Testing GET with incorrect slug...')
  try {
    const fetch = (await import('node-fetch')).default
    const response = await fetch('http://localhost:3001/api/posts/superai-singapore-2025-ai-tools')
    console.log('GET Response status:', response.status)
    const data = await response.text()
    console.log('GET Response:', data)
  } catch (error) {
    console.error('GET Request failed:', error.message)
  }
  
  // Third test: Simulate the PUT request with correct slug  
  console.log('\n3. Testing PUT with correct slug...')
  try {
    const fetch = (await import('node-fetch')).default
    const updateData = {
      title: "5 Trending AI Tools Unveiled at SuperAI Singapore 2025 - Updated",
      content: "Updated content...",
      meta_title: "Updated meta title"
    }
    
    const response = await fetch('http://localhost:3001/api/posts/5-trending-ai-tools-unveiled-at-superai-singapore-2025', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updateData)
    })
    
    console.log('PUT Response status:', response.status)
    if (response.ok) {
      const data = await response.json()
      console.log('PUT Success:', data.title)
    } else {
      const error = await response.text()
      console.log('PUT Error:', error)
    }
  } catch (error) {
    console.error('PUT Request failed:', error.message)
  }
}

testUpdateAPI()
