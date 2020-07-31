import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  // console.log(to)
  // console.log(from)
  
  if(to.meta.title){
    document.title = to.meta.title
  }else{
    document.title = 'Wilson云音乐'
  }
  next()
})

Vue.use(Element)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
