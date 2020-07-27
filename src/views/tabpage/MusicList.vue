<template>
  <div class="musiclist">
    <div class="content" v-if="!loading">
    <div
      class="song_item"
      @mouseover="addActive(index)"
      @mouseout="removeActive(index)"
      v-for="(song,index) in songlist"
      :key="index"
      :class="index%2===0?'uslbg':'slbg'"
      
    >
      <div class="td">
        <div class="play_btn" @click="playsong(song.id,song.name,song.album,song.artists[0].name)"></div>
      </div>
      <div class="td sn">
        <router-link tag="a" :to="{name:'song',query:{ids:song.id}}">{{song.name}}</router-link>
        <router-link tag="a" v-if="song.mvid!=0" :to="{name:'mv',query:{id:song.mvid}}" class="song_mv"></router-link>
      </div>
      <div class="td mbtns">
        <opt-buttons 
          :class="index === opt_btns_show?'showOptBtns':'hideOptBtns'" 
          @add='addtoplaylist(song.id,song.name,song.album,song.artists[0].name)'
          @fav='fav(song.id)'
          :btns='["add"]'>
        </opt-buttons>
        <!-- <div class="opt_btns" :class="index === opt_btns_show?'showOptBtns':'hideOptBtns'">
          <a
            class="icn-add"
            @click="addtoplaylist(song.id,song.name,song.album,song.artists[0].name)"
            title="添加到播放列表"
          ></a>
          <a class="icn-fav" @click="fav(song.id)" title="收藏"></a>
          <a class="icn-share" title="分享"></a>
          <a class="icn-download" title="下载"></a>
        </div> -->
      </div>
      <div class="td at">
        <router-link tag="a" :to="{name:'artist',query:{id:song.artists[0].id}}" :title="artist(song.artists)">{{artist(song.artists)}}</router-link>
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
    <div class="loading" v-else>
      <span>数据加载中。。。</span>
    </div>
  </div>
</template>

<script>
import { realFormatSecond } from "../../utils/common";
import { request } from "../../network/request";
import { mapMutations, mapState } from 'vuex';
import OptButtons from '../../components/common/OptButtons'
export default {
  data() {
    return {
      opt_btns_show: false,
      currentPage: 1,
      type:1,
      loading:false
    };
  },
  methods: {
    ...mapMutations({
      'updateCurrentSong':'musicplayer/updateCurrentSong',
      'updatePlaylist':'musicplayer/updatePlaylist'
      }),
    playsong(id, name, album, artist) {
      request({
        url: "/api/song/url",
        params: {
          id: id
        }
      }).then(res => {
        if (res.data.data[0].url != null) {
          const song = {};
          song.id = id;
          song.name = name;
          song.song = res.data.data[0];
          song.album = album;
          song.artist = artist;
          this.updateCurrentSong(song)
          let checkresult = this.playlist.some(item => {
            if (item.id == id) {
              return true;
            }
          });
          if (checkresult) {
            this.tip_message = "已在播放列表中";
          } else {
            this.updatePlaylist(song);
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
          let checkresult = this.playlist.some(item => {
            if (item.id == id) {
              return true;
            }
          });
          if (!checkresult) {
            this.updatePlaylist(song);
          }else{
            this.tip_message = "已在播放列表中";
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
        keyword: this.searchvalue,
        type: this.type,
        offset: 0
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      let offset = (this.currentPage - 1) * this.pageLimit;
      this.$store
        .dispatch("search", {
          keyword: this.searchvalue,
          type: 1,
          offset: offset
        })
        .then(res => {
          this.$router.push({
            path: "/search",
            query: {
              keywords: this.searchvalue,
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
    ...mapState('musicplayer',['currentsong','playlist']),
    ...mapState(['searchvalue','pageLimit']),
      artist(){
          return function(artists){
              let newStr = artists.map((item,index)=>item.name).join('/')
              return newStr
          }
      },
      songlist(){
        return this.$store.state.songlist
      }
  },
  components: {
    OptButtons
  }
};
</script>

<style lang='css' scoped>
@import url('../../assets/css/tabpage/musiclist.css');
</style>