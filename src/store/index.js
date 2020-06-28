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
            },
            playing:false
        },
        loginStatus:false,
        userData:{}
    },
    mutations:{
        updateCurrentSong(state,song){
            console.log(song);
            state.currentsong = song
        },
        updateVolume(state,pos){
            state.volume = pos
        },
        updateSongList(state,list){
            state.songlist = list
        },
        updatePlayStatus(state,status){
            state.currentsong.playing = status
        },
        login(state,payload){
            state.userData = payload
            state.loginStatus = true
        }
    }
})

export default store
