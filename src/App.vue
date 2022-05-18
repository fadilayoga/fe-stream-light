<template>
  <div id="app">
    <router-view />
    <transition name="toast" appear>
      <Toast v-if="showToast" :message="message" />
    </transition>
  </div>
</template>

<script>
const Toast = () => import('./components/Toast.vue')
import { mapGetters } from 'vuex'
export default {
  components: {
    Toast,
  },
  data() {
    return {
      showToast: false,
      message: {},
    }
  },
  computed: {
    ...mapGetters(['getToastMessage']),
  },
  watch: {
    getToastMessage(newVal) {
      this.message = newVal
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
        this.message = {}
      }, 3000)
    },
  },
}
</script>

<style lang="scss">
* {
  font-family: 'LexendaDeca';
  -webkit-user-drag: none;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html,
body {
  margin: 0px !important;
  padding: 0px !important;
  min-height: 100%;
}

body.modal-open {
  overflow: hidden;
}

.toast-enter,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -60px) !important;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
</style>
