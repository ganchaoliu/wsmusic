<template>
  <div class="addplaylist" v-if="visiable">
      <div class="head" v-drag>
        <i class="close_ico" @click="close"></i>
        <span>{{title}}</span>
      </div>
      <div class="main">
        <div class="newpl" @click="isNew=true">
          <i class="add_ico"></i>新歌单
        </div>
        <ul class="mypl">
          <li
            class="mypl_item"
            @click="addToPlayList(item.id)"
            v-for="item in myCreate_Songlist"
            :key="item.id"
          >
            <div class="pl_cvr">
              <img :src="item.coverImgUrl+'?param=40y40'" alt="cvr"/>
            </div>
            <p class="item_title">{{item.name}}</p>
            <p class="item_count">{{item.trackCount}}</p>
            <div class="clear-fix"></div>
          </li>
        </ul>
      </div>
      <new-playlist @addPlaylist='addToPlayList' v-show="isNew" @close='isNew=false'></new-playlist>
  </div>
    
</template>

<script>
import { request } from "../../network/request";
import NewPlaylist from "../../views/dialog/NewPlaylist";
export default {
  data() {
    return {
      myCreate_Songlist: [],
      myCollect_Songlist: [],
      initData: {},
      isNew: false,
    };
  },
  props: {
    visiable:{
      type:Boolean,
      default:false
    },
    opId: {
      type: Number,
      default: -1,
    },
    title:{
      type:String
    }
  },
  methods: {
    init() {
      if (this.$store.state.loginStatus) {
        let userId = this.$store.state.userData.account.id;
        this.getSonglist(userId);
      } else {
        this.$store.commit("updateShowLogin", true);
      }
    },
    changeToAdd() {
      this.isNew = true;
    },
    drag(event) {
      let mouseX = event.pageX;
      let mouseY = event.pageY;
      let disx = mouseX - event.target.offsetLeft;
      let disy = mouseY - event.target.offsetTop;
      event.target.style.left = mouseX + "px";
      event.target.style.top = mouseY + "px";
    },
    getSonglist(userId) {
      console.log("用户id：" + userId);
      request({
        url: "/api/user/playlist",
        params: {
          uid: userId,
          timestamp:Date.parse(new Date())
        },
      })
        .then((res) => {
          this.initData = res.data;
          let playlist = res.data.playlist;
          this.myCreate_Songlist = [];
          playlist.forEach((value) => {
            if (value.userId === userId) {
              this.myCreate_Songlist.push(value);
            } else {
              this.myCollect_Songlist.push(value);
            }
          });
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    addToPlayList(tracksId) {
      if (this.opId !== -1) {
        request({
          url: "/api/playlist/tracks",
          params: {
            op: "add",
            pid: tracksId,
            tracks: this.opId,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.data.body.code == 200) {
              alert("收藏成功");
              this.$emit('added')
              this.init()
            } else if (res.data.body.code == 502) {
              alert("歌单内歌曲重复");
            }
            this.close();
          })
          .catch((err) => {
            console.log(err);
            this.close();
          });
      }
    },
    close() {
      this.$emit("close");
    },
  },
  directives: {
    drag: {
      bind(el) {
        let mdiv = el;
        mdiv.onmousedown = (e) => {
          let pdiv = e.target.parentNode;
          let disX = e.clientX - pdiv.offsetLeft;
          let disY = e.clientY - pdiv.offsetTop;
          mdiv.onmousemove = (e) => {
            let left = e.clientX - disX;
            let top = e.clientY - disY;
            pdiv.style.left = left + "px";
            pdiv.style.top = top + "px";
          };
          mdiv.onmouseup = (e) => {
            mdiv.onmousemove = null;
            mdiv.onmouseup = null;
          };
        };
      },
    },
  },
  mounted () {
    this.init();
  },
  computed: {
    status(){
      return this.favId
    }
  },
  watch: {
    status() {
      console.log('id变动了');
      this.init();
    },
  },
  components: {
    NewPlaylist,
  },
};
</script>

<style lang="css" scoped>
.addplaylist {
  width: 480px;
  background-color: #fff;
  border-radius: 3px 3px 0 0;
  position: fixed;
  top: 30%;
  left: 30%;
  border-radius: 4px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
}

.addplaylist .head {
  width: 480px;
  height: 38px;
  border-bottom: 1px solid #000;
  background-color: #2d2d2d;
  line-height: 38px;
  border: 1px solid #000;
  color: #fff;
  cursor: move;
  font-size: 14px;
  font-weight: bold;
  padding-left: 18px;
}

.addplaylist .head .close_ico {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 10px;
  height: 10px;
  background: url("../../assets/img/layer.png") no-repeat;
  background-position: 0 -95px;
  cursor: pointer;
}

.main{
    max-height: 375px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-bottom: 0px;
}

.main .newpl {
  width: 480px;
  height: 56px;
  background-color: #e6e6e6;
  padding: 10px 0 10px 35px;
  font-size: 12px;
  line-height: 36px;
  vertical-align: middle;
  cursor: pointer;
}

.main .newpl .add_ico {
  display: inline-block;
  width: 35px;
  height: 36px;
  background: url("../../assets/img/icon.png") no-repeat;
  background-position: 0 -495px;
  vertical-align: middle;
  margin-right: 10px;
}

.main .mypl .mypl_item {
  height: 55px;
  width: 480px;
  padding: 6px 0 6px 35px;
  border-top: 1px solid #e0e0e0;
  cursor: pointer;
}

.main .mypl .mypl_item:hover {
  background-color: #f2f2f2;
}

.mypl_item .pl_cvr {
  float: left;
  margin-right: 10px;
}

.mypl_item .item_title {
  font-size: 12px;
  margin: 3px 0px 10px 0px;
}

.mypl_item .item_count {
  font-size: 12px;
}
</style>