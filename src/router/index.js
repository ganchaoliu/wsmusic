import Vue from 'vue'
import Router from 'vue-router'
import Layout from "../views/element/Layout";

Vue.use(Router)

// /**
//      * @param {to} 将要去的路由
//      * @param {from} 出发的路由
//      * @param {next} 执行下一步
//      */
//     router.beforeEach((to, from, next) => {
//       console.log('路由守卫')
//       console.log(to)
//       next()

//       // document.title = to.meta.title || '卖座电影';
//       // if (to.meta.needLogin && !$store.state.isLogin) {
//       //     next({
//       //         path: '/login'
//       //     })
//       // } else {
//       //     next()
//       // }
//   })

const Main=()=>import('../views/Main')
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
    path: '/login',
    name: 'login',
    component: Login
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
  },
  {
    path: '/video',
    name: 'video',
    component: Video,
  },
  {
    path: '/artists',
    name: 'artist',
    component: Artist
  },
]

const router= new Router({
  routes,
  mode:'history'
})

export default router
