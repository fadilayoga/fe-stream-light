/* eslint-disable no-undef */
import CONFIG from '../globals/config'
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging/sw";

initializeApp({
    apiKey: CONFIG.API_KEY,
    authDomain: CONFIG.AUTH_DOMAIN,
    projectId: CONFIG.PROJECT_ID,
    storageBucket: CONFIG.STORAGE_BUCKET,
    messagingSenderId: CONFIG.MESSAGING_SENDER_ID,
    appId: CONFIG.APP_ID
});

self.addEventListener('notificationclick', function (event) {    
    const url = event.notification?.data?.FCM_MSG?.data?.link;
    event.notification.close(); // Android needs explicit close.
    event.waitUntil(
        clients.matchAll({type: 'window'}).then( windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (var i = 0; i < windowClients.length; i++) {
                var client = windowClients[i];
                // If so, just focus it.
                if (client.url === url && 'focus' in client) {
                    return client.focus();
                }
            }
            // If not, then open the target URL in a new window/tab.
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
})

getMessaging();