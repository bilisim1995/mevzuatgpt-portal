import { fetchSitemapAllDocuments } from '@/lib/api';

export async function GET() {
  const baseUrl = 'https://mevzuatgpt.org';

  try {
    const documents = await fetchSitemapAllDocuments();
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${documents.map((document) => `  <url>
    <loc>${baseUrl}/mevzuat/${document.url_slug}</loc>
    <lastmod>${new Date(document.olusturulma_tarihi).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
  </url>`).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Belgeler sitemap oluşturulamadı:', error);
    
    // Hata durumunda boş sitemap döndür
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>`;

    return new Response(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }
}