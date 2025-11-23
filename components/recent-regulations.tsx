"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Building, ArrowRight, Loader2, ChevronLeft, ChevronRight, Filter, X } from '@/components/icon-components';
import { getRecentRegulations, Regulation } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

const ITEMS_PER_PAGE = 6;

export function RecentRegulations() {
  const [recentRegulations, setRecentRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtreleme state'leri
  const [filters, setFilters] = useState({
    dateRange: 'all', // all, 7days, 30days, 3months, custom
    customStartDate: '',
    customEndDate: '',
    belgeTuru: 'all', // all, Genelge, Yönetmelik, Tebliğ, Karar
    sortBy: 'belge_yayin_tarihi', // belge_yayin_tarihi, yukleme_tarihi, pdf_adi
    sortOrder: 'desc' // asc, desc
  });
  const [showFilters, setShowFilters] = useState(false);

  // Tarih aralığı hesaplama fonksiyonu
  const getDateRange = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    switch (filters.dateRange) {
      case '7days':
        const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return {
          start_date: sevenDaysAgo.toISOString().split('T')[0],
          end_date: today
        };
      case '30days':
        const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        return {
          start_date: thirtyDaysAgo.toISOString().split('T')[0],
          end_date: today
        };
      case '3months':
        const threeMonthsAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
        return {
          start_date: threeMonthsAgo.toISOString().split('T')[0],
          end_date: today
        };
      case 'custom':
        return {
          start_date: filters.customStartDate,
          end_date: filters.customEndDate
        };
      default:
        return {};
    }
  };

  // Filtreleme fonksiyonu
  const applyFilters = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const dateRange = getDateRange();
      
      // Filtreleme parametrelerini hazırla
      const filterParams: any = {
        sort_by: filters.sortBy,
        sort_order: filters.sortOrder,
        ...dateRange
      };
      
      // Belge türü filtresi
      if (filters.belgeTuru !== 'all') {
        filterParams.belge_turu = filters.belgeTuru;
      }
      
      const data = await getRecentRegulations(50, filterParams);
      setRecentRegulations(data);
      setCurrentPage(1); // Filtreleme sonrası ilk sayfaya dön
    } catch (error) {
      console.error('Son mevzuatlar yüklenemedi:', error);
      setError('Mevzuatlar yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    applyFilters();
  }, []);

  // Filtre değişikliklerini izle
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  // Filtreleri temizle
  const clearFilters = () => {
    setFilters({
      dateRange: 'all',
      customStartDate: '',
      customEndDate: '',
      belgeTuru: 'all',
      sortBy: 'belge_yayin_tarihi',
      sortOrder: 'desc'
    });
  };

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(recentRegulations.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRegulations = recentRegulations.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of section
    const section = document.querySelector('.recent-regulations-section');
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="recent-regulations-section py-24 lg:py-32 bg-gray-50 dark:bg-gray-800/50 font-sans">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">Son Eklenen Mevzuat</h2>
          <p className="text-lg text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
            Güncel genelge ve yönetmelikleri takip edin
          </p>
        </div>

        {/* Filtreleme Seçenekleri */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Filtreler
              {showFilters && <X className="h-4 w-4" />}
            </Button>
            
            <div className="flex gap-2">
              <Button
                onClick={applyFilters}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Filtrele'}
              </Button>
              <Button
                onClick={clearFilters}
                variant="outline"
                disabled={loading}
              >
                Temizle
              </Button>
            </div>
          </div>

          {showFilters && (
            <Card className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Tarih Filtresi */}
                <div className="space-y-2">
                  <Label htmlFor="dateRange">Tarih Aralığı</Label>
                  <Select
                    value={filters.dateRange}
                    onValueChange={(value) => handleFilterChange('dateRange', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tarih seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="7days">Son 7 Gün</SelectItem>
                      <SelectItem value="30days">Son 30 Gün</SelectItem>
                      <SelectItem value="3months">Son 3 Ay</SelectItem>
                      <SelectItem value="custom">Özel Tarih</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Özel Tarih Aralığı */}
                {filters.dateRange === 'custom' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Başlangıç Tarihi</Label>
                      <Input
                        id="startDate"
                        type="date"
                        value={filters.customStartDate}
                        onChange={(e) => handleFilterChange('customStartDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endDate">Bitiş Tarihi</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={filters.customEndDate}
                        onChange={(e) => handleFilterChange('customEndDate', e.target.value)}
                      />
                    </div>
                  </>
                )}

                {/* Belge Türü Filtresi */}
                <div className="space-y-2">
                  <Label htmlFor="belgeTuru">Belge Türü</Label>
                  <Select
                    value={filters.belgeTuru}
                    onValueChange={(value) => handleFilterChange('belgeTuru', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Belge türü seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tümü</SelectItem>
                      <SelectItem value="Genelge">Genelge</SelectItem>
                      <SelectItem value="Yönetmelik">Yönetmelik</SelectItem>
                      <SelectItem value="Tebliğ">Tebliğ</SelectItem>
                      <SelectItem value="Karar">Karar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sıralama Seçeneği */}
                <div className="space-y-2">
                  <Label htmlFor="sortBy">Sıralama</Label>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(value) => handleFilterChange('sortBy', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Sıralama seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="belge_yayin_tarihi">Yayın Tarihi</SelectItem>
                      <SelectItem value="yukleme_tarihi">Yükleme Tarihi</SelectItem>
                      <SelectItem value="pdf_adi">Alfabetik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sıralama Yönü */}
                <div className="space-y-2">
                  <Label htmlFor="sortOrder">Sıralama Yönü</Label>
                  <Select
                    value={filters.sortOrder}
                    onValueChange={(value) => handleFilterChange('sortOrder', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Yön seçin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="desc">Azalan (Yeni → Eski)</SelectItem>
                      <SelectItem value="asc">Artan (Eski → Yeni)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Mevzuatlar yükleniyor...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md mx-auto">
              <div className="text-red-600 dark:text-red-400 font-medium mb-2">Hata Oluştu</div>
              <div className="text-red-500 dark:text-red-300 text-sm mb-4">{error}</div>
              <Button 
                onClick={() => window.location.reload()} 
                variant="outline" 
                size="sm"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Sayfayı Yenile
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRegulations.map((regulation, index) => (
            <Link key={`${regulation.id}-${startIndex + index}`} href={`/mevzuat/${regulation.id}`}>
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 h-full group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {regulation.category}
                    </Badge>
                    <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(regulation.publishDate).toLocaleDateString('tr-TR')}
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {regulation.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-800 dark:text-gray-300 line-clamp-3">
                    {regulation.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-800 dark:text-gray-400">
                      <div className="w-4 h-4 flex items-center justify-center">
                        <Building className="h-4 w-4" />
                      </div>
                      <span className="truncate">{regulation.institutionName}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
          </div>
        )}

        {/* Pagination */}
        {!loading && recentRegulations.length > ITEMS_PER_PAGE && (
          <div className="mt-12 flex flex-col items-center space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="shadow-sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Önceki
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  let pageNum: number;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={`shadow-sm ${
                        currentPage === pageNum 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="shadow-sm"
              >
                Sonraki
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Sayfa {currentPage} / {totalPages} 
                ({((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, recentRegulations.length)} arası, toplam {recentRegulations.length} mevzuat)
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}