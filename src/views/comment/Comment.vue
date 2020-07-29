<template>
  <div class="comments">
    <div class="comments_input">
      <div class="input_header">
        <h3>评论</h3>
        <span>共{{data.total}}条评论</span>
      </div>
      <div class="input_body">
        <div class="input_cover">
          <img
            src="http://p4.music.126.net/4mvePD_-tB2aN2-q4d8IDg==/109951165071028162.jpg?param=50y50"
            alt
          />
        </div>
        <div class="input_cnt">
          <textarea placeholder="评论" v-model="comment_text"></textarea>
          <div class="input_btns">
            <i class="input_icon"></i>
            <i class="input_rel"></i>
            <a href class="input_submit">评论</a>            
            <span class="text_length">{{140-comment_text.length}}</span>
          </div>
          <em class="arr">◇</em>
          <em class="arr_clear">◆</em>
        </div>
      </div>
    </div>
    <div class="comments_body" v-if="data.total>0">
      <div class="item_hot clear-fix" v-if='data.hotComments!=undefined' v-show='currentPage==1'>
        <h3 v-show="data.hotComments.length>0">精彩评论</h3>
        <ul>
          <li v-for="item in data.hotComments" :key="item.commentId" class="clear-fix">
            <div class="comments_item">
              <div class="item_cvr">
                <img :src="item.user.avatarUrl+'?param=50y50'" alt />
              </div>

              <div class="item_cnt">
                <div class="item_title">
                  <a href class="item_owner">{{item.user.nickname}}</a>
                  <i></i>
                  <img
                    v-show="item.user.vipRights!=null"
                    src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png?param=39y12"
                    alt
                  />
                  :{{item.content}}
                </div>
                <div class="item_reply" v-if="item.beReplied.length>0">
                  <a href>{{item.beReplied[0].user.nickname}}</a>
                  <i></i>
                  <img
                    v-show="item.beReplied[0].user.vipRights!=null"
                    src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png?param=39y12"
                    alt
                  />
                  :{{item.beReplied[0].content}}
                  <em class="arr">◆</em>
                  <em class="arr_clear">◆</em>
                </div>
                <div class="item_btns">
                  <span class="comment_date">{{formateDate(item.time,'Y年m月d日 H时i分')}}</span>
                  <a href='#' class="item_like" @click="like(item.commentId)">
                    <i :class="item.liked?'liked_icon':'like_icon'"></i>
                    ({{item.likedCount|formatPlayTime}})
                  </a>
                  <span>|</span>
                  <a href class="item_repbtn">回复</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="item_new" v-if='data.comments.length>0'>
        <h3>最新评论({{data.total}})</h3>
        <ul>
          <li v-for="item in data.comments" :key="item.commentId" class="clear-fix">
            <div class="comments_item">
              <div class="item_cvr">
                <img :src="item.user.avatarUrl+'?param=50y50'" alt />
              </div>

              <div class="item_cnt">
                <div class="item_title">
                  <a href class="item_owner">{{item.user.nickname}}</a>
                  <i></i>
                  <img
                    v-show="item.user.vipRights!=null"
                    src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png?param=39y12"
                    alt
                  />
                  :{{item.content}}
                </div>
                <div class="item_reply" v-if="item.beReplied.length>0">
                  <a href>{{item.beReplied[0].user.nickname}}</a>
                  <i></i>
                  <img
                    v-show="item.beReplied[0].user.vipRights!=null"
                    src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png?param=39y12"
                    alt
                  />
                  :{{item.beReplied[0].content}}
                  <em class="arr">◆</em>
                  <em class="arr_clear">◆</em>
                </div>
                <div class="item_btns">
                  <span class="comment_date">{{formateDate(item.time,'Y-m-d')}}</span>
                  <a href class="item_like">
                    <i class="like_icon"></i>
                    ({{item.likedCount|formatPlayTime}})
                  </a>
                  <span>|</span>
                  <a href class="item_repbtn">回复</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination
      class="main_page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="data.total"
    ></el-pagination>

    </div>
  </div>
</template>

<script>
import { formatDate } from "../../utils/common";
import {request} from "../../network/request";
export default {
    data() {
        return {
            comment_text:'',
            currentPage:1,
            data:{},
            pageSize:20
        }
    },
  props: {
    type: {
      type: String,
      default: "new",
    },
    // data: {
    //   type: Object,
    //   default: {},
    // },
    sourceId:{
        type:String
    }
  },
  methods: {
     like(id){
        console.log(this.sourceId)
        console.log(this.type)
        console.log(id)
     },
     handleSizeChange(size) {
         console.log(size)
         this.pageSize = size         
         this.getComments(this.sourceId)
    //   this.$store.commit("updatePageLimit", size);
    //   this.$store.dispatch("search", {
    //     keyword: this.searchvalue,
    //     type: this.type,
    //     offset: 0
    //   });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getComments(this.sourceId)
    //   let offset = (this.currentPage - 1) * this.pageLimit;
    //   this.$store
    //     .dispatch("search", {
    //       keyword: this.searchvalue,
    //       type: 1,
    //       offset: offset
    //     })
    //     .then(res => {
    //       this.$router.push({
    //         path: "/search",
    //         query: {
    //           keywords: this.searchvalue,
    //           limit: 20,
    //           offset: offset
    //         }
    //       });
    //     });
    },
    getComments(id){
        const commentUrl = "/api/comment/"+this.type
        request({
        url: commentUrl,
        params: {
          id: id,
          limit:this.pageSize,
          offset:(this.currentPage-1)*this.pageSize
        }
      }).then(res =>{
          console.log('in comments')
        console.log(res)
        this.data = res.data
      }).catch((err)=>{
        // console.log(err)
      })
    }
  },
  created () {
      this.getComments(this.sourceId)
  },
  watch: {
    $route(){
        this.getComments(this.sourceId)
    }  
  },
  computed: {
    formateDate() {
      return (date, format) => {
        return formatDate(date, format);
      };
    },
  },
  filters: {
    commentformateDate(date, format) {
      return formatDate(date, format);
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
}

</script>

<style lang="css" scoped>
.comments {
  width: 100%;
}

.input_header {
  margin-top: 20px;
  width: 100%;
  height: 33px;
  border-bottom: 2px solid #c20c0c;
}

.input_header h3 {
  float: left;
  font-weight: normal;
  font-size: 20px;
  line-height: 28px;
  margin-right: 10px;
  color: #333;
}

.input_header span {
  float: left;
  margin-top: 12px;
  display: block;
  font-size: 12px;
  color: #666;
}

.input_body {
  margin-top: 20px;
  width: 100%;
  height: 98px;
}

.input_body .input_cover {
  float: left;
  width: 12%;
  height: 98px;
}

.input_body .input_cover img {
  width: 50px;
  height: 50px;
}

.input_body .input_cnt {
  float: left;
  width: 88%;
  height: 98px;
  position: relative;
}

.input_body .input_cnt textarea {
  padding: 6px;
  width: 100%;
  height: 63px;
  font-size: 12px;
  line-height: 18px;
  color: #333;
  border: 1px solid #cdcdcd;
  overflow-y: auto;
  outline: none;
  resize: none;
  background-color: #fff;
  z-index: 9999;
}

.input_body .input_cnt .arr {
  position: absolute;
  top: 10px;
  left: -6px;
  font-size: 20px;
  font-style: normal;
  color: #cdcdcd;
  z-index: 1;
}

.input_body .input_cnt .arr_clear {
  position: absolute;
  top: 10px;
  left: -5px;
  font-size: 20px;
  font-style: normal;
  color: #fff;
  z-index: 2;
}

.input_cnt .input_btns {
  width: 100%;
  height: 35px;
  padding-top: 10px;
  font-size: 12px;
}

.input_cnt .input_btns .input_icon,
.input_rel {
  cursor: pointer;
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url("../../assets/img/icon.png") no-repeat 0 -9999px;
}

.input_cnt .input_btns .input_icon {
  margin-right: 10px;
  background-position: -40px -490px;
}

.input_cnt .input_btns .input_rel {
  background-position: -60px -490px;
}

.input_cnt .input_btns .input_submit {
  float: right;
  text-align: center;
  width: 46px;
  height: 25px;
  font-size: 12px;
  line-height: 25px;
  color: #fff;
  background: url("../../assets/img/button.png") no-repeat 0 -9999px;
  background-position: -84px -64px;
}

.text_length{
    float: right;
    font-size: 12px;
    line-height: 25px;
    color: #666;
}

/* #############评论正文开始############## */

.comments_body {
  width: 100%;
  margin-top: 20px;
}

.comments_body h3 {
  width: 100%;
  font-size: 12px;
  line-height: 18px;
  color: #333;
  border-bottom: 1px solid #ccc;
}

.comments_body ul {
  width: 100%;
  margin-top: -1px;
}

.comments_body ul li {
  padding-bottom: 10px;
  padding-top: 15px;
  border-bottom: 1px dotted #666;
}

.comments_body ul li:last-child {
  padding-bottom: 10px;
  padding-top: 15px;
  border-bottom: none;
}

/* .comments_body ul:first-child{
    margin-top:-1px;
    border-top: 1px dotted #eee;
} */

.comments_item {
  position: relative;
}

.comments_item .item_cvr {
  float: left;
  width: 12%;
}

.comments_item .item_cnt {
  float: left;
  width: 88%;
}

.comments_item .item_cnt .item_title {
  font-size: 12px;
  line-height: 20px;
  color: #666;
}

.comments_item .item_cnt .item_title a,
i,
img {
  margin-right: 3px;
}

.comments_item .item_cnt .item_reply {
  padding: 8px 19px;
  margin-top: 10px;
  font-size: 12px;
  line-height: 20px;
  color: #666;
  background-color: #f4f4f4;
  border: 1px solid #dedede;
  position: relative;
}

.comments_item .item_cnt .item_btns {
  margin-top: 15px;
  text-align: right;
}

.comments_item .item_cnt .item_btns .comment_date {
  display: block;
  float: left;
  line-height: 18px;
  color: #999;
}

.comments_item .item_cnt .item_btns a,
span {
  font-size: 12px;
  margin-right: 5px;
}

.comments_item .item_cnt .item_btns .item_like .like_icon {
  display: inline-block;
  position: relative;
  top: 2px;
  width: 15px;
  height: 14px;
  background: url("../../assets/img/icon2.png") no-repeat -150px 0;
}

.comments_item .item_cnt .item_btns .item_like .liked_icon {
  display: inline-block;
  position: relative;
  top: 2px;
  width: 15px;
  height: 14px;
  background: url("../../assets/img/icon2.png") no-repeat -170px 0;
}

.item_reply .arr {
  position: absolute;
  top: -10px;
  left: 15px;
  font-style: normal;
  font-size: 20px;
  color: #dedede;
}

.item_reply .arr_clear {
  position: absolute;
  top: -9px;
  left: 15px;
  font-style: normal;
  font-size: 20px;
  color: #f4f4f4;
}

.comments_body .item_hot {
  margin-bottom: 20px;
}

.comments_body .item_new {
  margin-bottom: 10px;
}
</style>