<template>
    <div class="songlist_bg">
        <div class="songlist_main">
            <div class="songlist_left">
                <div class="slmain clear-fix">
                    <h2><router-link to="myartist">我的歌手({{collectArtist.length}})</router-link></h2>
                    <h2><router-link to="mymv">我的视频({{collectMV.length}})</router-link></h2>
                    <div class="mycreate_sl clear-fix">
                        <h2 @click="showMycreateList"><span><i></i>创建的歌单({{myCreate_Songlist.length}})</span></h2>
                        <ul v-show="csl_show">
                            <li v-for="(item,index) in myCreate_Songlist" class="list_item clear-fix">
                                <div class="left_img">
                                    <img :src="item.coverImgUrl" alt="">
                                </div>
                                <p>{{item.name}}</p>
                                <p>{{item.trackCount}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="mycollect_sl">
                        <h2 @click="showMycollectList">收藏的歌单({{myCollect_Songlist.length}})</h2>
                        <ul v-show="cll_show">
                            <li v-for="(item,index) in myCollect_Songlist" class="clear-fix">
                                <div class="left_img">
                                    <img :src="item.coverImgUrl" alt="">
                                </div>
                                <p>{{item.name}}</p>
                                <p>{{item.trackCount}}</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="songlist_right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from "../network/request";

    export default {
        name: "MySongList",
        data(){
            return{
                myCreate_Songlist:[],
                myCollect_Songlist:[],
                csl_show:false,
                cll_show:false,
                initData:{},
                collectArtist:[],
                collectMV:[]
            }
        },
        methods:{
            showMycreateList(){
                this.csl_show=!this.csl_show
            },
            showMycollectList(){
                this.cll_show=!this.cll_show
            },
            getCollectArtist(){
                request({
                    url:"/api/artist/sublist",
                }).then((res)=>{
                    this.collectArtist = res.data.data
                    console.log(res.data.data)
                })
            },
            getCollectMV(){
                request({
                    url:"/api/mv/sublist",
                }).then((res)=>{
                    this.collectMV = res.data.data
                    console.log(res.data.data)
                })
            },
            getSonglist(userId){
                console.log(userId)
                request({
                    url:"/api/user/playlist",
                    params:{
                        uid:userId
                    }
                }).then((res)=>{
                    this.initData = res.data
                    let playlist = res.data.playlist
                    playlist.forEach(value=>{
                        if(value.userId===userId){
                            this.myCreate_Songlist.push(value)
                        }else{
                            this.myCollect_Songlist.push(value)
                        }
                    })
                    console.log(res)
                })
            }
        },
        mounted() {
            console.log('SongList挂载时执行')
            if(this.$store.state.loginStatus){
                let userId = this.$store.state.userData.account.id
                this.getCollectArtist()
                this.getCollectMV()
                this.getSonglist(userId)
            }else{
                alert('请先登陆')
                this.$router.push('/login')
            }

        }
    }
</script>

<style scoped>
    @import url('../assets/css/mysonglist.css');
</style>