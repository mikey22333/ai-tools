import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables - using placeholders')
}

// Public client for normal operations
export const supabase = createClient(supabaseUrl, supabaseKey)

// Admin client with service role key for admin operations (bypasses RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// Type definitions for database tables
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          tool_count: number
          color: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description?: string | null
          icon?: string | null
          tool_count?: number
          color?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          tool_count?: number
          color?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tools: {
        Row: {
          id: string
          name: string
          description: string
          short_description: string | null
          logo_url: string | null
          category_id: string
          tags: string[] | null
          rating: number | null
          pricing: string | null
          url: string | null
          affiliate_url: string | null
          featured: boolean
          trending: boolean
          new: boolean
          clicks: number
          views: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          name: string
          description: string
          short_description?: string | null
          logo_url?: string | null
          category_id: string
          tags?: string[] | null
          rating?: number | null
          pricing?: string | null
          url?: string | null
          affiliate_url?: string | null
          featured?: boolean
          trending?: boolean
          new?: boolean
          clicks?: number
          views?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          short_description?: string | null
          logo_url?: string | null
          category_id?: string
          tags?: string[] | null
          rating?: number | null
          pricing?: string | null
          url?: string | null
          affiliate_url?: string | null
          featured?: boolean
          trending?: boolean
          new?: boolean
          clicks?: number
          views?: number
          created_at?: string
          updated_at?: string
        }
      }
      posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          thumbnail: string | null
          is_published: boolean
          published_at: string | null
          created_at: string
          updated_at: string
          meta_title: string | null
          meta_description: string | null
          meta_keywords: string | null
          author_name: string | null
          reading_time: number | null
          view_count: number | null
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          thumbnail?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          author_name?: string | null
          reading_time?: number | null
          view_count?: number | null
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          thumbnail?: string | null
          is_published?: boolean
          published_at?: string | null
          created_at?: string
          updated_at?: string
          meta_title?: string | null
          meta_description?: string | null
          meta_keywords?: string | null
          author_name?: string | null
          reading_time?: number | null
          view_count?: number | null
        }
      }
      blog_images: {
        Row: {
          id: string
          post_slug: string
          image_url: string
          alt_text: string | null
          caption: string | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          post_slug: string
          image_url: string
          alt_text?: string | null
          caption?: string | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          post_slug?: string
          image_url?: string
          alt_text?: string | null
          caption?: string | null
          display_order?: number | null
          created_at?: string
        }
      }
    }
  }
}
