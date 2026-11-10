const SHELL='cdd-shell-v1',TILES='cdd-tiles-v1';
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(SHELL).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==SHELL&&k!==TILES).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
let trimming=false;
async function trim(c){if(trimming)return;trimming=true;try{const k=await c.keys();if(k.length>8000)for(const x of k.slice(0,k.length-7000))await c.delete(x)}finally{trimming=false}}
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;const u=new URL(req.url);
  if(u.hostname.endsWith('basemaps.cartocdn.com')){
    e.respondWith(caches.open(TILES).then(async c=>{const hit=await c.match(req,{ignoreVary:true});if(hit)return hit;
      try{const r=await fetch(req);if(r.ok||r.type==='opaque'){c.put(req,r.clone());trim(c)}return r}catch(err){return new Response('',{status:504})}}));return}
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){
    e.respondWith(caches.open(SHELL).then(async c=>{const hit=await c.match(req);if(hit)return hit;const r=await fetch(req);if(r.ok||r.type==='opaque')c.put(req,r.clone());return r}));return}
  if(u.origin===location.origin){
    e.respondWith(fetch(req).then(r=>{if(r.ok){const cp=r.clone();caches.open(SHELL).then(c=>c.put(req,cp))}return r})
      .catch(()=>caches.match(req,{ignoreSearch:true}).then(r=>r||caches.match('./index.html'))))}
});
