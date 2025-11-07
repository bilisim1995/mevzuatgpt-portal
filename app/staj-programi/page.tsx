import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Zap, Heart, TrendingUp, Code, Palette, BarChart, Mail, ArrowRight, BookOpen, Target, Lightbulb, Rocket } from '@/components/icon-components';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'Staj Programı',
  description: 'Mevzuat GPT staj programına başvurun. Pratik deneyim kazanın, profesyonel ağınızı genişletin ve kariyerinize değer katın.',
  keywords: ['staj', 'staj programı', 'Mevzuat GPT', 'stajyer', 'kariyer gelişimi', 'pratik deneyim'],
  openGraph: {
    title: 'Staj Programı | Mevzuat GPT',
    description: 'Mevzuat GPT staj programına başvurun ve profesyonel deneyim kazanın.',
    type: 'website',
  },
  alternates: {
    canonical: '/staj-programi',
  },
};

const internshipAreas = [
  {
    icon: Code,
    title: 'Yazılım Geliştirme',
    description: 'Next.js, React, TypeScript gibi modern teknolojilerle web uygulamaları geliştirme',
    skills: ['Frontend Development', 'Backend Development', 'Full Stack', 'API Development']
  },
  {
    icon: Palette,
    title: 'UI/UX Tasarım',
    description: 'Kullanıcı deneyimi tasarımı, arayüz tasarımı ve prototipleme',
    skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems']
  },
  {
    icon: BarChart,
    title: 'Veri Analizi',
    description: 'Mevzuat verilerini analiz etme, görselleştirme ve raporlama',
    skills: ['Data Analysis', 'SQL', 'Python', 'Data Visualization']
  },
  {
    icon: BookOpen,
    title: 'Hukuk',
    description: 'Mevzuat metinlerinin doğruluğunu kontrol etme ve hukuki analiz',
    skills: ['Legal Research', 'Compliance', 'Documentation', 'Analysis']
  }
];

const benefits = [
  {
    icon: Zap,
    title: 'Pratik Deneyim',
    description: 'Gerçek projelerde çalışarak pratik deneyim kazanın'
  },
  {
    icon: Users,
    title: 'Mentorluk',
    description: 'Deneyimli ekip üyelerinden birebir mentorluk alın'
  },
  {
    icon: TrendingUp,
    title: 'Kariyer Gelişimi',
    description: 'Kariyerinize değer katacak sertifikalar ve referanslar'
  },
  {
    icon: Heart,
    title: 'Ekip Kültürü',
    description: 'Yenilikçi ve destekleyici bir ekip ortamında çalışın'
  }
];

const processSteps = [
  {
    step: 1,
    title: 'Başvuru',
    description: 'Özgeçmişinizi ve motivasyon mektubunuzu kariyer@mevzuatgpt.org adresine gönderin.'
  },
  {
    step: 2,
    title: 'Değerlendirme',
    description: 'Başvurunuz ekibimiz tarafından değerlendirilir ve uygun adaylar seçilir.'
  },
  {
    step: 3,
    title: 'Görüşme',
    description: 'Seçilen adaylarla teknik ve motivasyon görüşmeleri gerçekleştirilir.'
  },
  {
    step: 4,
    title: 'Kabul',
    description: 'Kabul edilen stajyerlere staj programı detayları ve başlangıç tarihi bildirilir.'
  }
];

export default function InternshipPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Structured Data - EducationalOccupationalCredential */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOccupationalCredential",
              "name": "Mevzuat GPT Staj Programı",
              "description": "Yazılım geliştirme, tasarım, veri analizi ve hukuk alanlarında staj fırsatları",
              "credentialCategory": "Internship",
              "competencyRequired": "Üniversite öğrencisi veya yeni mezun",
              "educationalLevel": "Undergraduate",
              "recognizedBy": {
                "@type": "Organization",
                "name": "Mevzuat GPT"
              }
            })
          }}
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-16 sm:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <GraduationCap className="h-10 w-10" />
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Staj Programı
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 mb-8">
                Kariyerinize değer katacak pratik deneyim kazanın
              </p>
              <p className="text-lg text-blue-50">
                Mevzuat GPT staj programı ile gerçek projelerde çalışın, profesyonel ağınızı genişletin 
                ve sektördeki deneyimli profesyonellerden öğrenin.
              </p>
            </div>
          </div>
        </section>

        {/* About Internship Program */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Staj Programı Hakkında
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Mevzuat GPT staj programı, üniversite öğrencileri ve yeni mezunlara gerçek dünya deneyimi 
                  sunmak için tasarlanmıştır. Stajyerlerimiz, aktif projelerde çalışarak pratik beceriler 
                  kazanır ve sektördeki profesyonellerle birlikte çalışma fırsatı bulur.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Target className="h-8 w-8 text-blue-600 dark:text-blue-400 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Program Süresi
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Staj programımız minimum 2 ay, maksimum 6 ay sürmektedir. 
                      Staj süresi, stajyerin durumuna ve proje gereksinimlerine göre esnek olarak ayarlanabilir.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <Lightbulb className="h-8 w-8 text-purple-600 dark:text-purple-400 mr-3" />
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                        Çalışma Şekli
                      </h3>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Staj programımız hem uzaktan hem de fiziksel olarak Kayseri ofisimizde gerçekleştirilebilir. 
                      Haftalık çalışma saatleri esnek olup, stajyerin okul programına göre ayarlanabilir.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Internship Areas */}
        <section className="py-16 sm:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Staj Alanları
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Aşağıdaki alanlarda staj fırsatları sunuyoruz
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {internshipAreas.map((area, index) => {
                const Icon = area.icon;
                return (
                  <Card key={index} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <CardTitle className="text-xl text-gray-900 dark:text-gray-100">
                          {area.title}
                        </CardTitle>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        {area.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-2 text-sm">
                        Öğreneceğiniz Beceriler:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {area.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                Staj Programının Avantajları
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Staj programımıza katılarak neler kazanacaksınız?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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

        {/* Application Process */}
        <section className="py-16 sm:py-20 bg-white dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Başvuru Süreci
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Staj programımıza başvurmak için aşağıdaki adımları takip edin
                </p>
              </div>

              <div className="space-y-6">
                {processSteps.map((step) => (
                  <Card key={step.step} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
                    <CardContent className="p-6">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                          {step.step}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                            {step.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Requirements */}
        <section className="py-16 sm:py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                  Başvuru Gereksinimleri
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Staj programımıza başvurmak için gereken kriterler
                </p>
              </div>

              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <CardContent className="p-8">
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Üniversite öğrencisi veya yeni mezun olmak
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        İlgilendiğiniz alanda temel bilgi ve becerilere sahip olmak
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Öğrenmeye açık ve ekip çalışmasına yatkın olmak
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Minimum 2 ay staj yapabilecek olmak
                      </span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="h-5 w-5 mr-3 mt-1 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">
                        Özgeçmiş ve motivasyon mektubu hazırlamak
                      </span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 sm:py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="flex justify-center mb-6">
                <Rocket className="h-16 w-16" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Staj Programımıza Başvurun
              </h2>
              <p className="text-xl text-blue-100 mb-8">
                Kariyerinize değer katacak bu fırsatı kaçırmayın. Özgeçmişinizi ve motivasyon mektubunuzu gönderin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:kariyer@mevzuatgpt.org?subject=Staj Programı Başvurusu"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Mail className="h-5 w-5 mr-2" />
                  Başvuru Yap
                </a>
                <a
                  href="/kariyer"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200 border-2 border-white/30"
                >
                  Kariyer Fırsatları
                  <ArrowRight className="h-5 w-5 ml-2" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

