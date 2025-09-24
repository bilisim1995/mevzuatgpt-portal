"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Global Yandex Metrika loading state
let yandexLoaded = false;
let yandexLoading = false;
let yandexInitialized = false;

export function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if already initialized
    if (yandexInitialized) {
      return;
    }
    
    // Check if already loaded or loading
    if (yandexLoaded) {
      return;
    }
    
    if (yandexLoading) {
      return;
    }
    
    // Mark as initialized to prevent multiple initializations
    yandexInitialized = true;
    
    const loadYandex = () => {
      if (yandexLoaded || yandexLoading) return;
      yandexLoading = true;
      
      try {
        // Initialize Yandex Metrika
        (window as any).ym = (window as any).ym || function(...args: any[]) {
          ((window as any).ym.a = (window as any).ym.a || []).push(args);
        };
        (window as any).ym.l = Date.now();

        // Load Yandex Metrika script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://mc.yandex.ru/metrika/tag.js?id=104259542';
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          yandexLoaded = true;
          yandexLoading = false;
          
          // Initialize Yandex Metrika
          (window as any).ym(104259542, 'init', {
            ssr: true,
            webvisor: true,
            clickmap: true,
            ecommerce: "dataLayer",
            accurateTrackBounce: true,
            trackLinks: true
          });
        };
        
        script.onerror = () => {
          yandexLoading = false;
        };
        
        document.head.appendChild(script);

        // Add noscript fallback
        const noscript = document.createElement('noscript');
        const div = document.createElement('div');
        const img = document.createElement('img');
        img.src = 'https://mc.yandex.ru/watch/104259542';
        img.style.position = 'absolute';
        img.style.left = '-9999px';
        img.alt = '';
        div.appendChild(img);
        noscript.appendChild(div);
        document.body.appendChild(noscript);
        
      } catch (error) {
        yandexLoading = false;
      }
    };
    
    // Wait 3 seconds before starting Yandex Metrika
    setTimeout(() => {
      loadYandex();
    }, 3000);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Track page views when route changes
  useEffect(() => {
    // Only track if Yandex is loaded
    if (!yandexLoaded) {
      return;
    }
    
    const trackPageView = () => {
      try {
        if (typeof (window as any).ym === 'function') {
          (window as any).ym(104259542, 'hit', pathname + searchParams.toString());
        }
      } catch (error) {
        // Silent error handling
      }
    };
    
    const timeoutId = setTimeout(trackPageView, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);
  
  return null;
}
