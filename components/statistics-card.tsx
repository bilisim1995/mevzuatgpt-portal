"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { fetchStatistics, StatisticsData, BelgeTuruIstatistik } from '@/lib/api';

// Lazy load UI components
const Card = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.Card })), { ssr: false });
const CardContent = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardContent })), { ssr: false });
const CardHeader = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardHeader })), { ssr: false });
const CardTitle = dynamic(() => import('@/components/ui/card').then(mod => ({ default: mod.CardTitle })), { ssr: false });
const Skeleton = dynamic(() => import('@/components/ui/skeleton').then(mod => ({ default: mod.Skeleton })), { ssr: false });

// Lazy load icons
const Building2 = dynamic(() => import('lucide-react').then(mod => ({ default: mod.Building2 })), { ssr: false });
const FileText = dynamic(() => import('lucide-react').then(mod => ({ default: mod.FileText })), { ssr: false });
const BarChart3 = dynamic(() => import('lucide-react').then(mod => ({ default: mod.BarChart3 })), { ssr: false });
const TrendingUp = dynamic(() => import('lucide-react').then(mod => ({ default: mod.TrendingUp })), { ssr: false });

export function StatisticsCard() {
  const [statistics, setStatistics] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStatistics() {
      try {
        const data = await fetchStatistics();
        setStatistics(data);
      } catch (error) {
        console.error('İstatistikler yüklenemedi:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStatistics();
  }, []);

  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-pink-900/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl">
              <CardHeader>
                <Skeleton className="h-8 w-48 mb-4" />
                <Skeleton className="h-4 w-64" />
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className="h-32" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  if (!statistics) {
    return null;
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('tr-TR').format(num);
  };

  // API'den gelen diğer verileri dinamik olarak al
  const getAdditionalStats = () => {
    const knownKeys = ['total_kurumlar', 'total_belgeler', 'belge_turu_istatistik'];
    const additionalStats: Array<{ key: string; value: any }> = [];
    
    Object.keys(statistics).forEach((key) => {
      if (!knownKeys.includes(key) && statistics[key] !== null && statistics[key] !== undefined) {
        // Sadece sayısal değerleri veya array'leri göster
        if (typeof statistics[key] === 'number' || Array.isArray(statistics[key])) {
          additionalStats.push({ key, value: statistics[key] });
        }
      }
    });
    
    return additionalStats;
  };

  const additionalStats = getAdditionalStats();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-900/20 dark:to-pink-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-2xl overflow-hidden">
            {/* Header */}
            <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 text-white pb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl sm:text-3xl font-bold text-white mb-1">
                    Platform İstatistikleri
                  </CardTitle>
                  <p className="text-sm text-indigo-100 dark:text-indigo-200">
                    MevzuatGPT veritabanındaki güncel sayılar
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              {/* Ana İstatistikler */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                {/* Toplam Kurumlar */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 p-6 border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="p-2 bg-blue-500 dark:bg-blue-600 rounded-lg">
                          <Building2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Toplam Kurumlar</span>
                      </div>
                      <p className="text-3xl sm:text-4xl font-bold text-blue-900 dark:text-blue-100">
                        {formatNumber(statistics.total_kurumlar)}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Aktif kamu kurumları</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-400 dark:text-blue-500 opacity-50" />
                  </div>
                </div>

                {/* Toplam Belgeler */}
                <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/30 dark:to-emerald-800/30 p-6 border border-green-200 dark:border-green-800 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="p-2 bg-green-500 dark:bg-green-600 rounded-lg">
                          <FileText className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-sm font-medium text-green-700 dark:text-green-300">Toplam Belgeler</span>
                      </div>
                      <p className="text-3xl sm:text-4xl font-bold text-green-900 dark:text-green-100">
                        {formatNumber(statistics.total_belgeler)}
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">Yüklü mevzuat metinleri</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-400 dark:text-green-500 opacity-50" />
                  </div>
                </div>
              </div>

              {/* Belge Türü İstatistikleri */}
              {statistics.belge_turu_istatistik && statistics.belge_turu_istatistik.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Belge Türüne Göre Dağılım</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {statistics.belge_turu_istatistik.map((item: BelgeTuruIstatistik, index: number) => {
                      const percentage = statistics.total_belgeler > 0 
                        ? Math.round((item.count / statistics.total_belgeler) * 100) 
                        : 0;
                      
                      const colors = [
                        'from-blue-500 to-blue-600',
                        'from-purple-500 to-purple-600',
                        'from-pink-500 to-pink-600',
                        'from-indigo-500 to-indigo-600',
                        'from-cyan-500 to-cyan-600',
                        'from-orange-500 to-orange-600'
                      ];
                      const darkColors = [
                        'dark:from-blue-600 dark:to-blue-700',
                        'dark:from-purple-600 dark:to-purple-700',
                        'dark:from-pink-600 dark:to-pink-700',
                        'dark:from-indigo-600 dark:to-indigo-700',
                        'dark:from-cyan-600 dark:to-cyan-700',
                        'dark:from-orange-600 dark:to-orange-700'
                      ];
                      const bgColors = [
                        'bg-blue-50 dark:bg-blue-900/20',
                        'bg-purple-50 dark:bg-purple-900/20',
                        'bg-pink-50 dark:bg-pink-900/20',
                        'bg-indigo-50 dark:bg-indigo-900/20',
                        'bg-cyan-50 dark:bg-cyan-900/20',
                        'bg-orange-50 dark:bg-orange-900/20'
                      ];
                      const borderColors = [
                        'border-blue-200 dark:border-blue-800',
                        'border-purple-200 dark:border-purple-800',
                        'border-pink-200 dark:border-pink-800',
                        'border-indigo-200 dark:border-indigo-800',
                        'border-cyan-200 dark:border-cyan-800',
                        'border-orange-200 dark:border-orange-800'
                      ];
                      const textColors = [
                        'text-blue-700 dark:text-blue-300',
                        'text-purple-700 dark:text-purple-300',
                        'text-pink-700 dark:text-pink-300',
                        'text-indigo-700 dark:text-indigo-300',
                        'text-cyan-700 dark:text-cyan-300',
                        'text-orange-700 dark:text-orange-300'
                      ];
                      
                      const colorIndex = index % colors.length;
                      
                      return (
                        <div 
                          key={item.belge_turu}
                          className={`rounded-lg p-4 border ${bgColors[colorIndex]} ${borderColors[colorIndex]} hover:shadow-md transition-all duration-300`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-semibold ${textColors[colorIndex]}`}>
                              {item.belge_turu}
                            </span>
                            <span className={`text-lg font-bold ${textColors[colorIndex]}`}>
                              {formatNumber(item.count)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-full bg-gradient-to-r ${colors[colorIndex]} ${darkColors[colorIndex]} transition-all duration-500`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                            %{percentage}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* API'den Gelen Diğer İstatistikler */}
              {additionalStats.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    <span>Diğer İstatistikler</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {additionalStats.map((stat, index) => {
                      const colors = [
                        'from-teal-500 to-teal-600',
                        'from-rose-500 to-rose-600',
                        'from-violet-500 to-violet-600',
                        'from-amber-500 to-amber-600',
                        'from-emerald-500 to-emerald-600',
                        'from-sky-500 to-sky-600'
                      ];
                      const darkColors = [
                        'dark:from-teal-600 dark:to-teal-700',
                        'dark:from-rose-600 dark:to-rose-700',
                        'dark:from-violet-600 dark:to-violet-700',
                        'dark:from-amber-600 dark:to-amber-700',
                        'dark:from-emerald-600 dark:to-emerald-700',
                        'dark:from-sky-600 dark:to-sky-700'
                      ];
                      const bgColors = [
                        'bg-teal-50 dark:bg-teal-900/20',
                        'bg-rose-50 dark:bg-rose-900/20',
                        'bg-violet-50 dark:bg-violet-900/20',
                        'bg-amber-50 dark:bg-amber-900/20',
                        'bg-emerald-50 dark:bg-emerald-900/20',
                        'bg-sky-50 dark:bg-sky-900/20'
                      ];
                      const borderColors = [
                        'border-teal-200 dark:border-teal-800',
                        'border-rose-200 dark:border-rose-800',
                        'border-violet-200 dark:border-violet-800',
                        'border-amber-200 dark:border-amber-800',
                        'border-emerald-200 dark:border-emerald-800',
                        'border-sky-200 dark:border-sky-800'
                      ];
                      const textColors = [
                        'text-teal-700 dark:text-teal-300',
                        'text-rose-700 dark:text-rose-300',
                        'text-violet-700 dark:text-violet-300',
                        'text-amber-700 dark:text-amber-300',
                        'text-emerald-700 dark:text-emerald-300',
                        'text-sky-700 dark:text-sky-300'
                      ];
                      
                      const colorIndex = index % colors.length;
                      const displayKey = stat.key.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
                      
                      // Eğer değer bir array ise (örn: başka bir istatistik listesi)
                      if (Array.isArray(stat.value)) {
                        return (
                          <div key={stat.key} className="col-span-full">
                            <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">
                              {displayKey}
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {stat.value.map((item: any, itemIndex: number) => {
                                const itemColorIndex = itemIndex % colors.length;
                                const itemKey = Object.keys(item)[0] || 'name';
                                const itemValue = item[itemKey] || item.count || item.value || item;
                                
                                return (
                                  <div 
                                    key={itemIndex}
                                    className={`rounded-lg p-4 border ${bgColors[itemColorIndex]} ${borderColors[itemColorIndex]} hover:shadow-md transition-all duration-300`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <span className={`text-sm font-semibold ${textColors[itemColorIndex]}`}>
                                        {typeof item === 'object' ? (item.name || item.label || itemKey) : 'Değer'}
                                      </span>
                                      <span className={`text-lg font-bold ${textColors[itemColorIndex]}`}>
                                        {typeof itemValue === 'number' ? formatNumber(itemValue) : String(itemValue)}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      }
                      
                      // Eğer değer bir sayı ise
                      if (typeof stat.value === 'number') {
                        return (
                          <div 
                            key={stat.key}
                            className={`rounded-lg p-4 border ${bgColors[colorIndex]} ${borderColors[colorIndex]} hover:shadow-md transition-all duration-300`}
                          >
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-semibold ${textColors[colorIndex]}`}>
                                {displayKey}
                              </span>
                              <span className={`text-lg font-bold ${textColors[colorIndex]}`}>
                                {formatNumber(stat.value)}
                              </span>
                            </div>
                          </div>
                        );
                      }
                      
                      return null;
                    })}
                  </div>
                </div>
              )}

              {/* SEO Odaklı Açıklama Metinleri */}
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div className="max-w-4xl mx-auto space-y-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed text-center">
                  <p>
                    <strong className="text-gray-900 dark:text-gray-100">MevzuatGPT Platformu</strong>, Türkiye'deki kamu kurumlarının resmi mevzuat metinlerini merkezi bir veritabanında toplayarak, vatandaşlar, hukukçular ve kamu görevlileri için erişilebilir bir kaynak sunmaktadır. Platformumuz, güncel genelgeler, yönetmelikler, tebliğler ve diğer resmi belgeleri dijital ortamda bir araya getirerek, mevzuat arama ve inceleme süreçlerini kolaylaştırmaktadır.
                  </p>
                  <p>
                    Veritabanımızda <strong className="text-gray-900 dark:text-gray-100">{formatNumber(statistics.total_kurumlar)} aktif kamu kurumu</strong> ve <strong className="text-gray-900 dark:text-gray-100">{formatNumber(statistics.total_belgeler)}'den fazla mevzuat metni</strong> bulunmaktadır. Bu kapsamlı koleksiyon, bakanlıklar, bağımsız düzenleyici kurumlar, belediyeler ve diğer kamu kuruluşlarının yayınladığı tüm resmi belgeleri içermektedir. Her belge, yayın tarihi, geçerlilik durumu ve kurum bilgileri ile birlikte detaylı olarak kategorize edilmiştir.
                  </p>
                  <p>
                    Platformumuz, yapay zeka destekli arama teknolojisi ile mevzuat metinlerinde hızlı ve doğru sonuçlar sunmaktadır. Kullanıcılar, kurum adı, belge türü, yayın tarihi veya içerik anahtar kelimeleri ile arama yaparak ilgili mevzuat metinlerine anında erişebilirler. Ayrıca, her belge için PDF formatında indirme seçeneği ve yapay zeka destekli soru-cevap özelliği bulunmaktadır.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

