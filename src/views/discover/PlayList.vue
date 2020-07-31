<template>
  <div class="playlist">
    <div class="playlist_main">
      <div class="pl_title">
        <div class="pl_hotbtn">
          <a href>热门</a>
        </div>
        <h3>
          <span>全部</span>
          <a href>
            <i>
              选择分类
              <em></em>
            </i>
          </a>
        </h3>
      </div>
      <div class="pl_playlist">
        <ul>
          <li v-for="item in data.playlists" :key="item.id" class="pl_item">
              <div class="item_cvr">
                  <img :src="item.coverImgUrl" alt="">
                  <a href=""></a>
                  <div class="cvr_bottom"></div>
              </div>
              <p><router-link :to="{path:'/playlist',query:{id:item.id}}">{{item.name}}</router-link></p>
              <p>by{{item.creator.nickname}}</p>
          </li>
        </ul>
        <div class="page">
        <el-pagination
            layout="prev, pager, next"
            :total="data.total">
        </el-pagination>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  data() {
    return {
      data:{},
      playlist: [],
    };
  },
  methods: {
    getPlayList() {
      request({
        url: "/api/top/playlist",
        params:{
            limit:35
        }
      }).then((res) => {
        console.log(res);
        this.data = res.data
      });
    },
  },
  created () {
      this.getPlayList()
  }
};
</script>

<style lang="css" scoped>
.playlist_main {
  width: 982px;
  padding: 40px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  min-height: 700px;
  background-color: #fff;
  margin: 0px auto;
  overflow: hidden;
}

.pl_title {
  border-bottom: 2px solid #c20c0c;
  padding-bottom: 2px;
}

.pl_hotbtn {
  float: right;
}


.pl_playlist ul{
    margin-top: 30px;
    margin-left: -50px;
}

.pl_item{
    display: inline-block;
    width: 140px;
    height: 188px;
    margin: 0 0 30px 50px;

}
.pl_item .item_cvr img{
    width: 140px;
    height: 140px;
}

.pl_item p{
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
}

.page{
    width: 100%;
    text-align: center;
}

</style>