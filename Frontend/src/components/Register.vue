<template>
  <div>
    <Header></Header>
    <b-container fluid>
      <b-row align-v="center" align-self="center">
        <b-col md="6" offset-md="3">
          <b-card
            title="Register User"
            img-src="https://mk0blockchaineswlkle.kinstacdn.com/wp-content/uploads/2017/06/Cadena-de-bloques-1024x314.png"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 40rem;"
            class="mb-2 text-center"
          >
            <b-card-text>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="mb-2 text-left">
                <b-form-group id="input-group-1" label="Name:" label-for="input-1">
                  <b-form-input id="input-1" v-model="form.name" required placeholder="name"></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-2" label="Username:" label-for="input-1">
                  <b-form-input
                    id="input-2"
                    v-model="form.username"
                    required
                    placeholder="username"
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-3" label="Email:" label-for="input-1">
                  <b-form-input
                    id="input-3"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="email"
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-4" label="Password:" label-for="input-1">
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="*******"
                  ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary">Submit</b-button>
              </b-form>
              <router-link to="login">
                <b-button
                  type="submit"
                  variant="secondary"
                  class="text-center"
                  size="sm"
                >Already have an account? Login</b-button>
              </router-link>
            </b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { registerUser } from "../api/index.js";

export default {
  components: { Header },
  data() {
    return {
      form: {
        name: "",
        username: "",
        email: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      registerUser(this.form).then(response => {
        console.log(response);
        let username = this.form.username;
        let name = this.form.name;
        this.$router.push({
          name: "profile",
          params: { username, name }
        });
      });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.name = "";
      this.form.username = "";
      this.form.email = "";
      this.form.password = "";
      // Trick to reset/clear native bcontainerser form validation state
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    }
  }
};
</script>

<style scoped>
</style>