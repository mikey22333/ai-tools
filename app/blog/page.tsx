import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BlogService } from '@/services/blogService'
import EzoicAd from '@/components/EzoicAd'

export const metadata: Metadata = {
  title: 'AI Tools Blog | Latest Insights, Reviews & Tutorials | AllAiTools',
  description: 'Discover the latest AI tools insights, comprehensive reviews, tutorials, and industry trends. Stay updated with the most innovative artificial intelligence tools and technologies.',
  keywords: 'AI tools blog, artificial intelligence, AI reviews, AI tutorials, machine learning, AI news',
  openGraph: {
    title: 'AI Tools Blog - Latest Insights & Reviews',
    description: 'Discover the latest AI tools insights, comprehensive reviews, tutorials, and industry trends.',
    type: 'website',
    url: 'https://allaitools.com/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Blog - Latest Insights & Reviews',
    description: 'Discover the latest AI tools insights, comprehensive reviews, tutorials, and industry trends.',
  }
}

// Disable caching temporarily for debugging
export const dynamic = 'force-dynamic'
export const revalidate = 0

export default async function BlogPage() {
  let posts: any[] = []
  let error: string | null = null
  
  try {
    console.log('Fetching published posts...')
    posts = await BlogService.getPublishedPosts()
    console.log('Found posts:', posts.length)
    console.log('Posts data:', posts.map(p => ({ id: p.id, title: p.title, is_published: p.is_published })))
  } catch (err) {
    console.error('Error fetching blog posts:', err)
    error = err instanceof Error ? err.message : 'Unknown error'
    posts = []
  }
  // Get latest posts (maximum 2 posts)
  const latestPosts = posts.slice(0, 2)
  // Get related posts (remaining posts after the latest 2, up to 10 total)
  const relatedPosts = posts.slice(2, 12)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">B</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">AI Tools Blog</h1>
                <p className="text-gray-600 text-sm">Latest insights and reviews</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </button>
              <div className="text-sm text-gray-500">
                Today • {new Date().toLocaleDateString('en-US', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </div>
            </div>
          </div>
        </div>
      </div>      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Ad - After Header */}
        <div className="mb-8">
          <EzoicAd placementId={106} className="text-center" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Latest Posts</h2>
                <div className="text-sm text-gray-500">
                  Today • {new Date().toLocaleDateString('en-US', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}
                </div>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                  <p className="text-gray-500">Check back soon for amazing AI tools content!</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {latestPosts.map((post, index) => (
                    <article key={post.id} className="group">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Image */}
                          <div className="md:w-80 flex-shrink-0">
                            <div className="relative h-48 md:h-40 rounded-lg overflow-hidden bg-gradient-to-br from-purple-400 to-pink-400">
                              {post.thumbnail ? (
                                <Image
                                  src={post.thumbnail}
                                  alt={post.title}
                                  fill
                                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                                  sizes="(max-width: 768px) 100vw, 320px"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
                                AI Tools
                              </span>
                              <span className="text-sm text-gray-500">
                                {BlogService.formatDate(post.published_at || post.created_at)}
                              </span>
                            </div>

                            <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {post.title}
                            </h3>

                            {post.excerpt && (
                              <p className="text-gray-600 mb-4 line-clamp-3">
                                {post.excerpt}
                              </p>
                            )}

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-600">AI</span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">AI Tools Team</p>
                                  <p className="text-xs text-gray-500">Expert Reviewer</p>
                                </div>
                              </div>
                              <div className="flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-700">
                                Read More
                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Sidebar Ad */}
            <div className="mb-6">
              <EzoicAd placementId={107} />
            </div>
            
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Related Posts</h3>
              <div className="space-y-6">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((post, index) => (
                    <article key={post.id} className="group">
                      <Link href={`/blog/${post.slug}`} className="block">
                        <div className="flex space-x-4">
                          <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-blue-400 to-purple-500">
                            {post.thumbnail ? (
                              <Image
                                src={post.thumbnail}
                                alt={post.title}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded">
                                AI Tools
                              </span>
                              <span className="text-xs text-gray-500">
                                {BlogService.formatDate(post.published_at || post.created_at)}
                              </span>
                            </div>
                            <h4 className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                          </div>
                        </div>
                      </Link>
                    </article>
                  ))
                ) : (
                  // Placeholder related posts when no posts are available
                  Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex space-x-4">
                      <div className="w-16 h-16 flex-shrink-0 rounded-lg bg-gray-200 animate-pulse"></div>
                      <div className="flex-1 min-w-0">
                        <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
