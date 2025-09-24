"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Global GA loading state
let gaLoaded = false;
let gaLoading = false;
let gaInitialized = false;

export function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if already initialized
    if (gaInitialized) {
      return;
    }
    
    // Check if already loaded or loading
    if (gaLoaded) {
      return;
    }
    
    if (gaLoading) {
      return;
    }
    
    // Mark as initialized to prevent multiple initializations
    gaInitialized = true;
    
    const loadGA = () => {
      if (gaLoaded || gaLoading) return;
      gaLoading = true;
      
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
          gaLoaded = true;
          gaLoading = false;
          
          // Wait a bit for gtag to be available
          setTimeout(() => {
            gtag('config', 'G-1Q3R9L70W0', {
              page_title: document.title,
              page_location: window.location.href,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          }, 100);
        };
        
        script.onerror = () => {
          gaLoading = false;
        };
        
        document.head.appendChild(script);
        
      } catch (error) {
        gaLoading = false;
      }
    };
    
    // Wait 3 seconds before starting GA (regardless of page load state)
    setTimeout(() => {
      loadGA();
    }, 3000);
    
    return () => {
      // Cleanup if needed
    };
  }, []);

  // Track page views when route changes
  useEffect(() => {
    // Only track if GA is loaded
    if (!gaLoaded) {
      return;
    }
    
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
        // Silent error handling
      }
    };
    
    const timeoutId = setTimeout(trackPageView, 100);
    return () => clearTimeout(timeoutId);
  }, [pathname, searchParams]);
  
  return null;
}