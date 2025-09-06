import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Target, Eye, Users, Shield, Zap, Globe } from 'lucide-react';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description: 'Mevzuat Portal hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimizi keşfedin.',
  keywords: ['hakkımızda', 'misyon', 'vizyon', 'mevzuat portal', 'kamu mevzuatı'],
  openGraph: {
    title: 'Hakkımızda | Mevzuat Portal',
    description: 'Mevzuat Portal hakkında bilgi edinin. Misyonumuz, vizyonumuz ve değerlerimizi keşfedin.',
    type: 'website',
  },
  alternates: {
    canonical: '/hakkinda',
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  Hakkımızda
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Kamu mevzuatına erişimi kolaylaştıran, modern ve kullanıcı dostu platform
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Mission */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Target className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Misyonumuz</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Kamu kurumlarının genelge, yönetmelik ve mevzuat metinlerine vatandaşların hızlı, 
                    kolay ve ücretsiz erişimini sağlamak. Karmaşık bürokrasi süreçlerini basitleştirerek, 
                    şeffaf ve erişilebilir bir kamu yönetimi anlayışına katkıda bulunmak.
                  </p>
                </CardContent>
              </Card>

              {/* Vision */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                      <Eye className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-2xl text-gray-900 dark:text-gray-100">Vizyonumuz</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Türkiye'nin en kapsamlı ve güvenilir mevzuat platformu olmak. Yapay zeka 
                    destekli çözümlerle vatandaşların hukuki bilgiye erişimini demokratikleştirmek 
                    ve dijital devlet hizmetlerinde öncü rol oynamak.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">Değerlerimiz</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Çalışmalarımızı yönlendiren temel ilkeler
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-center">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Güvenilirlik</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Resmi kaynaklardan doğrulanmış, güncel mevzuat bilgileri
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-center">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Erişilebilirlik</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Herkesin kolayca kullanabileceği sade ve anlaşılır arayüz
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-center">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                        <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Hız</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Aradığınız mevzuata saniyeler içinde ulaşın
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-center">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                        <Globe className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Şeffaflık</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Açık, anlaşılır ve hesap verebilir kamu yönetimi
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* About Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <CardContent className="p-8 lg:p-12">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                      Mevzuat Portal Nedir?
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      Mevzuat Portal, Türkiye'deki kamu kurumlarının yayınladığı genelge, yönetmelik, 
                      tebliğ ve diğer mevzuat metinlerine tek noktadan erişim sağlayan modern bir platformdur. 
                      Vatandaşların, akademisyenlerin, hukukçuların ve kamu çalışanlarının güncel mevzuat 
                      bilgilerine hızlı ve kolay erişimini hedefler.
                    </p>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Neden Mevzuat Portal?
                    </h3>
                    
                    <ul className="space-y-3 text-gray-600 dark:text-gray-300 mb-6">
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Tek Merkez:</strong> Tüm kamu kurumlarının mevzuatları tek platformda</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Güncel İçerik:</strong> Sürekli güncellenen, en son mevzuat metinleri</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Akıllı Arama:</strong> Gelişmiş arama ve filtreleme özellikleri</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span><strong>Yapay Zeka Desteği:</strong> Karmaşık metinleri anlama konusunda yardım</span>
                      </li>
                    </ul>

                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Kimler Kullanabilir?
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      Platform, hukuk alanında çalışan profesyonellerden akademisyenlere, 
                      kamu çalışanlarından vatandaşlara kadar herkesin kullanımına açıktır. 
                      Özellikle güncel mevzuat takibi gereken meslek grupları için vazgeçilmez 
                      bir kaynak niteliğindedir.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Sürekli Gelişim
                      </h4>
                      <p className="text-blue-800 dark:text-blue-200 text-sm">
                        Platformumuz sürekli olarak geliştirilmekte ve yeni özellikler eklenmektedir. 
                        Kullanıcı geri bildirimleriniz bizim için çok değerlidir.
                      </p>
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