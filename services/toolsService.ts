import { supabase } from '@/lib/supabase'

// Interface matching the current AITool type
interface AITool {
  id: string
  name: string
  description: string
  shortDescription: string
  logo: string
  category: string
  tags: string[]
  rating: number
  pricing: string
  url: string
  affiliateUrl: string
  featured: boolean
  trending: boolean
  new?: boolean
  clicks: number
  views: number
}

interface Category {
  id: string
  name: string
  description: string
  icon: string
  toolCount: number
  color: string
}

export const toolsService = {
  // Get all categories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name')
    
    if (error) throw error
    
    // Transform database format to frontend format
    return (data || []).map(cat => ({
      id: cat.id,
      name: cat.name,
      description: cat.description || '',
      icon: cat.icon || '',
      toolCount: cat.tool_count,
      color: cat.color || ''
    }))
  },  // Get all tools
  async getTools(): Promise<AITool[]> {
    // Fetch all tools using pagination to bypass the 1000 row limit
    const allTools: any[] = []
    const batchSize = 1000
    let from = 0
    let hasMore = true
    
    while (hasMore) {
      const { data, error } = await supabase
        .from('tools')
        .select('*')
        .order('rating', { ascending: false })
        .range(from, from + batchSize - 1)
      
      if (error) throw error
        if (data && data.length > 0) {
        allTools.push(...data)
        from += batchSize
        hasMore = data.length === batchSize
      } else {
        hasMore = false
      }
    }

    // Transform database format to frontend format
    return allTools.map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      shortDescription: tool.short_description || tool.description || '',
      logo: tool.logo_url || '',
      category: tool.category_id,
      tags: tool.tags || [],
      rating: tool.rating || 0,
      pricing: tool.pricing || 'Free',
      url: tool.url || '',
      affiliateUrl: tool.affiliate_url || '',
      featured: tool.featured,
      trending: tool.trending,
      new: tool.new,
      clicks: tool.clicks,
      views: tool.views
    }))
  },  // Get tools by category
  async getToolsByCategory(categoryId: string): Promise<AITool[]> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('category_id', categoryId)
      .order('rating', { ascending: false })
      .limit(5000) // Increase limit to handle all tools
    
    if (error) throw error
    
    return (data || []).map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      shortDescription: tool.short_description || tool.description || '',
      logo: tool.logo_url || '',
      category: tool.category_id,
      tags: tool.tags || [],
      rating: tool.rating || 0,
      pricing: tool.pricing || 'Free',
      url: tool.url || '',
      affiliateUrl: tool.affiliate_url || '',
      featured: tool.featured,
      trending: tool.trending,
      new: tool.new,
      clicks: tool.clicks,
      views: tool.views
    }))
  },
  // Get featured tools
  async getFeaturedTools(): Promise<AITool[]> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('featured', true)
      .order('rating', { ascending: false })
    
    if (error) throw error
    
    return (data || []).map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      shortDescription: tool.short_description || tool.description || '',
      logo: tool.logo_url || '',
      category: tool.category_id,
      tags: tool.tags || [],
      rating: tool.rating || 0,
      pricing: tool.pricing || 'Free',
      url: tool.url || '',
      affiliateUrl: tool.affiliate_url || '',
      featured: tool.featured,
      trending: tool.trending,
      new: tool.new,
      clicks: tool.clicks,
      views: tool.views
    }))
  },
  // Get trending tools
  async getTrendingTools(): Promise<AITool[]> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .eq('trending', true)
      .order('views', { ascending: false })
    
    if (error) throw error
    
    return (data || []).map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      shortDescription: tool.short_description || tool.description || '',
      logo: tool.logo_url || '',
      category: tool.category_id,
      tags: tool.tags || [],
      rating: tool.rating || 0,
      pricing: tool.pricing || 'Free',
      url: tool.url || '',
      affiliateUrl: tool.affiliate_url || '',
      featured: tool.featured,
      trending: tool.trending,
      new: tool.new,
      clicks: tool.clicks,
      views: tool.views
    }))
  },

  // Update tool clicks/views
  async updateToolStats(id: string, field: 'clicks' | 'views'): Promise<void> {
    const { error } = await supabase.rpc('increment_tool_stat', {
      tool_id: id,
      stat_field: field
    })
    
    if (error) throw error
  },
  // Search tools
  async searchTools(query: string): Promise<AITool[]> {
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .or(`name.ilike.%${query}%,description.ilike.%${query}%,tags.cs.{${query}}`)
      .order('rating', { ascending: false })
    
    if (error) throw error
    
    return (data || []).map(tool => ({
      id: tool.id,
      name: tool.name,
      description: tool.description,
      shortDescription: tool.short_description || tool.description || '',
      logo: tool.logo_url || '',
      category: tool.category_id,
      tags: tool.tags || [],
      rating: tool.rating || 0,
      pricing: tool.pricing || 'Free',
      url: tool.url || '',
      affiliateUrl: tool.affiliate_url || '',
      featured: tool.featured,
      trending: tool.trending,
      new: tool.new,
      clicks: tool.clicks,
      views: tool.views
    }))
  }
}
