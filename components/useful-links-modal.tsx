"use client";

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, QrCode } from 'lucide-react';
import { toast } from 'sonner';

interface UsefulLink {
  id: string;
  title: string;
  description: string;
  url: string;
}

const usefulLinks: UsefulLink[] = [
  {
    id: 'ebys',
    title: 'Elektronik Belge Yönetim Sistemi Evrak Doğrulama',
    description: 'Bu hizmeti kullanarak, ilgili kurum tarafından Elektronik Belge Yönetim Sistemi (EBYS) ile oluşturulan evrakları doğrulayabilirsiniz.',
    url: 'https://www.turkiye.gov.tr/sgk-ebys'
  },
  {
    id: 'kyk-yurt',
    title: 'Emekliler İçin KYK Yurtlarında Konaklama Ön Başvurusu',
    description: 'Bu hizmet ile, Emekliler Yılı kapsamında, emeklilerimizin, Kredi ve Yurtlar Kurumuna bağlı yurtlarda konaklaması için ön başvuruları alınmaktadır. Başvuru sonuçlandıktan sonra emeklilerimiz ile irtibata geçilerek ayrıntılı bilgilendirme yapılacaktır.',
    url: 'https://www.turkiye.gov.tr/sosyal-guvenlik-emekliler-icin-kyk-yurtlarinda-konaklama-on-basvurusu'
  }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function UsefulLinksModal({ isOpen, onClose }: Props) {
  const [selectedLink, setSelectedLink] = useState<UsefulLink | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  const handleLinkSelect = (linkId: string) => {
    const link = usefulLinks.find(l => l.id === linkId);
    setSelectedLink(link || null);
    
    if (link) {
      // QR kod oluştur
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(link.url)}`;
      setQrCodeUrl(qrUrl);
    }
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
      <DialogContent className="w-[95vw] max-w-md mx-auto p-0 sm:max-w-lg sm:w-full max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="p-4 sm:p-6 pb-4 flex-shrink-0">
          <DialogTitle className="text-base sm:text-lg font-semibold text-center">
            Yararlı Linkler
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 dark:text-gray-400 text-center">
            Kurum ile ilgili yararlı hizmetlere erişim sağlayın
          </DialogDescription>
        </DialogHeader>
        
        <div className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-4 flex-1 overflow-y-auto">
          {/* Listbox */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Hizmet Seçin
            </label>
            <Select onValueChange={handleLinkSelect}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Bir hizmet seçin..." />
              </SelectTrigger>
              <SelectContent>
                {usefulLinks.map((link) => (
                  <SelectItem key={link.id} value={link.id}>
                    <div className="flex flex-col items-start">
                      <span className="font-medium">{link.title}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Seçilen link detayları */}
          {selectedLink && (
            <div className="space-y-3 sm:space-y-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              {/* Açıklama */}
              <div>
                <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2 text-sm sm:text-base leading-tight">
                  {selectedLink.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {selectedLink.description}
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
