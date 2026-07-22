const CACHE="brightsteps-2.1.2";
const AUDIO=["a","ai","air","ar","b","c","ch","d","e","ear","ee","er","f","g","h","i","igh","j","l","m","n","ng","o","oa","oi","oo","ooo","or","ow","p","qu","r","s","sh","t","th","u","ur","ure","v","w","x","y","z"].map(x=>`./audio/phonemes/${x}.m4a`);
const SHELL=["./","./index.html","./styles.css","./app.js","./manifest.webmanifest","./icons/icon-192.png","./icons/icon-512.png"];
self.addEventListener("install",event=>event.waitUntil((async()=>{const c=await caches.open(CACHE);await c.addAll(SHELL);await Promise.allSettled(AUDIO.map(x=>c.add(x)));self.skipWaiting()})()));
self.addEventListener("activate",event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k!==CACHE)await caches.delete(k);await self.clients.claim()})()));
self.addEventListener("fetch",event=>{if(event.request.method!=="GET")return;event.respondWith((async()=>{const cached=await caches.match(event.request);if(cached)return cached;try{const res=await fetch(event.request);if(res&&res.ok){const c=await caches.open(CACHE);c.put(event.request,res.clone())}return res}catch{return caches.match("./index.html")}})())});
