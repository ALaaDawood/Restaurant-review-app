var staticCacheName = 'rrapp-chache-v1';

/**
 * Get All the resources wa want to chache in an array
 */
const assets = [
    'index.html',
    'js/main.js',
    'js/restaurant_info.js',
    'js/dbhelper.js',
    'css/styles.css',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    '/data / restaurants.json',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
];
/**
 *Install the service worker and cache all the pages needed for the offline app
 *from the assets array
 */
self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(staticCacheName)
            .then((cache) => {
                return cache.addAll(assets);
            })
    );
});
/**
 *Activate the service worker and if there is an old cache, delete it
 */
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return promise.all(
                    cacheNames.filter(function (cacheName) {
                        return chacheName.startsWith('rrapp-') && cacheName != staticCacheName;
                    }).map(function (cacheName) {
                        return caches.delete(cacheName);
                    })
                );
            })
    );
});
/**
 *fetch all requests and match them with the cache to make them respond alike
 */
self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                return response || fetch(event.request);
            })
    );
});