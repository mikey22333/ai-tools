'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toolsService } from '@/services/toolsService'
import { AITool, Category } from '@/types'
import { formatNumberWithCommas } from '@/utils/format'

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [tools, setTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const [categoriesData, toolsData] = await Promise.all([
          toolsService.getCategories(),
          toolsService.getTools()
        ])
        
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
        
        setCategories(categoriesData)
        setTools(transformedTools)
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('Failed to load categories and tools')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading categories...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (      <div className="min-h-screen bg-white pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="btn-primary"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>)
  }  return (
    <div className="min-h-screen pt-20 relative overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/50 via-transparent to-yellow-50/30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/30 to-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            AI Tool <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore our comprehensive collection of AI tools organized by use case and industry. 
            Find exactly what you need for your projects.
          </p>
        </div><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => {
            return (<div
                key={category.id}
                className="group relative bg-white hover:bg-gray-50 transition-all duration-300 rounded-lg p-5 border border-gray-200 hover:border-primary-400/30"
              >
                <Link href={`/categories/${category.id}`}>
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-lg flex-shrink-0`}>
                      {category.icon}
                    </div>
                    <div className="flex-1 min-w-0">                      <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                        {category.name}
                      </h3>                      <p className="text-xs text-gray-500 mt-1">
                        {category.toolCount} tools
                      </p>
                    </div>
                  </div>
                    <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                    {category.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">                    <div className="text-primary-600 font-medium group-hover:text-primary-500 transition-colors">
                      Explore
                    </div>                    <svg className="w-3 h-3 text-primary-600 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              </div>
            )
          })}
        </div>        {/* Stats */}
        <div className="mt-20 bg-white/80 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {categories.length}+
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {tools.length}+
              </div>
              <div className="text-gray-600">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold gradient-text mb-2">
                {formatNumberWithCommas(tools.reduce((sum, tool) => sum + (tool.views || 0), 0))}+
              </div>
              <div className="text-gray-600">Total Views</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
