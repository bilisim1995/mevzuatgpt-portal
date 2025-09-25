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

const ScrollToTop = dynamic(() => import('@/components/scroll-to-top').then(mod => ({ default: mod.ScrollToTop })), { 
  ssr: false, // Client component
  loading: () => null
});

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <Header />
      
      <main className="flex-1">
        <HeroSection />
        <RecentRegulations />
        
        {/* MevzuatGPT RAG Uygulaması Tanıtım Kartı */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Ana Kart */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700">
                {/* Arka Plan Dekorasyonu */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 dark:from-blue-600/10 dark:to-purple-600/10 rounded-full -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-indigo-100/30 to-pink-100/30 dark:from-indigo-600/10 dark:to-pink-600/10 rounded-full translate-y-40 -translate-x-40"></div>
                
                <div className="relative z-10 p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Sol Taraf - İçerik */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-semibold">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Yapay Zeka Destekli
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                          MevzuatGPT AI Uygulaması
                        </h2>
                        
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          Karmaşık <strong>mevzuat metinleri</strong>ni anlamak artık çok kolay! 
                          Yapay zeka destekli <strong>AI teknolojisi</strong> ile 
                          mevzuat sorularınıza anında, doğru ve güncel cevaplar alın.
                        </p>
                      </div>
                      
                      {/* Özellikler */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Anında Cevaplar</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Saniyeler içinde doğru yanıtlar</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Güncel Veriler</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">En son mevzuat bilgileri</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Akıllı Arama</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Doğal dil ile sorgulama</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Kaynak Kontrolü</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Güvenilir kaynak doğrulama</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Güvenilirlik Skoru</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Cevapların doğruluk oranı</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Cevap Puanlama</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Cevapların kalite değerlendirmesi</p>
                          </div>
                        </div>
                        
                      </div>
                      
                      {/* CTA Butonları */}
                      <div className="flex flex-col sm:flex-row gap-4 pt-4">
                        <a 
                          href="https://uygulama.mevzuatgpt.org" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                          Hemen Deneyin
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                        
                        <button className="inline-flex items-center justify-center px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300">
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Nasıl Çalışır?
                        </button>
                      </div>
                    </div>
                    
                    {/* Sağ Taraf - Görsel/İkon */}
                    <div className="flex justify-center lg:justify-end">
                      <div className="relative">
                        {/* YZ SVG Görseli */}
                        <div className="w-[28rem] h-[28rem] flex items-center justify-center">
                          <img 
                            src="/yz.svg" 
                            alt="MevzuatGPT Yapay Zeka" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Kurum Mevzuat ve Duyurular Kartı */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-green-900/20 dark:to-teal-900/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              {/* Ana Kart */}
              <div className="relative overflow-hidden rounded-3xl bg-white dark:bg-gray-800 shadow-2xl border border-gray-200 dark:border-gray-700">
                {/* Arka Plan Dekorasyonu */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-green-100/30 to-emerald-100/30 dark:from-green-600/10 dark:to-emerald-600/10 rounded-full -translate-y-48 translate-x-48"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-teal-100/30 to-cyan-100/30 dark:from-teal-600/10 dark:to-cyan-600/10 rounded-full translate-y-40 -translate-x-40"></div>
                
                <div className="relative z-10 p-8 lg:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Sol Taraf - İçerik */}
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          Kurum Odaklı
                        </div>
                        
                        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 leading-tight">
                          Kurum Mevzuat ve Duyurular
                        </h2>
                        
                        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                          Seçtiğiniz <strong>kamu kurumuna</strong> ait tüm <strong>mevzuat metinleri</strong>, 
                          <strong>genelge</strong>, <strong>yönetmelik</strong> ve <strong>duyurular</strong>ı 
                          tek platformdan takip edin. Güncel <strong>hukuki düzenlemeler</strong>i kaçırmayın.
                        </p>
                      </div>
                      
                      {/* Özellikler */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Kurum Bazlı Filtreleme</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Sadece seçili kurumun mevzuatları</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Güncel Duyurular</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">En son kurum duyuruları</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Kategorize Edilmiş</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">Genelge, yönetmelik, tebliğ</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center mt-0.5">
                            <svg className="w-3 h-3 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 text-sm">Tarih Sıralaması</h4>
                            <p className="text-xs text-gray-600 dark:text-gray-400">En yeni önce sıralama</p>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                    
                    {/* Sağ Taraf - Görsel/İkon */}
                    <div className="flex justify-center lg:justify-end">
                      <div className="relative">
                        {/* DOC SVG Görseli */}
                        <div className="w-80 h-80 flex items-center justify-center">
                          <img 
                            src="/doc.svg" 
                            alt="Kurum Mevzuat ve Duyurular" 
                            className="w-full h-full object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
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
                    Neden Mevzuat GPT?
                  </h3>
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                    Geleneksel <strong>mevzuat takibi</strong> zaman alıcı ve karmaşıktır. Mevzuat GPT, 
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
                    Mevzuat GPT nedir?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mevzuat GPT, kamu kurumlarının yayınladığı <strong>genelge</strong>, 
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
      
      <ScrollToTop />
    </div>
  );
}