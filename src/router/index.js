import Vue from 'vue'
import Router from 'vue-router'
import Layout from "../views/element/Layout";

Vue.use(Router)

const Main=()=>import('../views/Main')
const MusicPlayer=()=>import('../views/MusicPlayer')
const PlayList=()=>import('../views/PlayList')

const routes= [
  {
    path: '/',
    redirect: '/search'
  },
  {
    path: '/search',
    name: 'main',
    component: Main
  },
  {
    path: '/play',
    name: 'play',
    component: MusicPlayer
  },
  {
    path: '/layout',
    name: 'layout',
    component: Layout
  },
  {
    path: '/playlist',
    name: 'playlist',
    component: PlayList
  }
]

const router= new Router({
  routes,
  mode:'history'
})

export default router
