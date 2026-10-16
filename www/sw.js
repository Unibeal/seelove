/* See Cat — service worker : l'app s'ouvre même avec une mauvaise connexion.
   Les pages et fichiers du site sont mis en cache ; les vidéos, Firebase et les images
   hébergées ailleurs ne sont jamais touchés (le navigateur s'en occupe). */
const V = 'seecat-v1';
const PRE = ['./', 'index.html', 'films.html', 'series.html', 'animes.html', 'liste.html', 'profils.html', 'auth.html',
  'contact.html', 'apropos.html', 'mentions-legales.html', 'offline.html', 'see-cat-intro.js', 'see-cat-app.js',
  'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(V);
    await Promise.all(PRE.map(u => c.add(u).catch(() => {})));
    self.skipWaiting();
  })());
});
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== V && k.startsWith('seecat-')) await caches.delete(k);
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', e => {
  const r = e.request;
  if (r.method !== 'GET') return;
  const u = new URL(r.url);
  if (u.origin !== location.origin) return;                       // Firebase, CDN, images externes : jamais touchés
  if (r.headers.has('range') || r.destination === 'video' || r.destination === 'audio') return;
  e.respondWith(r.mode === 'navigate' ? netFirst(r) : cacheFirst(r));
});
async function netFirst(r) {
  const c = await caches.open(V);
  try {
    const res = await Promise.race([fetch(r), new Promise((_, j) => setTimeout(() => j('timeout'), 4500))]);
    if (res && res.ok) c.put(r, res.clone());
    return res;
  } catch (_) {
    return (await c.match(r, { ignoreSearch: true })) || (await c.match('offline.html'));
  }
}
async function cacheFirst(r) {
  const c = await caches.open(V), m = await c.match(r);
  if (m) { fetch(r).then(res => { if (res && res.ok) c.put(r, res); }).catch(() => {}); return m; }
  try { const res = await fetch(r); if (res && res.ok) c.put(r, res.clone()); return res; } catch (_) { return Response.error(); }
}
