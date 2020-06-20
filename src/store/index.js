import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        searchvalue: '',
        songlist:[],
        volume:50,
        playlist: [],
        currentsong:{
            id:'',
            name:'',
            song:{
                url:''
            }
        }
    }
})

export default store
