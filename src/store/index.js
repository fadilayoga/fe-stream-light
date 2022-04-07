import Vue from 'vue'
import Vuex from 'vuex'
import AuthHelper from '../utils/auth-helper'
import moment from 'moment'

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
    },
    form: {
      addForm: false,
      isFormActive: false
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
    },
    ADD_FORM(state, payload) {
      state.form = {
        addForm: true,
        isFormActive: true
      }
    },
    UPDATE_FORM(state, payload) {
      state.form = {
        addForm: false,
        isFormActive: true
      }
    },
    CLOSE_FORM(state, payload) {
      state.form = {
        addForm: state.form.addForm,
        isFormActive: false
      }
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
    setLighting({
      commit
    }, payload) {
      commit('LIGHTING', payload.payload)
    },
    addForm({
      commit
    }) {
      commit('ADD_FORM')
    },
    updateForm({
      commit
    }) {
      commit('UPDATE_FORM')
    },
    closeForm({
      commit
    }) {
      commit('CLOSE_FORM')
    }
  },
  getters: {
    getAllLighting(state) {
      return state.allLighting.lighting
    },
    getLightingLog: (state, getters) => (id) => {
      let chartData = state.allLighting.lightingLog.filter(data => data.lighting._id == id)
      let labels = []
      let data = []
      for (let item of chartData) {
        labels.push(getters.getTime(item.timestamp))
        data.push(item.ldr)
      }
      return {
        labels,
        data
      }
    },
    getTime: (state) => (pastTime) => {
      let now = moment(pastTime).format('DMYY:Hms');
      return now
    },
    getForm(state) {
      return state.form
    }
  },
  modules: {}
})