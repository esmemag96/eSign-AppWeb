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
                <b-form-group id="input-group-5" label="Card Number" label-for="card_number">
                  <b-form-input
                  id="card_number" 
                  v-model="form.number" 
                  placeholder='4242424242424242'
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-6" label="CVC" label-for="cvc">
                  <b-form-input
                  id="cvc" 
                  v-model="form.cvc" 
                  type="text" 
                  class="input" 
                  placeholder='123'
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-9" label="Expiry Day" label-for="exp_day">
                  <b-form-input
                  id="exp_month" 
                  v-model="form.exp_day" 
                  type="text" :class="['is-danger' ? cardMonthError : '', 'input']" 
                  placeholder="DD"
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-7" label="Expiry Month" label-for="exp_month">
                  <b-form-input
                  id="exp_month" 
                  v-model="form.exp_month" 
                  type="text" :class="['is-danger' ? cardMonthError : '', 'input']" 
                  placeholder="MM"
                  ></b-form-input>
                </b-form-group>
                <b-form-group id="input-group-8" label="Expiry Year" label-for="exp_year">
                  <b-form-input
                  id="exp_year" 
                  v-model="form.exp_year" 
                  type="text" :class="['is-danger' ? cardMonthError : '', 'input']" 
                  placeholder="YY"
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
      stripeKey: 'pk_test_Tro4UIRJbdwS1mR7qO8EQ73F',
      form: {
        name: "",
        username: "",
        email: "",
        password: ""
      },
      card: {
            number: '4242424242424242',
            cvc: '123',
            exp_month: '01',
            exp_year: '19'
            },
      show: true,
                  // validation
            cardNumberError: null,
            cardCvcError: null,
            cardMonthError: null,
            cardYearError: null,
            cardCheckSending: false,
            cardCheckError: false,
            cardCheckErrorMessage: ''
    };
  },
  methods: {
    onSubmit(evt) {
      evt.validate()
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
    },        
    createToken() {
            this.cardCheckError = false;
            window.Stripe.setPublishableKey(this.stripeKey);
            // window.Stripe.createToken(this.card, proxy(this.stripeResponseHandler, this));
            this.cardCheckSending = true;
    },
  }
};
</script>

<style scoped>
</style>