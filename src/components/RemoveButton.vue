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
import API_ENDPOINT from '../globals/api-endpoint'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  data() {
    return {
      id: this.userdataprops._id,
      removeiconstatus: false,
    }
  },
  props: ['userdataprops'],
  methods: {
    removeicon: function (arg) {
      if (arg) {
        this.removeiconstatus = true
      } else {
        this.removeiconstatus = false
      }
    },
    async removeUser() {
      const swal1 = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      })
      if (swal1.isConfirmed) {
        try {
          await axios.delete(`${API_ENDPOINT.USERS}/${this.id}`)
          const swal2 = await Swal.fire(
            'Deleted!',
            'This user has been deleted.',
            'success'
          )
          if (swal2.isConfirmed) {
            this.$emit('reRender', this.id)
          }
        } catch (err) {
          Swal.fire('Oh no', 'Failed deleted File', 'warning')
        }
      }
    },
  },
}
</script>
