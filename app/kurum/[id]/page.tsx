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
      institution.category === 'ministry' ? 'bakanlık' : 'kurum'
    ],
    openGraph: {
      title: `${institution.name} Mevzuatı | Mevzuat Portal`,
      description: `${institution.name} genelge, yönetmelik ve mevzuat metinleri. ${regulations.length} adet güncel mevzuat metni.`,
      type: 'website',
    },
    alternates: {
      canonical: `/kurum/${params.id}`,
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
            "url": `https://portal.mevzuatgpt.org/kurum/${params.id}`,
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
              "url": `https://portal.mevzuatgpt.org/kurum/${params.id}`
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
      
      <Header />
      
      <main className="flex-1">
        <InstitutionHeader institution={institution} regulations={[]} />
        <RegulationsList institutionId={params.id} />
      </main>
      
      <Footer />
    </div>
  );
}
