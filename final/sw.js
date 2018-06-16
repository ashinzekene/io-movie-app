const CACHE_NAME = 'cache_one';
const CACHE_FILES = [
  '/',
  '/index.html',
  '/offline.html',
  '/images/ic_refresh_white_24px.svg',
  '/images/no-wifi.png',
  '/images/calendar.jpg',
  '/styles/main.css',
  '/scripts/main.js',
  'https://movie-ease.herokuapp.com/movies/latest/1'
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

self.addEventListener('activate', e => {
  e.waitUntil(self.clients.claim());
});

// Deleting old cache
// self.addEventListener('activate', function(event) {
//   var cacheWhitelist = ['v2'];
//
//   event.waitUntil(
//     caches.keys().then(function(keyList) {
//       return Promise.all(keyList.map(function(key) {
//         if (cacheWhitelist.indexOf(key) === -1) {
//           return caches.delete(key);
//         }
//       }));
//     })
//   );
// });
