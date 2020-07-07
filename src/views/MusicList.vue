<template>
  <div class="musiclist">
    <div
      class="song_item"
      @mouseover="addActive(index)"
      @mouseout="removeActive(index)"
      v-for="(song,index) in $store.state.songlist"
      :key="index"
      :class="index%2===0?'':'slbg'"
    >
      <div class="td">
        <div class="play_btn" @click="playsong(song.id,song.name,song.album,song.artists[0].name)"></div>
      </div>
      <div class="td sn">
        <router-link tag="a" to>{{song.name}}</router-link>
        <router-link tag="a" v-if="song.mvid!=0" :to="{name:'mv',query:{id:song.mvid}}" class="song_mv"></router-link>
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
        <router-link tag="a" to :title="artist(song.artists)">{{artist(song.artists)}}</router-link>
      </div>
      <div class="td al">
        <router-link tag="a" :to="{name:'mv',query:{id:song.album.id}}">《{{song.album.name}}》</router-link>
      </div>
      <div class="td dura">{{song.duration|formatSecond}}</div>
      <div class="clear-fix"></div>
    </div>

    <el-pagination
      class="main_page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="$store.state.pageLimit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="$store.state.songCount"
    ></el-pagination>
  </div>
</template>

<script>
import { realFormatSecond } from "../utils/common";
import { request } from "../network/request";
export default {
  data() {
    return {
      opt_btns_show: false,
      currentPage: 1,
      type:1
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
    addActive(index) {
      this.opt_btns_show = index;
    },
    removeActive() {
      this.opt_btns_show = -1;
    },
    handleSizeChange(size) {
      this.$store.commit("updatePageLimit", size);
      this.$store.dispatch("search", {
        keyword: this.$store.state.searchvalue,
        type: this.type,
        offset: 0
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      console.log(this.currentPage); //点击第几页
      let offset = (this.currentPage - 1) * this.$store.state.pageLimit;
      this.$store
        .dispatch("search", {
          keyword: this.$store.state.searchvalue,
          type: 1,
          offset: offset
        })
        .then(res => {
          this.$router.push({
            path: "/search",
            query: {
              keywords: this.$store.state.searchvalue,
              limit: 20,
              offset: offset
            }
          });
        });
    },
    fav(id) {
      console.log("收藏" + id);
    },
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
  },
  computed: {
      artist(){
          return function(artists){
              let newStr = artists.map((item,index)=>item.name).join('/')
              return newStr
          }
      }
  } 
};
</script>

<style scoped>
@import url('../assets/css/tabpage/musiclist.css');
</style>