import { Institution, Regulation } from './data';
import { ApiInstitution, ApiRegulation, ApiRegulationDetail, ApiSearchResult, ApiRecentRegulation } from './api';

// URL encoding helper function - Sadece problemli URL'leri düzelt
function encodeLogoUrl(logoUrl: string): string {
  if (!logoUrl) return '';
  
  // Eğer URL zaten düzgün görünüyorsa, olduğu gibi döndür
  if (!logoUrl.includes('%') && !logoUrl.includes('Türkiye') && !logoUrl.includes('İş')) {
    return logoUrl;
  }
  
  try {
    // Sadece Türkçe karakterler varsa encode et
    if (logoUrl.includes('Türkiye') || logoUrl.includes('İş') || logoUrl.includes('ğ') || 
        logoUrl.includes('ü') || logoUrl.includes('ş') || logoUrl.includes('ı') || 
        logoUrl.includes('ö') || logoUrl.includes('ç')) {
      
      // URL'yi parse et
      const url = new URL(logoUrl);
      const pathParts = url.pathname.split('/');
      const fileName = pathParts[pathParts.length - 1];
      
      // Sadece dosya adını encode et
      const encodedFileName = encodeURIComponent(fileName);
      pathParts[pathParts.length - 1] = encodedFileName;
      url.pathname = pathParts.join('/');
      
      return url.toString();
    }
    
    return logoUrl;
  } catch (error) {
    // Hata durumunda orijinal URL'yi döndür
    return logoUrl;
  }
}

// API verilerini mevcut interface'lere dönüştürme fonksiyonları

export function adaptApiInstitutionToInstitution(apiInst: ApiInstitution): Institution {
  // API'den gelen kurum_id'yi kullan
  const id = apiInst.kurum_id;

  // Kısa ad oluştur (kelimelerin ilk harfleri)
  const shortName = apiInst.kurum_adi.split(' ').map(word => word[0]).join('');

  // Kategori belirle (bakanlık/kurum ayrımı)
  const category = apiInst.kurum_adi.toLowerCase().includes('bakanlığı') || 
                   apiInst.kurum_adi.toLowerCase().includes('bakanlık') 
                   ? 'ministry' as const 
                   : 'agency' as const;

  const result = {
    id: id,
    name: apiInst.kurum_adi,
    shortName: shortName,
    kurum_aciklama: apiInst.kurum_aciklama,
    description: `${apiInst.kurum_adi} mevzuat metinleri`,
    documentCount: apiInst.count,
    category: category,
    logo: encodeLogoUrl(apiInst.kurum_logo)
  };
  return result;
}

export function adaptApiRegulationToRegulation(apiReg: ApiRegulation): Regulation {
  // Etiketleri parse et
  const tags = apiReg.etiketler ? apiReg.etiketler.split(',').map(tag => tag.trim()) : [];
  
  // Anahtar kelimeleri etiketlere ekle
  if (apiReg.anahtar_kelimeler) {
    const keywords = apiReg.anahtar_kelimeler.split(',').map(kw => kw.trim()).slice(0, 5);
    tags.push(...keywords);
  }

  // Belge türünü kategori olarak kullan
  const category = apiReg.belge_turu || 'Genelge';

  // Status'u dönüştür
  let status: 'active' | 'amended' | 'repealed' = 'active';
  if (apiReg.belge_durumu?.toLowerCase().includes('yürürlükten')) {
    status = 'repealed';
  } else if (apiReg.belge_durumu?.toLowerCase().includes('değişik')) {
    status = 'amended';
  }

  return {
    id: apiReg.url_slug,
    title: apiReg.pdf_adi,
    summary: apiReg.aciklama || 'Açıklama bulunmuyor',
    content: '', // İçerik detay sayfasında yüklenecek
    institutionId: apiReg.kurum_id,
    institutionName: apiReg.kurum_adi || 'Bilinmeyen Kurum',
    institutionLogo: encodeLogoUrl(apiReg.kurum_logo || ''),
    publishDate: apiReg.belge_yayin_tarihi,
    effectiveDate: apiReg.belge_yayin_tarihi, // Aynı tarih kullanılıyor
    category: category,
    tags: [...new Set(tags)], // Tekrarları kaldır
    documentNumber: apiReg.etiketler,
    pdfUrl: apiReg.pdf_url,
    status: status,
    pageCount: apiReg.sayfa_sayisi,
    fileSizeMB: apiReg.dosya_boyutu_mb
  };
}

export function adaptApiRegulationDetailToRegulation(apiDetail: ApiRegulationDetail): Regulation {
  const baseRegulation = adaptApiRegulationToRegulation(apiDetail.metadata);
  
  return {
    ...baseRegulation,
    content: apiDetail.content.icerik || 'İçerik yüklenemedi',
    institutionName: apiDetail.kurum_adi,
    institutionLogo: encodeLogoUrl(apiDetail.kurum_logo),
    institutionId: apiDetail.metadata.kurum_id
  };
}
export function adaptApiSearchResultToRegulation(apiResult: ApiSearchResult): Regulation & { 
  matchType: string; 
  contentPreview: string; 
  relevanceScore: number; 
  relevancePercentage: number;
  matchCount: number;
} {
  // Etiketleri parse et
  const tags = apiResult.etiketler ? apiResult.etiketler.split(',').map(tag => tag.trim()) : [];
  
  // Belge türünü kategori olarak kullan
  const category = apiResult.belge_turu || 'Genelge';

  // Status'u dönüştür
  let status: 'active' | 'amended' | 'repealed' = 'active';
  if (apiResult.belge_durumu?.toLowerCase().includes('yürürlükten')) {
    status = 'repealed';
  } else if (apiResult.belge_durumu?.toLowerCase().includes('değişik')) {
    status = 'amended';
  }

  return {
    id: apiResult.url_slug,
    title: apiResult.pdf_adi,
    summary: apiResult.aciklama || apiResult.content_preview || 'Açıklama bulunmuyor',
    content: '', // İçerik detay sayfasında yüklenecek
    institutionId: apiResult.kurum_adi.toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/\s+/g, '-'),
    institutionName: apiResult.kurum_adi,
    publishDate: apiResult.belge_yayin_tarihi || new Date().toISOString(),
    effectiveDate: apiResult.belge_yayin_tarihi || new Date().toISOString(),
    category: category,
    tags: [...new Set(tags)],
    documentNumber: apiResult.etiketler || apiResult.id,
    status: status,
    // Arama sonucu özel alanları
    matchType: apiResult.match_type,
    contentPreview: apiResult.content_preview,
    relevanceScore: apiResult.relevance_score,
    relevancePercentage: apiResult.relevance_percentage,
    matchCount: apiResult.match_count
  };
}

// Yeni endpoint için adapter fonksiyonu
export function adaptApiRecentRegulationToRegulation(apiReg: ApiRecentRegulation): Regulation {
  // Etiketleri parse et
  const tags = apiReg.etiketler ? apiReg.etiketler.split(',').map(tag => tag.trim()) : [];
  
  // Belge türünü kategori olarak kullan
  const category = apiReg.belge_turu || 'Genelge';

  // Status'u dönüştür
  let status: 'active' | 'amended' | 'repealed' = 'active';
  if (apiReg.belge_durumu?.toLowerCase().includes('yürürlükten')) {
    status = 'repealed';
  } else if (apiReg.belge_durumu?.toLowerCase().includes('değişik')) {
    status = 'amended';
  }

  return {
    id: apiReg.url_slug,
    title: apiReg.pdf_adi,
    summary: apiReg.aciklama || 'Açıklama bulunmuyor',
    content: '', // İçerik detay sayfasında yüklenecek
    institutionId: apiReg.kurum_id,
    institutionName: apiReg.kurum_adi,
    institutionLogo: encodeLogoUrl(apiReg.kurum_logo || ''),
    publishDate: apiReg.belge_yayin_tarihi,
    effectiveDate: apiReg.belge_yayin_tarihi,
    category: category,
    tags: [...new Set(tags)], // Tekrarları kaldır
    documentNumber: apiReg.etiketler,
    pdfUrl: apiReg.pdf_url,
    status: status,
    pageCount: apiReg.sayfa_sayisi,
    fileSizeMB: apiReg.dosya_boyutu_mb
  };
}