import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { FileText, Rocket, Users, FileCheck, Shield, AlertCircle, Info, RefreshCw, Mail, CheckCircle, Clock, Scale } from '@/components/icon-components';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Kullanım Koşulları',
  description: 'Mevzuat GPT kullanım koşulları. Platform kullanımına ilişkin kurallar ve şartlar.',
  keywords: ['kullanım koşulları', 'şartlar', 'kurallar', 'Mevzuat GPT'],
  openGraph: {
    title: 'Kullanım Koşulları | Mevzuat GPT',
    description: 'Mevzuat GPT kullanım koşulları. Platform kullanımına ilişkin kurallar ve şartlar.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mevzuatgpt.org/kullanim-kosullari',
  },
};

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl mb-4">
                  <Scale className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Kullanım Koşulları
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Platform kullanımına ilişkin kurallar ve şartlar. Lütfen dikkatlice okuyunuz.
                </p>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                {/* Genel Hükümler */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          1. Genel Hükümler
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Bu kullanım koşulları, Mevzuat GPT ("Platform") kullanımına ilişkin kuralları belirler. 
                          Platformu kullanarak bu koşulları kabul etmiş sayılırsınız.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Platform Hizmetleri */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          2. Platform Hizmetleri
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Mevzuat GPT aşağıdaki hizmetleri sunar:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Kamu kurumlarının mevzuat metinlerine erişim</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Mevzuat arama ve filtreleme</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Yapay zeka destekli mevzuat analizi</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Güncel mevzuat takibi</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Kullanıcı Sorumlulukları */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
                        <Users className="w-6 h-6 text-pink-600 dark:text-pink-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          3. Kullanıcı Sorumlulukları
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Platform kullanıcıları:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Platformu yasal amaçlar için kullanmalıdır</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Sistem güvenliğini tehdit edecek eylemlerden kaçınmalıdır</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Telif hakları ve fikri mülkiyet haklarına saygı göstermelidir</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Yanıltıcı veya zararlı içerik paylaşmamalıdır</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* İçerik ve Doğruluk */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                        <FileCheck className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          4. İçerik ve Doğruluk
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Platform üzerindeki mevzuat metinleri resmi kaynaklardan alınmaktadır. 
                          Ancak, içeriklerin doğruluğu konusunda garanti verilmez. 
                          Resmi işlemler için orijinal kaynaklara başvurulması önerilir.
                        </p>
                        <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                          <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <div>
                              <p className="text-sm font-medium text-amber-900 dark:text-amber-100">
                                Önemli Uyarı
                              </p>
                              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                                Resmi işlemler için mutlaka orijinal kaynaklara başvurunuz.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Fikri Mülkiyet */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          5. Fikri Mülkiyet
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Platform tasarımı, yazılımı ve özgün içerikleri telif hakları ile korunmaktadır. 
                          Mevzuat metinleri kamu malı olup, serbestçe kullanılabilir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Hizmet Kesintileri */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          6. Hizmet Kesintileri
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Platform, bakım, güncelleme veya teknik nedenlerle geçici olarak 
                          erişime kapatılabilir. Bu durumlar önceden duyurulmaya çalışılır.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Sorumluluk Sınırlaması */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-xl flex items-center justify-center">
                        <Info className="w-6 h-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          7. Sorumluluk Sınırlaması
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Platform işletmecisi, kullanıcıların platforma erişememesi veya 
                          içeriklerin kullanımından doğabilecek zararlardan sorumlu değildir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Değişiklikler */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-xl flex items-center justify-center">
                        <RefreshCw className="w-6 h-6 text-teal-600 dark:text-teal-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          8. Değişiklikler
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Bu kullanım koşulları gerektiğinde güncellenebilir. 
                          Değişiklikler platform üzerinden duyurulur.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* İletişim */}
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border-2 border-indigo-200 dark:border-indigo-800 shadow-xl">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          9. İletişim
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          Kullanım koşulları ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:
                        </p>
                        <a 
                          href="mailto:info@mevzuatgpt.org"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
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