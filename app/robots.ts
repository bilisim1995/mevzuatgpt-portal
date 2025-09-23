import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/static/',
          '/*.json$',
          '/*?*', // Query parametreli URL'leri engelle
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/private/',
          '/admin/',
          '/api/',
          '/_next/',
          '/static/',
        ],
      },
    ],
    sitemap: [
      'https://mevzuatgpt.org/sitemap.xml',
      'https://mevzuatgpt.org/sitemap_kurumlar.xml',
      'https://mevzuatgpt.org/sitemap_belgeler.xml',
      'https://mevzuatgpt.org/sitemap_kurum_belgeler.xml',
      'https://mevzuatgpt.org/blog/sitemap.xml', // WordPress blog sitemap'i
    ],
    host: 'https://mevzuatgpt.org',
  };
}