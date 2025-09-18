import dynamic from 'next/dynamic';

// Optimized lazy loading - Critical components with SSR, non-critical without
const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: true, // Header is critical for SEO
  loading: () => <div className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800" />
});

const HeroSection = dynamic(() => import('@/components/hero-section').then(mod => ({ default: mod.HeroSection })), { 
  ssr: true, // Hero section is critical for SEO
  loading: () => <div className="min-h-[60vh] bg-gradient-to-br from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black" />
});

const RecentRegulations = dynamic(() => import('@/components/recent-regulations').then(mod => ({ default: mod.RecentRegulations })), { 
  ssr: false, // This can be lazy loaded
  loading: () => <div className="py-16 lg:py-24 bg-white dark:bg-gray-800"><div className="container mx-auto px-4"><div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-64 rounded-lg"></div></div></div>
});

const Footer = dynamic(() => import('@/components/footer').then(mod => ({ default: mod.Footer })), { 
  ssr: false, // Footer can be lazy loaded
  loading: () => <div className="bg-gray-900 text-white py-8"><div className="container mx-auto px-4"><div className="animate-pulse bg-gray-700 h-32 rounded"></div></div></div>
});

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <RecentRegulations />
        
        {/* Tanıtım Bölümü - SEO Optimized */}
        <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Türkiye'nin En Kapsamlı Mevzuat Veritabanı
                </h2>
                <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Kamu kurumlarının yayınladığı binlerce <strong>genelge</strong>, <strong>yönetmelik</strong>, 
                  <strong>tebliğ</strong> ve <strong>mevzuat metni</strong>ne tek platformdan ulaşın. 
                  Yapay zeka destekli <strong>mevzuat arama</strong> ile aradığınızı hızla bulun.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Kapsamlı Mevzuat Arşivi
                  </h3>
                  <p className="text-gray-800 dark:text-gray-300">
                    Tüm kamu kurumlarının güncel <strong>mevzuat metinleri</strong>, <strong>resmi gazete</strong> 
                    yayınları ve <strong>hukuki düzenlemeler</strong> tek platformda toplanmış durumda.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Gelişmiş Mevzuat Arama
                  </h3>
                  <p className="text-gray-800 dark:text-gray-300">
                    Gelişmiş filtreleme ve <strong>mevzuat arama</strong> özellikleri ile aradığınız 
                    <strong>genelge</strong>, <strong>yönetmelik</strong> ve <strong>tebliğ</strong>leri saniyeler içinde bulun.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Yapay Zeka ile Mevzuat Analizi
                  </h3>
                  <p className="text-gray-800 dark:text-gray-300">
                    Karmaşık <strong>mevzuat metinleri</strong>ni anlama konusunda yapay zeka asistanımızdan 
                    yardım alın. <strong>Hukuki düzenlemeler</strong>i kolayca anlayın.
                  </p>
                </div>
              </div>
              
              <div className="pt-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Neden Mevzuat Portal?
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                    Geleneksel <strong>mevzuat takibi</strong> zaman alıcı ve karmaşıktır. Mevzuat Portal, 
                    bu süreci basitleştirerek size zaman kazandırır. Güncel <strong>genelge</strong>, 
                    <strong>yönetmelik</strong> ve <strong>mevzuat bilgileri</strong>ne hızla ulaşın, 
                    yapay zeka ile karmaşık <strong>hukuki metinleri</strong> anlayın ve işinizi daha verimli yapın.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Bölümü - SEO için */}
        <section className="py-16 lg:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 text-center mb-12">
                Sıkça Sorulan Sorular
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Mevzuat Portal nedir?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mevzuat Portal, kamu kurumlarının yayınladığı <strong>genelge</strong>, 
                    <strong>yönetmelik</strong>, <strong>tebliğ</strong> ve diğer <strong>mevzuat metinleri</strong>ni 
                    tek platformda toplayan Türkiye'nin en kapsamlı <strong>mevzuat veritabanı</strong>dır.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Hangi kurumların mevzuatları bulunuyor?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Bakanlıklar, bağımsız idari otoriteler, belediyeler ve diğer kamu kurumlarının 
                    <strong>resmi gazete</strong>de yayınlanan tüm <strong>hukuki düzenlemeleri</strong> 
                    bulunmaktadır.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3">
                    Mevzuat arama nasıl yapılır?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Gelişmiş <strong>mevzuat arama</strong> özellikleri ile kurum, tarih, konu ve 
                    anahtar kelime bazında filtreleme yapabilir, yapay zeka destekli arama ile 
                    <strong>hukuki metinleri</strong> kolayca bulabilirsiniz.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}