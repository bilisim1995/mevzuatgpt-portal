import type { Metadata } from 'next';
import { Footer } from '@/components/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, MessageSquare, Phone, MapPin, Clock, Send } from 'lucide-react';
import dynamic from 'next/dynamic';

const Header = dynamic(() => import('@/components/header').then(mod => ({ default: mod.Header })), {
  ssr: false
});

export const metadata: Metadata = {
  title: 'İletişim',
  description: 'Mevzuat GPT ile iletişime geçin. Sorularınız, önerileriniz ve geri bildirimleriniz için bizimle iletişim kurun.',
  keywords: ['iletişim', 'destek', 'geri bildirim', 'Mevzuat GPT', 'yardım'],
  openGraph: {
    title: 'İletişim | Mevzuat GPT',
    description: 'Mevzuat GPT ile iletişime geçin. Sorularınız, önerileriniz ve geri bildirimleriniz için bizimle iletişim kurun.',
    type: 'website',
  },
  alternates: {
    canonical: '/iletisim',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 bg-gray-50 dark:bg-gray-900">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700"></div>
          
          <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100">
                  İletişim
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Sorularınız, önerileriniz ve geri bildirimleriniz bizim için değerli
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              
              {/* Contact Form */}
              <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                    <MessageSquare className="h-5 w-5" />
                    <span>Bize Yazın</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Ad Soyad
                        </label>
                        <Input 
                          placeholder="Adınız ve soyadınız"
                          className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          E-posta
                        </label>
                        <Input 
                          type="email"
                          placeholder="ornek@email.com"
                          className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Konu
                      </label>
                      <Input 
                        placeholder="Mesajınızın konusu"
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Mesaj
                      </label>
                      <Textarea 
                        placeholder="Mesajınızı buraya yazın..."
                        rows={6}
                        className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
                      />
                    </div>
                    
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
                      <Send className="h-4 w-4 mr-2" />
                      Mesaj Gönder
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="space-y-8">
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
                      <Mail className="h-5 w-5" />
                      <span>İletişim Bilgileri</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">E-posta</h4>
                          <p className="text-gray-600 dark:text-gray-300">info@mevzuatgpt.org</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Genel sorular ve destek</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <MessageSquare className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">Teknik Destek</h4>
                          <p className="text-gray-600 dark:text-gray-300">destek@mevzuatgpt.org</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Platform kullanımı ve teknik sorunlar</p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                          <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-gray-100">Çalışma Saatleri</h4>
                          <p className="text-gray-600 dark:text-gray-300">Pazartesi - Cuma</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">09:00 - 18:00 (GMT+3)</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* FAQ Quick Links */}
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-gray-900 dark:text-gray-100">Sık Sorulan Sorular</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Platform ücretsiz mi?
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Evet, Mevzuat GPT tamamen ücretsizdir ve herkese açıktır.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Mevzuatlar ne sıklıkla güncellenir?
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Mevzuat metinleri günlük olarak kontrol edilir ve yeni yayınlanan metinler hızla eklenir.
                        </p>
                      </div>
                      
                      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-2">
                          Yapay zeka asistanı nasıl çalışır?
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          AI asistanımız mevzuat metinlerini analiz ederek sorularınıza hızlı ve doğru cevaplar verir.
                        </p>
                      </div>
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