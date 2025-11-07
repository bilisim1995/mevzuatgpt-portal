import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Zap, Heart, TrendingUp, Code, Palette, BarChart, Mail, ArrowRight } from '@/components/icon-components';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Kariyer',
  description: 'Mevzuat GPT ekibine katılın. Kamu mevzuatına erişimi demokratikleştirme yolculuğumuzda bize katılın.',
  keywords: ['kariyer', 'iş ilanları', 'Mevzuat GPT', 'açık pozisyonlar', 'işe alım', 'kariyer fırsatları'],
  openGraph: {
    title: 'Kariyer | Mevzuat GPT',
    description: 'Mevzuat GPT ekibine katılın ve kamu mevzuatına erişimi demokratikleştirme yolculuğumuzda yer alın.',
    type: 'website',
  },
  alternates: {
    canonical: '/kariyer',
  },
};

const openPositions = [
  {
    title: 'Full Stack Developer',
    department: 'Teknoloji',
    type: 'Tam Zamanlı',
    location: 'Kayseri, Uzaktan veya Fiziksel',
    description: 'Next.js, TypeScript ve modern web teknolojileri ile çalışacak, platformumuzun geliştirilmesine katkı sağlayacak deneyimli geliştirici arıyoruz.',
    requirements: [
      'Next.js ve React deneyimi',
      'TypeScript bilgisi',
      'RESTful API tasarımı',
      'Veritabanı yönetimi (PostgreSQL)',
      'Git versiyon kontrolü'
    ]
  },
  {
    title: 'UI/UX Designer',
    department: 'Tasarım',
    type: 'Tam Zamanlı',
    location: 'Kayseri, Uzaktan veya Fiziksel',
    description: 'Kullanıcı deneyimini iyileştirecek, modern ve erişilebilir arayüzler tasarlayacak yaratıcı bir tasarımcı arıyoruz.',
    requirements: [
      'Figma veya benzeri tasarım araçları',
      'Kullanıcı deneyimi tasarımı',
      'Responsive tasarım prensipleri',
      'Erişilebilirlik standartları bilgisi',
      'Prototipleme yetenekleri'
    ]
  },
  {
    title: 'Data Analyst',
    department: 'Veri',
    type: 'Tam Zamanlı',
    location: 'Kayseri, Uzaktan veya Fiziksel',
    description: 'Mevzuat verilerini analiz edecek, içgörüler üretecek ve platform iyileştirmelerine katkı sağlayacak veri analisti arıyoruz.',
    requirements: [
      'Veri analizi ve görselleştirme',
      'SQL bilgisi',
      'Python veya R deneyimi',
      'İstatistiksel analiz',
      'Raporlama yetenekleri'
    ]
  },
  {
    title: 'Hukuk Danışmanı',
    department: 'Hukuk',
    type: 'Tam Zamanlı',
    location: 'Kayseri, Uzaktan veya Fiziksel',
    description: 'Mevzuat metinlerinin doğruluğunu kontrol edecek, hukuki danışmanlık sağlayacak ve platform içeriğinin hukuki uygunluğunu denetleyecek hukuk danışmanı arıyoruz.',
    requirements: [
      'Hukuk fakültesi mezunu',
      'Kamu hukuku ve idare hukuku bilgisi',
      'Mevzuat takibi ve analiz deneyimi',
      'Araştırma ve yazma yetenekleri',
      'Detay odaklı çalışma becerisi'
    ]
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Esnek Çalışma',
    description: 'Uzaktan çalışma imkanı ve esnek çalışma saatleri'
  },
  {
    icon: TrendingUp,
    title: 'Kariyer Gelişimi',
    description: 'Sürekli öğrenme ve profesyonel gelişim fırsatları'
  },
  {
    icon: Heart,
    title: 'Ekip Kültürü',
    description: 'Yenilikçi ve destekleyici ekip ortamı'
  },
  {
    icon: Users,
    title: 'Mentorluk',
    description: 'Deneyimli ekip üyelerinden mentorluk desteği'
  }
];

export default function CareerPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Structured Data - JobPosting */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "JobPosting",
              "title": "Kariyer Fırsatları - Mevzuat GPT",
              "description": "Mevzuat GPT ekibine katılın ve kamu mevzuatına erişimi demokratikleştirme yolculuğumuzda yer alın.",
              "identifier": {
                "@type": "PropertyValue",
                "name": "Mevzuat GPT",
                "value": "career"
              },
              "datePosted": "2025-01-01",
              "employmentType": "FULL_TIME",
              "hiringOrganization": {
                "@type": "Organization",
                "name": "Mevzuat GPT",
                "sameAs": "https://mevzuatgpt.org"
              },
              "jobLocation": {
                "@type": "Place",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Kayseri",
                  "addressCountry": "TR"
                }
              },
              "workHours": "Esnek çalışma saatleri",
              "baseSalary": {
                "@type": "MonetaryAmount",
                "currency": "TRY"
              }
            })
          }}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Kariyer Fırsatları
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8">
                Kamu mevzuatına erişimi demokratikleştirme yolculuğumuzda bize katılın
              </p>
              <p className="text-lg text-blue-50">
                Mevzuat GPT ekibi olarak, teknoloji ve inovasyonla kamu hizmetlerini dönüştürmeye odaklanıyoruz. 
                Siz de bu yolculukta yer almak ister misiniz?
              </p>
            </div>
          </div>
        </section>

        {/* Why Join Us */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Neden Mevzuat GPT?
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Türkiye'nin en kapsamlı mevzuat platformunu geliştiren ekibin bir parçası olun
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <Card key={index} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-16 sm:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Açık Pozisyonlar
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Şu anda açık pozisyonlarımızı inceleyin ve başvurunuzu yapın
              </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {openPositions.map((position, index) => (
                <Card key={index} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-2xl text-gray-900 dark:text-gray-100 mb-2">
                          {position.title}
                        </CardTitle>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                          <span className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1" />
                            {position.department}
                          </span>
                          <span className="flex items-center">
                            <Code className="h-4 w-4 mr-1" />
                            {position.type}
                          </span>
                          <span className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            {position.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                      {position.description}
                    </p>
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-3">
                        Gereksinimler:
                      </h4>
                      <ul className="space-y-2">
                        {position.requirements.map((req, reqIndex) => (
                          <li key={reqIndex} className="flex items-start text-gray-600 dark:text-gray-400">
                            <ArrowRight className="h-4 w-4 mr-2 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <a
                      href={`mailto:kariyer@mevzuatgpt.org?subject=${encodeURIComponent(position.title + ' - Başvuru')}`}
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Başvuru Yap
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Application Process */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Başvuru Süreci
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Başvurunuzu yapmak için aşağıdaki adımları takip edin
                </p>
              </div>

              <div className="space-y-6">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                        1
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Başvuru
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          İlgilendiğiniz pozisyon için <strong>kariyer@mevzuatgpt.org</strong> adresine özgeçmişinizi ve motivasyon mektubunuzu gönderin.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                        2
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Değerlendirme
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Başvurunuz ekibimiz tarafından değerlendirilir ve uygun görülen adaylar ile iletişime geçilir.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Görüşme
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Teknik ve kültürel uyum görüşmeleri gerçekleştirilir. Süreç hakkında detaylı bilgi paylaşılır.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                        4
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                          Teklif
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">
                          Uygun görülen adaylara teklif sunulur ve ekibe katılım süreci başlar.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Açık Pozisyon Yok mu?
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Yeteneklerinizi ve ilgi alanlarınızı paylaşın. Uygun pozisyon açıldığında sizinle iletişime geçelim.
              </p>
              <a
                href="mailto:kariyer@mevzuatgpt.org?subject=Genel Başvuru"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Mail className="h-5 w-5 mr-2" />
                Özgeçmiş Gönder
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

