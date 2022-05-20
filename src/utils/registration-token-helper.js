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

onMessage(messaging, (payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: 'https://maxst.icons8.com/vue-static/landings/page-index/products/logo/generatedPhotos.png',
  }

  if (Notification.permission === 'granted') {
    navigator.serviceWorker.getRegistration().then((reg) => {
      reg.showNotification(notificationTitle, notificationOptions)
    })
  }
})

const registrationToken = {
  getToken: async function () {
    try {
      const token = await getToken(messaging, {
        vapidKey: process.env.VUE_APP_VAPID_KEY,
      })
      console.log(token)
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err)
    }
  },
}

export default registrationToken
