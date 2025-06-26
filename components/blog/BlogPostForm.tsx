'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { BlogService } from '@/services/blogService'
import type { BlogPost } from '@/services/blogService'

interface BlogPostFormProps {
  post?: BlogPost
  onSave?: (post: BlogPost) => void
  onCancel?: () => void
}

export default function BlogPostForm({ post, onSave, onCancel }: BlogPostFormProps) {  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    thumbnail: '',
    is_published: false,
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    author_name: 'AllAiTools Team',
  })
  const [additionalImages, setAdditionalImages] = useState<string[]>([])
  const [newImageUrl, setNewImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title || '',
        slug: post.slug || '',
        excerpt: post.excerpt || '',
        content: post.content || '',
        thumbnail: post.thumbnail || '',
        is_published: post.is_published || false,
        meta_title: post.meta_title || '',
        meta_description: post.meta_description || '',
        meta_keywords: post.meta_keywords || '',
        author_name: post.author_name || 'AllAiTools Team',
      })
      
      const fetchImages = async () => {
        try {
          const response = await fetch(`/api/posts/${post.slug}/images`)
          if (response.ok) {
            const images = await response.json()
            setAdditionalImages(images.map((img: { image_url: string }) => img.image_url))
          }
        } catch (error) {
          console.error('Failed to fetch additional images:', error)
        }
      }
      fetchImages()
    }
  }, [post])

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: post ? prev.slug : BlogService.generateSlug(title)
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.slug.trim()) newErrors.slug = 'Slug is required'
    if (!formData.content.trim()) newErrors.content = 'Content is required'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      // Basic URL validation
      try {
        new URL(newImageUrl.trim())
        if (!additionalImages.includes(newImageUrl.trim())) {
          setAdditionalImages([...additionalImages, newImageUrl.trim()])
          setNewImageUrl('')
        } else {
          alert('This image URL is already added')
        }
      } catch (e) {
        alert('Please enter a valid URL (e.g., https://example.com/image.jpg)')
      }
    }
  }

  const handleRemoveImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index))
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return    setLoading(true)
    try {
      let savedPost: BlogPost
      const postData = { ...formData, additional_images: additionalImages }

      if (post) {
        // Use the original post slug in the URL (to find the existing post)
        // The new slug will be in the request body if it was changed
        console.log('Updating post with original slug:', post.slug)
        console.log('Form data slug:', formData.slug)
        console.log('Additional images:', additionalImages)
        console.log('Additional images count:', additionalImages.length)
        console.log('Additional images type:', typeof additionalImages)
        console.log('Post data to send:', postData)
        
        const response = await fetch(`/api/posts/${post.slug}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to update post')
        }
        savedPost = await response.json()
      } else {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to create post')
        }
        savedPost = await response.json()
      }

      onSave?.(savedPost)
    } catch (error) {
      console.error('Error saving post:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'Failed to save post. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{errors.submit}</p>
          </div>
        )}

        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Title *
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter post title..."
          />
          {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug *
          </label>
          <input
            type="text"
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="post-url-slug"
          />
          {errors.slug && <p className="text-red-600 text-sm mt-1">{errors.slug}</p>}
          <p className="text-gray-500 text-sm mt-1">
            URL: /blog/{formData.slug}
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            rows={3}
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Brief description of the post..."
          />
        </div>

        {/* Thumbnail */}
        <div>
          <label htmlFor="thumbnail" className="block text-sm font-medium text-gray-700 mb-2">
            Thumbnail URL
          </label>
          <input
            type="url"
            id="thumbnail"
            value={formData.thumbnail}
            onChange={(e) => setFormData(prev => ({ ...prev, thumbnail: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          {formData.thumbnail && (
            <div className="mt-2">
              <Image
                src={formData.thumbnail}
                alt="Thumbnail preview"
                width={128}
                height={80}
                className="w-32 h-20 object-cover rounded border"
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
            </div>
          )}
        </div>        {/* Additional Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Images
          </label>
          <div className="space-y-2">
            {additionalImages.map((url, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  width={128}
                  height={80}
                  className="w-32 h-20 object-cover rounded border"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => { e.currentTarget.style.display = 'none' }}
                />
                <input
                  type="text"
                  value={url}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-900"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="url"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/new-image.jpg"
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Add Image
            </button>
          </div>
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Content *
          </label>          <div className="mb-2">
            <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
              <strong>Formatting Tips:</strong>
              <ul className="mt-2 space-y-1">
                <li>• Use <code className="bg-blue-100 px-1 rounded"># Title</code> for main headings</li>
                <li>• Use <code className="bg-blue-100 px-1 rounded">## Subtitle</code> for subheadings</li>
                <li>• Use <code className="bg-blue-100 px-1 rounded">### Small Title</code> for smaller headings</li>
                <li>• Use <code className="bg-blue-100 px-1 rounded">**Bold Title**</code> for bold section titles</li>
              </ul>
              <div className="mt-3 pt-3 border-t border-blue-200">
                <strong>Insert Images:</strong>
                <ul className="mt-2 space-y-1">
                  <li>• Use <code className="bg-green-100 px-1 rounded">[IMAGE:1]</code> to insert the 1st additional image</li>
                  <li>• Use <code className="bg-green-100 px-1 rounded">[IMAGE:2]</code> to insert the 2nd additional image</li>
                  <li>• Use <code className="bg-green-100 px-1 rounded">[IMAGE:https://...]</code> to insert any image URL</li>
                  <li className="text-xs text-gray-500">• Place on its own line where you want the image to appear</li>
                </ul>
              </div>
            </div>
          </div>
          <textarea
            id="content"
            value={formData.content}
            onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
            placeholder="Write your post content..."
            rows={20}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />          {errors.content && <p className="text-red-600 text-sm mt-1">{errors.content}</p>}
        </div>

        {/* SEO Section */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Settings</h3>
          
          {/* Meta Title */}
          <div className="mb-4">
            <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              id="meta_title"
              value={formData.meta_title}
              onChange={(e) => setFormData(prev => ({ ...prev, meta_title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="SEO optimized title (leave empty to use main title)"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 50-60 characters</p>
          </div>

          {/* Meta Description */}
          <div className="mb-4">
            <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              id="meta_description"
              rows={3}
              value={formData.meta_description}
              onChange={(e) => setFormData(prev => ({ ...prev, meta_description: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Brief description for search engines"
            />
            <p className="text-xs text-gray-500 mt-1">Recommended: 150-160 characters</p>
          </div>

          {/* Meta Keywords */}
          <div className="mb-4">
            <label htmlFor="meta_keywords" className="block text-sm font-medium text-gray-700 mb-2">
              Meta Keywords
            </label>
            <input
              type="text"
              id="meta_keywords"
              value={formData.meta_keywords}
              onChange={(e) => setFormData(prev => ({ ...prev, meta_keywords: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="keyword1, keyword2, keyword3"
            />
            <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
          </div>

          {/* Author Name */}
          <div>
            <label htmlFor="author_name" className="block text-sm font-medium text-gray-700 mb-2">
              Author Name
            </label>
            <input
              type="text"
              id="author_name"
              value={formData.author_name}
              onChange={(e) => setFormData(prev => ({ ...prev, author_name: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Author name"
            />
          </div>
        </div>

        {/* Publish Status */}
        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.is_published}
              onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="ml-2 text-sm font-medium text-gray-900">
              Publish this post
            </span>
          </label>
          <p className="text-sm text-gray-500 mt-1">
            {formData.is_published 
              ? 'This post will be visible to the public.' 
              : 'This post will be saved as a draft.'
            }
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Saving...' : (post ? 'Update Post' : 'Create Post')}
          </button>
        </div>
      </form>
    </div>
  )
}
