'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toolsService } from '@/services/toolsService'
import { AITool } from '@/types'
import { formatNumberWithCommas } from '@/utils/format'

// Image error handling hook
function useImageWithFallback(initialSrc: string, toolUrl: string) {
  const [imageSrc, setImageSrc] = useState(initialSrc || '')
  const [imageError, setImageError] = useState(false)
  
  const getFallbackUrls = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return [
        initialSrc, // Try the original logo first
        `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        `https://icon.horse/icon/${domain}`,
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        '/images/default-tool-logo.svg' // Local fallback
      ].filter(Boolean) as string[]
    } catch (e) {
      return ['/images/default-tool-logo.svg']
    }
  }

  const handleImageError = () => {
    if (imageError) return // Already tried fallbacks
    
    const fallbackUrls = getFallbackUrls(toolUrl)
    const currentIndex = fallbackUrls.findIndex(url => url === imageSrc)
    
    if (currentIndex < fallbackUrls.length - 1) {
      // Try next fallback URL
      setImageSrc(fallbackUrls[currentIndex + 1])
    } else {
      // All fallbacks failed, use default
      setImageError(true)
      setImageSrc('/images/default-tool-logo.svg')
    }
  }

  // Reset when initialSrc changes
  useEffect(() => {
    setImageSrc(initialSrc || '')
    setImageError(false)
  }, [initialSrc])

  return { imageSrc, handleImageError, imageError }
}

// Featured Tool Card Component with Image Error Handling
function FeaturedToolCard({ tool, index }: { tool: AITool; index: number }) {
  const { imageSrc, handleImageError } = useImageWithFallback(tool.logo, tool.url)
  
  return (
    <div className="featured-tool-card group relative p-3">
      <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 hover:border-primary-200 relative flex flex-col">
        <div className="flex items-start space-x-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 p-3 flex-shrink-0 border border-primary-100">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={`${tool.name} logo`}
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-contain"
                onError={handleImageError}
                unoptimized={imageSrc.startsWith('http')} // Don't optimize external images
              />
            ) : (
              <div className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-sm font-bold text-gray-500">
                  {tool.name[0]?.toUpperCase()}
                </span>
              </div>
            )}
          </div>          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors line-clamp-2 mb-2">
              {tool.name}
            </h3>            <div className="flex items-center flex-wrap gap-2 mt-2">
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500 font-medium">{tool.rating}/5</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold shrink-0 ${
                tool.pricing === 'Free' ? 'bg-green-100 text-green-700' :
                tool.pricing === 'Freemium' ? 'bg-blue-100 text-blue-700' :
                tool.pricing === 'Lifetime Deal' ? 'bg-purple-100 text-purple-700' :
                'bg-orange-100 text-orange-700'
              }`}>
                {tool.pricing}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {tool.shortDescription}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-6">
            {tool.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs font-medium"
              >
                {tag}
              </span>
            ))}
          </div>          <div className="flex items-center justify-end mt-auto">
            <Link
              href={tool.affiliateUrl || tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-primary-500 to-blue-600 text-white px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 cursor-pointer"
            >
              Try Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function EditorsPicks() {
  const [featuredTools, setFeaturedTools] = useState<AITool[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

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
        
        // Remove duplicates based on tool ID
        const uniqueTools = transformedTools.filter((tool, index, array) => 
          array.findIndex(t => t.id === tool.id) === index
        )
        
        setFeaturedTools(uniqueTools)
      } catch (error) {
        console.error('Error fetching featured tools:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isClient) {
      fetchFeaturedTools()
    }
  }, [isClient])

  // Prevent hydration mismatch by showing static content during SSR
  if (!isClient) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-gray-900">
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Editor's Picks</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hand-selected tools that are making waves in the AI world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 pt-4">
            {/* Placeholder skeleton cards */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="featured-tool-card group relative p-3">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full animate-pulse">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-5 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-1.5 mb-6">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="flex justify-end">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-gray-900">
              <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Editor's Picks</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hand-selected tools that are making waves in the AI world
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 pt-4">
            {/* Loading skeleton cards */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="featured-tool-card group relative p-3">
                <div className="bg-white border border-gray-200 rounded-2xl p-6 h-full animate-pulse">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gray-200"></div>
                    <div className="flex-1 min-w-0">
                      <div className="h-5 bg-gray-200 rounded mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                  <div className="h-12 bg-gray-200 rounded mb-4"></div>
                  <div className="flex gap-1.5 mb-6">
                    <div className="h-6 bg-gray-200 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 rounded w-20"></div>
                  </div>
                  <div className="flex justify-end">
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4 text-gray-900">
            <span className="bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent">Editor's Picks</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hand-selected tools that are making waves in the AI world
          </p>        </div>        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4 pt-4">
          {featuredTools.slice(0, 8).map((tool, index) => (
            <FeaturedToolCard key={`${tool.id}-${index}`} tool={tool} index={index} />
          ))}
        </div><div className="text-center mt-12">
          <Link
            href="/top-picks"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-blue-600 bg-clip-text text-transparent hover:from-primary-700 hover:to-blue-700 font-semibold transition-all duration-300 group"
          >
            <span>View All Editor's Picks</span>
            <svg className="w-5 h-5 text-primary-600 group-hover:text-primary-700 group-hover:translate-x-1 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
