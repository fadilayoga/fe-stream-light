import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'

initializeApp({
  apiKey: process.env.VUE_APP_API_KEY,
  authDomain: process.env.VUE_APP_AUTH_DOMAIN,
  projectId: process.env.VUE_APP_PROJECT_ID,
  storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APP_ID,
})

const messaging = getMessaging()
const option = { vapidKey: process.env.VUE_APP_VAPID_KEY }

function showNotification(notificationTitle, notificationOptions) {
  Notification.requestPermission(function (result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function (registration) {
        registration.showNotification(notificationTitle, notificationOptions)
      })
    }
  })
}

onMessage(messaging, async (payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.data.icon,
  }
  showNotification(notificationTitle, notificationOptions)
})

const registrationToken = {
  getToken: async function () {
    let token
    try {
      token = await getToken(messaging, option)
    } catch (err) {
      throw {
        error: 'firebase_messaging',
        message: err,
      }
    }
    return { token }
  },
}

export default registrationToken
