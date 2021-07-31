<template>
    <div>
        <div class="row" style="margin-top:20px">
            <div class="col-md-12">
                <div class="card">
                    <h4 class="card-header">New Product
                        <span class="float-right">
                            <router-link to="/products" class="btn btn-primary">All Products</router-link>
                        </span>
                    </h4>
                    <div class="card-body">
                        <form @submit.prevent="submit" id="create-form" :action="apiUrl+'/products'" method="post" enctype="multipart/form-data">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Title</label>
                                        <input type="text" name="title" class="form-control" :class="errors.hasOwnProperty('title') ? 'is-invalid' : ''">
                                        <span class="text-danger" v-if="errors.hasOwnProperty('title')">{{errors.title[0]}}</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Price</label>
                                        <input type="text" name="price" class="form-control" :class="errors.hasOwnProperty('price') ? 'is-invalid' : ''">
                                        <span class="text-danger" v-if="errors.hasOwnProperty('price')">{{errors.price[0]}}</span>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="form-group">
                                        <label for="">Image</label>
                                        <input type="file" name="image" class="form-control" :class="errors.hasOwnProperty('image') ? 'is-invalid' : ''">
                                        <span class="text-danger" v-if="errors.hasOwnProperty('image')">{{errors.image[0]}}</span>
                                    </div>
                                </div>
                                <div class="col-md-12">
                                    <div class="form-group">
                                        <label for="">Description</label>
                                        <textarea class="form-control" name="description" id="" cols="30" rows="10"></textarea>
                                        <span class="text-danger" v-if="errors.hasOwnProperty('description')">{{errors.description[0]}}</span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="card-footer">
                        <span class="float-right">
                            <button class="btn btn-primary" @click="submit">Submit</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'
import {showMessage} from '@/helpers.js'

export default{
   data(){
       return {
           errors : {}
       }
   },

   created(){
       if(!this.$store.state.token || this.$store.state.token == ''){
           this.$router.push({name : 'Login'})
       }
   },

   methods:{
       submit(){
           this.errors = {}
           let form = document.getElementById('create-form');
           let formData = new FormData(form);
           axios.post(`${this.apiUrl}/products`, formData).then(res => {
               showMessage('success', res.data.message)
               this.$router.push({name : 'Products'})
            }).catch(err=>{
               if(err.response.status == 422){
                   this.errors = err.response.data.errors
               }
               if(err.response.status.code == 401){
                   this.$router.push({path : '/login'});
               }
               showMessage('error', err.response.data.message)
           })
       }
   },
   computed:{
       isLoggedIn(){
           return Object.keys(this.$store.state.user).length
       },
       apiUrl(){
           return this.$store.state.apiUrl
       }
   }

}
</script>
