<template>
  <div class="container">
    <div class="grid-one">
      <router-link class="logo" to="/"
        >STREAM <span class="logo-bold">LIGHT</span></router-link
      >
      <div class="navbar-menu">
        <div @click="openDialog" class="navbar-dropdown">
          <img
            class="navbar-dropdown-hamburger"
            src="~@/assets/images/icons/hamburger-black.svg"
            alt=""
          />
          <img
            class="navbar-dropdown-actor"
            src="~@/assets/images/icons/user-outline-black.svg"
            alt=""
          />
        </div>
        <div
          v-if="profileMenu"
          v-click-outside="closeDialog"
          class="navbar-dropdown_menu"
        >
          <p @click="logout" class="navbar-dropdown_menu-login">Logout</p>
        </div>
      </div>
    </div>
    <div class="grid-two">
      <img
        class="grid-two_profileimg"
        src="~@/assets/images/lofi_generator.png"
        alt=""
      />
      <h2 class="grid-two_email">@fadilakharismayoga@gmail.com</h2>
      <p class="grid-two_name">Fadila Kharisma Yoga</p>
      <img
        class="grid-two_gender"
        src="~@/assets/images/icons/user-outline-black.svg"
        alt=""
      />
      <h2 class="grid-two_role">AdmiN</h2>
    </div>
    <show-at breakpoint="small">
      <div class="nav">
        <router-link
          to="/"
          class="nav--link"
          v-slot="{ href, navigate, isActive, isExactActive }"
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
          to="/logs"
          class="nav--link"
          v-slot="{ href, navigate, isActive, isExactActive }"
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
        <router-link
          to="/users"
          class="nav--link"
          v-slot="{ href, navigate, isActive, isExactActive }"
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
          v-slot="{ href, navigate, isActive, isExactActive }"
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
    </show-at>
  </div>
</template>

<script>
import { showAt, hideAt } from "vue-breakpoints";
import { mapActions } from 'vuex'
export default {
  components: { hideAt, showAt },
  data() {
    return {
      profileMenu: false,
    };
  },
  mounted: function () {
    document.body.style.backgroundColor = "#2a2e59";
  },
  destroyed: function () {
    document.body.style.backgroundColor = null;
  },
  methods: {
    ...mapActions(['logout']),
    openDialog() {
      this.profileMenu = true;
    },
    closeDialog() {
      this.profileMenu = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 60px auto;
  max-width: 1366px;
  padding: 10px;
  color: rgba(244, 244, 245, 0.9);
  margin: auto;
}

.grid {
  &-one {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 100px;
    box-sizing: border-box;
  }
  &-two {
    display: flex;
    flex-direction: column;
    align-items: center;
    &_profileimg {
      width: 200px;
      height: 200px;
      object-fit: cover;
      object-position: center;
      margin-top: 38px;
    }
    &_email {
      margin: 38px 0 10px 0;
    }
    &_name {
      font-size: 1rem;
      margin: 0;
    }
    &_gender {
      margin-top: 58px;
    }
    &_role {
      margin-top: 36px;
      border: 3px solid rgba(244, 244, 245, 0.9);
      padding: 10px 16px;
      font-weight: 400;
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
        font-weight: 600;
      }
    }

    &_menu p {
      text-align: left;
      margin: 0;
      color: black;
      text-decoration: none;
      cursor: pointer;
    }
  }
}
.logo {
  text-decoration: none;
  font-size: 18px;
  font-weight: 400;
  line-height: 60px;
  text-align: center;
  display: block;
  color: white;

  &-bold {
    font-weight: 700;
  }
}

@media screen and (max-width: 768px) {
  .container {
    display: block;
    margin: 0;
    padding: 0;
    color: rgba(244, 244, 245, 0.9);
  }
  .grid {
    &-one {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
      box-sizing: border-box;
      position: fixed;
      top: 0;
      width: 100%;
      height: 80px;
      background-color: $violet;
    }
    &-two {
      display: flex;
      flex-direction: column;
      align-items: center;
      overflow-y: auto;
      padding: 90px 10px;
      &_profileimg {
        width: 150px;
        height: 150px;
        object-fit: cover;
        object-position: center;
        margin-top: 38px;
      }
      &_email {
        font-size: 1.1rem;
        margin: 38px 0 10px 0;
      }
      &_name {
        font-size: 1rem;
        margin: 0;
      }
      &_gender {
        margin-top: 58px;
      }
      &_role {
        margin-top: 36px;
        border: 3px solid rgba(244, 244, 245, 0.9);
        padding: 10px 16px;
        font-weight: 400;
        font-size: 1.1rem;
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
      height: 45px;
      width: fit-content;
      display: flex;
      align-items: center;
      padding: 14px;
      gap: 6px;
      cursor: pointer;

      &_menu {
        display: flex;
        flex-direction: column;
        gap: 13px;
        width: 110px;
        padding: 14px;
        border-radius: 10px;
        border: 1px solid #dde6e5;
        position: absolute;
        right: 0;
        top: 0;
        margin-top: 55px;
        z-index: 100;
        background-color: white;
        font-size: 15px;

        &-login {
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

      &-actor {
        max-width: 25px;
      }
      &-hamburger {
        max-width: 20px;
      }
    }
  }
  .logo {
    text-decoration: none;
    font-size: 16px;
    font-weight: 400;
    line-height: 60px;
    text-align: center;
    display: block;
    color: white;

    &-bold {
      font-weight: 700;
    }
  }
  .nav {
    position: fixed;
    width: 100%;
    height: 55px;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    bottom: 0;
    display: flex;
    align-items: center;
    background-color: #ffffff;
    overflow-x: auto;

    &--link {
      flex-grow: 1;
      height: 100%;
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
    }

    &--icon {
      width: 100%;
      max-width: 25px;
    }
  }
}
</style>