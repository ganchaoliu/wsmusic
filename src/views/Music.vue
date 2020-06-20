<template>
    <div class="Music">
        <label for="search">搜索音乐：</label>
        <input id="search" type="text" placeholder="搜索音乐，歌手，专辑" v-model="searchValue" @keyup.enter="searchMusic">
        <div class="Audio">
            <audio id="audioTag" :src="mp3" controls autoplay></audio>
        </div>
        <div class="musiclist">
            <ul v-for="(song,index) in songs">
                <li>{{index+1}}</li>
                <li @click="play(song.id)" class="songname"> 歌名： <span>{{song.name}}</span></li>
                <li v-if="song.length!=0">歌手： {{song.artists[0].name}}</li>
                <li v-if="song.length!=0">专辑： {{song.album.name}}</li>
            </ul>

        </div>
<!--        <music-player></music-player>-->

    </div>
</template>

<script>
    import {request} from "network/request";

    export default {
        name: "Music",
        data(){
            return{
                songs:[],
                searchValue:'',
                isPlaying:false,
                mp3:"",
                isplaying:false
            }
        },
        methods: {
            searchMusic(){
                request({
                    url:"/api/search",
                    params:{
                        keywords:this.searchValue
                    }
                }).then((res)=>{
                    console.log(res);
                    this.songs = res.data.result.songs
                })
            },
            play(songId){
                request({
                    url:"/api/song/url",
                    params:{
                        id:songId
                    }
                }).then((res)=>{
                    this.mp3=res.data.data[0].url
                })
            }
        },
        computed:{
           urlisnull(){
               return function(index){
                   console.log('自动调用');
                   const songId = this.songs[index].id
                   request({
                               url:"/api/song/url",
                               params:{
                                   id:songId
                               }
                           }).then((res)=>{
                       const url = (res.data.data[0].url);
                       console.log(url);
                       return url==null?true:false
                   }).catch((err)=>{
                       // return true
                   })
               }

           }
        },
        created() {

        },
        components:{
            // MusicPlayer
        }
    }
</script>

<style scoped>
    .Music{
        width: 300px;
        margin: 20px auto 0;
        text-align: center;
    }
    ul{
        list-style: none;
    }

    .musiclist{
        text-align: left;
    }
    .songname span:hover{
        color: orange;
    }

    .Audio{
        margin-top: 20px;
    }

</style>