<template>
  <div class="playlist" >
    <div class="plmain" v-if="playlist.length!==0">
      <ul class="listhd">
        <li>歌曲</li>
        <li>歌手</li>
        <li>专辑</li>
        <li>操作</li>
      </ul>
      <div class="clear-fix"></div>
      <ul
        class="listbd clear-fix"
        v-for="(song,index) in playlist"
        :class="{list2:index%2===0,'pla_hl':iscurrentsong===index}"
        :key="song.id"
      >
        <!--                <li><router-link :to="{path:'/play',query:{id:song.id,name:song.name}}">{{song.name}}</router-link></li>-->
        <li>
          <a @click="play(index)">{{song.name}}</a>
        </li>
        <li>
          <!-- <a href="#">{{song.artist}}</a> -->
          <router-link tag="a" v-for="(item,index) in song.artist" :key='item+index' :to="{name:'artist',query:{id:item.id}}" :title="item.name">{{item.name}}&nbsp;</router-link>
        </li>
        <li>
          <a href="#">{{song.album.name}}</a>
        </li>
        <li>
          <a @click="play(index)">播放</a>
          <a @click="deletefromplaylist(index)">删除</a>
        </li>
        <br />
      </ul>
      <transition name="fade">
        <span class="tip" v-show="tip_show">{{tip_message}}</span>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "playlist",
  data() {
    return {
      tip_message: "添加成功",
      tip_show: false,
    };
  },
  methods: {
    ...mapMutations("musicplayer", ["updateCurrentSong"]),
    play(index) {
      let status = this.currentsong.playing;
      this.updateCurrentSong(this.playlist[index]);
      if (!status) {
        this.music_player.play();
      }
    },
    deletefromplaylist(index) {
      //判断是否是当前播放的歌曲
      let currentSong = this.currentsong;
      let currentIndex = this.playlist.indexOf(currentSong);
      if (currentIndex === index && this.currentsong.playing) {
        this.tip_message = "正在播放中";
        this.tip_show = true;
        setTimeout(() => {
          this.tip_show = false;
        }, 1000);
      } else {
        this.playlist.splice(index, 1);
        this.tip_message = "删除成功";
        this.tip_show = true;
        setTimeout(() => {
          this.tip_show = false;
        }, 1000);
      }
    },
  },
  computed: {
    ...mapState("musicplayer", ["playlist", "currentsong", "music_player"]),
    iscurrentsong() {
      let currentSong = this.currentsong;
      let currentIndex = this.playlist.indexOf(currentSong);
      console.log(currentIndex);
      return currentIndex;
    },
  },
};
</script>

<style scoped>

.plmain{
    width: 1200px;
    margin: 0px auto 65px;
    padding: 40px ;
    position: relative;
    background-color: #fff;
    min-height: 900px;
}

.plmain .tip{
    position: absolute;
    top: 30px;
    left: 500px;
    display: inline-block;
    padding: 10px 10px;
    background-color: rgba(0,0,0,.8);
    font-size: 25px;
    color: white;
    text-align: center;
    border-radius: 10px;
}

.plmain .pla_hl{
    background-color: rgba(0,0,0,.2);
}


.plmain .listbd li{
    float: left;
    width: 220px;
    height: 30px;
    line-height: 30px;
}

.plmain .listbd:hover{
    background-color: #ccc;
}

.plmain .listhd li{
    float: left;
    width: 220px;
    height: 30px;
    line-height: 30px;
    font-size: 18px;
}

.plmain .listbd a{
    cursor: pointer;
    padding-right: 20px;
    color: black;
}

</style>