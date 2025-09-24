import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import dynamic from 'next/dynamic';

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
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  Gizlilik Politikası
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Kişisel verilerinizin korunması bizim için önemlidir
                </p>
              </div>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <CardContent className="p-8 lg:p-12">
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <h2>1. Veri Sorumlusu</h2>
                    <p>
                      Bu gizlilik politikası, Mevzuat GPT ("Platform") tarafından işlenen kişisel verilerinizin 
                      korunması amacıyla hazırlanmıştır.
                    </p>

                    <h2>2. Toplanan Veriler</h2>
                    <p>Platformumuzda aşağıdaki veriler toplanabilir:</p>
                    <ul>
                      <li>IP adresi ve tarayıcı bilgileri</li>
                      <li>Sayfa ziyaret istatistikleri</li>
                      <li>Arama sorguları (anonim)</li>
                      <li>İletişim formunda verilen bilgiler</li>
                    </ul>

                    <h2>3. Verilerin Kullanım Amacı</h2>
                    <p>Toplanan veriler şu amaçlarla kullanılır:</p>
                    <ul>
                      <li>Platform performansının iyileştirilmesi</li>
                      <li>Kullanıcı deneyiminin geliştirilmesi</li>
                      <li>İstatistiksel analiz yapılması</li>
                      <li>Teknik destek sağlanması</li>
                    </ul>

                    <h2>4. Veri Güvenliği</h2>
                    <p>
                      Kişisel verileriniz, uygun teknik ve idari güvenlik önlemleri ile korunmaktadır. 
                      Verileriniz üçüncü taraflarla paylaşılmaz.
                    </p>

                    <h2>5. Çerezler</h2>
                    <p>
                      Platformumuz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. 
                      Çerez kullanımı hakkında detaylı bilgi için Çerez Politikamızı inceleyebilirsiniz.
                    </p>

                    <h2>6. Haklarınız</h2>
                    <p>KVKK kapsamında sahip olduğunuz haklar:</p>
                    <ul>
                      <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                      <li>İşlenen verileriniz hakkında bilgi talep etme</li>
                      <li>Verilerin düzeltilmesini isteme</li>
                      <li>Verilerin silinmesini talep etme</li>
                    </ul>

                    <h2>7. İletişim</h2>
                    <p>
                      Gizlilik politikası ile ilgili sorularınız için: 
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