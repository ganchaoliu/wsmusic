<template>
    <div class="mv_bg">
        <div class="mv_main">
            <div class="mv_left">
                <div class="mv_ltop">
                    <div class="mv_title" v-if="mv_detail.data.name">
                        <h2 :title="mv_detail.data.name"><i></i>{{mv_detail.data.name}}</h2>
                    </div>
                    <span>{{mv_detail.data.artistName}}</span>
                    <div class="mv_player"><video :src="mv_url" controls autoplay ></video></div>
                </div>
                <div class="mv_btns">
                    <w-button v-slot:value type='like'>({{likedCount}})</w-button>
                    <w-button v-slot:value type='fav'>({{mv_detail.data.subCount}})</w-button>
                    <w-button v-slot:value type='share'>({{mv_detail.data.shareCount}})</w-button>
                    <!-- <a href="#" class="v_btn">赞({{likedCount}})</a>
                    <a href="#" class="v_btn">收藏({{mv_detail.data.subCount}})</a>
                    <a href="#" class="v_btn">转发({{mv_detail.data.shareCount}})</a> -->
                </div>
                <div class="mv_comments">
                    <comments :sourceId="$route.query.id+''" type='mv'></comments>
                </div>

            </div>
            <div class="mv_right">
                <h3>
                    <span>MV简介</span>
                </h3>
                <div class="mv_desc">
                    <p>发布时间：{{mv_detail.data.publishTime}}</p>
                    <p>播放次数：{{mv_detail.data.playCount | formatPlayTime}}</p>
                    <p>{{mv_detail.data.desc}}</p>
                </div>
                <h3>
                    <span>相关推荐</span>
                </h3>
                <ul class="mv_tuijian" v-if="mvs">
                    <li v-for="(mv,index) in mvs" :key="index">
                        <div class="mv_cover">
                            <img :src="getImg(mv.cover)" alt="">
                        </div>
                        <div class="mv_content">
                            <p><router-link :to="{name:'mv',query:{id:mv.id}}" :title="mv.name">{{mv.name}}</router-link></p>
                            <p>{{mv.duration | formatSecond}}</p>
                            <p>{{mv.artistName}}</p>
                        </div>
                        <div class="clear-fix"></div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../network/request";
    import { realFormatSecond } from "../utils/common"
    import WButton from "../components/common/WButton"
    import Comments from "../views/comment/Comment"

    export default {
        name: "mv",
        data(){
            return{
                mv_url:'',
                mv_detail:{data:{name:'',artistName:'',subCount:'',shareCount:'',publishTime:'',playCount:'',desc:''}},
                mvs:[],
                likedCount:0,
            }
        },
        methods:{
            init(){
                request({
                    url:"/api/mv/url",
                    params:{
                        id:this.$route.query.id
                    }
                }).then((res)=>{
                    console.log("mv链接")
                    console.log(res)
                    this.mv_url = res.data.data.url

                })
                request({
                    url:"/api/mv/detail",
                    params:{
                        mvid:this.$route.query.id
                    }
                }).then((res)=>{
                    console.log("mv详情")
                    console.log(res)
                    this.mv_detail = res.data
                    document.title = this.mv_detail.data.name
                })
                request({
                    url:"/api/simi/mv",
                    params:{
                        mvid:this.$route.query.id
                    }
                }).then((res)=>{
                    console.log("推荐MV")
                    console.log(res)
                    this.mvs = res.data.mvs
                })
                request({
                    url:"/api/mv/detail/info",
                    params:{
                        mvid:this.$route.query.id
                    }
                }).then((res)=>{
                    console.log("赞MV")
                    console.log(res)
                    this.likedCount = res.data.likedCount
                })
            },
            getImg(url){
              return url+'?param=96y54'
          },
        },
        created() {
            this.init()
        },
        watch:{
            $route(){
                this.init()
            }
        },
        filters: {
            formatSecond(second = 0) {
                return realFormatSecond(second/1000);
            },
            formatPlayTime(playtime = 0){
                let str = ''
                if(playtime>100000){
                    str = (playtime/10000).toFixed(2)+'万'
                }else{
                    str = playtime
                }
                return str
            }
        },
        components: {
            WButton,
            Comments
        }
    }
</script>

<style lang='css' scoped>
@import "../assets/css/mv.css";
</style>