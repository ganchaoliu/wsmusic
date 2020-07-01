<template>
  <div class="header_m">
    <div class="logo_image">
      <a href>
        <img class="logo_image_item" src="../../assets/img/logo.png" alt />
      </a>
    </div>
    <div class="nav">
      <ul>
        <li>
          <a href="#">音乐馆</a>
        </li>
        <li>
          <a href="#">我的音乐</a>
        </li>
        <li>
          <a href="#">客户端</a>
          <img src="../../assets/img/mark_1.png" />
        </li>
        <li>
          <a href="#">开放平台</a>
        </li>
        <li>
          <a href="#">VIP</a>
        </li>
      </ul>
    </div>

    <div class="main_search">
      <input
        class="search_input"
        type="text"
        aria-label="请输入搜索内容"
        placeholder="搜索音乐、MV、歌单、用户"
        @keyup.enter="searchMusic"
        v-model="searchvalue"
      />
      <button class="search_button" @click="searchMusic">
        <i class="button_img"></i>
      </button>
    </div>

    <div class="user_header" @click="dialogFormVisible = true" v-if="$store.state.loginStatus" >
      <img :src="$store.state.userData.profile.avatarUrl" alt />
    </div>
    <div class="user_header" @click="dialogFormVisible = true" v-else >
      <img src="../../assets/img/g.jpg" alt  />
    </div>



    <div class="button">
      <a class="greenbutton">开通绿钻豪华版</a>
      <a class="openpaybag">开通付费包</a>
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

<script >
import { request } from "../../network/request";
import { log } from "util";
export default {
  name: "Header",
  data() {
    return {
      searchvalue: "",
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
      console.log("搜索歌曲");
      request({
        url: "/api/search",
        params: {
          keywords: this.searchvalue,
          limit: 20
        }
      }).then(async res => {
        //重新封装歌曲列表，将后续有可能用到的数据都在这里全部获取到
        let songs = res.data.result.songs;
        console.log(songs);
        let ids = new Array();
        for (let i = 0; i < songs.length; i++) {
          ids.push(songs[i].id);
        }
        this.$store.commit("updateSongList", res.data.result.songs);
      });
      this.$router.push({
        path: "/search",
        query: {
          keywords: this.searchvalue
        }
      });
    },
    login() {
      console.log("登陆");
      request({
        url: "/api/login/cellphone",
        method: 'post', 
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
            alert("登陆成功");
            this.dialogFormVisible = false;
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.log("请求失败");
        });
    }
  }
};
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");
.header_m {
  max-width: 1200px;
  height: 90px;
  position: relative;
  padding: 0;
  margin: 0 auto;
  border-bottom: 1px solid #eeeeee;
  overflow: hidden;
}
.header_m div {
  float: left;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0 0 0 35px;
  display: inline-block;
}
ul li {
  float: left;
}

ul li a {
  color: #000;
  font-size: 18px;
  padding: 15px;
  display: block;
  height: 90px;
  line-height: 50px;
}

ul li a:hover {
  background-color: #31c27c;
  color: white;
}

.logo_image {
  margin: 0;
  padding: 0;
  width: 170px;
  height: 90px;
  overflow: hidden;
}

.logo_image_item {
  margin-top: 20px;
}

.main_search {
  width: 220px;
  height: 38px;
  margin-top: 26px;
  padding: 0 33px 0 11px;
  border: 1px solid #9a9a9a;
  position: relative;
}
.main_search input {
  border: 0px;
  outline: white;
  font-size: 14px;
  display: inline-block;
  width: 176px;
  height: 36px;
  line-height: 36px;
}

.search_button {
  position: absolute;
  right: 0px;
  top: 0px;
  width: 37px;
  height: 36px;
  border: 0px;
  background-color: white;
}

.search_button .button_img {
  display: inline-block;
  width: 17px;
  height: 16px;
  background-image: url("../../assets/img/icon_sprite.png");
  background-position: 0px -40px;
}

.greenbutton,
.openpaybag {
  margin: 24px 0 0 10px;
  display: inline-block;
  height: 38px;
  padding: 0 9px;
  font-size: 13px;
  line-height: 38px;
}

.greenbutton {
  border: 1px solid #31a27c;
  background-color: #31c27c;
  color: white;
}

.greenbutton:hover {
  background-color: #31b97c;
  border: 1px solid #31b97c;
  color: white;
}

.openpaybag {
  border: 1px solid #aaaaaa;
  color: #000;
}

.openpaybag:hover {
  background-color: #eeeeee;
}

.user_header {
  width: 40px;
  height: 40px;
  margin-top: 25px;
  border-radius: 20px;
  overflow: hidden;
  margin-left: 10px;
}

.user_header img {
  width: 45px;
  height: 45px;
}
</style>