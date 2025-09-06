"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Calendar, Building, ArrowRight, Loader2, ChevronLeft, ChevronRight } from '@/components/icon-components';
import { getRecentRegulations, Regulation } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const ITEMS_PER_PAGE = 6;

export function RecentRegulations() {
  const [recentRegulations, setRecentRegulations] = useState<Regulation[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function loadRecentRegulations() {
      try {
        const data = await getRecentRegulations(50); // Daha fazla veri çek
        setRecentRegulations(data);
      } catch (error) {
        console.error('Son mevzuatlar yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    }
    
    loadRecentRegulations();
  }, []);

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
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">Son Eklenen Mevzuat</h2>
          <p className="text-lg text-gray-800 dark:text-gray-300 max-w-2xl mx-auto">
            Güncel genelge ve yönetmelikleri takip edin
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
            <span className="ml-2 text-gray-600 dark:text-gray-400">Mevzuatlar yükleniyor...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentRegulations.map((regulation, index) => (
            <Link key={regulation.id} href={`/mevzuat/${regulation.id}`}>
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