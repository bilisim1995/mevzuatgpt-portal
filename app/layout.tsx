import './globals.css';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Lazy load components
const ThemeProvider = dynamic(() => import('@/components/theme-provider').then(mod => ({ default: mod.ThemeProvider })), { ssr: false });
const Toaster = dynamic(() => import('@/components/ui/sonner').then(mod => ({ default: mod.Toaster })), { ssr: false });
const GoogleAnalytics = dynamic(() => import('@/components/google-analytics').then(mod => ({ default: mod.GoogleAnalytics })), { ssr: false });
const PWAInstallPrompt = dynamic(() => import('@/components/pwa-install-prompt').then(mod => ({ default: mod.PWAInstallPrompt })), { ssr: false });
const OfflineIndicator = dynamic(() => import('@/components/offline-indicator').then(mod => ({ default: mod.OfflineIndicator })), { ssr: false });
const CookieBanner = dynamic(() => import('@/components/cookie-banner').then(mod => ({ default: mod.CookieBanner })), { ssr: false });

const baseUrl = process.env.NODE_ENV === 'production' 
  ? 'https://mevzuatgpt.org' 
  : 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Mevzuat Portal',
    default: 'Mevzuat Portal - Güncel Genelgeler ve Mevzuat Metinleri'
  },
  description: 'Kamu kurumlarının güncel genelge, yönetmelik ve mevzuat metinlerine ulaşabileceğiniz resmi platform. Hızlı arama, kategorilere göre filtreleme.',
  keywords: ['mevzuat', 'genelge', 'yönetmelik', 'kamu', 'hukuk', 'kanun', 'resmi gazete'],
  authors: [{ name: 'Mevzuat Portal' }],
  creator: 'Mevzuat Portal',
  publisher: 'Mevzuat Portal',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: baseUrl,
    title: 'Mevzuat Portal - Güncel Genelgeler ve Mevzuat Metinleri',
    description: 'Kamu kurumlarının güncel genelge, yönetmelik ve mevzuat metinlerine ulaşabileceğiniz resmi platform.',
    siteName: 'Mevzuat Portal',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mevzuat Portal - Güncel Genelgeler ve Mevzuat Metinleri',
    description: 'Kamu kurumlarının güncel genelge, yönetmelik ve mevzuat metinlerine ulaşabileceğiniz resmi platform.',
    creator: '@mevzuatportal',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://portalapi.mevzuatgpt.org" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* PWA Meta Tags */}
        <meta name="application-name" content="Mevzuat Portal" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mevzuat Portal" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-tap-highlight" content="no" />
        
        {/* Preload critical images - optimized sizes */}
        <link rel="preload" href="/favicon-32x32.png" as="image" type="image/png" crossOrigin="anonymous" />
        
        {/* Critical CSS inline yükleme - Optimized */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS - Above the fold - Optimized */
            html { scroll-behavior: smooth; font-display: swap; }
            body { 
              font-feature-settings: 'rlig' 1, 'calt' 1; 
              text-rendering: optimizeSpeed; 
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            .hero-section { 
              min-height: 60vh; 
              contain: layout style paint;
            }
            .institution-header { 
              min-height: 300px; 
              contain: layout style paint;
            }
            .regulations-list { 
              min-height: 400px; 
              contain: layout style paint;
            }
            /* Performance optimizations */
            .animate-fade-in-up {
              animation: fadeInUp 0.6s ease-out forwards;
            }
            @keyframes fadeInUp {
              from { opacity: 0; transform: translateY(20px); }
              to { opacity: 1; transform: translateY(0); }
            }
            /* Reduce layout shifts */
            img { height: auto; max-width: 100%; }
            .container { contain: layout; }
          `
        }} />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="dns-prefetch" href="https://vercel.live" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="color-scheme" content="light dark" />
        
        {/* Preload fonts */}
        <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style" />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" /></noscript>
        
        {/* Resource hints for better performance */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
        
        {/* Additional SEO Meta Tags */}
        <meta name="format-detection" content="telephone=no" />
        <meta name="HandheldFriendly" content="true" />
        <meta name="MobileOptimized" content="320" />
        
        {/* Structured Data - Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": `${baseUrl}/#organization`,
                  "name": "Mevzuat Portal",
                  "url": baseUrl,
                  "logo": {
                    "@type": "ImageObject",
                    "url": `${baseUrl}/mevzuat-logo-beyaz.png`,
                    "width": 224,
                    "height": 40
                  },
                  "description": "Kamu kurumlarının güncel genelge, yönetmelik ve mevzuat metinlerine ulaşabileceğiniz resmi platform",
                  "sameAs": [
                    "https://twitter.com/mevzuatportal"
                  ],
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "contactType": "customer service",
                    "url": `${baseUrl}/iletisim`
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": `${baseUrl}/#website`,
                  "url": baseUrl,
                  "name": "Mevzuat Portal",
                  "description": "Türkiye'nin en kapsamlı mevzuat veritabanı - Genelge, yönetmelik ve mevzuat metinleri",
                  "publisher": {
                    "@id": `${baseUrl}/#organization`
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": `${baseUrl}/mevzuat?q={search_term_string}`
                    },
                    "query-input": "required name=search_term_string"
                  },
                  "inLanguage": "tr-TR"
                },
                {
                  "@type": "WebPage",
                  "@id": `${baseUrl}/#webpage`,
                  "url": baseUrl,
                  "name": "Mevzuat Portal - Güncel Genelgeler ve Mevzuat Metinleri",
                  "isPartOf": {
                    "@id": `${baseUrl}/#website`
                  },
                  "about": {
                    "@id": `${baseUrl}/#organization`
                  },
                  "description": "Kamu kurumlarının güncel genelge, yönetmelik ve mevzuat metinlerine ulaşabileceğiniz resmi platform. Hızlı arama, kategorilere göre filtreleme.",
                  "breadcrumb": {
                    "@type": "BreadcrumbList",
                    "itemListElement": [
                      {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Ana Sayfa",
                        "item": baseUrl
                      }
                    ]
                  },
                  "inLanguage": "tr-TR"
                }
              ]
            })
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          storageKey="mevzuat-theme"
        >
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            {children}
          </div>
          <Toaster />
          <PWAInstallPrompt />
          <OfflineIndicator />
          <CookieBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}