<template>
  <div class="ma_bg">
    <div class="ma_main">
      <div class="ma_title">
        <h2>我的歌手（{{$parent.collectArtist.length}}）</h2>
      </div>
      <div class="ma_body">
        <ul>
          <li v-for="item in $parent.collectArtist" class="clear-fix" :key="item.id">
            <div class="cvr">
              <!--                            <a href=""><img :src="item.picUrl" alt="" class="singerimg"></a>-->
              <router-link :to="{path:'/artists',query:{id:item.id}}">
                <img :src="item.picUrl" alt class="singerimg" />
              </router-link>
            </div>
            <div class="detail">
              <h3>
                <!--                                <a href=""></a>-->
                <router-link :to="{path:'/artists',query:{id:item.id}}">{{item.name}}</router-link>
              </h3>
              <p>
                <span v-show="item.albumSize>0">{{item.albumSize}}个专辑</span>
                <span v-if="item.mvSize>0">{{item.mvSize}}个视频</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyArtist",
  mounted() {}
};
</script>

<style scoped>
@import "../assets/css/myartist.css";
</style>