<template>
  <div class="container">
    <hide-at breakpoint="small">
      <div>
        <add-form v-if="isAddFormActive"></add-form>
        <edit-form
          :userdataprops="userdata"
          v-if="!isAddFormActive"
        ></edit-form>
      </div>
    </hide-at>
    <div class="problem">
      <hide-at breakpoint="small">
        <div class="problem-title">
          <p class="problem-title_group">
            List of User <span class="logo-bold"></span>
          </p>
          <button class="btn-default" @click="adduser()">
            <img
              class="problem-icon"
              src="~@/assets/images/add-user-desktop.svg"
              alt=""
            />
          </button>
        </div>
      </hide-at>
      <div class="problem-item-group">
        <div
          v-for="(item, index) in users"
          :key="item._id"
          class="problem-item"
        >
          <img
            v-if="item.profilePicture"
            class="problem-item_userphoto"
            :src="imgUrl(item.profilePicture)"
            @error="imageUrlAlt"
            alt=""
          />
          <img
            v-else
            class="problem-item_userphoto"
            src="~@/assets/images/lofi_generator.png"
            alt=""
          />
          <div class="problem-item_detail">
            <p class="problem-item_detail-lighting">{{ item.name }}</p>
            <p class="problem-item_detail-timestamp">{{ item.role }}</p>
          </div>
          <div class="problem-item_action">
            <remove-button></remove-button>
            <show-at breakpoint="small">
              <edit-button @updatedata="updateuser(item, true)"></edit-button>
            </show-at>
            <hide-at breakpoint="small">
              <edit-button @updatedata="updateuser(item, false)"></edit-button>
            </hide-at>
          </div>
        </div>
      </div>
    </div>
    <show-at breakpoint="small">
      <div>
        <transition name="fade" appear>
          <div class="modal-overlay" v-if="isFormActive"></div>
        </transition>
        <transition name="slide" appear>
          <add-form
            class="modal"
            v-if="isFormActive && isAddFormActive"
            @closeForm="closeForm"
          ></add-form>
          <edit-form
            class="modal"
            :userdataprops="userdata"
            v-if="isFormActive && !isAddFormActive"
            @closeForm="closeForm"
          ></edit-form>
        </transition>
      </div>
    </show-at>
  </div>
</template>

<script>
import API_ENDPOINT from '../globals/api-endpoint'
import AddForm from '../components/AddForm.vue'
import EditForm from '../components/EditForm.vue'
import EditButton from '../components/EditButton.vue'
import RemoveButton from '../components/RemoveButton.vue'
import { showAt, hideAt } from 'vue-breakpoints'
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  components: {
    AddForm,
    EditForm,
    EditButton,
    RemoveButton,
    showAt,
    hideAt,
  },
  data() {
    return {
      users: [],
      previewimg: null,
      loading: false,
      userdata: {},
      isAddFormActive: true,
      isFormActive: false,
    }
  },
  props: {
    lighting: Array,
  },
  mounted: async function () {
    try {
      const result = await axios.get(`${API_ENDPOINT.USERS}`)
      this.users = result.data
    } catch (err) {
      console.log(err)
    }
  },
  computed: {
    ...mapGetters(['getForm']),
  },
  methods: {
    submit: function () {
      this.loading = true
    },
    upload: function (e) {
      this.previewimg = URL.createObjectURL(e.target.files[0])
      console.log(this.previewimg)
    },
    removephotos: function () {
      this.previewimg = null
    },
    adduser: function () {
      this.$store.dispatch('addForm')
    },
    updateuser: function (payload, mobile) {
      if (mobile) {
        document.body.classList.add('modal-open')
      }
      this.$store.dispatch('updateForm')
      this.userdata = payload
    },
    closeForm: function () {
      this.$store.dispatch('closeForm')
      document.body.classList.remove('modal-open')
    },
    imgUrl: function (filename) {
      return `${API_ENDPOINT.STATIC}/${filename}`
    },
    imageUrlAlt(event) {
      event.target.src = require('@/assets/images/lofi_generator.png')
    },
  },
  watch: {
    getForm(newValue, oldValue) {
      this.isAddFormActive = newValue.addForm
      this.isFormActive = newValue.isFormActive
    },
  },
}
</script>

<style lang="scss" scoped>
* {
  text-align: left;
  color: #f4f4f5;
}

::-webkit-scrollbar {
  width: 0; /* Remove scrollbar space */
  background: transparent; /* Optional: just make scrollbar invisible */
}

.container {
  display: grid;
  grid-template-columns: auto 360px;
  grid-template-rows: auto;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  gap: 20px;
}

.problem {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &-title {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &_group {
      color: white;
      font-weight: 400;
      font-size: 18px;
      margin: 0;
    }
  }

  &-icon {
    width: 25px;
  }

  &-item {
    background-color: rgba(244, 244, 245, 0.2);
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    padding: 10px;
    &-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
      overflow: auto;
      width: 100%;
    }

    &_detail {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex-shrink: 0;
      flex-grow: 1;
      height: 100%;
      gap: 5px;
      padding: 3px 0;
      box-sizing: border-box;
      &-lighting {
        font-weight: 400;
        font-size: 0.9rem;
      }

      &-timestamp {
        font-weight: 300;
        font-size: 0.8rem;
      }
    }

    &_userphoto {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      object-fit: cover;
      object-position: center;
    }

    &_action {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      max-width: 18px;
      height: 100%;
      gap: 5px;
      box-sizing: border-box;
      padding: 3px 0;
    }
  }

  &-item p {
    text-align: left;
    margin: 0;
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
    grid-template-columns: auto;
    grid-template-rows: auto;
    box-sizing: border-box;
    gap: 20px;
    padding: 0;
  }

  .problem {
    display: flex;
    flex-direction: column;
    gap: 15px;

    &-title {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      &_group {
        color: white;
        font-weight: 400;
        font-size: 18px;
        margin: 0;
      }
    }

    &-icon {
      width: 25px;
    }

    &-item {
      background-color: rgba(244, 244, 245, 0.2);
      border-radius: 10px;
      color: white;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      padding: 10px;
      &-group {
        display: flex;
        flex-direction: column;
        gap: 10px;
        max-height: 1000px;
        overflow: auto;
      }

      &_detail {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex-shrink: 0;
        flex-grow: 1;
        height: 100%;
        gap: 5px;
        padding: 2px 0;
        &-lighting {
          font-weight: 400;
          font-size: 0.9rem;
        }

        &-timestamp {
          font-weight: 300;
          font-size: 0.8rem;
        }
      }

      &_userphoto {
        width: 45px;
        height: 45px;
      }

      &_action {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 18px;
        height: 100%;
        gap: 5px;
        padding: 2px 0;
      }
    }

    &-item p {
      text-align: left;
      margin: 0;
    }
  }

  .btn-default {
    padding: 0;
    border: none;
    background-color: Transparent;
    cursor: pointer;
  }

  .add_button {
    width: fit-content;
    padding: 0;
    border: 0;
    background-color: transparent;
    width: 60px;
    position: fixed;
    bottom: 22px;
    left: 50%;
    margin-left: -30px; /* Negative half of width. */
    z-index: 99;
    &-icon {
      width: 100%;
    }
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -57%);
    z-index: 100;
    width: 100%;
    max-width: 325px;
    overflow-y: scroll;
    overflow-x: hidden;
    &-overlay {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 99;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .slide-enter-active,
  .slide-leave-active {
    transition: transform 0.5s;
  }

  .slide-enter,
  .slide-leave-to {
    transform: translate(-50%, 100vh);
  }
}
</style>
