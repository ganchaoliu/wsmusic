<template>
  <div class="login" @click="show_area_opt=false" v-drag>
    <div class="login_title">
      <div class="close_btn" @click="showLogin">x</div>
      <span>手机号登陆</span>
    </div>
    <div class="login_body">
      <div class="bd_main">
        <div class="cell_phone">
          <input type="text" placeholder="请输入手机号" v-model="phone" />
        </div>
        <div class="password">
          <input type="password" placeholder="请输入密码" v-model="password" />
        </div>
        <div class="errmsg" v-show="showErrorMsg">
          <span class="msg">{{errmsg}}</span>
        </div>
        <div class="check_box"></div>
        <div class="login_btn">
          <a href="#" class="btn" @click="login">
            <i>登陆</i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../network/request";
export default {
  name: "Login",
  data() {
    return {
      showErrorMsg: false,
      errmsg: "",
      area_option: [
        {
          country: "中国",
          code: "+86",
        },
        {
          country: "中国香港",
          code: "+852",
        },
        {
          country: "中国澳门",
          code: "+853",
        },
        {
          country: "中国台湾",
          code: "+886",
        },
        {
          country: "日本",
          code: "+81",
        },
        {
          country: "韩国",
          code: "+82",
        },
        {
          country: "美国",
          code: "+1",
        },
      ],
      show_area_opt: false,
      selected_index: 0,
      phone: "",
      password: "",
    };
  },
  computed: {
    computedWidth() {
      const width = this.$refs.area.style.width;
      console.log("area宽度为" + width);
    },
  },
  methods: {
    login() {
      console.log("登陆");
      request({
        url: "/api/login/cellphone",
        method: "post",
        params: {
          phone: encodeURIComponent(this.phone),
          password: encodeURIComponent(this.password),
        },
      })
        .then(async (res) => {
          //重新封装歌曲列表，将后续有可能用到的数据都在这里全部获取到
          console.log(res);
          if (res.data.code === 200) {
            this.$store.commit("login", res.data);
            this.dialogFormVisible = false;
            alert("登陆成功");
            this.showLogin();
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log("请求失败");
          this.errmsg = "请求失败";
          this.showErrorMsg = true;
        });
    },
    showLogin() {
      this.$store.commit("updateShowLogin", false);
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
};
</script>

<style lang = 'css' scoped>
.login {
  width: 530px;
  background-color: #fff;
  position: fixed;
  top: 200px;
  left: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
}

.login .login_title {
  width: 530px;
  height: 39px;
  border-bottom: 1px solid #191919;
  background-color: #2d2d2d;
  border-radius: 3px 3px 0px 0px;
  cursor: move;
}

.login_title .close_btn {
  cursor: pointer;
  float: right;
  width: 10px;
  height: 10px;
  background: url("../assets/img/layer.png") no-repeat 0 -95px;
  text-indent: -999px;
  overflow: hidden;
  margin-top: 15px;
  margin-right: 15px;
}

.login_title span {
  font-size: 14px;
  line-height: 39px;
  color: #fff;
  margin-left: 15px;
  font-weight: bold;
}

.login_body {
  width: 530px;
  background-color: #fff;
  border: 1px solid #cdcdcd;
}

.login_body .bd_main {
  width: 220px;
  margin: 0px auto;
  padding: 30px 0 43px;
}

.cell_phone,
.password {
  width: 220px;
  height: 30px;
  border: 1px solid #cdcdcd;
}

.password input,
.cell_phone input {
  width: 218px;
  height: 28px;
  outline: none;
  border: none;
  font-size: 12px;
  line-height: 30px;
}

.password,
.errmsg,
.login_btn,
.check_box {
  margin-top: 10px;
}

.login_btn .btn {
  display: inline-block;
  width: 218px;
  height: 31px;
  background: url("../assets/img/button2.png") no-repeat 0 9999px;
  background-position: right -428px;
  text-align: center;
  color: #fff;
  line-height: 31px;
  font-size: 14px;
}

.login_btn .btn:hover {
  background-position: right -510px;
}

.login_btn .btn:active {
  background-position: right -592px;
}

.login_btn .btn i {
  display: inline-block;
  width: 213px;
  height: 31px;
  font-style: normal;
  background: url("../assets/img/button2.png") no-repeat 0 9999px;
  background-position: 0 -387px;
}

.login_btn .btn:hover i {
  background-position: 0 -469px;
}

.login_btn .btn:active i {
  background-position: 0 -551px;
}
</style>