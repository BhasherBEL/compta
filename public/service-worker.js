const version = "v0.2::"

self.addEventListener("fetch", (event) => {

    if (event.request.method !== 'GET') {
        return;
    }
    event.respondWith(
        caches
            .match(event.request)
            .then(function(cached) {
                var networked = fetch(event.request)
                    .then(fetchedFromNetwork, unableToResolve)
                    .catch(unableToResolve);

                return cached || networked;

                function fetchedFromNetwork(response) {
                    var cacheCopy = response.clone();

                    caches
                        .open(version + 'pages')
                        .then((cache) => {
                            cache.put(event.request, cacheCopy);
                        })

                    return response;
                }

                function unableToResolve () {

                    return new Response('<h1>Service Unavailable</h1>', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: new Headers({
                            'Content-Type': 'text/html'
                        })
                    });
                }
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function (keys) {
            return Promise.all(
                keys.filter((key) => key !== (version + 'pages'))
                    .map(key => caches.delete(key))
            );
        })
    );
});