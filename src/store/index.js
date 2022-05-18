import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios'
import router from '../router'
import API_ENDPOINT from '../globals/api-endpoint'

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
    loggedin: null,
    role: '',
    toast: {},
  },
  mutations: {
    SOCKET_ONOPEN(state, event) {
      Vue.prototype.$socket = event.currentTarget
      state.socket.isConnected = true
    },
    SOCKET_ONCLOSE(state) {
      state.socket.isConnected = false
    },
    SOCKET_ONERROR(state, event) {
      console.error(state, event)
    },
    SOCKET_ONMESSAGE(state, message) {
      const { _id } = message[0]
      const findIndex = state.allLighting.findIndex(
        (lighting) => lighting._id == _id
      )
      if (findIndex == -1) {
        state.allLighting.push(message[0])
      } else {
        state.allLighting.splice(findIndex, 1, message[0])
      }
    },
    SOCKET_RECONNECT(state, count) {
      console.info(state, count)
    },
    SOCKET_RECONNECT_ERROR(state) {
      state.socket.reconnectError = true
    },
    LIGHTING(state, payload) {
      state.allLighting = payload
    },
    ADD_FORM(state) {
      state.form = {
        addForm: true,
        isFormActive: true,
      }
    },
    UPDATE_FORM(state) {
      state.form = {
        addForm: false,
        isFormActive: true,
      }
    },
    CLOSE_FORM(state) {
      state.form = {
        addForm: true,
        isFormActive: false,
      }
    },
    AUTH: (state, payload) => {
      state.loggedin = payload
    },
    ROLE: (state, payload) => {
      state.role = payload
    },
    TOAST: (state, payload) => {
      state.toast = payload
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
        const result = await axios.get(`${API_ENDPOINT.AUTH}`)
        commit('AUTH', true)
        commit('ROLE', result.data.role)
      } catch (err) {
        commit('AUTH', false)
        throw err
      }
    },
    async login({ commit }, { email, password }) {
      try {
        const result = await axios.post(`${API_ENDPOINT.LOGIN}`, {
          email: email,
          password: password,
        })
        commit('AUTH', true)
        commit('ROLE', result.data.role)
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
    selfUpdate({ commit }, payload) {
      commit('ROLE', payload)
      if (payload == 'admin') {
        router.push({ name: 'home' })
      }
    },
    toast({ commit }, payload) {
      commit('TOAST', payload)
    },
  },
  getters: {
    getAllLighting(state) {
      return state.allLighting
    },
    getLightingLog: (state) => (id) => {
      let chartData = state.allLighting.filter((data) => data._id == id)
      return chartData[0]
    },
    getTime: () => (pastTime) => {
      let now = moment(pastTime).format('H:m:s')
      return now
    },
    getDate: () => (pastTime) => {
      let now = moment(pastTime).format('DD-MM-YYYY/HH:mm:ss')
      return now
    },
    getForm(state) {
      return state.form
    },
    getLoginStatus: function (state) {
      return state.loggedin
    },
    getRole: function (state) {
      if (state.role == 'superadmin') {
        return true
      }
      return false
    },
    getToastMessage: function (state) {
      return state.toast
    },
  },
})
