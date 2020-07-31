<template>
  <div class="wbutton" :class="btn_type" @click="action">
    <div href :style="button_style" class="button_style" :class="btn_style_type">
      <slot name="icon">
        <em class="btn_icon" :class="button_icon" v-show="icon"></em>
      </slot>
      <slot name="value">{{btn_text}}</slot>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      btn_type:'',
      btn_style_type:''
    }
  },
  methods: {
    action(){
      this.$emit("click")
    }
  },
  props: {
    type: {
      type: String,
    },
    fav:{
      type:Boolean
    },
    disable: {
      type: Boolean,
      default: false,
    },
    icon:{
      type:Boolean,
      default:true
    }
  },
  computed: {
    btn_text() {
      switch (this.type) {
        case "fav":
          this.btn_type = 'btn_white'
          this.btn_style_type = 'btn_style_white'
          return "收藏";
          break;
        case "comment":
          this.btn_type = 'btn_white'
          this.btn_style_type = 'btn_style_white'
          return "评论";
          break;
        case "share":
          this.btn_type = 'btn_white'
          this.btn_style_type = 'btn_style_white'
          return "分享";
          break;
        case "download":
          this.btn_type = 'btn_white'
          this.btn_style_type = 'btn_style_white'
          return "下载";
          break;
        case "like":
          this.btn_type = 'btn_white'
          this.btn_style_type = 'btn_style_white'
          return "赞";
          break;
        case "subscribed":
          this.btn_type = 'btn_white'
          this.btn_style_type = 'btn_style_white'
            return "订阅";
            break 
        case "play":
          this.btn_type = 'btn_blue'
          this.btn_style_type = 'btn_style_blue'
            return "播放";
            break  
        case "add":
          this.btn_type = 'btn_blue'
          this.btn_style_type = 'btn_style_blue'
            return "添加";
            break  
        case "confirm":
          this.btn_type = 'btn_blue'
          this.btn_style_type = 'btn_style_blue'
            return "确认";
            break 
        case "cancel":
          this.btn_type = 'btn_blue'
          this.btn_style_type = 'btn_style_blue'
            return "取消";
            break    
      }
    },
    button_icon() {
      switch (this.type) {
        case "fav":
          return this.fav?"icon_faved":"icon_fav";
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
        case "subscribed":
            return "icon_subscribed";
            break
        case "play":
            return "icon_play";
            break  
        case "add":
            return "icon_add";
            break  
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
.btn_white,
.btn_blue,
.wbutton .icon_fav,
.wbutton .icon_faved,
.wbutton .icon_share,
.wbutton .icon_download,
.wbutton .icon_comment,
.wbutton .icon_delete,
.wbutton .icon_like,
.wbutton .icon_liked,
.wbutton .icon_play,
.wbutton .icon_subscribed,
.btn_style_white,
.btn_style_blue,
.btn_white:hover,
.btn_blue:hover,
.btn_blue:active,
.btn_white:hover .btn_style_white
.btn_blue:hover .btn_style_blue
.btn_blue:active, .btn_style_blue{
  background: url("../../assets/img/button2.png") no-repeat 0px -9999px;
}

.wbutton{
  display: inline-block;
  padding-right: 5px;
  height: 31px;
  font-size: 12px;
  text-align: center;
}

.wbutton .button_style {
  display: inline-block;
    min-width: 63px;
    height: 31px;
    font-style: normal;
    line-height: 31px;
    cursor: pointer;
    padding-left: 5px;
    padding-right: 5px;
}

.btn_white{
  background-position: right -1020px;
}

.btn_style_white{  
  background-position: 0 -59px;
}

.btn_blue{
  background-position: right -428px;
}

.btn_style_blue {
  color: #fff;
  background-position: 0px -387px;
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

.wbutton .icon_subscribed{
    background-position: -97px -1028px;
}

.wbutton .icon_play{  
  background-position: -82px -1622px;
}

.btn_icon {
  float: left;
  width: 20px;
  height: 18px;
  margin: 6px 3px 5px 3px;
  overflow: hidden;
}

.btn_white:hover {
  background-position: right -1106px;
}

.btn_white:hover .btn_style_white {
  background-position: 0 -141px;
}

.btn_blue:hover{
  cursor: pointer;
  color: #fff;
  background-position: right -510px;
}

.btn_blue:hover .btn_style_blue{
  background-position: 0 -469px;
}

.btn_blue:active{
  cursor: pointer;
  color: #fff;
  background-position: right -592px;
}

.btn_blue:active .btn_style_blue{
  background-position: 0 -551px;
}

</style>