const CACHE_NAME = 'tekenmoment-v5';
const APP_SHELL = [
  '/',
  '/index.html',
  '/assets/app.js',
  '/assets/index.css',
  '/manifest.webmanifest',
  '/icon.svg',
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ).then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isAppShell =
    url.origin === self.location.origin &&
    (url.pathname === '/' ||
      url.pathname === '/index.html' ||
      url.pathname.startsWith('/assets/') ||
      url.pathname === '/service-worker.js' ||
      url.pathname === '/manifest.webmanifest');

  // Prefer fresh app files so prompt updates appear after a NAS redeploy.
  if (isAppShell) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          void caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request)),
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => cachedResponse || fetch(event.request)),
  );
});
