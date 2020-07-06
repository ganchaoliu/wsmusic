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
        <div class="musiclist" v-show="type===1">
          <div
            class="song_item"
            @mouseover="addActive(index)"
            @mouseout="removeActive(index)"
            v-for="(song,index) in $store.state.songlist"
            :key="index"
            :class="index%2===0?'':'slbg'"
          >
            <div class="td">
              <div
                class="play_btn"
                @click="playsong(song.id,song.name,song.album,song.artists[0].name)"
              ></div>
            </div>
            <div class="td sn">
              <router-link tag="a" to>{{song.name}}</router-link>
              <router-link tag="a" v-if="song.mvid!=0" :to="{name:'mv',query:{id:song.mvid}}">MV</router-link>
            </div>
            <div class="td btns">
              <div class="opt_btns" :class="index === opt_btns_show?'showOptBtns':'hideOptBtns'">
                <a
                  class="icn-add"
                  @click="addtoplaylist(song.id,song.name,song.album,song.artists[0].name)"
                  title="添加到播放列表"
                ></a>
                <a class="icn-fav" @click="fav(song.id)" title="收藏"></a>
                <a class="icn-share" title="分享"></a>
                <a class="icn-download" title="下载"></a>
              </div>
            </div>
            <div class="td at">
              <router-link tag="a" to>{{song.artists[0].name}}</router-link>
            </div>
            <div class="td al">
              <router-link tag="a" :to="{name:'mv',query:{id:song.album.id}}">《{{song.album.name}}》</router-link>
            </div>
            <div class="td">{{song.duration|formatSecond}}</div>
            <div class="clear-fix"></div>
          </div>

          <transition name="fade">
            <span class="tip" v-show="tip_show">{{tipMessage}}</span>
          </transition>

          <el-pagination class="main_page"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[5, 10, 20, 40]" 
            :page-size="$store.state.pageLimit"         
            layout="total, sizes, prev, pager, next, jumper"
            :total="$store.state.songCount">    
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../network/request";
import { log } from "util";
import NavigateBar from "../components/content/NavigateBar.vue";

// 将整数转换成 时：分：秒的格式
function realFormatSecond(second) {
  var secondType = typeof second;

  if (secondType === "number" || secondType === "string") {
    second = parseInt(second);

    var hours = Math.floor(second / 3600);
    second = second - hours * 3600;
    var mimute = Math.floor(second / 60);
    second = second - mimute * 60;

    return ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2);
  } else {
    return "00:00";
  }
}

export default {
  name: "Main",
  data() {
    return {
      currentPage: 1, //默认第一页,
      type: 1,
      opt_btns_show: false
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
    search(type) {
      let keyword = this.$store.state.searchvalue;
      if (keyword != "") {
        this.type = type;
        this.$store.dispatch("search", { 'keyword': keyword, 'type': type });
      }
    },
    searchWithAlbum(album) {
      console.log("搜索专辑");
      request({
        url: "/api/search",
        params: {
          keywords: album,
          limit: 20
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
          keywords: album,
          limit: 20
        }
      });
    },
    addActive(index) {
      this.opt_btns_show = index;
    },
    removeActive() {
      this.opt_btns_show = -1;
    },
    fav(id) {
      console.log("收藏" + id);
    },
    handleSizeChange(size){
      this.$store.commit('updatePageLimit',size)
      this.$store.dispatch("search", { 'keyword': this.$store.state.searchvalue, 'type': this.type,'offset':0 });
    },
    handleCurrentChange(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
      let offset = (this.currentPage - 1) * this.$store.state.pageLimit;
      this.$store
        .dispatch("search", {
          'keyword': this.$route.query.keywords,
          'type': 1,
          'offset': offset
        })
        .then(res => {
          this.$router.push({
            path: "/search",
            query: {
              keywords: this.$route.query.keywords,
              limit: 20,
              offset: offset
            }
          });
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
    NavigateBar
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second / 1000);
    },
    formatPlayTime(playtime = 0) {
      let str = "";
      if (playtime > 100000) {
        str = (playtime / 10000).toFixed(2) + "万";
      } else {
        str = playtime;
      }
      return str;
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/main.css");
</style>