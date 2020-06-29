<template>
  <div class="main">
    <div class="nav">
      <ul>
        <li>
          <a href="#">单曲</a>
        </li>
        <li>
          <a href="#">专辑</a>
        </li>
        <li>
          <a href="#">MV</a>
        </li>
        <li>
          <a href="/songlist">歌单</a>
        </li>
        <li>
          <a href="#">用户</a>
        </li>
        <li>
          <a href="#">歌词</a>
        </li>
      </ul>
      <div class="clear-fix"></div>
    </div>
    <div class="musiclist w">
      <ul class="listhd">
        <li>歌曲</li>
        <li>歌手</li>
        <li>专辑</li>
        <li>操作</li>
      </ul>
      <ul
        class="listbd"
        v-if="$store.state.songlist.length!=0"
        v-for="(song,index) in $store.state.songlist"
        :class="{list2:index%2==0}"
      >
        <!--                <li><router-link :to="{path:'/play',query:{id:song.id,name:song.name}}">{{song.name}}</router-link></li>-->
        <li>
          <a
            href="#"
            @click="playsong(song.id,song.name,song.album,song.artists[0].name)"
          >{{song.name}}</a>
        </li>
        <li>
          <a href="#">{{song.artists[0].name}}</a>
        </li>
        <li>
          <a href="#">{{song.album.name}}</a>
        </li>
        <li>
          <button @click="addtoplaylist(song.id,song.name,song.album,song.artists[0].name)">添加到播放列表</button>
        </li>
        <br />
      </ul>
      <transition name="fade">
        <span class="tip" v-show="tip_show">{{tipMessage}}</span>
      </transition>
      <div class="main_page">
        <a @click="pre_page">上一页</a>
        <a @click="nex_page">下一页</a>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../network/request";
import { log } from "util";
export default {
  name: "Main",
  data() {
    return {
      currentPage: 1 //默认第一页
    };
  },
  methods: {
    playsong(id, name, album, artist) {
      console.log("播放");
      request({
        url: "/api/song/url",
        params: {
          id: id
        }
      }).then(res => {
        if (res.data.data[0].url != null) {
          console.log(res);
          const song = {};
          song.id = id;
          song.name = name;
          song.song = res.data.data[0];
          song.album = album;
          song.artist = artist;
          this.$store.state.currentsong = song;
          let checkresult = this.$store.state.playlist.some(item => {
            if (item.id == id) {
              return true;
            }
          });
          if (checkresult) {
            this.tip_message = "已在播放列表中";
          } else {
            this.$store.state.playlist.push(song);
            console.log("播放" + song);
          }
        } else {
          alert("url为空无法播放");
        }
      });
    },
    getSongDetail: async function() {
      request({
        url: "/api/song/url",
        params: {
          id: id
        }
      }).then(res => {
        console.log("获取歌曲详情" + res);
      });
    },
    /*
     * 添加歌曲到播放列表
     * 1.判断在播放列表中是否存在
     *
     * */
    addtoplaylist(id, name, album, artist) {
      request({
        url: "/api/song/url",
        params: {
          id: id
        }
      }).then(res => {
        const song = {
          id: "",
          name: "",
          song: {},
          album: {},
          artist: ""
        };
        song.id = id;
        song.name = name;
        song.song = res.data.data[0];
        song.album = album;
        song.artist = artist;
        if (song.song.url != null) {
          let checkresult = this.$store.state.playlist.some(item => {
            if (item.id == id) {
              return true;
            }
          });
          if (checkresult) {
            alert("已在播放列表中");
          } else {
            this.$store.state.playlist.push(song);
            console.log("添加" + song);
          }
        } else {
          alert("url为空，没有版权哟！！");
        }
      });
    },
    updatesonglist() {
      console.log("歌曲列表变更了");
    },
    getSongUrl: async function(id) {
      await request({
        url: "/api/song/url",
        params: {
          id: id
        }
      }).then(res => {
        console.log("获取url");
        return res.data.data[0];
      });
    },
    pre_page() {
        if(this.currentPage>1){
            this.currentPage--
            this.searchMusic(this.currentPage-1)
        }
    },
    nex_page() {
        this.currentPage++
        this.searchMusic(this.currentPage)
    },
    searchMusic(page) {
      console.log("搜索歌曲");
      request({
        url: "/api/search",
        params: {
          keywords: this.$route.query.keywords,
          limit: 20,
          offset: page
        }
      }).then(async res => {
        //重新封装歌曲列表，将后续有可能用到的数据都在这里全部获取到
        let songs = res.data.result.songs;
        console.log(songs);
        let ids = new Array();
        for (let i = 0; i < songs.length; i++) {
          ids.push(songs[i].id);
        }
        this.$store.commit("updateSongList", res.data.result.songs);
      });
      this.$router.push({
        path: "/search",
        query: {
          keywords: this.$route.query.keywords,
          limit: 20,
          offset: page
        }
      });
    }
  },
  computed: {
    tip_show() {
      return this.tipshow;
    },
    tipMessage() {
      return this.tip_message;
    },
    songList(){
        return this.$store.state.songlist
    }
  },
  watch:{
      songList:function(){
          const a = this.$route.query.offset
          if(a==undefined){
              this.currentPage = 1   //当重新搜索页面时且是通过Header搜索时初始化页码
          }
      }
  }
};
</script>

<style scoped>
@import url("../assets/css/main.css");
</style>