
const assets = [
 'generator.html',
 'generator.css',
 'generator.js',
 'sw.js',
 'manifest.json',
 'icon.png'
];

const cacheName = "IMAGE GENERATOR App";

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(assets);
    })
  );
})


self.addEventListener('fetch',e => {
  e.respondWith(
     caches.match(e.request).then(response => {
       return response ? response : fetch(e.request)
     })
    )
})
