'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SubmitToolSuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loading, setLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<'success' | 'failed' | 'unknown'>('unknown')

  useEffect(() => {
    if (sessionId) {
      // You could verify the payment status here if needed
      setPaymentStatus('success')
      setLoading(false)
    } else {
      setPaymentStatus('unknown')
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {paymentStatus === 'success' ? (
            <>
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                Payment <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">Successful!</span>
              </h1>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                Thank you for your payment! Your tool submission has been received and will be featured in our directory. 
                We'll review your submission within 2-3 business days and send you a confirmation email.
              </p>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8 max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-white mb-4">What happens next?</h2>
                <ul className="space-y-3 text-gray-300 text-left">
                  <li className="flex items-start space-x-3">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>Your $9.99 payment has been processed successfully</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-blue-400 mt-1">🔍</span>
                    <span>Our team will review your tool submission within 2-3 business days</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-purple-400 mt-1">⭐</span>
                    <span>Once approved, your tool will be featured prominently in our directory</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="text-yellow-400 mt-1">📧</span>
                    <span>You'll receive a confirmation email with your listing details</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link
                  href="/"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Back to Home
                </Link>
                
                <Link
                  href="/tools"
                  className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200"
                >
                  Browse Tools
                </Link>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                Payment <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">Issue</span>
              </h1>
              
              <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
                There was an issue processing your payment. Please try again or contact our support team.
              </p>

              <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                <Link
                  href="/submit-tool"
                  className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
                >
                  Try Again
                </Link>
                
                <Link
                  href="/contact"
                  className="inline-block bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition-all duration-200"
                >
                  Contact Support
                </Link>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  )
}
