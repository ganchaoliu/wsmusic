import Vue from 'vue'
import Router from 'vue-router'
import Layout from "../views/element/Layout";

Vue.use(Router)

const Main=()=>import('../views/Main')
const MusicPlayer=()=>import('../views/MusicPlayer')
const PlayList=()=>import('../views/PlayList')
const SongList=()=>import('../views/SongList')
const Login = () => import('../views/Login')
const MySongList = () => import('../views/MySongList')
const MyArtist = ()=>import('../views/MyArtist')
const MyMV = ()=>import('../views/MyMV')
const Artist = ()=>import('../views/Artist')

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
  },
  {
    path: '/songlist',
    name: 'songlist',
    component: SongList
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/mysonglist',
    name: 'mysonglist',
    component: MySongList,
    children:[{
      path: '/myartist',
      component: MyArtist,
    },
      {
        path: '/mymv',
        component: MyMV,
      }],
  },
  {
    path: '/artists',
    name: 'artists',
    component: Artist
  },
]

const router= new Router({
  routes,
  mode:'history'
})

export default router
