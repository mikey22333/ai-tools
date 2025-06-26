import { supabase, supabaseAdmin } from '@/lib/supabase'
import { Database } from '@/lib/supabase'
import { unstable_cache } from 'next/cache'

export type BlogPost = Database['public']['Tables']['posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['posts']['Update']
export type BlogImage = Database['public']['Tables']['blog_images']['Row']
export type BlogImageInsert = Database['public']['Tables']['blog_images']['Insert']
export type BlogImageUpdate = Database['public']['Tables']['blog_images']['Update']

export class BlogService {  /**
   * Fetch all published blog posts, ordered by published_at descending
   * Cached for 1 hour to prevent excessive database calls
   */
  static getPublishedPosts = unstable_cache(
    async (): Promise<BlogPost[]> => {
      try {        console.log('Fetching posts from Supabase...')
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(20) // Limit to 20 posts to prevent memory issues

        if (error) {
          console.error('Supabase error:', error)
          throw error
        }

        console.log('Number of published posts found:', data?.length || 0)
        return data || []
      } catch (error) {
        console.error('Failed to fetch published posts:', error)
        throw error
      }
    },
    ['published-posts'],    { revalidate: 3600 } // Cache for 1 hour
  )

  /**
   * Fetch a single published post by slug
   * Cached to prevent memory spikes on repeated access
   */
  static getPublishedPostBySlug = unstable_cache(
    async (slug: string): Promise<BlogPost | null> => {
      try {
        console.log(`Fetching post by slug: ${slug}`)
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .eq('is_published', true)
          .single()

        if (error) {
          if (error.code === 'PGRST116') {
            console.log(`Post not found: ${slug}`)
            return null
          }
          console.error('Error fetching post by slug:', error)
          throw error
        }

        // Check content size and warn if too large
        if (data.content && data.content.length > 50000) {
          console.warn(`Post ${slug} has large content: ${data.content.length} characters`)
        }

        return data
      } catch (error) {
        console.error('Failed to fetch post by slug:', error)
        throw error
      }
    },
    ['post-by-slug'],
    { revalidate: 1800 } // Cache for 30 minutes
  )

  /**
   * Fetch a single post by slug (including drafts) - for admin use
   */
  static async getPostBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // Try admin client first, fallback to regular client if service key is invalid
      let data, error;
      
      try {
        const result = await supabaseAdmin
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single()
        data = result.data
        error = result.error
      } catch (adminError) {
        console.warn('Admin client failed, falling back to regular client:', adminError)
        const result = await supabase
          .from('posts')
          .select('*')
          .eq('slug', slug)
          .single()
        data = result.data
        error = result.error
      }

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return null
        }
        console.error('Error fetching post by slug:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to fetch post by slug:', error)
      throw error
    }
  }/**
   * Fetch all posts (including drafts) - for admin use
   */
  static async getAllPosts(): Promise<BlogPost[]> {
    try {
      // Try admin client first, fallback to regular client if service key is invalid
      let data, error;
      
      try {
        const result = await supabaseAdmin
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
        data = result.data
        error = result.error
      } catch (adminError) {
        console.warn('Admin client failed, falling back to regular client:', adminError)
        // Fallback to regular client - will show all posts due to RLS policy allowing reads
        const result = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
        data = result.data
        error = result.error
      }

      if (error) {
        console.error('Error fetching all posts:', error)
        throw error
      }

      return data || []
    } catch (error) {
      console.error('Failed to fetch all posts:', error)
      throw error
    }
  }

  /**
   * Get all published post slugs for static generation
   */
  static async getPublishedSlugs(): Promise<string[]> {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('slug')
        .eq('is_published', true)

      if (error) {
        console.error('Error fetching post slugs:', error)
        throw error
      }

      return data?.map(post => post.slug) || []
    } catch (error) {
      console.error('Failed to fetch post slugs:', error)
      throw error
    }
  }  /**
   * Create a new blog post
   */
  static async createPost(post: BlogPostInsert): Promise<BlogPost> {
    try {
      // Try admin client first, fallback to regular client if service key is invalid
      let data, error;
      
      try {
        const result = await supabaseAdmin
          .from('posts')
          .insert(post)
          .select()
          .single()
        data = result.data
        error = result.error
      } catch (adminError) {
        console.warn('Admin client failed for create, falling back to regular client:', adminError)
        const result = await supabase
          .from('posts')
          .insert(post)
          .select()
          .single()
        data = result.data
        error = result.error
      }

      if (error) {
        console.error('Error creating post:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to create post:', error)
      throw error
    }
  }  /**
   * Update an existing blog post
   */
  static async updatePost(id: string, updates: BlogPostUpdate): Promise<BlogPost> {
    try {
      // Try admin client first, fallback to regular client if service key is invalid
      let data, error;
      
      try {
        const result = await supabaseAdmin
          .from('posts')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        data = result.data
        error = result.error
      } catch (adminError) {
        console.warn('Admin client failed for update, falling back to regular client:', adminError)
        const result = await supabase
          .from('posts')
          .update(updates)
          .eq('id', id)
          .select()
          .single()
        data = result.data
        error = result.error
      }

      if (error) {
        console.error('Error updating post:', error)
        throw error
      }

      return data
    } catch (error) {
      console.error('Failed to update post:', error)
      throw error
    }
  }  /**
   * Delete a blog post
   */
  static async deletePost(id: string): Promise<void> {
    try {
      console.log('Attempting to delete post with ID:', id)
      
      // Try admin client first, fallback to regular client if service key is invalid
      let error;
      
      try {
        const result = await supabaseAdmin
          .from('posts')
          .delete()
          .eq('id', id)
        error = result.error
      } catch (adminError) {
        console.warn('Admin client failed for delete, falling back to regular client:', adminError)
        const result = await supabase
          .from('posts')
          .delete()
          .eq('id', id)
        error = result.error
      }

      if (error) {
        console.error('Supabase error deleting post:', error)
        throw error
      }
      
      console.log('Post deleted successfully from database:', id)
    } catch (error) {
      console.error('Failed to delete post:', error)
      throw error
    }
  }

  /**
   * Generate a URL-friendly slug from a title
   */
  static generateSlug(title: string): string {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  /**
   * Format a date string for display
   */
  static formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  /**
   * Calculate reading time estimate
   */
  static calculateReadingTime(content: string): number {
    const wordsPerMinute = 200
    const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }
  /**
   * Save additional images for a blog post
   */  static async savePostImages(slug: string, imageUrls: string[]): Promise<void> {
    try {
      console.log('savePostImages called with:', { slug, imageUrls, count: imageUrls.length })
        // First, delete existing images for this post using admin client
      console.log('Deleting existing images for slug:', slug)
      
      // Try admin client first, fallback to regular client if service key is invalid
      let deleteError;
      
      try {
        const result = await supabaseAdmin
          .from('blog_images')
          .delete()
          .eq('post_slug', slug)
        deleteError = result.error
      } catch (adminError) {
        console.warn('Admin client failed for delete, falling back to regular client:', adminError)
        const result = await supabase
          .from('blog_images')
          .delete()
          .eq('post_slug', slug)
        deleteError = result.error
      }
      
      if (deleteError) {
        console.error('Error deleting existing images:', deleteError)
        throw new Error(`Failed to delete existing images: ${deleteError.message}`)
      }
      
      console.log('Existing images deleted successfully')

      // Then insert new images
      if (imageUrls.length > 0) {
        const imageData: BlogImageInsert[] = imageUrls.map((url, index) => ({          post_slug: slug,
          image_url: url,
          display_order: index + 1
        }))

        console.log('Inserting new images:', imageData)
        
        // Try admin client first, fallback to regular client if service key is invalid
        let insertError;
        
        try {
          const result = await supabaseAdmin
            .from('blog_images')
            .insert(imageData)
          insertError = result.error
        } catch (adminError) {
          console.warn('Admin client failed for insert, falling back to regular client:', adminError)
          const result = await supabase
            .from('blog_images')
            .insert(imageData)
          insertError = result.error
        }        if (insertError) {
          console.error('Error inserting post images:', insertError)
          throw new Error(`Failed to insert images: ${insertError.message}`)
        }
        
        console.log('New images inserted successfully')
      } else {
        console.log('No images to insert (imageUrls is empty)')
      }
    } catch (error) {
      console.error('Failed to save post images:', error)
      throw error
    }
  }
  /**
   * Get additional images for a blog post
   * Cached to prevent repeated database calls
   */
  static getPostImages = unstable_cache(
    async (slug: string): Promise<BlogImage[]> => {
      try {
        console.log(`Fetching images for post: ${slug}`)
        // Use regular client only to prevent auth issues
        const { data, error } = await supabase
          .from('blog_images')
          .select('*')
          .eq('post_slug', slug)
          .order('display_order', { ascending: true })
          .limit(10) // Limit images to prevent memory issues

        if (error) {
          console.error('Error fetching post images:', error)
          throw error
        }

        console.log(`Found ${data?.length || 0} images for post: ${slug}`)
        return data || []
      } catch (error) {        console.error('Failed to fetch post images:', error)
        return [] // Return empty array on error instead of throwing
      }
    },
    ['post-images'],
    { revalidate: 3600 } // Cache for 1 hour
  )
}
