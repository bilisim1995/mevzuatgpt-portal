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
        
        {/* Critical CSS inline yükleme */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS - Above the fold */
            html { scroll-behavior: smooth; }
            body { font-feature-settings: 'rlig' 1, 'calt' 1; text-rendering: optimizeSpeed; }
            .hero-section { min-height: 60vh; }
            .institution-header { min-height: 300px; }
            .regulations-list { min-height: 400px; }
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