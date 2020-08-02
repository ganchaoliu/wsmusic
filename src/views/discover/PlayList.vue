<template>
  <div class="playlist" @click='cancelPop($event)'>
    <div class="playlist_main">
      <div class="pl_title" >
        <div class="pl_hotbtn">
          <a href='#' >热门</a>
        </div>
        <h3>
          <span >{{data.cat}}</span>
          <a href=# class="all_btn" @click="showCatList=!showCatList" @click.stop>
            <i>
              选择分类
              <em></em>
            </i>
          </a>
        </h3>  
        <div class="catlistbox" v-show="showCatList" v-if='catlist.all!=undefined'>
            <div class="hd">
                <i class="icon"></i>
            </div>
            <div class="bd">
                <h3 class="all_type"><router-link :to="{name:'playlist'}" tag="a" class="all_cat">全部风格</router-link></h3>
                <ul>  
                <li v-for="(cat,index) in catlist.categories" :key="cat.name+index" class='cate_item clear-fix'>
                  <div class="cate_name">
                    <i :class="'icon_cn'+index"></i>{{cat}}
                  </div>
                  <div class="sub_cate" >
                      <span class="sub_cate_item" v-for="(sub,inde) in subcatlist(index)" :key="sub+inde">
                        <router-link :to="{name:'playlist',query:{cat:sub.name}}">{{sub.name}}</router-link>
                        <span class="line">|</span>
                      </span>
                  </div>
                </li>
              </ul>
            </div>
            <div class="ft">

            </div>
        </div>      
      </div>
      
      <div class="pl_playlist">
        <ul>
          <li v-for="item in data.playlists" :key="item.id" class="pl_item">
            <div class="item_cvr">
              <img :src="item.coverImgUrl+'?param=140y140'" alt />
              <router-link :to="{path:'/playlist',query:{id:item.id}}" tag="a" class="link"></router-link>
              <div class="cvr_bottom">
                  <i class="play_icon"></i>
                  <em class="headset"></em>
                  <span class="playcount">{{item.playCount|formatPlayTime}}</span>
              </div>
            </div>
            <p>
              <router-link :to="{path:'/playlist',query:{id:item.id}}" :title="item.name">{{item.name}}</router-link>
            </p>
            <p>by <span><a href="#">{{item.creator.nickname}}</a></span></p>
          </li>
        </ul>
        <div class="page">
          <el-pagination
            layout="prev, pager, next"
            :total="data.total"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
          ></el-pagination>
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
      showCatList:false,
      data: {},
      playlist: [],
      pageSize:35,
      currentPage:1,
      catlist:{}
    };
  },
  methods: {
    getPlayList() {
      let cat = '全部'
      if(this.$route.query.cat!=undefined){
        cat = this.$route.query.cat
      }
      request({
        url: "/api/top/playlist",
        params: {
          cat:cat,
          limit: this.pageSize,
          offset: (this.currentPage-1)*this.pageSize,
          order:'hot'
        },
      }).then((res) => {
        console.log(res);
        this.data = res.data;
        document.title=this.data.cat+'歌单-歌单-网易云音乐'
      });
    
    },
    getCateList() {
      request({
        url: "/api/playlist/catlist",
      }).then((res) => {
        console.log(res)
        this.catlist = res.data;
      });
    
    },
    cancelPop(evnet){
      this.showCatList=false
    },
    handleCurrentChange(page){
        this.currentPage = page
        this.getPlayList()
    }
  },
  created() {
    this.getPlayList();
    this.getCateList();
    
  },
  mounted () {
    document.body.addEventListener('click', () => {
        this.showCatList = false;
    }, false);
  },
  computed: {
    subcatlist(){
      return (cat)=>{   
        return this.catlist.sub.filter((item)=>{
          if(item.category == cat){
            return item
          }            
        })
      }
    }
  },
  filters:{
      formatPlayTime(playtime = 0) {
      let str = "";
      if (playtime > 10000) {
        str = (playtime / 10000).toFixed(2) + "万";
      } else {
        str = playtime;
      }
      return str;
    }
  },
  watch:{
    $route(){
      this.showCatList = false
      this.getPlayList()
    }
  }
};
</script>

<style lang="css" scoped>

a{
  color: #333;
}

.playlist_main {
  width: 982px;
  padding: 40px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  min-height: 700px;
  background-color: #fff;
  margin: 0px auto;
  overflow: hidden;
}

.pl_title {
  border-bottom: 2px solid #c20c0c;
  padding-bottom: 2px;
  position: relative;
}

.pl_title h3{
    font-size: 24px;
    line-height: 30px;
    font-weight: normal;
}

.pl_title .all_btn{
    display: inline-block;
    height: 35px;
    padding-right: 5px;
    font-size: 12px;
    line-height: 31px;
    color: #333;
    margin-left: 12px;
    vertical-align: top;
    background: url('../../assets/img/button2.png') no-repeat 0 999px;
    background-position: right -100px;
}

.pl_title .all_btn:hover{
   background-position: right -182px;
}

.pl_title .all_btn:active{
   background-position: right -264px;
}

.pl_title .all_btn i{
    display: inline-block;
    overflow: hidden;
    padding-left:12px;
    padding-right:8px;
    height: 31px;
    font-size: 12px;
    font-style: normal;
    line-height: 31px;
    color: #333;
    vertical-align: top;
    background: url('../../assets/img/button2.png') no-repeat 0 999px;
    background-position: 0 -59px;
}

.pl_title .all_btn i:hover{
    background-position: 0 -141px;
}

.pl_title .all_btn i:active{
    background-position: 0 -223px;
}

.pl_title .all_btn em{
    display: inline-block;
    width: 8px;
    height: 5px;
    background: url('../../assets/img/icon.png') no-repeat 0 999px;
    background-position: -70px -543px;
    margin-left: 3px;
}

.pl_hotbtn {
  float: right;
  height: 29px;
  background: url('../../assets/img/button.png') no-repeat 0 999px;
  background-position: 0 0;
  border-radius: 3px;
  margin-bottom: 5px;
}

.pl_hotbtn a{
    display: inline-block;
    line-height: 29px;
    width: 46px;
    color: #fff;
    text-align: center;
    font-size: 12px;
}

.pl_playlist ul {
  margin-top: 30px;
  margin-left: -50px;
}

.pl_item {
  display: inline-block;
  width: 140px;
  height: 188px;
  margin: 0 0 30px 50px;
}

.pl_item .item_cvr{
    position: relative;
    width: 140px;
  height: 140px;
}
    
.pl_item .item_cvr img {
  width: 140px;
  height: 140px;
}

.pl_item p {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  margin-top: 10px;
  margin-bottom: 0px;
}

.pl_item p span{
    font-size: 12px;
    color: #999;
}

.page {
  width: 100%;
  text-align: center;
}

.item_cvr .cvr_bottom{
    position: absolute;
    bottom: 0px;
    width: 140px;
    height: 27px;
    background: url('../../assets/img/coverall.png') no-repeat 0px 999px;
    background-position: 0 -537px;
}

.item_cvr .cvr_bottom .play_icon{
    float: right;
    margin-top: 6px;
    margin-right: 5px;
    width: 16px;
    height: 17px;
    background: url('../../assets/img/iconall.png') no-repeat 0px 999px;
    background-position: 0 0px;
    cursor: pointer;
}

.item_cvr .cvr_bottom .play_icon:hover{
    background-position: 0 -60px;
}

.item_cvr .cvr_bottom .headset{
    display: inline-block;
    width: 14px;
    height: 11px;
    margin: 10px 2px 0px 8px;
    background: url('../../assets/img/iconall.png') no-repeat 0px 999px;
    background-position: 0 -24px;
}

.cvr_bottom .playcount{
    display: inline-block;
    color: #ccc;
    font-size: 12px;
    line-height: 17px;
}


.item_cvr .link{
    width: 140px;
    height: 140px;
    position:absolute;
    top:0;
    left: 0;
    background: url('../../assets/img/coverall.png') no-repeat 0px 999px;
    background-position: 0 0;

}

.catlistbox{
    position: absolute;
    width: 720px;
    top:30px;
    left:-10px;
    z-index: 5;
}

.catlistbox .hd,.bd,.ft{
  background: url('../../assets/img/sltlyr.png') no-repeat;
}
.catlistbox .hd{
  width: 720px;
  height: 32px;
  position: relative;
}

.catlistbox .hd .icon{
  display: inline-block;
  position: absolute;
  width: 24px;
  height: 11px;
  left: 100px;
  top:2px;
  background: url('../../assets/img/iconall.png') no-repeat 0px 999px;
  background-position: -48px 0;
}

.catlistbox .bd{
  width: 720px;
  background-position: -720px 0;
  background-repeat: repeat-y;
  padding: 0px 10px;
}

.bd .all_type{
  border-bottom: 1px solid #e6e6e6;
  width: 700px;
  height: 38px;
  padding-left: 26px;

}

.bd .all_type .all_cat{
  display: inline-block;
  width: 75px;
  height: 26px;
  background: url('../../assets/img/button.png') no-repeat 0px 999px;
  background-position: 0 -64px;
  text-align: center;
  line-height: 26px;
  font-size: 12px;
    vertical-align: top;
}


.cate_item .cate_name{
  float: left;
  width: 96px;  
  height: 36px;
  font-size: 12px;
  font-weight: bold;
  line-height: 24px;
  text-align: right;
  padding: 12px 15px 0px 15px;
}

.cate_item .cate_name .icon_cn0,.icon_cn1,.icon_cn2,.icon_cn3,.icon_cn4{
  display: inline-block;
  width: 24px;
  height: 24px;  
  margin-right: 10px;
  vertical-align: middle;
  background: url('../../assets/img/icon.png') no-repeat 0px 999px;
}

.cate_item .cate_name .icon_cn0{
  width: 24px;
  height: 24px;
  position: relative;
  bottom:2px;
  background-position: -20px -735px;
}

.cate_item .cate_name .icon_cn1{
  background-position: 0 -60px;
  position: relative;
  bottom:2px
}

.cate_item .cate_name .icon_cn2{
  background-position: 0 -88px;
  position: relative;
  bottom:4px
}

.cate_item .cate_name .icon_cn3{
  background-position: 0 -117px;
  position: relative;
  bottom:2px
}

.cate_item .cate_name .icon_cn4{
  background-position: 0 -141px;
  position: relative;
  bottom:2px
}

.cate_item .sub_cate{
  float: left;
  padding: 5px;
  width: 600px;  
  font-size: 12px;
  line-height: 20px;
  border-left: 1px solid #e6e6e6;
  padding: 14px 15px 2px 15px;
  }

  .sub_cate .line{
    margin:0px 10px;
  }

  .cate_item:last-child .sub_cate{
    padding-bottom: 30px;
  } 

.catlistbox .ft{
  width: 720px;
  height: 20px;
  background-position: -1440px -12px;
}



</style>