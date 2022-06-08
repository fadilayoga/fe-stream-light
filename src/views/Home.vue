<template>
  <div>
    <hide-at breakpoint="small" class="dekstop-viewport">
      <div class="dekstop-viewport">
        <div class="grid-container">
          <div class="grid-one">
            <router-link class="logo" to="/"
              >LIGHT <span class="logo-bold">STREAM</span></router-link
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
                  Analytic
                </p>
              </a>
            </router-link>
            <router-link
              class="left-panel"
              to="/confirm"
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
                  Confirm
                </p>
              </a>
            </router-link>
            <router-link
              v-if="getRole"
              class="left-panel"
              to="/access"
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
                  Access
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
            >LIGHT <span class="grid_mobile-grid-one-logo-bold">STREAM</span>
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
      </div>
    </show-at>
  </div>
</template>

<script>
import { showAt, hideAt } from 'vue-breakpoints'
import { mapActions } from 'vuex'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: { hideAt, showAt },
  mounted: function () {
    document.body.style.background = 'radial-gradient(farthest-side ellipse at 10% 0,#333867,#17193b)'
  },
  destroyed: function () {
    document.body.style.background = null
  },
  data() {
    return {
      profileMenu: false,
    }
  },
  computed: {
    ...mapGetters(['getRole']),
    getPath() {
      let path = this.$route.path
      if (path === '/') return 'Analytic'
      let stringSplit = path.split('/')[1]
      let upperCase = stringSplit.charAt(0).toUpperCase() + stringSplit.slice(1)
      return upperCase
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
  },
}
</script>

<style lang="scss" scoped>
.grid-container {
  display: grid;
  grid-template-columns: 230px auto;
  grid-template-rows: 60px auto;
  gap: 10px;
  padding: 16px 10px 10px 10px;
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
}
</style>
