import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText, Building, BrainCircuit, Download, Eye, HelpCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Yardım',
  description: 'Mevzuat GPT kullanım kılavuzu. Platform özelliklerini nasıl kullanacağınızı öğrenin.',
  keywords: ['yardım', 'kullanım kılavuzu', 'rehber', 'nasıl kullanılır', 'Mevzuat GPT'],
  openGraph: {
    title: 'Yardım | Mevzuat GPT',
    description: 'Mevzuat GPT kullanım kılavuzu. Platform özelliklerini nasıl kullanacağınızı öğrenin.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mevzuatgpt.org/yardim',
  },
};

export default function HelpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  Yardım & Kullanım Kılavuzu
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Platform özelliklerini nasıl kullanacağınızı adım adım öğrenin
                </p>
              </div>

              <div className="space-y-8">
                {/* Başlangıç */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <HelpCircle className="h-5 w-5" />
                      <span>Başlangıç</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Platform Nasıl Kullanılır?
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Mevzuat GPT'a hoş geldiniz! Bu platform, kamu kurumlarının mevzuat metinlerine 
                        hızlı ve kolay erişim sağlar. İki ana yöntemle mevzuatlara ulaşabilirsiniz:
                      </p>
                      <ul className="list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 ml-4">
                        <li>Ana sayfadan kurum seçerek</li>
                        <li>Arama yaparak</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                {/* Kurum Seçimi */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <Building className="h-5 w-5" />
                      <span>Kurum Seçimi</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Adım 1: Kurum Seçin
                      </h3>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-blue-800 dark:text-blue-200">
                          Ana sayfada "Bir kurum seçin" kutusuna tıklayın ve açılan listeden 
                          istediğiniz kurumu seçin.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Kurum Türleri:</h4>
                        <div className="flex flex-wrap gap-2">
                          <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                            Bakanlık
                          </Badge>
                          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Kurum
                          </Badge>
                          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300">
                            Belediye
                          </Badge>
                          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                            Düzenleyici Kurul
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Arama */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <Search className="h-5 w-5" />
                      <span>Arama Özelliği</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Adım 2: Arama Yapın
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Kurum sayfasında veya ana sayfada arama kutusunu kullanarak mevzuat arayabilirsiniz.
                      </p>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Arama İpuçları:</h4>
                        <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 ml-4">
                          <li>En az 2 karakter yazın</li>
                          <li>Otomatik tamamlama önerilerini kullanın</li>
                          <li>Anahtar kelimeleri kullanın</li>
                          <li>Tam cümle yerine önemli kelimeleri yazın</li>
                        </ul>
                      </div>

                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                        <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">
                          Örnek Aramalar:
                        </h4>
                        <ul className="text-green-700 dark:text-green-300 space-y-1">
                          <li>• "çalışma izni"</li>
                          <li>• "vergi muafiyeti"</li>
                          <li>• "sosyal yardım"</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Mevzuat Görüntüleme */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <FileText className="h-5 w-5" />
                      <span>Mevzuat Görüntüleme</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Adım 3: Mevzuatı İnceleyin
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Mevzuat listesinden istediğiniz belgeye tıklayarak detay sayfasına gidin.
                      </p>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Mevcut Özellikler:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <Eye className="h-5 w-5 text-blue-600" />
                            <span className="text-gray-700 dark:text-gray-300">Mevzuat metnini okuyun</span>
                          </div>
                          <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                            <Download className="h-5 w-5 text-green-600" />
                            <span className="text-gray-700 dark:text-gray-300">PDF olarak indirin</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Yapay Zeka */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <BrainCircuit className="h-5 w-5" />
                      <span>Yapay Zeka Asistanı</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        AI Asistanından Yardım Alın
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Karmaşık mevzuat metinlerini anlamak için yapay zeka asistanımızı kullanın.
                      </p>
                      
                      <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h4 className="font-medium text-purple-800 dark:text-purple-200 mb-2">
                          Asistana Sorabilecekleriniz:
                        </h4>
                        <ul className="text-purple-700 dark:text-purple-300 space-y-1">
                          <li>• "Bu mevzuat ne hakkında?"</li>
                          <li>• "Kimler için geçerli?"</li>
                          <li>• "Ana maddeleri neler?"</li>
                          <li>• "Özetini çıkarır mısın?"</li>
                        </ul>
                      </div>

                      <div className="text-center">
                        <a 
                          href="https://uygulama.mevzuatgpt.org" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
                        >
                          <BrainCircuit className="h-5 w-5 mr-2" />
                          Yapay Zeka Asistanını Deneyin
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* İpuçları */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">
                      💡 Faydalı İpuçları
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Hızlı Erişim</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <li>• Sık kullandığınız kurumları favorilerinize ekleyin</li>
                          <li>• Koyu/açık tema arasında geçiş yapabilirsiniz</li>
                          <li>• Mobil cihazlarda da tam özellikli kullanım</li>
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Verimli Arama</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                          <li>• Otomatik tamamlama önerilerini kullanın</li>
                          <li>• Alakalılık skorlarına dikkat edin</li>
                          <li>• Etiketleri kullanarak benzer mevzuatları bulun</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Destek */}
                <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800">
                  <CardContent className="p-8 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Hala yardıma ihtiyacınız var mı?
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Destek ekibimiz size yardımcı olmaya hazır. İletişime geçmekten çekinmeyin.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <a 
                        href="/sss"
                        className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        SSS'yi İnceleyin
                      </a>
                      <a 
                        href="/iletisim"
                        className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                      >
                        İletişime Geçin
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}