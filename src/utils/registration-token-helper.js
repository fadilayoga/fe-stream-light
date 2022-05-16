import { initializeApp } from 'firebase/app'
import { getMessaging, getToken, onMessage } from 'firebase/messaging'
import CONFIG from '../globals/config'

initializeApp({
  apiKey: CONFIG.API_KEY,
  authDomain: CONFIG.AUTH_DOMAIN,
  projectId: CONFIG.PROJECT_ID,
  storageBucket: CONFIG.STORAGE_BUCKET,
  messagingSenderId: CONFIG.MESSAGING_SENDER_ID,
  appId: CONFIG.APP_ID,
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
      const token = await getToken(messaging, { vapidKey: CONFIG.VAPID_KEY })
      console.log(token)
    } catch (err) {
      console.log('An error occurred while retrieving token. ', err)
    }
  },
}

export default registrationToken
