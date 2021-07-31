<template>
  <div id="app">
    <div class="container">
      <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
              <div class="card" style="margin-top:20%">
                  <h4 class="card-header">Login</h4>
                  <div class="card-body">
                      <div class="row">
                          <div class="col-md-12">
                              <div class="form-group">
                                  <label for="">Email</label>
                                  <input type="text" v-model="formData.email" class="form-control" :class="errors.hasOwnProperty('email') ? 'is-invalid' : ''">
                                  <span class="text-danger" v-if="errors.hasOwnProperty('email')">{{errors.email[0]}}</span>
                              </div>
                          </div>
                          <div class="col-md-12">
                              <div class="form-group">
                                  <label for="password">Password</label>
                                  <input type="password" v-model="formData.password" class="form-control" :class="errors.hasOwnProperty('password') ? 'is-invalid' : ''">
                                  <span class="text-danger" v-if="errors.hasOwnProperty('password')">{{errors.password[0]}}</span>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div class="card-footer">
                    <button class="btn btn-primary" @click="login">Login</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data(){
    return {
      formData : {email : '', password : ''},
      errors : {}
    }
  },
  methods:{
    login(){
      this.errors = {}

      axios.post(`${this.apiUrl}/auth/login`, this.formData).then(res=>{

        this.$store.commit('setUserAndToken', res.data)
        
      }).catch(err=>{

        if(err.response.status == 422){
          this.errors = err.response.data.errors
        }
        alert(err.response.data.message)

      })
    }
  },
  computed:{
    apiUrl(){
      return this.$store.state.apiUrl
    }
  },
  mounted(){
    if(localStorage.getItem('token')){
      this.$store.commit('getUser', window.location.pathname)
    }
  },
}
</script>
