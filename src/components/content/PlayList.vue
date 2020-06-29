<template>
    <div class="container" v-show="listdisplay">
        <div class="playlist">
            <div class="head"></div>
            <div class="listbd">
                <ul class="listhd">
                    <li>歌曲</li>
                    <!--                <li>歌手</li>-->
                    <!--                <li>专辑</li>-->
                    <!--                <li>时长</li>-->
                </ul>
                <ul class="listbd" v-if="$store.state.playlist.length!=0"
                    v-for="(song,index) in $store.state.playlist"
                    :class="{list2:index%2==0}">
                    <!--                <li><router-link :to="{path:'/play',query:{id:song.id,name:song.name}}">{{song.name}}</router-link></li>-->
                    <li><a @click="play(index)">{{song.name}}</a></li>
                    <!--                <li><a href="#">{{song.artists[0].name}}</a></li>-->
                    <!--                <li><a href="#">{{song.album.name}}</a></li>-->
                    <!--                <li>-->
                    <!--                    <button @click="addtoplaylist(song.id)">添加到播放列表</button>-->
                    <!--                </li>-->
                    <br />
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "PlayList",
        props:{
            listdisplay:true
        }
    }
</script>

<style scoped>

</style>