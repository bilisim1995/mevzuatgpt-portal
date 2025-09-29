// IndexNow utility functions for MevzuatGPT

const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'mevzuatgpt-indexnow-2024-key';
const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://mevzuatgpt.org' 
  : 'http://localhost:3000';

export interface IndexNowResult {
  success: boolean;
  message: string;
  urls: string[];
  results: Array<{
    engine: string;
    status: 'fulfilled' | 'rejected';
    success: boolean;
  }>;
}

/**
 * IndexNow API'ye URL bildirimi gönder
 */
export async function submitToIndexNow(urls: string[]): Promise<IndexNowResult> {
  try {
    // URL'leri doğrula ve filtrele
    const validUrls = urls
      .filter(url => {
        // Sadece mevzuat ve kurum sayfalarını kabul et
        return url.startsWith(BASE_URL) && 
               (url.includes('/mevzuat/') || 
                url.includes('/kurum/') || 
                url === BASE_URL);
      })
      .map(url => {
        // URL'yi normalize et
        return url.endsWith('/') ? url.slice(0, -1) : url;
      });

    if (validUrls.length === 0) {
      return {
        success: false,
        message: 'Geçerli URL bulunamadı',
        urls: [],
        results: []
      };
    }

    // IndexNow API'ye gönder
    const response = await fetch(`${BASE_URL}/api/indexnow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        key: INDEXNOW_KEY,
        urls: validUrls
      })
    });

    if (!response.ok) {
      throw new Error(`IndexNow API error: ${response.status}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error('IndexNow submission error:', error);
    return {
      success: false,
      message: `IndexNow bildirimi başarısız: ${error}`,
      urls: urls,
      results: []
    };
  }
}

/**
 * Yeni mevzuat eklendiğinde otomatik IndexNow bildirimi
 */
export async function notifyNewRegulation(regulationId: string): Promise<IndexNowResult> {
  const url = `${BASE_URL}/mevzuat/${regulationId}`;
  return await submitToIndexNow([url]);
}

/**
 * Kurum sayfası güncellendiğinde IndexNow bildirimi
 */
export async function notifyInstitutionUpdate(institutionId: string): Promise<IndexNowResult> {
  const url = `${BASE_URL}/kurum/${institutionId}`;
  return await submitToIndexNow([url]);
}

/**
 * Toplu URL bildirimi (sitemap güncellemeleri için)
 */
export async function notifyBulkUrls(urls: string[]): Promise<IndexNowResult> {
  // Maksimum 10,000 URL (IndexNow limiti)
  const batchSize = 10000;
  const batches = [];
  
  for (let i = 0; i < urls.length; i += batchSize) {
    batches.push(urls.slice(i, i + batchSize));
  }

  const results = [];
  for (const batch of batches) {
    const result = await submitToIndexNow(batch);
    results.push(result);
  }

  return {
    success: results.every(r => r.success),
    message: `${results.length} batch işlendi`,
    urls: urls,
    results: results.flatMap(r => r.results)
  };
}

/**
 * Ana sayfa güncellemeleri için IndexNow bildirimi
 */
export async function notifyHomepageUpdate(): Promise<IndexNowResult> {
  return await submitToIndexNow([BASE_URL]);
}

/**
 * IndexNow key doğrulama
 */
export function validateIndexNowKey(key: string): boolean {
  return key === INDEXNOW_KEY;
}

/**
 * IndexNow durumu kontrolü
 */
export async function checkIndexNowStatus(): Promise<{
  key: string;
  keyLocation: string;
  apiEndpoint: string;
  supportedEngines: string[];
}> {
  return {
    key: INDEXNOW_KEY,
    keyLocation: `${BASE_URL}/indexnow-key.txt`,
    apiEndpoint: `${BASE_URL}/api/indexnow`,
    supportedEngines: ['Microsoft Bing', 'Yandex']
  };
}
