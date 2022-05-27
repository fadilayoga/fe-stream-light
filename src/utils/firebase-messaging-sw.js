/* eslint-disable no-undef */
import { initializeApp } from 'firebase/app'
import { getMessaging } from 'firebase/messaging/sw'

initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
})

self.addEventListener('notificationclick', function (event) {
  const url = event.notification?.data?.FCM_MSG?.data?.link
  event.notification.close() // Android needs explicit close.
  if (!url) return
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i]
        // If so, just focus it.
        if (client.url === url && 'focus' in client) {
          return client.focus()
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url)
      }
    })
  )
})

getMessaging()
