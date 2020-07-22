<template>
  <div class="hotsonglist">
    <div
      class="hot_song_item"
      @mouseover="addActive(index)"
      @mouseout="removeActive(index)"
      v-for="(song,index) in hotSongs"
      :key="index"
      :class="index%2===0?'':'slbg'"
    >
      <div class="td">
        <div class="number">{{index+1}}</div>
      </div>
      <div class="td">
        <div class="play_btn" @click="playsong(song.id,song.name,song.al,song.ar[0].name)"></div>
      </div>
      <div class="td sn">
        <router-link tag="a" :to="{name:'song',query:{ids:song.id}}">{{song.name}}</router-link>
        <router-link tag="a" v-if="song.mv!=0" :to="{name:'mv',query:{id:song.mv}}" class="song_mv"></router-link>
      </div>
      <div class="td btns">
          <div class="opt_btns" :class="index === opt_btns_show?'showOptBtns':'hideOptBtns'">
          <a
            class="icn-add"
            @click="addtoplaylist(song.id,song.name,song.al,song.ar[0].name)"
            title="添加到播放列表"
          ></a>
          <a class="icn-fav" @click="fav(song.id)" title="收藏"></a>
          <a class="icn-share" title="分享"></a>
          <a class="icn-download" title="下载"></a>
        </div>
      </div>
      <div class="td dura">        
        <div>{{song.dt|formatSecond}}</div>
      </div>
      <div class="td al">
        <router-link tag="a" to :title="song.al.name">《{{song.al.name}}》</router-link>
      </div>
      <div class="clear-fix"></div>
    </div>
  </div>
</template>

<script>
import { realFormatSecond } from "../../utils/common";
import { request } from "../../network/request";
import { mapState,mapMutations } from 'vuex';

export default {
  name: "HotSongList",
  data() {
    return {
      opt_btns_show: false,
      currentPage: 1,
      type: 1
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
          if (checkresult) {
            alert("已在播放列表中");
          } else {
            this.updatePlaylist(song);
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
    fav(id) {
      console.log("收藏" + id);
    }
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second / 1000);
    }
  },
  computed: {
    artist() {
      return function(artists) {
        let newStr = artists.map((item, index) => item.name).join("/");
        return newStr;
      };
    },
    hotSongs() {
      return this.$parent.hotSongs;
    },
    ...mapState('musicplayer',['playlist','currentsong'])
  }
};
</script>

<style lang="css" scoped>
@import url("../../assets/css/artist/hotsonglist.css");
</style>