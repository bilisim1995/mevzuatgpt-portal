import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mevzuat GPT - Güncel Genelgeler ve Mevzuat Metinleri',
    short_name: 'Mevzuat GPT',
    description: 'Kamu kurumlarının güncel genelge, yönetmelik ve mevzuat metinlerine ulaşabileceğiniz resmi platform. Yapay zeka destekli arama ile hızlı erişim.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3b82f6',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'tr',
    categories: ['government', 'legal', 'reference', 'productivity'],
    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Kurum Ara',
        short_name: 'Kurum Ara',
        description: 'Kurum seçerek mevzuat ara',
        url: '/?action=search-institution',
        icons: [
          {
            src: '/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'AI Asistan',
        short_name: 'AI Asistan',
        description: 'Yapay zeka asistanı ile mevzuat analizi',
        url: 'https://uygulama.mevzuatgpt.org',
        icons: [
          {
            src: '/favicon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    ],
  };
}