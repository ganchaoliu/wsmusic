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
            artist: ''
        },        
        music_player: {}
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
    },
    getters: {
        getUrl: state => {
            return state.value;
        }
    },
    namespaced:true
}