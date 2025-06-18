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
            </h3>
            <div className="flex items-center flex-wrap gap-2 mt-2">
              <div className="flex items-center space-x-1">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(tool.rating)
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-xs text-gray-500 font-medium">{tool.rating}</span>
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
          </div>

          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center space-x-3 text-xs text-gray-500">
              <span className="flex items-center space-x-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                </svg>
                <span>{formatNumberWithCommas(tool.views || 0)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.672 1.911a1 1 0 10-1.932.518l.259.966a1 1 0 001.932-.518l-.26-.966zM2.429 4.74a1 1 0 10-.517 1.932l.966.259a1 1 0 00.517-1.932l-.966-.26zm8.814-.569a1 1 0 00-1.415-1.414l-.707.707a1 1 0 101.415 1.414l.707-.707zm-7.071 7.072l.707-.707A1 1 0 003.465 9.12l-.708.707a1 1 0 001.415 1.415zm3.2-5.171a1 1 0 00-1.3 1.3l4 10a1 1 0 001.823.075l1.38-2.759 3.018 3.02a1 1 0 001.414-1.415l-3.019-3.02 2.76-1.379a1 1 0 00-.076-1.822l-10-4z" clipRule="evenodd" />
                </svg>
                <span>{formatNumberWithCommas(tool.clicks || 0)}</span>
              </span>
            </div>

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
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured tools...</p>
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
            <FeaturedToolCard key={tool.id} tool={tool} index={index} />
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
