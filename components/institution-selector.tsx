"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Building, ChevronDown, Check, Loader2 } from '@/components/icon-components';
import { Institution } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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

// Türkçe alfabe harfleri
const turkishAlphabet = ['Tümü', 'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'Ğ', 'H', 'I', 'İ', 'J', 'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 'T', 'U', 'Ü', 'V', 'Y', 'Z'];

export function InstitutionSelector({ institutions, loading = false }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string>('Tümü');
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Kurumları harf filtresine göre filtrele ve sırala
  const getFilteredInstitutions = () => {
    return [...institutions]
      .filter((institution) => {
        // Harf filtresi
        if (selectedLetter !== 'Tümü') {
          const firstLetter = institution.name.charAt(0).toUpperCase();
          if (selectedLetter === 'İ') {
            // İ harfi için: İ veya I ile başlayanları göster
            const normalizedFirst = firstLetter === 'İ' || firstLetter === 'I' ? 'İ' : firstLetter;
            if (normalizedFirst !== 'İ') return false;
          } else if (selectedLetter === 'I') {
            // I harfi için: Sadece I ile başlayanları göster (İ hariç)
            if (firstLetter !== 'I') return false;
          } else {
            // Diğer harfler için normal kontrol
            if (firstLetter !== selectedLetter) return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        // Önce mevzuat adedi 0'dan büyük olanları en başa al
        if (a.documentCount > 0 && b.documentCount === 0) return -1;
        if (a.documentCount === 0 && b.documentCount > 0) return 1;
        
        // Aynı durumda olanları alfabetik sırala
        return a.name.localeCompare(b.name, 'tr');
      });
  };

  const filteredInstitutions = getFilteredInstitutions();

  const handleSelect = (institution: Institution) => {
    setSelectedInstitution(institution);
    setIsNavigating(true);
    setIsOpen(false);
    router.push(`/kurum/${institution.id}`);
  };

  const handleLetterSelect = (letter: string) => {
    setSelectedLetter(letter);
    setSearchQuery(''); // Harf seçildiğinde arama sorgusunu temizle
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    // Arama yapıldığında harf filtresini sıfırla
    if (value.trim()) {
      setSelectedLetter('Tümü');
    }
  };

  // Command component için custom filter fonksiyonu (sadece arama için)
  // Harf filtresi zaten getFilteredInstitutions'da yapılıyor
  const customFilter = (value: string, search: string) => {
    // Sadece arama sorgusu filtresi (harf filtresi zaten uygulanmış)
    if (search.trim()) {
      const normalizedValue = value.toLowerCase();
      const normalizedSearch = search.toLowerCase();
      return normalizedValue.includes(normalizedSearch) ? 1 : 0;
    }
    return 1;
  };
  
  // Kurum arama değeri oluştur (ad + DETSİS)
  const getInstitutionSearchValue = (institution: Institution) => {
    const parts = [institution.name];
    if (institution.detsis) {
      parts.push(`DETSİS: ${institution.detsis}`, institution.detsis);
    }
    return parts.join(' ');
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
                  <Command 
                    className="rounded-lg"
                    filter={customFilter}
                    shouldFilter={true}
                  >
                    {/* Arama ve Filtre Satırı */}
                    <div className="flex items-center gap-2 px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex-1 [&>div]:border-0 [&>div]:border-b-0">
                        <CommandInput 
                          placeholder="Kurum adı veya DETSİS no ile ara" 
                          className="h-10 border-0 focus:ring-0"
                          value={searchQuery}
                          onValueChange={handleSearchChange}
                        />
                      </div>
                      
                      {/* Harf Filtresi Select */}
                      <Select value={selectedLetter} onValueChange={handleLetterSelect}>
                        <SelectTrigger className="w-24 h-10 text-sm font-medium shrink-0 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700">
                          <SelectValue placeholder="Tümü" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                          {turkishAlphabet.map((letter) => (
                            <SelectItem 
                              key={letter} 
                              value={letter}
                              className="text-sm cursor-pointer text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 focus:bg-gray-100 dark:focus:bg-gray-700"
                            >
                              {letter}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <CommandList className="max-h-48">
                      <CommandEmpty>Kurum bulunamadı.</CommandEmpty>
                      <CommandGroup>
                        {filteredInstitutions.map((institution, index) => (
                          <CommandItem
                            key={institution.id}
                            value={getInstitutionSearchValue(institution)}
                            onSelect={() => handleSelect(institution)}
                            className="flex flex-col cursor-pointer p-4"
                            disabled={isNavigating}
                          >
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center space-x-4 flex-1">
                                <div className="w-20 h-14 flex items-center justify-center">
                                  <div className="bg-white rounded p-2 shadow-md border border-gray-200 dark:border-gray-300 w-full h-full flex items-center justify-center">
                                    {institution.logo && institution.logo.trim() !== '' ? (
                                      <Image
                                        src={institution.logo}
                                        alt={`${institution.name} logosu`}
                                        width={64}
                                        height={48}
                                        className="w-full h-full object-contain"
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
                                        width={64}
                                        height={48}
                                        className="w-full h-full object-contain"
                                        loading="lazy"
                                        unoptimized={true}
                                      />
                                    )}
                                  </div>
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
                                    {institution.detsis && (
                                      <span className="ml-2 text-gray-500 dark:text-gray-500">- DETSİS: {institution.detsis}</span>
                                    )}
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
                            {index < filteredInstitutions.length - 1 && (
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