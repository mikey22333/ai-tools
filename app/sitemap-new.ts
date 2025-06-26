import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { blogPosts } from '@/data/blog'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://allaitools.dev'

  // Static pages with proper SEO priorities
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/top-picks`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/submit-tool`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ]

  try {
    // Try to get dynamic data from database first
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name, updated_at')
      .order('name')

    const { data: tools } = await supabase
      .from('tools')
      .select('id, name, updated_at')
      .eq('status', 'approved')
      .order('created_at', { ascending: false })

    // Generate category pages
    const categoryPages = categories?.map((category) => ({
      url: `${baseUrl}/categories/${category.id}`,
      lastModified: new Date(category.updated_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })) || []

    // Generate individual tool pages (if you have dedicated tool pages)
    const toolPages = tools?.map((tool) => ({
      url: `${baseUrl}/tools/${tool.id}`,
      lastModified: new Date(tool.updated_at || new Date()),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })) || []

    // Get blog posts from database or fallback to static data
    let blogPages: any[] = []
    
    try {
      const { data: dbBlogPosts } = await supabase
        .from('blog_posts')
        .select('slug, updated_at, created_at')
        .eq('published', true)
        .order('created_at', { ascending: false })

      blogPages = dbBlogPosts?.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at || post.created_at),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })) || []
    } catch {
      // Fallback to static blog posts
      blogPages = blogPosts.map((post) => ({
        url: `${baseUrl}/blog/${post.id}`,
        lastModified: new Date(post.publishedAt),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    }

    // Add category-specific blog pages
    const blogCategories = ['AI Trends', 'Business', 'Ethics', 'Creative', 'Beginner']
    const blogCategoryPages = blogCategories.map((category) => ({
      url: `${baseUrl}/blog?category=${encodeURIComponent(category)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    return [...staticPages, ...categoryPages, ...toolPages, ...blogPages, ...blogCategoryPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback: Generate sitemap with static blog posts only
    const fallbackBlogPages = blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.id}`,
      lastModified: new Date(post.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

    return [...staticPages, ...fallbackBlogPages]
  }
}
