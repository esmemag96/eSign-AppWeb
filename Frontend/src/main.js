import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import routes from './routes.js'

Vue.use(VueRouter)
Vue.use(BootstrapVue)
const router = new VueRouter({
  routes: routes
})
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
