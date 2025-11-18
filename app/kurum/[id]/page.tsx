import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { InstitutionHeader } from '@/components/institution-header';
import { RegulationsList } from '@/components/regulations-list';
import { ReloadButton } from '@/components/reload-button';
import { getInstitutionById, getRegulationsByInstitutionSlug, Regulation } from '@/lib/data';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const institution = await getInstitutionById(params.id);
  
  if (!institution) {
    return {
      title: 'Kurum Bulunamadı',
    };
  }

  // Description için documentCount ve DETSİS kullan
  const documentCount = institution.documentCount || 0;
  const detsisInfo = institution.detsis ? ` DETSİS: ${institution.detsis}.` : '';
  const description = documentCount > 0
    ? `${institution.name} genelge, yönetmelik ve mevzuat metinleri. ${documentCount} adet güncel mevzuat metni.${detsisInfo} ${institution.kurum_aciklama || institution.description || ''} Türkiye kamu kurumu mevzuat arşivi.`
    : `${institution.name} genelge, yönetmelik ve mevzuat metinleri.${detsisInfo} ${institution.kurum_aciklama || institution.description || ''} Türkiye kamu kurumu mevzuat arşivi.`;

  const seoDescription = description.length > 160 ? description.substring(0, 157) + '...' : description;
  const ogDescription = description.length > 200 ? description.substring(0, 197) + '...' : description;

  return {
    title: `${institution.name} Mevzuatı | Mevzuat GPT`,
    description: seoDescription,
    keywords: [
      institution.name,
      institution.shortName,
      institution.detsis ? `DETSİS ${institution.detsis}` : '',
      'genelge',
      'yönetmelik',
      'tebliğ',
      'mevzuat',
      'resmi gazete',
      'hukuki düzenlemeler',
      'kamu kurumu',
      'Türkiye mevzuat',
      'mevzuat arşivi',
      institution.category === 'ministry' ? 'bakanlık' : institution.category === 'agency' ? 'kurum' : institution.category === 'municipality' ? 'belediye' : 'düzenleyici kurul',
      institution.kurum_aciklama || ''
    ].filter(Boolean),
    openGraph: {
      title: `${institution.name} Mevzuatı | Mevzuat GPT`,
      description: ogDescription,
      type: 'website',
      url: `https://mevzuatgpt.org/kurum/${params.id}`,
      siteName: 'Mevzuat GPT',
      locale: 'tr_TR',
      images: [
        {
          url: institution.logo || 'https://mevzuatgpt.org/mevzuat-logo-beyaz.png',
          width: institution.logo ? 60 : 179,
          height: institution.logo ? 60 : 32,
          alt: `${institution.name} Logo`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${institution.name} Mevzuatı | Mevzuat GPT`,
      description: ogDescription,
      images: [institution.logo || 'https://mevzuatgpt.org/mevzuat-logo-beyaz.png'],
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
      canonical: `https://mevzuatgpt.org/kurum/${params.id}`,
    },
    other: {
      'article:author': institution.name,
      'article:section': institution.category,
      'article:tag': institution.name,
      'og:locale': 'tr_TR',
      'og:type': 'website',
      'og:site_name': 'Mevzuat GPT',
      'twitter:domain': 'mevzuatgpt.org',
      'twitter:url': `https://mevzuatgpt.org/kurum/${params.id}`,
      ...(institution.detsis && { 'organization:detsis': institution.detsis }),
    },
  };
}

export default async function InstitutionPage({ params }: Props) {
  const institution = await getInstitutionById(params.id);
  

  if (!institution) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main 
          id="main-content" 
          role="main" 
          className="flex-1 flex items-center justify-center" 
          tabIndex={-1}
        >
          <div className="text-center max-w-md mx-auto p-6">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center" aria-hidden="true">
                <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Kurum Bulunamadı
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Aradığınız kurum bulunamadı. Lütfen geçerli bir kurum seçin.
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


  return (
    <div className="min-h-screen flex flex-col">
      {/* Structured Data - GovernmentOrganization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "GovernmentOrganization",
            "name": institution.name,
            "alternateName": institution.shortName,
            "description": institution.kurum_aciklama || institution.description || `${institution.name} kamu kurumu`,
            "url": `https://mevzuatgpt.org/kurum/${params.id}`,
            ...(institution.detsis && { "identifier": `DETSİS:${institution.detsis}` }),
            "logo": institution.logo ? {
              "@type": "ImageObject",
              "url": institution.logo,
              "width": 60,
              "height": 60
            } : {
              "@type": "ImageObject",
              "url": "https://mevzuatgpt.org/mevzuat-logo-beyaz.png",
              "width": 179,
              "height": 32
            },
            "sameAs": [],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": `https://mevzuatgpt.org/kurum/${params.id}`
            },
            "knowsAbout": [
              "Mevzuat",
              "Genelge", 
              "Yönetmelik",
              "Hukuki Düzenlemeler",
              "Resmi Gazete"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": `${institution.name} Mevzuat Kataloğu`,
              "description": `${institution.name} tarafından yayınlanan tüm mevzuat metinleri`,
              "numberOfItems": institution.documentCount || 0
            },
            "areaServed": {
              "@type": "Country",
              "name": "Türkiye"
            }
          })
        }}
      />
      
      {/* Breadcrumb Structured Data */}
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
                "name": institution.name,
                "item": `https://mevzuatgpt.org/kurum/${params.id}`
              }
            ]
          })
        }}
      />
      
      {/* ItemList Schema - Kurum Mevzuat Listesi */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "name": `${institution.name} Mevzuat Listesi`,
            "description": `${institution.name} tarafından yayınlanan tüm mevzuat metinleri, genelgeler, yönetmelikler ve tebliğler`,
            "numberOfItems": institution.documentCount,
            "url": `https://mevzuatgpt.org/kurum/${params.id}`,
            "mainEntity": {
              "@type": "Organization",
              "name": institution.name,
              "url": `https://mevzuatgpt.org/kurum/${params.id}`
            },
            "publisher": {
              "@type": "Organization",
              "name": "MevzuatGPT",
              "url": "https://mevzuatgpt.org"
            },
            "dateModified": new Date().toISOString().split('T')[0],
            "inLanguage": "tr-TR",
            "keywords": [
              institution.name,
              institution.shortName,
              "mevzuat",
              "genelge",
              "yönetmelik", 
              "tebliğ",
              "resmi gazete",
              "hukuki düzenlemeler",
              institution.category === 'ministry' ? 'bakanlık' : 'kurum'
            ],
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Genelgeler",
                "description": `${institution.name} genelgeleri`,
                "url": `https://mevzuatgpt.org/kurum/${params.id}?kategori=genelge`
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Yönetmelikler", 
                "description": `${institution.name} yönetmelikleri`,
                "url": `https://mevzuatgpt.org/kurum/${params.id}?kategori=yonetmelik`
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Tebliğler",
                "description": `${institution.name} tebliğleri`,
                "url": `https://mevzuatgpt.org/kurum/${params.id}?kategori=teblig`
              }
            ]
          })
        }}
      />
      
      <Header />
      
      <main 
        id="main-content" 
        role="main" 
        className="flex-1" 
        tabIndex={-1}
        aria-label={`${institution.name} mevzuat sayfası`}
      >
        <InstitutionHeader institution={institution} regulations={[]} />
        <RegulationsList institutionId={params.id} />
      </main>
      
      <Footer />
    </div>
  );
}