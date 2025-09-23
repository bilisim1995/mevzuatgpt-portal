import { fetchSitemapInstitutions } from '@/lib/api';

export async function GET() {
  const baseUrl = 'https://mevzuatgpt.org';

  try {
    const institutions = await fetchSitemapInstitutions();
    
    // API'den gelen veriyi kontrol et
    console.log('Sitemap için kurumlar:', institutions);
    
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${institutions.map((institution) => {
  // Önce slug'ı kontrol et, yoksa kurum_adi'yi URL-safe hale getir
  let kurumSlug = institution.slug;
  
  if (!kurumSlug && institution.kurum_adi) {
    // kurum_adi'yi URL-safe slug'a çevir
    kurumSlug = institution.kurum_adi
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  if (!kurumSlug) {
    console.warn('Kurum slug bulunamadı:', institution);
    return null; // Bu kurumu atla
  }
  
  return `  <url>
    <loc>${baseUrl}/kurum/${kurumSlug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
}).filter(Boolean).join('\n')}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Kurum sitemap oluşturulamadı:', error);
    
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