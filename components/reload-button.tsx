"use client";

import { Button } from '@/components/ui/button';

export function ReloadButton() {
  return (
    <Button 
      onClick={() => window.location.reload()} 
      className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      aria-label="Sayfayı yeniden yükle"
    >
      Yeniden Dene
    </Button>
  );
}