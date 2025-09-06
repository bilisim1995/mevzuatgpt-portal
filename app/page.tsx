import dynamic from 'next/dynamic';

// Lazy load components
const Footer = dynamic(() => import('@/components/footer').then(mod => ({ default: mod.Footer })), { ssr: false });
const HeroSection = dynamic(() => import('@/components/hero-section').then(mod => ({ default: mod.HeroSection })), { ssr: false });
const RecentRegulations = dynamic(() => import('@/components/recent-regulations').then(mod => ({ default: mod.RecentRegulations })), { ssr: false });
const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <RecentRegulations />
        
        {/* Tanıtım Bölümü */}
        <section className="py-16 lg:py-24 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Mevzuat Takibini Kolaylaştırıyoruz
                </h2>
                <p className="text-xl text-gray-800 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                  Kamu kurumlarının yayınladığı binlerce genelge, yönetmelik ve mevzuat metnine 
                  tek platformdan ulaşın. Yapay zeka destekli arama ile aradığınızı hızla bulun.
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
                    Kapsamlı Arşiv
                  </h3>
                  <p className="text-gray-800 dark:text-gray-300">
                    Tüm kamu kurumlarının güncel mevzuat metinleri tek platformda toplanmış durumda.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Akıllı Arama
                  </h3>
                  <p className="text-gray-800 dark:text-gray-300">
                    Gelişmiş filtreleme ve arama özellikleri ile aradığınız mevzuatı saniyeler içinde bulun.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="w-16 h-16 mx-auto bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Yapay Zeka Desteği
                  </h3>
                  <p className="text-gray-800 dark:text-gray-300">
                    Karmaşık mevzuat metinlerini anlama konusunda yapay zeka asistanımızdan yardım alın.
                  </p>
                </div>
              </div>
              
              <div className="pt-8">
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                    Neden Mevzuat Portal?
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                    Geleneksel mevzuat takibi zaman alıcı ve karmaşıktır. Mevzuat Portal, 
                    bu süreci basitleştirerek size zaman kazandırır. Güncel bilgilere hızla 
                    ulaşın, yapay zeka ile karmaşık metinleri anlayın ve işinizi daha verimli yapın.
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