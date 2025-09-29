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

    return {
      title: `${regulation.title} | ${regulation.institutionName}`,
      description: regulation.summary.length > 160 
        ? regulation.summary.substring(0, 157) + '...' 
        : regulation.summary,
      keywords: [
        regulation.institutionName,
        regulation.category,
        'mevzuat',
        'genelge',
        'yönetmelik',
        ...regulation.tags.slice(0, 5)
      ],
      openGraph: {
        title: `${regulation.title} | Mevzuat GPT`,
        description: regulation.summary,
        type: 'article',
        url: `https://mevzuatgpt.org/mevzuat/${params.id}`,
        siteName: 'Mevzuat GPT',
        publishedTime: regulation.publishDate,
        modifiedTime: regulation.publishDate,
        authors: [regulation.institutionName],
        section: regulation.category,
        tags: regulation.tags,
        images: [
          {
            url: '/mevzuat-logo-beyaz.png',
            width: 179,
            height: 32,
            alt: 'Mevzuat GPT Logo',
          }
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: regulation.title,
        description: regulation.summary,
        images: ['/mevzuat-logo-beyaz.png'],
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
        'article:word_count': regulation.content ? regulation.content.length : 0,
        'article:reading_time': regulation.content ? Math.ceil(regulation.content.length / 1000) : 0,
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

    // IndexNow bildirimi (background'da çalışır)
    if (process.env.NODE_ENV === 'production') {
      try {
        const { notifyNewRegulation } = await import('@/lib/indexnow');
        // Background'da IndexNow bildirimi gönder (await etme)
        notifyNewRegulation(params.id).catch(error => {
          console.warn('IndexNow bildirimi başarısız:', error);
        });
      } catch (error) {
        console.warn('IndexNow import hatası:', error);
      }
    }

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8 min-h-screen">
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
                "wordCount": regulation.content ? regulation.content.length : 0,
                "inLanguage": "tr-TR",
                "isAccessibleForFree": true,
                "license": "https://creativecommons.org/licenses/by/4.0/",
                "dateCreated": regulation.publishDate,
                "dateModified": regulation.publishDate,
                "expires": regulation.effectiveDate,
                "readingTime": regulation.content ? Math.ceil(regulation.content.length / 1000) : 0,
                "articleBody": regulation.content || regulation.summary,
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
                ],
                "breadcrumb": {
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
                }
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
        
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Mevzuat Yüklenemedi
            </h1>
            <p className="text-gray-600 mb-6">
              Bu mevzuat şu anda yüklenemiyor. Lütfen daha sonra tekrar deneyin.
            </p>
            <a 
              href="/" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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