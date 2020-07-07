<template>
  <div class="main">
    <!-- <navigate-bar></navigate-bar> -->
    <div class="search_body">
      <div class="search_input">
        <input type="text" v-model="searchValue" @keyup.enter="search(type)" />
        <a href></a>
      </div>
      <div class="search_con">
        <div class="note">
          搜索“{{$store.state.searchvalue}}”，找到
          <span v-if="type==1"><em >{{$store.state.songCount}} </em>首单曲</span>
          <span v-if="type==100"><em >{{$store.state.artistlist.artistCount}}</em>个歌手</span>
          <span v-if="type==1014"><em >{{$store.state.videolist.videoCount}}</em>个视频</span>
          <span v-if="type==10"><em >{{$store.state.albumlist.albumCount}}</em>个专辑</span>
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
        
        <music-list v-show="type===TYPE.song" ></music-list>
        <artist-list v-show="type===TYPE.artist"></artist-list>
        <album-list v-show="type===TYPE.album"></album-list>
        <video-list v-show="type===TYPE.video"></video-list>
      </div>
    </div>
  </div>
</template>

<script>

import { log } from "util";
import NavigateBar from "../components/content/NavigateBar.vue";
import {TYPE} from "../utils/common"
const  ArtistList = ()=>import ("./ArtistList")
const  MusicList = ()=>import ("./MusicList")
const  AlbumList = ()=>import ("./tabpage/AlbumList")
const  VideoList = ()=>import ("./tabpage/VideoList")


export default {
  name: "Main",
  data() {
    return {
      type:TYPE.song,
      TYPE:TYPE
    };
  },
  methods: {
    search(type) {
      let keyword = this.$store.state.searchvalue;
      if (keyword != "") {
        this.type = type;
        this.$store.dispatch("search", { 'keyword': keyword, 'type': type }).then(res=>{
          
          let findKey = (value, compare = (a, b) => a === b) =>{
            return Object.keys(TYPE).find(k => compare(TYPE[k], value))
          }

          let str = findKey(type)
          // console.log(str)
          
          this.$router.push({
            path: "/search",
            query: {
              keywords: keyword,
              type:type,
            }
            })
        });
      }
    },
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
    MusicList,
    AlbumList,
    VideoList
  },
  
};
</script>

<style scoped>
@import url("../assets/css/main.css");
</style>