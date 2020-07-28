<template>
  <div class="songlist_bg">
    <div class="mysonglist_main clear-fix">
      <div class="songlist_left">
        <div class="slmain clear-fix">
          <router-link :to="{name:'myartist'}" tag="h2">我的歌手({{collectArtist.length}})</router-link>
          <router-link :to="{name:'mymv'}" tag="h2">我的视频({{collectMV.length}})</router-link>
          <div class="mycreate_sl clear-fix">
            <h2 @click="showMycreateList">
              <span>
                <i></i>
                创建的歌单({{myCreate_Songlist.length}})
              </span>
            </h2>
            <ul v-show="csl_show">
              <router-link
                v-for="(item,index) in myCreate_Songlist"
                :to="{name:'songlist',query:{id:item.id}}"
                :key="index"
                tag="li"
                class="list_item clear-fix"
              >
                <div class="left_img">
                  <img :src="item.coverImgUrl" alt />
                </div>
                <div class="left_detail">
                  <p>{{item.name}}</p>
                  <p>{{item.trackCount}}首</p>
                </div>
              </router-link>
            </ul>
          </div>
          <div class="mycollect_sl">
            <h2 @click="showMycollectList">收藏的歌单({{myCollect_Songlist.length}})</h2>
            <ul v-show="cll_show">
              <router-link
                v-for="(item,index) in myCollect_Songlist"
                :to="{name:'songlist',query:{id:item.id}}"
                :key="index"
                tag="li"
                class="clear-fix"
              >
                <div class="left_img">
                  <img :src="item.coverImgUrl" alt />
                </div>
                <div class="left_detail">
                  <p>{{item.name}}</p>
                  <p>{{item.trackCount}}首</p>
                </div>
              </router-link>
            </ul>
          </div>
        </div>
      </div>
      <div class="songlist_right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../network/request";

export default {
  name: "MySongList",
  data() {
    return {
      myCreate_Songlist: [],
      myCollect_Songlist: [],
      csl_show: true,
      cll_show: true,
      initData: {},
      collectArtist: [],
      collectMV: []
    };
  },
  methods: {
    showMycreateList() {
      this.csl_show = !this.csl_show;
    },
    showMycollectList() {
      this.cll_show = !this.cll_show;
    },
    async getCollectArtist() {
      await request({
        url: "/api/artist/sublist"
      }).then(res => {
        this.collectArtist = res.data.data;
        console.log(res.data.data);
      });
    },
    async getCollectMV() {
      await request({
        url: "/api/mv/sublist"
      }).then(res => {
        this.collectMV = res.data.data;
        console.log(res.data.data);
      });
    },
    getSonglist(userId) {
      console.log('用户id：'+userId);
      request({
        url: "/api/user/playlist",
        params: {
          uid: userId
        }
      }).then(res => {
        this.initData = res.data;
        let playlist = res.data.playlist;
        playlist.forEach(value => {
          if (value.userId === userId) {
            this.myCreate_Songlist.push(value);
          } else {
            this.myCollect_Songlist.push(value);
          }
        });
        console.log(res);
      });
    },
    init() {}
  },
  beforeMount() {
    console.log("SongList挂载时执行");
    if (this.$store.state.loginStatus) {
      let userId = this.$store.state.userData.account.id;
      this.getCollectArtist();
      this.getCollectMV();
      this.getSonglist(userId);
    } else {
      alert("请先登陆");
      this.$router.push("/login");
    }
  },
  watch: {
    myCreate_Songlist(){
      this.$router.replace({name:'songlist',query:{id:this.myCreate_Songlist[0].id}})
    }
  }
};
</script>

<style scoped>
@import url("../assets/css/mysonglist.css");
</style>