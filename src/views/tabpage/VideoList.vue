<template>
  <div class="videolist">
    <ul v-if="videos.length>0">
      <li class="videoitem" v-for="(video,index) in videos" :key="index">
        <div class="videocover">
          <img :src="getPicUrl(video.coverUrl)" alt class="videoimg" />
          <p class="videopt">{{video.playTime|formatPlayTime}}</p>
          <p class="vidodura">{{video.durationms|formatSecond}}</p>
        </div>
        <h4 class="videotitle" :title="video.title" v-if="video.type==0">
          <i class="mvicon" ></i>
          <router-link tag="a" :to="{path:'mv',query:{id:video.vid}}">{{video.title}}</router-link>
        </h4>
        <h4 class="videotitle" :title="video.title" v-else>
          <router-link tag="a" :to="{path:'video',query:{id:video.vid}}">{{video.title}}</router-link>
        </h4>
        <h5 class="videocreator" :title="getCreatorName(video.creator)">{{getCreatorName(video.creator)}}</h5>
      </li>
      <div class="clear-fix"></div>
      <el-pagination
      class="main_page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="$store.state.pageLimit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="videoCount"
    ></el-pagination>
    </ul>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { TYPE } from "../../utils/common";
import {realFormatSecond} from "../../utils/common"

export default {
  data() {
    return {
      currentPage: 1
    };
  },
  methods: {
    handleSizeChange(size) {
      this.$store.commit("updatePageLimit",size);
      this.$store.dispatch("search", {
        keyword: this.$store.state.searchvalue,
        type: TYPE.video,
        offset: 0
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      let offset = (this.currentPage - 1) * this.$store.state.pageLimit;
      this.$store
        .dispatch("search", {
          keyword: this.$store.state.searchvalue,
          type: TYPE.video,
          offset: offset
        })
        .then(res => {
          this.$router.push({
            path: "/search",
            query: {
              keywords: keyword,
              limit: 20,
              offset: offset
            }
          });
        });
    }
  },
  computed: {
    ...mapState("videolist", ["videos", "videoCount"]),
    getPicUrl() {
      return url => {
        return url + "?param=159y90";
      };
    },
    getCreatorName(){
      return (creator)=>{
        return creator.map((item,index)=>item.userName).join('/')
      }
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
  },
};
</script>

<style scoped>
@import url("../../assets/css/tabpage/videolist.css");
</style>