<template>
  <div id="app" class="app">
    <net-ease-header class="header" ></net-ease-header>
    <div class="clear-fix"></div>
    <router-view class="router_view" ></router-view>
    <music-player
      class="music_player"
      v-show="$route.name!='mv' && $route.name!='video'&&$route.name!='mymv'"
    ></music-player>
    <login v-if="$store.state.showLogin"></login>
  </div>
</template>

<script>
import Header from "./components/content/Header";
import NetEaseHeader from "./components/content/NetEaseHeader";
import MusicPlayer from "./components/content/MusicPlayer";
import Login from "./views/Login";
export default {
  name: "App",
  data(){
    return{
      showLog:true
    }
  },
  methods: {
    showLogin(event){
      console.log(event)
      this.showLog=event
    }
  },
  components: {
    MusicPlayer,
    NetEaseHeader,
    Login
  },
  // 将store状态保存到localStorage中
  created() {
    // localStorage.clear()
    if (localStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(localStorage.getItem("store"))
        )
      );
    }
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("store", JSON.stringify(this.$store.state));
    });
  }
};
</script>

<style scoped>
@import "assets/css/base.css";

html,
/* body {
  width: 100%;
  height: 100%;
} */

.app {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  overflow-y: hidden;
}

.header{
  width:100%;
  height: auto;
}

.router_view {
  width: 100%;
  background-color:#f5f5f5;
  overflow-y: scroll;
  padding-bottom: 50px;
}

.music_player {
  width: 100%;
  height: 53px;
  position: fixed;
  bottom: 0;
  margin-bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
}

/* .router_view a{
    color: #333;
  } */
</style>
