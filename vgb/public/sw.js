/* Video Games Battle — service worker (cache shell PWA) */
const CACHE_NAME = 'vgb-shell-v2';
const PRECACHE_URLS = [
  '/play.html',
  '/login.html',
  '/classement.html',
  '/regles.html',
  '/pieces.html',
  '/objets.html',
  '/manifest.webmanifest',
  '/css/common.css',
  '/css/header.css',
  '/css/global.css',
  '/js/header.js',
  '/js/online.js',
  '/js/translations.js',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/icons/icon-512-maskable.png',
  '/icons/apple-touch-icon.png',
  '/images/site/logo-video-games-battle-256.png',
  '/images/site/logo-video-games-battle-256.webp'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(PRECACHE_URLS).catch(() => undefined)
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // Ne pas mettre en cache les API (auth, match, etc.)
  if (url.pathname.startsWith('/api/')) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req).then((res) => {
        if (res && res.ok && (url.pathname.endsWith('.html') || url.pathname.startsWith('/css/') || url.pathname.startsWith('/js/') || url.pathname.startsWith('/icons/') || url.pathname.startsWith('/images/site/'))) {
          const copy = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, copy)).catch(() => {});
        }
        return res;
      }).catch(() => cached);

      return cached || network;
    })
  );
});
