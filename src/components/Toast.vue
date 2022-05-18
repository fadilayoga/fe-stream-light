<template>
  <div class="toast-wrapper">
    <div class="toast">{{ error_message }}</div>
  </div>
</template>

<script>
export default {
  props: {
    message: Object,
  },
  data() {
    return {
      error_message: this.message.message ? this.message.message : 'null',
    }
  },
  watch: {
    message() {
      this.error_message = this.message.message ? this.message.message : 'null'
    },
  },
}
</script>

<style>
@media screen and (min-width: 768px) {
  .toast-wrapper {
    position: fixed;
    width: 100%;
    max-width: 400px;
    left: 50%;
    top: 20px;
    z-index: 110;
    transform: translateX(-50%);
  }
  .toast {
    padding: 20px;
    color: #721c24;
    background: #f9dadd;
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
    margin: 0 auto;
  }
}

@media screen and (max-width: 768px) {
  .toast-wrapper {
    position: fixed;
    width: 100%;
    max-width: 400px;
    left: 50%;
    bottom: 0px;
    z-index: 110;
    transform: translateX(-50%);
  }
  .toast {
    padding: 12px;
    margin: 10px;
    color: #721c24;
    background: #f9dadd;
    border-radius: 6px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
    font-size: 14px;
  }
}
</style>
