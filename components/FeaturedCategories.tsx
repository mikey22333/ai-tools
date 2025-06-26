'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toolsService } from '@/services/toolsService'
import { Category } from '@/types'

export default function FeaturedCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await toolsService.getCategories()
        setCategories(data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      } finally {
        setLoading(false)
      }
    }

    if (isClient) {
      fetchCategories()
    }
  }, [isClient])

  // Prevent hydration mismatch by showing static content during SSR
  if (!isClient) {
    return (
      <section className="py-20 relative overflow-hidden">
        {/* Beautiful gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/50 via-transparent to-yellow-50/30"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/30 to-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Explore by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover AI tools organized by industry and use case
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Placeholder skeleton cards */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white/90 hover:shadow-xl hover:shadow-purple-500/10 hover:-translate-y-1 animate-pulse">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded mb-2 mx-auto w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mx-auto w-1/2"></div>
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
      <section className="py-20 relative overflow-hidden">
        {/* Beautiful gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/50 via-transparent to-yellow-50/30"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/30 to-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
              Explore by <span className="gradient-text">Category</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover AI tools organized by industry and use case
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Loading skeleton cards */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="group relative">
                <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 h-full transition-all duration-300 animate-pulse">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                    <div className="h-5 bg-gray-200 rounded mb-2 mx-auto w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mx-auto w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }  return (
    <section className="py-20 relative overflow-hidden">
      {/* Beautiful gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-50/50 via-transparent to-yellow-50/30"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-200/30 to-pink-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-blue-200/30 to-indigo-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
            Explore by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover AI tools organized by use case and industry
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group relative bg-white hover:bg-gray-50 transition-all duration-300 rounded-lg p-5 border border-gray-200 hover:border-primary-400/30"
            >
              <Link href={`/categories/${category.id}`}>
                <div className="flex items-start space-x-3 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center text-lg flex-shrink-0`}>
                    {category.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                      {category.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {category.toolCount} tools
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 text-xs leading-relaxed mb-3 line-clamp-2">
                  {category.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="text-primary-600 font-medium group-hover:text-primary-500 transition-colors">
                    Explore
                  </div>
                  <svg className="w-3 h-3 text-primary-600 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* View All Categories */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-500 font-medium transition-colors"
          >
            <span>View All Categories</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
