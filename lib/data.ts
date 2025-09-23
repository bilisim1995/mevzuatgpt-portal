import { 
  fetchInstitutions, 
  fetchRegulationsByInstitutionId,
  fetchRegulationDetail,
  fetchGlobalSearch,
  ApiInstitution,
  ApiRegulation 
} from './api';
import { 
  adaptApiInstitutionToInstitution, 
  adaptApiRegulationToRegulation,
  adaptApiRegulationDetailToRegulation,
  adaptApiSearchResultToRegulation
} from './data-adapter';

export interface Institution {
  kurum_aciklama: string,
  id: string;
  name: string;
  shortName: string;
  description: string;
  documentCount: number;
  category: 'ministry' | 'agency' | 'municipality' | 'regulatory';
  logo: string;
}

export interface Regulation {
  id: string;
  title: string;
  summary: string;
  content: string;
  institutionId: string;
  institutionName: string;
  institutionLogo?: string;
  publishDate: string;
  effectiveDate: string;
  category: string;
  tags: string[];
  documentNumber: string;
  pdfUrl?: string;
  status: 'active' | 'amended' | 'repealed';
  pageCount?: number;
  fileSizeMB?: number;
}

export interface SearchResult extends Regulation {
  matchType: string;
  contentPreview: string;
  relevanceScore: number;
}

export interface SearchResponse {
  results: SearchResult[];
  totalCount: number;
  hasMore: boolean;
}
// API'den kurum listesini getir
export async function getInstitutions(): Promise<Institution[]> {
  const apiInstitutions = await fetchInstitutions();
  const adaptedInstitutions = apiInstitutions.map(adaptApiInstitutionToInstitution);
  return adaptedInstitutions;
}

// ID'ye göre kurum getir
export async function getInstitutionById(id: string): Promise<Institution | null> {
  const institutions = await getInstitutions();
  return institutions.find(inst => inst.id === id) || null;
}

// Kurum adına göre kurum getir (API'den gelen kurum adı ile)
export async function getInstitutionByName(name: string): Promise<Institution | undefined> {
  const institutions = await getInstitutions();
  return institutions.find(inst => inst.name === name);
}

// Kuruma göre mevzuatları getir
export async function getRegulationsByInstitutionSlug(kurumId: string, fetchLimit?: number): Promise<Regulation[]> {
  try {
    // API'den mevzuatları getir - yeni endpoint kullan
    const apiRegulations = await fetchRegulationsByInstitutionId(kurumId, {
      limit: fetchLimit || 100, // Sayfa başına maksimum belge sayısı
      sort_by: 'belge_yayin_tarihi',
      sort_order: 'desc'
    });
    
    return apiRegulations
      .map(adaptApiRegulationToRegulation)
      .filter(regulation => regulation.status === 'active');
  } catch (error) {
    console.warn(`${kurumId} kurumu için mevzuatlar alınamadı:`, error);
    return [];
  }
}
// Mevzuat detayını getir
export async function getRegulationById(id: string): Promise<Regulation | null> {
  try {
    const apiDetail = await fetchRegulationDetail(id);
    return adaptApiRegulationDetailToRegulation(apiDetail);
  } catch (error) {
    const statusCode = (error as any)?.status;
    if (statusCode === 500) {
      console.error(`${id} mevzuat detayı alınamadı - Sunucu hatası (500):`, error);
    } else if (statusCode === 404) {
      console.warn(`${id} mevzuat detayı bulunamadı (404):`, error);
    } else {
      console.warn(`${id} mevzuat detayı alınamadı:`, error);
    }
    return null;
  }
}

// Mevzuat arama
export async function searchRegulations(
  query: string,
  options: {
    limit?: number;
    offset?: number;
    kurum_id?: string;
  } = {}
): Promise<SearchResponse> {
  try {
    const { results, totalCount } = await fetchGlobalSearch(query, options);
    
    const searchResults = results.map(adaptApiSearchResultToRegulation);
    
    return {
      results: searchResults,
      totalCount,
      hasMore: (options.offset || 0) + searchResults.length < totalCount
    };
  } catch (error) {
    console.error('Global arama yapılamadı:', error);
    return {
      results: [],
      totalCount: 0,
      hasMore: false
    };
  }
}

// Son eklenen mevzuatları getir
export async function getRecentRegulations(limit: number = 10): Promise<Regulation[]> {
  const institutions = await getInstitutions();
  const allRegulations: Regulation[] = [];
  
  for (const institution of institutions) {
    try {
      const apiRegulations = await fetchRegulationsByInstitutionId(institution.id, {
        limit: Math.ceil(limit / institutions.length) + 5, // Her kurumdan biraz fazla al
        sort_by: 'belge_yayin_tarihi',
        sort_order: 'desc'
      });
      const regulations = apiRegulations
        .map(adaptApiRegulationToRegulation)
        .filter(regulation => regulation.status === 'active');
      allRegulations.push(...regulations);
    } catch (error) {
      console.error(`${institution.name} için mevzuatlar alınamadı:`, error);
    }
  }
  
  // Tarihe göre sırala ve limit uygula
  return allRegulations
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, limit);
}