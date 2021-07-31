import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/auth/Login.vue'
import Register from '../views/auth/Register.vue'
import Products from '../views/product/Index.vue'
import Create from '../views/product/Create.vue'
import Edit from '../views/product/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/register',
        name: 'Register',
        component: Register
      },
      {
        path: '/products',
        name: 'Products',
        component: Products
      },
      {
        path: '/product-create',
        name: 'CreateProduct',
        component: Create
      },
      {
        path: '/product-edit/:id',
        name: 'EditProduct',
        component: Edit
      },
    ],
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
