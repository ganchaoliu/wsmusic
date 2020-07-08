<template>
    <div class="artist_main">
        <ul>
            <li class="artist_item" v-for="(artist,index) in artists" :key="index">
                <div class="artist_cover">
                    <img :src="getURL(artist.picUrl)" alt="">
                </div>
                <p><router-link tag="a" :to="{name:'artist',query:{'id':artist.id}}"><span>{{artist.name}}</span></router-link></p>
            </li>
        </ul>
        <div class="clear-fix"></div>
    </div>
</template>

<script>
import {mapState,mapGetters} from 'vuex';

    export default {
        name:'ArtistList',
        data(){
            return{

            }
        },
        methods:{
            
        },
        computed: {
            ...mapState('artistlist',['artists']),
            ...mapGetters('artistlist',['getUrl']),
            getURL(){
                return (url)=>{
                    if(url==null){
                      return require('../../assets/img/noartistcover.jpg')
                    }else{
                        return url+'?param=130y130'
                    }
                }
            }
        }
    }
</script>

<style scoped>
@import url("../../assets/css/tabpage/artistlist.css");
</style>