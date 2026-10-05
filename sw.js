const CACHE = 'smart-reader-v16';
const FILES = ['./', 'index.html', 'fonts.css', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png',
  'fonts/f1.ttf','fonts/f2.ttf','fonts/f3.ttf','fonts/f4.ttf','fonts/f5.ttf','fonts/f6.ttf','fonts/f7.ttf','fonts/f8.ttf','lib/pdf.min.js','lib/pdf.worker.min.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request)));
});