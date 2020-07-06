import Vue from 'vue'
import Vuex from 'vuex'
import {request} from '../network/request'

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        searchvalue: '',
        songlist:[],
        songCount:0,
        hasMore:false,
        pageLimit:20,
        volume:50,
        playlist: [],
        searchResult:{},
        currentsong:{
            id:'',
            name:'',
            song:{
                url:''
            },
            playing:false,
            album:{},
            artist:''
        },
        loginStatus:false,
        userData:{},        
        music_player:{}
    },
    mutations:{
        updateCurrentSong(state,song){
            console.log(song);
            state.currentsong = song
        },
        updatePageLimit(state,pageSize){
            state.pageLimit = pageSize
        },
        updateVolume(state,pos){
            state.volume = pos
        },
        updateSongList(state,payload){
            state.songlist = payload.songlist
            state.songCount = payload.songcount
            state.hasMore = payload.hasmore
        },
        updatePlayStatus(state,status){
            state.currentsong.playing = status
        },
        login(state,payload){
            state.userData = payload
            state.loginStatus = true
        },
        registerMusicPlayer(state,payload){
            console.log(payload)
            state.music_player = payload
        },
        updateSearchValue(state,payload){
            state.searchvalue = payload
        }
    },
    actions:{
        search({commit},payload){
            console.log('store action')
            console.log(payload.offset)
            return new Promise((resolve,reject)=>{
                request({
                    url: "/api/search",
                    params: {
                      keywords: payload.keyword,
                      limit: this.state.pageLimit,
                      type:parseInt(payload.type),
                      offset:payload.offset
                    }
                  }).then(res => {
                    //重新封装歌曲列表，将后续有可能用到的数据都在这里全部获取到
                    if(payload.type==1){              
                        commit("updateSongList", {'songlist':res.data.result.songs,'songcount':res.data.result.songCount,'hasmore':res.data.result.hasMore});
                        console.log(res.data.result.songs)
                    }else{
                        console.log(res)
                    }
                  });
                  resolve('成功')
            })          
            
        }
    }
})

export default store
