/* Vessel & Crew Inspection — iPhone PWA offline service worker */
const CACHE = 'vessel-crew-inspection-pwa-fixed18-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './sw.js',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if(req.method !== 'GET') return;

  // The inspection is deliberately offline-first. Once the app shell is cached,
  // navigation and static resources do not depend on shipboard connectivity.
  if(req.mode === 'navigate'){
    event.respondWith(
      caches.match('./index.html').then(cached => {
        if(cached) return cached;
        return fetch(req).catch(() => caches.match('./index.html'));
      })
    );
    return;
  }

  event.respondWith(
    caches.match(req).then(cached => {
      if(cached) return cached;
      return fetch(req).then(resp => {
        if(resp && resp.ok && new URL(req.url).origin === self.location.origin){
          const copy = resp.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy)).catch(()=>{});
        }
        return resp;
      }).catch(() => Response.error());
    })
  );
});

self.addEventListener('message', event => {
  if(event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});
