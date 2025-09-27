"use client";

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Copy, ExternalLink, QrCode, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';
import { fetchKurumLinks, KurumLink } from '@/lib/api';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  kurumId: string;
}

export function UsefulLinksModal({ isOpen, onClose, kurumId }: Props) {
  const [links, setLinks] = useState<KurumLink[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedLink, setSelectedLink] = useState<KurumLink | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  // Kurum linklerini çek
  useEffect(() => {
    if (isOpen && kurumId) {
      const loadLinks = async () => {
        setLoading(true);
        try {
          const data = await fetchKurumLinks(kurumId);
          setLinks(data);
        } catch (error) {
          console.error('Linkler yüklenemedi:', error);
          toast.error('Linkler yüklenirken bir hata oluştu');
        } finally {
          setLoading(false);
        }
      };
      loadLinks();
    }
  }, [isOpen, kurumId]);

  const handleLinkSelect = (link: KurumLink) => {
    setSelectedLink(link);
    
    // QR kod oluştur
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link.url)}`;
    setQrCodeUrl(qrUrl);
  };

  const handleCopyLink = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link panoya kopyalandı!');
    } catch (error) {
      toast.error('Link kopyalanamadı');
    }
  };

  const handleOpenLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-md mx-auto p-0 sm:max-w-lg sm:w-full max-h-[90vh] overflow-hidden flex flex-col mt-8 sm:mt-12">
        <DialogHeader className="p-4 sm:p-6 pb-4 flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg font-semibold text-center">
            Yararlı Linkler
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Kurum ile ilgili yararlı hizmetlere erişim sağlayın
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 flex-1 overflow-y-auto">
          {/* Loading State */}
          {loading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Linkler yükleniyor...
              </span>
            </div>
          )}

          {/* No Links State */}
          {!loading && links.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bu kurum için henüz yararlı link bulunmuyor.
              </p>
            </div>
          )}

          {/* Arama özellikli liste */}
          {!loading && links.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Hizmet Seçin ({links.length} hizmet)
              </label>
              <Command className="rounded-lg border shadow-md">
                <CommandInput 
                  placeholder="Hizmet ara..." 
                  className="h-9"
                />
                <CommandList className="max-h-[200px]">
                  <CommandEmpty>Hizmet bulunamadı.</CommandEmpty>
                  <CommandGroup>
                    {links.map((link) => (
                      <CommandItem
                        key={link.id}
                        value={link.baslik}
                        onSelect={() => handleLinkSelect(link)}
                        className="flex items-center justify-between cursor-pointer"
                      >
                        <div className="flex flex-col items-start flex-1">
                          <span className="font-medium text-sm leading-tight">{link.baslik}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                            {link.aciklama.substring(0, 60)}...
                          </span>
                        </div>
                        {selectedLink?.id === link.id && (
                          <Check className="h-4 w-4 text-blue-600" />
                        )}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          )}

          {/* Seçilen link detayları */}
          {selectedLink && (
            <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {/* Açıklama */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base leading-tight">
                  {selectedLink.baslik}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedLink.aciklama}
                </p>
              </div>

              {/* Link ve kopyala butonu */}
              <div className="space-y-2">
                <div className="flex items-center justify-between p-2 bg-white dark:bg-gray-700 rounded border">
                  <span className="text-xs text-gray-600 dark:text-gray-400 truncate flex-1 mr-2 min-w-0">
                    {selectedLink.url}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyLink(selectedLink.url)}
                    className="flex-shrink-0 h-8 w-8 p-0"
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>

                {/* QR Kod */}
                {qrCodeUrl && (
                  <div className="text-center space-y-2">
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      Mobil erişim için QR kod:
                    </p>
                    <div className="flex justify-center">
                      <img 
                        src={qrCodeUrl} 
                        alt="QR Code" 
                        className="w-24 h-24 sm:w-32 sm:h-32 border rounded"
                      />
                    </div>
                  </div>
                )}

                {/* Git butonu */}
                <Button 
                  onClick={() => handleOpenLink(selectedLink.url)}
                  className="w-full text-xs sm:text-sm text-white"
                  size="sm"
                >
                  <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                  Hizmete Git
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
