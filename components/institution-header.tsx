"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Institution } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Loader2, FileText, CheckCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchKurumDuyurular, KurumDuyuru } from '@/lib/api';

interface Props {
  institution: Institution;
  regulations: any[];
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

export function InstitutionHeader({ institution, regulations, loading = false }: Props) {
  const [duyurular, setDuyurular] = useState<KurumDuyuru[]>([]);
  const [duyuruLoading, setDuyuruLoading] = useState(true);

  useEffect(() => {
    const loadDuyurular = async () => {
      // Skeleton göster
      setDuyuruLoading(true);
      
      // API çağrısını arka planda yap
      try {
        const data = await fetchKurumDuyurular(institution.id);
        setDuyurular(data);
      } catch (error) {
        console.error('Kurum duyuruları yüklenemedi:', error);
        // Hata durumunda boş dizi göster
        setDuyurular([]);
      } finally {
        setDuyuruLoading(false);
      }
    };

    // Sayfa yüklendikten sonra duyuruları çek
    const timer = setTimeout(() => {
      loadDuyurular();
    }, 3000);

    return () => clearTimeout(timer);
  }, [institution.id]);

  return (
    <section className="relative overflow-hidden py-6 sm:py-8 lg:py-10">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-purple-50/40 to-pink-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-10 left-4 w-20 h-20 sm:top-20 sm:left-10 sm:w-32 sm:h-32 bg-purple-200/30 dark:bg-purple-600/10 rounded-full opacity-60 blur-3xl" style={{ willChange: 'opacity', transform: 'translateZ(0)' }}></div>
      <div className="absolute top-1/4 right-4 w-24 h-24 sm:top-1/3 sm:right-20 sm:w-48 sm:h-48 bg-pink-200/30 dark:bg-pink-600/10 rounded-full opacity-60 blur-3xl" style={{ willChange: 'opacity', transform: 'translateZ(0)' }}></div>
      <div className="absolute bottom-10 left-1/4 w-16 h-16 sm:bottom-20 sm:w-36 sm:h-36 bg-blue-200/30 dark:bg-blue-600/10 rounded-full opacity-60 blur-3xl" style={{ willChange: 'opacity', transform: 'translateZ(0)' }}></div>
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="mb-4 sm:mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 dark:text-gray-100 font-medium truncate max-w-[200px] sm:max-w-none">{institution.name}</li>
          </ol>
        </nav>

        <div className="space-y-4 sm:space-y-6 lg:space-y-8">
          {/* Institution Info */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 border border-white/20 dark:border-gray-700/20 shadow-lg flex flex-col">
            {/* Üst Bölüm - Logo, Başlık, Badge'ler */}
            <div>
              <div className="flex flex-row items-center justify-between space-x-4 sm:space-x-6">
                {/* Logo - Her zaman solda */}
            <div className="relative flex-shrink-0">
      {/* Glow efekti */}

      {/* Ana container */}
      
        {/* Logo için çember background */}
        <div className="relative p-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full shadow-inner">
          <div className="bg-white rounded-full p-0.5 shadow-sm">
            {institution.logo && institution.logo.trim() !== '' ? (
              <Image 
                src={institution.logo}
                alt={`${institution.name} logosu`}
                width={60}
                height={60}
                className="h-16 w-16 sm:h-10 sm:w-10 lg:h-14 lg:w-14 object-contain drop-shadow-sm"
                loading="eager"
                unoptimized={true}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = '<svg class="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-gray-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>';
                  }
                }}
                onLoad={() => {
                  // Başarılı yükleme durumunda herhangi bir işlem yapma
                }}
              />
            ) : (
              <Building className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 text-gray-600" />
            )}
          </div>
        </div>
      </div>

                
                {/* Content - Her zaman sağda */}
                <div className="flex-1 space-y-1 sm:space-y-3 text-left min-w-0">
                  {/* Başlık */}
                  <h1 className="text-base sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                    {institution.name}
                  </h1>
                  
                  {/* Açıklama */}
                  <p className="text-xs sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-tight">
                    {institution.name} yüklü belgeler
                  </p>
                </div>
              </div>
              
              {/* Kurum Badge - Alt kısımda */}
              <div className="mt-3 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap items-center justify-between gap-2 sm:justify-start sm:space-x-2">
           
            
                  <Badge variant="outline" className="text-xs sm:text-sm px-3 py-1 bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                    <FileText className="h-4 w-4 mr-1" />
                    Yüklü belge sayısı: {institution.documentCount} adet
                  </Badge>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs sm:text-sm px-3 py-1">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Güncel
                  </Badge>
                </div>
              </div>
            </div>
            
            {/* Kurum Duyuruları Bölümü - Kartın en altında */}
            {(duyurular.length > 0 || duyuruLoading) && (
              <div className="mt-auto">
                <hr className="mt-2 mb-0 border-gray-200 dark:border-gray-600" />
                <div className="scroll-container">
                  <div className="scroll-content">
                    {duyuruLoading ? (
                      // Skeleton Loading
                      <>
                        {[...Array(3)].map((_, index) => (
                          <div key={index} className="flex-shrink-0 mr-4">
                            <div className="flex items-center space-x-1">
                              <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                            </div>
                          </div>
                        ))}
                        {[...Array(3)].map((_, index) => (
                          <div key={`skeleton-repeat-${index}`} className="flex-shrink-0 mr-4">
                            <div className="flex items-center space-x-1">
                              <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                              <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                              <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      // Gerçek Duyurular
                      <>
                        {duyurular.map((duyuru, index) => (
                          <div key={index} className="flex-shrink-0 mr-4">
                            <a
                              href={duyuru.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                            >
                              <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                              </svg>
                              <span className="font-medium group-hover:underline">
                                {duyuru.baslik}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {duyuru.tarih}
                              </span>
                              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </div>
                        ))}
                        {/* Animasyon için tekrar eden içerik */}
                        {duyurular.map((duyuru, index) => (
                          <div key={`repeat-${index}`} className="flex-shrink-0 mr-4">
                            <a
                              href={duyuru.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                            >
                              <svg className="h-4 w-4 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                              </svg>
                              <span className="font-medium group-hover:underline">
                                {duyuru.baslik}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {duyuru.tarih}
                              </span>
                              <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}