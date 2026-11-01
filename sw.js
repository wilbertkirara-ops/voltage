var CACHE='voltline-v5';
var ASSETS=['./','./index.html','./tracker.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',function(e){
  e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));
});
self.addEventListener('activate',function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));
  }).then(function(){return self.clients.claim();}));
});
self.addEventListener('fetch',function(e){
  if(e.request.method!=='GET') return;
  // Only handle our own files. Satellite tiles and Leaflet (other domains)
  // go straight to the network, so they never fall back to the app shell.
  if(new URL(e.request.url).origin!==self.location.origin) return;
  e.respondWith(caches.match(e.request).then(function(r){
    return r || fetch(e.request).then(function(resp){
      var copy=resp.clone();
      caches.open(CACHE).then(function(c){ try{c.put(e.request,copy);}catch(err){} });
      return resp;
    }).catch(function(){ return caches.match('./index.html'); });
  }));
});
