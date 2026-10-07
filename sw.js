// CashFlow Service Worker - CLEAN CACHE VERSION
// Created by dee
// Versi ini menghapus cache lama dan TIDAK menyimpan index.html,
// sehingga perubahan di GitHub Pages selalu mengambil versi terbaru.

const VERSION = 'cashflow-clean-v4';

self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith('cashflow-') && key !== VERSION)
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  // Selalu ambil versi terbaru dari server.
  // Jika offline, gunakan cache hanya sebagai cadangan.
  event.respondWith(
    fetch(event.request)
      .then(response => {
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
