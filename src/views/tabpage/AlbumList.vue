<template>
  <div class="album_list">
    <ul>
      <li class="ablum_item" v-for="(album,index) in albums" :key="index">
        <div class="album_cvr" @mouseover="showPlayBtn(index)" @mouseout="hidePlayBtn">
          <img :src="getPicUrl(album.picUrl)" alt />
          <a href="" v-show="playBtnIndex===index"></a>
        </div>
        <p :title="album.name"><router-link tag="a" :to='{name:"album",query:{id:album.id}}'>{{album.name}}</router-link></p>
        <p :title="getCreatorName(album.artists)">{{getCreatorName(album.artists)}}</p>
      </li>
      <div class="clear-fix"></div>
    </ul>
    <el-pagination
        class="main_page"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 40]"
        :page-size="$store.state.pageLimit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="albumCount"
      ></el-pagination>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import { TYPE } from "../../utils/common";

export default {
  data() {
    return {
      currentPage: 1,
      playBtnIndex:-1
    };
  },
  methods: {

    handleSizeChange(size) {
      this.$store.commit("updatePageLimit", size);
      this.$store.dispatch("search", {
        keyword: this.$store.state.searchvalue,
        type: TYPE.Album,
        offset: 0
      });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      let offset = (this.currentPage - 1) * this.$store.state.pageLimit;
      this.$store
        .dispatch("search", {
          keyword: this.$store.state.searchvalue,
          type: TYPE.Album,
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
    },
    showPlayBtn(index){
        this.playBtnIndex=index
    },
    hidePlayBtn(){
        this.playBtnIndex = -1
    }
    },

  computed: {
      ...mapState("albumlist", ["albums", "albumCount"]),
      getPicUrl() {
        return url => {
          return url + "?param=180y180"
        }
      },
      getCreatorName() {
        return creator => {
          return creator.map((item, index) => item.name).join("/")
        }
      }
    }
  
};
</script>

<style scoped>
@import url("../../assets/css/tabpage/albumlist.css");
</style>