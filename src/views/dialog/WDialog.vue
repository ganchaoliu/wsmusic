<template>
  <div class="w_dialog" v-show="show">
    <div class="head" v-drag>
      <i class="close_ico" @click="close"></i>
      <span>新建歌单</span>
    </div>
    <div class="main">
      <slot name="input"></slot>
    </div>
    <div class="footer">
        <w-button type='confirm' :icon='false' @click="create"></w-button>
        <w-button type='cancel' :icon='false' @click="close"></w-button>
    </div>
  </div>
</template>

<script>
import WButton from '../../components/common/WButton'
import {request} from '../../network/request'
export default {
  data(){
    return {
      show:true,
      name:''
    }
  },
  props: {
    visiable:{
        type:Boolean,
        default:false
    } ,
    title:{
        type:String,
        default:'WDialog'
    } 
  },
  methods: {
    close(){
      this.$emit('close')
      this.show=false
    },
    create(){
      if(this.name!==''){
        request({
          url: "/api/playlist/create",
        params: {
          name: this.name,
        },
        }).then(res=>{
          console.log(res);
          this.$emit('addPlaylist',res.data.id)
          this.close()
        }).catch(err=>{
          console.log(err);
        })
      }
    }
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
  components: {
    WButton
  }
};
</script>

<style lang="css" scoped>
.w_dialog {
  width: 480px;
  background-color: #fff;
  border-radius: 3px 3px 0 0;
  position: fixed;
  top: 30%;
  left: 30%;
  border-radius: 4px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.8);
}

.w_dialog .head {
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

.w_dialog .head .close_ico {
  position: absolute;
  right: 15px;
  top: 15px;
  width: 10px;
  height: 10px;
  background: url("../../assets/img/layer.png") no-repeat;
  background-position: 0 -95px;
  cursor: pointer;
}


</style>