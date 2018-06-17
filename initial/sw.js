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
      .then(function (cache) {
        return cache.addAll(CACHE_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(
      res =>
        res ||
        fetch(e.request)
          .then(response => {
            return response;
          })
          .catch(err => {
            console.log('An error occrred while fetching file', e.request.url, err);
            if (e.request.url.search('movie.html') > -1) {
              return caches.open(CACHE_NAME).then(cache => {
                return cache.match('/offline.html');
              });
            }
            return err;
          })
    )
  );
});