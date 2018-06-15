const CACHE_NAME = 'cache_one';
const CACHE_FILES = [
  '/src/',
  '/src/index.html',
  '/src/offline.html',
  '/src/movie.html',
  '/src/images/ic_refresh_white_24px.svg',
  '/src/styles/main.css',
  '/src/scripts/main.js',
  'https://movie-ease.herokuapp.com/api/movies/latest/1'
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

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(
      res =>
        res
          ? res
          : fetch(e.request)
              .then(response => {
                console.log(response);
                return response;
              })
              .catch(err => {
                console.log('An error occrred while fetching file', e.request.url, err);
                return caches.open(CACHE_NAME).then(cache => {
                  return cache.match('/src/offline.html');
                });
              })
    )
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});
