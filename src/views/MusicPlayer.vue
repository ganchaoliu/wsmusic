<template>
    <div class="musicplayer w">

        <div class="songname w" v-if="song.song.url!=null"><h2>{{song.name}}</h2></div>
        <div v-else class="badurl">此音乐无法播放</div>
        <div>
            <el-button @click="playorpause" type="primary" :icon="playicon" circle></el-button>
            <el-tag type="info">{{ audio.currentTime | formatSecond}}</el-tag>
            <el-tag type="info">{{ audio.maxTime | formatSecond}}</el-tag>

            <el-slider v-model="$store.state.volume" @change="changeVolume" :format-tooltip="formatVolumeToolTip" vertical height="50px" class="volume"></el-slider>
            <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" column="progress" class="progress"></el-slider>
        </div>

        <audio ref="audio" :src="song.song.url"
               @play="onPlay" @pause="onPause"
               @loadedmetadata="onLoadedmetadata"
               @timeupdate="onTimeupdate"
                autoplay v-if="song.song.url!=null">浏览器不支持</audio>
<!--        <audio :src="url($route.query.id)" controls autoplay v-if="song.url!=null">浏览器不支持</audio>-->
        <div v-html="lyric"></div>
    </div>
</template>

<script>
    import {request} from '../network/request'

    // 将整数转换成 时：分：秒的格式
    function realFormatSecond(second) {
        var secondType = typeof second

        if (secondType === 'number' || secondType === 'string') {
            second = parseInt(second)

            var hours = Math.floor(second / 3600)
            second = second - hours * 3600
            var mimute = Math.floor(second / 60)
            second = second - mimute * 60

            return hours + ':' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
            return '0:00:00'
        }
    }

    export default {
        name: "MusicPlayer",
        data(){
          return {
              song:{},
              sliderTime:0,
              lyric:'',
              audio: {
                  // 该字段是音频是否处于播放状态的属性
                  playing: false,
                  // 音频当前播放时长
                  currentTime: 0,
                  // 音频最大播放时长
                  maxTime: 0
              }
          }
        },
        methods:{
            playorpause(){
                this.audio.playing?this.pause():this.play()
            },
            play(){
                this.$refs.audio.play()
            },
            pause(){
                this.$refs.audio.pause()
            },
            onPlay () {
                this.audio.playing = true
                this.$refs.audio.volume = this.$store.state.volume/100
                this.playicon = "el-icon-video-pause"
            },
            // 当音频暂停
            onPause () {
                this.audio.playing = false
            },
            onLoadedmetadata(res) {
                this.audio.maxTime = parseInt(res.target.duration)
            },
            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
            onTimeupdate(res) {
                this.audio.currentTime = res.target.currentTime
                this.sliderTime = this.audio.currentTime/this.audio.maxTime*100
            },
            // 进度条格式化toolTip
            formatProcessToolTip(index = 0) {
                index = parseInt(this.audio.maxTime / 100 * index)
                return '进度条: ' + realFormatSecond(index)
            },
            // 进度条格式化toolTip
            formatVolumeToolTip(index = 0) {
                return ' 音量: ' + index
            },
            changeCurrentTime(res){
                this.$refs.audio.currentTime=res/100*this.audio.maxTime
            },
            //改变音量，由于进度条是1-100，音量范围是0-1所以需要进行替换
            changeVolume(res){
                this.$store.state.volume=res
                this.$refs.audio.volume = this.$store.state.volume/100
            }

        },
        filters: {
            // 使用组件过滤器来动态改变按钮的显示
            transPlayPause(value) {
                return value ? '暂停' : '播放'
            },
            // 将整数转化成时分秒
            formatSecond(second = 0) {
                return realFormatSecond(second)
            }
        },
        created() {
            this.song = this.$store.state.currentsong
            request({
                url:"/api/lyric",
                params:{
                    id:this.$store.state.currentsong.id
                }
            }).then((res)=>{
                this.lyric = res.data.lrc.lyric.replace(/(\r\n)|(\n)/g,'<br/><br/>')
            })
        }
    }
</script>

<style scoped>
.w{
    width: 1200px;
    margin: 20px auto;
}
    .songname{
        text-align: center;
    }
    .badurl{
        color: indianred;
        font-size: 25px;
        text-align: center;
    }

    .volume{
        float:left;
    }

    .progress{
        width: 500px;
    }
</style>