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

        // Load GA script (G-1Q3R9L70W0) - Tek tag
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1Q3R9L70W0';
        script.crossOrigin = 'anonymous';
        
        script.onload = () => {
          gtag('config', 'G-1Q3R9L70W0', {
            page_title: document.title,
            page_location: window.location.href,
            anonymize_ip: true,
            cookie_flags: 'SameSite=None;Secure'
          });
        };
        
        script.onerror = () => {
          console.warn('Google Analytics (G-1Q3R9L70W0) yüklenemedi');
        };
        
        document.head.appendChild(script);
        
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
          // Track for single GA property
          (window as any).gtag('config', 'G-1Q3R9L70W0', {
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