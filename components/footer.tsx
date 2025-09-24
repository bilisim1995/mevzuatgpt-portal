"use client";

import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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

          {/* Quick Links & Legal - Desktop yan yana */}
          <div className="grid grid-cols-2 md:grid-cols-2 gap-8 col-span-1 md:col-span-2">
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">Hızlı Erişim</h4>
              <nav className="flex flex-col space-y-2">
                <Link href="/hakkinda" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  Hakkımızda
                </Link>
                <Link href="/iletisim" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  İletişim
                </Link>
                <a href="https://uygulama.mevzuatgpt.org" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
                  AI Asistan
                </a>
              </nav>
            </div>

            {/* Legal - Desktop'ta yanında */}
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
          </div>

          {/* Info - Sağ tarafta */}
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
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © 2025 MevzuatGPT. Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}