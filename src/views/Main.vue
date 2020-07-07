<template>
  <div class="main">
    <!-- <navigate-bar></navigate-bar> -->
    <div class="search_body">
      <div class="search_input">
        <input type="text" v-model="searchValue" @keyup.enter="search(1,searchValue)" />
        <a href></a>
      </div>
      <div class="search_con">
        <div class="note">
          搜索“{{$store.state.searchvalue}}”，找到
          <em>{{$store.state.songCount}}</em> 首单曲
        </div>
        <div class="search_tab">
          <ul>
            <li :class="type==1?'tab_selected':''" @click="search(1)">
              <a href="#">单曲</a>
            </li>
            <li :class="type==100?'tab_selected':''" @click="search(100)">
              <a href="#">歌手</a>
            </li>
            <li :class="type==10?'tab_selected':''" @click="search(10)">
              <a href="#">专辑</a>
            </li>
            <li :class="type==1014?'tab_selected':''" @click="search(1014)">
              <a href="#">视频</a>
            </li>
            <li :class="type==1006?'tab_selected':''" @click="search(1006)">
              <a href="#">歌词</a>
            </li>
            <li :class="type==1000?'tab_selected':''" @click="search(1000)">
              <a href="#">歌单</a>
            </li>
            <li :class="type==1009?'tab_selected':''" @click="search(1009)">
              <a href="#">主播电台</a>
            </li>
            <li :class="type==1002?'tab_selected':''" @click="search(1002)">
              <a href="#">用户</a>
            </li>
          </ul>
        </div>
        
        <music-list v-show="type===1" ></music-list>
        <artist-list v-show="type===100"></artist-list>
      </div>
    </div>
  </div>
</template>

<script>

import { log } from "util";
import NavigateBar from "../components/content/NavigateBar.vue";
const  ArtistList = ()=>import ("./ArtistList")
const  MusicList = ()=>import ("./MusicList")


export default {
  name: "Main",
  data() {
    return {
      type:1
    };
  },
  methods: {
    
    // getSongDetail: async function() {
    //   request({
    //     url: "/api/song/url",
    //     params: {
    //       id: id
    //     }
    //   }).then(res => {
    //     console.log("获取歌曲详情" + res);
    //   });
    // },    
    // updatesonglist() {
    //   console.log("歌曲列表变更了");
    // },
    // getSongUrl: async function(id) {
    //   await request({
    //     url: "/api/song/url",
    //     params: {
    //       id: id
    //     }
    //   }).then(res => {
    //     console.log("获取url");
    //     return res.data.data[0];
    //   });
    // },
    search(type) {
      let keyword = this.$store.state.searchvalue;
      if (keyword != "") {
        this.type = type;
        this.$store.dispatch("search", { 'keyword': keyword, 'type': type });
      }
    },
    // searchWithAlbum(album) {
    //   console.log("搜索专辑");
    //   request({
    //     url: "/api/search",
    //     params: {
    //       keywords: album,
    //       limit: 20
    //     }
    //   }).then(async res => {
    //     //重新封装歌曲列表，将后续有可能用到的数据都在这里全部获取到
    //     let songs = res.data.result.songs;
    //     console.log(songs);
    //     let ids = new Array();
    //     for (let i = 0; i < songs.length; i++) {
    //       ids.push(songs[i].id);
    //     }
    //     this.$store.commit("updateSongList", res.data.result.songs);
    //   });
    //   this.$router.push({
    //     path: "/search",
    //     query: {
    //       keywords: album,
    //       limit: 20
    //     }
    //   });
    // },
    
    
    
  },
  computed: {
    tip_show() {
      return this.tipshow;
    },
    tipMessage() {
      return this.tip_message;
    },
    songList() {
      return this.$store.state.songlist;
    },
    searchValue: {
      get() {
        return this.$store.state.searchvalue;
      },
      set(v) {
        this.$store.commit("updateSearchValue", v);
      }
    }
  },
  watch: {
    songList: function() {
      const a = this.$route.query.offset;
      if (a == undefined) {
        this.currentPage = 1; //当重新搜索页面时且是通过Header搜索时初始化页码
      }
    }
  },
  components: {
    NavigateBar,
    ArtistList,
    MusicList
  },
  
};
</script>

<style scoped>
@import url("../assets/css/main.css");
</style>