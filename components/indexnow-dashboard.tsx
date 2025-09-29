"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle, XCircle, RefreshCw } from '@/components/icon-components';

interface IndexNowStatus {
  key: string;
  keyLocation: string;
  apiEndpoint: string;
  supportedEngines: string[];
}

interface IndexNowResult {
  success: boolean;
  message: string;
  urls: string[];
  results: Array<{
    engine: string;
    status: 'fulfilled' | 'rejected';
    success: boolean;
  }>;
}

export function IndexNowDashboard() {
  const [status, setStatus] = useState<IndexNowStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [testResult, setTestResult] = useState<IndexNowResult | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    loadStatus();
  }, []);

  const loadStatus = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/indexnow');
      const data = await response.json();
      setStatus(data);
    } catch (error) {
      console.error('IndexNow status yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const testIndexNow = async () => {
    try {
      setTesting(true);
      const response = await fetch('/api/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          key: 'mevzuatgpt-indexnow-2024-key',
          urls: ['https://mevzuatgpt.org']
        })
      });
      
      const result = await response.json();
      setTestResult(result);
    } catch (error) {
      console.error('IndexNow test başarısız:', error);
      setTestResult({
        success: false,
        message: 'Test başarısız',
        urls: [],
        results: []
      });
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            IndexNow Dashboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-600">Yükleniyor...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* IndexNow Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-500" />
            IndexNow Durumu
          </CardTitle>
          <CardDescription>
            Arama motorlarına hızlı içerik bildirimi sistemi
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                API Endpoint
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                {status?.apiEndpoint || 'Yükleniyor...'}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Key Location
              </label>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                {status?.keyLocation || 'Yükleniyor...'}
              </p>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Desteklenen Arama Motorları
            </label>
            <div className="flex flex-wrap gap-2 mt-2">
              {status?.supportedEngines.map((engine, index) => (
                <Badge key={index} variant="secondary">
                  {engine}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Section */}
      <Card>
        <CardHeader>
          <CardTitle>IndexNow Test</CardTitle>
          <CardDescription>
            IndexNow API'sini test edin ve sonuçları görün
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button 
            onClick={testIndexNow} 
            disabled={testing}
            className="w-full sm:w-auto"
          >
            {testing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Test Ediliyor...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                IndexNow Test Et
              </>
            )}
          </Button>

          {testResult && (
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                {testResult.success ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">
                  {testResult.success ? 'Başarılı' : 'Başarısız'}
                </span>
              </div>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {testResult.message}
              </p>

              {testResult.results.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Arama Motoru Sonuçları:</h4>
                  {testResult.results.map((result, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      {result.success ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span>{result.engine}</span>
                      <Badge variant={result.success ? "default" : "destructive"}>
                        {result.success ? 'Başarılı' : 'Başarısız'}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Usage Instructions */}
      <Card>
        <CardHeader>
          <CardTitle>Kullanım Talimatları</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <h4>1. Environment Variables</h4>
            <p>`.env.local` dosyasına ekleyin:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
{`INDEXNOW_KEY=mevzuatgpt-indexnow-2024-key`}
            </pre>

            <h4>2. Manuel Bildirim</h4>
            <p>API endpoint'ine POST isteği gönderin:</p>
            <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm">
{`POST /api/indexnow
{
  "key": "mevzuatgpt-indexnow-2024-key",
  "urls": ["https://mevzuatgpt.org/mevzuat/example-id"]
}`}
            </pre>

            <h4>3. Otomatik Bildirim</h4>
            <p>Yeni mevzuat sayfaları otomatik olarak IndexNow'a bildirilir.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
