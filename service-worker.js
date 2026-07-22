const CACHE = "brightsteps-3.2.0";
const PHONEMES = ["a","ai","air","ar","b","c","ch","d","e","ear","ee","er","f","g","h","i","igh","j","l","m","n","ng","o","oa","oi","oo","ooo","or","ow","p","qu","r","s","sh","t","th","u","ur","ure","v","w","x","y","z"];
const SHELL = ["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
const AUDIO = PHONEMES.map(name => `./audio/phonemes/${name}.m4a`);
self.addEventListener("install", event => event.waitUntil((async () => {
  const cache = await caches.open(CACHE);
  await cache.addAll(SHELL);
  await Promise.allSettled(AUDIO.map(file => cache.add(file)));
  await self.skipWaiting();
})()));
self.addEventListener("activate", event => event.waitUntil((async () => {
  for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key);
  await self.clients.claim();
})()));
self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith((async () => {
    const cached = await caches.match(event.request);
    if (cached) return cached;
    try {
      const response = await fetch(event.request);
      if (response && response.ok) {
        const cache = await caches.open(CACHE);
        cache.put(event.request, response.clone());
      }
      return response;
    } catch {
      if (event.request.mode === "navigate") return caches.match("./index.html");
      throw new Error("Offline and not cached");
    }
  })());
});
