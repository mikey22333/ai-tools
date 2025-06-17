'use server'

import { revalidatePath, revalidateTag } from 'next/cache'

/**
 * Server actions for blog post operations with automatic cache revalidation
 */

export async function revalidateBlogPaths(slug?: string) {
  try {
    // Always revalidate the main blog page with both page and layout
    revalidatePath('/blog', 'page')
    revalidatePath('/blog', 'layout')
    
    // Revalidate the sitemap
    revalidatePath('/sitemap.xml', 'page')
    
    // Revalidate homepage in case blog posts appear there
    revalidatePath('/', 'page')
    
    // If a specific slug is provided, revalidate that page
    if (slug) {
      revalidatePath(`/blog/${slug}`, 'page')
    }
    
    // Revalidate the blog tag for any other cached content
    revalidateTag('blog-posts')
    
    console.log('Successfully revalidated blog paths', slug ? `for slug: ${slug}` : '')
    return { success: true }
  } catch (error) {
    console.error('Failed to revalidate blog paths:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function revalidateAllBlogContent() {
  try {
    // Revalidate all blog-related paths
    revalidatePath('/blog', 'layout')
    revalidatePath('/sitemap.xml')
    revalidateTag('blog-posts')
    
    console.log('Successfully revalidated all blog content')
    return { success: true }
  } catch (error) {
    console.error('Failed to revalidate all blog content:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function revalidateAfterDelete(slug: string) {
  try {
    // Force revalidation of all blog-related paths after delete
    revalidatePath('/blog', 'page')
    revalidatePath('/blog', 'layout')
    revalidatePath(`/blog/${slug}`, 'page')
    revalidatePath('/sitemap.xml', 'page')
    revalidatePath('/', 'page')
    
    // Clear all blog-related cache tags
    revalidateTag('blog-posts')
    revalidateTag('posts')
    
    console.log(`Successfully revalidated after deleting post: ${slug}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to revalidate after delete:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Force clear all blog caches - use when content isn't updating
 */
export async function forceBlogCacheRefresh() {
  try {
    // Force revalidate all possible blog paths
    revalidatePath('/blog', 'page')
    revalidatePath('/blog', 'layout')
    revalidatePath('/', 'page')
    revalidatePath('/sitemap.xml', 'page')
    
    // Clear all blog-related cache tags
    revalidateTag('blog-posts')
    revalidateTag('blog-list')
    revalidateTag('published-posts')
    
    console.log('Successfully force refreshed all blog cache')
    return { success: true }
  } catch (error) {
    console.error('Failed to force refresh blog cache:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

/**
 * Delete-specific cache clearing - more aggressive for deletions
 */
export async function clearDeletedPostCache(slug: string) {
  try {
    // Clear the specific post page
    revalidatePath(`/blog/${slug}`, 'page')
    
    // Clear the blog listing
    revalidatePath('/blog', 'page')
    revalidatePath('/blog', 'layout')
    
    // Clear homepage and sitemap
    revalidatePath('/', 'page')
    revalidatePath('/sitemap.xml', 'page')
    
    // Clear all relevant tags
    revalidateTag('blog-posts')
    revalidateTag('blog-list')
    revalidateTag(`blog-post-${slug}`)
    revalidateTag('published-posts')
    
    console.log(`Successfully cleared cache for deleted post: ${slug}`)
    return { success: true }
  } catch (error) {
    console.error('Failed to clear deleted post cache:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
