import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

const axios = require('axios');

axios.defaults.headers.common['Authorization'] = `Bearer ${store.getters.token}`;

axios.defaults.headers.common['Access-Control-Allow-Origin'] = `http://localhost:8080`;


Vue.component('pagination', require('laravel-vue-pagination'));

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
