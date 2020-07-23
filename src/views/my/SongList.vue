<template>
    <div class="sub_songlist_bg">
        <div class="sub_songlist_main" v-show="mySongList.name!==''">
            <div class="sl_head clear-fix">
                <div class="sub_sl_cvr">
                    <img :src="mySongList.coverImgUrl" alt="">
                </div>
                <div class="sub_sl_detail">
                    <div class="title">
                        <i></i>
                        <h2>{{mySongList.name}}</h2>
                    </div>                    
                    <div class="owner">
                        <img :src="mySongList.creator.avatarUrl" alt="">
                        <a href=""><span>{{mySongList.creator.nickname}}</span></a>
                        <span>{{formateDate(mySongList.createTime,'Y-m-d')}}创建</span>
                    </div>
                    <div class="btns">
                        <a>播放</a>
                        <a>收藏</a>
                        <a>分享</a>
                        <a>下载</a>
                        <a>评论</a>
                    </div>
                    <div class="clear-fix"></div>
                    <div class="tags" v-show="mySongList.tags.length>0">
                        <span>标签：</span>
                        <a href="#" v-for="tag in mySongList.tags" :key="tag">{{tag}}</a>
                    </div>
                    <div class="description" v-if="mySongList.description!=null">
                        <p><span>描述：</span><span v-html="description(mySongList.description)"></span></p>
                    </div>

                </div>
            </div>
            <div class="sub_sl_main">
                <div class="sub_head">
                    <h3>歌曲列表</h3>
                    <span class="songcount">{{mySongList.tracks.length}}首歌</span>
                    <span class="playcount">播放：{{mySongList.playCount}}次</span>
                </div>
                <div class="sub_sl_bd">
                    <ul>
                        <li></li>
                        <li>歌曲标题</li>
                        <li>时长</li>
                        <li>歌手</li>
                        <li>专辑</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {request} from '../../network/request'
import {formatDate} from '../../utils/common'
    export default {
        name: "SongList",
        data(){
            return{
                mySongList:{
                    creator:{
                        nickname:''
                    },
                    name:''
                }
            }
        },
        methods: {
            init(){
                this.getSongList(id)
            },
          async getSongList(id){
              await request({
                    url:"/api/playlist/detail",
                    params:{
                        id:id
                    }
                }).then((res)=>{
                    console.log("歌单详情")
                    console.log(res)
                    this.mySongList = res.data.playlist
                })
          },
        },
        computed: {
            formateDate() {
                return (date,format)=>{
                    return formatDate(date,format)
                }
            },
            description(){
                return (string)=>{
                    return string.replace(/\r\n/g,"<br />").replace(/\n/g,"<br />")
                }
            }
        },
        watch: {
            $route(){
                this.getSongList(this.$route.query.id)
            },
        },created () {
            let id = this.$route.query.id
            this.getSongList(id)
        },
    }
</script>

<style scoped>
    @import "../../assets/css/my/songlist.css";
</style>