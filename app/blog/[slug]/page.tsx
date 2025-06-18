import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BlogService } from '@/services/blogService'

interface BlogPostPageProps {
  params: {
    slug: string
  }
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
    const post = await BlogService.getPublishedPostBySlug(params.slug)
    
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

// Enable ISR - revalidate every hour
export const revalidate = 3600

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  let post
  let additionalImages: Array<{id: string, image_url: string, alt_text: string | null, caption: string | null}> = []
  
  try {
    post = await BlogService.getPublishedPostBySlug(params.slug)
    if (post) {
      // Fetch additional images
      try {
        additionalImages = await BlogService.getPostImages(post.slug)
      } catch (error) {
        console.error('Error fetching additional images:', error)
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
    })
  }
    // Function to format content with titles and inline images
  const formatContent = (content: string) => {
    console.log('Formatting content:', content.substring(0, 200) + '...')
    
    // Split content by lines
    const lines = content.split('\n')
    
    return lines.map((line, index) => {
      const trimmedLine = line.trim()
      
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
            altText = additionalImage.alt_text || `Additional image ${imageIndex + 1}`
            caption = additionalImage.caption || ''
          }
        }
        
        if (imageUrl) {
          return (
            <div key={index} className="my-8">
              <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={imageUrl}
                  alt={altText}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
                />
              </div>
              {caption && (
                <p className="text-sm text-gray-600 text-center mt-3 italic">
                  {caption}
                </p>
              )}
            </div>
          )
        } else {
          // If image not found, show placeholder
          return (
            <div key={index} className="my-8 p-4 bg-gray-100 border border-gray-300 rounded-lg text-center">
              <p className="text-gray-600">Image not found: {imageRef}</p>
            </div>
          )
        }
      }
      
      // Check if line should be a title (starts with # or is wrapped in ** **)
      if (trimmedLine.startsWith('# ')) {
        return (
          <h2 key={index} className="text-3xl font-bold text-gray-900 mt-8 mb-4 leading-tight">
            {trimmedLine.substring(2)}
          </h2>
        )
      } else if (trimmedLine.startsWith('## ')) {
        return (
          <h3 key={index} className="text-2xl font-semibold text-gray-900 mt-6 mb-3 leading-tight">
            {trimmedLine.substring(3)}
          </h3>        )
      } else if (trimmedLine.startsWith('### ')) {
        return (
          <h4 key={index} className="text-xl font-semibold text-gray-800 mt-5 mb-2 leading-tight">
            {trimmedLine.substring(4)}
          </h4>
        )      } else if (trimmedLine.match(/^\*\*([^*]{1,60})\*\*$/) && trimmedLine.length <= 64) {
        // Only treat as title if it's ONLY **text** and reasonably short (likely a title)
        const titleText = trimmedLine.replace(/^\*\*(.*)\*\*$/, '$1')
        return (
          <h3 key={index} className="text-2xl font-semibold text-gray-900 mt-6 mb-3 leading-tight">
            {titleText}
          </h3>
        )
      } else if (trimmedLine === '') {
        return <br key={index} />      } else {
        // Handle inline formatting for regular paragraphs
        const formattedText = formatInlineText(line)
        return (
          <p key={index} className="text-gray-800 leading-relaxed mb-4">
            {formattedText}
          </p>
        )
      }
    })
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
              {formatContent(post.content)}
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
