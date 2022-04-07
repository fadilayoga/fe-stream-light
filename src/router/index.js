import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Logs from '../views/Logs.vue'
import Users from '../views/Users.vue'
import Dashboard from '../views/Dashboard.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: '',
        name: 'home',
        component: Dashboard,
      },
      {
        path: 'logs',
        name: 'logs',
        component: Logs,
      },
      {
        path: 'users',
        name: 'users',
        component: Users,
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
