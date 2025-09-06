"use client";

import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const updateOnlineStatus = () => {
      const online = navigator.onLine;
      setIsOnline(online);
      
      if (!online) {
        setShowIndicator(true);
      } else {
        // Show "back online" message briefly
        if (!isOnline) {
          setShowIndicator(true);
          setTimeout(() => setShowIndicator(false), 3000);
        }
      }
    };

    // Set initial status
    updateOnlineStatus();

    // Listen for online/offline events
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, [isOnline]);

  if (!showIndicator) return null;

  return (
    <div className={`offline-indicator ${isOnline ? 'bg-green-500' : 'bg-red-500'}`}>
      <div className="flex items-center space-x-2">
        {isOnline ? (
          <Wifi className="h-4 w-4" />
        ) : (
          <WifiOff className="h-4 w-4" />
        )}
        <span className="text-sm font-medium">
          {isOnline ? 'Bağlantı yeniden kuruldu' : 'İnternet bağlantısı yok'}
        </span>
      </div>
    </div>
  );
}