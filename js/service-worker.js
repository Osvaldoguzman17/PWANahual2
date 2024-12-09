self.addEventListener("fetch", event => {
    // Interceptar las solicitudes a la API y cachear la respuesta
    if (event.request.url.includes("https://nahual-eae72-default-rtdb.firebaseio.com/.json")) {
        event.respondWith(
            caches.match(event.request).then(response => {
                if (response) {
                    // Si ya hay una respuesta en caché, devuélvela
                    return response;
                }
                // Si no está en caché, realiza la solicitud de red
                return fetch(event.request).then(networkResponse => {
                    // Cachear la nueva respuesta antes de devolverla
                    caches.open(CACHE_NAME).then(cache => {
                        cache.put(event.request, networkResponse.clone());
                    });
                    return networkResponse;
                });
            })
        );
    } else {
        // Para otras solicitudes, responde con el caché o haz la solicitud de red
        event.respondWith(
            caches.match(event.request).then(response => {
                return response || fetch(event.request);
            })
        );
    }
});
