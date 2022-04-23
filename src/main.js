import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueNativeSock from 'vue-native-websocket'
import vClickOutside from 'v-click-outside'
import device from 'vue-device-detector'
import CONFIG from './globals/config'
import Vuelidate from 'vuelidate'
import './globals/axios-config'

Vue.use(VueNativeSock, CONFIG.WEB_SOCKET, {
  store: store,
  format: 'json',
  reconnection: true, // (Boolean) whether to reconnect automatically (false)
  reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
  reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
})

Vue.use(vClickOutside)
Vue.use(device)
Vue.use(Vuelidate)
Vue.config.productionTip = false
Vue.config.devtools = true

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
