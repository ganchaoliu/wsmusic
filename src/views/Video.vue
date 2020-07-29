<template>
  <div class="mv_bg">
    <div class="mv_main">
      <div class="mv_left">
        <div class="mv_ltop">
          <div class="mv_title" v-if="mv_detail.data.title">
            <h2 :title="mv_detail.data.title">
              <!-- <i></i> -->
              {{mv_detail.data.title}}
            </h2>
            <span>by{{mv_detail.data.creator.nickname}}</span>
          </div>
          <span>{{mv_detail.data.artistName}}</span>
          <div class="mv_player">
            <video :src="mv_url" controls autoplay></video>
          </div>
        </div>
        <div class="mv_btns">
          <w-button v-slot:value :type='"like"'>({{mv_detail.data.praisedCount}})</w-button>
          <w-button v-slot:value :type='"fav"'>({{mv_detail.data.subscribeCount}})</w-button>
          <w-button v-slot:value :type='"share"'>({{mv_detail.data.shareCount}})</w-button>
          <!-- <a href class="v_btn">赞({{mv_detail.data.praisedCount}})</a>
          <a href class="v_btn">收藏({{mv_detail.data.subscribeCount}})</a>
          <a href class="v_btn">转发({{mv_detail.data.shareCount}})</a> -->
        </div>
        <div class="mv_comments">
                    <comments type='video' :sourceId='$route.query.id'></comments>
                </div>
      </div>
      <div class="mv_right">
        <h3>
          <span>视频简介</span>
        </h3>
        <div class="mv_desc">
          <p>发布时间：{{mv_detail.data.publishTime}}</p>
          <p>播放次数：{{mv_detail.data.playTime | formatPlayTime}}</p>
          <p>{{mv_detail.data.description}}</p>
        </div>
        <h3>
          <span>相关推荐</span>
        </h3>
        <ul class="mv_tuijian" v-if="mvs">
          <li v-for="(mv,index) in mvs" :key="index">
            <div class="mv_cover">
              <img :src="mv.coverUrl" alt />
            </div>
            <div class="mv_content">
              <p>
                <router-link :to="{name:'video',query:{id:mv.vid}}" :title="mv.title">{{mv.title}}</router-link>
              </p>
              <p>{{mv.durationms | formatSecond}}</p>
              <p>{{mv.creator[0].userName}}</p>
            </div>
            <div class="clear-fix"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../network/request";
import { realFormatSecond } from "../utils/common";
import WButton from "../components/common/WButton";

    import Comments from "../views/comment/Comment"




export default {
  name: "mv",
  data() {
    return {
      mv_url: "",
      mv_detail: {
        data: {
          name: "",
          artistName: "",
          subCount: "",
          shareCount: "",
          publishTime: "",
          playCount: "",
          desc: ""
        }
      },
      comments:{},
      mvs: [],
      likedCount: 0
    };
  },
  methods: {
    init() {
      request({
        url: "/api/video/url",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        console.log("mv链接");
        console.log(res);
        this.mv_url = res.data.urls[0].url;
      });
      request({
        url: "/api/video/detail",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        console.log("mv详情");
        console.log(res);
        this.mv_detail = res.data;
        document.title = this.mv_detail.data.title
      });
      request({
        url: "/api/related/allvideo",
        params: {
          id: this.$route.query.id
        }
      }).then(res => {
        console.log("推荐MV");
        console.log(res);
        this.mvs = res.data.data;
      });
      // request({
      //     url:"/api/mv/detail/info",
      //     params:{
      //         mvid:this.$route.query.id
      //     }
      // }).then((res)=>{
      //     console.log("赞MV")
      //     console.log(res)
      //     this.likedCount = res.data.likedCount
      // })
    }
  },
  created() {
    this.init();
  },
  watch: {
    $route() {
      this.init();
    }
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
  },components: {
    WButton,
    Comments
  }
};
</script>

<style scoped>
@import "../assets/css/mv.css";
</style>