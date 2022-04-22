import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios'
import router from '../router'
import API_ENDPOINT from '../globals/api-endpoint'

axios.defaults.withCredentials = true

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    allLighting: [],
    socket: {
      isConnected: false,
      ldr: [],
      reconnectError: false,
    },
    form: {
      addForm: false,
      isFormActive: false,
    },
    loggedin: false,
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
      const { _id, ...data } = message[0]
      const findIndex = state.allLighting.findIndex((lighting) => lighting._id == _id)
      if(findIndex == -1) {
        state.allLighting.push(message[0])
      } else {
        state.allLighting.splice(findIndex, 1, message[0])
      }
    },
    // mutations for reconnect methods
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true
    },
    LIGHTING(state, payload) {
      state.allLighting = payload
    },
    ADD_FORM(state, payload) {
      state.form = {
        addForm: true,
        isFormActive: true,
      }
    },
    UPDATE_FORM(state, payload) {
      state.form = {
        addForm: false,
        isFormActive: true,
      }
    },
    CLOSE_FORM(state, payload) {
      state.form = {
        addForm: true,
        isFormActive: false,
      }
    },
    AUTH: (state, payload) => {
      state.loggedin = payload
    },
  },
  actions: {
    setLighting({ commit }, payload) {
      commit('LIGHTING', payload.payload)
    },
    addForm({ commit }) {
      commit('ADD_FORM')
    },
    updateForm({ commit }) {
      commit('UPDATE_FORM')
    },
    closeForm({ commit }) {
      commit('CLOSE_FORM')
    },
    async auth({ commit }) {
      try {
        await axios.get(`${API_ENDPOINT.AUTH}`)
        commit('AUTH', true)
      } catch (err) {
        console.log(err)
      }
    },
    async login({ commit }, { email, password }) {
      try {
        await axios.post(`${API_ENDPOINT.LOGIN}`, {
          email: email,
          password: password,
        })
        commit('AUTH', true)
      } catch (err) {
        console.log(err)
      }
    },
    async logout({ commit }) {
      try {
        await axios.get(`${API_ENDPOINT.LOGOUT}`)
        commit('AUTH', false)
        router.push({ name: 'login' })
      } catch (err) {
        console.log(err)
      }
    },
  },
  getters: {
    getAllLighting(state) {
      return state.allLighting
    },
    getLightingLog: (state, getters) => (id) => {
      let chartData = state.allLighting.filter((data) => data._id == id)
      return chartData[0]
    },
    getTime: (state) => (pastTime) => {
      let now = moment(pastTime).format('H:m:s')
      return now
    },
    getForm(state) {
      return state.form
    },
    getLoginStatus: function (state) {
      return state.loggedin
    },
  },
  modules: {},
})
