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
            <a href class="input_submit" @click="newComment">评论</a>
            <span class="text_length">{{140-comment_text.length}}</span>
          </div>
          <em class="arr">◇</em>
          <em class="arr_clear">◆</em>
        </div>
      </div>
    </div>
    <div class="comments_body" v-if="data.total>0">
      <div class="item_hot clear-fix" v-if="data.hotComments!=undefined" v-show="currentPage==1">
        <h3 v-show="data.hotComments.length>0">精彩评论</h3>
        <ul>
          <li v-for="item in data.hotComments" :key="item.commentId" class="clear-fix">
            <div class="comments_item" @mouseover="del_btn=item.commentId" @mouseleave="del_btn=-1">
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
                <div v-if="item.beReplied.length>0">
                  <div class="item_reply" v-if="item.beReplied[0].content!==null">
                    <a href>{{item.beReplied[0].user.nickname}}</a>
                    <i></i>
                    <img
                      v-show="item.beReplied[0].user.vipRights!=null"
                      src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png?param=39y12"
                      alt
                    />
                    :
                    <span>{{item.beReplied[0].content}}</span>
                    <em class="arr">◆</em>
                    <em class="arr_clear">◆</em>
                  </div>
                  <div class="item_reply" v-else>
                    评论被删除了
                    <em class="arr">◆</em>
                    <em class="arr_clear">◆</em>
                  </div>
                </div>
                <div class="item_btns">
                  <span class="comment_date">{{formateDate(item.time,'Y年m月d日 H时i分')}}</span>
                  <a
                    href="#"
                    v-show="(del_btn==item.commentId)&(item.user.userId==data.userId)"
                    @click="removeComment(item.commentId)"
                  >删除</a>
                  <span v-show="del_btn&(item.user.userId==data.userId)">|</span>
                  <a href="#" class="item_like" @click="like(item.commentId,item.liked)">
                    <i :class="item.liked?'liked_icon':'like_icon'"></i>
                    ({{item.likedCount|formatPlayTime}})
                  </a>
                  <span>|</span>
                  <a
                    href="javascript:void(0)"
                    class="item_repbtn"
                    @click="replyCommentId=item.commentId"
                  >回复</a>
                </div>
                <div class="reply_comment" v-show="item.commentId==replyCommentId">
                  <div class="input_cnt">
                    <textarea placeholder="评论" v-model="reply_comment_text"></textarea>
                    <div class="input_btns">
                      <i class="input_icon"></i>
                      <i class="input_rel"></i>
                      <a href class="input_submit" @click="replyComment(item.commentId)">评论</a>
                      <span class="text_length">{{140-reply_comment_text.length}}</span>
                    </div>
                    <em class="arr">◆</em>
                    <em class="arr_clear">◆</em>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="item_new" v-if="data.comments.length>0">
        <h3>最新评论({{data.total}})</h3>
        <ul>
          <li v-for="item in data.comments" :key="item.commentId" class="clear-fix">
            <div class="comments_item" @mouseover="del_btn=true" @mouseleave="del_btn=false">
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
                <div v-if="item.beReplied.length>0">
                  <div class="item_reply" v-if="item.beReplied[0].content!==null">
                    <a href>{{item.beReplied[0].user.nickname}}</a>
                    <i></i>
                    <img
                      v-show="item.beReplied[0].user.vipRights!=null"
                      src="https://p1.music.126.net/y8pM-M1mytg6B1ThedCbJA==/109951163709550847.png?param=39y12"
                      alt
                    />
                    :
                    <span>{{item.beReplied[0].content}}</span>
                    <em class="arr">◆</em>
                    <em class="arr_clear">◆</em>
                  </div>
                  <div class="item_reply" v-else>
                    评论被删除了
                    <em class="arr">◆</em>
                    <em class="arr_clear">◆</em>
                  </div>
                </div>

                <div class="item_btns">
                  <span class="comment_date">{{formateDate(item.time,'Y年m月d日 H时i分')}}</span>
                  <a
                    href="#"
                    v-show="del_btn&(item.user.userId==data.userId)"
                    @click="removeComment(item.commentId)"
                  >删除</a>
                  <span v-show="del_btn&(item.user.userId==data.userId)">|</span>
                  <a href="#" class="item_like" @click="like(item.commentId,item.liked)">
                    <i :class="item.liked?'liked_icon':'like_icon'"></i>
                    ({{item.likedCount|formatPlayTime}})
                  </a>
                  <span>|</span>
                  <a
                    href="javascript:void(0)"
                    class="item_repbtn"
                    @click="replyCommentId=item.commentId"
                  >回复</a>
                </div>
                <div class="reply_comment" v-show="item.commentId==replyCommentId">
                  <div class="input_cnt">
                    <textarea
                      :placeholder="'回复'+item.user.nickname+':'"
                      v-model="reply_comment_text"
                    ></textarea>
                    <div class="input_btns">
                      <i class="input_icon"></i>
                      <i class="input_rel"></i>
                      <a
                        href="javascript:void(0)"
                        class="input_submit"
                        @click="replyComment(item.commentId)"
                      >评论</a>
                      <span class="text_length">{{140-reply_comment_text.length}}</span>
                    </div>
                    <em class="arr">◆</em>
                    <em class="arr_clear">◆</em>
                  </div>
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
        v-show="data.total>pageSize"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { formatDate } from "../../utils/common";
import { request } from "../../network/request";
export default {
  data() {
    return {
      comment_text: "",
      reply_comment_text: "",
      currentPage: 1,
      data: {},
      pageSize: 20,
      del_btn: false,
      replyCommentId: 0,
    };
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
    sourceId: {
      type: String,
    },
  },
  methods: {
    newComment() {
      if (this.comment_text.length > 0) {
        const type = this.getType();
        request({
          url: "/api/comment",
          params: {
            id: this.sourceId,
            type: type,
            t: 1,
            content: this.comment_text,
          },
        })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            // console.log(err)
          });
      }
    },
    replyComment(id) {
      if (this.reply_comment_text.length > 0) {
        const type = this.getType();
        request({
          url: "/api/comment",
          params: {
            id: this.sourceId,
            commentId: id,
            type: type,
            t: 2,
            content: this.reply_comment_text,
          },
        })
          .then((res) => {
            console.log(res);
            this.replyCommentId = -1;
          })
          .catch((err) => {
            // console.log(err)
          });
      }
    },
    removeComment(id) {
      const type = this.getType();
      request({
        url: "/api/comment",
        params: {
          id: this.sourceId,
          commentId: id,
          type: type,
          t: 0,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          // console.log(err)
        });
    },
    like(id, liked) {
      let t = liked ? 0 : 1;
      let type = this.getType();
      const commentUrl = "/api/comment/like";
      request({
        url: commentUrl,
        params: {
          id: this.sourceId,
          cid: id,
          type: type,
          t: t,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 200) {
            // this.getComments(this.sourceId)
            // 由于服务器有做了缓存，所以数据没有能及时更新，以下的操作为在前端模拟操作
            let a = this.data.comments.find((item) => {
              console.log(item.commentId);
              return item.commentId == id;
            });
            if (!a) {
              a = this.data.hotComments.find((item) => {
                console.log(item.commentId);
                return item.commentId == id;
              });
            }
            a.liked = !liked;
            if (liked) {
              a.likedCount -= 1;
            } else {
              a.likedCount += 1;
            }
          }
        })
        .catch((err) => {
          // console.log(err)
        });
    },
    getType() {
      return {
        music: 0,
        mv: 1,
        playlist: 2,
        album: 3,
        radio: 4,
        video: 5,
        dynamic: 6,
      }[this.type];
      //  let type = ''
      //  switch(this.type){
      //      case 'music':
      //          type = 0
      //          break;
      //     case 'mv':
      //         type = 1
      //         break;
      //     case 'playlist':
      //         type = 2
      //         break;
      //     case 'album':
      //         type = 3
      //         break;
      //     case 'radio':
      //         type = 4
      //         break;
      //     case 'video':
      //         type = 5
      //         break;
      //     case 'dynamic':
      //         type = 6
      //         break;
      //  }
      //  return type
    },
    handleSizeChange(size) {
      console.log(size);
      this.pageSize = size;
      this.getComments(this.sourceId);
      //   this.$store.commit("updatePageLimit", size);
      //   this.$store.dispatch("search", {
      //     keyword: this.searchvalue,
      //     type: this.type,
      //     offset: 0
      //   });
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getComments(this.sourceId);
    },
    getComments(id) {
      const commentUrl = "/api/comment/" + this.type;
      request({
        url: commentUrl,
        params: {
          id: id,
          limit: this.pageSize,
          offset: (this.currentPage - 1) * this.pageSize,
        },
      })
        .then((res) => {
          console.log(res);
          this.data = res.data;
        })
        .catch((err) => {
          // console.log(err)
        });
    },
  },
  created() {
    this.getComments(this.sourceId);
  },
  watch: {
    $route() {
      this.getComments(this.sourceId);
    },
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
    },
  },
};
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

.text_length {
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

.reply_comment {
  margin-top: 5px;
  width: 100%;
  background: #f8f8f8;
  border: 1px solid #d9d9d9;
  padding: 15px;
  position: relative;
}

.reply_comment .input_cnt textarea {
  width: 100%;
  height: 33px;
  padding: 6px;
  font-size: 12px;
  line-height: 19px;
  border: 1px solid #d9d9d9;
  resize: none;
  outline: none;
  overflow: initial;
  border-radius: 2px;
}

.reply_comment .input_cnt .arr,
.arr_clear {
  position: absolute;

  font-size: 20px;
  font-style: normal;
  z-index: 1;
}

.reply_comment .input_cnt .arr {
  top: -11px;
  right: 16px;
  color: #d9d9d9;
}

.reply_comment .input_cnt .arr_clear {
  top: -9px;
  right: 16px;
  color: #f8f8f8;
}

.comments_body .item_hot {
  margin-bottom: 20px;
}

.comments_body .item_new {
  margin-bottom: 10px;
}
</style>