import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';

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
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  Çerez Politikası
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Çerez kullanımı ve veri toplama hakkında bilgiler
                </p>
              </div>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <CardContent className="p-8 lg:p-12">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>1. Çerez Nedir?</h2>
                    <p>
                      Çerezler, web sitelerinin kullanıcıların cihazlarında sakladığı küçük metin dosyalarıdır. 
                      Bu dosyalar, site deneyiminizi iyileştirmek ve site performansını analiz etmek için kullanılır.
                    </p>

                    <h2>2. Kullandığımız Çerez Türleri</h2>
                    
                    <h3>Zorunlu Çerezler</h3>
                    <p>Bu çerezler sitenin düzgün çalışması için gereklidir:</p>
                    <ul>
                      <li>Oturum çerezleri</li>
                      <li>Güvenlik çerezleri</li>
                      <li>Tema tercihi (açık/koyu mod)</li>
                    </ul>

                    <h3>Analitik Çerezler</h3>
                    <p>Site kullanımını analiz etmek için kullanılır:</p>
                    <ul>
                      <li>Google Analytics çerezleri</li>
                      <li>Sayfa görüntüleme istatistikleri</li>
                      <li>Kullanıcı davranış analizi</li>
                    </ul>

                    <h3>Performans Çerezleri</h3>
                    <p>Site performansını iyileştirmek için kullanılır:</p>
                    <ul>
                      <li>Yükleme hızı optimizasyonu</li>
                      <li>Önbellek yönetimi</li>
                      <li>Kaynak optimizasyonu</li>
                    </ul>

                    <h2>3. Çerez Yönetimi</h2>
                    <p>
                      Çerezleri tarayıcı ayarlarınızdan yönetebilirsiniz. 
                      Çerezleri devre dışı bırakmanız durumunda site işlevselliği etkilenebilir.
                    </p>

                    <h3>Tarayıcı Ayarları</h3>
                    <ul>
                      <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                      <li><strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler</li>
                      <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
                      <li><strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri</li>
                    </ul>

                    <h2>4. Üçüncü Taraf Çerezleri</h2>
                    <p>Sitemizde kullanılan üçüncü taraf servisleri:</p>
                    <ul>
                      <li><strong>Google Analytics:</strong> Site kullanım istatistikleri</li>
                      <li><strong>Vercel:</strong> Hosting ve performans analizi</li>
                    </ul>

                    <h2>5. Çerez Saklama Süresi</h2>
                    <ul>
                      <li><strong>Oturum çerezleri:</strong> Tarayıcı kapatılana kadar</li>
                      <li><strong>Kalıcı çerezler:</strong> 1-2 yıl arası</li>
                      <li><strong>Analitik çerezler:</strong> 2 yıl</li>
                    </ul>

                    <h2>6. Haklarınız</h2>
                    <p>Çerezler konusunda sahip olduğunuz haklar:</p>
                    <ul>
                      <li>Çerez kullanımını reddetme</li>
                      <li>Mevcut çerezleri silme</li>
                      <li>Çerez tercihlerini değiştirme</li>
                      <li>Çerez kullanımı hakkında bilgi alma</li>
                    </ul>

                    <h2>7. İletişim</h2>
                    <p>
                      Çerez politikası ile ilgili sorularınız için: 
                      <strong> info@mevzuatgpt.org</strong> adresinden bizimle iletişime geçebilirsiniz.
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-8">
                      Son güncelleme: {new Date().toLocaleDateString('tr-TR')}
                    </p>
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