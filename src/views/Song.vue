<template>
  <div>
    <div class="song_main clear-fix">
      <div class="clear-fix"></div>
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
            <div class="song_desc " >
              <div class="song_title">
                <i></i>
                <span>{{song.name}}</span>
                <div class="clear-fix"></div>
              </div>
              <p class="song_artist">
                歌手：
                <router-link tag='a' v-for="(item) in song.artist" :to="{name:'artist',query:{id:item.id}}"  :key="item.id">{{item.name}}</router-link>
              </p>
              <p class="song_album">
                专辑：
                <!-- <a href="#">{{song.album.name}}</a> -->
                <router-link tag='a' :to="{name:'album',query:{id:song.album.id}}">{{song.album.name}}</router-link>
                
              </p>
              <div class="song_operation">
                <play-button @click="playsong(songId, song.name, song.album.name, song.artist)"></play-button>
                <add-button style="margin-right:10px"></add-button>
                <w-button type="fav" ></w-button>
                <w-button type="share" >
                </w-button>
                <w-button type="download" >下载</w-button>
                <w-button type="comment" ></w-button>
              </div>

              <div class="song_lyric_content" >
                <div class="show_lyric" v-html="showLyric(0)">
                </div>
                <div class="hide_lyric" v-html="hideLyric(15)" v-show="!hide" @click='hide = !hide'>
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
        <div class="song_comments">
          <comment :data="comments" :sourceId='$route.query.ids+""' type='music'></comment>
        </div>
      </div>
      <div class="song_right">
        <div class="right_con">
          <!-- <h3>包含这首歌的歌单</h3>
          <ul>
            <li></li>
          </ul> -->
          <h3>相似歌曲</h3>
          <ul v-show="simiSongs.length>0">
            <li class="simisong" v-for="(song) in simiSongs" :key="song.name">
                <div class="songdesc">
                  <router-link tag="a" :to="{name:'song',query:{ids:song.id}}" > {{song.name}} </router-link>
                  <!-- <p>{{song.artists[0].name}}</p> -->
                  <router-link tag="a" :to="{name:'artist',query:{id:song.artists[0].id}}" :title="song.artists[0].name" style="color:#999" > {{song.artists[0].name}} </router-link>
                </div>
                <div class="songop">
                  <a href="javascript:void(0)" class='btn_play' @click="playsong(song.id, song.name, song.album, song.artists)">播</a>
                  <a href="javascript:void(0)" class="btn_add" @click="addtoplaylist(song.id, song.name, song.album, song.artists)">添</a>                  
                </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {request} from '../network/request';
  import { formatDate } from "../utils/common";
  import PlayButton from "../components/common/PlayButton";
  import AddButton from "../components/common/AddButton";
  import WButton from "../components/common/WButton";
  import Comment from "./comment/Comment";
  import { mapMutations, mapState } from 'vuex';

export default {
  name:'Song',
  components: {
    PlayButton,
    AddButton,
    WButton,
    Comment
  },
  data(){
    return{
      songId:0,
      song:{
        coverUrl:'',
        name:'',
        artist:'',
        album:'',
      },      
      simiSongs:[],
      songs:[],
      lyric:[],
      comments:{},
      hide:true
    }
    
  },
  methods:{
    ...mapMutations({
      'updateCurrentSong':'musicplayer/updateCurrentSong',
      'updatePlaylist':'musicplayer/updatePlaylist'
      }),
    init(){
      let songId = this.$route.query.ids
      this.songId =songId
      this.getSongDetail(songId)
      this.getSongLyric(songId)
      this.getSimiSong(songId)
      // this.getComments(songId)
    },
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
    getSimiSong(id){
      request({
        url: "/api/simi/song",
        params: {
          id: id
        }
      }).then(res =>{
        console.log(res.data.songs)
        this.simiSongs = res.data.songs
      }).catch((err)=>{
        // console.log(err)
      })
    },

    getComments(id){
      request({
        url: "/api/comment/music",
        params: {
          id: id
        }
      }).then(res =>{
        console.log(res)
        this.comments = res.data
      }).catch((err)=>{
        // console.log(err)
      })
    },

    async getSongDetail(id){
      // console.log(id)
      await request({
        url: "/api/song/detail",
        params: {
          ids: id
        }
      }).then(res =>{
        console.log(res)
        let songs = res.data.songs[0]
        this.song.coverUrl = songs.al.picUrl
        this.song.name = songs.name
        this.song.artist = songs.ar
        this.song.album = songs.al
        document.title = this.song.name+'-'+songs.ar[0].name
      }).catch((err)=>{
        console.log(err)
      })
    },
    async getSongLyric(id){
      // console.log(id)
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
        // console.log(lyricValue)
      }).catch((err)=>{
        console.log(err)
      })
    },
  },
  computed:{
    ...mapState('musicplayer',['currentsong','playlist']),
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
    songid(){
      return this.$route.query.ids
    },
    artists(){
      return (artists)=>{
        let newStr = artists.map((item,index)=>item.name).join('/')
              return newStr
      }
    },
    formateDate() {
      return (date, format) => {
        return formatDate(date, format)
      }
    },

  },
  created () {
    this.init()
  },
  watch: {
    $route(){
      this.init()
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/song.css");
</style>