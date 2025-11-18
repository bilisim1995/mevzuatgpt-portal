"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

// Lazy load UI components
const Card = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.Card })), { ssr: false });
const CardContent = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardContent })), { ssr: false });
const CardDescription = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardDescription })), { ssr: false });
const CardHeader = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardHeader })), { ssr: false });
const CardTitle = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardTitle })), { ssr: false });
const Skeleton = dynamic(() => import('@/components/ui/skeleton').then(mod => ({ default: mod.Skeleton })), { ssr: false });
const Badge = dynamic(() => import('@/components/ui/badge').then(mod => ({ default: mod.Badge })), { ssr: false });
const Button = dynamic(() => import('@/components/ui/button').then(mod => ({ default: mod.Button })), { ssr: false });
const Input = dynamic(() => import('@/components/ui/input').then(mod => ({ default: mod.Input })), { ssr: false });
const Select = dynamic(() => import('@/components/ui/select').then(mod => ({ default: mod.Select })), { ssr: false });
const SelectContent = dynamic(() => import('@/components/ui/select').then(mod => ({ default: mod.SelectContent })), { ssr: false });
const SelectItem = dynamic(() => import('@/components/ui/select').then(mod => ({ default: mod.SelectItem })), { ssr: false });
const SelectTrigger = dynamic(() => import('@/components/ui/select').then(mod => ({ default: mod.SelectTrigger })), { ssr: false });
const SelectValue = dynamic(() => import('@/components/ui/select').then(mod => ({ default: mod.SelectValue })), { ssr: false });

// Lazy load icons
const Calendar = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Calendar })), { ssr: false });
const Download = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Download })), { ssr: false });
const Search = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Search })), { ssr: false });
const Eye = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Eye })), { ssr: false });
const Loader2 = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Loader2 })), { ssr: false });
const ChevronLeft = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ChevronLeft })), { ssr: false });
const ChevronRight = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ChevronRight })), { ssr: false });
const Clock = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Clock })), { ssr: false });
const X = dynamic(() => import('lucide-react').then(mod => ({ default: mod.X })), { ssr: false });
const ArrowRight = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ArrowRight })), { ssr: false });

// Types
interface Regulation {
  id: string;
  title: string;
  summary: string;
  content: string;
  institutionId: string;
  institutionName: string;
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

interface ApiAutocompleteSuggestion {
  text: string;
  count: number;
  type: 'title' | 'keyword' | 'tag' | 'institution';
}

// Arama terimlerini vurgulama fonksiyonu
const highlightSearchTerm = (text: string, searchTerm: string) => {
  if (!searchTerm.trim()) return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => {
    if (regex.test(part)) {
      return (
        <span 
          key={index} 
          className="bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100 px-1 rounded"
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

interface Props {
  institutionId: string;
}

const ITEMS_PER_PAGE = 10;
const SEARCH_ITEMS_PER_PAGE = 10;

export function RegulationsList({ institutionId }: Props) {
  const router = useRouter();
  const [regulations, setRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ApiAutocompleteSuggestion[]>([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestionLoading, setSuggestionLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCurrentPage, setSearchCurrentPage] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [searchTotalCount, setSearchTotalCount] = useState(0);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);
  
  // Filtre state'leri
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [selectedSource, setSelectedSource] = useState<string>('Tümü');

  useEffect(() => {
    async function loadRegulations() {
      try {
        setLoading(true);
        const { getRegulationsByInstitutionSlug } = await import('@/lib/data');
        const data = await getRegulationsByInstitutionSlug(institutionId);
        setRegulations(data);
        // Filtreleri sıfırla
        setSelectedCategory('Tümü');
        setSelectedSource('Tümü');
      } catch (error) {
        // DÜZELTME: Hatalı kod satırı yerine standart hata yönetimi eklendi.
        console.error('Mevzuatları yüklerken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadRegulations();
  }, [institutionId]);

  // Otomatik tamamlama önerileri
  useEffect(() => {
    const loadSuggestions = async () => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      // institutionId kontrolü ekle
      if (!institutionId) {
        setSuggestions([]);
        setShowSuggestions(false);
        return;
      }

      setSuggestionLoading(true);
      try {
        // Kurum bilgisini al
        const [dataModule, apiModule] = await Promise.all([
          import('@/lib/data'),
          import('@/lib/api')
        ]);
        const { getInstitutionById } = dataModule;
        const { fetchAutocomplete } = apiModule;
        const institution = await getInstitutionById(institutionId);
        
        // Institution kontrolü ekle
        if (!institution || !institution.name) {
          setSuggestions([]);
          setShowSuggestions(false);
          return;
        }
        
        const kurumAdi = institution?.name;
        
        console.log('Autocomplete isteği gönderiliyor:', { searchQuery, kurumId: institutionId, kurumAdi });
        const suggestionResults = await fetchAutocomplete(searchQuery, {
          limit: 10,
          kurum_id: institutionId
        });
        console.log('Autocomplete yanıtı:', suggestionResults);
        
        // Suggestions kontrolü ekle
        if (Array.isArray(suggestionResults)) {
          setSuggestions(suggestionResults);
          setShowSuggestions(suggestionResults.length > 0); // Sadece öneri varsa göster
        } else {
          setSuggestions([]);
          setShowSuggestions(false);
        }
      } catch (error) {
        console.error('Öneri yükleme hatası:', error);
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setSuggestionLoading(false);
      }
    };

    const timeoutId = setTimeout(loadSuggestions, 300); // 300ms debounce
    return () => clearTimeout(timeoutId);
  }, [searchQuery, institutionId]);
  // Global arama fonksiyonu
  const performGlobalSearch = async (query: string, page: number = 1) => {
    if (!query.trim()) {
      setIsSearchMode(false);
      setSearchResults([]);
      setSearchTotalCount(0);
      return;
    }

    setSearchLoading(true);
    setIsSearchMode(true);
    
    try {
      const { searchRegulations } = await import('@/lib/data');
      const offset = (page - 1) * SEARCH_ITEMS_PER_PAGE;
      
      // Kurum bilgisini al
      const { getInstitutionById } = await import('@/lib/data');
      const institution = await getInstitutionById(institutionId);
      const kurumAdi = institution?.name;
      
      const response = await searchRegulations(query, {
        limit: SEARCH_ITEMS_PER_PAGE,
        offset: offset,
        kurum_id: institutionId
      });
      // Sadece içerikte eşleşen sonuçları filtrele
      const contentMatches = response.results.filter(result => 
        result.matchType && result.matchType.includes('content')
      );
      setSearchResults(contentMatches);
      setSearchTotalCount(response.totalCount);
      setSearchCurrentPage(page);
    } catch (error) {
      console.error('Arama hatası:', error);
      setSearchResults([]);
      setSearchTotalCount(0);
    } finally {
      setSearchLoading(false);
    }
  };

  // Öneri seçimi
  const handleSuggestionSelect = (suggestion: ApiAutocompleteSuggestion) => {
    setSearchQuery(suggestion.text);
    setShowSuggestions(false);
    setSelectedSuggestionIndex(-1);
  };

  // Öneriler değiştiğinde seçili index'i sıfırla
  useEffect(() => {
    setSelectedSuggestionIndex(-1);
  }, [suggestions]);

  // Input focus/blur yönetimi
  const handleInputFocus = () => {
    if (searchQuery.length >= 2) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Öneri tıklamasına zaman tanımak için gecikme
    setTimeout(() => setShowSuggestions(false), 200);
  };

  // Input değişikliği yönetimi
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Input silinirse arama modundan çık ve tüm mevzuatları göster
    if (value.trim() === '') {
      setIsSearchMode(false);
      setSearchResults([]);
      setSearchTotalCount(0);
      setSearchCurrentPage(1);
    }
    // NOT: Input'a yazı yazılması hiçbir arama işlemi tetiklemez
    // Sadece autocomplete çalışır, arama için buton tıklanmalı
  };
  // Klavye navigasyonu - Enter, ok tuşları
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (showSuggestions && selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
        // Öneri seçildiyse onu kullan
        e.preventDefault();
        handleSuggestionSelect(suggestions[selectedSuggestionIndex]);
      } else {
        // Arama yap
        handleSearch();
      }
    } else if (e.key === 'ArrowDown') {
      // Aşağı ok - bir sonraki öneriye git
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
      }
    } else if (e.key === 'ArrowUp') {
      // Yukarı ok - bir önceki öneriye git
      if (showSuggestions && suggestions.length > 0) {
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
      }
    } else if (e.key === 'Escape') {
      // Esc - önerileri kapat
      setShowSuggestions(false);
      setSelectedSuggestionIndex(-1);
    }
  };

  // Manuel arama fonksiyonu
  const handleSearch = () => {
    if (searchQuery.trim()) {
      performGlobalSearch(searchQuery.trim(), 1);
    }
  };

  // Öneri türü ikonları
  const getSuggestionIcon = (type: string) => {
    switch (type) {
      case 'title': return '📋';
      case 'keyword': return '🔑';
      case 'tag': return '🏷️';
      case 'institution': return '🏢';
      default: return '🔍';
    }
  };

  // Öneri türü etiketleri
  const getSuggestionTypeLabel = (type: string) => {
    switch (type) {
      case 'title': return 'Başlık';
      case 'keyword': return 'Anahtar Kelime';
      case 'tag': return 'Etiket';
      case 'institution': return 'Kurum';
      default: return 'Genel';
    }
  };

  // Hızlı yönlendirme fonksiyonu
  const handleQuickNavigate = (regulationId: string) => {
    setNavigatingTo(regulationId);
    // Prefetch ile sayfayı önceden yükle
    router.prefetch(`/mevzuat/${regulationId}`);
    // Hemen yönlendir
    setTimeout(() => {
      router.push(`/mevzuat/${regulationId}`);
    }, 100);
  };
  // Filtreleme için benzersiz değerleri hesapla
  const uniqueCategories = Array.from(new Set(regulations.map(r => r.category).filter(Boolean))).sort();
  const uniqueStatuses = Array.from(new Set(regulations.map(r => r.status).filter(Boolean)));
  
  // Kaynakları tags ve documentNumber'dan çıkar
  const extractSources = () => {
    const sources = new Set<string>();
    regulations.forEach(regulation => {
      // Tags içinden kaynakları bul
      if (regulation.tags && regulation.tags.length > 0) {
        regulation.tags.forEach(tag => {
          const upperTag = tag.toUpperCase().trim();
          // KAYSİS, Resmi Gazete gibi kaynakları bul
          if (upperTag.includes('KAYSİS') || upperTag.includes('RESMİ GAZETE') || upperTag.includes('RG')) {
            if (upperTag.includes('KAYSİS')) {
              sources.add('KAYSİS');
            }
            if (upperTag.includes('RESMİ GAZETE') || upperTag.includes('RG')) {
              sources.add('Resmi Gazete');
            }
          } else if (tag.trim()) {
            // Diğer kaynakları da ekle (boş olmayan tag'ler)
            sources.add(tag.trim());
          }
        });
      }
      // documentNumber'dan da kontrol et
      if (regulation.documentNumber) {
        const upperDoc = regulation.documentNumber.toUpperCase();
        if (upperDoc.includes('KAYSİS')) {
          sources.add('KAYSİS');
        }
        if (upperDoc.includes('RESMİ GAZETE') || upperDoc.includes('RG')) {
          sources.add('Resmi Gazete');
        }
      }
    });
    return Array.from(sources).sort();
  };
  
  const uniqueSources = extractSources();

  // Filter regulations
  // Sadece arama modu sonuçları veya tüm mevzuatlar gösterilir
  // Input'a yazılan metin hiçbir filtreleme yapmaz
  let filteredRegulations = isSearchMode ? searchResults : regulations;
  
  // Filtreleri uygula
  if (!isSearchMode) {
    filteredRegulations = filteredRegulations.filter(regulation => {
      // Kategori filtresi
      if (selectedCategory !== 'Tümü' && regulation.category !== selectedCategory) {
        return false;
      }
      
      // Kaynak filtresi
      if (selectedSource !== 'Tümü') {
        const hasSource = regulation.tags?.some((tag: string) => {
          const upperTag = tag.toUpperCase().trim();
          if (selectedSource === 'KAYSİS') {
            return upperTag.includes('KAYSİS');
          } else if (selectedSource === 'Resmi Gazete') {
            return upperTag.includes('RESMİ GAZETE') || upperTag.includes('RG');
          } else {
            return tag.trim() === selectedSource;
          }
        }) || (regulation.documentNumber && (
          selectedSource === 'KAYSİS' && regulation.documentNumber.toUpperCase().includes('KAYSİS') ||
          selectedSource === 'Resmi Gazete' && (regulation.documentNumber.toUpperCase().includes('RESMİ GAZETE') || regulation.documentNumber.toUpperCase().includes('RG'))
        ));
        
        if (!hasSource) return false;
      }
      
      return true;
    });
  }

  // Sort regulations
  const sortedRegulations = filteredRegulations
    .sort((a, b) => {
      // Arama modunda alakalılığa göre sırala
      if (isSearchMode && (a as any).relevancePercentage && (b as any).relevancePercentage) {
        return (b as any).relevancePercentage - (a as any).relevancePercentage;
      }
      // Normal modda tarihe göre sırala
      return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
    });

  // Pagination calculations
  const itemsPerPage = isSearchMode ? SEARCH_ITEMS_PER_PAGE : ITEMS_PER_PAGE;
  const activePage = isSearchMode ? searchCurrentPage : currentPage;
  const totalCount = isSearchMode ? searchTotalCount : sortedRegulations.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage));
  
  let currentRegulations;
  if (isSearchMode) {
    currentRegulations = sortedRegulations; // API'den sayfalanmış veri geliyor
  } else {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    currentRegulations = sortedRegulations.slice(startIndex, endIndex);
  }

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
    setSearchCurrentPage(1);
  }, []);  // searchQuery dependency kaldırıldı

  const handlePageChange = (page: number) => {
    if (isSearchMode) {
      performGlobalSearch(searchQuery, page);
    } else {
      setCurrentPage(page);
    }
    // Scroll to top of regulations list
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show smart pagination
      if (activePage <= 3) {
        // Show first pages
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (activePage >= totalPages - 2) {
        // Show last pages
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show middle pages
        pages.push(1);
        pages.push('...');
        for (let i = activePage - 1; i <= activePage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  // Skeleton component
  const RegulationSkeleton = () => (
    <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-18" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex flex-wrap gap-1">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-14" />
              <Skeleton className="h-5 w-18" />
            </div>
          </div>
          <div className="flex flex-col space-y-2 ml-4">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </CardHeader>
    </Card>
  );

  return (
    <section className="py-2 font-sans regulations-list" style={{ minHeight: '400px', contain: 'layout style paint' }}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Search */}
        <div className="mb-8 mt-6">
          <div className="max-w-2xl mx-auto">
            <div className="sr-only" id="search-description">
              Mevzuat arama kutusu. Arama yapmak için metin girin ve Enter tuşuna basın veya ara butonuna tıklayın.
            </div>
            <div className="relative" onBlur={handleInputBlur}>
              {/* Modern search container */}
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-xl focus-within:shadow-xl focus-within:border-blue-500 dark:focus-within:border-blue-400">
                {/* Search icon */}
                <div className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10" aria-hidden="true">
                  {suggestionLoading ? (
                    <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />
                  ) : (
                    <Search className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
                
                {/* Search input */}
                <Input
                  type="search"
                  placeholder="Mevzuat başlığı, içerik veya etiket ara..."
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                  onKeyPress={handleKeyPress}
                  className="w-full pl-16 pr-28 py-8 text-base bg-transparent border-0 focus:ring-0 focus:outline-none placeholder:text-gray-400 dark:placeholder:text-gray-500 text-gray-900 dark:text-gray-100"
                  aria-label="Mevzuat arama kutusu"
                  aria-autocomplete="list"
                  aria-expanded={showSuggestions}
                  aria-controls="search-suggestions"
                  aria-describedby="search-description"
                />
                
                {/* Action buttons */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                  {/* Search button */}
                  <button
                    onClick={handleSearch}
                    disabled={!searchQuery.trim() || searchLoading}
                    className="px-5 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 dark:disabled:bg-blue-500 text-white rounded-lg transition-colors flex items-center space-x-2 disabled:cursor-not-allowed"
                    aria-label="Mevzuat ara"
                    title="Mevzuat ara"
                  >
                    {searchLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    ) : (
                      <Search className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="text-sm font-medium">Ara</span>
                  </button>
                </div>
                
              </div>
              
              {/* Filtreler */}
              {!loading && regulations.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3 justify-center">
                  {/* Kategori Filtresi */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-[calc(50%-6px)] sm:w-auto sm:min-w-[180px] h-10 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                      <span className="flex-1 text-left">
                        {selectedCategory}
                      </span>
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      <SelectItem value="Tümü" className="text-sm cursor-pointer text-gray-900 dark:text-gray-100">
                        Tümü
                      </SelectItem>
                      {uniqueCategories.map((category) => (
                        <SelectItem 
                          key={category} 
                          value={category}
                          className="text-sm cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Kaynak Filtresi */}
                  {uniqueSources.length > 0 && (
                    <Select value={selectedSource} onValueChange={setSelectedSource}>
                      <SelectTrigger className="w-[calc(50%-6px)] sm:w-auto sm:min-w-[140px] h-10 text-sm bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100">
                        <span className="flex-1 text-left">
                          {selectedSource}
                        </span>
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                        <SelectItem value="Tümü" className="text-sm cursor-pointer text-gray-900 dark:text-gray-100">
                          Tümü
                        </SelectItem>
                        {uniqueSources.map((source) => (
                          <SelectItem 
                            key={source} 
                            value={source}
                            className="text-sm cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            {source}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              )}

              {/* Autocomplete Suggestions */}
              {showSuggestions && searchQuery.length >= 2 && suggestions.length > 0 && (
                <div 
                  className="absolute top-full left-0 right-0 mt-2 z-50"
                  role="listbox"
                  aria-label="Arama önerileri"
                  id="search-suggestions"
                >
                  <Card className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 shadow-xl max-h-80 overflow-y-auto">
                    <CardContent className="p-2">
                      {suggestionLoading ? (
                        <div className="flex justify-center items-center py-4" role="status" aria-live="polite">
                          <Loader2 className="h-5 w-5 animate-spin text-blue-500" aria-hidden="true" />
                          <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Öneriler yükleniyor...</span>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {suggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              role="option"
                              aria-selected={selectedSuggestionIndex === index}
                              onClick={() => handleSuggestionSelect(suggestion)}
                              onMouseEnter={() => setSelectedSuggestionIndex(index)}
                              className={cn(
                                "w-full p-3 text-left rounded-lg transition-all duration-150 group",
                                selectedSuggestionIndex === index
                                  ? "bg-blue-100 dark:bg-blue-900/50"
                                  : "hover:bg-blue-50 dark:hover:bg-blue-950/50"
                              )}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-lg">{getSuggestionIcon(suggestion.type)}</span>
                                  <div className="flex-1">
                                    <div className="flex items-center space-x-2">
                                      <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                        {suggestion.text}
                                      </span>
                                      <Badge variant="outline" className="text-xs bg-gray-50 dark:bg-gray-700">
                                        {getSuggestionTypeLabel(suggestion.type)}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-gray-400 group-hover:text-blue-500 transition-colors" aria-hidden="true">
                                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                  </svg>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Clear Search Button */}
        {isSearchMode && (
          <div className="mb-6 flex justify-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setIsSearchMode(false);
                setSearchResults([]);
                setSearchTotalCount(0);
                setSearchCurrentPage(1);
              }}
              className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 shadow-sm"
            >
              <X className="h-4 w-4 mr-2" aria-hidden="true" />
              Aramayı Temizle
            </Button>
          </div>
        )}

        {/* Loading Status - Screen Reader Announcement */}
        {loading && (
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            Mevzuatlar yükleniyor, lütfen bekleyin.
          </div>
        )}

        {/* Search Results Status - Screen Reader Announcement */}
        {isSearchMode && searchLoading && (
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            Arama sonuçları yükleniyor.
          </div>
        )}

        {isSearchMode && !searchLoading && searchResults.length > 0 && (
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            {searchTotalCount} adet arama sonucu bulundu.
          </div>
        )}

        {isSearchMode && !searchLoading && searchResults.length === 0 && searchQuery.trim() !== '' && (
          <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">
            Arama sonucu bulunamadı.
          </div>
        )}

        {/* Results Count */}
        {loading ? (
          <div className="flex justify-center items-center py-12" role="status" aria-live="polite">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" aria-hidden="true" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">
              Mevzuatlar yükleniyor...
            </span>
          </div>
        ) : (
          <>
            {/* Regulations Grid */}
            {searchLoading ? (
              <div className="mb-8">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        {/* Badge skeletons */}
                        <div className="flex flex-wrap items-center gap-2">
                          <Skeleton className="h-5 w-16" />
                          <Skeleton className="h-5 w-20" />
                          <Skeleton className="h-5 w-24" />
                          <Skeleton className="h-5 w-18" />
                          <Skeleton className="h-5 w-20" />
                        </div>
                        
                        {/* Title skeleton */}
                        <div className="space-y-2">
                          <Skeleton className="h-7 w-3/4" />
                          <Skeleton className="h-7 w-1/2" />
                        </div>
                        
                        {/* Description skeleton */}
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-4 w-2/3" />
                        </div>
                      </div>

                      {/* Button skeletons */}
                      <div className="flex flex-col space-y-2 ml-4">
                        <Skeleton className="h-9 w-24" />
                        <Skeleton className="h-9 w-20" />
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            ) : currentRegulations.length > 0 ? (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
                  {currentRegulations.map((regulation, index) => (
                    <div key={regulation.id} className="flex flex-col">
                      <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 group hover:shadow-xl transition-all duration-200 flex flex-col h-full relative">
                        <CardHeader className="pb-4 flex-1 flex flex-col">
                          {/* Tarih - Sağ üst köşe */}
                          <div className="absolute top-4 right-4 text-xs text-gray-500 dark:text-gray-400 flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span>{new Date(regulation.publishDate).toLocaleDateString('tr-TR')}</span>
                          </div>
                          
                          <div className="space-y-3 flex-1 flex flex-col">
                            <div className="space-y-3 flex-1 flex flex-col">
                              
                              <Link href={`/mevzuat/${regulation.id}`}>
                                <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors cursor-pointer hover:underline mt-2 leading-tight pr-20">
                                  {isSearchMode && searchQuery ? highlightSearchTerm(regulation.title, searchQuery) : regulation.title}
                                </CardTitle>
                              </Link>
                              <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed pt-1 line-clamp-3 min-h-[4.5rem]">
                                {(() => {
                                  const displayText = isSearchMode && (regulation as any).contentPreview 
                                    ? (regulation as any).contentPreview 
                                    : regulation.summary;
                                  return isSearchMode && searchQuery ? highlightSearchTerm(displayText, searchQuery) : displayText;
                                })()}
                              </CardDescription>
                            </div>
                          </div>

                          {/* Separator */}
                          <hr className="border-gray-200 dark:border-gray-600 my-4" />

                          {/* Meta info and buttons on same level - Alt kısımda sabit */}
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-auto">
                                {/* Meta information */}
                                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                                  <Badge variant="secondary" className="text-xs">
                                    {regulation.category}
                                  </Badge>
                                  {isSearchMode && (regulation as any).matchType && (
                                    <div className="flex items-center space-x-2">
                                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                                        {(() => {
                                          const matchType = (regulation as any).matchType;
                                          const types = [];
                                          if (matchType.includes('title')) types.push('📋 Başlık');
                                          if (matchType.includes('content')) types.push('📄 İçerik');
                                          if (matchType.includes('keywords')) types.push('🏷️ Etiket');
                                          if (matchType.includes('kurum')) types.push('🏢 Kurum');
                                          return types.join(', ') || matchType;
                                        })()}
                                      </Badge>
                                      {(regulation as any).matchCount && (
                                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300">
                                          🔍 {(regulation as any).matchCount} eşleşme
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                  <Badge variant="outline" className="text-xs hidden sm:inline-flex">
                                    {regulation.documentNumber}
                                  </Badge>
                                  
                                  {/* Tags - Mobilde göster */}
                                  {regulation.tags && regulation.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 sm:hidden">
                                      {regulation.tags.slice(0, 3).map((tag: string) => (
                                        <Badge key={tag} variant="outline" className="text-xs bg-gray-50 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                          #{tag}
                                        </Badge>
                                      ))}
                                      {regulation.tags.length > 3 && (
                                        <Badge variant="outline" className="text-xs bg-gray-100 text-gray-500 dark:bg-gray-600 dark:text-gray-400">
                                          +{regulation.tags.length - 3}
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                  
                                  {isSearchMode && (regulation as any).relevancePercentage && (
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                        Alakalılık:
                                      </span>
                                      <div className="flex items-center space-x-1">
                                        <div className="relative w-6 h-6">
                                          <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2.5" fill="none" className="text-gray-200 dark:text-gray-700" />
                                            <circle
                                              cx="12"
                                              cy="12"
                                              r="10"
                                              stroke="currentColor"
                                              strokeWidth="2.5"
                                              fill="none"
                                              strokeDasharray={`${2 * Math.PI * 10}`}
                                              strokeDashoffset={`${2 * Math.PI * 10 * (1 - (regulation as any).relevancePercentage / 100)}`}
                                              className="text-yellow-500 dark:text-yellow-400 transition-all duration-500"
                                              strokeLinecap="round"
                                            />
                                          </svg>
                                        </div>
                                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                          {(regulation as any).relevancePercentage}%
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Action buttons */}
                                <div className="flex gap-2 w-full sm:w-auto">
                                  <Button 
                                    size="sm" 
                                    className="shadow-sm w-full text-white dark:text-white"
                                    onClick={() => handleQuickNavigate(regulation.id)}
                                    disabled={navigatingTo === regulation.id}
                                  >
                                    {navigatingTo === regulation.id ? (
                                      <>
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        <span>Yükleniyor...</span>
                                      </>
                                    ) : (
                                      <>
                                        <Eye className="h-5 w-5 mr-2" />
                                        <span>Görüntüle</span>
                                      </>
                                    )}
                                  </Button>

                                  
                                  {regulation.pdfUrl && (
                                     <a href={regulation.pdfUrl} target="_blank" rel="noopener noreferrer">
                                      <Button size="sm" variant="outline" className="shadow-sm w-full">
                                        <Download className="h-5 w-5 mr-2" />
                                        <span>PDF</span>
                                      </Button>
                                    </a>
                                  )}
                                </div>
                              </div>
                        </CardHeader>
                      </Card>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalCount > 0 && (
                  <>
                    <div className="flex items-center justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(activePage - 1)}
                        disabled={activePage === 1}
                        className="shadow-sm"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Önceki
                      </Button>

                      <div className="flex items-center space-x-1">
                        {generatePageNumbers().map((page, index) => (
                          <div key={index}>
                            {page === '...' ? (
                              <span className="px-3 py-2 text-gray-500 dark:text-gray-400">...</span>
                            ) : (
                              <Button
                                variant={activePage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => handlePageChange(page as number)}
                                className={`shadow-sm ${
                                  activePage === page 
                                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                              >
                                {page}
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(activePage + 1)}
                        disabled={activePage === totalPages}
                        className="shadow-sm"
                      >
                        Sonraki
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>

                    <div className="text-center mt-4">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Sayfa {activePage} / {totalPages} 
                        {isSearchMode 
                          ? ` (toplam ${searchTotalCount} sonuç)`
                          : ` (${((activePage - 1) * ITEMS_PER_PAGE) + 1}-${Math.min(activePage * ITEMS_PER_PAGE, regulations.length)} arası, toplam ${regulations.length} mevzuat)`
                        }
                      </p>
                    </div>
                  </>
                )}
              </>
            ) : !loading && (
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <div className="text-4xl">📄</div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                      {isSearchMode ? 'Arama sonucu bulunamadı' : 'Mevzuat bulunamadı'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {isSearchMode 
                        ? 'Aradığınız terime uygun sonuç bulunamadı. Farklı kelimeler deneyin.'
                        : 'Bu kuruma ait mevzuat bulunamadı.'
                      }
                    </p>
                    {isSearchMode && (
                      <Button onClick={() => {
                        setSearchQuery('');
                        setIsSearchMode(false);
                        setSearchResults([]);
                        setSearchTotalCount(0);
                      }} className="shadow-sm">
                        Tüm Mevzuatları Göster
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        )}
      </div>
    </section>
  );
}