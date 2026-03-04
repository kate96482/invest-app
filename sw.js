const CACHE_NAME = 'asset-helper-v1';

// 安裝時快取基本檔案（包含首頁、子網頁、設定檔與圖示）
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './invest.html', 
                './manifest.json',
                './icon-192.png',
                './icon-512.png'
            ]);
        })
    );
});

// 攔截請求，確保沒網路也能開
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // 如果快取有就用快取，沒有就去網路抓
            return response || fetch(event.request);
        })
    );
});
