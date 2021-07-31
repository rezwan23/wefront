import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token : localStorage.getItem('token') || '',
    user : {},
    apiUrl : 'http://backend.test/api',
    storageUrl : 'http://backend.test/uploads'
  },
  mutations: {
    setUserAndToken(state, data){
      state.user = data.user
      state.token = data.access_token
      localStorage.setItem('token', data.access_token)
      router.push({'name' : 'Home'})
    },
    getToken(state){
      state.token = localStorage.getItem('token') || ''
    },
    unsetUser(state){
      state.user = {},
      state.token = '',
      localStorage.removeItem('token')
    },
    getUser(state, requestedPath = ''){
      if(state.token == '' && requestedPath != '/login' &&  requestedPath != '/register'){
        router.push({name : 'Login'})
      }else if(!Object.keys(state.user).length && state.token != ''){
        axios.get(`${state.apiUrl}/auth/authenticated-user`).then(res=>{
          state.user = res.data
          if(requestedPath == ''){
            router.push({name : 'Home'})
          }
        })
      }
    }
  }
})
