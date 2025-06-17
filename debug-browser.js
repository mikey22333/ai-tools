// Simple test to check category data
console.log('=== CATEGORY FILTERING DEBUG ===')

// Add this to your browser console to debug
function debugCategoryFiltering() {
  // Get the current selected category
  const dropdown = document.querySelector('select[value*="image"]') || document.querySelector('select')
  const selectedValue = dropdown ? dropdown.value : 'unknown'
  
  console.log('Selected category from dropdown:', selectedValue)
  
  // Check if there are any tools loaded
  console.log('Total tools loaded:', window.__DEBUG_TOOLS ? window.__DEBUG_TOOLS.length : 'unknown')
  
  // Check category mapping
  if (window.__DEBUG_TOOLS) {
    const categoryGroups = window.__DEBUG_TOOLS.reduce((acc, tool) => {
      acc[tool.category] = (acc[tool.category] || 0) + 1
      return acc
    }, {})
    
    console.log('Tools by category:', categoryGroups)
  }
}

// Run the debug
debugCategoryFiltering()
