'use client'

import { useState, useEffect } from 'react'
import { toolsService } from '@/services/toolsService'
import { AITool, Category } from '@/types'
import ToolCard from './ToolCard'

export default function ToolsDirectory() {
  const [tools, setTools] = useState<AITool[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('rating')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [displayLimit, setDisplayLimit] = useState<number>(100)
  const [totalToolsCount, setTotalToolsCount] = useState<number>(0)

  useEffect(() => {
    async function fetchData() {
      try {
        const [toolsData, categoriesData] = await Promise.all([
          toolsService.getTools(),
          toolsService.getCategories()
        ])
          // Get total count from stats API for accurate display
        const statsResponse = await fetch('/api/stats')
        const statsData = await statsResponse.json()
        setTotalToolsCount(statsData.tools || toolsData.length)
        
        // Transform the data to match the expected types
        const transformedTools: AITool[] = toolsData.map(tool => ({
          id: tool.id,
          name: tool.name,
          description: tool.description,
          shortDescription: tool.shortDescription || '',
          logo: tool.logo || '',
          category: tool.category, // Use the already transformed category field
          tags: tool.tags || [],
          rating: tool.rating || 0,
          pricing: (tool.pricing || 'Free') as 'Free' | 'Freemium' | 'Paid' | 'Lifetime Deal',
          url: tool.url || '',
          affiliateUrl: tool.affiliateUrl || '',
          featured: tool.featured || false,
          trending: tool.trending || false,
          new: tool.new || false,
          clicks: tool.clicks || 0,
          views: tool.views || 0        }))
        
        // Remove duplicates based on tool ID
        const uniqueTools = transformedTools.filter((tool, index, array) => 
          array.findIndex(t => t.id === tool.id) === index
        )
        
        setTools(uniqueTools)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])
  // Reset display limit when search or category changes
  useEffect(() => {
    setDisplayLimit(100)
  }, [searchQuery, selectedCategory])  // Filter and sort tools
  const filteredTools = tools.filter(tool => {
    // Filter by category first
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory
    
    // If no search query, return category-filtered results
    if (!searchQuery || searchQuery.trim() === '') {
      return matchesCategory
    }
    
    const query = searchQuery.toLowerCase().trim()
    
    // Create searchable text from all relevant fields
    const searchableFields = [
      tool.name || '',
      tool.description || '',
      tool.shortDescription || '',
      ...(Array.isArray(tool.tags) ? tool.tags : [])
    ]
    
    const searchableText = searchableFields
      .filter(field => field && typeof field === 'string')
      .join(' ')
      .toLowerCase()
    
    // Use a more precise search - check if ALL search terms are found
    const searchTerms = query.split(' ').filter(term => term.length > 0)
    const matchesSearch = searchTerms.every(term => {
      // Check for exact word matches first, then partial matches
      const wordBoundaryRegex = new RegExp(`\\b${term}`, 'i')
      return wordBoundaryRegex.test(searchableText) || searchableText.includes(term)
    })
      return matchesCategory && matchesSearch
  })

  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'views') return (b.views || 0) - (a.views || 0)
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    return 0
  })

  if (loading) {
    return (      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading tools directory...</p>
          </div>
        </div>
      </section>
    )
  }

  return (    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-primary-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-200 to-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            All <span className="bg-gradient-to-r from-gray-700 via-primary-600 to-primary-500 bg-clip-text text-transparent">AI Tools</span>
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Browse our complete directory of AI tools with advanced filtering and discover the perfect solution for your needs
          </p>
        </div>        
        {/* Compact Filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search over 5000+ AI tools..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <svg className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>          <div className="flex items-center gap-4">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-w-0"
            >
              <option value="all">-- Select a category --</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name} ({category.toolCount})
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 min-w-0"
            >
              <option value="rating">⭐ Rating</option>
              <option value="views">👁️ Most Popular</option>
              <option value="name">📝 Name (A-Z)</option>
            </select>

            {/* Verified Badge */}
            <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Verified</span>
            </div>

            {/* Pricing Filters */}
            <div className="flex items-center gap-2">
              <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium cursor-pointer hover:bg-green-200 transition-colors">
                Free AI
              </span>
              <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full text-sm font-medium cursor-pointer hover:bg-blue-200 transition-colors">
                Freemium
              </span>
              <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full text-sm font-medium cursor-pointer hover:bg-purple-200 transition-colors">
                Paid
              </span>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-blue-600 font-bold">{Math.min(sortedTools.length, displayLimit)}</span> of <span className="font-bold">{searchQuery || selectedCategory !== 'all' ? sortedTools.length : totalToolsCount}</span> tools
            </p>
            {searchQuery && (
              <span className="text-sm text-gray-500">
                for "<span className="font-medium text-gray-700">{searchQuery}</span>"
              </span>
            )}
            {selectedCategory !== 'all' && (
              <span className="text-sm text-gray-500">
                in <span className="font-medium text-gray-700">{categories.find(c => c.id === selectedCategory)?.name}</span>
              </span>
            )}
          </div>
          
          {/* Load More Button */}
          {sortedTools.length > displayLimit && (
            <div className="mt-4">
              <button
                onClick={() => setDisplayLimit(prev => prev + 100)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                Load More Tools
                <svg className="ml-2 -mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            </div>
          )}        </div>

        {/* Tools Grid */}
        <div 
          key={`${searchQuery}-${selectedCategory}-${sortBy}`}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6"
        >
          {sortedTools.slice(0, displayLimit).map((tool, index) => (
            <div key={`${tool.id}-${index}`}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>{sortedTools.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No tools found for your search' : 'No tools found'}
            </h3>
            <p className="text-gray-600 mb-4">
              {searchQuery 
                ? `We couldn't find any tools matching "${searchQuery}". Try adjusting your search or filters.`
                : 'Try adjusting your filters to see more results.'
              }
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Clear all filters
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
