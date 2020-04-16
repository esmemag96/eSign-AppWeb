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
                  label="Email address:"
                  label-for="input-1"
                  description="We'll never share your email with anyone else."
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="Enter email"
                  ></b-form-input>
                  <b-form-input
                    id="input-2"
                    v-model="form.passwords"
                    type="password"
                    required
                    placeholder="Password"
                  ></b-form-input>
                </b-form-group>
              </b-form>
            </b-card-text>
              <router-link to="file">     
                <b-button type="submit" variant="primary" class="text-center">Submit</b-button>
            </router-link>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Header from "./Header.vue";

export default {
components: { Header },
  data() {
    return {
      form: {
        email: "",
        name: "",
        food: null,
        checked: []
      },
      show: true
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
    },
    onReset(evt) {
      evt.preventDefault();
      // Reset our form values
      this.form.email = "";
      this.form.name = "";
      this.form.food = null;
      this.form.checked = [];
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