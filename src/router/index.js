import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '',
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
      },
      {
        path: 'confirm',
        name: 'confirm',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Logs.vue'),
      },
      {
        path: 'access',
        name: 'access',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/Users.vue'),
      },
    ],
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      requiresAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: async (to, from, next) => {
      // if not, redirect to login page.
      if (store.getters.getLoginStatus == null) {
        try {
          await store.dispatch('auth')
          next({ name: 'home' })
        } catch (err) {
          next()
        }
      } else if (!store.getters.getLoginStatus) {
        next()
      } else {
        next({ name: 'home' })
      }
    },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Login.vue'),
  },
  {
    path: '/401',
    name: 'unauthorized',
    component: () => import(/* webpackChunkName: "about" */ '../views/401.vue'),
  },
  {
    path: '*',
    component: () => import(/* webpackChunkName: "about" */ '../views/404.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.getLoginStatus == null) {
      try {
        await store.dispatch('auth')
        next()
      } catch (err) {
        next({ name: 'login' })
      }
    } else if (!store.getters.getLoginStatus) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
