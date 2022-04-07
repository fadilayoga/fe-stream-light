<template>
  <button
    @click="removeUser"
    @mouseover="removeicon(true)"
    @mouseleave="removeicon(false)"
  >
    <img v-if="removeiconstatus" src="~@/assets/images/remove-in.svg" alt="" />
    <img
      v-if="!removeiconstatus"
      src="~@/assets/images/remove-out.svg"
      alt=""
    />
  </button>
</template>

<style lang="scss" scoped>
button {
  max-height: 18px;
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;

  & img {
    width: 100%;
  }
}
</style>

<script>
import Swal from "sweetalert2";
export default {
  data() {
    return {
      removeiconstatus: false,
    };
  },
  methods: {
    removeicon: function (arg) {
      if (arg) {
        this.removeiconstatus = true;
      } else {
        this.removeiconstatus = false;
      }
    },
    removeUser: function () {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
  },
};
</script>

