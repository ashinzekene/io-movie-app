const CACHE_NAME = 'cache_one';
const CACHE_URLS = ['/src', '/src/index.html', '/src/styles/main.css', '/src/styles/main.js'];

self.addEventListener('install', e => {
  e.waitUntil(() => {
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(CACHE_URLS);
    });
  });
});
