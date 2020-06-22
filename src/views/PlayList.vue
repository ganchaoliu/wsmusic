<template>
    <div class="playlist">
        <ul class="listhd">
            <li>歌曲</li>
            <!--                <li>歌手</li>-->
            <!--                <li>专辑</li>-->
            <li>操作</li>
        </ul>
        <ul class="listbd" v-if="$store.state.playlist.length!==0"
            v-for="(song,index) in $store.state.playlist"
            :class="{list2:index%2===0}">
            <!--                <li><router-link :to="{path:'/play',query:{id:song.id,name:song.name}}">{{song.name}}</router-link></li>-->
            <li><a href="#" @click="play(index)">{{song.name}}</a></li>
            <!--                <li><a href="#">{{song.artists[0].name}}</a></li>-->
            <!--                <li><a href="#">{{song.album.name}}</a></li>-->
                            <li>
                                <a href="#" @click="deletefromplaylist(index)">删除</a>
                            </li>
            <br>
        </ul>
        <transition name="fade">
            <span class="tip" v-show="tip_show">{{tip_message}}</span>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "playlist",
        data(){
            return{
                tip_message:'添加成功',
                tip_show:false
            }
        },
        methods:{
            play(index){
                this.$store.state.currentsong=this.$store.state.playlist[index]
            },
            deletefromplaylist(index){
                //判断是否是当前播放的歌曲
                let currentSong = this.$store.state.currentsong
                let currentIndex = this.$store.state.playlist.indexOf(currentSong)
                if(currentIndex===index&&this.$store.state.currentsong.playing){
                    this.tip_message='正在播放中'
                    this.tip_show=true
                    setTimeout(()=>{
                        this.tip_show=false
                    },1000)
                }else{
                    this.$store.state.playlist.splice(index,1)
                    this.tip_message='删除成功'
                    this.tip_show=true
                    setTimeout(()=>{
                        this.tip_show=false
                    },1000)
                }
            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/playList.css";
</style>