"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getInstitutions, Institution } from '@/lib/data';
import { Building } from 'lucide-react';

export function InstitutionLogosCarousel() {
  const [institutions, setInstitutions] = useState<{ firstRow: Institution[]; secondRow: Institution[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInstitutions() {
      try {
        const data = await getInstitutions();
        // Logosu olan kurumları filtrele ve en az 10 kurum olacak şekilde ayarla
        const institutionsWithLogos = data.filter(inst => inst.logo && inst.logo.trim() !== '');
        // Eğer yeterli logo yoksa, tüm kurumları al (fallback logo kullanılacak)
        const finalInstitutions = institutionsWithLogos.length >= 10 
          ? institutionsWithLogos.slice(0, 20) // En fazla 20 kurum göster
          : data.slice(0, 20);
        
        // Kurumları iki gruba böl (iki satır için)
        const firstRowBase = finalInstitutions.slice(0, Math.ceil(finalInstitutions.length / 2));
        const secondRowBase = finalInstitutions.slice(Math.ceil(finalInstitutions.length / 2));
        
        // Her satır için logoları 2 kez tekrarla (sürekli kayma efekti için)
        const firstRowInstitutions = [...firstRowBase, ...firstRowBase];
        // İkinci satır için logoları ters sırada başlat (listenin tersinden)
        const secondRowReversed = [...secondRowBase].reverse();
        const secondRowInstitutions = [...secondRowReversed, ...secondRowReversed];
        
        setInstitutions({
          firstRow: firstRowInstitutions,
          secondRow: secondRowInstitutions
        });
      } catch (error) {
        console.error('Kurumlar yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    }

    loadInstitutions();
  }, []);

  if (loading) {
    return (
      <div className="py-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex space-x-6 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex-shrink-0 w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!institutions || institutions.firstRow.length === 0) {
    return null;
  }

  return (
    <section className="py-8 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Gradient overlay - soldan */}
          <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 lg:w-40 bg-gradient-to-r from-gray-50 dark:from-gray-800 to-transparent z-10 pointer-events-none" />
          
          {/* Gradient overlay - sağdan */}
          <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 lg:w-40 bg-gradient-to-l from-gray-50 dark:from-gray-800 to-transparent z-10 pointer-events-none" />
          
          {/* İlk Satır - Sağdan Sola */}
          <div className="overflow-hidden mb-4">
            <div className="flex space-x-4 sm:space-x-5 lg:space-x-6 animate-scroll-logos">
              {institutions.firstRow.map((institution, index) => (
                <div
                  key={`first-row-${index}-${institution.id}-${institution.name}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div 
                    className="bg-white dark:bg-white rounded-lg p-2 sm:p-2.5 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-300 select-none"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center relative">
                      {institution.logo && institution.logo.trim() !== '' ? (
                        <>
                          <Image
                            key={`img-first-${index}-${institution.id}`}
                            src={institution.logo}
                            alt={`${institution.name} logosu`}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain pointer-events-none relative z-0"
                            loading="lazy"
                            unoptimized={true}
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = 'w-full h-full flex items-center justify-center pointer-events-none';
                                fallback.innerHTML = '<svg class="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                          {/* Transparent overlay - ekstra koruma */}
                          <div 
                            key={`overlay-first-${index}-${institution.id}`}
                            className="absolute inset-0 cursor-not-allowed z-10"
                            onContextMenu={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            style={{ pointerEvents: 'auto' }}
                          />
                        </>
                      ) : (
                        <Building className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-400 dark:text-gray-500 pointer-events-none" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* İkinci Satır - Soldan Sağa */}
          <div className="overflow-hidden">
            <div className="flex space-x-4 sm:space-x-5 lg:space-x-6 animate-scroll-logos-reverse">
              {institutions.secondRow.map((institution, index) => (
                <div
                  key={`second-row-${index}-${institution.id}-${institution.name}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <div 
                    className="bg-white dark:bg-white rounded-lg p-2 sm:p-2.5 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-300 select-none"
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                    style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex items-center justify-center relative">
                      {institution.logo && institution.logo.trim() !== '' ? (
                        <>
                          <Image
                            key={`img-second-${index}-${institution.id}`}
                            src={institution.logo}
                            alt={`${institution.name} logosu`}
                            width={64}
                            height={64}
                            className="w-full h-full object-contain pointer-events-none relative z-0"
                            loading="lazy"
                            unoptimized={true}
                            draggable={false}
                            onContextMenu={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = 'w-full h-full flex items-center justify-center pointer-events-none';
                                fallback.innerHTML = '<svg class="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>';
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                          {/* Transparent overlay - ekstra koruma */}
                          <div 
                            key={`overlay-second-${index}-${institution.id}`}
                            className="absolute inset-0 cursor-not-allowed z-10"
                            onContextMenu={(e) => e.preventDefault()}
                            onDragStart={(e) => e.preventDefault()}
                            style={{ pointerEvents: 'auto' }}
                          />
                        </>
                      ) : (
                        <Building className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-gray-400 dark:text-gray-500 pointer-events-none" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

