'use client'

import Image from 'next/image'
import Link from 'next/link'
import { AITool } from '@/types'
import { useState } from 'react'

interface ToolCardProps {
  tool: AITool
  showTrendingBadge?: boolean
}

export default function ToolCard({ tool, showTrendingBadge = false }: ToolCardProps) {
  const [imageSrc, setImageSrc] = useState(tool.logo || '')
  const [imageError, setImageError] = useState(false)
  
  // Generate fallback URLs based on the tool's URL
  const getFallbackUrls = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return [
        `https://www.google.com/s2/favicons?domain=${domain}&sz=64`,
        `https://icon.horse/icon/${domain}`,
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        '/images/default-tool-logo.svg' // Local fallback
      ]
    } catch (e) {
      return ['/images/default-tool-logo.svg']
    }
  }

  const handleImageError = () => {
    if (imageError) return // Already tried fallbacks
    
    const fallbackUrls = getFallbackUrls(tool.url)
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

  return (
    <div className="tool-card group relative bg-white hover:bg-gray-50 transition-all duration-300 rounded-lg p-4 border border-gray-200 hover:border-primary-400/30">
      <div className="flex items-start space-x-3 mb-3">        <div className="w-8 h-8 rounded-lg bg-gray-100 p-1.5 flex-shrink-0">
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={`${tool.name} logo`}
              width={20}
              height={20}
              className="w-5 h-5 rounded"
              onError={handleImageError}
              unoptimized={imageSrc.startsWith('http')} // Don't optimize external images
            />
          ) : (
            <div className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center">
              <span className="text-xs text-gray-400">{tool.name[0]?.toUpperCase()}</span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
            {tool.name}
          </h3>
          <div className="flex items-center space-x-2 mt-1">            <span className={`px-1.5 py-0.5 rounded text-xs font-medium ${
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

      <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
        {tool.shortDescription}
      </p>

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1">
          <span className="text-yellow-400">★</span>
          <span className="text-gray-500">{tool.rating}</span>
        </div>
        <div className="relative z-10">
          <Link
            href={tool.affiliateUrl || tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-primary-500 to-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-300 hover:scale-105 hover:shadow-md active:scale-95 whitespace-nowrap"
            onClick={(e) => e.stopPropagation()}
          >
            Try Now
          </Link>
        </div>      </div>
    </div>
  )
}
