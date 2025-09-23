/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // CSS ve static dosya MIME type düzeltmeleri
  async headers() {
    return [
      {
        source: '/_next/static/css/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'text/css; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/js/:path*',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/javascript; charset=utf-8',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
          }
        ]
      }
    ]
  },
  images: { 
    unoptimized: true,
    domains: ['images.pexels.com', 'portalapi.mevzuatgpt.org', 'mevzuatgpt.org', '27897322-76a4-44ee-9eae-a025f2ec0048-00-5kgsvegbsnnj.kirk.replit.dev', 'cdn.mevzuatgpt.org'],
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverComponentsExternalPackages: [],
    optimizeCss: true,
    optimizePackageImports: ['@radix-ui/react-icons'],
    esmExternals: 'loose',
    cssChunking: 'strict'
  },
  // Modern tarayıcılar için optimize et
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error']
    } : false,
  },
  
  // Performance optimizations
  poweredByHeader: false,
  reactStrictMode: true,
  // Hata ayıklama için
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Bundle analyzer için
  webpack: (config, { dev, isServer }) => {
    // Production'da bundle boyutunu optimize et
    if (!dev && !isServer) {
      // Modern JavaScript için polyfill'leri kaldır
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "core-js": false,
        fs: false,
        net: false,
        tls: false,
      };
      
      // Tree shaking optimization
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
      
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 10000,
        maxSize: 150000,
        cacheGroups: {
          default: false,
          vendors: false,
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)?.[1];
              return `vendor.${packageName?.replace('@', '')}`;
            },
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            name: 'react',
            chunks: 'all',
            priority: 20,
            reuseExistingChunk: true,
          },
          ui: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'ui',
            chunks: 'all',
            priority: 15,
            reuseExistingChunk: true,
          },
        },
      };
      
      // Tree shaking optimizations
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    // Optimize bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    };
    
    // CSS modül optimizasyonu
    // Tree shake lucide-react more aggressively
    if (!dev && !isServer) {
      config.optimization.providedExports = true;
      config.optimization.usedExports = true;
      config.optimization.sideEffects = false;
    }
    
    // Reduce bundle size by excluding heavy dependencies when not needed
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
};

module.exports = nextConfig;