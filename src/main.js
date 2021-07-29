import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

const axios = require('axios');

axios.defaults.headers.common['Authorization'] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9iYWNrZW5kLnRlc3RcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE2Mjc1Mzk5ODUsImV4cCI6MTYyNzU0MzU4NSwibmJmIjoxNjI3NTM5OTg1LCJqdGkiOiJ5amNQSm1SRWVwMDU3aGVKIiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.9VeUFSyLFg8-2I6e0tCScKFQCiXqzGr3JXDOWFjto8c`;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
