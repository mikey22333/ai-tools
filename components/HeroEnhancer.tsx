'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Stats {
  tools: number
  categories: number
  users: string
}

// Progressive enhancement for stats fetching
export function HeroEnhancer() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    // Only enhance after initial render is complete
    const fetchStats = async () => {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 3000)
        
        const response = await fetch('/api/stats', {
          signal: controller.signal
        })
        
        clearTimeout(timeoutId)
        
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        // Silently fail - static version already shows
        console.log('Stats enhancement failed, using static values')
      }
    }

    // Delay enhancement to not block initial render
    setTimeout(fetchStats, 100)
  }, [])

  // Progressive enhancement - only update if we have new data
  useEffect(() => {
    if (stats) {
      // Update the static stats with fetched data
      const toolsElement = document.querySelector('[data-stat="tools"]')
      const categoriesElement = document.querySelector('[data-stat="categories"]')
      const usersElement = document.querySelector('[data-stat="users"]')
      
      if (toolsElement) toolsElement.textContent = stats.tools.toLocaleString()
      if (categoriesElement) categoriesElement.textContent = stats.categories.toLocaleString()
      if (usersElement) usersElement.textContent = stats.users
    }
  }, [stats])

  return null // This is just for progressive enhancement
}

// Optional motion wrapper for progressive enhancement
export function MotionWrapper({ children, className = "", delay = 0 }: { 
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
