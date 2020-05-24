<template>
  <div>
    <Header></Header>
    <b-container fluid="sm">
      <b-row align-v="center" align-self="center">
        <b-col md="6" offset-md="4">
          <b-card
            title="Login"
            img-src="https://www.fortuneenespanol.com/wp-content/uploads/2018/05/blockchain-cadena-de-bloques.imgo_-770x513.jpg"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 text-center"
          >
            <b-card-text>
              <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group
                  id="input-group-1"
                  label-for="input-1"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.username"
                    required
                    placeholder="Enter username"
                  ></b-form-input>
                  <b-form-input
                    id="input-2"
                    v-model="form.password"
                    type="password"
                    required
                    placeholder="Password"
                  ></b-form-input>
                </b-form-group>
                <b-button type="submit" variant="primary" class="text-center">Submit</b-button>
              </b-form>
            </b-card-text>
            <router-link to="register">
              <b-button
                type="submit"
                variant="secondary"
                class="text-center"
                size="sm"
              >Registar usuario</b-button>
            </router-link>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "./Header.vue";
import { loginUser } from "../api/index.js";

export default {
  components: { Header },
  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      loginUser(this.form).then(response => {
        console.log(response.data.user.id);
        let userId = response.data.user.id
        let username = response.data.user.username
        let name = response.data.user.name
        console.log(userId)
        this.$router.push({ name:'profile', params:{userId,username, name}  })
      });
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.username = "";
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