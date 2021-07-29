import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const axios = require('axios');

// axios.defaults.headers.common['Authorization'] = `Bearer ${store.state.currentUser.token}`;


axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = 'http://localhost:8080';


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
