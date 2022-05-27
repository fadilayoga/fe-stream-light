import { initializeApp } from 'firebase/app'
import {
  getMessaging,
  getToken,
  deleteToken,
  onMessage,
} from 'firebase/messaging'

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

onMessage(messaging, (payload) => {
  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.data.icon,
  }
  const notification = new Notification(notificationTitle, notificationOptions)
  notification.onclick = function (event) {
    event.preventDefault()
    if (!payload.data.link) {
      return notification.close()
    }
    window.open(payload.data.link, '_blank')
    notification.close()
  }
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
  deleteToken: async function () {
    try {
      await deleteToken(messaging, option)
    } catch (err) {
      console.log('An error occurred while retrieving token', err)
    }
  },
}

export default registrationToken
