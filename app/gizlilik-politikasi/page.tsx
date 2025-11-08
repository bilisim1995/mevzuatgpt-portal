import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';
import { Shield, Lock, Eye, FileText, Cookie, UserCheck, Mail, Server, Database, CheckCircle, ArrowRight, Target, Clock } from '@/components/icon-components';
import Link from 'next/link';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'Mevzuat GPT gizlilik politikası. Kişisel verilerinizin korunması ve işlenmesi hakkında bilgiler.',
  keywords: ['gizlilik politikası', 'kişisel veriler', 'KVKK', 'veri koruma'],
  openGraph: {
    title: 'Gizlilik Politikası | Mevzuat GPT',
    description: 'Mevzuat GPT gizlilik politikası. Kişisel verilerinizin korunması ve işlenmesi hakkında bilgiler.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mevzuatgpt.org/gizlilik-politikasi',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {/* Hero Section */}
              <div className="text-center space-y-6 mb-16">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl mb-4">
                  <Shield className="w-10 h-10 text-white" aria-hidden="true" />
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Gizlilik Politikası
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Kişisel verilerinizin korunması bizim için önemlidir. Verileriniz güvende.
                </p>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
                  <span>KVKK Uyumlu</span>
                  <span className="mx-2">•</span>
                  <CheckCircle className="w-4 h-4 text-green-500" aria-hidden="true" />
                  <span>GDPR Uyumlu</span>
                </div>
              </div>

              {/* Main Content */}
              <div className="space-y-6">
                {/* Veri Sorumlusu */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          1. Veri Sorumlusu
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Bu gizlilik politikası, Mevzuat GPT ("Platform") tarafından işlenen kişisel verilerinizin 
                          korunması amacıyla hazırlanmıştır.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Toplanan Veriler */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center">
                        <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          2. Toplanan Veriler
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Platformumuzda aşağıdaki veriler toplanabilir:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>IP adresi ve tarayıcı bilgileri</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Sayfa ziyaret istatistikleri</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Arama sorguları (anonim)</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-purple-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>İletişim formunda verilen bilgiler</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Verilerin Kullanım Amacı */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-xl flex items-center justify-center">
                        <Target className="w-6 h-6 text-pink-600 dark:text-pink-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          3. Verilerin Kullanım Amacı
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          Toplanan veriler şu amaçlarla kullanılır:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Platform performansının iyileştirilmesi</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Kullanıcı deneyiminin geliştirilmesi</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>İstatistiksel analiz yapılması</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Teknik destek sağlanması</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Veri Güvenliği */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center">
                        <Lock className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          4. Veri Güvenliği
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                          Kişisel verileriniz, uygun teknik ve idari güvenlik önlemleri ile korunmaktadır. 
                          Verileriniz üçüncü taraflarla paylaşılmaz.
                        </p>
                        <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                          <div className="flex items-start gap-3">
                            <Shield className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <div>
                              <p className="text-sm font-medium text-green-900 dark:text-green-100">
                                Güvenlik Garantisi
                              </p>
                              <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                Tüm verileriniz şifrelenmiş bağlantılar (HTTPS) üzerinden iletilir ve güvenli sunucularda saklanır.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Çerezler */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center">
                        <Cookie className="w-6 h-6 text-amber-600 dark:text-amber-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          5. Çerezler
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          Platformumuz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. 
                          Çerez kullanımı hakkında detaylı bilgi için Çerez Politikamızı inceleyebilirsiniz.
                        </p>
                        <Link 
                          href="/cerez-politikasi"
                          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                        >
                          <span>Çerez Politikası</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Haklarınız */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center">
                        <UserCheck className="w-6 h-6 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          6. Haklarınız
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                          KVKK kapsamında sahip olduğunuz haklar:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Kişisel verilerinizin işlenip işlenmediğini öğrenme</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>İşlenen verileriniz hakkında bilgi talep etme</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Verilerin düzeltilmesini isteme</span>
                          </li>
                          <li className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                            <CheckCircle className="w-5 h-5 text-indigo-500 mt-0.5 flex-shrink-0" aria-hidden="true" />
                            <span>Verilerin silinmesini talep etme</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* İletişim */}
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-2 border-blue-200 dark:border-blue-800 shadow-xl">
                  <CardContent className="p-6 lg:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Mail className="w-6 h-6 text-white" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                          7. İletişim
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                          Gizlilik politikası ve KVKK ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:
                        </p>
                        <a 
                          href="mailto:kvkk@mevzuatgpt.org"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                        >
                          <Mail className="w-4 h-4" aria-hidden="true" />
                          <span>kvkk@mevzuatgpt.org</span>
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