import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Users, Heart, Rocket, Target, Zap, Shield, ArrowRight } from '@/components/icon-components';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Ekibimiz',
  description: 'Mevzuat GPT ekibini tanıyın. Kamu mevzuatına erişimi kolaylaştıran ekibimiz.',
  keywords: ['ekip', 'takım', 'Mevzuat GPT', 'ekibimiz'],
  openGraph: {
    title: 'Ekibimiz | Mevzuat GPT',
    description: 'Mevzuat GPT ekibini tanıyın. Kamu mevzuatına erişimi kolaylaştıran ekibimiz.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mevzuatgpt.org/ekibimiz',
  },
};

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl mb-4">
                  <Users className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Ekibimiz
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Kamu mevzuatına erişimi kolaylaştıran, tutkulu ve deneyimli ekibimizle tanışın
                </p>
              </div>

              {/* Coming Soon Card */}
              <Card className="bg-white dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-700 shadow-lg">
                <CardContent className="p-12 lg:p-16 text-center">
                  <div className="space-y-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 rounded-full mx-auto">
                      <Rocket className="w-8 h-8 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                    </div>
                    <div>
                      <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                        Yakında Güncellenecek
                      </h2>
                      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto leading-relaxed">
                        Ekibimiz sayfası şu anda hazırlanıyor. Yakında ekibimizin üyelerini burada tanıtacağız.
                      </p>
                    </div>
                    <div className="pt-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Bu sayfa en kısa sürede güncellenecektir.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Values Section */}
              <div className="mt-16">
                <div className="text-center space-y-4 mb-12">
                  <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
                    Ekibimizin Değerleri
                  </h2>
                  <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                    Çalışmalarımızı yönlendiren temel ilkeler
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Innovation */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div className="mx-auto w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                          <Zap className="w-7 h-7 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">İnovasyon</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Sürekli gelişen teknolojileri takip ederek, en iyi çözümleri sunuyoruz
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Collaboration */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div className="mx-auto w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                          <Users className="w-7 h-7 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">İş Birliği</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Güçlü ekip çalışması ve açık iletişimle birlikte büyüyoruz
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Excellence */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div className="mx-auto w-14 h-14 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                          <Target className="w-7 h-7 text-green-600 dark:text-green-400" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Mükemmellik</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Her projede en yüksek kalite standartlarını hedefliyoruz
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Passion */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div className="mx-auto w-14 h-14 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
                          <Heart className="w-7 h-7 text-pink-600 dark:text-pink-400" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Tutku</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Yaptığımız işe olan tutkumuz, her gün daha iyisini yapmamızı sağlıyor
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Reliability */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div className="mx-auto w-14 h-14 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                          <Shield className="w-7 h-7 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Güvenilirlik</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Sözümüzü tutar, güvenilir çözümler sunarız
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Growth */}
                  <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="space-y-4">
                        <div className="mx-auto w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                          <Rocket className="w-7 h-7 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">Büyüme</h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                          Sürekli öğrenerek ve gelişerek ilerliyoruz
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Join Us Section */}
              <Card className="mt-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 shadow-xl">
                <CardContent className="p-8 lg:p-12 text-center">
                  <div className="space-y-4">
                    <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-gray-100">
                      Ekibimize Katılmak İster misiniz?
                    </h2>
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto">
                      Kamu mevzuatına erişimi kolaylaştırmak için birlikte çalışalım. 
                      Açık pozisyonlar için kariyer sayfamızı ziyaret edin.
                    </p>
                    <div className="pt-4">
                      <a
                        href="/kariyer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                      >
                        <span>Kariyer Sayfasına Git</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
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

