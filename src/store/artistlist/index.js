export default{
    state:{
        artists:[],
        artistCount:0
    },
    mutations:{
        updateArtists(state,payload){
            state.artists = payload.artists
            state.artistCount = payload.artistCount
        }
    },
    getters: {
        getUrl: state => {
            return state.value;
        }
    },
    namespaced:true
}