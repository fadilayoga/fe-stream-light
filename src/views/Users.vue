<template>
  <div class="container">
    <!-- <div class="lighting-item"> -->
    <form @submit.prevent="" action="">
      <fieldset class="lighting-item">
        <legend class="lighting-item_form-type">Add <span>Users</span></legend>
        <input type="text" placeholder="name" />
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <input type="number" placeholder="umur" min="1" />
        <select id="level" name="level">
          <option value="" disabled selected hidden>Choose Level...</option>
          <option value="volvo">Superadmin</option>
          <option value="saab">Admin</option>
        </select>
        <fieldset>
          <legend>Gender</legend>
          <div class="lighting-item_gender">
            <input type="radio" id="man" name="gender" value="Man" />
            <label class="lighting-item_gender-type" for="man">Man</label>
          </div>
          <div class="lighting-item_gender">
            <input type="radio" id="Woman" name="gender" value="Woman" />
            <label class="lighting-item_gender-type" for="woman">Woman</label>
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
            <img
              class="photos-preview_btn-edit-icon"
              src="~@/assets/images/icons8-edit.svg"
              alt=""
            />
            <img
              class="photos-preview_btn-remove-icon"
              src="~@/assets/images/icons8-close.svg"
              alt=""
            />
          </div>
          <img
            class="photos-preview_photo"
            src="~@/assets/images/lofi_generator.png"
            alt=""
          />
        </div>
        <button @click="directory()" type="submit">Submit</button>
      </fieldset>
    </form>
    <!-- </div> -->
    <div class="problem">
      <div class="problem-title">
        <p class="problem-title_group">
          List of User <span class="logo-bold"></span>
        </p>
        <img
          class="problem-icon"
          src="~@/assets/images/notification-inactive.svg"
          alt=""
        />
      </div>
      <div class="problem-item-group">
        <div v-for="item in 5" :key="item" class="problem-item">
          <p class="problem-item_lighting">Lighting-01</p>
          <p class="problem-item_timestamp">10/12/2022</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainChart from "../components/MainChart.vue";
import { mapGetters } from "vuex";

export default {
  components: {
    MainChart,
  },
  data() {
    return {
      lightingData: [],
      previewimg: "",
    };
  },
  props: {
    lighting: Array,
  },
  computed: {
    ...mapGetters(["getAllLighting"]),
  },
  methods: {
    directory() {
      console.log(process.cwd());
    },
    upload(e) {
      this.previewimg = URL.createObjectURL(e.target.files[0])
      console.log(this.previewimg)
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  text-align: left;
  color: #f4f4f5;
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

.inputfile + label {
  font-size: 0.9rem;
  padding: 10px 20px;
  box-sizing: border-box;
  width: fit-content;
  border-width: 2px;
  border-radius: 5px;
  border-style: dashed;
  font-weight: 300;
  color: rgb(189, 189, 189);
  border-color: rgb(238, 238, 238);
  background-color: rgb(250, 250, 250);
  display: inline-block;
  cursor: pointer;
}

.inputfile:focus + label,
.inputfile + label:hover {
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
      cursor: pointer;
    }
    &-remove-icon {
      max-width: 18px;
      cursor: pointer;
    }
  }
  &_photo {
    max-width: 200px;
  }
}

.lighting {
  &-item {
    display: flex;
    flex-direction: column;
    gap: 15px;
    overflow-x: auto;
    border-radius: 10px;

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

    & button {
      color: black;
      text-align: center;
      padding: 10px;
      box-sizing: border-box;
      font-size: 1rem;
      font-weight: 300;
      border: none;
      border-radius: 6px;

      &:hover {
        background-color: rgb(220, 220, 220);
        cursor: pointer;
      }
      &:active {
        transform: translateY(1px);
      }
    }

    & select {
      padding: 5px;
      border-radius: 5px;
      border: none;
      box-sizing: border-box;
      color: black;
      & option {
        line-height: 1.5rem;
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
      &-type {
        font-size: 0.9rem;
      }
    }
  }
}

.problem {
  display: flex;
  flex-direction: column;
  gap: 15px;

  &-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    &_group {
      color: white;
      font-weight: 400;
      font-size: 18px;
      margin: 0;
    }
  }

  &-icon {
    width: 20px;
  }

  &-item {
    height: 40px;
    background-color: rgba(244, 244, 245, 0.2);
    border-radius: 10px;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px;

    &-group {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    &_lighting {
      font-weight: 400;
      font-size: 0.9rem;
    }

    &_timestamp {
      font-weight: 300;
      font-size: 0.8rem;
    }
  }

  &-item p {
    text-align: left;
    margin: 0;
  }
}
</style>
