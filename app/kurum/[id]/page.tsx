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

  // Metadata için regulation sayısını almaya gerek yok, hızlı yükleme için
  const regulations: Regulation[] = [];

  return {
    title: `${institution.name} Mevzuatı`,
    description: `${institution.name} genelge, yönetmelik ve mevzuat metinleri. ${regulations.length} adet güncel mevzuat metni. ${institution.description}`,
    keywords: [
      institution.name,
      institution.shortName,
      'genelge',
      'yönetmelik',
      'mevzuat',
      'resmi gazete',
      'hukuki düzenlemeler',
      institution.category === 'ministry' ? 'bakanlık' : 'kurum'
    ],
    openGraph: {
      title: `${institution.name} Mevzuatı | Mevzuat GPT`,
      description: `${institution.name} genelge, yönetmelik ve mevzuat metinleri. ${regulations.length} adet güncel mevzuat metni.`,
      type: 'website',
      url: `https://mevzuatgpt.org/kurum/${params.id}`,
      siteName: 'Mevzuat GPT',
      images: [
        {
          url: institution.logo || '/mevzuat-logo-beyaz.png',
          width: 60,
          height: 60,
          alt: `${institution.name} Logo`,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${institution.name} Mevzuatı`,
      description: `${institution.name} genelge, yönetmelik ve mevzuat metinleri. ${regulations.length} adet güncel mevzuat metni.`,
      images: [institution.logo || '/mevzuat-logo-beyaz.png'],
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
    },
  };
}

export default async function InstitutionPage({ params }: Props) {
  const institution = await getInstitutionById(params.id);
  

  if (!institution) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto p-6">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
      {/* Structured Data - Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": institution.name,
            "description": institution.description,
            "url": `https://mevzuatgpt.org/kurum/${params.id}`,
            "logo": institution.logo ? {
              "@type": "ImageObject",
              "url": institution.logo,
              "width": 60,
              "height": 60
            } : undefined,
            "sameAs": [
              // Kurumun resmi web sitesi varsa buraya eklenebilir
            ],
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
              "numberOfItems": institution.documentCount
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
      
      <main className="flex-1">
        <InstitutionHeader institution={institution} regulations={[]} />
        <RegulationsList institutionId={params.id} />
      </main>
      
      <Footer />
    </div>
  );
}