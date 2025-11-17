import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BlogService } from '@/services/blogService'
import SimpleBlogContent from '@/components/blog/SimpleBlogContent'

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

// Generate static paths for all published posts
export async function generateStaticParams() {
  try {
    const slugs = await BlogService.getPublishedSlugs()
    return slugs.map((slug) => ({
      slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

// Generate metadata for each post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params
    const post = await BlogService.getPublishedPostBySlug(slug)
    
    if (!post) {
      return {
        title: 'Post Not Found | AllAiTools',
        description: 'The requested blog post could not be found.',
      }
    }

    return {
      title: `${post.title} | AllAiTools Blog`,
      description: post.excerpt || `Read ${post.title} on AllAiTools blog - your source for AI tools insights and reviews.`,
      keywords: `AI tools, ${post.title}, artificial intelligence, blog, review`,
      openGraph: {
        title: post.title,
        description: post.excerpt || post.title,
        type: 'article',
        url: `https://allaitools.com/blog/${post.slug}`,
        images: post.thumbnail ? [
          {
            url: post.thumbnail,
            width: 1200,
            height: 630,
            alt: post.title,
          }
        ] : [],
        publishedTime: post.published_at || post.created_at,
        modifiedTime: post.updated_at,
        authors: ['AllAiTools Team'],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt || post.title,
        images: post.thumbnail ? [post.thumbnail] : [],
      },
      alternates: {
        canonical: `https://allaitools.com/blog/${post.slug}`,
      },
    }
  } catch (error) {
    console.error('Error generating metadata:', error)
    return {
      title: 'Blog Post | AllAiTools',
      description: 'Read the latest AI tools insights and reviews.',
    }
  }
}

// Enable ISR with shorter revalidation for debugging - later increase to 3600
export const revalidate = 60

// Add memory monitoring
function logMemoryUsage(stage: string) {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const usage = process.memoryUsage()
    console.log(`[${stage}] Memory usage:`, {
      rss: `${Math.round(usage.rss / 1024 / 1024)}MB`,
      heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)}MB`,
      heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)}MB`,
      external: `${Math.round(usage.external / 1024 / 1024)}MB`
    })
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  logMemoryUsage('Page start')
  
  const { slug } = await params
  let post
  let additionalImages: Array<{id: string, image_url: string, alt_text: string | null, caption: string | null}> = []
  
  try {
    logMemoryUsage('Before fetching post')
    post = await BlogService.getPublishedPostBySlug(slug)
    logMemoryUsage('After fetching post')
    
    if (post) {
      // Only fetch additional images if content length is reasonable
      if (post.content && post.content.length < 50000) { // Limit content size
        try {
          additionalImages = await BlogService.getPostImages(post.slug)
          logMemoryUsage('After fetching images')
        } catch (error) {
          console.error('Error fetching additional images:', error)
        }
      } else {
        console.warn(`Post ${post.slug} content too large (${post.content?.length} chars), skipping additional images`)
      }
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }

  if (!post) {
    notFound()
  }
  const readingTime = BlogService.calculateReadingTime(post.content)
  const publishedDate = BlogService.formatDate(post.published_at || post.created_at)  // Function to handle inline text formatting (bold, etc.)
  const formatInlineText = (text: string): React.ReactNode => {
    // Split text by **bold** patterns and process each part
    const parts = text.split(/(\*\*[^*]+\*\*)/)
    
    return parts.map((part, index) => {
      // Check if this part is bold text (wrapped in **)
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        const boldText = part.slice(2, -2) // Remove ** from both ends
        return (
          <strong key={`bold-${index}`} className="font-semibold text-gray-900">
            {boldText}
          </strong>
        )
      }
      // Regular text
      return part
    })  }

  // Optimized function to format content with memory limits
  const formatContent = (content: string) => {
    logMemoryUsage('Before content formatting')
    
    // Limit content size to prevent memory issues
    const maxContentSize = 30000 // 30KB max
    const truncatedContent = content.length > maxContentSize 
      ? content.substring(0, maxContentSize) + '\n\n[Content truncated for performance...]'
      : content
    
    console.log(`Formatting content: ${truncatedContent.length} chars (original: ${content.length})`)
    
    // Split content by lines with limit
    const lines = truncatedContent.split('\n').slice(0, 500) // Max 500 lines
    
    const formattedContent = lines.map((line, index) => {
      try {
        const trimmedLine = line.trim()
        
        // Skip empty lines
        if (!trimmedLine) {
          return <br key={`br-${index}`} />
        }
        
        // Check for inline image syntax: [IMAGE:url] or [IMAGE:1] (for additional image by index)
        const imageMatch = trimmedLine.match(/^\[IMAGE:(.*?)\]$/)
        if (imageMatch) {
          const imageRef = imageMatch[1]
          let imageUrl = ''
          let altText = ''
          let caption = ''
          
          // Check if it's a URL (starts with http)
          if (imageRef.startsWith('http')) {
            imageUrl = imageRef
            altText = 'Inline image'
          } 
          // Check if it's a number referring to additional images
          else if (!isNaN(parseInt(imageRef))) {
            const imageIndex = parseInt(imageRef) - 1 // Convert to 0-based index
            if (imageIndex >= 0 && imageIndex < additionalImages.length) {
              const additionalImage = additionalImages[imageIndex]
              imageUrl = additionalImage.image_url
              altText = additionalImage.alt_text || 'Additional image'
              caption = additionalImage.caption || ''
            }
          }
          
          if (imageUrl) {
            return (
              <div key={`image-${index}`} className="my-8">
                <div className="rounded-lg overflow-hidden shadow-md">
                  <Image
                    src={imageUrl}
                    alt={altText}
                    width={800}
                    height={400}
                    className="w-full h-auto object-cover"
                    unoptimized={imageUrl.startsWith('http')}
                  />
                </div>
                {caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center italic">
                    {caption}
                  </p>
                )}
              </div>
            )
          }
        }
        
        // Check if line should be a title (starts with # or is all caps)
        if (trimmedLine.startsWith('# ')) {
          const titleText = trimmedLine.substring(2)
          return (
            <h1 key={`h1-${index}`} className="text-3xl font-bold text-gray-900 mb-6 mt-8">
              {formatInlineText(titleText)}
            </h1>
          )
        }
        
        if (trimmedLine.startsWith('## ')) {
          const titleText = trimmedLine.substring(3)
          return (
            <h2 key={`h2-${index}`} className="text-2xl font-bold text-gray-900 mb-4 mt-6">
              {formatInlineText(titleText)}
            </h2>
          )
        }
        
        if (trimmedLine.startsWith('### ')) {
          const titleText = trimmedLine.substring(4)
          return (
            <h3 key={`h3-${index}`} className="text-xl font-bold text-gray-900 mb-3 mt-5">
              {formatInlineText(titleText)}
            </h3>
          )
        }
        
        // Regular paragraph
        return (
          <p key={`p-${index}`} className="text-gray-700 leading-relaxed mb-4">
            {formatInlineText(trimmedLine)}
          </p>
        )
      } catch (error) {
        console.error(`Error formatting line ${index}:`, error)
        return (
          <p key={`error-${index}`} className="text-red-500 text-sm">
            [Error formatting content]
          </p>
        )
      }
    })
    
    logMemoryUsage('After content formatting')
    return formattedContent
  }

  // Structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    image: post.thumbnail,
    author: {
      '@type': 'Organization',
      name: 'AllAiTools',
      url: 'https://allaitools.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AllAiTools',
      logo: {
        '@type': 'ImageObject',
        url: 'https://allaitools.com/logo.png',
      },
    },
    datePublished: post.published_at || post.created_at,
    dateModified: post.updated_at,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://allaitools.com/blog/${post.slug}`,
    },
  }
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      
      <div className="min-h-screen bg-white">
        {/* Navigation Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <nav className="flex items-center text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors font-medium">
                Home
              </Link>
              <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <Link href="/blog" className="hover:text-blue-600 transition-colors font-medium">
                Blog
              </Link>
              <svg className="w-4 h-4 mx-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 font-medium truncate">{post.title}</span>
            </nav>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Article Header */}
          <header className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
              {post.title}
            </h1>
            
            {post.excerpt && (
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-light">
                {post.excerpt}
              </p>
            )}

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200">
              <div className="flex items-center text-gray-600">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">AllAiTools Team</p>
                  <p className="text-sm text-gray-500">Author</p>
                </div>
              </div>
              
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.published_at || post.created_at} className="font-medium">
                  {publishedDate}
                </time>
              </div>
              
              <div className="flex items-center text-gray-600">
                <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium">{readingTime} min read</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.thumbnail && (
            <div className="mb-10">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                  priority
                />
              </div>
            </div>
          )}          {/* Article Content */}
          <div className="max-w-none">
            <div className="text-lg leading-relaxed">
              {post.content && post.content.length > 30000 ? (
                // Use simplified content for large posts to prevent memory issues
                <SimpleBlogContent content={post.content} title={post.title} />
              ) : (
                // Use advanced formatting for smaller posts
                formatContent(post.content)
              )}
            </div>
          </div>
        </article>

        {/* Article Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 mt-16">
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Share Section */}
            <div className="text-center mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Share this article</h3>
              <div className="flex justify-center space-x-4">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://allaitools.com/blog/${post.slug}`)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://allaitools.com/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

            {/* Back to Blog */}
            <div className="text-center">
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Blog
              </Link>
            </div>
          </div>        </footer>

        {/* Related Posts Section */}
        <div className="bg-white py-16 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Explore More AI Tools
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Discover the latest AI tools and insights to boost your productivity
            </p>
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
              View All Blog Posts
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
