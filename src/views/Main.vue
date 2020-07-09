<template>
  <div class="main">
    <!-- <navigate-bar></navigate-bar> -->
    <div class="search_body">
      <div class="search_input">
        <input type="text" v-model="searchValue" @keyup.enter="search(type)" />
        <a href></a>
      </div>
      <div class="search_history">
        <a href="" v-for="(his,index) in searchHistory" :key="index">{{his}}</a>
      </div>
      <div class="search_con">
        <div class="note">
          搜索“{{$store.state.searchvalue}}”，找到
          <span v-if="type==1">
            <em>{{$store.state.songCount}}</em>首单曲
          </span>
          <span v-if="type==100">
            <em>{{$store.state.artistlist.artistCount}}</em>个歌手
          </span>
          <span v-if="type==1014">
            <em>{{$store.state.videolist.videoCount}}</em>个视频
          </span>
          <span v-if="type==10">
            <em>{{$store.state.albumlist.albumCount}}</em>个专辑
          </span>
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

        <!-- <music-list v-show="type===TYPE.song" ></music-list>
        <artist-list v-show="type===TYPE.artist"></artist-list>
        <album-list v-show="type===TYPE.album"></album-list>
        <video-list v-show="type===TYPE.video"></video-list>-->

        <div :is="zujian" keep-alive v-if='!loading'></div>
        <div v-else>数据加载中</div>
      </div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import NavigateBar from "../components/content/NavigateBar.vue";
import { TYPE } from "../utils/common";
import {mapState,mapGetters} from 'vuex';
const ArtistList = () => import("./tabpage/ArtistList");
const MusicList = () => import("./tabpage/MusicList");
const AlbumList = () => import("./tabpage/AlbumList");
const VideoList = () => import("./tabpage/VideoList");

export default {
  name: "Main",
  data() {
    return {
      type: TYPE.Music,
      TYPE: TYPE,
      zujian: "MusicList",
      loading:false
    };
  },
  methods: {
    search(type) {
      console.log(this.$children)
      let keyword = this.$store.state.searchvalue;
      if (keyword != "") {
        this.type = type;
        this.loading=true;
        this.$store
          .dispatch("search", { keyword: keyword, type: type })
          .then(res => {
            console.log(res)
            //  根据type的值获取TYPE中的key的值，并组合成组件名称保存
            let findKey = (value, compare = (a, b) => a === b) => {
              return Object.keys(TYPE).find(k => compare(TYPE[k], value));
            };
            let str = findKey(type);
            this.zujian = str + "List";
            sessionStorage.setItem("searchtab", this.zujian);
            this.loading=false;
            this.$router.push({
              path: "/search",
              query: {
                keywords: keyword,
                type: type
              }
            });
          });
      }
    }
  },
  created: function() {
    if (sessionStorage.getItem("searchtab")) {
      this.zujian = sessionStorage.getItem("searchtab");
      let type = this.zujian.slice(0,-4)
      this.type = TYPE[type]
    }else{
      console.log('localStorage没找到对应的值')
    }
  },
  activated: function() {
    console.log("activated");
  },
  deactivated: function() {
    console.log("deactivated");
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
    },
    searchHistory(){
      let arr,newarr = []
      arr = this.$store.state.searchHistory.slice(0)
      newarr = arr.reverse().slice(0,6);
      return newarr
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
  }
};
</script>

<style scoped>
@import url("../assets/css/main.css");
</style>