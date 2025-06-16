import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

if (!supabaseUrl || !supabaseKey) {
  console.warn('Missing Supabase environment variables - using placeholders')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

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
    }
  }
}
