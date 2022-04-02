<template>
  <div class="grid-container">
    <div class="grid-one">
      <router-link class="logo" to="/">STREAM <span class="logo-bold">LIGHT</span></router-link>
      <h5 class="left-panel-title">App</h5>
      <router-link class="left-panel" to="/" v-slot="{ href, navigate, isActive, isExactActive }">
        <a :href="href" @click="navigate" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'left-panel_menu']">
          <div :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'left-panel_menu-icon']">
            <img class="left-panel_menu-icon-svg" v-if="isExactActive" src="~@/assets/images/homepage-active.svg" alt="">          
            <img v-else class="left-panel_menu-icon-svg" src="~@/assets/images/homepage-inactive.svg" alt="">
          </div>
          <p :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'left-panel_menu-link']">Dashboard</p>
        </a>
      </router-link>
      <router-link class="left-panel" to="/logs" v-slot="{ href, navigate, isActive, isExactActive }">
        <a :href="href" @click="navigate" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'left-panel_menu']">
          <div :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'left-panel_menu-icon']">
            <img class="left-panel_menu-icon-svg" v-if="isExactActive" src="~@/assets/images/warning-active.svg" alt="">          
            <img v-else class="left-panel_menu-icon-svg" src="~@/assets/images/warning-inactive.svg" alt="">
          </div>
          <p :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'left-panel_menu-link']">Log</p>
        </a>
      </router-link>
      <router-link class="left-panel" to="/users" v-slot="{ href, navigate, isActive, isExactActive }">
        <a :href="href" @click="navigate" :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'left-panel_menu']">
          <div :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'left-panel_menu-icon']">
            <img class="left-panel_menu-icon-svg" v-if="isExactActive" src="~@/assets/images/user-management-active.svg" alt="">          
            <img v-else class="left-panel_menu-icon-svg" src="~@/assets/images/user-management-inactive.svg" alt="">
          </div>
          <p :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'left-panel_menu-link']">User Management</p>
        </a>
      </router-link>
    </div>
    <div class="grid-two">
      <div class="navbar-menu">
        <div @click="openDialog" class="navbar-dropdown">
          <img src="~@/assets/images/icons/hamburger-black.svg" alt=""/>
          <img src="~@/assets/images/icons/user-outline-black.svg" alt=""/>
        </div>
        <div v-if="profileMenu" v-click-outside="closeDialog" class="navbar-dropdown_menu">
          <router-link to="/login" class="navbar-dropdown_menu-login">Login</router-link>
          <router-link to="/register" class="navbar-dropdown_menu-register">Register</router-link>
        </div>
      </div>
    </div>
    <div class="main">
        <div class="main-title">
          <h1>{{ getPath }}</h1>
        </div>
        <div class="main-content">
          <router-view />
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  mounted: function () {
    document.body.style.backgroundColor = "#2a2e59";
  },
  destroyed: function () {
    document.body.style.backgroundColor = null;
  },
  data() {
    return {
      profileMenu: false,
    }
  },
  computed: {
    getPath(){
      let path = this.$route.path
      if(path === '/') return 'Dashboard'
      let stringSplit = path.split('/')[1]
      let upperCase = stringSplit.charAt(0).toUpperCase() + stringSplit.slice(1)
      return upperCase
    }
  },
  methods: {
    openDialog() {
      this.profileMenu = true;
    },
    closeDialog() {
      this.profileMenu = false;
    },
  }
};
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 230px auto;
  grid-template-rows: 60px auto;
  gap: 10px;
  padding: 10px;
  max-width: 1366px;
  margin: auto;
}

.grid-one {
  grid-row: 1 / 3;
}

.grid-two {
  grid-column: 2 / 3;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 100px;
}

.main {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 60px auto;
  gap: 10px;
  padding: 0 20px 20px 0;
  box-sizing: border-box;

  &-title {
    display: flex;
    align-items: center;
  }

  &-title h1{
    margin: 0;
    text-align: left;
    font-weight: 300;
    font-size: 2.5rem;
    color: rgba(244,244,245,.9);;
  }
}

.logo {
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 60px;
  text-align: center;
  display: block;
  // color: #3979f6;
  color: white;

  &-bold {
    font-weight: 700;
  }
}

.left-panel {
  &-title {
    margin: 50px 0 15px 11px;
    font-weight: 700;
    font-size: 0.9rem;
    // color: #474e80;
    color: white;
    text-align: left;
    width: fit-content;
  }

  &_menu {
    display: flex;
    padding: 5px 0 5px 11px;
    align-items: center;
    transition: 0.3s;
    border-radius: 0.3rem;
    text-decoration: none;

    &-icon {
      border-radius: 50%;
      padding: 6px;
      display: flex;

      &-svg {
        margin: auto;
        width: 20px;
        height: 20px;
      }
    }

    &-icon.router-link-exact-active {
      // background-color: #3979f6;
      background-color: white;
    }

    &-link {
      margin: 0 0 0px 11px;      
      font-size: 1rem;
      display: block;
      font-weight: 400;
      color: white;
    }

    &:hover {
      background-color: rgba(244, 244, 245, 0.2);
    }
  }
}

.navbar {
  &-menu {
    width: fit-content;
    position: relative;
  }

  &-dropdown {
    border: 0.8px solid #efefef;
    box-sizing: border-box;
    border-radius: 80px;
    height: 55px;
    width: fit-content;
    display: flex;
    align-items: center;
    padding: 16px;
    gap: 6px;
    cursor: pointer;

    &_menu {
      display: flex;
      flex-direction: column;
      gap: 15px;
      width: 120px;
      padding: 16px;
      border-radius: 10px;
      border: 1px solid #dde6e5;
      position: absolute;
      right: 0;
      top: 0;
      margin-top: 70px;
      z-index: 100;
      background-color: white;
      font-size: 16px;

      &-login {
        font-weight: 400;
      }

      &-register {
        font-weight: 600;
      }
    }

    &_menu a {
      text-align: left;
      margin: 0;
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
</style>