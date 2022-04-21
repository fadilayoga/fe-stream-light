<template>
  <div>
    <hide-at breakpoint="small" class="dekstop-viewport">
      <div class="dekstop-viewport">
        <div class="grid-container">
          <div class="grid-one">
            <router-link class="logo" to="/"
              >STREAM <span class="logo-bold">LIGHT</span></router-link
            >
            <h5 class="left-panel-title">App</h5>
            <router-link
              class="left-panel"
              to="/"
              v-slot="{ href, navigate, isActive, isExactActive }"
              custom
            >
              <a
                :href="href"
                @click="navigate"
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active',
                  'left-panel_menu',
                ]"
              >
                <div
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                    'left-panel_menu-icon',
                  ]"
                >
                  <img
                    class="left-panel_menu-icon-svg"
                    v-if="isExactActive"
                    src="~@/assets/images/homepage-active.svg"
                    alt=""
                  />
                  <img
                    v-else
                    class="left-panel_menu-icon-svg"
                    src="~@/assets/images/homepage-inactive.svg"
                    alt=""
                  />
                </div>
                <p
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                    'left-panel_menu-link',
                  ]"
                >
                  Dashboard
                </p>
              </a>
            </router-link>
            <router-link
              class="left-panel"
              to="/logs"
              v-slot="{ href, navigate, isActive, isExactActive }"
              custom
            >
              <a
                :href="href"
                @click="navigate"
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active',
                  'left-panel_menu',
                ]"
              >
                <div
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                    'left-panel_menu-icon',
                  ]"
                >
                  <img
                    class="left-panel_menu-icon-svg"
                    v-if="isExactActive"
                    src="~@/assets/images/warning-active.svg"
                    alt=""
                  />
                  <img
                    v-else
                    class="left-panel_menu-icon-svg"
                    src="~@/assets/images/warning-inactive.svg"
                    alt=""
                  />
                </div>
                <p
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                    'left-panel_menu-link',
                  ]"
                >
                  Log
                </p>
              </a>
            </router-link>
            <router-link
              class="left-panel"
              to="/users"
              v-slot="{ href, navigate, isActive, isExactActive }"
              custom
            >
              <a
                :href="href"
                @click="navigate"
                :class="[
                  isActive && 'router-link-active',
                  isExactActive && 'router-link-exact-active',
                  'left-panel_menu',
                ]"
              >
                <div
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                    'left-panel_menu-icon',
                  ]"
                >
                  <img
                    class="left-panel_menu-icon-svg"
                    v-if="isExactActive"
                    src="~@/assets/images/user-management-active.svg"
                    alt=""
                  />
                  <img
                    v-else
                    class="left-panel_menu-icon-svg"
                    src="~@/assets/images/user-management-inactive.svg"
                    alt=""
                  />
                </div>
                <p
                  :class="[
                    isActive && 'router-link-active',
                    isExactActive && 'router-link-exact-active',
                    'left-panel_menu-link',
                  ]"
                >
                  User Management
                </p>
              </a>
            </router-link>
          </div>
          <div class="grid-two">
            <div class="navbar-menu">
              <div @click="openDialog" class="navbar-dropdown">
                <img src="~@/assets/images/icons/hamburger-black.svg" alt="" />
                <img
                  src="~@/assets/images/icons/user-outline-black.svg"
                  alt=""
                />
              </div>
              <div
                v-if="profileMenu"
                v-click-outside="closeDialog"
                class="navbar-dropdown_menu"
              >
                <router-link to="/profile" class="navbar-dropdown_menu-profile"
                  >Profile</router-link
                >
                <p @click="logout" class="navbar-dropdown_menu-login">Logout</p>
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
      </div>
    </hide-at>
    <show-at breakpoint="small">
      <div class="mobile-viewport">
        <div class="grid_mobile-grid-one">
          <router-link class="grid_mobile-grid-one-logo" to="/"
            >STREAM <span class="grid_mobile-grid-one-logo-bold">LIGHT</span>
          </router-link>
          <div class="grid_mobile-grid-one-navbar">
            <div
              @click="openDialog"
              class="grid_mobile-grid-one-navbar-dropdown"
            >
              <img
                class="grid_mobile-grid-one-navbar-dropdown-hamburger"
                src="~@/assets/images/icons/hamburger-black.svg"
                alt=""
              />
              <img
                class="grid_mobile-grid-one-navbar-dropdown-actor"
                src="~@/assets/images/icons/user-outline-black.svg"
                alt=""
              />
            </div>
            <div
              v-if="profileMenu"
              v-click-outside="closeDialog"
              class="grid_mobile-grid-one-navbar-dropdown_menu"
            >
              <router-link
                to="/profile"
                class="grid_mobile-grid-one-navbar-dropdown_menu-profile"
                >Profile</router-link
              >
              <p
                @click="logout"
                class="grid_mobile-grid-one-navbar-dropdown_menu-login"
              >
                Logout
              </p>
            </div>
          </div>
        </div>
        <div class="grid_mobile-grid-two">
          <router-view />
        </div>
        <span v-if="addAccessButton" class="nav-indicator-outer"></span>
        <div class="nav">
          <span v-if="addAccessButton" class="nav-indicator"></span>
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
          <button
            v-if="addAccessButton"
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
      </div>
    </show-at>
  </div>
</template>

<script>
import { showAt, hideAt } from 'vue-breakpoints'
import { mapActions } from 'vuex'
export default {
  name: 'Home',
  components: { hideAt, showAt },
  mounted: function () {
    document.body.style.backgroundColor = '#2a2e59'
  },
  destroyed: function () {
    document.body.style.backgroundColor = null
  },
  data() {
    return {
      profileMenu: false,
    }
  },
  computed: {
    getPath() {
      let path = this.$route.path
      if (path === '/') return 'Dashboard'
      let stringSplit = path.split('/')[1]
      let upperCase = stringSplit.charAt(0).toUpperCase() + stringSplit.slice(1)
      return upperCase
    },
    addAccessButton() {
      if (this.$route.name === 'users') {
        return true
      }
      return false
    },
  },
  methods: {
    ...mapActions(['logout']),
    openDialog() {
      this.profileMenu = true
    },
    closeDialog() {
      this.profileMenu = false
    },
    openAddForm() {
      this.$store.dispatch('addForm')
      document.body.classList.add('modal-open')
    },
  },
}
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

  &-title h1 {
    margin: 0;
    text-align: left;
    font-weight: 300;
    font-size: 2.5rem;
    color: rgba(244, 244, 245, 0.9);
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

.left-panel {
  &-title {
    margin: 50px 0 15px 11px;
    font-weight: 700;
    font-size: 0.9rem;
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
        font-weight: 600;
      }
      &-profile {
        font-weight: 400;
      }
    }

    &_menu a {
      text-align: left;
      margin: 0;
      color: black;
      text-decoration: none;
      cursor: pointer;
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

//----------mobile-------------
@media screen and (max-width: 768px) {
  .grid {
    &_mobile {
      margin: 0;
      padding: 10px;
      color: rgba(244, 244, 245, 0.9);

      &-grid {
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
          &-navbar {
            width: fit-content;
            position: relative;
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
                &-profile {
                  font-weight: 400;
                }
              }

              &_menu a {
                text-align: left;
                margin: 0;
                color: black;
                text-decoration: none;
                cursor: pointer;
              }

              &_menu p {
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

          &-logo {
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
        }
        &-two {
          display: flex;
          flex-direction: column;
          align-items: center;
          overflow-y: auto;
          padding: 90px 10px 70px 10px;
        }
      }
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
}
</style>
