"use client";
import { useEffect, useState } from 'react';
import { BrainCircuit, ArrowRight } from '@/components/icon-components';
import { Button } from '@/components/ui/button';
import { InstitutionSelector } from '@/components/institution-selector';
import { getInstitutions } from '@/lib/data';

interface Institution {
  kurum_aciklama: string;
  id: string;
  name: string;
  shortName: string;
  description: string;
  documentCount: number;
  category: 'ministry' | 'agency' | 'municipality' | 'regulatory';
  logo: string;
}

export function HeroSection() {
  const [institutions, setInstitutions] = useState<Institution[]>([]);
  const [loading, setLoading] = useState(true);
  
  const descriptionText = "Türkiye'nin en kapsamlı mevzuat veritabanında aradığınız kuruma ait tüm genelge, yönetmelik ve tebliğleri kolayca bulun.";

  useEffect(() => {
    async function loadInstitutions() {
      try {
        const data = await getInstitutions();
        setInstitutions(data);
      } catch (error) {
        console.error('Kurumlar yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    }
    
    // Intersection Observer ile lazy load
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        loadInstitutions();
        observer.disconnect();
      }
    });
    
    const heroElement = document.querySelector('.hero-section');
    if (heroElement) {
      observer.observe(heroElement);
    } else {
      // Fallback: hemen yükle
      loadInstitutions();
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <section className="hero-section relative overflow-hidden flex items-center">
      {/* 
        GRADYAN ANİMASYONU İÇİN CSS:
        Not: Bu stili global CSS dosyanıza (globals.css) taşımak daha iyi bir pratiktir.
      */}
      
      {/* Arka Plan Gradyanı ve Hareketli Elementler */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-gray-50/80 to-white/90 dark:from-gray-900/95 dark:via-gray-800/90 dark:to-black/95 opacity-90"></div>
      
      {/* Decorative elements - will-change for better performance */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100/40 dark:bg-purple-600/20 rounded-full opacity-50 blur-3xl animate-pulse" style={{ willChange: 'opacity' }}></div>
      <div className="absolute top-1/3 right-20 w-48 h-48 bg-purple-100/40 dark:bg-pink-600/20 rounded-full opacity-50 blur-3xl animate-pulse delay-1000" style={{ willChange: 'opacity' }}></div>
      <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gray-100/40 dark:bg-blue-600/20 rounded-full opacity-50 blur-3xl animate-pulse delay-500" style={{ willChange: 'opacity' }}></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 py-8 sm:py-12 lg:py-16">
          
          {/* 1. BÖLÜM: Kurum Seçici (Öncelikli Eylem) */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up relative z-20 pt-4 sm:pt-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent tracking-tighter px-4">
                Mevzuat Ara ve Keşfet
              </h1>
            </div>
          
            <div className="relative pt-2">
              <InstitutionSelector institutions={institutions} loading={loading} />
            </div>

            <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-700 dark:text-gray-300 px-4">
              {descriptionText}
            </p>
            
          </div>

          {/* Bölücü - Modern ve Sade Tasarım */}
          <div className="animate-fade-in-up delay-300 relative z-10 py-2 sm:py-4">
            <div className="relative flex items-center py-2 sm:py-4">
              <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
              <span className="flex-shrink mx-6 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                veya
              </span>
              <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
            </div>
          </div>
          
          {/* 2. BÖLÜM: Yapay Zeka Asistanı (Güçlü Alternatif) */}
          <div className="space-y-4 sm:space-y-6 animate-fade-in-up delay-500 relative z-10">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 bg-clip-text text-transparent tracking-tighter px-4">
                Yapay Zeka ile Keşfedin
              </h2>
              <p className="mt-3 sm:mt-4 max-w-2xl mx-auto text-base sm:text-lg text-gray-800 dark:text-gray-200 px-4">
                Karmaşık metinlerle uğraşmayın. Sorunuzu doğrudan asistana sorun, saniyeler içinde net cevaplar alın.
              </p>
            </div>
            
            <div className="pt-2 sm:pt-4 px-4">
              <a href="https://uygulama.mevzuatgpt.org" target="_blank" rel="noopener noreferrer">
                <Button 
                  size="lg" 
                  className="group relative text-base sm:text-lg font-semibold text-white px-6 sm:px-8 py-4 sm:py-6 rounded-full
                    bg-white hover:bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800
                    shadow-lg hover:shadow-2xl hover:shadow-pink-500/40 dark:hover:shadow-pink-400/30
                    transition-all duration-300 ease-in-out transform hover:scale-105 w-full sm:w-auto"
                  aria-label="Yapay zeka asistanını yeni sekmede aç"
                >
                  <BrainCircuit className="mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:rotate-12" />
                  Asistanı Şimdi Deneyin
                  <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-2" />
                </Button>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}