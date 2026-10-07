// Dieser kleine Helfer merkt sich das Spiel, damit es auch ohne Internet startet.
// Mit Internet wird immer zuerst die neueste Fassung geholt.
const SPEICHER = "geisterjagd-1";
const DATEIEN = ["./", "manifest.webmanifest", "icon-192.png",
                 "fonts/baloo-2-latin-600-normal.woff2", "fonts/baloo-2-latin-800-normal.woff2"];

self.addEventListener("install", (e) => {
  self.skipWaiting();
  e.waitUntil(caches.open(SPEICHER).then((c) => c.addAll(DATEIEN)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
  const anfrage = e.request;
  if (anfrage.method !== "GET" || new URL(anfrage.url).origin !== location.origin) return;
  e.respondWith(
    fetch(anfrage)
      .then((antwort) => {
        const kopie = antwort.clone();
        caches.open(SPEICHER).then((c) => c.put(anfrage, kopie));
        return antwort;
      })
      .catch(() => caches.match(anfrage, { ignoreSearch: true }).then((gemerkt) => gemerkt || caches.match("./")))
  );
});
