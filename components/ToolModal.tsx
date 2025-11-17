'use client'

import { AITool } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

interface ToolModalProps {
  tool: AITool | null
  isOpen: boolean
  onClose: () => void
}

export default function ToolModal({ tool, isOpen, onClose }: ToolModalProps) {
  const [imageSrc, setImageSrc] = useState('')
  const [imageError, setImageError] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  useEffect(() => {
    if (tool) {
      setImageSrc(tool.logo || '')
      setImageError(false)
    }
  }, [tool])

  // Generate fallback URLs based on the tool's URL
  const getFallbackUrls = (url: string) => {
    try {
      const domain = new URL(url).hostname
      return [
        tool?.logo,
        `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
        `https://icon.horse/icon/${domain}`,
        `https://icons.duckduckgo.com/ip3/${domain}.ico`,
        '/images/default-tool-logo.svg'
      ].filter(Boolean) as string[]
    } catch (e) {
      return ['/images/default-tool-logo.svg']
    }
  }

  const handleImageError = () => {
    if (!tool || imageError) return
    
    const fallbackUrls = getFallbackUrls(tool.url)
    const currentIndex = fallbackUrls.findIndex(url => url === imageSrc)
    
    if (currentIndex < fallbackUrls.length - 1) {
      setImageSrc(fallbackUrls[currentIndex + 1])
    } else {
      setImageError(true)
      setImageSrc('/images/default-tool-logo.svg')
    }
  }

  // Get pricing badge styles
  const getPricingBadgeStyles = () => {
    if (!tool) return ''
    switch (tool.pricing) {
      case 'Free':
        return 'bg-green-100 text-green-700'
      case 'Freemium':
        return 'bg-blue-100 text-blue-700'
      case 'Lifetime Deal':
        return 'bg-purple-100 text-purple-700'
      default:
        return 'bg-orange-100 text-orange-700'
    }
  }

  // Close modal on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen || !tool || !mounted) return null

  const modalContent = (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Modal Content */}
        <div className="p-8">
          {/* Header Section */}
          <div className="flex items-start space-x-6 mb-8 pb-8 border-b border-gray-200">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary-50 to-blue-50 p-4 flex-shrink-0 border border-primary-100">
              {imageSrc ? (
                <Image
                  src={imageSrc}
                  alt={`${tool.name} logo`}
                  width={80}
                  height={80}
                  className="w-full h-full rounded-xl object-contain"
                  onError={handleImageError}
                  unoptimized={imageSrc.startsWith('http')}
                />
              ) : (
                <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-500">
                    {tool.name[0]?.toUpperCase()}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                {tool.name}
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${getPricingBadgeStyles()}`}>
                  {tool.pricing}
                </span>
                
                <div className="flex items-center space-x-1 bg-yellow-50 px-3 py-1.5 rounded-lg">
                  <span className="text-yellow-500 text-lg">★</span>
                  <span className="text-sm font-semibold text-gray-700">{tool.rating}</span>
                  <span className="text-sm text-gray-500">/5</span>
                </div>

                {tool.featured && (
                  <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-semibold">
                    Featured
                  </span>
                )}

                {tool.trending && (
                  <span className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-semibold flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    Trending
                  </span>
                )}

                {tool.new && (
                  <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                    New
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-base leading-relaxed">
                {tool.shortDescription}
              </p>
            </div>
          </div>

          {/* Description Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">About {tool.name}</h3>
            <p className="text-gray-700 leading-relaxed text-base">
              {tool.description}
            </p>
          </div>

          {/* Category and Tags Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Category</h4>
              <span className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary-700 rounded-lg font-medium">
                {tool.category}
              </span>
            </div>

            {tool.tags && tool.tags.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Stats Section */}
          {(tool.views || tool.clicks) && (
            <div className="grid grid-cols-2 gap-4 mb-8 p-6 bg-gray-50 rounded-xl">
              {tool.views && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-1">
                    {tool.views.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Views</div>
                </div>
              )}
              {tool.clicks && (
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">
                    {tool.clicks.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 font-medium">Clicks</div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={tool.affiliateUrl || tool.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center px-6 py-4 bg-gradient-to-r from-primary-500 to-blue-600 hover:from-primary-600 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Visit {tool.name}
            </Link>

            <button
              onClick={onClose}
              className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
