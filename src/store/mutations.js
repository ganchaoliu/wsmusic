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
            state.searchHistory = [...state.searchHistory,payload]
        }
}