import { supabase, supabaseAdmin } from '@/lib/supabase'
import { Database } from '@/lib/supabase'
import { unstable_cache } from 'next/cache'

export type BlogPost = Database['public']['Tables']['posts']['Row']
export type BlogPostInsert = Database['public']['Tables']['posts']['Insert']
export type BlogPostUpdate = Database['public']['Tables']['posts']['Update']

export class BlogService {  /**
   * Fetch all published blog posts, ordered by published_at descending
   */
  static async getPublishedPosts(): Promise<BlogPost[]> {
    // Temporarily bypass cache for debugging
    try {
      console.log('Fetching posts from Supabase...')
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Raw data from Supabase:', data)
      return data || []
    } catch (error) {
      console.error('Failed to fetch published posts:', error)
      throw error
    }
  }
  /**
   * Fetch a single published post by slug
   */
  static async getPublishedPostBySlug(slug: string): Promise<BlogPost | null> {
    return unstable_cache(
      async () => {
        try {
          const { data, error } = await supabase
            .from('posts')
            .select('*')
            .eq('slug', slug)
            .eq('is_published', true)
            .single()

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
      },
      [`post-${slug}`],
      { 
        tags: ['blog-posts', `blog-post-${slug}`],
        revalidate: 3600 // 1 hour
      }
    )()
  }  /**
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
}
