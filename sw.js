// Service Worker for EVERMIND - Offline-first mode
const CACHE_NAME = 'evermind-v1';
const OFFLINE_QUEUE_KEY = 'evermind-offline-queue';

// Files to cache for offline use
const CACHE_FILES = [
    '/',
    '/index.html',
    '/main.js',
    '/style.css',
    '/manifest.json'
];

// Install event - cache app shell
self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app shell files');
                return cache.addAll(CACHE_FILES);
            })
            .then(() => {
                console.log('Service Worker installed successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker installation failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== CACHE_NAME) {
                            console.log('Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip API requests (they should be handled by background sync)
    if (url.pathname.startsWith('/api/')) {
        return;
    }
    
    event.respondWith(
        caches.match(request)
            .then((cachedResponse) => {
                if (cachedResponse) {
                    console.log('Serving from cache:', request.url);
                    return cachedResponse;
                }
                
                console.log('Fetching from network:', request.url);
                return fetch(request)
                    .then((response) => {
                        // Don't cache non-successful responses
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response for caching
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(request, responseToCache);
                            });
                        
                        return response;
                    })
                    .catch(() => {
                        // Return offline page for navigation requests
                        if (request.mode === 'navigate') {
                            return caches.match('/index.html');
                        }
                        
                        // Return a basic offline response for other requests
                        return new Response('Offline content not available', {
                            status: 503,
                            statusText: 'Service Unavailable',
                            headers: new Headers({
                                'Content-Type': 'text/plain'
                            })
                        });
                    });
            })
    );
});

// Background Sync for offline queue
self.addEventListener('sync', (event) => {
    console.log('Background sync triggered:', event.tag);
    
    if (event.tag === 'evermind-sync') {
        event.waitUntil(syncOfflineQueue());
    }
});

// Sync offline queue with server
async function syncOfflineQueue() {
    try {
        const queue = await getOfflineQueue();
        if (queue.length === 0) {
            console.log('No offline items to sync');
            return;
        }
        
        console.log(`Syncing ${queue.length} offline items`);
        
        const results = await Promise.allSettled(
            queue.map(item => syncOfflineItem(item))
        );
        
        // Remove successfully synced items
        const successfulItems = [];
        const failedItems = [];
        
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                successfulItems.push(queue[index]);
            } else {
                failedItems.push(queue[index]);
                console.error('Failed to sync item:', queue[index], result.reason);
            }
        });
        
        // Update queue with only failed items
        await setOfflineQueue(failedItems);
        
        // Notify clients about sync results
        const clients = await self.clients.matchAll();
        clients.forEach(client => {
            client.postMessage({
                type: 'SYNC_RESULT',
                successful: successfulItems.length,
                failed: failedItems.length,
                total: queue.length
            });
        });
        
        console.log(`Sync completed: ${successfulItems.length} successful, ${failedItems.length} failed`);
        
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Sync individual offline item
async function syncOfflineItem(item) {
    const { method, url, body, headers } = item;
    
    const response = await fetch(url, {
        method,
        headers: new Headers(headers),
        body: body ? JSON.stringify(body) : undefined
    });
    
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return response.json();
}

// Get offline queue from IndexedDB
async function getOfflineQueue() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('evermind-offline', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['queue'], 'readonly');
            const store = transaction.objectStore('queue');
            const getAllRequest = store.getAll();
            
            getAllRequest.onsuccess = () => resolve(getAllRequest.result);
            getAllRequest.onerror = () => reject(getAllRequest.error);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('queue')) {
                db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

// Set offline queue in IndexedDB
async function setOfflineQueue(queue) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open('evermind-offline', 1);
        
        request.onerror = () => reject(request.error);
        request.onsuccess = () => {
            const db = request.result;
            const transaction = db.transaction(['queue'], 'readwrite');
            const store = transaction.objectStore('queue');
            
            // Clear existing queue
            store.clear();
            
            // Add new items
            queue.forEach(item => store.add(item));
            
            transaction.oncomplete = () => resolve();
            transaction.onerror = () => reject(transaction.error);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('queue')) {
                db.createObjectStore('queue', { keyPath: 'id', autoIncrement: true });
            }
        };
    });
}

// Message event - handle messages from main thread
self.addEventListener('message', (event) => {
    const { type, data } = event.data;
    
    switch (type) {
        case 'SKIP_WAITING':
            self.skipWaiting();
            break;
            
        case 'CACHE_URLS':
            cacheUrls(data.urls);
            break;
            
        case 'QUEUE_OFFLINE_ITEM':
            queueOfflineItem(data);
            break;
            
        default:
            console.log('Unknown message type:', type);
    }
});

// Cache additional URLs
async function cacheUrls(urls) {
    try {
        const cache = await caches.open(CACHE_NAME);
        await cache.addAll(urls);
        console.log('Cached additional URLs:', urls);
    } catch (error) {
        console.error('Failed to cache URLs:', error);
    }
}

// Queue item for offline sync
async function queueOfflineItem(item) {
    try {
        const queue = await getOfflineQueue();
        queue.push({
            ...item,
            timestamp: Date.now()
        });
        await setOfflineQueue(queue);
        console.log('Queued offline item:', item);
    } catch (error) {
        console.error('Failed to queue offline item:', error);
    }
}