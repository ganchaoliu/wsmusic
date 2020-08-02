<template>
  <div class="main">
    <div class="album clear-fix">
      <div class="album_left">
        <div class="album_h">
          <div class="album_info">
            <div class="album_cover">
              <img :src="album.picUrl+'?param=177y177'" alt />
            </div>
            <div class="album_content">
              <div class="a_title clear-fix">
                <em></em>
                <div class="tit">
                  <h2>{{album.name}}</h2>
                  <p style="white-space:nowrap;color:#999;font-size:12px">{{album.alias.join('/')}}</p>
                </div>
              </div>
              <p>
                歌手：
                <router-link
                  :to="{name:'artist',query:{id:item.id}}"
                  v-for="item in album.artists"
                  :key="item.name+item.id"
                  tag="a"
                >{{item.name}}</router-link>
              </p>
              <p>发行时间：2020-06-10</p>
              <p v-show="album.company!==''">发行公司：{{album.company}}</p>
              <div class="album_btns">
                <play-button @click="play"></play-button>
                <add-button style="margin-right:5px" @click="add"></add-button>
                <w-button type="fav" :sub='false' @click='fav' v-slot:value></w-button>
                <w-button type="share" v-slot:value>({{dynamic.shareCount|formatNumber}})</w-button>
                <w-button type="download" v-slot:value ></w-button>
                <w-button type="comment"  v-slot:value>({{dynamic.commentCount|formatNumber}})</w-button>
              </div>
            </div>
            <div class="clear-fix"></div>
          </div>
          <div class="album_desc" v-if="album.description!==null">
            <h3>专辑介绍：</h3>
            <p v-for="(item,index) in descArray" v-show="!(index>5&&hide)" :key="index">{{item}}</p>
            <p
              v-show="descArray.length>5"
              @click="hide = !hide"
              v-html="hide?'展开':'收起'"
              style="text-align:right;cursor:pointer"
            ></p>
          </div>
        </div>
        <div class="album_l">
          <div class="al_title">
            <div class="outlink">
              <i></i>
              <a href>生成外链播放器</a>
            </div>
            <h3>包含歌曲列表</h3>
            <span>{{songs.length}}首歌</span>

          </div>

          <div class="al_songlist ">
            <song-list :Songs="songs"></song-list>
          </div>
        </div>
        <div class="clear-fix"></div>
        <div class="album_c clear-fix">
          <comments :sourceId='$route.query.id+""' type='album'></comments>
        </div>
      </div>
      <div class="album_right">
        <h3>喜欢这张专辑的人</h3>
        <ul>
          <li></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PlayButton from "../../components/common/PlayButton";
import AddButton from "../../components/common/AddButton";
import WButton from "../../components/common/WButton";
import Comments from "../../views/comment/Comment"
import SongList from "./SongList";
import { request } from "../../network/request";
export default {
  data() {
    return {
      hide: true,
      songs: [],
      album: {
        name: "",
        picUrl: "",
        alias: [],
        company: "",
        publishTime: "",
        description: "",
      },
      dynamic: {
        commentCount: 0,
        shareCount: 0,
        subCount: 0,
      },
      comments:{}
    };
  },
  components: {
    PlayButton,
    AddButton,
    WButton,
    SongList,
    Comments
  },
  methods: {
    fav(){
      console.log('w-button')
    },
    play(){
      console.log('play_button')
    },
    add(){
      console.log('add_button')
    },
    getAlbumDynamic(aid) {
      request({
        url: "/api/album/detail/dynamic",
        params: {
          id: aid,
        },
      }).then((res) => {
        console.log('动态');
        console.log(res);
        this.dynamic = res.data;
      });
    },
    getAlbum(aid) {
      request({
        url: "/api/album",
        params: {
          id: aid,
        },
      }).then((res) => {
        console.log('专辑信息');
        console.log(res)
        this.album = res.data.album;
        this.songs = res.data.songs;
        document.title=this.album.name+'-专辑-'+'网易云音乐'
      });
    },
  },
  computed: {
    artists() {
      return function (artists) {
        let newStr = artists.map((item, index) => item.name).join("/");
        return newStr;
      };
    },
    descArray() {
      if (this.album.description !== null) {
        return this.album.description.split("\n");
      }
    },
  },

  created() {
    const id = this.$route.query.id;
    this.getAlbum(id);
    this.getAlbumDynamic(id);
  },
  filters: {
    formatNumber(playtime){
      let str = "";
      if (playtime > 10000) {
        str = (playtime / 10000).toFixed(2) + "万";
      } else {
        str = playtime;
      }
      return str;
    }
  }
};
</script>

<style lang='css' scoped>
@import url("../../assets/css/album/album.css");
</style>