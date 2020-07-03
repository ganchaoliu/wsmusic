<template>
    <div class="bg">
        <div class="ma_main">
            <h2>我的视频({{collectMV.length}})</h2>
            <ul>
                <li v-for="mv in collectMV" class="left">
                    <div class="left_img">
                        <img :src="mv.coverUrl" alt="">
                    </div>
                    <p>{{mv.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MyArtist",
        data(){
            return{
                collectMV:this.$parent.collectMV
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>