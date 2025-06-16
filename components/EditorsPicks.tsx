'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toolsService } from '@/services/toolsService'
import { AITool } from '@/types'
import { formatNumberWithCommas } from '@/utils/format'

export default function EditorsPicks() {
  const [featuredTools, setFeaturedTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)

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
      } catch (error) {
        console.error('Error fetching featured tools:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedTools()
  }, [])

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading featured tools...</p>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section className="py-20 bg-gradient-to-b from-dark-900 to-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">Editor's Picks</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Hand-selected tools that are making waves in the AI world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTools.slice(0, 6).map((tool, index) => (            <div key={tool.id} className="featured-tool-card group relative cursor-default">
              <div className="featured-tool-inner bg-gradient-to-br from-dark-800 to-dark-700 border border-gray-700 rounded-xl p-6 h-full transition-all duration-300 hover:scale-105">
                <div className="flex items-start space-x-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 p-2 flex-shrink-0">
                  <Image
                    src={tool.logo}
                    alt={`${tool.name} logo`}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-lg"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-semibold text-white group-hover:text-primary-400 transition-colors">
                    {tool.name}
                  </h3>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center space-x-1">
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(tool.rating)
                                ? 'text-yellow-400'
                                : 'text-gray-600'
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">{tool.rating}</span>
                    </div>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      tool.pricing === 'Free' ? 'bg-green-500/20 text-green-400' :
                      tool.pricing === 'Freemium' ? 'bg-blue-500/20 text-blue-400' :
                      tool.pricing === 'Lifetime Deal' ? 'bg-purple-500/20 text-purple-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      {tool.pricing}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 text-sm leading-relaxed mb-6">
                {tool.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {tool.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-dark-600 text-gray-300 rounded-md text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>{formatNumberWithCommas(tool.views || 0)} views</span>
                  <span>{formatNumberWithCommas(tool.clicks || 0)} clicks</span>
                </div>                <Link
                  href={tool.affiliateUrl || tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-primary-500 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
                  style={{ cursor: 'pointer', zIndex: 9999, position: 'relative' }}
                >
                  Try Now
                </Link></div>
              </div>

              {tool.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-primary-500 to-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/top-picks"
            className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300 font-medium transition-colors"
          >
            <span>View All Editor's Picks</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
