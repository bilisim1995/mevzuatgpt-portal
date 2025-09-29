import { NextRequest, NextResponse } from 'next/server';

// IndexNow API endpoint
export async function POST(request: NextRequest) {
  try {
    const { urls, key } = await request.json();
    
    // IndexNow key doğrulama
    const expectedKey = process.env.INDEXNOW_KEY;
    if (!expectedKey || key !== expectedKey) {
      return NextResponse.json({ error: 'Invalid key' }, { status: 401 });
    }
    
    // URL'leri doğrula
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return NextResponse.json({ error: 'Invalid URLs' }, { status: 400 });
    }
    
    // MevzuatGPT domain kontrolü
    const baseUrl = 'https://mevzuatgpt.org';
    const validUrls = urls.filter(url => 
      url.startsWith(baseUrl) && 
      (url.includes('/mevzuat/') || url.includes('/kurum/') || url === baseUrl)
    );
    
    if (validUrls.length === 0) {
      return NextResponse.json({ error: 'No valid URLs' }, { status: 400 });
    }
    
    // IndexNow bildirimleri gönder
    const results = await Promise.allSettled([
      // Microsoft Bing IndexNow
      fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          host: 'mevzuatgpt.org',
          key: key,
          keyLocation: `${baseUrl}/indexnow-key.txt`,
          urlList: validUrls
        })
      }),
      
      // Yandex IndexNow
      fetch('https://yandex.com/indexnow', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          host: 'mevzuatgpt.org',
          key: key,
          keyLocation: `${baseUrl}/indexnow-key.txt`,
          urlList: validUrls
        })
      })
    ]);
    
    const successCount = results.filter(result => 
      result.status === 'fulfilled' && result.value.ok
    ).length;
    
    return NextResponse.json({
      success: true,
      message: `IndexNow bildirimi gönderildi. ${successCount}/2 arama motoru başarılı.`,
      urls: validUrls,
      results: results.map((result, index) => ({
        engine: index === 0 ? 'Microsoft Bing' : 'Yandex',
        status: result.status,
        success: result.status === 'fulfilled' && result.value.ok
      }))
    });
    
  } catch (error) {
    console.error('IndexNow API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

// GET endpoint - IndexNow key doğrulama
export async function GET() {
  return NextResponse.json({
    message: 'IndexNow API aktif',
    endpoints: {
      submit: 'POST /api/indexnow',
      key: '/indexnow-key.txt'
    },
    supportedEngines: ['Microsoft Bing', 'Yandex']
  });
}
