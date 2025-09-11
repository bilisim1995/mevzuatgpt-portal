"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Building, ChevronDown, Check, Loader2 } from '@/components/icon-components';
import { Institution } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface Props {
  institutions: Institution[];
  loading?: boolean;
}

const categoryLabels = {
  ministry: 'Bakanlık',
  agency: 'Kurum',
  municipality: 'Belediye',
  regulatory: 'Düzenleyici Kurul'
};

const categoryColors = {
  ministry: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  agency: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
  municipality: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
  regulatory: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
};

export function InstitutionSelector({ institutions, loading = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleSelect = (institution: Institution) => {
    setSelectedInstitution(institution);
    setIsNavigating(true);
    setIsOpen(false);
    router.push(`/kurum/${institution.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="relative">
          {/* Selector Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            disabled={loading || isNavigating}
            className={cn(
              "w-full p-6 text-left bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl",
              "bg-gray-800 dark:bg-white border-gray-600 dark:border-gray-200",
              "hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-md hover:bg-gray-700 dark:hover:bg-gray-100",
              isOpen && "border-blue-500 dark:border-blue-500 shadow-xl",
              (loading || isNavigating) && "opacity-50 cursor-not-allowed"
            )}
            aria-label={
              loading
                ? 'Kurumlar yükleniyor'
                : isNavigating
                ? `${selectedInstitution?.name} yükleniyor`
                : selectedInstitution 
                  ? `Seçili kurum: ${selectedInstitution.name}`
                  : 'Kurum seçin'
            }
            aria-expanded={isOpen}
            aria-haspopup="listbox"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  {(loading || isNavigating) ? (
                    <Loader2 className="h-6 w-6 text-white animate-spin" />
                  ) : (
                    <Building className="h-6 w-6 text-white" />
                  )}
                </div>
                <div>
              
                  <div className="font-semibold text-xl tracking-wide text-white dark:text-gray-800">
                    {loading
                      ? 'Kurumlar yükleniyor...'
                      : isNavigating
                      ? `${selectedInstitution?.name} yükleniyor...`
                      : selectedInstitution 
                        ? selectedInstitution.name
                        : 'Listeden kurum seçin'
                    }
                  </div>
                  <div className="text-sm text-gray-300 dark:text-gray-600">
                    {loading
                      ? 'Lütfen bekleyin'
                      : isNavigating
                      ? 'Mevzuatlar hazırlanıyor...'
                      : selectedInstitution 
                      ? `${selectedInstitution.documentCount} belge • ${categoryLabels[selectedInstitution.category]}`
                      : 'Kurum seçmek için tıklayın'
                    }
                  </div>
                </div>
              </div>
              <ChevronDown className={cn(
                "h-5 w-5 text-gray-300 dark:text-gray-700 transition-transform duration-200",
                isOpen && "rotate-180",
                (loading || isNavigating) && "animate-pulse"
              )} />
            </div>
          </button>

          {/* Dropdown List */}
          {isOpen && !loading && !isNavigating && (
            <div className="absolute top-full left-0 right-0 mt-1 z-50">
              <Card className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-2xl shadow-gray-500/30 dark:shadow-black/60 drop-shadow-xl" role="listbox">
                <CardContent className="p-2">
                  <div className="max-h-48 overflow-y-auto">
                    {institutions.length === 0 ? (
                      // DÜZELTME 3: Gereksiz span kaldırıldı ve stiller basitleştirildi
                      <div className="p-4 text-center text-gray-600 dark:text-gray-400">
                        Kurum bulunamadı
                      </div>
                    ) : (
                    institutions.map((institution) => (
                      <button
                        key={institution.id}
                        onClick={() => handleSelect(institution)}
                        disabled={isNavigating}
                        className={cn(
                          "w-full p-4 text-left rounded-lg transition-all duration-150",
                          "hover:bg-gray-100 dark:hover:bg-blue-950/50",
                          selectedInstitution?.id === institution.id && "bg-blue-50 dark:bg-blue-900/30",
                          isNavigating && "opacity-50 cursor-not-allowed"
                        )}
                        role="option"
                        aria-selected={selectedInstitution?.id === institution.id}
                        aria-label={`${institution.name} - ${institution.documentCount} belge`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-14 h-14 flex items-center justify-center">
                          
                              {institution.logo && institution.logo.trim() !== '' ? (
                                <Image
                                  src={institution.logo}
                                  alt={`${institution.name} logosu`}
                                  width={32}
                                  height={32}
                                  className="w-16 h-16 object-contain rounded"
                                  loading="lazy"
                                  unoptimized={true}
                                  onError={(e) => {
                                    // Hata durumunda fallback emoji göster
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                    const parent = target.parentElement;
                                    if (parent) {
                                      parent.innerHTML = `<span class="text-2xl text-gray-600 dark:text-gray-300">${institution.category === 'ministry' ? '🏛️' : '🏢'}</span>`;
                                    }
                                  }}
                                />    
                              ) : (
                                <span className="text-2xl text-gray-600 dark:text-gray-300">
                                  {institution.category === 'ministry' ? '🏛️' : '🏢'}
                                </span>
                              )}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900 dark:text-gray-100">{institution.name}</span>
                                <Badge className={cn("text-xs", categoryColors[institution.category])}>
                                  {institution.documentCount} Adet
                                </Badge>
                              </div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                {institution.aciklama}
                              </div>
                            </div>
                          </div>
                          {selectedInstitution?.id === institution.id && !isNavigating && (
                            <Check className="h-5 w-5 text-blue-600" />
                          )}
                          {selectedInstitution?.id === institution.id && isNavigating && (
                            <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                          )}
                        </div>
                      </button>
                    ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Click outside to close */}
        {isOpen && !loading && !isNavigating && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
}