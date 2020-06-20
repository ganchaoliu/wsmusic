<template>
    <div class="main">

        <div class="nav">
            <ul>
                <li><a href="#">单曲</a></li>
                <li><a href="#">专辑</a></li>
                <li><a href="#">MV</a></li>
                <li><a href="#">歌单</a></li>
                <li><a href="#">用户</a></li>
                <li><a href="#">歌词</a></li>
            </ul>
            <div class="clear-fix"></div>
        </div>
        <div class="musiclist w">
            <ul class="listhd">
                <li>歌曲</li>
                <li>歌手</li>
                <li>专辑</li>
                <li>操作</li>
            </ul>
            <ul class="listbd" v-if="$store.state.songlist.length!=0"
                v-for="(song,index) in $store.state.songlist"
                :class="{list2:index%2==0}">
<!--                <li><router-link :to="{path:'/play',query:{id:song.id,name:song.name}}">{{song.name}}</router-link></li>-->
                <li @click="playsong(song.id,song.name)"><a href="#">{{song.name}}</a></li>
                <li><a href="#">{{song.artists[0].name}}</a></li>
                <li><a href="#">{{song.album.name}}</a></li>
                <li>
                    <button @click="addtoplaylist(song.id,song.name)">添加到播放列表</button>
                </li>
                <br />
            </ul>

        </div>
        <div class="add_playlist_success" v-if="true">添加成功</div>
    </div>
</template>

<script>
    import {request} from "../network/request"
    export default {
        name: "Main",
        date(){
            return {
                currentKeywords:'',
                addplaylistsuccess:true
            }
        },
        methods:{
            playsong(id, name){
                request({
                    url:"/api/song/url",
                    params:{
                        id:id
                    }
                }).then((res)=>{
                    if(res.data.data[0].url!=null){
                        console.log(res);
                        const song = {}
                        song.id = id
                        song.name = name
                        song.song = res.data.data[0];
                        this.$store.state.currentsong=song;
                        let checkresult =  this.$store.state.playlist.some(item=>{
                            if(item.id==id){
                                return true
                            }
                        })
                        if(checkresult){
                            console.log('已在播放列表中')
                        }else{
                            this.$store.state.playlist.push(song)
                        }
                    }else{
                        alert('url为空无法播放')
                    }
                });
            },
            addtoplaylist(id,name){
                request({
                    url:"/api/song/url",
                    params:{
                        id:id
                    }
                }).then((res)=>{
                    const song = {
                        id:'',
                        name:'',
                        song:{}
                    }
                    song.id = id
                    song.name = name
                    song.song = res.data.data[0]
                    if(song.song.url!=null) {
                        let checkresult =  this.$store.state.playlist.some(item=>{
                            if(item.id==id){
                                return true
                            }
                        })
                        if(checkresult){
                            console.log('已在播放列表中')
                        }else{
                            this.$store.state.playlist.push(song)
                            console.log('添加'+id)
                            console.log(this.$store.state.playlist)
                        }
                    }else{
                        console.log('url为空，没有版权哟！！')
                    }
                })
            },
            updatesonglist(){
                console.log('歌曲列表变更了');
            },
            getSongUrl:async function(id){
                await request({
                    url:"/api/song/url",
                    params:{
                        id:id
                    }
                }).then((res)=>{
                    console.log('获取url')
                    return res.data.data[0]
                 })
            },
            addplaylistsuccess(){
                return true
            }
        }
    }
</script>

<style scoped>
    /*@import "assets/css/main.css";*/
    @import url("../assets/css/main.css");
</style>