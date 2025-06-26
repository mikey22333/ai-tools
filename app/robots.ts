import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://allaitools.dev'

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/_next/static/',
          '/_next/image/',
          '/static/',
          '/public/',
          '/favicon.ico',
          '/sitemap.xml',
          '/robots.txt',
        ],
        disallow: [
          '/admin',
          '/api',
          '/admin/*',
          '/api/*',
          '/_next/webpack-hmr',
          '/private/',
        ],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
