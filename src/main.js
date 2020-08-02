import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

router.beforeEach((to,from,next)=>{
  console.log(to)
  if(to.name=='toplist'){
    console.log('设置显示')
  }
  // console.log(from)
  
  if(to.meta.title){
    document.title = to.meta.title
  }else{
    document.title = ''
  }
  next()
})

Vue.use(Element)

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
