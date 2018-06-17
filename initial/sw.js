const CACHE_NAME = 'version_1';
const CACHE_FILES = [
  '/src',
  '/src/index.html',
  '/src/offline.html',
  '/src/',
  '/src/index.html',
  '/images/calendar.jpg',
  '/images/no-wifi.jpg',
  '/images/ic_refresh_white_24px.svg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches
      .open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(CACHE_FILES);
      })
      .then(() => self.skipWaiting())
  );
});
// self.addEventListener('fetch', e => {});
