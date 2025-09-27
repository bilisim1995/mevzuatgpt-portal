"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Institution } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Building, Loader2, FileText, CheckCircle, ExternalLink, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { fetchKurumDuyurular, KurumDuyuru } from '@/lib/api';
import { UsefulLinksModal } from '@/components/useful-links-modal';

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
  const [isUsefulLinksModalOpen, setIsUsefulLinksModalOpen] = useState(false);
  const [currentDuyuruIndex, setCurrentDuyuruIndex] = useState(0);
  const [progress, setProgress] = useState(0);

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

  // Duyuru değişim timer'ı ve progress bar
  useEffect(() => {
    if (duyurular.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentDuyuruIndex((prevIndex) => 
        (prevIndex + 1) % duyurular.length
      );
      setProgress(0); // Her değişimde progress'i sıfırla
    }, 5000); // 5 saniye

    return () => clearInterval(interval);
  }, [duyurular.length]);

  // Progress bar animasyonu
  useEffect(() => {
    if (duyurular.length <= 1) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 2; // Her 100ms'de %2 artır (5 saniyede %100)
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [duyurular.length, currentDuyuruIndex]);

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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsUsefulLinksModalOpen(true)}
                    className="text-xs sm:text-sm px-3 py-1 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-700 dark:text-white border-blue-200 dark:border-blue-700"
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Yararlı Linkler
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Kurum Duyuruları Bölümü - Kartın en altında */}
            {(duyurular.length > 0 || duyuruLoading) && (
              <div className="mt-auto">
                <hr className="mt-2 mb-0 border-gray-200 dark:border-gray-600" />
                <div className="duyuru-container">
                  {duyuruLoading ? (
                    // Skeleton Loading
                    <div className="flex items-center space-x-1">
                      <div className="h-4 w-4 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                      <div className="h-4 w-32 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                      <div className="h-3 w-16 bg-gray-300 dark:bg-gray-600 rounded animate-pulse"></div>
                    </div>
                  ) : (
                    // Gerçek Duyurular - Aşağıdan yukarı değişim
                    <div className="duyuru-content">
                      {duyurular.map((duyuru, index) => (
                        <div 
                          key={index}
                          className={`duyuru-item ${index === currentDuyuruIndex ? 'active' : ''}`}
                        >
                          <a
                            href={duyuru.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-1 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group"
                          >
                            <span className="font-medium group-hover:underline duyuru-baslik">
                              {duyuru.baslik}
                            </span>
                            <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                          
                          {/* Tarih ve progress bar - hem masaüstü hem mobil */}
                          <div className="duyuru-bottom">
                            <span className="duyuru-tarih">
                              {duyuru.tarih}
                            </span>
                            <div className="duyuru-progress">
                              <div 
                                className="duyuru-progress-bar"
                                style={{ width: `${progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Yararlı Linkler Modal */}
      <UsefulLinksModal 
        isOpen={isUsefulLinksModalOpen}
        onClose={() => setIsUsefulLinksModalOpen(false)}
        kurumId={institution.id}
      />
    </section>
  )
}