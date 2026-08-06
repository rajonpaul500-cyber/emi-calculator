/* EMI Master Service Worker - Offline-first PWA */
var CACHE_NAME = 'emimaster-v1';
var OFFLINE_URL = 'index.html';

var PRECACHE = [
  './',
  './index.html',
  './css/style.css',
  './js/common.js',
  './js/currency.js',
  './js/emi.js',
  './js/mortgage.js',
  './js/investment.js',
  './js/retirement.js',
  './js/depreciation.js',
  './js/chart.js',
  './js/seo-content.js',
  './logo.svg',
  './favicon.svg',
  './manifest.json'
];

self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(PRECACHE);
    }).then(function () {
      return self.skipWaiting();
    })
  );
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(keyList.map(function (key) {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    }).then(function () {
      return self.clients.claim();
    })
  );
});

self.addEventListener('fetch', function (event) {
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(function (cached) {
      var networkFetch = fetch(event.request).then(function (response) {
        if (response && response.status === 200 && response.type === 'basic') {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function (cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function () {
        return cached;
      });
      return cached || networkFetch;
    })
  );
});
