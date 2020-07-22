<template>
  <div class="neh_bg">
    <div class="neheader">
      <h1 class="nelogo">
        <a href></a>
      </h1>
      <ul class="ne_nav">
        <li>
          <a @click="gotopage('discover')" :class="1===selectedNav?'select':''">发现音乐</a>
          <i v-show="1==selectedNav" class="cor"></i>
        </li>
        <li>
          <a @click="gotopage('mysonglist')" :class="2===selectedNav?'select':''">
              <span>我的音乐</span>
              <i class="cor" v-show="2==selectedNav"></i>
          </a>
        </li>
        <li>
          <a @click="gotopage('friend')" :class="3===selectedNav?'select':''">
            <span>朋友</span>
            <i class="cor" v-show="3==selectedNav"></i>
          </a>
        </li>
        <li>
          <a>商城</a>
        </li>
        <li>
          <a>音乐人</a>
        </li>
        <li>
          <a>下载客户端</a>
        </li>
      </ul>
      <div class="ne_head">
        <div class="head_img" @click="dialogFormVisible = true" v-if="$store.state.loginStatus">
          <img :src="$store.state.userData.profile.avatarUrl" alt />
          <i>99+</i>
        </div>
        <div class="head_img" @click="dialogFormVisible = true" v-else>
          <img src="../../assets/img/g.jpg" alt />
          <i>99+</i>
        </div>
        <a href v-if="$store.state.loginStatus">{{$store.state.userData.profile.nickname}}</a>
        <a href v-else>登陆</a>
      </div>
      <a href class="creater_center">创作者中心</a>
      <div class="neh_search">
        <span>
          <input
            type="text"
            placeholder="音乐/视频/电台/用户/MV"
            v-model="searchValue"
            @keyup.enter="searchMusic"
          />
        </span>
      </div>
    </div>
    <div class="main_subnav_line" v-show="selectedNav!==1"></div>
    <div class="main_subnav" v-show="selectedNav===1" >
      <div class="subnav_bd">
        <a href="#" class="subnav_item" :class="1===selectedSubNav?'subnav_selected':''" @click="subnavto(1)">推荐</a>
        <a href="#" class="subnav_item" :class="2===selectedSubNav?'subnav_selected':''" @click="subnavto(2)">排行榜</a>
        <a href="#" class="subnav_item" :class="3===selectedSubNav?'subnav_selected':''" @click="subnavto(3)">歌单</a>
        <a href="#" class="subnav_item" :class="4===selectedSubNav?'subnav_selected':''" @click="subnavto(4)">主播电台</a>
        <a href="#" class="subnav_item" :class="5===selectedSubNav?'subnav_selected':''" @click="subnavto(5)">歌手</a>
        <a href="#" class="subnav_item" :class="6===selectedSubNav?'subnav_selected':''" @click="subnavto(6)">新碟上架</a>
      </div>
    </div>
    <el-dialog title="登陆" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="手   机" :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密   码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off" type="password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="login">登 陆</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { TYPE } from "../../utils/common";
import { request } from "../../network/request";

export default {
  name: "NetEaseHeader",
  data() {
    return {
      selectedNav:1,
      selectedSubNav:1,
      dialogFormVisible: false,
      dialogTableVisible: false,
      form: {
        phone: "",
        password: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    searchMusic() {
        this.selectedNav=-1
      if (this.searchValue != "") {
        let searchtype = 1;
        let zujian = localStorage.getItem("searchtab");
        if (zujian != null) {
          let type = zujian.slice(0, -4);
          searchtype = TYPE[type];
        }

        this.$store.commit("updateSearchValue", this.searchValue);
        this.$store
          .dispatch("search", {
            keyword: this.searchValue,
            type: searchtype,
            offset: 0
          })
          .then(res => {
            this.$router.push({
              path: "/search",
              query: {
                keywords: this.searchValue
              }
            });
          });
      }
    },
    login() {
      console.log("登陆");
      request({
        url: "/api/login/cellphone",
        method: "post",
        params: {
          phone: encodeURIComponent(this.form.phone),
          password: encodeURIComponent(this.form.password)
        }
      })
        .then(async res => {
          //重新封装歌曲列表，将后续有可能用到的数据都在这里全部获取到
          console.log(res);
          if (res.data.code === 200) {
            this.$store.commit("login", res.data);
            this.dialogFormVisible = false;
            alert("登陆成功");
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.log("请求失败");
        });
    },
    gotopage(page) {
      this.$router.push(page);
      if(page==='mysonglist'){
          this.selectedNav = 2
          this.$router.push('/mysonglist')
      }
      if(page==='discover'){
          this.selectedNav = 1
          this.$router.push('/discover')
      }
      if(page==='friend'){
          this.selectedNav = 3
          this.$router.push('/friend')
      }
    },
    subnavto(index){
      this.selectedSubNav = index
    }
  },
  computed: {
    searchValue: {
      get() {
        return this.$store.state.searchvalue;
      },
      set(v) {
        this.$store.commit("updateSearchValue", v);
      }
    }
  }
};
</script>

<style scoped>
@import url("../../assets/css/neteaseheader.css");
</style>