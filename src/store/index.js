import Vue from 'vue'
import Vuex from 'vuex'
import artistlist from './artistlist/index'
import videolist from './videolist/index'
import albumlist from './albumlist/index'
import musicplayer from './musicplayer/index'

import mutations from './mutations'
import actions from './actions'

import {History} from '../utils/common'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        searchvalue: '',
        searchHistory: [],
        searchHistoryLinkList: new History(),
        songlist: [],
        songCount: 0,
        hasMore: false,
        pageLimit: 20,        
        searchResult: {},
        loginStatus: false,
        userData: {},
    },
    mutations,
    actions,
    modules: {
        artistlist,
        videolist,
        albumlist,
        musicplayer
    }
})

export default store
