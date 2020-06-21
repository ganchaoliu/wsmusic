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
        }
    }
})

export default store
