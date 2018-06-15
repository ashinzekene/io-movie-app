const CACHE_NAME = 'cache_one';
const CACHE_URLS = [
  '/src',
  '/src/images/ic_refresh_white_24px.svg',
  '/src/index.html',
  '/src/styles/main.css',
  '/src/styles/main.js'
];

cache_request_url = 'https://movie-ease.herokuapp.com/api/movies/latest/1';

self.addEventListener('install', e => {
  e.waitUntil(() => {
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(CACHE_URLS);
    });
  });
});
