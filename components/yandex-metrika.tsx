"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function YandexMetrika() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only load in production and after user interaction
    if (process.env.NODE_ENV !== 'production') return;
    
    let loaded = false;
    
    const loadYandex = () => {
      if (loaded) return;
      loaded = true;
      
      try {
        // Initialize Yandex Metrika
        (window as any).ym = (window as any).ym || function(...args: any[]) {
          ((window as any).ym.a = (window as any).ym.a || [])).push(args);
        };
        (window as any).ym.l = 1 * new Date();

        // Load Yandex Metrika script
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://mc.yandex.ru/metrika/tag.js?id=104259542';
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
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
          console.warn('Yandex Metrika yüklenemedi');
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
        console.warn('Yandex Metrika yükleme hatası:', error);
      }
    };
    
    // Load Yandex after user interaction or after 3 seconds
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const loadOnInteraction = () => {
      loadYandex();
      events.forEach(event => document.removeEventListener(event, loadOnInteraction));
    };
    
    events.forEach(event => document.addEventListener(event, loadOnInteraction, { passive: true }));
    
    // Fallback: load after 3 seconds
    const timeout = setTimeout(loadYandex, 3000);
    
    return () => {
      clearTimeout(timeout);
      events.forEach(event => document.removeEventListener(event, loadOnInteraction));
    };
  }, []);

  // Track page views when route changes
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    
    // Wait for Yandex to be loaded
    const trackPageView = () => {
      try {
        if (typeof (window as any).ym === 'function') {
          (window as any).ym(104259542, 'hit', pathname + searchParams.toString());
        }
      } catch (error) {
        console.warn('Yandex tracking hatası:', error);
      }
    };
    
    const timeoutId = setTimeout(trackPageView, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);
  
  return null;
}
