<template>
  <div :key="Math.random()">
    <span v-if="addAccessButton && getRole" class="nav-indicator-outer"></span>
    <div class="nav">
      <span v-if="addAccessButton && getRole" class="nav-indicator"></span>
      <router-link
        to="/"
        class="nav--link"
        v-slot="{ href, navigate, isExactActive }"
        custom
      >
        <a :href="href" @click="navigate">
          <img
            class="nav--icon"
            src="~@/assets/images/homepage-active.svg"
            alt=""
            v-if="isExactActive"
          />
          <img
            class="nav--icon"
            src="~@/assets/images/homepage-inactive.svg"
            alt=""
            v-else
          />
          <span>Analytics</span>
        </a>
      </router-link>
      <router-link
        to="/confirm"
        class="nav--link"
        v-slot="{ href, navigate, isExactActive }"
        custom
      >
        <a :href="href" @click="navigate">
          <img
            class="nav--icon"
            src="~@/assets/images/warning-active.svg"
            alt=""
            v-if="isExactActive"
          />
          <img
            class="nav--icon"
            src="~@/assets/images/warning-inactive.svg"
            alt=""
            v-else
          />
          <span>Confirm</span>
        </a>
      </router-link>
      <button
        v-if="addAccessButton && getRole"
        class="nav--link add"
        @click="openAddForm"
      >
        <img
          class="nav--icon add"
          src="~@/assets/images/add_user-mobile.svg"
          alt=""
        />
        <span>Add</span>
      </button>
      <router-link
        v-if="getRole"
        to="/access"
        class="nav--link"
        v-slot="{ href, navigate, isExactActive }"
        custom
      >
        <a :href="href" @click="navigate">
          <img
            class="nav--icon"
            src="~@/assets/images/user-management-active.svg"
            alt=""
            v-if="isExactActive"
          />
          <img
            class="nav--icon"
            src="~@/assets/images/user-management-inactive.svg"
            alt=""
            v-else
          />
          <span>Access</span>
        </a>
      </router-link>
      <router-link
        to="/profile"
        class="nav--link"
        v-slot="{ href, navigate, isExactActive }"
        custom
      >
        <a :href="href" @click="navigate">
          <img
            class="nav--icon"
            src="~@/assets/images/icons/user-outline-active.svg"
            alt=""
            v-if="isExactActive"
          />
          <img
            class="nav--icon"
            src="~@/assets/images/icons/user-outline-inactive.svg"
            alt=""
            v-else
          />
          <span>Account</span>
        </a>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getRole']),
    addAccessButton() {
      if (this.$route.name === 'access') {
        return true
      }
      return false
    },
  },
  methods: {
    openAddForm() {
      this.$store.dispatch('addForm')
      document.body.classList.add('modal-open')
    },
  },
}
</script>

<style lang="scss" scoped>
.nav {
  position: fixed;
  width: 100%;
  height: 55px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  bottom: 0;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  z-index: 101;

  &--link {
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 50px;
    overflow-x: hidden;
    white-space: nowrap;
    font-size: 13px;
    color: #444444;
    text-decoration: none;
    justify-content: center;
    -webkit-tap-highlight-color: transparent;
    z-index: 2;

    &.add {
      padding: 0;
      border: 0;
      background-color: transparent;
      transform: translateY(-20%);
    }
  }

  &--icon {
    width: 100%;
    max-width: 25px;

    &.add {
      max-width: 30px;
    }
  }

  &-indicator {
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
    top: -14px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;

    &-outer {
      width: 50px;
      height: 50px;
      background-color: #c72f2f;
      border-radius: 50%;
      position: fixed;
      bottom: 19px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
