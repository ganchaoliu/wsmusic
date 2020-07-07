<template>
  <div id="app" class="app">
    <Header></Header>
    <router-view></router-view>
   <!-- <audio-play></audio-play> -->
    <music-player class="music_player" v-show="$route.name!='mv' && $route.name!='video'&&$route.name!='mymv'"></music-player>
  </div>
</template>

<script>
  import Header from "./components/content/Header";
  import MusicPlayer from "./components/content/MusicPlayer";
  // import AudioPlay from "./views/AudioPlay";
export default {
  name: 'App',
  components: {
    Header,
    MusicPlayer,
    // AudioPlay
  },
  created () {
    if(sessionStorage.getItem('store')){
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem('store'))))
    }
    window.addEventListener('beforeunload',()=>{
      sessionStorage.setItem('store',JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style scoped>
  @import "assets/css/base.css";
  .music_player {
    width: 100%;
    height: 53px;
    position: fixed;
    bottom: 0;
    background-color: rgba(0, 0, 0, .8);
  }
</style>
