<template>
    <div class="discover_bg">
        <!-- <div class="discover_banner" :style="{background:'url('+bannerBGImage+'?imageView&blur=40x20)',background-size:'6000px'}"> -->
        <div class="discover_banner" :style="bannerBGImage">
            <div class="dbanner_bd">
                <div class="dbanner_left">
                    <img :src="getBannerImage" alt="" class="banner_image">
                    <div class="dot_nav">
                        <a href="#" v-for="index in banner_data.length" :key="index" :class="banimg_index===index?'ban_selected':''" @click="banimg_index = index"></a>
                    </div>
                    <a href="javascript:void(0)" class="pre" @click="pre()">&lt;</a>   
                    <a href="javascript:void(0)" class="next" @click='next()'>&gt;</a> 
                </div>
                <div class="dbanner_right">
                    <a href=""></a>
                    <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                </div>             
            </div>
        </div>

    </div>
</template>

<script>
import {request} from '../../network/request'
    export default {
        data(){
            return{
                banimg_index:1,
                banner_data:[],
                intervalId:0,
                bannerBGImage:{},
            }
        },
        methods: {
            pre() {
                if(this.banimg_index--==1){
                    this.banimg_index = this.banner_data.length
                }
                
            },
            next() {
                if(this.banimg_index++==this.banner_data.length){
                    this.banimg_index = 1
                }
            },
            getBanner(type){
                request({
                    url: "/api/banner",
                }).then(res => {
                    console.log(res.data.banners)
                    this.banner_data = res.data.banners
                })
            },
            interval(time){
                setInterval(()=>{
                    if(this.banimg_index<this.banner_data.length){
                        this.banimg_index++
                    }else{
                        this.banimg_index=1
                    }
                },time)
            }
        },
        created () {
            this.getBanner(0)
            this.interval(5000)
        },
        destroyed () {
            clearInterval(this.intervalId)
        },
        computed: {
            getBannerImage(){
                // let imgurl = ''
                // let intervalId = setInterval(()=>{
                //     if(this.banimg_index<this.banner_data.length){
                //         console.log(this.banner_data[this.banimg_index-1].imageUrl)
                //         imgurl = this.banner_data[this.banimg_index-1].imageUrl
                //         console.log('if:'+imgurl)
                //         this.banimg_index++
                //     }else{
                //         imgurl = this.banner_data[this.banimg_index-1].imageUrl
                //         console.log('else:'+imgurl)
                //         this.banimg_index=1
                //     }
                // },2000)
                if(this.banner_data.length!=0&&this.banimg_index-1<this.banner_data.length){
                    this.bannerBGImage={
                        'background-image':'url('+'"'+this.banner_data[this.banimg_index-1].imageUrl+'?imageView&blur=40x20")',
                        'background-size':6000+'px',
                        'background-position':'center center'
                    }
                    
                    this.banner_data[this.banimg_index-1].imageUrl
                    console.log(this.bannerBGStyle)
                    return this.banner_data[this.banimg_index-1].imageUrl
                }
                
            }
        }
    }
</script>

<style scoped>
@import url('../../assets/css/discover/banner.css');
</style>