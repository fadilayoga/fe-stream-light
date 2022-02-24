import Vue from 'vue'
import Vuex from 'vuex'
import AuthHelper from '../utils/auth-helper'

Vue.use(Vuex)
Vue.config.devtools = true

export default new Vuex.Store({
  state: {
    allLighting: {
      lighting: [],
      lightingLog: [],
    },
    socket: {
      isConnected: false,
      ldr: [],
      reconnectError: false,
    }
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE(state, event) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event)
    },
    // default handler called for all methods
    SOCKET_ONMESSAGE(state, message) {
      // state.socket.message = message.message
      let lighting = []
      let lightingLog = []
      for (let data of message.message.lightingLog) {
        lightingLog.push(data)
      }
      for (let data of message.message.lighting) {
        lighting.push(data)
      }
      state.allLighting = {
        lighting: lighting,
        lightingLog: lightingLog
      }
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true;
    },
    LIGHTING(state, payload) {
      state.allLighting = payload      
    }
  },
  actions: {
    signIn(context, payload) {
      AuthHelper.signIn(payload)
      console.log(payload)
    },
    signOut() {
      AuthHelper.signOut()
    },
    setLighting({ commit }, payload) {
      commit('LIGHTING', payload.payload)
    }
  },
  getters: {
    getAllLighting(state) {
      return state.allLighting.lighting
    },
    getLightingLog: (state) => (id) => {
      let chartData = state.allLighting.lightingLog.filter(data => data.lighting._id == id)
      let labels = []
      let data = []
      for (let item of chartData) {
        labels.push(item.timestamp)
        data.push(item.ldr)
      }
      return {
        labels,
        data
      }
    },
  },
  modules: {}
})