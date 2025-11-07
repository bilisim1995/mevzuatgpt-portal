"use client";

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Instagram, X } from '@/components/icon-components';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <div className="flex items-center">
              <img 
                src="/mevzuat-logo-beyaz.png" 
                alt="Mevzuat GPT Logo" 
                className="h-8 w-auto dark:hidden"
                width={179}
                height={32}
                loading="lazy"
                decoding="async"
              />
              <img 
                src="/mevzuat-logo-siyah.png" 
                alt="Mevzuat GPT Logo" 
                className="h-8 w-auto hidden dark:block"
                width={179}
                height={32}
                loading="lazy"
                decoding="async"
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
              <nav className="flex flex-col space-y-2">
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
              <nav className="flex flex-col space-y-2">
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
              <nav className="flex flex-col space-y-2">
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
              <nav className="flex flex-col space-y-2">
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

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 MevzuatGPT. Tüm hakları saklıdır. <a href="https://orbitinovasyon.com" target="_blank" rel="dofollow" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">Orbit İnovasyon Ltd.</a> tarafından geliştirilmiştir.
          </p>
        </div>
      </div>
    </footer>
  );
}