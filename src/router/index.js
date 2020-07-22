import Vue from 'vue'
import Router from 'vue-router'
import Layout from "../views/element/Layout";

Vue.use(Router)

const Search=()=>import('../views/Search')
const MusicPlayer=()=>import('../views/MusicPlayer')
const PlayList=()=>import('../views/PlayList')
const SongList=()=>import('../views/SongList')
const Login = () => import('../views/Login')
const MySongList = () => import('../views/MySongList')
const MyArtist = ()=>import('../views/MyArtist')
const MyMV = ()=>import('../views/MyMV')
const Artist = ()=>import('../views/artist/Artist')
const MV = ()=>import('../views/MV')
const Video = ()=>import('../views/Video')
const Discover = ()=>import('../views/discover/Discover')
const Friend = ()=>import('../views/friend/Friend')
const Song = ()=>import('../views/Song')



const routes= [
  {
    path: '/',
    redirect: '/discover'
  },
  {
    path: '/discover',
    name: 'discover',
    component: Discover,
    meta:{
      title:'首页'
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta:{
      title:'搜索音乐'
    }
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
    path: '/login',
    name: 'login',
    component: Login,
    meta:{
      title:'登陆'
    }
  },
  {
    path: '/mysonglist',
    name: 'mysonglist',
    redirect: '/mysonglist/songlist',
    component: MySongList,
    meta:{
      keepAlive:true
    },
    children:[{
      path: 'myartist',
      name: 'myartist',
      component: MyArtist,
    },
    {
      path: 'mymv',
      name: 'mymv',
      component: MyMV,
      meta:{
        keepAlive:true
      }
    },
    {
      path: 'songlist',
      name: 'songlist',
      component: SongList
    },],
  },
  {
    path: '/mv',
    name: 'mv',
    component: MV,
    meta:{
      title:'MV'
    }
  },
  {
    path: '/video',
    name: 'video',
    component: Video,
    meta:{
      title:'视频'
    }
  },
  {
    path: '/artists',
    name: 'artist',
    component: Artist,
    meta:{
      title:'歌手'
    }
  },
  {
    path: '/friend',
    name: 'friend',
    component: Friend
  },
  {
    path: '/song',
    name: 'song',
    component: Song
  },
]

const router= new Router({
  routes,
  mode:'history'
})

export default router
