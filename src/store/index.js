import Vue from 'vue'
import Vuex from 'vuex'
import { request } from '../network/request'
import artistlist from './artistlist/index'
import videolist from './videolist/index'
import albumlist from './albumlist/index'
import {TYPE} from '../utils/common'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        searchvalue: '',
        songlist: [],
        songCount: 0,
        hasMore: false,
        pageLimit: 20,
        volume: 50,
        playlist: [],
        searchResult: {},
        currentsong: {
            id: '',
            name: '',
            song: {
                url: ''
            },
            playing: false,
            album: {},
            artist: ''
        },
        loginStatus: false,
        userData: {},
        music_player: {}
    },
    mutations: {
        updateCurrentSong(state, song) {
            console.log(song);
            state.currentsong = song
        },
        updatePageLimit(state, pageSize) {
            state.pageLimit = pageSize
        },
        updateVolume(state, pos) {
            state.volume = pos
        },
        updateSongList(state, payload) {
            state.songlist = payload.songlist
            state.songCount = payload.songcount
            state.hasMore = payload.hasmore
        },
        updatePlayStatus(state, status) {
            state.currentsong.playing = status
        },
        login(state, payload) {
            state.userData = payload
            state.loginStatus = true
        },
        registerMusicPlayer(state, payload) {
            console.log(payload)
            state.music_player = payload
        },
        updateSearchValue(state, payload) {
            state.searchvalue = payload
        }
    },
    actions: {
        search(state, payload) {
            console.log('搜索类型'+payload.type)
            return new Promise((resolve, reject) => {
                request({
                    url: "/api/search",
                    params: {
                        keywords: payload.keyword,
                        limit: this.state.pageLimit,
                        type: payload.type,
                        offset: payload.offset
                    }
                }).then(res => {
                    console.log(TYPE.Video)
                    switch (payload.type) {
                        case TYPE.Music:
                            state.commit("updateSongList", { 'songlist': res.data.result.songs, 'songcount': res.data.result.songCount, 'hasmore': res.data.result.hasMore });
                            break;
                        case TYPE.Artist:
                            state.commit('artistlist/updateArtists', { 'artists': res.data.result.artists, 'artistCount': res.data.result.artistCount });
                            break;
                        case TYPE.Album:
                            console.log(res);
                            state.commit('albumlist/updateAlbums', { 'albums': res.data.result.albums, 'albumCount': res.data.result.albumCount });
                            break;
                        case TYPE.Video:
                            console.log(res);
                            state.commit('videolist/updateVideos', { 'videos': res.data.result.videos, 'videoCount': res.data.result.videoCount });
                            break;
                        case TYPE.Lyric:
                            break;
                        case TYPE.Song:
                            break;
                        case TYPE.Radio:
                            break;
                        case TYPE.User:
                            break;
                    }


                    // if (payload.type == TYPE.song) {
                    //     state.commit("updateSongList", { 'songlist': res.data.result.songs, 'songcount': res.data.result.songCount, 'hasmore': res.data.result.hasMore });
                    //     console.log(res.data.result.songs)
                    // } else if (payload.type == TYPE.song.artist) {
                    //     console.log(res.data.result)
                    //     state.commit('artistlist/updateArtists', { 'artists': res.data.result.artists, 'artistCount': res.data.result.artistCount })
                    // }
                });
                resolve('成功')
            })

        }
    },
    modules: {
        artistlist,
        videolist,
        albumlist
    }
})

export default store
