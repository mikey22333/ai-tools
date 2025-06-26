'use client'

import { useState, useEffect } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { toolsService } from '@/services/toolsService'
import { AITool, Category } from '@/types'
import ToolCard from '@/components/ToolCard'

interface CategoryPageProps {
  params: Promise<{
    categoryId: string
  }>
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null)
  const [tools, setTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [sortBy, setSortBy] = useState<string>('rating')
  const [pricingFilter, setPricingFilter] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState<string>('')

  useEffect(() => {
    async function fetchData() {
      try {
        const { categoryId } = await params
        const [categoriesData, toolsData] = await Promise.all([
          toolsService.getCategories(),
          toolsService.getToolsByCategory(categoryId)
        ])
        
        // Find the category
        const foundCategory = categoriesData.find(cat => cat.id === categoryId)
        if (!foundCategory) {
          notFound()
          return
        }
        
        // Transform tools data to match expected types
        const transformedTools: AITool[] = toolsData.map(tool => ({
          ...tool,
          shortDescription: tool.shortDescription || '',
          logo: tool.logo || '',
          affiliateUrl: tool.affiliateUrl || '',
          featured: tool.featured || false,
          trending: tool.trending || false,
          new: tool.new || false,
          clicks: tool.clicks || 0,
          views: tool.views || 0,
          pricing: (tool.pricing || 'Free') as 'Free' | 'Freemium' | 'Paid' | 'Lifetime Deal'
        }))
        
        setCategory(foundCategory)
        setTools(transformedTools)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load category data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading category...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !category) {
    return (      <div className="min-h-screen bg-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error || 'Category not found'}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }
  // Filter and sort tools
  const filteredTools = tools.filter(tool => {
    // Pricing filter
    if (pricingFilter !== 'all' && tool.pricing !== pricingFilter) return false
    
    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      return (
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }
    
    return true
  })

  const sortedTools = [...filteredTools].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating
    if (sortBy === 'views') return (b.views || 0) - (a.views || 0)
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'pricing') return a.pricing.localeCompare(b.pricing)
    return 0
  })
  return (    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-r from-primary-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-r from-yellow-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-200 to-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        
        {/* Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-gray-100/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Category Header with Glass Effect */}
          <div className="text-center mb-12">            {/* Category Icon with Enhanced Glow and Animation */}
            <div className="relative mb-8 animate-float">
              <div className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${category.color} flex items-center justify-center text-5xl mx-auto shadow-2xl backdrop-blur-sm border border-white/20`}>
                {category.icon}
              </div>
              {/* Glow Effect */}
              <div className={`absolute inset-0 w-28 h-28 rounded-3xl bg-gradient-to-br ${category.color} mx-auto blur-3xl opacity-60 -z-10 animate-pulse`}></div>
              {/* Ring Effect */}
              <div className={`absolute inset-0 w-28 h-28 rounded-3xl border-2 ${category.color} mx-auto opacity-30 animate-ping`}></div>
            </div>
              <h1 className="text-5xl sm:text-6xl font-display font-bold mb-6">
              <span className="bg-gradient-to-r from-gray-800 via-primary-600 to-primary-500 bg-clip-text text-transparent">
                {category.name}
              </span>
            </h1>
            <p className="text-gray-600 text-xl max-w-4xl mx-auto mb-8 leading-relaxed">
              {category.description}
            </p>
            
            {/* Dynamic Stats Cards */}
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-6 py-4 hover:bg-white transition-all duration-300">
                <span className="text-primary-600 font-bold text-lg">{filteredTools.length}</span>
                <span className="text-gray-600 ml-2">{filteredTools.length === 1 ? 'tool' : 'tools'} {pricingFilter !== 'all' ? `(${pricingFilter})` : 'available'}</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-6 py-4 hover:bg-white transition-all duration-300">
                <span className="text-green-600 font-bold text-lg">Live</span>
                <span className="text-gray-600 ml-2">updated regularly</span>
              </div>
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl px-6 py-4 hover:bg-white transition-all duration-300">
                <span className="text-blue-600 font-bold text-lg">⭐ {(filteredTools.reduce((sum, tool) => sum + tool.rating, 0) / filteredTools.length || 0).toFixed(1)}</span>
                <span className="text-gray-600 ml-2">avg rating</span>
              </div>
            </div></div>        {/* Enhanced Filters Section */}
        <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-8 shadow-sm">
          {/* Search Bar */}
          <div className="relative mb-4">
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
                aria-label="Clear search"
              >
                <svg className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filters Row - Made scrollable on mobile */}
          <div className="overflow-x-auto pb-2 -mx-2 sm:mx-0">
            <div className="flex items-center gap-3 min-w-max px-2 sm:px-0">
              {/* Sort Filter */}
              <div className="flex-shrink-0">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full"
                >
                  <option value="rating">⭐ Rating</option>
                  <option value="views">👁️ Most Popular</option>
                  <option value="name">📝 Name (A-Z)</option>
                </select>
              </div>

              {/* Pricing Filter */}
              <div className="flex-shrink-0">
                <select
                  value={pricingFilter}
                  onChange={(e) => setPricingFilter(e.target.value)}
                  className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 w-full"
                >
                  <option value="all">All Pricing</option>
                  <option value="Free">🆓 Free</option>
                  <option value="Freemium">🔓 Freemium</option>
                  <option value="Paid">💰 Paid</option>
                  <option value="Lifetime Deal">🎯 Lifetime Deal</option>
                </select>
              </div>

              {/* Verified Badge */}
              <div className="flex-shrink-0 hidden sm:flex items-center gap-2 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">Verified</span>
              </div>

              {/* Pricing Filter Chips - Only show on larger screens */}
              <div className="hidden md:flex items-center gap-2">
                {['Free', 'Freemium', 'Paid'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPricingFilter(type)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                      pricingFilter === type 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile-only filters */}
          <div className="mt-3 flex flex-wrap gap-2 sm:hidden">
            <button
              onClick={() => setPricingFilter('Free')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                pricingFilter === 'Free' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Free AI
            </button>
            <button
              onClick={() => setPricingFilter('Freemium')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                pricingFilter === 'Freemium' 
                  ? 'bg-blue-100 text-blue-800' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Freemium
            </button>
            <button
              onClick={() => setPricingFilter('Paid')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium ${
                pricingFilter === 'Paid' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              Paid
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <p className="text-gray-600 font-medium">
              Showing <span className="text-blue-600 font-bold">{sortedTools.length}</span> of <span className="font-bold">{filteredTools.length}</span> tools
            </p>
            {searchQuery && (
              <span className="text-sm text-gray-500">
                for "<span className="font-medium text-gray-700">{searchQuery}</span>"
              </span>
            )}
          </div>
        </div>

        {/* Enhanced Tools Grid with Background Pattern */}
        <div className="relative">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5 rounded-3xl"></div>
          
          {sortedTools.length > 0 ? (
            <div className="relative z-10">
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {sortedTools.map((tool, index) => (
                  <div 
                    key={`${tool.id}-${index}`}
                    className="transform transition-all duration-300 hover:scale-105"
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      animation: 'fadeInUp 0.6s ease-out forwards'
                    }}
                  >
                    <ToolCard tool={tool} />
                  </div>
                ))}
              </div>
            </div>          ) : (
            <div className="text-center py-16 relative z-10">
              <div className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-2xl p-12 max-w-md mx-auto">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'No search results found' : 'No tools found'}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery ? (
                    <>
                      No tools match your search for "{searchQuery}". 
                      Try different keywords or clear your search.
                    </>
                  ) : pricingFilter === 'all' ? (
                    'No tools available in this category yet.'
                  ) : (
                    `No ${pricingFilter.toLowerCase()} tools found in this category.`
                  )}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="bg-gradient-to-r from-primary-500 to-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                    >
                      Clear Search
                    </button>
                  )}
                  {pricingFilter !== 'all' && (
                    <button
                      onClick={() => setPricingFilter('all')}
                      className="bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                    >
                      Show All Tools
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}</div>

        {/* Back to Categories */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to All Categories</span>
          </Link>
        </div>
        </div>
      </div>
    </div>
  )
}
