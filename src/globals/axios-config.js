import axios from 'axios'
import router from '../router'
import store from '../store'

axios.defaults.withCredentials = true

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (store.getters.getLoginStatus !== null) {
      store.dispatch('toast', { ...error.response.data })
    }
    if (error.response.status === 403) {
      store.state.loggedin = false
      if (router.currentRoute.path !== '/login') {
        router.push('./login')
      }
    } else if (error.response.status === 401) {
      if (router.currentRoute.path !== '/401') {
        router.push('./401')
      }
    }
    return Promise.reject(error)
  }
)
