import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-gray-300 dark:text-gray-600">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/">
              Ana Sayfaya Dön
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link href="/mevzuat">
              Mevzuat Listesi
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Eğer bu sayfanın burada olması gerektiğini düşünüyorsanız,</p>
          <p>lütfen bizimle iletişime geçin.</p>
        </div>
      </div>
    </div>
  );
}
