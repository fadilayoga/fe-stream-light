<template>
  <div class="container">
    <img src="~@/assets/images/401.svg" alt="" />
    <p class="code">401</p>
    <p class="message">You do not have access rights to this page</p>
    <router-link to="/">Go Back to Home</router-link>
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: fit-content;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

img {
  width: 180px;
}

.code {
  font-size: 38px;
  margin: 28px 0 14px 0;
}

.message {
  font-size: 20px;
  margin-bottom: 46px;
}

a {
  font-size: 16px;
  padding: 20px;
  border-radius: 10px;
  color: white;
  background-color: #f39200;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: block;  

  &:active {
    transform: translateY(1px);
    background-color: #f09d22;
  }
}

@media screen and (max-width: 768px) {
  .container {
    width: fit-content;
    max-width: 300px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  img {
    width: 135px;
  }

  .code {
    font-size: 28px;
    margin: 22px 0 12px 0;
  }

  .message {
    font-size: 18px;
    margin-bottom: 36px;
  }

  button {
    font-size: 14px;
    padding: 17px;
  }
}
</style>
