import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Users, Zap, Globe, Target, Eye, Lightbulb, Heart, Rocket, TrendingUp } from '@/components/icon-components';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Değerlerimiz',
  description: 'Mevzuat GPT\'nin temel değerleri ve ilkeleri. Güvenilirlik, erişilebilirlik, hız ve şeffaflık değerlerimiz hakkında bilgi edinin.',
  keywords: ['değerler', 'ilkeler', 'Mevzuat GPT', 'güvenilirlik', 'erişilebilirlik', 'şeffaflık', 'hız'],
  openGraph: {
    title: 'Değerlerimiz | Mevzuat GPT',
    description: 'Mevzuat GPT\'nin temel değerleri ve ilkeleri hakkında bilgi edinin.',
    type: 'website',
  },
  alternates: {
    canonical: '/degerlerimiz',
  },
};

const values = [
  {
    icon: Shield,
    title: 'Güvenilirlik',
    description: 'Resmi kaynaklardan doğrulanmış, güncel mevzuat bilgileri',
    color: 'green',
    details: [
      'Tüm mevzuat metinleri resmi kaynaklardan alınır',
      'Düzenli olarak güncellenen içerik',
      'Kaynak doğrulama ve şeffaflık',
      'Kullanıcı güvenini ön planda tutma'
    ]
  },
  {
    icon: Users,
    title: 'Erişilebilirlik',
    description: 'Herkesin kolayca kullanabileceği sade ve anlaşılır arayüz',
    color: 'blue',
    details: [
      'Kullanıcı dostu ve sezgisel tasarım',
      'Teknik bilgi gerektirmeden kullanım',
      'Mobil uyumlu ve responsive arayüz',
      'Erişilebilirlik standartlarına uyum'
    ]
  },
  {
    icon: Zap,
    title: 'Hız',
    description: 'Aradığınız mevzuata saniyeler içinde ulaşın',
    color: 'orange',
    details: [
      'Optimize edilmiş arama algoritmaları',
      'Hızlı sayfa yükleme süreleri',
      'Anında sonuç gösterimi',
      'Performans odaklı geliştirme'
    ]
  },
  {
    icon: Globe,
    title: 'Şeffaflık',
    description: 'Açık, anlaşılır ve hesap verebilir kamu yönetimi',
    color: 'purple',
    details: [
      'Tüm bilgilerin açık ve erişilebilir olması',
      'Kaynak gösterimi ve doğrulama',
      'Kullanıcı geri bildirimlerine açıklık',
      'Hesap verebilirlik ilkesi'
    ]
  },
  {
    icon: Target,
    title: 'Doğruluk',
    description: 'Her bilginin kaynağını şeffaf bir şekilde göstermek',
    color: 'green',
    details: [
      'Resmi kaynaklardan doğrulanmış bilgiler',
      'Güncel mevzuat takibi',
      'Hata düzeltme mekanizmaları',
      'Kalite kontrol süreçleri'
    ]
  },
  {
    icon: Lightbulb,
    title: 'İnovasyon',
    description: 'Yapay zeka ve modern teknolojilerle sürekli gelişen platform',
    color: 'yellow',
    details: [
      'Yapay zeka destekli arama ve analiz',
      'Modern teknoloji kullanımı',
      'Sürekli özellik geliştirme',
      'Kullanıcı ihtiyaçlarına uyum'
    ]
  },
  {
    icon: Heart,
    title: 'Kullanıcı Odaklılık',
    description: 'Kullanıcı geri bildirimlerini dinlemek ve platformu sürekli iyileştirmek',
    color: 'pink',
    details: [
      'Kullanıcı deneyimini merkeze alma',
      'Geri bildirim mekanizmaları',
      'Hızlı sorun çözme',
      'Kullanıcı memnuniyeti odaklı geliştirme'
    ]
  },
  {
    icon: Rocket,
    title: 'Sürekli Gelişim',
    description: 'Dijital dünyanın hızına ayak uydurarak platformu sürekli güncellemek',
    color: 'purple',
    details: [
      'Düzenli özellik güncellemeleri',
      'Teknoloji trendlerini takip',
      'Performans iyileştirmeleri',
      'Yeni özellikler ekleme'
    ]
  },
  {
    icon: TrendingUp,
    title: 'Güncellik',
    description: 'Sürekli güncellenen, en son mevzuat metinlerini kullanıcılara sunmak',
    color: 'blue',
    details: [
      'Otomatik güncelleme sistemleri',
      'Yeni mevzuat takibi',
      'Değişiklik bildirimleri',
      'Güncel içerik garantisi'
    ]
  }
];

const colorClasses = {
  green: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-600 dark:text-green-400'
  },
  blue: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-600 dark:text-blue-400'
  },
  orange: {
    bg: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-600 dark:text-orange-400'
  },
  purple: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-600 dark:text-purple-400'
  },
  yellow: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-600 dark:text-yellow-400'
  },
  pink: {
    bg: 'bg-pink-100 dark:bg-pink-900/30',
    text: 'text-pink-600 dark:text-pink-400'
  }
};

export default function ValuesPage() {
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
              "name": "Değerlerimiz",
              "description": "Mevzuat GPT'nin temel değerleri ve ilkeleri",
              "url": "https://mevzuatgpt.org/degerlerimiz",
              "mainEntity": {
                "@type": "Organization",
                "name": "MevzuatGPT",
                "description": "Güvenilirlik, erişilebilirlik, hız ve şeffaflık değerleriyle kamu mevzuatına erişimi demokratikleştiren platform"
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
                  Değerlerimiz
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Çalışmalarımızı yönlendiren ve kararlarımızı şekillendiren temel ilkeler
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Temel Değerlerimiz
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Platformumuzun temelini oluşturan ve her kararımızda rehberlik eden değerler
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {values.map((value, index) => {
                  const Icon = value.icon;
                  const colors = colorClasses[value.color as keyof typeof colorClasses];
                  
                  return (
                    <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-4">
                          <div className={`w-12 h-12 ${colors.bg} rounded-lg flex items-center justify-center`}>
                            <Icon className={`h-6 w-6 ${colors.text}`} />
                          </div>
                          <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                            {value.title}
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {value.description}
                        </p>
                        <ul className="space-y-2">
                          {value.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                              <span className={`${colors.text} mt-1`}>•</span>
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Values in Practice */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                  Değerlerimizi Nasıl Uyguluyoruz?
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Değerlerimiz sadece sözde kalmaz, her gün uygulamaya geçiririz
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-gray-700 dark:to-gray-600 border border-green-200 dark:border-green-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                          Güvenilirlik Uygulaması
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Tüm mevzuat metinlerini resmi kaynaklardan alıyor, düzenli olarak doğruluyor 
                          ve güncelliyoruz. Her bilginin kaynağını açıkça gösteriyor, kullanıcıların 
                          güvenini kazanmak için şeffaflık ilkesini benimsiyoruz.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 border border-blue-200 dark:border-blue-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                          Erişilebilirlik Uygulaması
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Platformumuzu herkesin kullanabileceği şekilde tasarladık. Teknik bilgi 
                          gerektirmeden, sade ve anlaşılır bir arayüzle mevzuat bilgilerine erişim 
                          sağlıyoruz. Mobil uyumlu ve responsive tasarım ile her cihazdan erişilebilir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-gray-700 dark:to-gray-600 border border-orange-200 dark:border-orange-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                          Hız Uygulaması
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Optimize edilmiş arama algoritmaları ve performans odaklı geliştirme ile 
                          kullanıcıların aradığı mevzuata saniyeler içinde ulaşmasını sağlıyoruz. 
                          Hızlı sayfa yükleme süreleri ve anında sonuç gösterimi ile zaman tasarrufu.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 border border-purple-200 dark:border-purple-800">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-lg">
                          Şeffaflık Uygulaması
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm">
                          Tüm bilgileri açık ve erişilebilir tutuyor, kaynak gösterimi yapıyoruz. 
                          Kullanıcı geri bildirimlerine açığız ve hesap verebilirlik ilkesini 
                          benimsiyoruz. Platform geliştirme süreçlerimizi şeffaf bir şekilde paylaşıyoruz.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Commitment Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0 shadow-xl">
                <CardContent className="p-8 lg:p-12">
                  <div className="text-center space-y-6">
                    <h2 className="text-3xl lg:text-4xl font-bold">
                      Değerlerimize Bağlılığımız
                    </h2>
                    <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                      Bu değerler sadece bir liste değil, platformumuzun DNA'sıdır. 
                      Her kararımızda, her geliştirmemizde bu değerleri rehber alıyoruz. 
                      Kullanıcılarımıza en iyi hizmeti sunmak için sürekli çalışıyoruz.
                    </p>
                    <div className="pt-4">
                      <a
                        href="/iletisim"
                        className="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors"
                      >
                        Değerlerimiz Hakkında Daha Fazla Bilgi
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

