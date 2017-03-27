console.log("serviceWorker up and running!");

let CACHE = [
  "/",
  "/scripts/app.js",
  "/styles/main.css",
  "/data/manifest.json",
  "/styles/animations.css",
  "/scripts/register.js",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "sw-cache.js"
];

let CACHE_VERSION = ["4"];

let install = function(event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then(cache => cache.addAll(CACHE)).then(
  caches.keys().then(function(keyList) {
    return Promise.all(keyList.map(function(key) {
      if (CACHE_VERSION.indexOf(key) === -1) return caches.delete(key);
    }));
    })
  )
)
  console.log("installed.")
}

this.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(r) {
      return r || fetch(event.request)
      }
    ).catch(err => console.log(err))
  )
}
)

this.addEventListener("install", install);
