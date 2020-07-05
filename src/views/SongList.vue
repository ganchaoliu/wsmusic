<template>
    <div class="sub_songlist_bg">
        <div class="sub_songlist_main">
            <div class="sl_head">
                <div class="sub_sl_img">
                    <img src="" alt="">
                </div>
                <div class="sub_sl_detail">
                    <h2>我喜欢的音乐</h2>
                    <div class="owner">
                        <img src="" alt="">
                        <a href=""><span>wscooll</span></a>
                        <span>2015-11-22创建</span>
                    </div>
                    <div class="btns">
                        <button>播放</button>
                        <button>收藏</button>
                        <button>分享</button>
                        <button>下载</button>
                        <button>评论</button>
                    </div>

                </div>
            </div>
            <div class="sub_sl_main">
                <div class="sub_head">

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
           <h2>歌曲列表</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SongList",
        data(){
            return{
                mySongList:{}
            }
        },
    }
</script>

<style scoped>
    @import "../assets/css/songlist.css";
</style>