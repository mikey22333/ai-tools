import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { blogPosts, getBlogPost } from '@/data/blog'
import BlogPostClient from './BlogPostClient'

type Props = {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(parseInt(params.id))
  
  if (!post) {
    return {
      title: 'Post Not Found | Allaitools Blog'
    }
  }

  return {
    title: `${post.title} | Allaitools Blog`,
    description: post.excerpt,
  }
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id.toString(),
  }))
}

export default function BlogPost({ params }: Props) {
  const post = getBlogPost(parseInt(params.id))

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 3)

  return <BlogPostClient post={post} relatedPosts={relatedPosts} />
}
