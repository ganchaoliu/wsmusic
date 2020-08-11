import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

Vue.use(Element)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

router.beforeEach((to,from,next)=>{
  console.log(to)
  if(to.name=='toplist'){
    console.log('设置显示')
  }
  // console.log(from)
  
  if(to.meta.title=='video'||to.meta.title=='MV'){
    console.log('播放视频')
    store.state.musicplayer.music_player.pause()
  }else{
    console.log('播放音乐')
    store.state.musicplayer.music_player.play()
  }
  next()
})
