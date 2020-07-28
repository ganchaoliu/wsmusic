export default{
    state:{
        volume: 50,
        playlist: [],
        currentsong: {
            id: '',
            name: '',
            song: {
                url: ''
            },
            playing: false,
            album: {},
            artist:[]
        },        
        music_player: {},
        loop:0
    },
    mutations:{
        updateCurrentSong(state, song) {
            console.log(song);
            state.currentsong = song
        },
        updateVolume(state, pos) {
            state.volume = pos
        },        
        registerMusicPlayer(state, payload) {
            state.music_player = payload
        },
        updatePlayStatus(state, status) {
            state.currentsong.playing = status
        },
        updatePlaylist(state,payload){
            state.playlist.push(payload)
        },
        updateLoop(state,payload){
            state.loop=payload
        }
    },
    getters: {
        getUrl: state => {
            return state.value;
        }
    },
    namespaced:true
}