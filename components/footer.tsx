"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { Instagram, X } from '@/components/icon-components';

export function Footer() {
  return (
    <footer 
      role="contentinfo"
      className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center">
              <Image 
                src="/mevzuat-logo-beyaz.png" 
                alt="Mevzuat GPT Logo" 
                className="h-8 w-auto dark:hidden"
                width={179}
                height={32}
              />
              <Image 
                src="/mevzuat-logo-siyah.png" 
                alt="Mevzuat GPT Logo" 
                className="h-8 w-auto hidden dark:block"
                width={179}
                height={32}
              />
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Kamu kurumlarının güncel genelge, yönetmelik ve mevzuat metinlerine kolayca ulaşın.
            </p>
          </div>

          {/* Mobilde: Hukuki ve Kurumsal yan yana, Bilgi ve Sosyal Medya alt satırda yan yana */}
          {/* Web'de: 4 kategori yan yana */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 col-span-1 md:col-span-4">
            {/* Hukuki */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Hukuki</h4>
              <nav 
                role="navigation" 
                aria-label="Hukuki sayfalar"
                className="flex flex-col space-y-2"
              >
                <Link href="/gizlilik-politikasi" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Gizlilik Politikası
                </Link>
                <Link href="/kullanim-kosullari" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Kullanım Koşulları
                </Link>
                <Link href="/cerez-politikasi" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Çerez Politikası
                </Link>
              </nav>
            </div>

            {/* Kurumsal */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Kurumsal</h4>
              <nav 
                role="navigation" 
                aria-label="Kurumsal sayfalar"
                className="flex flex-col space-y-2"
              >
                <Link href="/ekibimiz" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Ekibimiz
                </Link>
                <Link href="/misyon-vizyon" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Misyon & Vizyon
                </Link>
                <Link href="/degerlerimiz" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Değerlerimiz
                </Link>
                <Link href="/kariyer" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Kariyer
                </Link>
                <Link href="/staj-programi" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Staj Programı
                </Link>
              </nav>
            </div>

            {/* Bilgi */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Bilgi</h4>
              <nav 
                role="navigation" 
                aria-label="Bilgi sayfaları"
                className="flex flex-col space-y-2"
              >
                <Link href="/sss" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Sıkça Sorulan Sorular
                </Link>
                <Link href="/yardim" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Yardım
                </Link>
              </nav>
            </div>

            {/* Sosyal Medya */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Sosyal Medya</h4>
              <nav 
                role="navigation" 
                aria-label="Sosyal medya bağlantıları"
                className="flex flex-col space-y-2"
              >
                <a 
                  href="https://instagram.com/mevzuatgpt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400 transition-colors"
                  aria-label="Instagram hesabımızı ziyaret edin"
                >
                  <Instagram className="h-4 w-4" />
                  <span>@mevzuatgpt</span>
                </a>
                <a 
                  href="https://x.com/mevzuatgpt" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="X hesabımızı ziyaret edin"
                >
                  <X className="h-4 w-4" />
                  <span>@mevzuatgpt</span>
                </a>
              </nav>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
              © 2025 MevzuatGPT. Tüm hakları saklıdır. <a href="https://orbitinovasyon.com" target="_blank" rel="dofollow" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors underline decoration-2 underline-offset-2">Orbit İnovasyon Ltd.</a> tarafından geliştirilmiştir.
            </p>
          </div>
          
          {/* Standartlar ve Uyumluluk Bilgisi */}
          <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
            <div className="flex flex-col items-center gap-4">
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 text-center">
                Standartlar ve Uyumluluk
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                {/* WCAG 2.1 AA */}
                <div className="flex items-center gap-2">
                  <svg 
                    className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">WCAG 2.1 AA</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Erişilebilirlik</span>
                  </div>
                </div>

                {/* PWA */}
                <div className="flex items-center gap-2">
                  <svg 
                    className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">PWA</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Progressive Web App</span>
                  </div>
                </div>

                {/* W3C Web Standards */}
                <div className="flex items-center gap-2">
                  <svg 
                    className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">W3C</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Web Standards</span>
                  </div>
                </div>

                {/* HTTPS/Security */}
                <div className="flex items-center gap-2">
                  <svg 
                    className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <div className="flex flex-col">
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">HTTPS</span>
                    <span className="text-xs text-gray-500 dark:text-gray-500">Güvenli Bağlantı</span>
                  </div>
                </div>
              </div>

              {/* Detaylı Bilgi Linki */}
              <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
                <a 
                  href="https://www.w3.org/WAI/WCAG21/quickref/?currentsidebar=%23col_customize&levels=aaa" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors underline"
                  aria-label="WCAG 2.1 AA erişilebilirlik standartları hakkında daha fazla bilgi"
                >
                  WCAG 2.1 AA Detayları
                </a>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <a 
                  href="https://www.w3.org/standards/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors underline"
                  aria-label="W3C Web standartları hakkında daha fazla bilgi"
                >
                  W3C Standartları
                </a>
                <span className="text-gray-400 dark:text-gray-600">•</span>
                <a 
                  href="https://web.dev/progressive-web-apps/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors underline"
                  aria-label="Progressive Web App hakkında daha fazla bilgi"
                >
                  PWA Hakkında
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}