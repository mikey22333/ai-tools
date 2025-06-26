'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { BlogService } from '@/services/blogService'
import type { BlogPost } from '@/services/blogService'
import BlogPostForm from './BlogPostForm'
import { revalidateBlogPaths, revalidateAllBlogContent, forceBlogCacheRefresh } from '@/lib/blog-actions'

interface BlogAdminClientProps {
  initialPosts: BlogPost[]
}

export default function BlogAdminClient({ initialPosts }: BlogAdminClientProps) {
  const [posts, setPosts] = useState<BlogPost[]>(initialPosts)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null)
  // Auto-hide notifications after 3 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000)
      return () => clearTimeout(timer)
    }
  }, [notification])
  // Auto-refresh posts when component mounts to ensure fresh data
  useEffect(() => {
    refreshPosts()
  }, [])

  const refreshPosts = async () => {
    setLoading(true)
    try {
      // Add cache busting parameter to ensure fresh data
      const timestamp = Date.now()
      console.log('Refreshing posts at:', new Date().toISOString())
      const response = await fetch(`/api/posts?includeDrafts=true&t=${timestamp}`)
      if (response.ok) {
        const data = await response.json()
        console.log('Fetched posts:', data.posts.length, 'posts')
        setPosts(data.posts)
      } else {
        console.error('Failed to refresh posts:', response.statusText)
      }
    } catch (error) {
      console.error('Failed to refresh posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateNew = () => {
    setEditingPost(null)
    setShowForm(true)
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setShowForm(true)
  }
  const handleSave = async (savedPost: BlogPost) => {
    if (editingPost) {
      // Update existing post
      setPosts(prev => prev.map(p => p.id === savedPost.id ? savedPost : p))
    } else {
      // Add new post
      setPosts(prev => [savedPost, ...prev])
    }
      // Revalidate blog pages to show changes immediately
    await revalidateBlogPaths(savedPost.slug)
    
    setNotification({ 
      type: 'success', 
      message: editingPost ? 'Post updated successfully!' : 'Post created successfully!' 
    })
    
    setShowForm(false)
    setEditingPost(null)
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingPost(null)
  }
  const handleDelete = async (postId: string) => {
    try {
      const post = posts.find(p => p.id === postId)
      if (!post) return

      console.log('Attempting to delete post:', post.slug, 'with ID:', postId)
      
      const response = await fetch(`/api/posts/${post.slug}`, {
        method: 'DELETE',
      })

      console.log('Delete response status:', response.status)
      
      if (response.ok) {
        const responseData = await response.json()
        console.log('Delete successful:', responseData)
        
        setPosts(prev => prev.filter(p => p.id !== postId))
        setDeleteConfirm(null)
        
        // Force aggressive cache refresh for deletions
        await forceBlogCacheRefresh()
        
        setNotification({ 
          type: 'success', 
          message: 'Post deleted successfully!' 
        })
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }))
        console.error('Delete failed:', errorData)
        setNotification({ 
          type: 'error', 
          message: `Failed to delete post: ${errorData.error || 'Unknown error'}` 
        })
      }
    } catch (error) {
      console.error('Failed to delete post:', error)
      setNotification({ 
        type: 'error', 
        message: 'Failed to delete post' 
      })
    }
  }

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const response = await fetch(`/api/posts/${post.slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },        body: JSON.stringify({
          is_published: !post.is_published,
          published_at: !post.is_published ? new Date().toISOString() : null,
        }),
      })

      if (response.ok) {
        const updatedPost = await response.json()
        setPosts(prev => prev.map(p => p.id === post.id ? updatedPost : p))
          // Revalidate blog pages to show status change immediately
        await revalidateBlogPaths(post.slug)
        
        setNotification({ 
          type: 'success', 
          message: `Post ${!post.is_published ? 'published' : 'unpublished'} successfully!` 
        })
      } else {
        setNotification({ 
          type: 'error', 
          message: 'Failed to update post status' 
        })
      }
    } catch (error) {
      console.error('Failed to update post:', error)
      setNotification({ 
        type: 'error', 
        message: 'Failed to update post status' 
      })
    }
  }
  if (showForm) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {editingPost ? 'Edit Post' : 'Create New Post'}
            </h1>
          </div>
          <BlogPostForm
            post={editingPost || undefined}
            onSave={handleSave}
            onCancel={handleCancel}
          />
        </div>
      </div>
    )
  }  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Notification */}
          {notification && (
            <div className={`mb-6 p-4 rounded-lg ${
              notification.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800'
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              {notification.message}
            </div>
          )}

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Blog Management
              </h1>
              <p className="text-gray-600 mt-2">
                Manage your blog posts and content
              </p>            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={refreshPosts}
                disabled={loading}
                className="bg-gray-600 text-white px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center disabled:opacity-50"
              >
                <svg className={`w-5 h-5 mr-2 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {loading ? 'Refreshing...' : 'Refresh'}
              </button>              <button
                onClick={handleCreateNew}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Post
              </button>
            </div>
          </div>          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Posts
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {posts.length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Published
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {posts.filter(post => post.is_published).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Drafts
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {posts.filter(post => !post.is_published).length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Actions
                    </dt>
                    <dd className="text-lg font-medium text-gray-900">
                      <button
                        onClick={refreshPosts}
                        disabled={loading}
                        className="text-purple-600 hover:text-purple-700 disabled:opacity-50"
                      >
                        {loading ? 'Refreshing...' : 'Refresh'}
                      </button>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>          {/* Posts Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                All Posts
              </h2>
            </div>
            
            {posts.length === 0 ? (
              <div className="p-8 text-center">
                <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-500 mb-4">
                  Create your first blog post to get started.
                </p>
                <button
                  onClick={handleCreateNew}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Create Post
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Published
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Updated
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {post.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                /{post.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">                          <button
                            onClick={() => handleTogglePublish(post)}
                            className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full transition-colors ${
                              post.is_published 
                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                : 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
                            }`}
                          >
                            {post.is_published ? 'Published' : 'Draft'}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {post.published_at ? BlogService.formatDate(post.published_at) : '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {BlogService.formatDate(post.updated_at)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end space-x-2">
                            {post.is_published && (
                              <Link
                                href={`/blog/${post.slug}`}
                                className="text-blue-600 hover:text-blue-900"
                                target="_blank"
                              >
                                View
                              </Link>
                            )}                            <button
                              onClick={() => handleEdit(post)}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(post.id)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              Delete Post
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this post? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
