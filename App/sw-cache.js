console.log("serviceWorker up and running!");

let CACHE = [
  "index.html",
  "/scripts/app.js",
  "/styles/main.css",
  "/data/manifest.json",
];

let CACHE_VERSION = ["4"];

let install = function(event) {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      cache.addAll(CACHE);
  caches.keys().then(function(keyList) {
    return Promise.all(keyList.map(function(key) {
      if (CACHE_VERSION.indexOf(key) === -1) {
        return caches.delete(key);
      }
    }));
  })
    })
  )
  console.log("installed.")
}

this.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(r) {
      return r || fetch(event.request)
      }
    )
  )
}
)

this.addEventListener("install", install);
