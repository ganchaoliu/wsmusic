<template>
  <div class="playbutton">
    <a href='#' class="btn_play">
      <i>
        <em class="play_btn"></em>播放
      </i>
    </a>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.playbutton {
  display: inline-block;
  width: 66px;
  height: 31px;
  font-size: 12px;
}

.play_btn,
.btn_play,
.btn_play i,
.btn_play:hover,
.btn_play:hover i,
.btn_play:hover .play_btn,
.btn_play:active,
.btn_play:active i,
.btn_play:active .play_btn {
  background: url("../../assets/img/button2.png") no-repeat 0px -9999px;
}

.btn_play {
  display: inline-block;
  width: 66px;
  height: 31px;
  line-height: 31px;
  background-position: right -428px;
  padding-right: 5px;
}

.btn_play i {
  color: #fff;
  font-style: normal;
  display: inline-block;
  width: 66px;
  height: 31px;
  background-position: 0px -387px;
  padding-left: 8px;
  font-size: 12px;
}

.play_btn {
  float: left;
  width: 20px;
  height: 18px;
  margin: 6px 2px 2px 0;
  background-position: 0 -1622px;
  overflow: hidden;
}

.btn_play:hover {
  color: #fff;
  background-position: right -510px;
}

.btn_play:hover i {
  background-position: 0 -469px;
}

.btn_play:hover .play_btn {
  background-position: -28px -1622px;
}

.btn_play:active {
  color: #fff;
  background-position: right -592px;
}

.btn_play:active i {
  background-position: 0 -551px;
}

.btn_play:active .play_btn {
  background-position: -56px -1622px;
}
</style>