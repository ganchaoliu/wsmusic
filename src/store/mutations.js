import {History} from '../utils/common'

export default{
        
        updatePageLimit(state, pageSize) {
            state.pageLimit = pageSize
        },
        updateSongList(state, payload) {
            state.songlist = payload.songlist
            state.songCount = payload.songcount
            state.hasMore = payload.hasmore
        },
        login(state, payload) {
            state.userData = payload
            state.loginStatus = true
        },
        updateSearchValue(state, payload) {
            state.searchvalue = payload
        },
        updateSearchHistory(state,payload){
            let array = state.searchHistory
            let i=0
            while(i<array.length){
                if(array[i]==payload){
                    array.splice(i,1)
                    break
                }
                i++
            }
            state.searchHistory.splice(0,0,payload)
        },
}