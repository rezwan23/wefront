<template>
  <div class="home">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
        <a class="navbar-brand" href="#">Welcome -  {{isLoggedIn ? user.name : 'Guest'}}</a>
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item active">
            <router-link class="nav-link" to="/products">Products</router-link>
          </li>
        </ul>
          <ul class="navbar-nav">
            <li class="nav-item active float-right">
              <a class="btn btn-warning" v-if="isLoggedIn" @click="logout">Logout <span class="sr-only"></span></a>
              <div v-else>
                <router-link class="btn btn-primary" to="/login">Login</router-link>
                <router-link style="margin:0px 5px" class="btn btn-info" to="/register">Register</router-link>
              </div>
            </li>
          </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>


export default {
  data(){
    return {

    }
  },
  mounted(){
    this.$store.commit('getUser', window.location.pathname)
  },
  methods:{
    logout(){
      this.$store.commit('unsetUser')
      this.$router.push({name : 'Login'})
    }
  },
  computed:{
    user(){
      return this.$store.state.user
    },
    isLoggedIn(){
      return Object.keys(this.$store.state.user).length
    },
    apiUrl(){
      return this.$store.state.apiUrl
    }
  }
}
</script>

