/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Performance optimizations
  // swcMinify is enabled by default in Next.js 13+, no need to specify
    // Webpack configuration
  webpack: (config, { isServer }) => {
    // Fix for Supabase realtime-js module issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }
    
    // Add path aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    
    // Production optimizations
    if (config.mode === 'production') {
      config.optimization.splitChunks.cacheGroups = {
        ...config.optimization.splitChunks.cacheGroups,
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 10,
          chunks: 'all',
        },
      };
    }
    
    return config;
  },
  
  // Remove experimental.esmExternals as it's not recommended and deprecated
  // experimental: {
  //   esmExternals: 'loose',
  // },
  // Security headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow',
          },
        ],
      },
      {
        source: '/admin/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },
  // Redirects for SEO and URL consistency
  async redirects() {
    return [
      {
        source: '/new-tool',
        destination: '/submit-tool',
        permanent: true, // 301 redirect
      },
      {
        source: '/add-tool',
        destination: '/submit-tool',
        permanent: true, // 301 redirect
      },
      {
        source: '/submit',
        destination: '/submit-tool',
        permanent: true, // 301 redirect
      },
      {
        source: '/new-tools',
        destination: '/tools',
        permanent: true, // 301 redirect
      },
    ];
  },
}

module.exports = nextConfig
