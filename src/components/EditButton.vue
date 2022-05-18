<template>
  <button
    @mouseover="editicon(true)"
    @mouseleave="editicon(false)"
    @click="$emit('updatedata')"
  >
    <img
      v-if="editiconstatus"
      src="~@/assets/images/icons8-editin.svg"
      alt=""
    />
    <img
      v-if="!editiconstatus"
      src="~@/assets/images/icons8-editout.svg"
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
export default {
  data() {
    return {
      editiconstatus: false,
    }
  },
  methods: {
    editicon: function (arg) {
      if (arg) {
        this.editiconstatus = true
      } else {
        this.editiconstatus = false
      }
    },
  },
}
</script>
