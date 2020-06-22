<template>
  <div id="app" class="app">
    <Header></Header>
    <router-view ></router-view>
<!--    <audio-play></audio-play>-->
    <music-player class="music_player"></music-player>
  </div>
</template>

<script>
  import Header from "./components/content/Header";
  import MusicPlayer from "./components/content/MusicPlayer";
  import AudioPlay from "./views/AudioPlay";
export default {
  name: 'App',
  components: {
    Header,
    MusicPlayer,
    // AudioPlay
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
