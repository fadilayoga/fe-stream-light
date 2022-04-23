import axios from 'axios'
import router from '../router'
import store from '../store'

axios.defaults.withCredentials = true

axios.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 403) {
      store.state.loggedin = false
      if (router.currentRoute.name) {
        router.push('./login')
      }
    }
    return Promise.reject(error)
  }
)
