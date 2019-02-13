importScripts('/my-doctor-ssr/h5/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/my-doctor-ssr/h5/0253d7b05c815047e16a.js",
    "revision": "a6e76003e3d70bb551af463a1af5e994"
  },
  {
    "url": "/my-doctor-ssr/h5/619999ad1e036c6a55ad.js",
    "revision": "f412b02a1efcb939482557cb9266b91d"
  },
  {
    "url": "/my-doctor-ssr/h5/630ef9531087ebf4312a.js",
    "revision": "267213c19598fc852c76ca6d98a4d76d"
  },
  {
    "url": "/my-doctor-ssr/h5/86184a9eba60358dd78f.js",
    "revision": "6c473938454bc4f78a49565993fb5324"
  }
], {
  "cacheId": "my-doctor-nuxt-ssr",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/my-doctor-ssr/h5/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/.*'), workbox.strategies.networkFirst({}), 'GET')
