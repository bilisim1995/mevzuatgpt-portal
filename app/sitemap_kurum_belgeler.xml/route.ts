import { fetchSitemapDocumentsByInstitution } from '@/lib/api';
import { getInstitutionById } from '@/lib/data';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl = 'https://portal.mevzuatgpt.org';
  
  // URL'den kurum_id parametresini al
  const { searchParams } = new URL(request.url);
  const kurumId = searchParams.get('kurum_id');

  if (!kurumId) {
    // Kurum ID yoksa hata sitemap döndür
    const errorSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Kurum ID parametresi gerekli: ?kurum_id=KURUM_ID -->
</urlset>`;

    return new Response(errorSitemap, {
      status: 400,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }

  try {
    const documents = await fetchSitemapDocumentsByInstitution(kurumId);
    
    // Kurum adını ilk belgeden al (tüm belgeler aynı kuruma ait)
    const kurumAdi = documents.length > 0 ? documents[0].kurum_adi : 'Bilinmeyen Kurum';
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Kurum: ${kurumAdi} -->
  <!-- Kurum ID: ${kurumId} -->
  <!-- Toplam Belge Sayısı: ${documents.length} -->
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
    console.error(`Kurum belgeler sitemap oluşturulamadı (kurum_id: ${kurumId}):`, error);
    
    // Hata durumunda boş sitemap döndür
    const emptySitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- HATA: Kurum belgeleri yüklenemedi -->
  <!-- Kurum ID: ${kurumId} -->
  <!-- Hata: ${error} -->
</urlset>`;

    return new Response(emptySitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=300',
      },
    });
  }
}