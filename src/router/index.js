import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

const Home = () =>import('../views/home/Home')
const Cart=()=>import('views/cart/Cart')
const Category=()=>import('views/category/Category')
const Profile=()=>import('views/profile/Profile')

const routes= [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/category',
    name: 'Category',
    component: Category
  }
]

const router= new Router({
  routes,
  mode:'history'
})

export default router
