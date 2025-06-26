import { Metadata } from 'next'
import { BlogService } from '@/services/blogService'
import AdminProtection from '@/components/AdminProtection'
import BlogAdminClient from '@/components/blog/BlogAdminClient'

export const metadata: Metadata = {
  title: 'Blog Admin | AllAiTools',
  description: 'Manage blog posts and content.',
}

// Disable caching for admin pages to ensure fresh data
export const dynamic = 'force-dynamic'
export const revalidate = 0

// This will be a server component that fetches data
export default async function BlogAdminPage() {
  let posts: any[] = []
  let error: string | null = null

  try {
    posts = await BlogService.getAllPosts()
  } catch (err) {
    console.error('Error fetching posts:', err)
    error = 'Failed to fetch blog posts'
  }
  if (error) {
    return (
      <AdminProtection>
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <div className="flex justify-center mb-4">
                  <svg className="w-12 h-12 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Error Loading Blog Admin
                </h2>
                <p className="text-red-700 mb-6">
                  {error}
                </p>                <p className="text-gray-600 mb-6">
                  Make sure you have created the posts table in Supabase by running the SQL script in the database folder.
                </p>
                <a 
                  href="/admin/blog"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Again
                </a>
              </div>
            </div>
          </div>
        </div>
      </AdminProtection>
    )
  }

  return (
    <AdminProtection>
      <BlogAdminClient initialPosts={posts} />
    </AdminProtection>
  )
}
