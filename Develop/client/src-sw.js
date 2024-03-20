const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');

// Cache CSS, JavaScript, and Web Worker files
registerRoute(
  // Match CSS, JavaScript, and Web Worker files
  ({ request }) => request.destination === 'style' || request.destination === 'script' || request.destination === 'worker',
  // Use a CacheFirst strategy for these assets
  new CacheFirst({
    cacheName: 'static-resources',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache only responses with status 0 or 200
      }),
      new ExpirationPlugin({
        maxEntries: 60, // Limit the number of entries in the cache
        maxAgeSeconds: 30 * 24 * 60 * 60, // Cache for 30 days
      }),
    ],
  }),
);

// Cache images
registerRoute(
  // Match image files
  ({ request }) => request.destination === 'image',
  // Use a CacheFirst strategy for images
  new CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache only responses with status 0 or 200
      }),
      new ExpirationPlugin({
        maxEntries: 50, // Limit the number of entries in the cache
        maxAgeSeconds: 60 * 24 * 60 * 60, // Cache for 60 days
        purgeOnQuotaError: true, // Automatically delete caches if quota is exceeded
      }),
    ],
  }),
);
