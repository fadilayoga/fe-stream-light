<template>
  <form @submit.prevent="" enctype="multipart/form-data">
    <fieldset class="lighting-item">
      <div>
        <legend v-if="addformactive" class="lighting-item_form-type">
          Add <span>Users</span>
        </legend>
        <show-at breakpoint="small">
          <button class="lighting-item_close-button" @click="closeForm">
            <img src="~@/assets/images/close-button.svg" alt="" />
          </button>
        </show-at>
      </div>
      <div class="form-group">
        <input
          :class="{ 'form-group--error': $v.name.$error }"
          @input="delayTouch($v.name)"
          v-model.trim="$v.name.$model"
          type="text"
          placeholder="name"
          id="name"
        />
        <div class="error" v-if="$v.name.$error && !$v.name.required">
          Name is required
        </div>
        <div class="error" v-if="$v.name.$error && !$v.name.minLength">
          Name must have at least {{ $v.name.$params.minLength.min }} letters.
        </div>
      </div>
      <div class="form-group">
        <input
          :class="{ 'form-group--error': $v.email.$error }"
          @input="delayTouch($v.email)"
          v-model.trim="$v.email.$model"
          type="text"
          placeholder="email"
        />
        <div class="error" v-if="$v.email.$error && !$v.email.required">
          Email is required
        </div>
        <div class="error" v-if="$v.email.$error && !$v.email.email">
          Email is not valid
        </div>
      </div>
      <div class="form-group">
        <input
          :class="{ 'form-group--error': $v.password.$error }"
          @input="delayTouch($v.password)"
          v-model.trim="$v.password.$model"
          type="password"
          placeholder="password"
        />
        <div class="error" v-if="$v.password.$error && !$v.password.required">
          Password is required
        </div>
        <div class="error" v-if="$v.password.$error && !$v.password.minLength">
          Password must have at least
          {{ $v.password.$params.minLength.min }} letters.
        </div>
      </div>
      <div class="form-group">
        <input
          :class="{ 'form-group--error': $v.age.$error }"
          @input="delayTouch($v.age)"
          v-model.trim="$v.age.$model"
          type="number"
          placeholder="umur"
          min="1"
        />
        <div class="error" v-if="$v.age.$error && !$v.age.required">
          Age is required
        </div>
        <div class="error" v-if="$v.age.$error && !$v.age.between">
          Must be between {{ $v.age.$params.between.min }} and
          {{ $v.age.$params.between.max }}
        </div>
      </div>
      <div class="form-group">
        <select
          id="role"
          name="role"
          :class="{ 'form-group--error': $v.role.$error }"
          v-model.trim="$v.role.$model"
        >
          <option value="" disabled selected hidden>Choose Level...</option>
          <option value="superadmin">Superadmin</option>
          <option value="admin">Admin</option>
        </select>
        <div class="error" v-if="$v.role.$error && !$v.role.required">
          Role is required
        </div>
        <div class="error" v-if="$v.role.$error && !$v.role.validRole">
          Role does contain invalid value
        </div>
      </div>
      <div class="form-group">
        <fieldset :class="{ 'form-group--error': $v.gender.$error }">
          <legend>Gender</legend>
          <div class="lighting-item_gender">
            <label class="lighting-item_gender-type" for="man">
              <input
                v-model.trim="$v.gender.$model"
                type="radio"
                id="man"
                name="gender"
                value="man"
              />Man
            </label>
          </div>
          <div class="lighting-item_gender">
            <label class="lighting-item_gender-type" for="woman">
              <input
                v-model.trim="$v.gender.$model"
                type="radio"
                id="woman"
                name="gender"
                value="woman"
              />Woman
            </label>
          </div>
        </fieldset>
        <div class="error" v-if="$v.gender.$error && !$v.gender.required">
          Gender is required
        </div>
        <div class="error" v-if="$v.gender.$error && !$v.gender.validGender">
          Gender does contain invalid value
        </div>
      </div>
      <div class="form-group">
        <div v-if="!previewimg || $v.file.$invalid">
          <input
            @change="upload"
            type="file"
            name="file"
            ref="file"
            id="file"
            class="inputfile"
          />
          <label :class="{ 'form-group--error': $v.file.$invalid }" for="file"
            >Select Photos</label
          >
        </div>
        <div class="error" v-if="$v.file.$invalid && !$v.file.validFile">
          Incorrect file type
        </div>
        <div class="error" v-if="$v.file.$invalid && !$v.file.validSize">
          Max file size is 2MB
        </div>
      </div>
      <div class="photos-preview" v-if="previewimg && !$v.file.$invalid">
        <div class="photos-preview_btn">
          <div>
            <input
              @change="upload"
              type="file"
              name="file"
              ref="file"
              id="file"
              class="reinputfile"
            />
            <label
              for="file"
              @mouseover="editicon(true)"
              @mouseleave="editicon(false)"
            >
              <img
                v-if="editPreviewStatus"
                class="photos-preview_btn-edit-icon"
                src="~@/assets/images/icons8-editin.svg"
                alt=""
              />
              <img
                v-else
                class="photos-preview_btn-edit-icon"
                src="~@/assets/images/icons8-editout.svg"
                alt=""
              />
            </label>
          </div>
          <button
            @click="removephotos"
            class="btn-default"
            @mouseover="removeicon(true)"
            @mouseleave="removeicon(false)"
          >
            <img
              v-if="removePreviewStatus"
              class="photos-preview_btn-remove-icon"
              src="~@/assets/images/icons8-closein.svg"
              alt=""
            />
            <img
              v-else
              class="photos-preview_btn-remove-icon"
              src="~@/assets/images/icons8-closeout.svg"
              alt=""
            />
          </button>
        </div>
        <img class="photos-preview_photo" :src="previewimg" alt="" />
      </div>
      <button class="lighting-item_submitbtn" @click="submit()" type="submit">
        <span v-if="!loading">Add</span>
        <circle2 v-else class="lighting-item_submitbtn-spinner"></circle2>
      </button>
    </fieldset>
  </form>
</template>

<script>
import API_ENDPOINT from '../globals/api-endpoint'
import { Circle2 } from 'vue-loading-spinner'
import { showAt, hideAt } from 'vue-breakpoints'
import {
  required,
  minLength,
  between,
  email,
  helpers,
} from 'vuelidate/lib/validators'
const touchMap = new WeakMap()
const role = ['superadmin', 'admin']
const gender = ['woman', 'man']
const MAX_SIZE = 5 * 1000 * 1000
const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
const validRole = (value) => role.includes(value)
const validGender = (value) => gender.includes(value)
const validFile = (value) =>
  !helpers.req(value) || allowedTypes.includes(value.type)
const validSize = (value) => !helpers.req(value) || !(value.size > MAX_SIZE)
import axios from 'axios'
export default {
  components: {
    Circle2,
    showAt,
    hideAt,
  },
  data() {
    return {
      addformactive: true,
      previewimg: null,
      loading: false,
      editPreviewStatus: false,
      removePreviewStatus: false,
      name: '',
      email: '',
      password: '',
      age: '',
      role: '',
      gender: '',
      file: '',
    }
  },
  props: {
    lighting: Array,
  },
  computed: {},
  methods: {
    async submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        console.log('error')
      } else {
        this.loading = true

        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('name', this.name)
        formData.append('email', this.email)
        formData.append('password', this.password)
        formData.append('age', this.age)
        formData.append('role', this.role)
        formData.append('gender', this.gender)

        try {
          const result = await axios.post(`${API_ENDPOINT.USERS}`, formData)
          this.$emit('reRender', result.data)
          this.resetForm()
        } catch (err) {
          console.log(err)
          this.loading = false
        }
      }
    },
    upload() {
      this.previewimg = URL.createObjectURL(this.$refs.file.files[0])
      this.file = this.$refs.file.files[0]
    },
    removephotos() {
      this.previewimg = ''
      this.file = ''
    },
    closeForm() {
      this.$emit('closeForm')
    },
    editicon: function (arg) {
      if (arg) {
        this.editPreviewStatus = true
      } else {
        this.editPreviewStatus = false
      }
    },
    removeicon: function (arg) {
      if (arg) {
        this.removePreviewStatus = true
      } else {
        this.removePreviewStatus = false
      }
    },
    delayTouch($v) {
      $v.$reset()
      if (touchMap.has($v)) {
        clearTimeout(touchMap.get($v))
      }
      touchMap.set($v, setTimeout($v.$touch, 1000))
    },
    resetForm() {
      this.$store.dispatch('closeForm')
      if (this.$device.mobile) {
        document.body.classList.remove('modal-open')
      }
      this.loading = false
    },
  },
  validations: {
    name: {
      required,
      minLength: minLength(5),
    },
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(5),
    },
    age: {
      required,
      between: between(10, 100),
    },
    role: {
      required,
      validRole,
    },
    gender: {
      required,
      validGender,
    },
    file: {
      validFile,
      validSize,
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  text-align: left;
  color: #f4f4f5;
}

form {
  border-radius: 10px;
}

.error {
  font-size: 14px;
}

.container {
  display: grid;
  grid-template-columns: auto 360px;
  grid-template-rows: auto;
  box-sizing: border-box;
  height: 100%;
  gap: 20px;
}

.inputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.reinputfile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.inputfile + label {
  font-size: 0.9rem;
  padding: 10px 20px;
  box-sizing: border-box;
  width: fit-content;
  border-radius: 5px;
  outline: 2px dashed rgb(192, 192, 192);
  outline-offset: -5px;
  font-weight: 300;
  color: rgb(189, 189, 189);
  background-color: rgb(250, 250, 250);
  display: inline-block;
  cursor: pointer;

  &.form-group--error {
    color: red;
    outline: 2px dashed red;
    animation-name: shakeError;
    animation-fill-mode: forwards;
    animation-duration: 0.6s;
    animation-timing-function: ease-in-out;
  }
}

.reinputfile + label {
  cursor: pointer;
}

.photos-preview {
  display: flex;
  flex-direction: row-reverse;
  width: fit-content;
  gap: 8px;
  &_btn {
    display: flex;
    flex-direction: column-reverse;
    gap: 8px;
    &-edit-icon {
      max-width: 18px;
    }
    &-remove-icon {
      max-width: 18px;
    }
  }
  &_photo {
    max-width: 200px;
    height: 100%;
  }
}

.lighting {
  &-item {
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-x: auto;
    border-radius: 10px;
    padding: 10px 12px;

    & input {
      color: black;
      line-height: 1.5rem;
      border-radius: 5px;
      padding: 5px 8px;
      border-style: none;
      box-sizing: border-box;

      &:focus {
        outline: none;
      }
    }

    & .form-group {
      display: flex;
      flex-direction: column;
      gap: 5px;

      &--error {
        outline: 1px solid red;
        animation-name: shakeError;
        animation-fill-mode: forwards;
        animation-duration: 0.6s;
        animation-timing-function: ease-in-out;

        &:focus {
          outline: 1px solid red;
        }
      }
    }

    & select {
      outline: none;

      &.form-group--error {
        outline: 1px solid red;
        animation-name: shakeError;
        animation-fill-mode: forwards;
        animation-duration: 0.6s;
        animation-timing-function: ease-in-out;

        &:focus {
          outline: 1px solid red;
        }
      }
    }

    & fieldset.form-group--error {
      border-color: red;
      outline: none;
      animation-name: shakeError;
      animation-fill-mode: forwards;
      animation-duration: 0.6s;
      animation-timing-function: ease-in-out;
    }

    @keyframes shakeError {
      0% {
        transform: translateX(0);
      }
      15% {
        transform: translateX(0.375rem);
      }
      30% {
        transform: translateX(-0.375rem);
      }
      45% {
        transform: translateX(0.375rem);
      }
      60% {
        transform: translateX(-0.375rem);
      }
      75% {
        transform: translateX(0.375rem);
      }
      90% {
        transform: translateX(-0.375rem);
      }
      100% {
        transform: translateX(0);
      }
    }

    &_submitbtn {
      color: black;
      text-align: center;
      box-sizing: border-box;
      font-size: 1rem;
      font-weight: 300;
      border: none;
      border-radius: 6px;
      display: flex;
      min-height: 36px;

      &:hover {
        background-color: rgb(220, 220, 220);
        cursor: pointer;
      }
      &:active {
        transform: translateY(1px);
      }

      & span {
        color: black;
        margin: auto;
      }

      &-spinner {
        max-width: 25px;
        max-height: 25px;
        margin: auto;
      }
    }

    & select {
      padding: 7px 5px;
      border-radius: 5px;
      border: none;
      box-sizing: border-box;
      color: black;
      & option {
        color: black;
      }
    }

    &_form-type {
      float: left;
      font-size: 20px;
      color: rgba(244, 244, 245, 0.6);
      font-weight: 300;
    }

    &_gender {
      & input {
        cursor: pointer;
        margin: 5px;
      }
      &-type {
        font-size: 0.9rem;
        display: flex;
        align-items: center;
      }
    }
  }
}

.btn-default {
  padding: 0;
  border: none;
  background-color: Transparent;
  cursor: pointer;
}

@media screen and (max-width: 768px) {
  .container {
    display: grid;
    grid-template-columns: auto 360px;
    grid-template-rows: auto;
    box-sizing: border-box;
    height: 100%;
    gap: 20px;
  }

  .error {
    font-size: 13px;
  }

  .inputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .reinputfile {
    width: 0.1px;
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    font-size: 13px;
    padding: 10px 20px;
    box-sizing: border-box;
    width: fit-content;
    border-radius: 5px;
    outline: 2px dashed rgb(192, 192, 192);
    outline-offset: -5px;
    font-weight: 300;
    color: rgb(189, 189, 189);
    background-color: rgb(250, 250, 250);
    display: inline-block;
    cursor: pointer;
  }

  .reinputfile + label {
    cursor: pointer;
  }

  .photos-preview {
    display: flex;
    flex-direction: row-reverse;
    width: fit-content;
    gap: 8px;
    &_btn {
      display: flex;
      flex-direction: column-reverse;
      gap: 8px;
      &-edit-icon {
        max-width: 18px;
      }
      &-remove-icon {
        max-width: 18px;
      }
    }
    &_photo {
      max-width: 200px;
      height: 100%;
    }
  }

  .lighting {
    &-item {
      display: flex;
      flex-direction: column;
      gap: 15px;
      max-height: 67vh;
      overflow-y: auto;
      background-color: $violet;

      & input {
        color: black;
        line-height: 1.3rem;
        border-radius: 5px;
        padding: 5px 8px;
        border-style: none;
        box-sizing: border-box;
        font-size: 13px;

        &:focus {
          outline: none;
        }
      }

      &_submitbtn {
        color: black;
        text-align: center;
        box-sizing: border-box;
        font-size: 14px;
        font-weight: 300;
        border: none;
        border-radius: 6px;
        display: flex;
        min-height: 32px;

        &:hover {
          background-color: rgb(220, 220, 220);
          cursor: pointer;
        }
        &:active {
          transform: translateY(1px);
        }

        & span {
          color: black;
          margin: auto;
        }

        &-spinner {
          max-width: 22px;
          max-height: 22px;
          margin: auto;
        }
      }

      & select {
        padding: 5px 5px;
        border-radius: 5px;
        border: none;
        box-sizing: border-box;
        color: black;
        & option {
          color: black;
        }
      }

      &_form-type {
        float: left;
        font-size: 18px;
        color: rgba(244, 244, 245, 0.6);
        font-weight: 300;
      }

      &_gender {
        & input {
          cursor: pointer;
        }
        &-type {
          font-size: 13px;
        }
      }

      &_close-button {
        padding: 0;
        border: 0;
        height: 23px;
        width: 23px;
        background-color: transparent;
        float: right;

        & img {
          width: 100%;
        }
      }
    }
  }

  .btn-default {
    padding: 0;
    border: none;
    background-color: Transparent;
    cursor: pointer;
  }

  legend {
    font-size: 14px;
    width: fit-content;
  }
}
</style>
