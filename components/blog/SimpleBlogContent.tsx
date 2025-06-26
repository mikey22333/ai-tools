'use client'

import { useState } from 'react'

interface SimpleBlogContentProps {
  content: string
  title: string
}

export default function SimpleBlogContent({ content, title }: SimpleBlogContentProps) {
  const [showFullContent, setShowFullContent] = useState(false)
  
  // Safely truncate content for initial display
  const maxInitialLength = 5000
  const shouldTruncate = content.length > maxInitialLength
  const displayContent = showFullContent || !shouldTruncate 
    ? content 
    : content.substring(0, maxInitialLength) + '...'

  const formatSimpleContent = (text: string) => {
    return text.split('\n').map((line, index) => {
      const trimmedLine = line.trim()
      
      if (!trimmedLine) {
        return <br key={`br-${index}`} />
      }
      
      // Simple heading detection
      if (trimmedLine.startsWith('# ')) {
        return (
          <h1 key={`h1-${index}`} className="text-2xl font-bold text-gray-900 mb-4 mt-6">
            {trimmedLine.substring(2)}
          </h1>
        )
      }
      
      if (trimmedLine.startsWith('## ')) {
        return (
          <h2 key={`h2-${index}`} className="text-xl font-bold text-gray-900 mb-3 mt-5">
            {trimmedLine.substring(3)}
          </h2>
        )
      }
      
      // Simple paragraph
      return (
        <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-3">
          {trimmedLine}
        </p>
      )
    })
  }

  return (
    <div className="prose prose-lg max-w-none">
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <p className="text-yellow-800 text-sm">
          ⚡ This post contains large content and is being displayed in simplified mode for better performance.
        </p>
      </div>
      
      {formatSimpleContent(displayContent)}
      
      {shouldTruncate && !showFullContent && (
        <div className="mt-8 text-center">
          <button
            onClick={() => setShowFullContent(true)}
            className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors"
          >
            Show Full Content
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Content length: {content.length.toLocaleString()} characters
          </p>
        </div>
      )}
    </div>
  )
}
