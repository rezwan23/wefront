<template>
    <div>
        <div class="row" style="margin-top:20px">
            <div class="col-md-12">
                <div class="card">
                    <h4 class="card-header">Products
                        <span class="float-right">
                            <router-link to="/product-create" class="btn btn-primary">Create</router-link>
                        </span>
                    </h4>
                    <div class="card-body">
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Sl</th>
                                    <th>Title</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in products.data" :key="index">
                                    <td>{{initialSerial + index}}</td>
                                    <td>{{item.title}}</td>
                                    <td>
                                        <img :src="storageUrl + '/' + item.image" style="width:150px; height: auto" alt="">
                                    </td>
                                    <td>
                                        {{item.description}}
                                    </td>
                                    <td>{{item.price}}</td>
                                    <td>
                                        <button class="btn btn-primary btn-sm float-left" @click="edit(item)">Edit</button>
                                        <button class="btn btn-danger btn-sm float-left" style="margin-left:4px" @click="deleteItem(item)">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <span class="float-right">
                            <pagination :data="products" @pagination-change-page="getProducts"></pagination>
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
           products : {},
       }
   },
   methods:{
       getProducts(page = 1){
           axios.get(`${this.apiUrl}/products?page=${page}`).then(res=>{
               this.products = Object.assign({}, res.data.products)
           }).catch(err=>{
               if(err.response.status.code == 401){
                   this.$router.push({path : '/login'});
               }
               showMessage('error', err.response.data.message)
           })
       },
        edit(item){
            this.$router.push({path : `product-edit/` + item.id})
        },
        deleteItem(item){
            let flag = confirm('Are you sure?')
            if(flag){
                axios.post(`${this.apiUrl}/products/` + item.id, {_method : 'DELETE'}).then(res=>{
                    showMessage('success', res.data.message)
                    this.getProducts();
                }).catch(err=>{
                    if(err.response.status.code == 401){
                        this.$router.push({path : '/login'});
                    }
                    showMessage('error', err.response.data.message)
                })
            }
        }
   },
   created(){
       if(!this.$store.state.token || this.$store.state.token == ''){
           this.$router.push({name : 'Login'})
       }else{
           this.getProducts();
       }
       
   },

   computed:{
       isLoggedIn(){
           return Object.keys(this.$store.state.user).length
       },
       apiUrl(){
           return this.$store.state.apiUrl
       },
       storageUrl(){
           return this.$store.state.storageUrl
       },
       initialSerial(){
           return this.products.from
       }
   }

}
</script>
