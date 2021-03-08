const CACHE_NAME = 'v1';
const urlsToCache = []
const self = this;


// Call Install Event
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
            console.log('Opened cache');
            //return cache.addAll()
        })
    )
    console.log('service worker: Installed');
});

// Call Fetch Event
self.addEventListener('fetch', e =>{
    console.log('Service Worker: Fetching');
    e.respondWith(fetch(e.request)
    .then(res => {
        // make copy
        const resClone = res.clone();
        //Open cache
        caches
        .open(CACHE_NAME)
        .then(cache =>{
            // add response to cache
            cache.put(e.request, resClone)
        });
        return res;
    }).catch((err)=>caches.match(e.request)).then((res => res)));
});


// Call Activate Event
self.addEventListener('activate', e=>{
    console.log('Service worker activated');
    console.log(caches.keys());
    e.waitUntil(
        caches.keys().then(cacheNames =>{
            console.log(cacheNames)
            return Promise.all(
                cacheNames.map(cache =>{
                    if(cache !== CACHE_NAME){
                        console.log('service worker clearing old cache');
                        return caches.delete(cache);
                    }
                })
            )
        })
    );
});

