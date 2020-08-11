<template>
  <div class="opt_btns">
    <a class="icn-add" @click="addtoplaylist" title="添加到播放列表" v-show="btnshow('add')"></a>
    <a class="icn-fav" @click="fav" title="收藏" v-show="btnshow('fav')"></a>
    <a class="icn-share" @click="share" title="分享" v-show="btnshow('share')"></a>
    <a class="icn-download" @click="download" title="下载" v-show="btnshow('download')"></a>
    <a class="icn-delete" @click="del" title="删除" v-show="btnshow('delete')"></a>
  </div>
</template>

<script>
export default {
  methods: {
    addtoplaylist() {
      this.$emit("add");
    },
    fav() {
      this.$emit("fav");
    },
    share() {
      this.$emit("share");
    },
    download() {
      this.$emit("download");
    },
    del() {
      this.$emit("delete");
    },
  },
  props: {
    btns: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  computed: {
    btnshow() {
      return (btn) => {
        if (this.btns.indexOf(btn) !== -1) {
          return true;
        } else {
          return false;
        }
      };
    },
  },
};
</script>

<style scoped>
.opt_btns .icn-add,
.icn-fav,
.icn-share,
.icn-download {
  background: url("../../assets/img/icon.png");
}

.opt_btns {
  display: inline-block;
}

.opt_btns .icn-add {
  display: inline-block;
  width: 18px;
  height: 16px;
  background-position: 0 -700px;
  margin: 0px 3px 1px 0px;
}

.opt_btns .icn-add:hover {
  cursor: pointer;
  background-position: -22px -700px;
}

.opt_btns .icn-fav {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 16px;
  background: url("../../assets/img/table.png") no-repeat 0 -174px;
  margin: -11px 6px 0px 0px;
}

.opt_btns .icn-fav:hover {
  cursor: pointer;
  background: url("../../assets/img/table.png") no-repeat -20px -174px;
}

.opt_btns .icn-share {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 16px;
  background: url("../../assets/img/table.png") no-repeat 0 -195px;
  margin: -8px 6px 3px 0px;
}

.opt_btns .icn-share:hover {
  cursor: pointer;
  background: url("../../assets/img/table.png") no-repeat -20px -195px;
}

.opt_btns .icn-download {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 16px;
  background: url("../../assets/img/table.png") no-repeat -81px -174px;
  margin: -8px 7px 3px 0px;
}

.opt_btns .icn-download:hover {
  cursor: pointer;
  background: url("../../assets/img/table.png") no-repeat -104px -174px;
}

.opt_btns .icn-delete {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 16px;
  background: url("../../assets/img/table.png") no-repeat 0px -217px;
  margin: -8px 7px 3px 0px;
}

.opt_btns .icn-delete:hover {
  cursor: pointer;
  background: url("../../assets/img/table.png") no-repeat -20px -217px;
}
</style>