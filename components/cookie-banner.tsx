"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { X, Cookie, Shield, ExternalLink } from 'lucide-react';

export function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [activeElementBeforeBanner, setActiveElementBeforeBanner] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // LocalStorage'dan cookie tercihini kontrol et
    const cookieConsent = localStorage.getItem('cookie-consent');
    
    if (!cookieConsent) {
      // 1.5 saniye sonra banner'ı göster
      setTimeout(() => {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 150);
      }, 1500);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    closeBanner();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'declined');
    localStorage.setItem('cookie-consent-date', new Date().toISOString());
    closeBanner();
  };

  const closeBanner = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowBanner(false);
      // Focus'u geri döndür (eğer kaydedilmişse)
      if (activeElementBeforeBanner && document.contains(activeElementBeforeBanner)) {
        activeElementBeforeBanner.focus();
      }
    }, 400);
  };

  // Klavye navigasyonu - Esc tuşu ile kapatma ve focus trap
  useEffect(() => {
    if (!showBanner) return;

    // Banner açıldığında aktif element'i kaydet (focus return için)
    const currentActiveElement = document.activeElement as HTMLElement;
    setActiveElementBeforeBanner(currentActiveElement);

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeBanner();
      }
    };

    // Focus trap - Tab tuşu ile banner içinde kal
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const banner = document.querySelector('[role="dialog"]') || 
                    document.querySelector('.cookie-banner') ||
                    document.querySelector('[aria-label*="Çerez"]')?.closest('div');
      
      if (!banner) return;

      const focusableElements = banner.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('keydown', handleTab);
    
    // Banner açıldığında ilk butona focus ver
    setTimeout(() => {
      const firstButton = document.querySelector('[role="dialog"] button, .cookie-banner button') as HTMLElement;
      firstButton?.focus();
    }, 200);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('keydown', handleTab);
    };
  }, [showBanner]);

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop - sadece desktop'ta görünür */}
      <div 
        className={`fixed inset-0 bg-black/10 backdrop-blur-[2px] z-40 transition-all duration-400 ease-out hidden sm:block ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeBanner}
      />
      
      {/* Cookie Banner */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-banner-title"
        className={`fixed bottom-0 left-0 right-0 sm:bottom-4 sm:left-4 sm:right-4 lg:left-auto lg:right-4 lg:max-w-md z-50 transform transition-all duration-400 ease-out ${
          isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full sm:translate-y-8 opacity-0 scale-95'
        }`}
      >
        <div className="bg-white dark:bg-gray-900 sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden backdrop-blur-xl bg-opacity-95 dark:bg-opacity-95">
          
          {/* Header bar with gradient */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="p-4 sm:p-6">
            
            {/* Close button - sadece mobilde görünür */}
            <button
              onClick={closeBanner}
              className="absolute top-3 right-3 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors sm:hidden"
              aria-label="Kapat"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>

            <div className="flex flex-col space-y-4">
              
              {/* Header */}
              <div className="flex items-center space-x-3 pr-8 sm:pr-0">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Cookie className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 id="cookie-banner-title" className="text-lg font-bold text-gray-900 dark:text-gray-100 leading-tight">
                    🍪 Çerez Tercihleri
                  </h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <Shield className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                      Güvenli & Şeffaf
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Size en iyi deneyimi sunabilmek için çerezler kullanıyoruz. 
                  Bu çerezler sayesinde tercihlerinizi hatırlayabilir ve performansımızı artırabiliriz.
                </p>
                
                <Link 
                  href="/cerez-politikasi" 
                  className="inline-flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors group"
                >
                  <span>Detaylı çerez politikası</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  onClick={handleAccept}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 font-semibold py-2.5 rounded-xl"
                  aria-label="Tüm çerezleri kabul et"
                >
                  <Cookie className="w-4 h-4 mr-2" aria-hidden="true" />
                  Tümünü Kabul Et
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleDecline}
                  className="flex-1 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-400 dark:hover:border-gray-500 font-semibold py-2.5 rounded-xl transition-all duration-200"
                  aria-label="Çerezleri reddet"
                >
                  Reddet
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex items-center justify-center space-x-4 pt-2 border-t border-gray-100 dark:border-gray-700">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">GDPR Uyumlu</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Güvenli</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">Şeffaf</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyboard accessibility */}
      <style jsx>{`
        @media (max-width: 640px) {
          .cookie-banner {
            animation: slideUpMobile 0.4s ease-out;
          }
        }
        
        @keyframes slideUpMobile {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}