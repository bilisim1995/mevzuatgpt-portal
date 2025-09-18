// Fallback API URLs - birincisi çalışmazsa diğerini dene
const API_URLS = [
  'https://portalapi.mevzuatgpt.org',
  'https://27897322-76a4-44ee-9eae-a025f2ec0048-00-5kgsvegbsnnj.kirk.replit.dev',
  'http://localhost:8000', // Local development fallback
];

let currentApiIndex = 0;

// --- Arayüzler (Değişiklik Yok) ---
export interface ApiInstitution {
  kurum_id: string;
  kurum_adi: string;
  kurum_logo: string;
  kurum_aciklama: string;
  count: number;
}

export interface ApiRegulation {
  id: string;
  kurum_id: string;
  kurum_adi: string;
  kurum_logo: string;
  kurum_aciklama: string;
  pdf_adi: string;
  etiketler: string;
  belge_yayin_tarihi: string;
  belge_durumu: string;
  aciklama: string;
  url_slug: string;
  belge_turu?: string;
  anahtar_kelimeler?: string;
  status?: string;
  sayfa_sayisi?: number;
  dosya_boyutu_mb?: number;
  pdf_url?: string;
}

export interface ApiRegulationDetail {
  metadata: ApiRegulation;
  content: {
    id: string;
    metadata_id: string;
    icerik: string;
    olusturulma_tarihi: string;
  };
  kurum_adi: string;
  kurum_logo: string;
  kurum_aciklama: string;
}

export interface ApiSitemapInstitution {
  kurum_adi: string;
  count: number;
  slug: string;
  kurum_id: string;
}

export interface ApiSitemapDocument {
  id: string;
  kurum_adi: string;
  pdf_adi: string;
  belge_yayin_tarihi: string;
  url_slug: string;
  olusturulma_tarihi: string;
  kurum_id?: string;
}

export interface ApiSearchResult {
  id: string;
  pdf_adi: string;
  kurum_adi: string;
  match_type: string;
  content_preview: string;
  relevance_score: number;
  relevance_percentage: number;
  match_count: number;
  url_slug: string;
  belge_yayin_tarihi?: string;
  etiketler?: string;
  aciklama?: string;
  belge_turu?: string;
  belge_durumu?: string;
}

// Genel API Yanıt Arayüzü
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  count?: number;
  message: string;
}

// Arama için özel yanıt arayüzü
export interface ApiSearchResponse extends Omit<ApiResponse<ApiSearchResult[]>, 'data'> {
  data: ApiSearchResult[];
}

export interface ApiAutocompleteSuggestion {
  text: string;
  count: number;
  type: 'title' | 'keyword' | 'tag' | 'institution';
}

// Otomatik tamamlama için özel yanıt arayüzü
export interface ApiAutocompleteResponse {
  success: boolean;
  suggestions: ApiAutocompleteSuggestion[];
  message: string;
}


/**
 * TEMEL API ÇAĞRI FONKSİYONU (REFAKTE EDİLDİ)
 * Bu fonksiyon, tüm API çağrıları için yeniden deneme (retry) ve sunucu değiştirme (fallback) mantığını içerir.
 * Başarılı olursa ham `Response` nesnesini döndürür, böylece çağıran fonksiyonlar (örn. arama) header'ları okuyabilir.
 */
async function apiFetch(endpoint: string, options?: RequestInit): Promise<Response> {
  const maxRetries = API_URLS.length;
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const baseUrl = API_URLS[currentApiIndex];
    const url = `${baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        signal: AbortSignal.timeout(15000), // 15 saniye timeout
        cache: 'no-store', // Cache'i devre dışı bırak
        ...options,
      });

      if (!response.ok) {
        // Sunucudan 4xx veya 5xx gibi bir hata kodu geldiyse
        const error = new Error(`API Hatası: ${response.status} - ${url}`);
        (error as any).status = response.status;
        throw error;
      }
      
      // Başarılı çağrı, bu sunucuyu kullanmaya devam et
      return response;

    } catch (error) {
      console.warn(`API çağrısı başarısız (${url}):`, error);
      lastError = error as Error;

      // Bir sonraki API URL'sini dene
      currentApiIndex = (currentApiIndex + 1) % API_URLS.length;
      if (attempt < maxRetries - 1) {
        console.log(`Farklı bir sunucu ile yeniden deneniyor... (${attempt + 1}/${maxRetries})`);
      }
    }
  }

  // Tüm denemeler başarısız olduysa, son hatayı daha anlamlı bir mesajla sarmalayarak fırlat
  if (lastError) {
    if (lastError instanceof TypeError && lastError.message.includes('fetch')) {
      throw new Error(`API sunucularına bağlanılamıyor. Lütfen daha sonra tekrar deneyin.`);
    }
    if (lastError.name === 'TimeoutError') {
      throw new Error(`API çağrısı zaman aşımına uğradı. Sunucular yavaş yanıt veriyor.`);
    }
  }
  
  throw new Error('Tüm API sunucuları kullanılamıyor. Lütfen daha sonra tekrar deneyin.');
}

/**
 * Standart API yanıtlarını işleyen yardımcı fonksiyon.
 * `apiFetch`'i kullanır ve JSON'ı parse edip `data` alanını döner.
 */
async function apiCall<T>(endpoint: string): Promise<T> {
  const response = await apiFetch(endpoint);
  const result: ApiResponse<T> = await response.json();
  if (!result.success) {
    throw new Error(result.message || 'API tarafından bir hata bildirildi.');
  }
  return result.data;
}

// --- API Fonksiyonları ---

// Kurum listesini getir
export async function fetchInstitutions(): Promise<ApiInstitution[]> {
  const result = await apiCall<ApiInstitution[]>('/api/v1/institutions');
  return result;
}

// Kurum adına göre belgeleri getir
export async function fetchRegulationsByInstitutionName(
  kurumAdi: string,
  options: {
    limit?: number;
    offset?: number;
    search?: string;
    belge_turu?: string;
    belge_durumu?: string;
  } = {}
): Promise<ApiRegulation[]> {
  const params = new URLSearchParams({
    kurum_adi: kurumAdi,
    ...Object.fromEntries(
      Object.entries(options).filter(([_, value]) => value !== undefined).map(([key, value]) => [key, String(value)])
    )
  });
  return apiCall<ApiRegulation[]>(`/api/v1/documents?${params.toString()}`);
}

// Kurum ID'sine göre belgeleri getir
export async function fetchRegulationsByInstitutionId(
  kurumId: string,
  options: {
    limit?: number;
    offset?: number;
    search?: string;
    belge_turu?: string;
    belge_durumu?: string;
  } = {}
): Promise<ApiRegulation[]> {
  const params = new URLSearchParams(
    Object.fromEntries(
      Object.entries(options)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    )
  );
  
  // kurum_id parametresini ekle
  params.set('kurum_id', kurumId);
  
  const queryString = params.toString();
  const endpoint = `/api/v1/documents?${queryString}`;
  return apiCall<ApiRegulation[]>(endpoint);
}

// Backward compatibility için alias
export const fetchRegulationsByInstitutionSlug = fetchRegulationsByInstitutionId;
// Belge detayını getir
export async function fetchRegulationDetail(slug: string): Promise<ApiRegulationDetail> {
  return apiCall<ApiRegulationDetail>(`/api/v1/documents/${slug}`);
}

// Sağlık kontrolü (DÜZELTİLDİ)
export async function healthCheck(): Promise<{ status: string; timestamp: string }> {
  // `apiCall` kullanılarak BASE_URL hatası giderildi ve retry mantığı eklendi.
  return apiCall<{ status: string; timestamp: string }>('/api/v1/health');
}

// Sitemap için kurum listesini getir
export async function fetchSitemapInstitutions(): Promise<ApiSitemapInstitution[]> {
  return apiCall<ApiSitemapInstitution[]>('/api/v1/sitemap/institutions');
}

// Sitemap için kuruma göre belgeleri getir
export async function fetchSitemapDocumentsByInstitution(kurumId: string): Promise<ApiSitemapDocument[]> {
  const params = new URLSearchParams({ kurum_id: kurumId });
  return apiCall<ApiSitemapDocument[]>(`/api/v1/sitemap/documents?${params.toString()}`);
}

// Sitemap için tüm belgeleri getir
export async function fetchSitemapAllDocuments(): Promise<ApiSitemapDocument[]> {
  return apiCall<ApiSitemapDocument[]>('/api/v1/sitemap/all-documents');
}

// Global arama (REFAKTE EDİLDİ)
export async function fetchGlobalSearch(
  query: string,
  options: {
    limit?: number;
    offset?: number;
    kurum_id?: string;
  } = {}
): Promise<{ results: ApiSearchResult[]; totalCount: number }> {
  const params = new URLSearchParams({
    q: query,
    ...Object.fromEntries(
      Object.entries(options)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    )
  });
  
  const endpoint = `/api/v1/search?${params.toString()}`;


  
  // apiFetch kullanılarak hem header'lar hem de json gövdesi alınır.
  const response = await apiFetch(endpoint);
  const data: ApiSearchResponse = await response.json();

  if (!data.success) {
    throw new Error(data.message || 'Arama API çağrısı başarısız oldu.');
  }

  // Header'dan toplam sayıyı al, yoksa gövdedeki count'u kullan.
  const totalCount = parseInt(response.headers.get('X-Total-Count') || String(data.count) || '0', 10);
  
  return {
    results: data.data,
    totalCount: totalCount
  };
}

// Otomatik tamamlama önerileri (REFAKTE EDİLDİ)
export async function fetchAutocomplete(
  query: string,
  options: {
    limit?: number;
    kurum_id?: string;
  } = {}
): Promise<ApiAutocompleteSuggestion[]> {
  if (!query || query.length < 2) {
    return [];
  }

  const params = new URLSearchParams({
    q: query,
    ...Object.fromEntries(
      Object.entries(options)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => [key, String(value)])
    )
  });

  const endpoint = `/api/v1/autocomplete?${params.toString()}`;

  try {
    // Autocomplete yanıtı standart dışı olduğu için doğrudan apiFetch kullanılır.
    const response = await apiFetch(endpoint);
    const data: any = await response.json();
    
    if (!data.success) {
      console.warn('Autocomplete API başarısız dedi:', data.message);
      return []; // Başarısız olursa boş dizi dön.
    }
    
    return data.data?.suggestions || [];
  } catch (error) {
    // Autocomplete kritik bir işlem olmadığı için hata durumunda konsola yazdırıp boş dizi dönmek yeterlidir.
    // Bu, arama kutusunun çalışmaya devam etmesini sağlar.
    console.error('Autocomplete servisine ulaşılamadı:', error);
    return [];
  }
}