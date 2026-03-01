const CACHE_NAME = 'asset-helper-v1';

// 安裝時快取基本檔案
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(['./', './index.html', './manifest.json']);
        })
    );
});

// 攔截請求，確保沒網路也能開
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
