<template>
  <div class="music_main">
    <div class="music_player">
      <div class="btns">
        <a class="pre" @click="playloop(-1)" title="上一曲"></a>
        <a
          :class="{'pause':audio.playing,'pla':!audio.playing}"
          @click="playorpause"
          :title="audio.playing?'暂停':'播放'"
        ></a>
        <a class="nex" @click="playloop(1)" title="下一曲"></a>
      </div>
      <div class="music_head">
        <el-image
                style="width: 100px; height: 100px"
                :src="album_pic"
                :preview-src-list="album_pic_list">
        </el-image>
<!--        <img :src="album_pic" />-->
        <!-- <a href="/song?id=1363948882" hidefocus="true" class="mask"></a> -->
      </div>

      <div class="play">
        <div class="m_words">
          <router-link tag="a" :to='{name:"song",query:{ids:currentsong.id}}' v-text="displaySongMessage"></router-link>
          <span class="lyric_text" v-text="currentLyricLine"></span>
        </div>
        <div class="m_progress">
          <el-slider
            v-model="sliderTime"
            :format-tooltip="formatProcessToolTip"
            @change="changeCurrentTime"
            column="progress"
            class="progress"
          ></el-slider>
          <el-tag
            type="info"
            class="m_time"
          >{{audio.currentTime|formatSecond}}/{{audio.maxTime| formatSecond}}</el-tag>
          <div class="clearfix"></div>
        </div>
      </div>
      <div class="music_ctrl">
        <div class="v_slider" v-show="vol_show" :tabindex="0" @blur="v_bar_blur">
          <el-slider
            v-model="$store.state.musicplayer.volume"
            @change="changeVolume"
            :format-tooltip="formatVolumeToolTip"
            vertical
            class="volume"
          ></el-slider>
        </div>
        <a class="icon_vol" @click="change_vol_show" :title="change_vol_title"></a>
        <a @click="change_loop" :class="icon_loop" :title="loopString"></a>
        <a class="icon_playlist" @click="gotoplaylist" title="播放列表">{{playlist.length}}</a>
        <transition name="fade">
          <span class="tip" v-show="tip_show">{{tip_message}}</span>
        </transition>
      </div>
      <play-list class="playlist_con"></play-list>
      <audio
        ref="audio"
        :src="song_url"
        @play="onPlay"
        @pause="onPause"
        @loadedmetadata="onLoadedmetadata"
        @timeupdate="onTimeupdate"
        @ended="play_end"
        autoplay
      >浏览器不支持</audio>
      <div class="clearfix"></div>
    </div>
  </div>
</template>

<script>
import { log } from "util";
import { mapState, mapGetters } from "vuex";
const PlayList = () => import("./PlayList");
import { request } from "../../network/request";
import loopM from "../../utils/common";
import {realFormatSecond} from '../../utils/common'

export default {
  name: "MusicPlayer",
  data() {
    return {
      song: {},
      sliderTime: 0,
      lyric: {},
      lyricTime: [],
      currentLyricLine: "",
      audio: {
        // 该字段是音频是否处于播放状态的属性
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0
      },
      vol_show: false,
      position: "",
      tip_show: false,
      tip_message: "",
      album_pic: "",
      album_pic_list:[]
    };
  },
  methods: {
    playorpause() {
      const currentsong = this.currentsong.song.url;
      if (currentsong == "" && this.playlist.length > 0) {
        // this.currentsong = this.playlist[0]
        this.$store.commit("musicplayer/updateCurrentSong", this.playlist[0]);
      } else {
        this.audio.playing ? this.pause() : this.play();
      }
    },
    play() {
      let playPromise = this.$refs.audio.play();
      if(playPromise){
        playPromise.then(()=>{
        }).catch((e)=>{
          this.play()
        })
      }
    },
    pause() {
      this.$refs.audio.pause();
    },
    play_next() {
      let pos = this.playlist.indexOf(
        this.currentsong
      );
      if (pos + 1 < this.playlist.length) {
        // this.currentsong = this.playlist[pos+1]
        this.$store.commit(
          "musicplayer/updateCurrentSong",
          this.playlist[pos + 1]
        );
      } else {
        this.$store.commit("musicplayer/updateCurrentSong", this.playlist[0]);
        this.play();
      }
    },
    playloop(int) {
      if (this.loop == loopM.Sequential) {
        if (int == -1) {
          this.play_pre();
        } else {
          this.play_next();
        }
      } else if (this.loop == loopM.Single) {
        this.play();
      } else if (this.loop == loopM.random) {
        this.playrandom();
      }
    },
    play_pre() {
      const playlist = this.playlist
      let len = playlist.length;
      //获取播放模式是2随机，0顺序，1单曲循环
      // console.log("现在播放列表中有：" + playlist.length + "首歌");
      let pos = this.playlist.indexOf(
        this.currentsong
      );
      if (pos - 1 >= 0) {
        // this.currentsong = this.playlist[pos-1]
        this.$store.commit(
          "musicplayer/updateCurrentSong",
          this.playlist[pos - 1]
        );
      } else {
        // this.currentsong = this.playlist[len-1]
        this.$store.commit(
          "musicplayer/updateCurrentSong",
          this.playlist[len - 1]
        );
      }
    },
    play_end() {
      //播放结束后分析现在的循环模式
      //顺序播放
      // this.play_next()
      //如果是单曲循环则将当前歌曲重新播放一遍
      //随机播放
      this.playloop();
      this.resetLyric();
    },
    playrandom() {
      let playlist = this.playlist;
      let pos = Math.floor(Math.random() * playlist.length);
      // this.currentsong = playlist[pos]
      this.$store.commit("musicplayer/updateCurrentSong", playlist[pos]);
      this.play();
    },
    onPlay() {
      this.audio.playing = true;
      this.$store.commit("musicplayer/updatePlayStatus", true);
      this.$refs.audio.volume = this.volume / 100;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
      this.$store.commit("musicplayer/updatePlayStatus", false);
    },
    onLoadedmetadata(res) {
      this.resetLyric();
      this.audio.maxTime = parseInt(res.target.duration);
      this.getLyric(this.currentsong.id);
      this.getAlbumDetail(this.currentsong.album.id);
    },
    // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime;
      // console.log(this.audio.currentTime)
      this.sliderTime = (this.audio.currentTime / this.audio.maxTime) * 100;
      this.showLyric(this.audio.currentTime);
    },
    showLyric(currentTime) {
      let array = Object.keys(this.lyric);
      if (array.length != 0) {
        let currentLine = 0;
        for (let j = currentLine, len = this.lyricTime.length; j < len; j++) {
          if (
            currentTime < this.lyricTime[j + 1] &&
            currentTime > this.lyricTime[j]
          ) {
            currentLine = j;
            this.currentLyricLine = this.lyric[this.lyricTime[j]];
          }
        }
      }
      // else{
      //     this.currentLyricLine='暂时没有歌词'
      // }
    },
    // 进度条格式化toolTip
    formatProcessToolTip(index = 0) {
      index = parseInt((this.audio.maxTime / 100) * index);
      return realFormatSecond(index);
    },
    // 进度条格式化toolTip
    formatVolumeToolTip(index = 0) {
      return " 音量: " + index;
    },
    changeCurrentTime(res) {
      this.$refs.audio.currentTime = (res / 100) * this.audio.maxTime;
    },
    //改变音量，由于进度条是1-100，音量范围是0-1所以需要进行替换
    changeVolume(pos) {
      this.$store.commit("musicplayer/updateVolume", pos);
      this.$refs.audio.volume = this.volume / 100;
    },
    change_vol_show() {        
      this.vol_show ? (this.vol_show = false) : (this.vol_show = true);
    },
    v_bar_blur(){
        // console.log('失去焦点')
        this.vol_show=false
    },

    change_loop() {
      if (this.loop < loopM.random) {
        this.$store.commit("musicplayer/updateLoop", this.loop+1);
      } else {
        this.$store.commit("musicplayer/updateLoop", loopM.Sequential); 
      }
    },
    gotoplaylist() {
      this.$router.push({
        path: "/mpList"
      });
    },
    //获取专辑封面
    getAlbumDetail(id) {
      request({
        url: "/api/album",
        params: {
          id: id
        }
      }).then(res => {
        console.log('专辑'+id)
        this.album_pic = res.data.album.picUrl;
        this.album_pic_list.push(res.data.album.picUrl)
      }).catch(err=>{
        console.log('专辑'+id)
      });
    },
    //获取歌词信息
    getLyric(id) {
      // console.log("获取歌词信息");
      this.currentLyricLine='歌词加载中...'
      request({
        url: "/api/lyric",
        params: {
          id: id
        }
      }).then(res => {
        // console.log(res)
        // this.currentLyricLine='歌词加载成功'
        let lyric = res.data.lrc.lyric.split("\n");
        let timeArray = res.data.lrc.lyric.match(/\[(.+?)\]/g);
        let lyricValue = new Array(); //歌词数组
        for (let i = 0; i < lyric.length; i++) {
          //定位]的位置
          let pos = lyric[i].indexOf("]");
          lyricValue.push(lyric[i].substring(pos + 1));
        }
        //将时间转化为秒的格式
        let netTA = timeArray.map((value, index) => {
          let strArray = value
            .substring(1, value.indexOf("]"))  //选出内容
            .split(":")  //按：分割字符串
            .map((value, index) => {   //将数值转化为秒
              if (index % 2 == 0) {
                return parseFloat(value) * 60;
              }
              return parseFloat(value);
            })
            .reduce((total, item) => {  //数组求和
              return total + item;
            });
          return strArray;
        });
        this.lyricTime = netTA;
        let obj = {};
        for (let i = 0; i < netTA.length; i++) {
          obj[netTA[i]] = lyricValue[i];
        }
        this.lyric = obj;
      }).catch(err=>{
          console.log(err)
        this.currentLyricLine = '暂时没有歌词哟'
      });
    },
    resetLyric() {
      this.lyricTime = [];
      this.lyric = {};
      this.currentLyricLine = "";
    },
    getArtist(artists){
      let newStr = artists.map((item, index) => item.name).join("/");
        return newStr;
    }
  },
  filters: {
    // 使用组件过滤器来动态改变按钮的显示
    transPlayPause(value) {
      return value ? "暂停" : "播放";
    },
    // 将整数转化成时分秒
    formatSecond(second = 0) {
      return realFormatSecond(second);
    }
  },
  computed: {
    ...mapState('musicplayer',['volume','playlist','currentsong','loop']),
    icon_loop() {
      let loop = this.loop;
      if (loop == loopM.Sequential) {
        loop = "";
      }
      return "icon_loop" + loop;
    },
    isupdate() {
      //返回播放列表长度
      return this.playlist.length;
    },
    song_url() {
      return (
        "https://music.163.com/song/media/outer/url?id=" +
        this.currentsong.id +
        ".mp3"
      );
    },
    displaySongMessage() {
      console.log(this.currentsong.artist)
      // console.log(this.currentsong);
      if (this.currentsong.artist.length>0) {
        return (
          this.currentsong.name +
          "--" +
          this.getArtist(this.currentsong.artist)
        );
      } else {
        return this.currentsong.name;
      }
    },
    loopString() {
      switch (this.loop) {
        case loopM.Sequential:
          return "顺序播放";
          break;
        case loopM.Single:
          return "单曲循环";
          break;
        case loopM.random:
          return "随机播放";
          break;
      }
    },
    change_vol_title() {
      return "音量调节" + this.volume + "%";
    }
  },
  watch: {
    currentsong(){
      this.play()
    },
    isupdate: function(new_data, old_data) {
      //判断是添加播放列表还是删除
      if (new_data > old_data) {
        this.tip_message = "添加播放列表成功";
      } else {
        if (new_data != 0) {
          this.tip_message = "删除播放列表成功";
        } else {
          this.tip_message = "播放列表为空";
        }
      }
      this.tip_show = true;
      setTimeout(() => {
        this.tip_show = false;
      }, 1000);
    }
  },
  components: {
    PlayList
  },
  mounted() {
    this.$store.commit("musicplayer/registerMusicPlayer", this.$refs.audio);
  }
};
</script>

<style scoped>
@import "../../assets/css/music_player.css";
</style>