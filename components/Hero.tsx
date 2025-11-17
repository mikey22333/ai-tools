'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Stats {
  tools: number
  categories: number
  users: string
}

// Static data for immediate render - no JS blocking
const staticStats: Stats = {
  tools: 2450,
  categories: 22,
  users: '1M+'
}

const formatNumber = (num: number) => {
  return num.toLocaleString()
}

export default function Hero() {
  const [stats, setStats] = useState<Stats>(staticStats)

  useEffect(() => {
    // Fetch real stats from API
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        setStats({
          tools: data.tools || staticStats.tools,
          categories: data.categories || staticStats.categories,
          users: data.users || staticStats.users
        })
      })
      .catch(err => {
        console.error('Failed to fetch stats:', err)
        // Keep using static stats on error
      })
  }, [])
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-blue-500/10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight">
            Discover the{' '}
            <span className="gradient-text">Best AI Tools</span>{' '}
            to Transform Your Workflow
          </h1>

          {/* Subtext - Critical for LCP, no delays */}
          <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
            Explore {formatNumber(stats.tools)}+ cutting-edge AI tools including ChatGPT alternatives, Claude AI, Gemini, and AI agents for productivity, content creation, coding, and business automation in 2025.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 justify-center items-center pt-8 w-full">            <div className="w-full sm:w-auto min-w-[200px]">
              <Link
                href="/tools"
                className="btn-primary text-lg px-8 py-4 w-full text-center block"
              >
                Browse All Tools
              </Link>
            </div>
            
            <div className="w-full sm:w-auto min-w-[200px]">
              <Link
                href="/categories"
                className="btn-secondary text-lg px-8 py-4 w-full text-center block"
              >
                Explore Categories
              </Link>
            </div>
          </div>          {/* Stats */}
          <div className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text" data-stat="tools">
                {formatNumber(stats.tools)}
              </div>
              <div className="text-gray-500 text-sm mt-1">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text" data-stat="categories">
                {formatNumber(stats.categories)}
              </div>
              <div className="text-gray-500 text-sm mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text" data-stat="users">{stats.users}</div>
              <div className="text-gray-500 text-sm mt-1">Monthly Users</div>
            </div>
          </div>
        </div>
      </div>      {/* Static floating elements - no animations for optimal LCP */}
      <div className="absolute top-1/4 left-10 w-16 h-16 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full opacity-20 blur-sm"></div>
      <div className="absolute top-1/3 right-10 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-sm"></div>
      <div className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full opacity-20 blur-sm"></div>
    </section>
  )
}
