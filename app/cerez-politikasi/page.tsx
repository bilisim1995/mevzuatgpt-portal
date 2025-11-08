import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Cookie, HelpCircle, Settings, Shield, BarChart, Clock, UserCheck, Mail, CheckCircle, AlertCircle, Server, Globe, Zap } from '@/components/icon-components';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Çerez Politikası',
  description: 'Mevzuat GPT çerez politikası. Çerez kullanımı ve veri toplama hakkında bilgiler.',
  keywords: ['çerez politikası', 'cookies', 'veri toplama', 'tracking'],
  openGraph: {
    title: 'Çerez Politikası | Mevzuat GPT',
    description: 'Mevzuat GPT çerez politikası. Çerez kullanımı ve veri toplama hakkında bilgiler.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mevzuatgpt.org/cerez-politikasi',
  },
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-500 via-orange-500 to-pink-500 rounded-2xl shadow-xl mb-4">
                  <Cookie className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent">
                  Çerez Politikası
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Çerez kullanımı ve veri toplama hakkında bilgiler. Şeffaf ve güvenli.
                </p>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                {/* Çerez Nedir? */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                        <HelpCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          1. Çerez Nedir?
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Çerezler, web sitelerinin kullanıcıların cihazlarında sakladığı küçük metin dosyalarıdır. 
                      Bu dosyalar, site deneyiminizi iyileştirmek ve site performansını analiz etmek için kullanılır.
                    </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Kullandığımız Çerez Türleri */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <Settings className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                          2. Kullandığımız Çerez Türleri
                        </h2>
                        
                        {/* Zorunlu Çerezler */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <Shield className="w-5 h-5 text-green-600 dark:text-green-400" aria-hidden="true" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              Zorunlu Çerezler
                            </h3>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            Bu çerezler sitenin düzgün çalışması için gereklidir:
                          </p>
                          <ul className="space-y-2 ml-7">
                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span>Oturum çerezleri</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span>Güvenlik çerezleri</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span>Tema tercihi (açık/koyu mod)</span>
                            </li>
                    </ul>
                        </div>

                        {/* Analitik Çerezler */}
                        <div className="mb-6">
                          <div className="flex items-center gap-2 mb-3">
                            <BarChart className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              Analitik Çerezler
                            </h3>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            Site kullanımını analiz etmek için kullanılır:
                          </p>
                          <ul className="space-y-2 ml-7">
                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span>Google Analytics çerezleri</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span>Sayfa görüntüleme istatistikleri</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span>Kullanıcı davranış analizi</span>
                            </li>
                    </ul>
                        </div>

                        {/* Performans Çerezleri */}
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Zap className="w-5 h-5 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                              Performans Çerezleri
                            </h3>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-3">
                            Site performansını iyileştirmek için kullanılır:
                          </p>
                          <ul className="space-y-2 ml-7">
                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span>Yükleme hızı optimizasyonu</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span>Önbellek yönetimi</span>
                            </li>
                            <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                              <CheckCircle className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                              <span>Kaynak optimizasyonu</span>
                            </li>
                    </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Çerez Yönetimi */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                        <Settings className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          3. Çerez Yönetimi
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz. 
                      Çerezleri devre dışı bırakmanız durumunda site işlevselliği etkilenebilir.
                    </p>
                        <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 mt-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                            Tarayıcı Ayarları
                          </h3>
                          <ul className="space-y-2">
                            <li className="text-gray-700 dark:text-gray-300">
                              <strong className="text-gray-900 dark:text-gray-100">Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler
                            </li>
                            <li className="text-gray-700 dark:text-gray-300">
                              <strong className="text-gray-900 dark:text-gray-100">Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler
                            </li>
                            <li className="text-gray-700 dark:text-gray-300">
                              <strong className="text-gray-900 dark:text-gray-100">Safari:</strong> Tercihler → Gizlilik → Çerezler
                            </li>
                            <li className="text-gray-700 dark:text-gray-300">
                              <strong className="text-gray-900 dark:text-gray-100">Edge:</strong> Ayarlar → Çerezler ve site izinleri
                            </li>
                    </ul>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Üçüncü Taraf Çerezleri */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                        <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          4. Üçüncü Taraf Çerezleri
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Sitemizde kullanılan üçüncü taraf servisleri:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span><strong>Google Analytics:</strong> Site kullanım istatistikleri</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span><strong>Vercel:</strong> Hosting ve performans analizi</span>
                          </li>
                    </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Çerez Saklama Süresi */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                        <Clock className="w-6 h-6 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          5. Çerez Saklama Süresi
                        </h2>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span><strong>Oturum çerezleri:</strong> Tarayıcı kapatılana kadar</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span><strong>Kalıcı çerezler:</strong> 1-2 yıl arası</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-teal-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span><strong>Analitik çerezler:</strong> 2 yıl</span>
                          </li>
                    </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Haklarınız */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-pink-600 dark:text-pink-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          6. Haklarınız
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Çerezler konusunda sahip olduğunuz haklar:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Çerez kullanımını reddetme</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Mevcut çerezleri silme</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Çerez tercihlerini değiştirme</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Çerez kullanımı hakkında bilgi alma</span>
                          </li>
                    </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* İletişim */}
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-800 shadow-xl">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          7. İletişim
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          Çerez politikası ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:
                        </p>
                        <a 
                          href="mailto:info@mevzuatgpt.org"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                        >
                          <Mail className="w-4 h-4" aria-hidden="true" />
                          <span>info@mevzuatgpt.org</span>
                        </a>
                      </div>
                  </div>
                </CardContent>
              </Card>

                {/* Son Güncelleme */}
                <div className="text-center pt-8">
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center gap-2">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                    <span>Son güncelleme: {new Date().toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
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