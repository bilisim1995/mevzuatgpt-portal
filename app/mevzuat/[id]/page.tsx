import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { RegulationContent } from '@/components/regulation-content';
import { getRegulationById, getInstitutionById, getInstitutions, getRegulationsByInstitutionSlug } from '@/lib/data';
import dynamic from 'next/dynamic';

// Optimize component loading
const OptimizedRegulationContent = dynamic(() => 
  import('@/components/regulation-content').then(mod => ({ default: mod.RegulationContent })), {
  loading: () => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  ),
  ssr: true
});

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
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
        title: `${regulation.title} | Mevzuat Portal`,
        description: regulation.summary,
        type: 'article',
        publishedTime: regulation.publishDate,
        authors: [regulation.institutionName],
        section: regulation.category,
        tags: regulation.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: regulation.title,
        description: regulation.summary,
      },
      alternates: {
        canonical: `/mevzuat/${params.id}`,
      },
      other: {
        'article:published_time': regulation.publishDate,
        'article:modified_time': regulation.publishDate,
        'article:author': regulation.institutionName,
        'article:section': regulation.category,
        'article:tag': regulation.tags.join(', '),
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

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-8 min-h-screen">
          {/* SEO için structured data */}
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
                  "name": regulation.institutionName
                },
                "datePublished": regulation.publishDate,
                "dateModified": regulation.publishDate,
                "inLanguage": "tr-TR",
                "isAccessibleForFree": true,
                "keywords": regulation.tags.join(", "),
                "category": regulation.category,
                "url": `https://mevzuatgpt.org/mevzuat/${params.id}`
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