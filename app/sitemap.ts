import { MetadataRoute } from 'next'
import { supabase } from '@/lib/supabase'
import { BlogService } from '@/services/blogService'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use the correct production domain
  const baseUrl = 'https://www.allaitools.dev'

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
    },    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9, // Increased priority for blog main page
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
    },    {
      url: `${baseUrl}/submit-tool`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
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
    })) || []    // Get blog posts from database
    let blogPages: any[] = []
    
    try {
      console.log('Sitemap: Fetching blog posts...')
      const posts = await BlogService.getPublishedPosts()
      console.log('Sitemap: Found posts:', posts.length)
      
      blogPages = posts.map((post) => {
        const sitemapEntry = {
          url: `${baseUrl}/blog/${post.slug}`,
          lastModified: new Date(post.updated_at || post.created_at),
          changeFrequency: 'weekly' as const,
          priority: 0.8, // Increased priority for blog posts
        }
        console.log('Sitemap: Adding blog post:', sitemapEntry.url)
        return sitemapEntry
      })
      
      console.log(`Sitemap: Successfully added ${blogPages.length} blog posts`)
    } catch (error) {
      console.error('Sitemap: Error fetching blog posts:', error)
      blogPages = []
    }return [...staticPages, ...categoryPages, ...toolPages, ...blogPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Fallback: Generate sitemap with essential pages only
    return staticPages
  }
}
