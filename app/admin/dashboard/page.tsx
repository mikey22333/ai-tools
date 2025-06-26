'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import AdminProtection from '@/components/AdminProtection'
import { useAuth } from '@/contexts/AuthContext'

interface Submission {
  id: string
  tool_name: string
  tagline: string
  description: string
  website: string
  category_id: string
  pricing: string
  email: string
  company_name: string
  request_featured: boolean
  featured_type?: string
  payment_status: string
  status: string
  submitted_at: string
  rejection_reason?: string
  admin_notes?: string
}

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('pending')
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null)
  const [reviewModal, setReviewModal] = useState(false)
  const [reviewForm, setReviewForm] = useState({
    status: '',
    notes: '',
    rejectionReason: ''
  })

  const fetchSubmissions = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/admin/submissions?status=${statusFilter}`)
      const data = await response.json()
      if (response.ok) {
        setSubmissions(data.submissions || [])
      }
    } catch (error) {
      console.error('Error fetching submissions:', error)
    } finally {
      setLoading(false)
    }
  }, [statusFilter])

  useEffect(() => {
    fetchSubmissions()
  }, [fetchSubmissions])

  const handleReview = (submission: Submission) => {
    setSelectedSubmission(submission)
    setReviewForm({
      status: submission.status,
      notes: '',
      rejectionReason: ''
    })
    setReviewModal(true)
  }

  const submitReview = async () => {
    if (!selectedSubmission) return

    try {
      const response = await fetch('/api/admin/submissions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: selectedSubmission.id,
          status: reviewForm.status,
          rejectionReason: reviewForm.rejectionReason,
          adminNotes: reviewForm.notes
        })
      })

      if (response.ok) {
        setReviewModal(false)
        fetchSubmissions()
        alert('Review submitted successfully!')
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      alert('Error submitting review')
    }
  }

  return (
    <AdminProtection>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex justify-between items-center"
          >            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
              <p className="text-gray-600">Manage tool submissions, blog content, and site analytics</p>
            </div>
            <button
              onClick={signOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {/* Blog Management */}
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Blog</h3>
                  <p className="text-sm text-gray-600">Manage posts</p>
                </div>
              </div>
              <div className="space-y-2">
                <a
                  href="/admin/blog"
                  className="block w-full bg-blue-500 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Manage Blog
                </a>
                <a
                  href="/blog"
                  target="_blank"
                  className="block w-full bg-gray-100 text-gray-700 text-center py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  View Blog
                </a>
              </div>
            </div>

            {/* Tool Submissions Stats */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Pending</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {submissions.filter(s => s.status === 'pending').length}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Tools awaiting review</p>
            </div>

            {/* Approved Tools */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Approved</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {submissions.filter(s => s.status === 'approved').length}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Live tools</p>
            </div>

            {/* Site Analytics */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">Analytics</h3>
                  <p className="text-sm text-gray-600">Site stats</p>
                </div>
              </div>
              <a
                href="/admin/analytics"
                className="block w-full bg-purple-500 text-white text-center py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors"
              >
                View Analytics
              </a>
            </div>
          </motion.div>

          {/* Status Filter */}
          <div className="bg-white rounded-lg shadow mb-6 p-6">
            <div className="flex space-x-4">
              {['pending', 'approved', 'rejected'].map((status) => (
                <button
                  key={status}
                  onClick={() => setStatusFilter(status)}
                  className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                    statusFilter === status
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Submissions List */}
          <div className="bg-white rounded-lg shadow">
            {loading ? (
              <div className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading submissions...</p>
              </div>
            ) : submissions.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                No {statusFilter} submissions found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tool
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Featured
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {submissions.map((submission) => (
                      <tr key={submission.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {submission.tool_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {submission.tagline}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {submission.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {submission.category_id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {submission.request_featured ? '⭐ Yes' : 'No'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(submission.submitted_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => handleReview(submission)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Review Modal */}
          {reviewModal && selectedSubmission && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Review: {selectedSubmission.tool_name}
                  </h2>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Tool Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Basic Information</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Tool Name:</strong> {selectedSubmission.tool_name}</p>
                        <p><strong>Tagline:</strong> {selectedSubmission.tagline || 'None'}</p>
                        <p><strong>Website:</strong> 
                          <a href={selectedSubmission.website} target="_blank" rel="noopener noreferrer" 
                             className="text-blue-600 hover:underline ml-1">
                            {selectedSubmission.website}
                          </a>
                        </p>
                        <p><strong>Email:</strong> {selectedSubmission.email}</p>
                        <p><strong>Company:</strong> {selectedSubmission.company_name || 'None'}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Details</h3>
                      <div className="space-y-2 text-sm">
                        <p><strong>Category:</strong> {selectedSubmission.category_id}</p>
                        <p><strong>Pricing:</strong> {selectedSubmission.pricing}</p>
                        <p><strong>Featured Request:</strong> {selectedSubmission.request_featured ? 'Yes' : 'No'}</p>
                        <p><strong>Payment Status:</strong> {selectedSubmission.payment_status}</p>
                        <p><strong>Submitted:</strong> {new Date(selectedSubmission.submitted_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-sm text-gray-700 bg-gray-50 p-4 rounded-lg">
                      {selectedSubmission.description}
                    </p>
                  </div>

                  {/* Review Form */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Review Actions</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Status
                      </label>
                      <select
                        value={reviewForm.status}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, status: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>

                    {reviewForm.status === 'rejected' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rejection Reason (Required)
                        </label>
                        <textarea
                          value={reviewForm.rejectionReason}
                          onChange={(e) => setReviewForm(prev => ({ ...prev, rejectionReason: e.target.value }))}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Explain why this submission is being rejected..."
                          required
                        />
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Notes (Internal)
                      </label>
                      <textarea
                        value={reviewForm.notes}
                        onChange={(e) => setReviewForm(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add any internal notes..."
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 flex justify-end space-x-4">
                  <button
                    onClick={submitReview}
                    disabled={reviewForm.status === 'rejected' && !reviewForm.rejectionReason.trim()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Submit Review
                  </button>
                  <button
                    onClick={() => setReviewModal(false)}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminProtection>
  )
}
