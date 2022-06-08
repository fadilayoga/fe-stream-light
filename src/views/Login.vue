<template>
  <div class="login-wrapper">
    <div class="login-form">
      <p class="title">Sign In</p>
      <p class="title--description">Sign in and start monitoring lightings!</p>
      <input
        v-model="email"
        class="input-email"
        type="email"
        placeholder="Email"
        @keyup.enter="login()"
      />
      <input
        v-model="password"
        class="input-password"
        type="password"
        placeholder="Password"
        @keyup.enter="login()"
      />
      <button @click="login()" class="btn-login">
        <span v-show="!loading">LOGIN</span>
        <img
          v-show="loading"
          class="btn-login_spinner"
          src="~@/assets/images/spin.svg"
          alt=""
        />
      </button>
    </div>
    <div class="wave">
      <img class="wave-two" src="~@/assets/images/wave_two.svg" alt="" />
      <img class="wave-one" src="~@/assets/images/wave_one.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false,
    }
  },
  mounted: function () {
    document.body.style.background = '#E5E5E5'
  },
  destroyed: function () {
    document.body.style.background = null
  },
  computed: {
    ...mapGetters(['getLoginStatus']),
  },
  methods: {
    login: async function () {
      this.loading = true
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password,
        })
        this.loading = false
      } catch (err) {
        this.loading = false
      }
    },
  },
  watch: {
    getLoginStatus(newVal) {
      if (newVal) {
        this.$router.push({ name: 'home' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::placeholder {
  color: white;
}

:-ms-input-placeholder {
  color: white;
}

::-ms-input-placeholder {
  color: white;
}

.login-wrapper {
  min-height: 100vh;
  position: relative;
  display: flex;
}

.login-form {
  max-width: 350px;
  width: 100%;
  height: fit-content;
  margin: auto;
  border-radius: 10px;
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-sizing: border-box;
}

.wave {
  position: fixed;
  width: 100%;
  bottom: 0;

  &-one {
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0.8;
  }

  &-two {
    position: absolute;
    left: 0;
    bottom: 0;
    opacity: 0.8;
  }
}

.title {
  font-size: 64px;
  color: #224957;
  margin: 0;

  &--description {
    margin-top: 25px;
    font-size: 16px;
    color: #224957;
  }
}

.input-email {
  width: 100%;
  height: 60px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 10px;
  padding: 12px 18px;
  border: none;
  margin-top: 20px;
  background-color: #224957;
  color: white;
  box-sizing: border-box;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
}

.input-password {
  width: 100%;
  height: 60px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 10px;
  padding: 12px 18px;
  border: none;
  margin-top: 24px;
  background-color: #224957;
  color: white;
  box-sizing: border-box;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
}

.btn-login {
  display: flex;
  height: 60px;
  width: 100%;
  margin: 48px auto 0 auto;
  padding: 12px 18px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #20df7f;
  color: #224957;
  font-size: 16px;
  line-height: 20px;
  box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);

  &:hover {
    cursor: pointer;
  }

  &:active {
    transform: translateY(1px);
  }

  & span {
    color: black;
    margin: auto;
  }

  &_spinner {
    max-width: 35px;
    margin: auto;
  }
}

label {
  color: #224957;
}

@media screen and (max-width: 768px) {
  .login-form {
    max-width: 350px;
    height: fit-content;
    margin: auto;
    border-radius: 10px;
    z-index: 1;
    padding: 20px;
  }

  .wave {
    position: fixed;
    width: 100%;
    bottom: 0;

    &-one {
      position: absolute;
      left: 0;
      bottom: 0;
      opacity: 0.8;
    }

    &-two {
      position: absolute;
      left: 0;
      bottom: 0;
      opacity: 0.8;
    }
  }

  .title {
    font-size: 48px;
    color: #224957;
    margin: 0;

    &--description {
      margin-top: 20px;
      font-size: 14px;
      color: #224957;
    }
  }

  .input-email {
    width: 100%;
    height: 45px;
    font-size: 14px;
    line-height: 18px;
    border-radius: 10px;
    padding: 12px 18px;
    border: none;
    margin-top: 15px;
    background-color: #224957;
    color: white;
    box-sizing: border-box;
  }

  .input-password {
    width: 100%;
    height: 45px;
    font-size: 14px;
    line-height: 18px;
    border-radius: 10px;
    padding: 12px 18px;
    border: none;
    margin-top: 18px;
    background-color: #224957;
    color: white;
    box-sizing: border-box;
  }

  .btn-login {
    display: block;
    height: 45px;
    width: 100%;
    margin: 36px auto 0 auto;
    padding: 10px 16px;
    box-sizing: border-box;
    border-radius: 10px;
    border: none;
    background-color: #20df7f;
    color: #224957;
    font-size: 14px;
    line-height: 18px;

    &:active {
      transform: translateY(1px);
    }

    &_spinner {
      max-width: 25px;
    }
  }
}
</style>
