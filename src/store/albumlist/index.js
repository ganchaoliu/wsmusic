export default{
    state:{
        albums:[],
        albumCount:0
    },
    mutations:{
        updateAlbums(state,payload){
            state.albums = payload.albums
            state.albumCount = payload.albumCount
        }
    },
    getters: {
        getUrl: state => {
        }
    },
    namespaced:true
}