import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Eye, TrendingUp, Lightbulb, Heart, Rocket } from '@/components/icon-components';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Misyon & Vizyon',
  description: 'Mevzuat GPT\'nin misyonu, vizyonu ve gelecek hedefleri hakkında bilgi edinin. Kamu mevzuatına erişimi demokratikleştirme yolculuğumuz.',
  keywords: ['misyon', 'vizyon', 'Mevzuat GPT', 'hedefler', 'amaç', 'gelecek planları'],
  openGraph: {
    title: 'Misyon & Vizyon | Mevzuat GPT',
    description: 'Mevzuat GPT\'nin misyonu, vizyonu ve gelecek hedefleri hakkında bilgi edinin.',
    type: 'website',
  },
  alternates: {
    canonical: '/misyon-vizyon',
  },
};

export default function MissionVisionPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Structured Data - AboutPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AboutPage",
              "name": "Misyon & Vizyon",
              "description": "Mevzuat GPT'nin misyonu, vizyonu ve gelecek hedefleri",
              "url": "https://mevzuatgpt.org/misyon-vizyon",
              "mainEntity": {
                "@type": "Organization",
                "name": "MevzuatGPT",
                "mission": "Kamu kurumlarının genelge, yönetmelik ve mevzuat metinlerine vatandaşların hızlı, kolay ve ücretsiz erişimini sağlamak",
                "description": "Türkiye'nin en kapsamlı mevzuat platformu"
              }
            })
          }}
        />
        
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  Misyon & Vizyon
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Kamu mevzuatına erişimi demokratikleştirme yolculuğumuz
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                      <Target className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl text-gray-900 dark:text-gray-100">Misyonumuz</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Neden varız?</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Mevzuat GPT olarak misyonumuz, kamu kurumlarının genelge, yönetmelik ve mevzuat metinlerine 
                    vatandaşların, hukukçuların, akademisyenlerin ve kamu çalışanlarının hızlı, kolay ve ücretsiz 
                    erişimini sağlamaktır.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5 text-yellow-500" />
                        <span>Erişilebilirlik</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Karmaşık bürokrasi süreçlerini basitleştirerek, herkesin anlayabileceği şekilde 
                        mevzuat bilgilerine erişim sağlamak.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        <span>Şeffaflık</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Açık, anlaşılır ve hesap verebilir kamu yönetimi anlayışına katkıda bulunmak.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <span>Güncellik</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Sürekli güncellenen, en son mevzuat metinlerini kullanıcılara sunmak.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 flex items-center space-x-2">
                        <Rocket className="h-5 w-5 text-purple-500" />
                        <span>İnovasyon</span>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        Yapay zeka ve modern teknolojilerle mevzuat arama ve analiz deneyimini geliştirmek.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 border border-purple-200 dark:border-purple-800 shadow-xl">
                <CardHeader className="pb-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                      <Eye className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <CardTitle className="text-3xl text-gray-900 dark:text-gray-100">Vizyonumuz</CardTitle>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Nereye gidiyoruz?</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    Türkiye'nin en kapsamlı, güvenilir ve kullanıcı dostu mevzuat platformu olmak. 
                    Yapay zeka destekli çözümlerle vatandaşların hukuki bilgiye erişimini demokratikleştirmek 
                    ve dijital devlet hizmetlerinde öncü rol oynamak.
                  </p>
                  
                  <div className="mt-8 space-y-6">
                    <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-lg">
                        Kısa Vadeli Hedefler (2026)
                      </h3>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Tüm kamu kurumlarının mevzuatlarını platforma entegre etmek</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Yapay zeka asistanını daha da geliştirerek kullanıcı deneyimini iyileştirmek</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Mobil uygulama geliştirmek</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Kullanıcı sayısını 100.000+ seviyesine çıkarmak</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="bg-white/50 dark:bg-gray-800/50 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-3 text-lg">
                        Uzun Vadeli Hedefler (2030+)
                      </h3>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Bölgesel ve uluslararası mevzuat veritabanlarını entegre etmek</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Çok dilli destek sunmak</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Mevzuat değişikliklerini otomatik takip ve bildirim sistemi kurmak</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Akademik ve araştırma kurumlarıyla işbirliği geliştirmek</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-purple-600 dark:text-purple-400 mt-1">•</span>
                          <span>Dijital devlet dönüşümünde referans platform olmak</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values & Principles */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Temel İlkelerimiz
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Çalışmalarımızı yönlendiren ve kararlarımızı şekillendiren değerler
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <Target className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Doğruluk</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Resmi kaynaklardan doğrulanmış, güvenilir mevzuat bilgileri sunmak. 
                        Her bilginin kaynağını şeffaf bir şekilde göstermek.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Eye className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Erişilebilirlik</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Herkesin kolayca kullanabileceği, anlaşılır ve sezgisel bir arayüz. 
                        Teknik bilgi gerektirmeden mevzuat bilgilerine erişim.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <Rocket className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Hız</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Aradığınız mevzuata saniyeler içinde ulaşın. Optimize edilmiş arama 
                        ve filtreleme sistemleri ile zaman tasarrufu.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">İnovasyon</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Yapay zeka ve modern teknolojilerle sürekli gelişen, kullanıcı ihtiyaçlarına 
                        uyum sağlayan bir platform.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center">
                        <Heart className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Kullanıcı Odaklılık</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Kullanıcı geri bildirimlerini dinlemek ve platformu sürekli iyileştirmek. 
                        Her karar kullanıcı deneyimini merkeze alır.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                        <TrendingUp className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">Sürekli Gelişim</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Dijital dünyanın hızına ayak uydurarak, platformu sürekli güncellemek 
                        ve yeni özellikler eklemek.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-3xl lg:text-4xl font-bold text-white">
                Bize Katılın
              </h2>
              <p className="text-xl text-blue-100">
                Misyonumuzu gerçekleştirmek için sizin desteğinize ihtiyacımız var. 
                Birlikte kamu mevzuatına erişimi demokratikleştirelim.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <a
                  href="/iletisim"
                  className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                >
                  İletişime Geçin
                </a>
                <a
                  href="https://uygulama.mevzuatgpt.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 transition-colors"
                >
                  Platformu Keşfedin
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

