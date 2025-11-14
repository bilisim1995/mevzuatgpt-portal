import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { RegulationContent } from '@/components/regulation-content';
import { getRegulationById, getInstitutionById, getInstitutions, getRegulationsByInstitutionSlug } from '@/lib/data';
import dynamicImport from 'next/dynamic';

// Büyük veriler için cache'i devre dışı bırak
export const revalidate = 0; // Cache devre dışı
export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

// Optimize component loading
const OptimizedRegulationContent = dynamicImport(() => 
  import('@/components/regulation-content').then(mod => ({ default: mod.RegulationContent })), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
  ssr: true
});

const Header = dynamicImport(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

interface Props {
  params: { id: string };
}

// Markdown'dan plain text çıkarma fonksiyonu
function stripMarkdown(text: string): string {
  if (!text) return '';
  return text
    .replace(/^#+\s+/gm, '') // Başlıkları kaldır
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold'u kaldır
    .replace(/\*(.*?)\*/g, '$1') // Italic'i kaldır
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Link metnini al
    .replace(/`([^`]+)`/g, '$1') // Inline code'u kaldır
    .replace(/```[\s\S]*?```/g, '') // Code block'ları kaldır
    .replace(/>\s+/g, '') // Blockquote'ları kaldır
    .replace(/\n{2,}/g, ' ') // Çoklu satır sonlarını tek boşluğa çevir
    .replace(/\s+/g, ' ') // Çoklu boşlukları tek boşluğa çevir
    .trim();
}

// İlk 160 karakteri al ve kelimeyi yarıda bölme
function getSeoDescription(summary: string, content?: string): string {
  // Önce content'ten dene, yoksa summary'den
  const source = content ? stripMarkdown(content) : summary;
  if (source.length <= 160) return source;
  
  // 160 karaktere kadar al, son kelimeyi yarıda bölme
  const truncated = source.substring(0, 157);
  const lastSpace = truncated.lastIndexOf(' ');
  return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    // SEO için tam metadata oluştur
    const regulation = await getRegulationById(params.id);
    
    if (!regulation) {
      return {
        title: 'Mevzuat Bulunamadı',
        description: 'Aradığınız mevzuat bulunamadı.',
      };
    }

    // SEO description: content varsa ondan, yoksa summary'den
    const seoDescription = getSeoDescription(regulation.summary, regulation.content);
    const ogDescription = regulation.content 
      ? stripMarkdown(regulation.content).substring(0, 200) + (stripMarkdown(regulation.content).length > 200 ? '...' : '')
      : regulation.summary;

    return {
      title: `${regulation.title} | ${regulation.institutionName}`,
      description: seoDescription,
      keywords: [
        regulation.institutionName,
        regulation.category,
        'mevzuat',
        'genelge',
        'yönetmelik',
        regulation.documentNumber,
        ...regulation.tags.slice(0, 5)
      ],
      openGraph: {
        title: `${regulation.title} | Mevzuat GPT`,
        description: ogDescription,
        type: 'article',
        url: `https://mevzuatgpt.org/mevzuat/${params.id}`,
        siteName: 'Mevzuat GPT',
        locale: 'tr_TR',
        publishedTime: regulation.publishDate,
        modifiedTime: regulation.publishDate,
        authors: [regulation.institutionName],
        section: regulation.category,
        tags: regulation.tags,
        images: [
          {
            url: 'https://mevzuatgpt.org/mevzuat-logo-beyaz.png',
            width: 179,
            height: 32,
            alt: 'Mevzuat GPT Logo',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: regulation.title,
        description: ogDescription,
        images: ['https://mevzuatgpt.org/mevzuat-logo-beyaz.png'],
        creator: '@mevzuatportal',
        site: '@mevzuatportal',
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      },
      alternates: {
        canonical: `https://mevzuatgpt.org/mevzuat/${params.id}`,
      },
      other: {
        'article:published_time': regulation.publishDate,
        'article:modified_time': regulation.publishDate,
        'article:author': regulation.institutionName,
        'article:section': regulation.category,
        'article:tag': regulation.tags.join(', '),
        'article:expiration_time': regulation.effectiveDate,
        'article:word_count': regulation.content ? stripMarkdown(regulation.content).split(/\s+/).length : 0,
        'article:reading_time': regulation.content ? Math.ceil(stripMarkdown(regulation.content).split(/\s+/).length / 200) : 0,
        'og:locale': 'tr_TR',
        'og:type': 'article',
        'og:site_name': 'Mevzuat GPT',
        'og:updated_time': regulation.publishDate,
        'twitter:domain': 'mevzuatgpt.org',
        'twitter:url': `https://mevzuatgpt.org/mevzuat/${params.id}`,
        'twitter:label1': 'Kurum',
        'twitter:data1': regulation.institutionName,
        'twitter:label2': 'Kategori',
        'twitter:data2': regulation.category,
        'twitter:label3': 'Yayın Tarihi',
        'twitter:data3': regulation.publishDate,
      },
    };
  } catch (error) {
    console.error(`Metadata generation failed for ${params.id}:`, error);
    return {
      title: 'Mevzuat Yüklenemedi',
      description: 'Bu mevzuat şu anda yüklenemiyor.',
      alternates: {
        canonical: `/mevzuat/${params.id}`,
      },
    };
  }
}

export default async function RegulationPage({ params }: Props) {
  try {
    // SEO için temel veriyi server-side yükle, detaylar client-side
    const regulation = await getRegulationById(params.id);
    
    if (!regulation) {
      notFound();
    }

    // DETSİS bilgisi için kurum bilgisini çek
    let institution = null;
    if (regulation.institutionId) {
      try {
        institution = await getInstitutionById(regulation.institutionId);
        if (institution) {
          // Regulation objesine kurum bilgilerini ekle
          regulation.kurum_aciklama = institution.kurum_aciklama;
          regulation.detsis = institution.detsis;
        }
      } catch (error) {
        // Kurum bilgisi alınamazsa sessizce devam et
        console.warn('Kurum bilgisi alınamadı:', error);
      }
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main 
          id="main-content" 
          role="main" 
          className="container mx-auto px-4 py-8 min-h-screen" 
          tabIndex={-1}
          aria-label={`${regulation.title} mevzuat detay sayfası`}
        >
          {/* Article Schema - Mevzuat Detayı */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": regulation.title,
                "description": regulation.summary,
                "author": {
                  "@type": "Organization",
                  "name": regulation.institutionName,
                  "url": `https://mevzuatgpt.org/kurum/${regulation.institutionId}`
                },
                "publisher": {
                  "@type": "Organization",
                  "name": "MevzuatGPT",
                  "url": "https://mevzuatgpt.org",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://mevzuatgpt.org/mevzuat-logo-beyaz.png",
                    "width": 179,
                    "height": 32
                  }
                },
                "datePublished": regulation.publishDate,
                "dateModified": regulation.publishDate,
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://mevzuatgpt.org/mevzuat/${params.id}`
                },
                "articleSection": regulation.category,
                "keywords": regulation.tags,
                "wordCount": regulation.content ? stripMarkdown(regulation.content).split(/\s+/).length : 0,
                "inLanguage": "tr-TR",
                "isAccessibleForFree": true,
                "license": "https://creativecommons.org/licenses/by/4.0/",
                "dateCreated": regulation.publishDate,
                "expires": regulation.effectiveDate,
                "readingTime": regulation.content ? Math.ceil(stripMarkdown(regulation.content).split(/\s+/).length / 200) : 0,
                "articleBody": regulation.content ? stripMarkdown(regulation.content) : regulation.summary,
                "text": regulation.content ? stripMarkdown(regulation.content) : regulation.summary,
                "mainEntity": {
                  "@type": "GovernmentService",
                  "name": regulation.title,
                  "description": regulation.summary,
                  "provider": {
                    "@type": "GovernmentOrganization",
                    "name": regulation.institutionName
                  }
                },
                "about": {
                  "@type": "Thing",
                  "name": regulation.category,
                  "description": `${regulation.category} kategorisindeki mevzuat metni`
                },
                "mentions": [
                  {
                    "@type": "Organization",
                    "name": regulation.institutionName,
                    "url": `https://mevzuatgpt.org/kurum/${regulation.institutionId}`
                  }
                ]
              })
            }}
          />
          
          {/* BreadcrumbList Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Ana Sayfa",
                    "item": "https://mevzuatgpt.org"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": regulation.institutionName,
                    "item": `https://mevzuatgpt.org/kurum/${regulation.institutionId}`
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": regulation.title,
                    "item": `https://mevzuatgpt.org/mevzuat/${params.id}`
                  }
                ]
              })
            }}
          />
          
          {/* GovernmentService Schema - Hükümet Hizmeti */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "GovernmentService",
                "name": regulation.title,
                "description": regulation.summary,
                "provider": {
                  "@type": "GovernmentOrganization",
                  "name": regulation.institutionName,
                  "url": `https://mevzuatgpt.org/kurum/${regulation.institutionId}`
                },
                "datePublished": regulation.publishDate,
                "dateModified": regulation.publishDate,
                "inLanguage": "tr-TR",
                "isAccessibleForFree": true,
                "keywords": regulation.tags.join(", "),
                "category": regulation.category,
                "url": `https://mevzuatgpt.org/mevzuat/${params.id}`,
                "serviceType": regulation.category,
                "areaServed": {
                  "@type": "Country",
                  "name": "Türkiye"
                }
              })
            }}
          />
          <RegulationContent 
            regulationId={params.id} 
            initialData={regulation}
          />
        </main>
        <Footer />
      </div>
    );
  } catch (error) {
    console.error(`Regulation page error for ${params.id}:`, error);
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main 
          id="main-content" 
          role="main" 
          className="flex-1 flex items-center justify-center" 
          tabIndex={-1}
        >
          <div className="text-center max-w-md mx-auto px-4">
            <div className="mb-4" aria-hidden="true">
              <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Mevzuat Yüklenemedi
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Bu mevzuat şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-lg transition-colors"
              aria-label="Ana sayfaya dön"
            >
              Ana Sayfaya Dön
            </a>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }
}