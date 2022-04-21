import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import axios from 'axios'
import router from '../router'
import API_ENDPOINT from "../globals/api-endpoint";

axios.defaults.withCredentials = true;

Vue.use(Vuex)

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
    },
    loggedin: false
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
      let lighting = message.message.lighting
      let lightingLog = message.message.lightingLog
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
        addForm: true,
        isFormActive: false
      }
    },
    AUTH: (state, payload) => {
      state.loggedin = payload
    }
  },
  actions: {
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
    },
    async auth({ commit }) {
      try {
        await axios.get(`${API_ENDPOINT.AUTH}`)
        commit('AUTH', true)
      } catch (err) {
        console.log(err)
      }
    }, 
    async login({ commit }, { email, password }){   
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
    async logout({commit}){
      try {
        await axios.get(`${API_ENDPOINT.LOGOUT}`)
        commit('AUTH', false)
        router.push({ name: 'login' })
      } catch (err) {
        console.log(err)
      }
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
    },
    getLoginStatus: function (state) {
      return state.loggedin
    }
  },
  modules: {}
})