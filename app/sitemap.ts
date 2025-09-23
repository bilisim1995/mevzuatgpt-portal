import { MetadataRoute } from 'next';
import { fetchSitemapAllDocuments, fetchSitemapInstitutions } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://mevzuatgpt.org';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/hakkinda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/sss`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/yardim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/gizlilik-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/kullanim-kosullari`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cerez-politikasi`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  try {
    // Kurum sayfaları
    const institutions = await fetchSitemapInstitutions();
    const institutionPages: MetadataRoute.Sitemap = institutions.map((institution) => ({
      url: `${baseUrl}/kurum/${institution.kurum_id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    // Tüm mevzuat metinleri
    const documents = await fetchSitemapAllDocuments();
    const documentPages: MetadataRoute.Sitemap = documents.map((document) => ({
      url: `${baseUrl}/mevzuat/${document.url_slug}`,
      lastModified: new Date(document.olusturulma_tarihi),
      changeFrequency: 'monthly',
      priority: 0.9,
    }));

    return [
      ...staticPages,
      ...institutionPages,
      ...documentPages,
    ];
  } catch (error) {
    console.warn('Dinamik sitemap oluşturulamadı, sadece static sayfalar döndürülüyor:', error);
    return staticPages;
  }
}