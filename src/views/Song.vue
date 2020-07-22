<template>
  <div>
    <div class="song_main">
      <div class="song_left left">
        <div class="song_top">
          <div class="song_lyric">
            <div class="covermodel">
              <div class="song_cover">
                <img
                  :src="songcovr"
                  alt
                />
                <i></i>
              </div>
              <div class="out_link">
                <i></i>生成外链播放器
              </div>
            </div>
            <div class="song_desc">
              <div class="song_title">
                <i></i>
                <span>{{song.name}}</span>
                <div class="clear-fix"></div>
              </div>
              <p class="song_artist">
                歌手：
                <router-link tag='a' v-for="(item,index) in song.artist" :to="{name:'artist',query:{id:item.id}}"  :key="index">{{item.name}}</router-link>
              </p>
              <p class="song_album">
                专辑：
                <a href="#">{{song.album.name}}</a>
              </p>
              <div class="song_operation">
                <a href class="song_btn_play">
                  <i>
                    <em class="play_btn"></em>播放
                  </i>
                </a>
                <a href class="song_btn_add">+</a>
                <a href class="song_btn_fav">
                  <i>收藏</i>
                </a>
                <a href class="btn">分享</a>
                <a href class="btn">下载</a>
                <a href class="btn">评论</a>
              </div>

              <div class="song_lyric_content">
                <div class="show_lyric" v-html="showLyric(0)">
                </div>
                <div class="hide_lyric" v-html="hideLyric(15)" v-show="!hide">
                </div>
                <p class="hideOperation" @click='hide = !hide' v-text="hide?'展开':'收起'"></p>
              </div>
            </div>
            <div class="clear-fix"></div>
          </div>
          <div class="user_operation">
            <a href>上传歌词</a>
            <a href>报错</a>
          </div>
        </div>
        <div class="song_comments"></div>
      </div>
      <div class="song_right">
        <div class="right_con">
          <h3>包含这首歌的歌单</h3>
          <ul>
            <li></li>
          </ul>
          <h3>相似歌曲</h3>
          <ul>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from '../network/request'

export default {
  name:'Song',
  data(){
    return{
      songId:0,
      song:{
        coverUrl:'',
        name:'',
        artist:'',
        album:''
      },
      songs:[],
      lyric:[],
      hide:true
    }
    
  },
  methods:{
    async getSongDetail(id){
      console.log(id)
      await request({
        url: "/api/song/detail",
        params: {
          ids: id
        }
      }).then(res =>{
        console.log(res.data.songs[0])
        let songs = res.data.songs[0]
        this.song.coverUrl = songs.al.picUrl
        this.song.name = songs.name
        this.song.artist = songs.ar
        this.song.album = songs.al
      }).catch((err)=>{
        console.log(err)
      })
    },
    async getSongLyric(id){
      console.log(id)
      await request({
        url: "/api/lyric",
        params: {
          id: id
        }
      }).then(res =>{
        let lyric = res.data.lrc.lyric.split("\n");
        let lyricValue = new Array(); //歌词数组
        for (let i = 0; i < lyric.length; i++) {
          //定位]的位置
          let pos = lyric[i].indexOf("]");
          lyricValue.push(lyric[i].substring(pos + 1));
        }
        this.lyric = lyricValue
        console.log(lyricValue)
      }).catch((err)=>{
        console.log(err)
      })
    },
  },
  computed:{
    songcovr(){
      return this.song.coverUrl+'?param=130y130'
    },
    showLyric(){
      return (start)=>{
        if(this.lyric.length>15){
          return this.lyric.slice(start,15).join('<br />')
        }else{
          return this.lyric.slice(start).join('<br />')
        }
      }
    },
    hideLyric(){
      return (start)=>{
        if(this.lyric.length>start){
        return this.lyric.slice(start).join('<br />')
        }
      }
    },

  },
  created () {
    let songId = this.$route.query.ids
    this.songId =songId
    this.getSongDetail(songId)
    this.getSongLyric(songId)
  },
};
</script>

<style scoped>
@import url("../assets/css/song.css");
</style>