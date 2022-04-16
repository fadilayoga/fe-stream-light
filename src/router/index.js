import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Logs from '../views/Logs.vue'
import Users from '../views/Users.vue'
import Dashboard from '../views/Dashboard.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: '',
    component: Home,
    meta: {
      requiresAuth: true
    },
    children: [{
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
    meta: {
      requiresAuth: true
    },
    component: () => import( /* webpackChunkName: "about" */ '../views/Profile.vue'),
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: async (to, from, next) => {
      await store.dispatch('auth')
      // if not, redirect to login page.
      if (!store.getters.getLoginStatus) {
        next() // go to wherever I'm going
      } else {
        next({ name: 'home' })
      }      
    },
    component: () => import( /* webpackChunkName: "about" */ '../views/Login.vue'),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    await store.dispatch('auth')
    // if not, redirect to login page.
    if (to.name !== 'login' && !store.getters.getLoginStatus) {
      next({
        name: 'login'
      })
    } else {
      next() // go to wherever I'm going
    }
  } else {
    next() // does not require auth, make sure to always call next()!
  }
})

export default router