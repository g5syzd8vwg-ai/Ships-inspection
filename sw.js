/* Vessel & Crew Inspection — iPhone PWA offline service worker */
const CACHE = 'vessel-crew-inspection-pwa-fixed45-certificates-screen-only-cache-v1';
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
    event.respondWith((async () => {
      // Online: refresh index.html from the server instead of serving stale
      // cached HTML. Offline: retain the installed iPhone PWA experience.
      const cached = await caches.match('./index.html');
      const abort = new AbortController();
      const timeout = setTimeout(() => abort.abort(), 4500);
      try {
        const response = await fetch(req, {cache:'no-store', signal:abort.signal});
        if(response && response.ok){
          const copy = response.clone();
          event.waitUntil(caches.open(CACHE).then(cache => cache.put('./index.html', copy)));
          return response;
        }
      } catch (e) { /* No network: use the cached app shell. */ }
      finally { clearTimeout(timeout); }
      return cached || Response.error();
    })());
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
