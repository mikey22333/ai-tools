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
  const [imageError, setImageError] = useState(false)
  const [imageSrc, setImageSrc] = useState(tool.logo)

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true)
      // Try common favicon paths as fallbacks
      const domain = new URL(tool.url).hostname
      const fallbackUrls = [
        `https://${domain}/favicon.ico`,
        `https://${domain}/favicon.png`,
        `https://www.google.com/s2/favicons?domain=${domain}`,
        '/images/default-tool-logo.svg' // Local fallback
      ]
      
      // Try the next fallback URL
      const currentIndex = fallbackUrls.findIndex(url => url === imageSrc)
      if (currentIndex < fallbackUrls.length - 1) {
        setImageSrc(fallbackUrls[currentIndex + 1])
        setImageError(false)
      }
    }
  }

  return (
    <div className="tool-card group relative bg-white hover:bg-gray-50 transition-all duration-300 rounded-lg p-4 border border-gray-200 hover:border-primary-400/30">
      <div className="flex items-start space-x-3 mb-3">        <div className="w-8 h-8 rounded-lg bg-gray-100 p-1.5 flex-shrink-0">
          <Image
            src={imageSrc}
            alt={`${tool.name} logo`}
            width={20}
            height={20}
            className="w-5 h-5 rounded"
            onError={handleImageError}
          />
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
        <Link
          href={tool.affiliateUrl || tool.url}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-gradient-to-r from-primary-500 to-blue-600 text-white px-2 py-1 rounded text-xs font-medium transition-all duration-300 hover:scale-105"
        >
          Try
        </Link>      </div>
    </div>
  )
}
