<template>
  <div>
    <b-navbar type="dark" class="logoWrapper">
      <b-navbar-nav>
        <b-navbar-brand>Blockchain Contracts</b-navbar-brand>
        <!-- <router-link to="profile">
          <b-nav-item>Login</b-nav-item>
        </router-link>-->
        <router-link to="profile">
          <b-nav-item v-if="username">Profile</b-nav-item>
        </router-link>
        <router-link to="file">
          <b-nav-item v-if="username">New Document</b-nav-item>
        </router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>{{username}}</b-nav-item>
        <b-nav-item v-if="username">Logout</b-nav-item>
      </b-navbar-nav>
    </b-navbar>
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

<style>
.logo {
  width: 22em;
  margin-left: 4em;
}
.logoWrapper {
  background-color: #2dc596eb;
  height: 6em;
  margin-bottom: 2em;
  max-width: 105%;
  color: white;
  font-weight: 600;
  text-decoration: none !important;
}
.logoWrapper a:hover {
  font-weight: 600;
  text-decoration: none !important;
}
</style>

