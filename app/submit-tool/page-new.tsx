'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SubmitToolPage() {
  const [formData, setFormData] = useState({
    toolName: '',
    tagline: '',
    description: '',
    website: '',
    category: '',
    pricing: '',
    pricingDetails: '',
    email: '',
    companyName: '',
    features: '',
    logoUrl: '',
    tags: '',
    targetAudience: '',
    useCase: '',
    keyBenefits: '',
    technicalDetails: '',
    integrations: '',
    languages: '',
    platforms: '',
    requestFeatured: false,
    featuredReason: '',
    socialMedia: {
      twitter: '',
      linkedin: '',
      github: '',
      discord: '',
      youtube: ''
    },
    screenshots: '',
    demoVideo: '',
    foundingYear: '',
    teamSize: '',
    funding: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const categories = [
    { id: 'chatbots-virtual-companions', label: 'Chatbots & Virtual Companions' },
    { id: 'writing-editing', label: 'Writing & Editing' },
    { id: 'image-generation-editing', label: 'Image Generation & Editing' },
    { id: 'video-animation', label: 'Video & Animation' },
    { id: 'voice-generation-conversion', label: 'Voice Generation & Conversion' },
    { id: 'coding-development', label: 'Coding & Development' },
    { id: 'research-data-analysis', label: 'Research & Data Analysis' },
    { id: 'business-management', label: 'Business & Management' },
    { id: 'marketing-advertising', label: 'Marketing & Advertising' },
    { id: 'education-translation', label: 'Education & Translation' },
    { id: 'health-wellness', label: 'Health & Wellness' },
    { id: 'office-productivity', label: 'Office & Productivity' },
    { id: 'social-media', label: 'Social Media' },
    { id: 'daily-life', label: 'Daily Life' },
    { id: 'art-creative', label: 'Art & Creative' },
    { id: 'music-audio', label: 'Music & Audio' },
    { id: 'legal-finance', label: 'Legal & Finance' },
    { id: 'image-analysis', label: 'Image Analysis' },
    { id: 'interior-architectural-design', label: 'Interior & Architectural Design' },
    { id: 'business-research', label: 'Business Research' },
    { id: 'automations', label: 'Automations' }
  ]

  const pricingModels = ['Free', 'Freemium', 'Paid', 'Lifetime Deal']

  const targetAudiences = [
    'Developers', 'Content Creators', 'Marketers', 'Designers', 'Students', 
    'Researchers', 'Business Professionals', 'Entrepreneurs', 'Writers', 
    'Data Scientists', 'General Users'
  ]
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit tool')
      }

      // Only process payment if the user requested featured listing AND payment is required
      if (formData.requestFeatured && result.requiresPayment) {
        // Redirect to payment for featured listing
        const paymentResponse = await fetch('/api/payment/create-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            submissionId: result.submissionId,
            featuredType: 'basic' // Can be made dynamic based on user selection
          }),
        })

        const paymentResult = await paymentResponse.json()

        if (paymentResponse.ok && paymentResult.url) {
          window.location.href = paymentResult.url
          return
        } else {
          throw new Error('Failed to create payment session')
        }
      }

      alert(result.message)
      
      // Reset form
      setFormData({
        toolName: '',
        tagline: '',
        description: '',
        website: '',
        category: '',
        pricing: '',
        pricingDetails: '',
        email: '',
        companyName: '',
        features: '',
        logoUrl: '',
        tags: '',
        targetAudience: '',
        useCase: '',
        keyBenefits: '',
        technicalDetails: '',
        integrations: '',
        languages: '',
        platforms: '',
        requestFeatured: false,
        featuredReason: '',
        socialMedia: {
          twitter: '',
          linkedin: '',
          github: '',
          discord: '',
          youtube: ''
        },
        screenshots: '',
        demoVideo: '',
        foundingYear: '',
        teamSize: '',
        funding: ''
      })
    } catch (error) {
      console.error('Submission error:', error)
      alert(error instanceof Error ? error.message : 'An error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    
    if (name.startsWith('socialMedia.')) {
      const socialField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value
        }
      }))
    } else if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
            Submit Your <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">AI Tool</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Join our growing directory of AI tools. Share your innovation with thousands of developers, 
            creators, and AI enthusiasts worldwide. Get featured to reach even more users!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">1</span>
                </div>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tool Name *
                  </label>
                  <input
                    type="text"
                    name="toolName"
                    value={formData.toolName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Enter your AI tool name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="https://yourtool.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tagline
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={formData.tagline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Brief catchy description of your tool"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Detailed description of your AI tool, its capabilities, and use cases..."
                />
              </div>
            </div>

            {/* Categorization */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">2</span>
                </div>
                Categorization
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select a category</option>
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pricing Model *
                  </label>
                  <select
                    name="pricing"
                    value={formData.pricing}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:border-blue-500 transition-colors"
                  >
                    <option value="">Select pricing model</option>
                    {pricingModels.map(model => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="ai, chatbot, gpt, assistant"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Add relevant tags to help users find your tool (e.g., ai, chatbot, gpt, assistant)
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
                <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">3</span>
                </div>
                Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors"
                    placeholder="Your company name"
                  />
                </div>
              </div>
            </div>

            {/* Featured Placement */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-800 border-b border-gray-200 pb-3 flex items-center">
                <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white font-bold">⭐</span>
                </div>
                🌟 Featured Placement
              </h2>              <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="requestFeatured"
                    name="requestFeatured"
                    checked={formData.requestFeatured}
                    onChange={handleChange}
                    className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div className="flex-1">
                    <label htmlFor="requestFeatured" className="text-lg font-semibold text-gray-800 cursor-pointer">
                      Request Featured Placement
                      <span className="text-blue-600 ml-2 font-bold">Contact Required</span>
                    </label>
                    <p className="text-gray-600 mt-1">
                      Get your tool featured on our homepage and category pages for maximum visibility.
                    </p>
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">✓</span> Homepage placement<br/>
                      <span className="font-medium">✓</span> Category page priority<br/>
                      <span className="font-medium">✓</span> Enhanced listing badge
                    </div>
                    {formData.requestFeatured && (
                      <div className="mt-3 p-3 bg-blue-100 rounded">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          To request featured placement, contact our team:
                        </p>
                        <p className="text-sm text-blue-600">
                          📧 Email: <a href="mailto:admin@allaitools.dev" className="underline">admin@allaitools.dev</a>
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Include your tool name and why it should be featured.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-gray-100 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">What happens next?</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>We'll review your submission within 2-3 business days</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>If approved, your tool will be added to our directory</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>You'll receive a confirmation email with your listing link</span>
                </li>                <li className="flex items-start space-x-2">
                  <span className="text-blue-500 mt-1">•</span>
                  <span>Featured placement requests will be contacted via email separately</span>
                </li>
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 px-8 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                <>
                  Submit Your AI Tool
                  {formData.requestFeatured && (
                    <span className="ml-2">🌟</span>
                  )}
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Increased Visibility</h3>
            <p className="text-gray-400">Get discovered by thousands of AI enthusiasts and potential users</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Quality Traffic</h3>
            <p className="text-gray-400">Connect with engaged users actively looking for AI solutions</p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-yellow-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Featured Opportunities</h3>
            <p className="text-gray-400">Get premium placement and stand out from the competition</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
