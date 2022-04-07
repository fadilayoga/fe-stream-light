<template>
  <form @submit.prevent="" action="">
    <fieldset class="lighting-item">
      <div>
        <legend v-if="addformactive" class="lighting-item_form-type">
          Update <span>Users</span>
        </legend>
        <show-at breakpoint="small">
          <button class="lighting-item_close-button" @click="closeForm">
            <img src="~@/assets/images/close-button.svg" alt="" />
          </button>
        </show-at>
      </div>
      <input :value="userdata" type="text" placeholder="name" />
      <input type="text" placeholder="email" />
      <input type="password" placeholder="password" />
      <input type="number" placeholder="umur" min="1" />
      <select id="level" name="level">
        <option value="" disabled selected hidden>Choose Level...</option>
        <option value="superadmin">Superadmin</option>
        <option value="admin">Admin</option>
      </select>
      <fieldset>
        <legend>Gender</legend>
        <div class="lighting-item_gender">
          <label class="lighting-item_gender-type" for="man">
            <input type="radio" id="man" name="gender" value="Man" />Man
          </label>
        </div>
        <div class="lighting-item_gender">
          <label class="lighting-item_gender-type" for="woman">
            <input type="radio" id="woman" name="gender" value="Woman" />Woman
          </label>
        </div>
      </fieldset>
      <div v-if="!previewimg">
        <input
          @change="upload"
          type="file"
          name="file"
          id="file"
          class="inputfile"
        />
        <label for="file">Select Photos</label>
      </div>
      <div class="photos-preview" v-if="previewimg">
        <div class="photos-preview_btn">
          <div>
            <input
              @change="upload"
              type="file"
              name="file"
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
        <span v-if="!loading">Update</span>
        <circle2
          v-if="loading"
          class="lighting-item_submitbtn-spinner"
        ></circle2>
      </button>
    </fieldset>
  </form>
</template>

<script>
import { Circle2 } from "vue-loading-spinner";
import { showAt, hideAt } from "vue-breakpoints";
export default {
  components: {
    Circle2,
    showAt,
    hideAt,
  },
  data() {
    return {
      addformactive: true,
      lightingData: [],
      previewimg: "",
      loading: false,
      userdata: this.userdataprops.payload,
      editPreviewStatus: false,
      removePreviewStatus: false,
    };
  },
  props: ["userdataprops"],
  computed: {},
  methods: {
    submit() {
      this.loading = true;
    },
    upload(e) {
      this.previewimg = URL.createObjectURL(e.target.files[0]);
      console.log(this.previewimg);
    },
    removephotos() {
      this.previewimg = "";
    },
    closeForm() {
      this.$emit("closeForm");
    },
    editicon: function (arg) {
      if (arg) {
        this.editPreviewStatus = true;
      } else {
        this.editPreviewStatus = false;
      }
    },
    removeicon: function (arg) {
      if (arg) {
        this.removePreviewStatus = true;
      } else {
        this.removePreviewStatus = false;
      }
    },
  },
  watch: {
    userdataprops: function (newVal, oldVal) {
      this.userdata = newVal.payload;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  text-align: left;
  color: #f4f4f5;
}
form {
  border-radius: 10px;
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