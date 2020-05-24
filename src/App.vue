<template>
  <div id="app">
    <div id="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        id: "",
        name: "",
        username: ""
      }
    };
  },
  created() {
    this.id = this.$route.params.userId;
    this.name = this.$route.params.name;
    this.username = this.$route.params.username;
  }
};
</script>

<style lang="css">
body {
  font-family: "Montserrat", sans-serif !important;
  background-image: url("assets/whiteTexture.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.btn-primary {
  color: #fff;
  background-color: #2dc596 !important;
  border-color: #2dc596 !important;
  font-size: 17px;
}
.btn-primary:hover {
  color: #fff;
  background-color: #0ab983 !important;
  border-color: #0ab983 !important;
  font-size: 17px;
}
</style>

