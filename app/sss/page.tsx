import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { HelpCircle, Search, FileText, Building, BrainCircuit, Download } from 'lucide-react';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular',
  description: 'Mevzuat GPT hakkında sıkça sorulan sorular ve cevapları. Platform kullanımı, özellikler ve destek bilgileri.',
  keywords: ['sss', 'sıkça sorulan sorular', 'yardım', 'destek', 'Mevzuat GPT'],
  openGraph: {
    title: 'Sıkça Sorulan Sorular | Mevzuat GPT',
    description: 'Mevzuat GPT hakkında sıkça sorulan sorular ve cevapları. Platform kullanımı, özellikler ve destek bilgileri.',
    type: 'website',
  },
  alternates: {
    canonical: 'https://mevzuatgpt.org/sss',
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* FAQPage Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Mevzuat GPT nedir ve nasıl kullanılır?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mevzuat GPT, kamu kurumlarının yayınladığı genelge, yönetmelik ve diğer mevzuat metinlerine tek noktadan erişim sağlayan bir platformdur. Ana sayfadan bir kurum seçin, arama kutusunu kullanarak mevzuat arayın, istediğiniz belgeye tıklayarak detaylarını görüntüleyin ve PDF olarak indirin veya yapay zeka asistanından yardım alın."
                }
              },
              {
                "@type": "Question",
                "name": "Platform ücretsiz mi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, Mevzuat GPT tamamen ücretsizdir. Tüm mevzuat metinlerine, arama özelliklerine ve yapay zeka asistanına ücretsiz erişebilirsiniz. Kayıt olmaya da gerek yoktur."
                }
              },
              {
                "@type": "Question",
                "name": "Mevzuatlar ne sıklıkla güncellenir?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mevzuat metinleri günlük olarak kontrol edilir ve yeni yayınlanan metinler hızla platforma eklenir. Kurumların resmi web sitelerinden otomatik olarak takip edilen güncellemeler sayesinde en güncel bilgilere erişebilirsiniz."
                }
              },
              {
                "@type": "Question",
                "name": "Hangi kurumların mevzuatları bulunuyor?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Platformda bakanlıklar ve bağlı kuruluşları, düzenleyici kurullar (BDDK, SPK, EPDK vb.), kamu kurumları (SGK, İŞKUR, TÜİK vb.), belediyeler ve yerel yönetimler ile diğer kamu kurum ve kuruluşlarının mevzuatları bulunmaktadır."
                }
              },
              {
                "@type": "Question",
                "name": "Yapay zeka asistanı nasıl çalışır?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yapay zeka asistanımız, mevzuat metinlerini analiz ederek sorularınıza hızlı ve doğru cevaplar verir. 'Bu mevzuat ne hakkında?', 'Kimler için geçerli?', 'Ana maddeleri neler?', 'Özetini çıkarır mısın?' gibi sorular sorabilirsiniz."
                }
              },
              {
                "@type": "Question",
                "name": "Arama özelliği nasıl kullanılır?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Etkili arama için en az 2 karakter yazın, anahtar kelimeleri kullanın (örn: 'çalışma izni', 'vergi muafiyeti'), otomatik tamamlama önerilerini kullanın, tam cümle yerine önemli kelimeleri yazın ve kurum sayfasında arama yaparak sonuçları daraltın."
                }
              },
              {
                "@type": "Question",
                "name": "PDF dosyalarını indirebilir miyim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, mevzuat metinlerinin PDF versiyonlarını ücretsiz olarak indirebilirsiniz. Her mevzuat sayfasında 'PDF İndir' butonu bulunmaktadır. İndirilen dosyalar orijinal formatlarında ve tam içerikli olarak sunulur."
                }
              },
              {
                "@type": "Question",
                "name": "Mobil cihazlarda kullanabilir miyim?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, Mevzuat GPT mobil uyumlu olarak tasarlanmıştır. Telefon, tablet ve bilgisayarınızdan aynı özelliklere erişebilirsiniz. Responsive tasarım sayesinde her cihazda optimal görüntüleme sağlanır."
                }
              },
              {
                "@type": "Question",
                "name": "Mevzuat metinlerinin doğruluğu garanti edilir mi?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Mevzuat metinleri resmi kaynaklardan alınmakta ve düzenli olarak güncellenmektedir. Ancak resmi işlemler için mutlaka orijinal kaynaklara başvurmanızı öneririz. Bu platform bilgilendirme amaçlıdır."
                }
              },
              {
                "@type": "Question",
                "name": "API hizmeti var mı?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Evet, geliştiriciler için REST API hizmeti sunuyoruz. API ile kendi uygulamanızda mevzuat verilerine erişebilirsiniz. API kullanımı hakkında detaylı bilgi için bizimle iletişime geçebilirsiniz."
                }
              }
            ],
            "url": "https://mevzuatgpt.org/sss",
            "inLanguage": "tr-TR"
          })
        }}
      />
      
      {/* BreadcrumbList Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Ana Sayfa",
                "item": "https://mevzuatgpt.org"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Sıkça Sorulan Sorular",
                "item": "https://mevzuatgpt.org/sss"
              }
            ]
          })
        }}
      />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  Sıkça Sorulan Sorular
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                  Platform hakkında merak ettiklerinizin cevapları burada
                </p>
              </div>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                    <HelpCircle className="h-5 w-5" />
                    <span>Genel Sorular</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger className="text-left">
                        Mevzuat GPT nedir ve nasıl kullanılır?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <p>
                            Mevzuat GPT, kamu kurumlarının yayınladığı genelge, yönetmelik ve diğer 
                            mevzuat metinlerine tek noktadan erişim sağlayan bir platformdur.
                          </p>
                          <p>Kullanım adımları:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Ana sayfadan bir kurum seçin</li>
                            <li>Arama kutusunu kullanarak mevzuat arayın</li>
                            <li>İstediğiniz belgeye tıklayarak detaylarını görüntüleyin</li>
                            <li>PDF olarak indirin veya yapay zeka asistanından yardım alın</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2">
                      <AccordionTrigger className="text-left">
                        Platform ücretsiz mi?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Evet, Mevzuat GPT tamamen ücretsizdir. Tüm mevzuat metinlerine, 
                          arama özelliklerine ve yapay zeka asistanına ücretsiz erişebilirsiniz. 
                          Kayıt olmaya da gerek yoktur.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3">
                      <AccordionTrigger className="text-left">
                        Mevzuatlar ne sıklıkla güncellenir?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Mevzuat metinleri günlük olarak kontrol edilir ve yeni yayınlanan 
                          metinler hızla platforma eklenir. Kurumların resmi web sitelerinden 
                          otomatik olarak takip edilen güncellemeler sayesinde en güncel 
                          bilgilere erişebilirsiniz.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4">
                      <AccordionTrigger className="text-left">
                        Hangi kurumların mevzuatları bulunuyor?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <p>Platformda şu tür kurumların mevzuatları bulunmaktadır:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Bakanlıklar ve bağlı kuruluşları</li>
                            <li>Düzenleyici kurullar (BDDK, SPK, EPDK vb.)</li>
                            <li>Kamu kurumları (SGK, İŞKUR, TÜİK vb.)</li>
                            <li>Belediyeler ve yerel yönetimler</li>
                            <li>Diğer kamu kurum ve kuruluşları</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5">
                      <AccordionTrigger className="text-left">
                        Yapay zeka asistanı nasıl çalışır?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <p>
                            Yapay zeka asistanımız, mevzuat metinlerini analiz ederek 
                            sorularınıza hızlı ve doğru cevaplar verir.
                          </p>
                          <p>Asistana sorabilecekleriniz:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>"Bu mevzuat ne hakkında?"</li>
                            <li>"Kimler için geçerli?"</li>
                            <li>"Ana maddeleri neler?"</li>
                            <li>"Özetini çıkarır mısın?"</li>
                            <li>"Benzer mevzuatlar var mı?"</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-6">
                      <AccordionTrigger className="text-left">
                        Arama özelliği nasıl kullanılır?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <p>Etkili arama için ipuçları:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>En az 2 karakter yazın</li>
                            <li>Anahtar kelimeleri kullanın (örn: "çalışma izni", "vergi muafiyeti")</li>
                            <li>Otomatik tamamlama önerilerini kullanın</li>
                            <li>Tam cümle yerine önemli kelimeleri yazın</li>
                            <li>Kurum sayfasında arama yaparak sonuçları daraltın</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-7">
                      <AccordionTrigger className="text-left">
                        PDF dosyalarını indirebilir miyim?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Evet, mevzuat metinlerinin PDF versiyonlarını ücretsiz olarak 
                          indirebilirsiniz. Her mevzuat sayfasında "PDF İndir" butonu 
                          bulunmaktadır. İndirilen dosyalar orijinal formatlarında ve 
                          tam içerikli olarak sunulur.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-8">
                      <AccordionTrigger className="text-left">
                        Mobil cihazlarda kullanabilir miyim?
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-gray-600 dark:text-gray-300">
                          Evet, Mevzuat GPT mobil uyumlu olarak tasarlanmıştır. 
                          Telefon, tablet ve bilgisayarınızdan aynı özelliklere erişebilirsiniz. 
                          Responsive tasarım sayesinde her cihazda optimal görüntüleme sağlanır.
                        </p>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-9">
                      <AccordionTrigger className="text-left">
                        Mevzuat metinlerinin doğruluğu garanti edilir mi?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <p>
                            Mevzuat metinleri resmi kaynaklardan alınmakta ve düzenli olarak 
                            güncellenmektedir. Ancak resmi işlemler için mutlaka orijinal 
                            kaynaklara başvurmanızı öneririz.
                          </p>
                          <p className="text-sm bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                            <strong>Önemli:</strong> Bu platform bilgilendirme amaçlıdır. 
                            Hukuki işlemler için resmi kaynaklara başvurunuz.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-10">
                      <AccordionTrigger className="text-left">
                        API hizmeti var mı?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <p>
                            Evet, geliştiriciler için REST API hizmeti sunuyoruz. 
                            API ile kendi uygulamanızda mevzuat verilerine erişebilirsiniz.
                          </p>
                          <p>
                            API kullanımı hakkında detaylı bilgi için bizimle iletişime geçebilirsiniz.
                          </p>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* Teknik Destek */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg mt-8">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-gray-100">Teknik Destek</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="tech-1">
                      <AccordionTrigger className="text-left">
                        Site yavaş yükleniyor, ne yapmalıyım?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <p>Site yavaşlığı için şu adımları deneyebilirsiniz:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Tarayıcınızın önbelleğini temizleyin</li>
                            <li>Farklı bir tarayıcı deneyin</li>
                            <li>İnternet bağlantınızı kontrol edin</li>
                            <li>Sayfayı yenileyin (F5 veya Ctrl+R)</li>
                            <li>Reklam engelleyici varsa geçici olarak kapatın</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tech-2">
                      <AccordionTrigger className="text-left">
                        Arama sonuçları çıkmıyor?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <p>Arama sorunları için:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Farklı anahtar kelimeler deneyin</li>
                            <li>Yazım hatası olup olmadığını kontrol edin</li>
                            <li>Daha genel terimler kullanın</li>
                            <li>Kurum filtresi kullanmayı deneyin</li>
                            <li>Sayfayı yenileyip tekrar deneyin</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="tech-3">
                      <AccordionTrigger className="text-left">
                        PDF dosyası açılmıyor?
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 text-gray-600 dark:text-gray-300">
                          <p>PDF sorunları için:</p>
                          <ul className="list-disc list-inside space-y-1 ml-4">
                            <li>Tarayıcınızın PDF desteğini kontrol edin</li>
                            <li>Adobe Reader veya alternatif PDF okuyucu yükleyin</li>
                            <li>Dosyayı indirip bilgisayarınızda açmayı deneyin</li>
                            <li>Pop-up engelleyici kapalı olduğundan emin olun</li>
                          </ul>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>

              {/* İletişim */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 mt-8">
                <CardContent className="p-8 text-center">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Sorunuz cevaplandırılmadı mı?
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Aradığınız cevabı bulamadıysanız bizimle iletişime geçmekten çekinmeyin.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a 
                      href="/iletisim"
                      className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      İletişime Geçin
                    </a>
                    <a 
                      href="/yardim"
                      className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                    >
                      Yardım Sayfası
                    </a>
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