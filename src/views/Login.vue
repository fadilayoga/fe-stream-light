<template>
  <div class="login-wrapper">
    <div class="login-form">
      <p class="title">Sign In</p>
      <p class="title--description">
        Sign in and start managing your candidates!
      </p>
      <input
        v-model="email"
        class="input-email"
        type="email"
        placeholder="Login"
      />
      <input
        v-model="password"
        class="input-password"
        type="password"
        placeholder="Password"
      />
      <div class="pretty p-svg p-curve">
        <input type="checkbox" />
        <div class="state p-success">
          <svg class="svg svg-icon" viewBox="0 0 20 20">
            <path
              d="M7.629,14.566c0.125,0.125,0.291,0.188,0.456,0.188c0.164,0,0.329-0.062,0.456-0.188l8.219-8.221c0.252-0.252,0.252-0.659,0-0.911c-0.252-0.252-0.659-0.252-0.911,0l-7.764,7.763L4.152,9.267c-0.252-0.251-0.66-0.251-0.911,0c-0.252,0.252-0.252,0.66,0,0.911L7.629,14.566z"
              style="stroke: white; fill: white"
            ></path>
          </svg>
          <label>Remember me</label>
        </div>
      </div>
      <button @click="submit()" class="btn-login">
        <span v-if="!loading">LOGIN</span>
        <circle2 v-else class="btn-login_spinner"></circle2>
      </button>
    </div>
    <div class="wave">
      <img class="wave-two" src="~@/assets/images/wave_two.svg" alt="" />
      <img class="wave-one" src="~@/assets/images/wave_one.svg" alt="" />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { Circle2 } from "vue-loading-spinner";

export default {
  components: {
    Circle2,
  },
  data() {
    return {
      email: "",
      password: "",
      Circle2,
      loading: false,
    };
  },
  mounted: function () {
    document.body.style.backgroundColor = "#E5E5E5";
  },
  destroyed: function () {
    document.body.style.backgroundColor = null;
  },
  methods: {
    submit() {
      this.loading = true;
    },
  },
};
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
  width: 350px;
  height: fit-content;
  margin: auto;
  border-radius: 10px;
  z-index: 1;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
}

.input-password {
  width: 100%;
  height: 60px;
  font-size: 16px;
  line-height: 20px;
  border-radius: 10px;
  padding: 12px 18px;
  border: none;
  margin-top: 32px;
  background-color: #224957;
  color: white;
  box-sizing: border-box;
}

.pretty {
  margin-top: 23px;
}

.btn-login {
  display: flex;
  height: 60px;
  width: 100%;
  margin: 24px auto;
  padding: 12px 18px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #20df7f;
  color: #224957;
  font-size: 16px;
  line-height: 20px;

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
    max-width: 30px;
    max-height: 30px;
    margin: auto;
  }
}

label {
  color: #224957;
}

@media screen and (max-width: 768px) {
  .login-form {
    width: 325px;
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
    margin-top: 12px;
    background-color: #224957;
    color: white;
    box-sizing: border-box;
  }

  .pretty {
    margin-top: 18px;
  }

  .btn-login {
    display: block;
    height: 45px;
    width: 100%;
    margin: 18px 0 0 0;
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
      max-height: 25px;
      margin: auto;
    }
  }
}
</style>