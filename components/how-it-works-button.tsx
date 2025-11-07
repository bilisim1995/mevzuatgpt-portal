"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function HowItWorksButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Cihaz tipini kontrol et
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // YouTube video URL'lerini oluştur
  // Desktop: https://www.youtube.com/watch?v=4rXdRNVtMFQ
  // Mobile: https://www.youtube.com/shorts/g_LVDCsP_XY
  // autoplay=1 ve mute=1 parametreleri ile otomatik oynatma (mute gerekli çünkü tarayıcılar sesli otomatik oynatmayı engeller)
  const desktopVideoUrl = "https://www.youtube.com/embed/4rXdRNVtMFQ?autoplay=1&mute=1";
  const mobileVideoUrl = "https://www.youtube.com/embed/g_LVDCsP_XY?autoplay=1&mute=1";

  const videoUrl = isMobile ? mobileVideoUrl : desktopVideoUrl;

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Nasıl Çalışır?
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Nasıl Çalışır?</DialogTitle>
          </DialogHeader>
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            {isOpen && (
              <iframe
                key={videoUrl}
                className="absolute top-0 left-0 w-full h-full"
                src={videoUrl}
                title="Nasıl Çalışır Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

