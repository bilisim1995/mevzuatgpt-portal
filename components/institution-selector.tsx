"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Building, ChevronDown, Check, Loader2 } from '@/components/icon-components';
import { Institution } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
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

  // Kurumları sırala: Mevzuat adedi 0'dan büyük olanlar en başta, sonra alfabetik
  const sortedInstitutions = [...institutions].sort((a, b) => {
    // Önce mevzuat adedi 0'dan büyük olanları en başa al
    if (a.documentCount > 0 && b.documentCount === 0) return -1;
    if (a.documentCount === 0 && b.documentCount > 0) return 1;
    
    // Aynı durumda olanları alfabetik sırala
    return a.name.localeCompare(b.name, 'tr');
  });

  const handleSelect = (institution: Institution) => {
    setSelectedInstitution(institution);
    setIsNavigating(true);
    setIsOpen(false);
    router.push(`/kurum/${institution.id}`);
  };

  // Klavye navigasyonu için handler'lar
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Escape' && isOpen) {
      e.preventDefault();
      setIsOpen(false);
    } else if ((e.key === 'Enter' || e.key === ' ') && !isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        <div className="relative">
          {/* Selector Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            onKeyDown={handleKeyDown}
            disabled={loading || isNavigating}
            className={cn(
              "w-full py-px px-4 text-left bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl",
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
                {(loading || isNavigating) ? (
                  <div className="w-20 h-20 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 text-white animate-spin" />
                  </div>
                ) : (
                  <Image
                    src="/kurum.gif"
                    alt="Kurum"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain"
                    loading="lazy"
                    unoptimized={true}
                  />
                )}
                <div>
              
                  <div className="font-semibold text-xl tracking-wide text-white dark:text-gray-900">
                    {loading
                      ? 'Kurumlar yükleniyor...'
                      : isNavigating
                      ? `${selectedInstitution?.name} yükleniyor...`
                      : selectedInstitution 
                        ? selectedInstitution.name
                        : 'Listeden kurum seçin'
                    }
                  </div>
                  <div className="text-sm text-gray-300 dark:text-black">
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
                "h-5 w-5 text-gray-300 dark:text-gray-500 transition-transform duration-200",
                isOpen && "rotate-180",
                (loading || isNavigating) && "animate-pulse"
              )} />
            </div>
          </button>

          {/* Dropdown List with Search */}
          {isOpen && !loading && !isNavigating && (
            <div className="absolute top-full left-0 right-0 mt-1 z-50">
              <Card className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-2xl shadow-gray-500/30 dark:shadow-black/60 drop-shadow-xl" role="listbox">
                <CardContent className="p-0">
                  <Command className="rounded-lg">
                    <CommandInput 
                      placeholder="Kurum ara..." 
                      className="h-12 border-0 focus:ring-0"
                    />
                    <CommandList className="max-h-48">
                      <CommandEmpty>Kurum bulunamadı.</CommandEmpty>
                      <CommandGroup>
                        {sortedInstitutions.map((institution, index) => (
                          <CommandItem
                            key={institution.id}
                            value={institution.name}
                            onSelect={() => handleSelect(institution)}
                            className="flex flex-col cursor-pointer p-4"
                            disabled={isNavigating}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center space-x-4 flex-1">
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
                                        const target = e.target as HTMLImageElement;
                                        target.src = '/kurum.gif';
                                      }}
                                      onLoad={() => {
                                        // Başarılı yükleme durumunda herhangi bir işlem yapma
                                      }}
                                    />    
                                  ) : (
                                    <Image
                                      src="/kurum.gif"
                                      alt="Kurum"
                                      width={32}
                                      height={32}
                                      className="w-16 h-16 object-contain rounded"
                                      loading="lazy"
                                      unoptimized={true}
                                    />
                                  )}
                                </div>
                                <div className="flex-1">
                                  <div className="flex items-center space-x-2">
                                    <span className="font-medium text-gray-900 dark:text-gray-100">{institution.name}</span>
                                    <Badge className={cn(
                                      "text-xs",
                                      institution.documentCount > 0 
                                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300" 
                                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"
                                    )}>
                                      {institution.documentCount} Adet
                                    </Badge>
                                  </div>
                                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 text-left">
                                    {institution.kurum_aciklama}
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
                            {index < sortedInstitutions.length - 1 && (
                              <div className="w-full flex justify-center mt-2">
                                <div className="w-1/2 h-px bg-gray-200 dark:bg-gray-700"></div>
                              </div>
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
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