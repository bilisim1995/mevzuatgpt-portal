import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Kullanım Koşulları',
  description: 'Mevzuat Portal kullanım koşulları. Platform kullanımına ilişkin kurallar ve şartlar.',
  keywords: ['kullanım koşulları', 'şartlar', 'kurallar', 'mevzuat portal'],
  openGraph: {
    title: 'Kullanım Koşulları | Mevzuat Portal',
    description: 'Mevzuat Portal kullanım koşulları. Platform kullanımına ilişkin kurallar ve şartlar.',
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
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  Kullanım Koşulları
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Platform kullanımına ilişkin kurallar ve şartlar
                </p>
              </div>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <CardContent className="p-8 lg:p-12">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>1. Genel Hükümler</h2>
                    <p>
                      Bu kullanım koşulları, Mevzuat Portal ("Platform") kullanımına ilişkin kuralları belirler. 
                      Platformu kullanarak bu koşulları kabul etmiş sayılırsınız.
                    </p>

                    <h2>2. Platform Hizmetleri</h2>
                    <p>Mevzuat Portal aşağıdaki hizmetleri sunar:</p>
                    <ul>
                      <li>Kamu kurumlarının mevzuat metinlerine erişim</li>
                      <li>Mevzuat arama ve filtreleme</li>
                      <li>Yapay zeka destekli mevzuat analizi</li>
                      <li>Güncel mevzuat takibi</li>
                    </ul>

                    <h2>3. Kullanıcı Sorumlulukları</h2>
                    <p>Platform kullanıcıları:</p>
                    <ul>
                      <li>Platformu yasal amaçlar için kullanmalıdır</li>
                      <li>Sistem güvenliğini tehdit edecek eylemlerden kaçınmalıdır</li>
                      <li>Telif hakları ve fikri mülkiyet haklarına saygı göstermelidir</li>
                      <li>Yanıltıcı veya zararlı içerik paylaşmamalıdır</li>
                    </ul>

                    <h2>4. İçerik ve Doğruluk</h2>
                    <p>
                      Platform üzerindeki mevzuat metinleri resmi kaynaklardan alınmaktadır. 
                      Ancak, içeriklerin doğruluğu konusunda garanti verilmez. 
                      Resmi işlemler için orijinal kaynaklara başvurulması önerilir.
                    </p>

                    <h2>5. Fikri Mülkiyet</h2>
                    <p>
                      Platform tasarımı, yazılımı ve özgün içerikleri telif hakları ile korunmaktadır. 
                      Mevzuat metinleri kamu malı olup, serbestçe kullanılabilir.
                    </p>

                    <h2>6. Hizmet Kesintileri</h2>
                    <p>
                      Platform, bakım, güncelleme veya teknik nedenlerle geçici olarak 
                      erişime kapatılabilir. Bu durumlar önceden duyurulmaya çalışılır.
                    </p>

                    <h2>7. Sorumluluk Sınırlaması</h2>
                    <p>
                      Platform işletmecisi, kullanıcıların platforma erişememesi veya 
                      içeriklerin kullanımından doğabilecek zararlardan sorumlu değildir.
                    </p>

                    <h2>8. Değişiklikler</h2>
                    <p>
                      Bu kullanım koşulları gerektiğinde güncellenebilir. 
                      Değişiklikler platform üzerinden duyurulur.
                    </p>

                    <h2>9. İletişim</h2>
                    <p>
                      Kullanım koşulları ile ilgili sorularınız için: 
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