<template>
  <div class="discover_bg">
    <!-- <div class="discover_banner" :style="{background:'url('+bannerBGImage+'?imageView&blur=40x20)',background-size:'6000px'}"> -->
    <div class="discover_banner" :style="bannerBGImage">
      <div class="dbanner_bd">
        <div class="dbanner_left">
          <img :src="getBannerImage" alt class="banner_image" @click="gotopage()" />
          <div class="dot_nav">
            <a
              href="#"
              v-for="index in banner_data.length"
              :key="index"
              :class="banimg_index+1===index?'ban_selected':''"
              @click="banimg_index = index-1"
            ></a>
          </div>
          <a href="javascript:void(0)" class="pre" @click="pre()">&lt;</a>
          <a href="javascript:void(0)" class="next" @click="next()">&gt;</a>
        </div>
        <div class="dbanner_right">
          <a href></a>
          <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request";
export default {
  data() {
    return {
      banimg_index: 0,
      banner_data: [],
      intervalId: 0,
      bannerBGImage: {}
    };
  },
  methods: {
    pre() {
      if (this.banimg_index-- == 0) {
        this.banimg_index = this.banner_data.length - 1;
      }
    },
    next() {
      if (this.banimg_index++ == this.banner_data.length - 1) {
        this.banimg_index = 0;
      }
    },
    getBanner(type) {
      request({
        url: "/api/banner"
      }).then(res => {
        console.log(res.data.banners);
        this.banner_data = res.data.banners;
      });
    },
    interval(time) {
      this.intervalId = setInterval(() => {
        if (this.banimg_index < this.banner_data.length - 1) {
          this.banimg_index++;
        } else {
          this.banimg_index = 0;
        }
      }, time);
    },
    gotopage() {
      let index = this.banimg_index;
      let type = this.banner_data[this.banimg_index].targetType;
      let url = this.banner_data[this.banimg_index].url;
      console.log(index + ":" + type + ":" + url);
      switch (type) {
        case 3000:
          window.open(url, "_blank");
          break;
      }
    }
  },
  created() {
    this.getBanner(0);
    this.interval(5000);
  },
  destroyed() {
    clearInterval(this.intervalId);
  },
  computed: {
    getBannerImage() {
      if (
        this.banner_data.length != 0 &&
        this.banimg_index < this.banner_data.length
      ) {
        this.bannerBGImage = {
          "background-image":
            "url(" +
            '"' +
            this.banner_data[this.banimg_index].imageUrl +
            '?imageView&blur=40x20")',
          "background-size": 6000 + "px",
          "background-position": "center center"
        };
        return this.banner_data[this.banimg_index].imageUrl;
      }
    }
  }
};
</script>

<style scoped>
@import url("../../assets/css/discover/banner.css");
</style>