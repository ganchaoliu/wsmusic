<template>
    <div class="mymv_bg">
        <div class="mymv_body">
            <div class="ma_title">
            <h2>我的视频（{{collectMV.length}}）</h2>
            </div>
            <div class="ma_body">
                <ul>
                    <li v-for="mv in collectMV" class="left">
                        <div class="sub_left_img">
                            <img :src="getImg(mv.coverUrl)" alt="">
                            <span class="dura">{{mv.durationms/1000 |formatSecond}}</span>
                            <span class="pt">点击量：{{mv.playTime |formatPlayTime}}</span>
                        </div>
                        <div class="sub_left_detail">
<!--                            <p><a href="">{{mv.title}}</a></p>-->
                            <p><i v-if="mv.type==0"></i><router-link :to="{name:'mv',query:{id:mv.vid}}" tag="a" :title="mv.title">{{mv.title}}</router-link></p>
                            <p> <span v-if="mv.type!=0">by</span> <a href="">{{mv.creator[0].userName}}</a></p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        {{collectMV}}
    </div>
</template>

<script>

    // 将整数转换成 时：分：秒的格式
    function realFormatSecond(second) {
        var secondType = typeof second;

        if (secondType === "number" || secondType === "string") {
            second = parseInt(second);

            var hours = Math.floor(second / 3600);
            second = second - hours * 3600;
            var mimute = Math.floor(second / 60);
            second = second - mimute * 60;

            return (
                hours + ":" + ("0" + mimute).slice(-2) + ":" + ("0" + second).slice(-2)
            );
        } else {
            return "0:00:00";
        }
    }

    export default {
        name: "MyArtist",
        data(){
            return{
                collectMV:this.$parent.collectMV
            }
        },
        methods:{
          getImg(url){
              return url+'?param=200y115'
          }
        },
        computed:{

        },
        mounted() {

        },
        filters: {
            formatSecond(second = 0) {
                return realFormatSecond(second);
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
    }



</script>

<style scoped>
    @import '../assets/css/mymv.css';
</style>