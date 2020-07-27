<template>
  <div class="wbutton">
    <a href="#" :style="button_style" class="button_style">
      <slot name="icon">
        <em class="btn_icon" :class="button_icon"></em>
      </slot>
      <slot name="value">{{btn_text}}</slot>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    btn_text() {
      switch (this.type) {
        case "fav":
          return "收藏";
          break;
        case "comment":
          return "评论";
          break;
        case "share":
          return "分享";
          break;
        case "download":
          return "下载";
          break;
        case "like":
          return "赞";
          break;
        
      }
    },
    button_icon() {
      switch (this.type) {
        case "fav":
          return "icon_fav";
          break;
        case "comment":
          return "icon_comment";
          break;
        case "share":
          return "icon_share";
          break;
        case "download":
          return "icon_download";
          break;
        case "like":
          return "icon_like";
          break;
        case "liked":
          return "icon_liked";
          break;
      }
    },
    button_style() {
      switch (this.type) {
        case "play":
          this.disable ? "" : "";
          break;
        case "fav":
          this.disable ? "" : "";
          break;
      }
    },
  },
};
</script>

<style scoped>
.wbutton,
.wbutton .icon_fav,
.wbutton .icon_faved,
.wbutton .icon_share,
.wbutton .icon_download,
.wbutton .icon_comment,
.wbutton .icon_delete,
.wbutton .icon_like,
.wbutton .icon_liked,
.wbutton .button_style,
.wbutton .btn_icon .wbutton:hover,
.wbutton:hover .button_style {
  background: url("../../assets/img/button2.png") no-repeat 0px -9999px;
}

.wbutton .icon_fav {
  background-position: -4px -1009px;
}

.wbutton .icon_faved{
    background-position: -97px -1009px;
}

.wbutton .icon_share {
  background-position: -5px -1028px;
}

.wbutton .icon_comment {
  background-position: -53px -1008px;
}

.wbutton .icon_download {
  background-position: -53px -1028px;
}

.wbutton .icon_like {
  background-position: 3px -95px;
}

.wbutton .icon_liked {
  background-position: -30px -95px;
}

.wbutton {
  display: inline-block;
  padding-right: 5px;
  height: 31px;
  font-size: 12px;
  background-position: right -1020px;
}

.wbutton .button_style {
  display: inline-block;
  min-width: 53px;
  height: 31px;
  background-position: 0 -59px;
  font-style: normal;
  color: #000;
  line-height: 31px;
}

.btn_icon {
  float: left;
  width: 20px;
  height: 18px;
  margin: 6px 3px 5px 3px;
  overflow: hidden;
}

.wbutton:hover {
  background-position: right -1106px;
}

.wbutton:hover .button_style {
  background-position: 0 -141px;
}
</style>