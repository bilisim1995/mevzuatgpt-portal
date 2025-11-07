"use client";

import dynamic from 'next/dynamic';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Lazy load UI components
const Card = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.Card })), { ssr: false });
const CardContent = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardContent })), { ssr: false });
const CardHeader = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardHeader })), { ssr: false });
const CardTitle = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardTitle })), { ssr: false });
const Badge = dynamic(() => import('@/components/ui/badge').then(mod => ({ default: mod.Badge })), { ssr: false });
const Button = dynamic(() => import('@/components/ui/button').then(mod => ({ default: mod.Button })), { ssr: false });
const Separator = dynamic(() => import('@/components/ui/separator').then(mod => ({ default: mod.Separator })), { ssr: false });

// Lazy load icons
const Calendar = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Calendar })), { ssr: false });
const Download = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Download })), { ssr: false });
const Building = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Building })), { ssr: false });
const FileText = dynamic(() => import('lucide-react').then(mod => ({ default: mod.FileText })), { ssr: false });
const Clock = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Clock })), { ssr: false });
const ArrowLeft = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ArrowLeft })), { ssr: false });
const Link2 = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Link2 })), { ssr: false });
const File = dynamic(() => import('lucide-react').then(mod => ({ default: mod.File })), { ssr: false });
const HardDrive = dynamic(() => import('lucide-react').then(mod => ({ default: mod.HardDrive })), { ssr: false });
const ArrowRight = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ArrowRight })), { ssr: false });
const BrainCircuit = dynamic(() => import('lucide-react').then(mod => ({ default: mod.BrainCircuit })), { ssr: false });
const ChevronDown = dynamic(() => import('lucide-react').then(mod => ({ default: mod.ChevronDown })), { ssr: false });
const Info = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Info })), { ssr: false });
// Social Media Icons from react-icons
const TwitterIcon = dynamic(() => import('react-icons/fa').then(mod => ({ default: mod.FaTwitter })), { ssr: false });
const FacebookIcon = dynamic(() => import('react-icons/fa').then(mod => ({ default: mod.FaFacebook })), { ssr: false });
const LinkedinIcon = dynamic(() => import('react-icons/fa').then(mod => ({ default: mod.FaLinkedin })), { ssr: false });
const WhatsAppIcon = dynamic(() => import('react-icons/fa').then(mod => ({ default: mod.FaWhatsapp })), { ssr: false });
const Copy = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Copy })), { ssr: false });

// Lazy load heavy components - İçerik dinamik, cache'lenmez
const ReactMarkdown = dynamic(() => import('react-markdown'), {
  ssr: false,
  loading: () => (
    <div className="max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
      <div className="animate-pulse space-y-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5"></div>
      </div>
    </div>
  )
});

// Types

interface Regulation {
  id: string;
  title: string;
  summary: string;
  content: string;
  institutionId: string;
  institutionName: string;
  institutionLogo?: string;
  publishDate: string;
  effectiveDate: string;
  category: string;
  tags: string[];
  documentNumber: string;
  pdfUrl?: string;
  status: 'active' | 'amended' | 'repealed';
  pageCount?: number;
  fileSizeMB?: number;
}

interface Props {
  regulationId: string;
  initialData?: Regulation;
}

export function RegulationContent({ regulationId, initialData }: Props) {
  const [regulation, setRegulation] = useState<Regulation | null>(initialData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [relatedRegulations, setRelatedRegulations] = useState<Regulation[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(true);
  const [isMetaOpen, setIsMetaOpen] = useState(false);

  // Ana veri yükleme
  useEffect(() => {
    async function loadRegulationData() {
      // Eğer initial data varsa, sadece eksik alanları yükle
      if (initialData) {
        setRegulation(initialData);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const { getRegulationById } = await import('@/lib/data');
        
        const regulationData = await getRegulationById(regulationId);
        if (!regulationData) {
          setError('Mevzuat bulunamadı');
          return;
        }
        
        setRegulation(regulationData);
        
      } catch (err) {
        console.error('Mevzuat yüklenirken hata:', err);
        setError('Mevzuat yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    }
    
    loadRegulationData();
  }, [regulationId, initialData]);

  useEffect(() => {
    // Simulate content loading delay
    const timer = setTimeout(() => {
      setContentLoaded(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    async function loadRelatedRegulations() {
      if (!regulation?.institutionId) return;
      
      try {
        const { getRegulationsByInstitutionSlug } = await import('@/lib/data');
        const allRegulations = await getRegulationsByInstitutionSlug(regulation.institutionId, 50);
        // Mevcut mevzuatı hariç tut ve son 3'ü al
        const filtered = allRegulations
          .filter(reg => reg.id !== regulation.id)
          .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
          .slice(0, 3);
        setRelatedRegulations(filtered);
      } catch (error) {
        console.error('İlgili mevzuatlar yüklenemedi:', error);
      } finally {
        setLoadingRelated(false);
      }
    }
    
    loadRelatedRegulations();
  }, [regulation?.institutionId, regulation?.id]);
  
  const handleShare = async () => {
    if (!regulation) return;
    try {
      await navigator.share({
        title: regulation.title,
        text: regulation.summary,
        url: window.location.href,
      });
    } catch (error) {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link panoya kopyalandı');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const handleOpenPdf = () => {
    if (!regulation) return;
    if (regulation.pdfUrl) {
      window.open(regulation.pdfUrl, '_blank');
    } else {
      console.warn('PDF dosyası bulunamadı');
    }
  };

  // Sosyal paylaşım fonksiyonları
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = regulation?.title || '';
  const shareText = regulation?.summary || '';

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`;
    window.open(url, '_blank');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      // Modern tarayıcılarda toast bildirimi için
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('Link kopyalandı!', {
          icon: '/favicon.ico',
          tag: 'copy-success'
        });
      } else {
        // Fallback olarak alert
        alert('Link kopyalandı!');
      }
    } catch (err) {
      console.error('Kopyalama hatası:', err);
      // Fallback: Eski yöntem
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      alert('Link kopyalandı!');
    }
  };

  // Skeleton bileşeni
  const SkeletonLine = ({ width = "100%" }: { width?: string }) => (
    <div className={`h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse`} style={{ width }}></div>
  );

  const SkeletonBlock = ({ lines = 3 }: { lines?: number }) => (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} width={i === lines - 1 ? "75%" : "100%"} />
      ))}
    </div>
  );

  // Hata durumu
  if (error) {
    return (
      <div className="pt-4 pb-8 bg-gray-50 dark:bg-gray-900 transition-colors font-sans">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center py-16">
            <div className="text-4xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {error}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Lütfen daha sonra tekrar deneyin veya ana sayfaya dönün.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Ana Sayfaya Dön
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-4 pb-8 bg-gray-50 dark:bg-gray-900 transition-colors font-sans gpu-accelerated">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <ol className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <li>
              <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Ana Sayfa
              </Link>
            </li>
            <li className="hidden sm:block text-gray-400">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </li>
            {loading ? (
              <>
                <li><SkeletonLine width="120px" /></li>
                <li className="hidden sm:block text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li><SkeletonLine width="200px" /></li>
              </>
            ) : regulation && (
              <>
                <li>
                  <Link href={`/kurum/${regulation.institutionId}`} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    {regulation.institutionName}
                  </Link>
                </li>
                <li className="hidden sm:block text-gray-400">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </li>
                <li className="text-gray-900 dark:text-gray-100 font-medium truncate">
                  <span className="sm:hidden">
                    {regulation.title.length > 30 
                      ? `${regulation.title.substring(0, 30)}...` 
                      : regulation.title}
                  </span>
                  <span className="hidden sm:inline">
                    {regulation.title.length > 50 
                      ? `${regulation.title.substring(0, 50)}...` 
                      : regulation.title}
                  </span>
                </li>
              </>
            )}
          </ol>
        </nav>

        {/* Back Button */}
        <div className="mb-6">
          {loading ? (
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
          ) : regulation && (
            <Link href={`/kurum/${regulation.institutionId}`} className="w-full sm:w-auto block">
              <Button variant="outline" className="w-full sm:w-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-md hover:shadow-lg">
                <ArrowLeft className="h-4 w-4 mr-2" />
                {regulation.institutionName} Sayfasına Dön
              </Button>
            </Link>
          )}
        </div>

        {/* Header Card */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg mb-8">
          <CardHeader className="pb-6">
            <div className="space-y-4">
              {/* Meta Info */}



              {/* Title */}
              {loading ? (
                <div className="space-y-2">
                  <SkeletonLine width="90%" />
                  <SkeletonLine width="70%" />
                </div>
              ) : regulation && (
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-xl lg:text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100 flex-1">
                    {regulation.title}
                  </CardTitle>
                  
                </div>
              )}

              {/* Summary */}
              {loading ? (
                <SkeletonBlock lines={2} />
              ) : regulation && (
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  {regulation.summary}
                </p>
              )}


              {/* Institution Info */}
              {loading ? (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="space-y-2 flex-1">
                    <SkeletonLine width="60%" />
                    <SkeletonLine width="80%" />
                  </div>
                </div>
              ) : regulation && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="relative">
                    {regulation.institutionLogo && regulation.institutionLogo.trim() !== '' ? (
                      <div className="w-9 h-9 bg-white rounded-lg border border-gray-200 dark:border-gray-600 p-1">
                      
                        
                        <Image
                          src={regulation.institutionLogo}
                          alt={`${regulation.institutionName} logosu`}
                          className="w-full h-full object-contain"
                          width={36}
                          height={36}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              parent.innerHTML = `
                                <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                                <div class="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg flex items-center justify-center">
                                  <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7v10c0 5.55 3.84 9.74 9 11 5.16-1.26 9-5.45 9-11V7l-10-5z"/></svg>
                                </div>
                              `;
                            }
                          }}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-75"></div>
                        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2 rounded-lg">
                          <Building className="h-5 w-5" />
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-gray-100">{regulation.institutionName}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{regulation.institutionName} mevzuat metinleri</div>
                  </div>
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0">
            {/* Meta Information */}
            {/* Desktop Meta Information */}
            <div className="hidden sm:block mb-6">
              {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="space-y-1 flex-1">
                        <SkeletonLine width="60%" />
                        <SkeletonLine width="80%" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : regulation && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Tür</div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">{regulation.category}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">{regulation.documentNumber}</div>
                    
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Durum</div>
                      <div className={`text-xs font-medium ${
                        regulation.status === 'active' 
                          ? 'text-green-600 dark:text-green-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}>
                        {regulation.status === 'active' ? 'Yürürlükte' : 'Yürürlükten Kalktı'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Yayın</div>
                      <div className="text-gray-600 dark:text-gray-400 text-xs">
                        {new Date(regulation.publishDate).toLocaleDateString('tr-TR')}
                      </div>
                    </div>
                  </div>
                  
                  {regulation.pageCount && (
                    <div className="flex items-center space-x-2">
                      <File className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Sayfa</div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">{regulation.pageCount}</div>
                      </div>
                    </div>
                  )}

                  {regulation.fileSizeMB && (
                    <div className="flex items-center space-x-2">
                      <HardDrive className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Boyut</div>
                        <div className="text-gray-600 dark:text-gray-400 text-xs">{regulation.fileSizeMB.toFixed(1)} MB</div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Collapsible Meta Information - Optimized */}
            <div className="sm:hidden mb-6">
              <Button 
                variant="outline" 
                className="w-full justify-between bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-0"
                onClick={() => setIsMetaOpen(!isMetaOpen)}
              >
                <div className="flex items-center space-x-2">
                  <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Belge Bilgileri
                  </span>
                </div>
                <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 transition-transform duration-0 ${
                  isMetaOpen ? 'rotate-180' : ''
                }`} />
              </Button>
              
              {/* Smooth Animation Container */}
              <div className={`overflow-hidden transition-all duration-0 ease-in-out ${
                isMetaOpen ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0'
              }`}>
                <div className="mt-3">
                  {loading ? (
                    <div className="p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-600">
                      {/* Belge Bilgileri Loading Skeleton */}
                      <div className="grid grid-cols-2 gap-4">
                        {/* Belge Türü Skeleton */}
                        <div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                          </div>
                        </div>
                        
                        {/* Durum Skeleton */}
                        <div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                          </div>
                        </div>
                        
                        {/* Yayın Tarihi Skeleton */}
                        <div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                          </div>
                        </div>
                        
                        {/* Belge No Skeleton */}
                        <div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                          </div>
                        </div>
                        
                        {/* Sayfa Sayısı Skeleton */}
                        <div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/4"></div>
                          </div>
                        </div>
                        
                        {/* Dosya Boyutu Skeleton */}
                        <div className="flex items-center space-x-2 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600">
                          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                          <div className="flex-1 space-y-2">
                            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/3"></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Loading Indicator */}
                      <div className="flex items-center justify-center mt-4 space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <span className="ml-3 text-xs text-gray-600 dark:text-gray-400">Belge bilgileri yükleniyor...</span>
                      </div>
                    </div>
                  ) : regulation && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-gray-200 dark:border-gray-600">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Tür</div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs">{regulation.category}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Durum</div>
                          <div className={`text-xs font-medium ${
                            regulation.status === 'active' 
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {regulation.status === 'active' ? 'Yürürlükte' : 'Yürürlükten Kalktı'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <div className="text-sm">
                          <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Yayın</div>
                          <div className="text-gray-600 dark:text-gray-400 text-xs">
                            {new Date(regulation.publishDate).toLocaleDateString('tr-TR')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <div className="text-sm">
                      <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">{regulation.documentNumber}</div>
                    </div>
                  </div>
                      
                      {regulation.pageCount && (
                        <div className="flex items-center space-x-2">
                          <File className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Sayfa</div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">{regulation.pageCount}</div>
                          </div>
                        </div>
                      )}

                      {regulation.fileSizeMB && (
                        <div className="flex items-center space-x-2">
                          <HardDrive className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                          <div className="text-sm">
                            <div className="font-medium text-gray-900 dark:text-gray-100 text-xs">Boyut</div>
                            <div className="text-gray-600 dark:text-gray-400 text-xs">{regulation.fileSizeMB.toFixed(1)} MB</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Scroll Down Animation - Mobile Only */}
            {!loading && (
              <div className="sm:hidden flex justify-center mt-4 mb-2">
                <div className="flex flex-col items-center space-y-1 opacity-60">
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Aşağı kaydır
                  </div>
                  <div className="animate-bounce">
                    <svg 
                      className="w-4 h-4 text-gray-400 dark:text-gray-500" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                      />
                    </svg>
                  </div>
                </div>
              </div>
            )}
            {/* Action Buttons */}
          </CardContent>
        </Card>

        {/* Content */}
        <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
          {/* Mobile Action Buttons - Above Title */}
          {loading ? (
            <div className="sm:hidden px-6 pt-6 pb-4">
              <div className="flex flex-col space-y-2">
                <div className="flex space-x-2">
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1"></div>
                  <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse flex-1"></div>
                </div>
              </div>
            </div>
          ) : regulation && (
            <div className="sm:hidden px-6 pt-6 pb-4">
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  onClick={handleOpenPdf} 
                  size="sm"
                  className="bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 border-blue-200 dark:border-gray-600 text-blue-700 dark:text-blue-300 flex-1"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  PDF Aç
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyLink}
                  className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 flex-1"
                  title="Link kopyala"
                >
                  <Link2 className="h-4 w-4 mr-1" />
                  Link
                </Button>
              </div>
            </div>
          )}

          <CardHeader>
            {/* Sosyal Paylaşım Butonları - Mobilde Mevzuat İçeriği yazısının üstünde */}
            {!loading && regulation && (
              <div className="flex justify-center lg:hidden mb-4">
                <div className="flex items-center gap-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={shareToTwitter}
                    className="h-12 w-12 rounded-full bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/20 dark:hover:bg-sky-900/30 border-sky-200 dark:border-sky-800 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-all duration-200 hover:scale-105"
                    title="Twitter'da paylaş"
                  >
                    <TwitterIcon className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={shareToFacebook}
                    className="h-12 w-12 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105"
                    title="Facebook'ta paylaş"
                  >
                    <FacebookIcon className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={shareToLinkedIn}
                    className="h-12 w-12 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105"
                    title="LinkedIn'de paylaş"
                  >
                    <LinkedinIcon className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={shareToWhatsApp}
                    className="h-12 w-12 rounded-full bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-all duration-200 hover:scale-105"
                    title="WhatsApp'ta paylaş"
                  >
                    <WhatsAppIcon className="h-6 w-6" />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={copyToClipboard}
                    className="h-12 w-12 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-all duration-200 hover:scale-105"
                    title="Linki kopyala"
                  >
                    <Copy className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              {loading ? (
                <SkeletonLine width="200px" />
              ) : (
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                  <FileText className="h-5 w-5" />
                  <span>Mevzuat İçeriği</span>
                  
                  {/* Dikey Ayraç */}
                  <div className="hidden lg:block w-px h-6 bg-gray-300 dark:bg-gray-600 ml-2"></div>
                  
                  {/* Sosyal Paylaşım Butonları - Masaüstünde Mevzuat İçeriği yanında */}
                  <div className="hidden lg:flex items-center gap-2 ml-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={shareToTwitter}
                      className="h-10 w-10 rounded-full bg-sky-50 hover:bg-sky-100 dark:bg-sky-900/20 dark:hover:bg-sky-900/30 border-sky-200 dark:border-sky-800 text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 transition-all duration-200 hover:scale-105"
                      title="Twitter'da paylaş"
                    >
                      <TwitterIcon className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={shareToFacebook}
                      className="h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105"
                      title="Facebook'ta paylaş"
                    >
                      <FacebookIcon className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={shareToLinkedIn}
                      className="h-10 w-10 rounded-full bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 border-blue-200 dark:border-blue-800 text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-all duration-200 hover:scale-105"
                      title="LinkedIn'de paylaş"
                    >
                      <LinkedinIcon className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={shareToWhatsApp}
                      className="h-10 w-10 rounded-full bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 border-green-200 dark:border-green-800 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-all duration-200 hover:scale-105"
                      title="WhatsApp'ta paylaş"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyToClipboard}
                      className="h-10 w-10 rounded-full bg-gray-50 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-all duration-200 hover:scale-105"
                      title="Linki kopyala"
                    >
                      <Copy className="h-5 w-5" />
                    </Button>
                  </div>
                </CardTitle>
            
              )}
              {/* Desktop Action Buttons - Next to Title */}
              {loading ? (
                <div className="hidden sm:flex items-center space-x-2">
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-8 w-28 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ) : regulation && (
                <div className="hidden sm:flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    onClick={handleOpenPdf} 
                    size="sm"
                    className="bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 border-blue-200 dark:border-gray-600 text-blue-700 dark:text-blue-300"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    PDF Aç
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200"
                    title="Link kopyala"
                  >
                    <Link2 className="h-4 w-4" />
                    <span className="ml-2">Link Kopyala</span>
                  </Button>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {loading || !contentLoaded ? (
              <div className="max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600">
                {/* Mevzuat İçerik Loading Skeleton */}
                <div className="space-y-6">
                  {/* Başlık Skeleton */}
                  <div className="space-y-3">
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                  
                  {/* Paragraf Skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
                  </div>
                  
                  {/* Alt Başlık Skeleton */}
                  <div className="space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                  </div>
                  
                  {/* Liste Skeleton */}
                  <div className="space-y-2 ml-6">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-5/6"></div>
                  </div>
                  
                  {/* Son Paragraf Skeleton */}
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                  </div>
                </div>
                
                {/* Loading Indicator */}
                <div className="flex items-center justify-center mt-8 space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">Mevzuat içeriği yükleniyor...</span>
                </div>
              </div>
            ) : regulation && (
            <div 
              className="max-h-96 overflow-y-auto prose prose-lg dark:prose-invert max-w-none bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-600" 
              key={`content-${regulation.id}-${Date.now()}`} // Cache-busting için unique key
            >
              <ReactMarkdown 
                remarkPlugins={[]}
                components={{
                  h1: ({ children }) => <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-2xl font-semibold mb-4 mt-8 text-gray-900 dark:text-gray-100">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-xl font-medium mb-3 mt-6 text-gray-900 dark:text-gray-100">{children}</h3>,
                  p: ({ children }) => <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{children}</p>,
                  ul: ({ children }) => <ul className="mb-4 ml-6 list-disc space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-4 ml-6 list-decimal space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="text-gray-700 dark:text-gray-300">{children}</li>,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900 dark:text-gray-100">{children}</strong>,
                  em: ({ children }) => <em className="italic text-gray-700 dark:text-gray-300">{children}</em>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-600 dark:text-gray-400 bg-blue-50 dark:bg-blue-900/20 py-2 rounded-r">
                      {children}
                    </blockquote>
                  ),
                  code: ({ children }) => (
                    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-900 dark:text-gray-100">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4">
                      {children}
                    </pre>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto my-4">
                      <table className="min-w-full border border-gray-200 dark:border-gray-700 rounded-lg">
                        {children}
                      </table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-gray-200 dark:border-gray-700 px-4 py-2 bg-gray-50 dark:bg-gray-800 font-semibold text-left text-gray-900 dark:text-gray-100">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-gray-200 dark:border-gray-700 px-4 py-2 text-gray-700 dark:text-gray-300">
                      {children}
                    </td>
                  ),
                }}
              >
                {regulation.content}
              </ReactMarkdown>
            </div>
            )}

            {/* AI Assistant Button */}
            {loading ? (
              <div className="mt-6 p-4 bg-gray-100 dark:bg-gray-700/50 rounded-lg">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1 space-y-2">
                    <SkeletonLine width="60%" />
                    <SkeletonLine width="80%" />
                  </div>
                  <div className="w-full sm:w-32 h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-1">
                      Okumaya vaktin yok mu?
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Bu mevzuat hakkında yapay zekaya sorularını sor
                    </p>
                  </div>
                  <a href="https://uygulama.mevzuatgpt.org" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                    <Button 
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-sm w-full sm:w-auto"
                    >
                      <BrainCircuit className="h-4 w-4 mr-2" />
                      Yapay Zekaya Sor
                    </Button>
                  </a>
                </div>
              </div>
            )}

            <Separator className="my-8" />

            {/* Tags */}
            {loading ? (
              <div className="space-y-3">
                <SkeletonLine width="100px" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            ) : regulation && (
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100">Etiketler</h3>
                <div className="flex flex-wrap gap-2">
                  {/* Mobilde ilk 10 etiket */}
                  {regulation.tags.slice(0, 10).map(tag => (
                    <Badge key={tag} variant="secondary" className="sm:hidden text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      #{tag}
                    </Badge>
                  ))}
                  {/* Web'de ilk 25 etiket */}
                  {regulation.tags.slice(0, 25).map(tag => (
                    <Badge key={tag} variant="secondary" className="hidden sm:inline-block text-xs bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Related Regulations */}
        <div className="mt-12">

          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
          <CardHeader>
            {loading ? (
              <SkeletonLine width="300px" />
            ) : regulation && (
              <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                <Building className="h-5 w-5" />
                <span>{regulation.institutionName} - Son Yayınlanan Mevzuatlar</span>
              </CardTitle>
            )}
          </CardHeader>
          <CardContent>
            {loading || loadingRelated ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <span className="ml-2 text-gray-600 dark:text-gray-400">İlgili mevzuatlar yükleniyor...</span>
              </div>
            ) : relatedRegulations.length > 0 ? (
              <div className="space-y-6">
                {relatedRegulations.map((relatedReg) => (
                  <Link key={relatedReg.id} href={`/mevzuat/${relatedReg.id}`}>
                    <Card className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer group shadow-sm hover:shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-2">
                              <Badge variant="secondary" className="text-xs">
                                {relatedReg.category}
                              </Badge>
                              <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <Calendar className="h-3 w-3 mr-1" />
                                {new Date(relatedReg.publishDate).toLocaleDateString('tr-TR')}
                              </div>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                              {relatedReg.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                              {relatedReg.summary}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-all ml-4 flex-shrink-0" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500 dark:text-gray-400 mb-2">📄</div>
                <p className="text-gray-600 dark:text-gray-400">Bu kuruma ait başka mevzuat bulunamadı.</p>
              </div>
            )}
          </CardContent>
        </Card>
        </div>
      </div>
    </div>
  );
}