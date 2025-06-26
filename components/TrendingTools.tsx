'use client'

import { useState, useEffect } from 'react'
import { toolsService } from '@/services/toolsService'
import { AITool } from '@/types'
import ToolCard from './ToolCard'

export default function TrendingTools() {
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
    return (      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading featured tools...</p>
          </div>
        </div>
      </section>)
  }
  return (    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            <span className="gradient-text">Featured</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            The hottest AI tools making waves this week
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
          {featuredTools.map((tool, index) => (
            <div 
              key={`${tool.id}-${index}`}
              className="featured-tool"
              style={{
                animation: `float 3s ease-in-out infinite`,
                animationDelay: `${index * 0.1}s`,
                transformOrigin: 'center bottom'
              }}
            >
              <ToolCard tool={tool} showTrendingBadge />
            </div>
          ))}
          <style jsx global>{`
            .featured-tool {
              will-change: transform, box-shadow;
              backface-visibility: hidden;
              perspective: 1000px;
              position: relative;
              border-radius: 0.75rem;
              padding: 2px;
              background: linear-gradient(135deg, rgba(99, 102, 241, 0.7), rgba(59, 130, 246, 0.7), rgba(99, 102, 241, 0.7));
              background-size: 200% 200%;
              animation: gradient 3s ease infinite, float 3s ease-in-out infinite, glow 3s ease-in-out infinite;
              box-shadow: 0 0 10px rgba(99, 102, 241, 0.5);
            }
            .featured-tool > :global(div) {
              border-radius: 0.5rem;
              overflow: hidden;
              height: 100%;
            }
            .featured-tool:hover {
              animation-play-state: paused;
            }
            @keyframes gradient {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>
        </div>
      </div>
    </section>
  )
}
