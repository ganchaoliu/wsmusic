<template>
  <div class="artist_bg">
    <div class="artist_main1 clear-fix">
      <div class="artist_left">
        <div class="artist_ltop">
          <div class="ar_title">
            <h2>{{artist.name}}</h2>
            <h3 v-show="artist.alias.length!=0">{{artist.alias.join('/')}}</h3>
          </div>
          <img :src="getImgUrl(artist.picUrl)" alt />
          <a @click="follow(1)" class="btn_fav" v-show="!artist.followed"></a>
          <a @click="follow(0)" class="btn_unfav" v-show="artist.followed"></a>
        </div>
        <div class="artist_tab">
          <ul>
            <li class="tab_selected">
              <a href>热门作品</a>
            </li>
            <li>
              <a href="#">所有专辑</a>
            </li>
            <li>
              <a href="#">相关MV</a>
            </li>
            <li>
              <a href="#">艺人介绍</a>
            </li>
          </ul>
        </div>
        <div class="artist_top50">
          <div class="artist_btns">
            <play-button></play-button>
            <add-button style="margin-right:10px"></add-button>
            <w-button type="fav" ><template>收藏热门50</template></w-button>
            <!-- <a href class="artist_btn_play">
              <i>
                <em class="play_btn"></em>播放
              </i>
            </a>
            <a href class="artist_btn_add">+</a>
            <a href class="artist_btn_fav">
              <i>收藏热门50</i>
            </a>-->
          </div>
          <component :is="zujian" keep-alive :HSongs="hotSongs"></component>
        </div>
      </div>
      <div class="artist_right">
        <div v-if="simiArtist.length>0" class="clear-fix">
          <h3>
            <span>相似歌手</span>
          </h3>
          <ul class="simi_artists">
            <li v-for="(item,index) in simiArtist" :key="index" class="simi_artist_item">
              <router-link tag="a" :to="{name:'artist',query:{id:item.id}}">
                <img :src="getSimiArtistCvr(item.picUrl)" alt />
              </router-link>
              <router-link tag="a" :to="{name:'artist',query:{id:item.id}}" :title="item.name">
                <p>{{item.name}}</p>
              </router-link>
            </li>
          </ul>
        </div>
        <div v-else>
          <h3>
            <span>热门歌手</span>
          </h3>
          <ul class="simi_artists">
            <li v-for="(item,index) in hotArtistComputed(21)" :key="index" class="simi_artist_item">
              <router-link tag="a" :to="{name:'artist',query:{id:item.id}}">
                <img :src="getSimiArtistCvr(item.picUrl)" alt />
              </router-link>
              <router-link tag="a" :to="{name:'artist',query:{id:item.id}}" :title="item.name">
                <p>{{item.name}}</p>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request";
import PlayButton from "../../components/common/PlayButton";
import AddButton from "../../components/common/AddButton";
import WButton from "../../components/common/WButton";

const HotSongList = () => import("../artist/HotSongList");

export default {
  name: "Artist",
  data() {
    return {
      artist: {
        name: "",
        alias: [],
        followed: false,
      },
      hotSongs: [],
      zujian: "HotSongList",
      simiArtist: [],
      hotArtist:[]
    };
  },
  methods: {
    async init() {
      await this.getSimiArtist();
      await this.getArtist();
      this.getHotArtist()
    },
    follow(follow) {
      request({
        url: "/api/artist/sub",
        params: {
          id: this.artist.id,
          t: follow,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.artist.followed = !this.artist.followed;
        }
      });
    },
    getSimiArtist() {
      request({
        url: "/api/simi/artist",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.simiArtist = res.data.artists;
        }
      });
    },
    getHotArtist() {
      request({
        url: "/api/top/artists",
        params: {
          offset: 0,
          limit:30
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.hotArtist = res.data.artists;
        }
      });
    },
    getArtist() {
      request({
        url: "/api/artists",
        params: {
          id: this.$route.query.id,
        },
      }).then((res) => {
        this.artist = res.data.artist;
        this.hotSongs = res.data.hotSongs;
        console.log("歌手");
        console.log(res);
        console.log("热门歌曲");
        console.log(this.hotSongs);
      });
    },
  },
  computed: {
    getImgUrl() {
      return (url) => {
        return url + "?param=640y300";
      };
    },
    getSimiArtistCvr() {
      return (url) => {
        return url + "?param=50y50";
      };
    },
    hotArtistComputed(){
      return(num)=>{
        return this.hotArtist.slice(0,num)
      }
    }
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    },
  },
  components: {
    HotSongList,
    PlayButton,
    AddButton,
    WButton,
  },
};
</script>

<style scoped>
@import "../../assets/css/artist.css";
</style>