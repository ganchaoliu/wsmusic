export default{
    state:{
        videos:[],
        videoCount:0,
        pageLimit:20
    },
    mutations:{
        updateVideos(state,payload){
            state.videos = payload.videos
            state.videoCount = payload.videoCount
        },
        updatePageLimit(state,payload){
            state.pageLimit = payload
        }

    },
    getters: {
        getUrl: state => {
            return state.value;
        }
    },
    namespaced:true
}