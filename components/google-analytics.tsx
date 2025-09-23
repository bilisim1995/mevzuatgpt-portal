"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only load in production and after user interaction
    if (process.env.NODE_ENV !== 'production') return;
    
    let loaded = false;
    
    const loadGA = () => {
      if (loaded) return;
      loaded = true;
      
      try {
        // Initialize dataLayer
        (window as any).dataLayer = (window as any).dataLayer || [];
        function gtag(...args: any[]) { (window as any).dataLayer.push(args); }
        (window as any).gtag = gtag;
        gtag('js', new Date());

        // Load first GA script (G-TPJDF83DSN)
        const script1 = document.createElement('script');
        script1.async = true;
        script1.src = 'https://www.googletagmanager.com/gtag/js?id=G-TPJDF83DSN';
        script1.crossOrigin = 'anonymous';
        
        script1.onload = () => {
          gtag('config', 'G-TPJDF83DSN', {
            page_title: document.title,
            page_location: window.location.href,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        };
        
        script1.onerror = () => {
          console.warn('Google Analytics (G-TPJDF83DSN) yüklenemedi');
        };
        
        document.head.appendChild(script1);

        // Load second GA script (GT-KT9NDBKN)
        const script2 = document.createElement('script');
        script2.async = true;
        script2.src = 'https://www.googletagmanager.com/gtag/js?id=GT-KT9NDBKN';
        script2.crossOrigin = 'anonymous';
        
        script2.onload = () => {
          gtag('config', 'GT-KT9NDBKN', {
            page_title: document.title,
            page_location: window.location.href,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        };
        
        script2.onerror = () => {
          console.warn('Google Analytics (GT-KT9NDBKN) yüklenemedi');
        };
        
        document.head.appendChild(script2);
        
      } catch (error) {
        console.warn('Google Analytics yükleme hatası:', error);
      }
    };
    
    // Load GA after user interaction or after 3 seconds
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    const loadOnInteraction = () => {
      loadGA();
      events.forEach(event => document.removeEventListener(event, loadOnInteraction));
    };
    
    events.forEach(event => document.addEventListener(event, loadOnInteraction, { passive: true }));
    
    // Fallback: load after 3 seconds
    const timeout = setTimeout(loadGA, 3000);
    
    return () => {
      clearTimeout(timeout);
      events.forEach(event => document.removeEventListener(event, loadOnInteraction));
    };
  }, []);

  // Track page views when route changes
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
    
    // Wait for GA to be loaded
    const trackPageView = () => {
      try {
        if (typeof (window as any).gtag === 'function') {
          // Track for both GA properties
          (window as any).gtag('config', 'G-TPJDF83DSN', {
            page_path: pathname + searchParams.toString(),
            page_title: document.title,
            page_location: window.location.href
          });
          
          (window as any).gtag('config', 'GT-KT9NDBKN', {
            page_path: pathname + searchParams.toString(),
            page_title: document.title,
            page_location: window.location.href
          });
        }
      } catch (error) {
        console.warn('GA tracking hatası:', error);
      }
    };
    
    const timeoutId = setTimeout(trackPageView, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);
  
  return null;
}