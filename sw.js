const CACHE_NAME = 'asset-helper-v2'; // 更新版本號

// 1. 安裝時快取基本檔案
self.addEventListener('install', (event) => {
    // 強制跳過等待，讓新的 SW 立即生效
    self.skipWaiting();
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll([
                './',
                './index.html',
                './invest.html', 
                './manifest.json',
                './logo.png' // 改用通用的 logo.png
            ]);
        })
    );
});

// 2. 激活時清理舊版本快取 (避免網頁內容不更新)
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log('正在清理舊快取:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// 3. 攔截請求
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // 如果快取有就用快取，沒有就去網路抓
            // 對於 API 或 Google Sheet 資料，建議優先抓網路，失敗才用快取
            return response || fetch(event.request);
        })
    );
});
