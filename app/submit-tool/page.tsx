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
    { id: 'business-management', label: 'Business & Management' },
    { id: 'marketing-advertising', label: 'Marketing & Advertising' },
    { id: 'education-translation', label: 'Education & Translation' },
    { id: 'health-wellness', label: 'Health & Wellness' },
    { id: 'music-audio', label: 'Music & Audio' },
    { id: 'research-data-analysis', label: 'Research & Data Analysis' },
    { id: 'office-productivity', label: 'Office & Productivity' },
    { id: 'daily-life', label: 'Daily Life' },
    { id: 'legal-finance', label: 'Legal & Finance' },
    { id: 'social-media', label: 'Social Media' },
    { id: 'art-creative', label: 'Art & Creative' },
    { id: 'interior-architectural-design', label: 'Interior & Architectural Design' },
    { id: 'automations', label: 'Automations' },
    { id: 'image-analysis', label: 'Image Analysis' },
    { id: 'business-research', label: 'Business Research' }
  ]

  const pricingOptions = [
    { value: 'Free', label: 'Free' },
    { value: 'Freemium', label: 'Freemium' },
    { value: 'Paid', label: 'Paid' },
    { value: 'Lifetime Deal', label: 'Lifetime Deal' }
  ]
  const targetAudiences = [
    'Developers', 'Content Creators', 'Marketers', 'Designers', 'Students', 
    'Researchers', 'Business Professionals', 'Entrepreneurs', 'Writers', 
    'Data Scientists', 'General Users'
  ]
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {      const response = await fetch('/api/submit-tool', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit tool');
      }      // Show success message
      alert(result.message);
      
      // Reset form on successful submission
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
        foundingYear: '',        teamSize: '',
        funding: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
      alert(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your AI tool name"
                    value={formData.toolName}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Tagline
                  </label>
                  <input
                    type="text"
                    name="tagline"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Brief description of your tool"
                    value={formData.tagline}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Detailed description of your AI tool, its features, and capabilities"
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Website URL *
                  </label>
                  <input
                    type="url"
                    name="website"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://yourtool.com"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Logo URL
                  </label>
                  <input
                    type="url"
                    name="logoUrl"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://yourtool.com/logo.png"
                    value={formData.logoUrl}
                    onChange={handleChange}
                  />
                </div>
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={formData.category}
                    onChange={handleChange}
                  >
                    <option value="">Select a category</option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pricing Model *
                  </label>
                  <select
                    name="pricing"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    value={formData.pricing}
                    onChange={handleChange}
                  >
                    <option value="">Select pricing model</option>
                    {pricingOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="ai, chatbot, gpt, assistant"
                  value={formData.tags}
                  onChange={handleChange}
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
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your company name"
                    value={formData.companyName}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>            {/* Featured Placement Notice */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🌟</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Want Featured Placement?</h3>
                    <p className="text-gray-600 mb-3">
                      Get your tool featured on our homepage and category pages for maximum visibility.
                    </p>
                    
                    <div className="text-sm text-gray-500 mb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <span>✓</span>
                        <span>Homepage placement</span>
                      </div>
                      <div className="flex items-center space-x-2 mb-1">
                        <span>✓</span>
                        <span>Category page priority</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>✓</span>
                        <span>Enhanced listing badge</span>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-blue-100 rounded-lg">
                      <p className="text-sm font-medium text-gray-700 mb-2">
                        📧 Contact our team for featured placement:
                      </p>
                      <p className="text-base text-blue-600 font-semibold">
                        <a href="mailto:riyassajeed233@gmail.com" className="underline hover:text-blue-800">
                          riyassajeed233@gmail.com
                        </a>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Include your tool name and why it should be featured. We'll get back to you within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What happens next */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">What happens next?</h3>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>We'll review your submission within 2-3 business days</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>If approved, your tool will be added to our directory</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-blue-400 mt-1">•</span>
                  <span>You'll receive a confirmation email with your listing link</span>
                </li>
                {formData.requestFeatured && (
                  <li className="flex items-start space-x-2">
                    <span className="text-yellow-400 mt-1">⭐</span>
                    <span>Featured tools get premium placement and priority review</span>
                  </li>
                )}
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Submitting...</span>
                </div>              ) : (
                <>                  {formData.requestFeatured ? 'Submit Tool (Featured Request)' : 'Submit Your AI Tool'}
                  {formData.requestFeatured && (
                    <span className="ml-2">🌟</span>
                  )}
                </>
              )}
            </motion.button>            <p className="text-center text-sm text-gray-500">
              All submissions are reviewed by our team before being published.
              {formData.requestFeatured && (
                <>
                  <br />
                  <span className="text-blue-600">Featured placement requests will be processed via email.</span>
                </>
              )}
            </p>
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
