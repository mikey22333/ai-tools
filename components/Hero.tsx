'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Stats {
  tools: number
  categories: number
  users: string
}

export default function Hero() {  const [stats, setStats] = useState<Stats>({
    tools: 2395, // Set initial fallback values
    categories: 22,
    users: '1M+'
  })
  const [loading, setLoading] = useState(false) // Start with false for immediate display

  useEffect(() => {
    fetchStats()
  }, [])
  const fetchStats = async () => {
    try {
      // Add timeout to prevent long loading
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout
      
      const response = await fetch('/api/stats', {
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('Stats fetch timed out, using fallback values')
      } else {
        console.error('Failed to fetch stats:', error)
      }
      // Keep current fallback values
    }
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString()
  }
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24 lg:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-transparent to-blue-500/10"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-bold leading-tight">
            Discover the{' '}
            <span className="gradient-text">AI Tools</span>{' '}
            shaping tomorrow
          </h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed"
          >
            Browse, compare, and discover cutting-edge AI tools across all industries — 
            curated with care, monetized with purpose.
          </motion.p>          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/tools"
                className="btn-primary text-lg px-8 py-4 min-w-[200px]"
              >
                Browse All Tools
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/categories"
                className="btn-secondary text-lg px-8 py-4 min-w-[200px]"
              >
                Explore Categories
              </Link>
            </motion.div>
          </motion.div>          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto"
          >            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">
                {formatNumber(stats.tools)}
              </div>
              <div className="text-gray-500 text-sm mt-1">AI Tools</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">
                {formatNumber(stats.categories)}
              </div>
              <div className="text-gray-500 text-sm mt-1">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text">{stats.users}</div>
              <div className="text-gray-500 text-sm mt-1">Monthly Users</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-16 h-16 bg-gradient-to-br from-primary-400 to-blue-500 rounded-full opacity-20 blur-sm"
      ></motion.div>
      
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-10 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full opacity-20 blur-sm"
      ></motion.div>
      
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-1/4 left-1/4 w-8 h-8 bg-gradient-to-br from-green-400 to-cyan-500 rounded-full opacity-20 blur-sm"
      ></motion.div>
    </section>
  )
}
