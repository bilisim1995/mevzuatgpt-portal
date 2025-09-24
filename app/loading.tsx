export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Yükleniyor...
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Sayfa yükleniyor, lütfen bekleyin.
        </p>
      </div>
    </div>
  );
}
