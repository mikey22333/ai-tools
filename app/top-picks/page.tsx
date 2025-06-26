'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { toolsService } from '@/services/toolsService'
import { AITool } from '@/types'
import ToolCard from '@/components/ToolCard'

export default function TopPicksPage() {
  const [featuredTools, setFeaturedTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchFeaturedTools() {
      try {
        const data = await toolsService.getFeaturedTools()
        // Transform the data to match the expected types
        const transformedTools: AITool[] = data.map(tool => ({
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
        setFeaturedTools(transformedTools)
      } catch (err) {
        console.error('Error fetching featured tools:', err)
        setError('Failed to load featured tools')
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedTools()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-dark-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading top picks...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-dark-900 pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
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
  return (
    <div className="min-h-screen bg-dark-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-display font-bold mb-6">
            Editor's <span className="gradient-text">Top Picks</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Our carefully curated selection of the best AI tools that are making a real impact. 
            These tools have been hand-picked by our team for their innovation, utility, and user experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTools.map((tool, index) => (
            <div key={`${tool.id}-${index}`}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>

        {/* Why These Tools */}
        <div className="mt-20 glass-effect rounded-2xl p-8 md:p-12">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Why These Tools Made the Cut
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Innovation</h3>
              <p className="text-gray-400 text-sm">Cutting-edge technology and unique approaches</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Performance</h3>
              <p className="text-gray-400 text-sm">Reliable, fast, and efficient execution</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">User Love</h3>
              <p className="text-gray-400 text-sm">Highly rated and widely adopted by users</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.034 0-3.9.785-5.291 2.073M6.343 6.343A8 8 0 1017.657 17.657 8 8 0 006.343 6.343z" />
                </svg>
              </div>
              <h3 className="font-semibold text-white mb-2">Utility</h3>
              <p className="text-gray-400 text-sm">Solves real problems with practical value</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
