<template>
    <div class="music_main">
        <div class="music_player">
            <div class="btns">
                <a class="pre" @click="playloop(-1)"></a>
                <a :class="{'pause':audio.playing,'pla':!audio.playing}" @click="playorpause"></a>
                <a class="nex" @click="playloop(1)"></a>
            </div>
            <div class="music_head">
                <img :src="album_pic">
                <a href="/song?id=1363948882" hidefocus="true" class="mask"></a>
            </div>

            <div class="play">
                <div class="m_words">
                    <a href="#" v-text="displaySongMessage"></a>
                </div>
                <div class="m_progress">
                    <el-slider v-model="sliderTime" :format-tooltip="formatProcessToolTip" @change="changeCurrentTime" column="progress" class="progress" ></el-slider>
                    <el-tag type="info" class="m_time">
                        {{audio.currentTime|formatSecond}}/{{audio.maxTime| formatSecond}}
                    </el-tag>
                    <div class="clearfix"></div>
                </div>
            </div>
            <div class="music_ctrl">
                <div class="v_slider" v-show="vol_show">
                    <el-slider v-model="$store.state.volume" @change="changeVolume" :format-tooltip="formatVolumeToolTip" vertical class="volume"></el-slider>
                </div>
                <a class="icon_vol" @click="change_vol_show"></a>
                <a @click="change_loop" :class="icon_loop"></a>
                <a class="icon_playlist" @click="playlist">{{$store.state.playlist.length}}</a>
                <transition name="fade">
                    <span class="tip" v-show="tip_show">{{tip_message}}</span>
                </transition>

            </div>
            <play-list class="playlist_con"></play-list>
            <audio ref="audio" :src="song_url"
                   @play="onPlay" @pause="onPause"
                   @loadedmetadata="onLoadedmetadata"
                   @timeupdate="onTimeupdate"
                   @ended="play_end"
                   autoplay>浏览器不支持</audio>
            <div class="clearfix"></div>
        </div>
    </div>
</template>

<script>
import { log } from 'util'
    const PlayList = ()=>import('./PlayList')
    import {request} from '../../network/request'

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
                },
                loop: 0,  //0：顺序播放 1：单曲循环 2：随机播放
                vol_show:false,
                position:'',
                tip_show:false,
                tip_message:'',
                album_pic:'',
            }
        },
        methods:{
            playorpause(){
                const currentsong = this.$store.state.currentsong.song.url
                if(currentsong==""&&this.$store.state.playlist.length>0){
                    // this.$store.state.currentsong = this.$store.state.playlist[0]
                    this.$store.commit('updateCurrentSong',this.$store.state.playlist[0])
                }else{
                    this.audio.playing?this.pause():this.play()
                }
            },
            play(){
                this.$refs.audio.play()
            },
            pause(){
                this.$refs.audio.pause()
            },
            play_next(){
                let pos = this.$store.state.playlist.indexOf(this.$store.state.currentsong)
                if(pos+1<this.$store.state.playlist.length){
                    // this.$store.state.currentsong = this.$store.state.playlist[pos+1]
                    this.$store.commit('updateCurrentSong',this.$store.state.playlist[pos+1])
                }else{
                    this.$store.commit('updateCurrentSong',this.$store.state.playlist[0])
                    this.play()
                }
            },
            //参数为播放上一曲或者播放下一曲
            playloop(int){
                //获取播放模式是2随机，0顺序，1单曲循环
                console.log('变更音乐');
                if(this.loop==0){
                    if(int==-1){
                        this.play_pre()
                        console.log('上一曲');
                    }else{
                        this.play_next()
                        console.log('下一曲');
                    }
                }else if(this.loop==1){
                    this.play()
                }else if(this.loop==2){
                    this.playrandom()
                }
            },
            play_pre(){
                const playlist = this.$store.state.playlist
                let len=playlist.length
                //获取播放模式是2随机，0顺序，1单曲循环
                console.log('现在播放列表中有：'+playlist.length+'首歌')
                let pos = this.$store.state.playlist.indexOf(this.$store.state.currentsong)
                if(pos-1>=0){
                    // this.$store.state.currentsong = this.$store.state.playlist[pos-1]
                    this.$store.commit('updateCurrentSong',this.$store.state.playlist[pos-1])
                }else{
                    // this.$store.state.currentsong = this.$store.state.playlist[len-1]
                    this.$store.commit('updateCurrentSong',this.$store.state.playlist[len-1])

                }
            },
            play_end(){
                //播放结束后分析现在的循环模式
                //顺序播放
                // this.play_next()
                //如果是单曲循环则将当前歌曲重新播放一遍
                //随机播放
                this.playloop()
            },
            playrandom(){
                let playlist = this.$store.state.playlist
                let pos = Math.floor(Math.random()*playlist.length);
                // this.$store.state.currentsong = playlist[pos]
                this.$store.commit('updateCurrentSong',playlist[pos])
                this.play()
            },
            onPlay () {
                this.audio.playing = true
                this.$store.commit('updatePlayStatus',true)
                this.$refs.audio.volume = this.$store.state.volume/100
            },
            // 当音频暂停
            onPause () {
                this.audio.playing = false
                this.$store.commit('updatePlayStatus',false)
            },
            onLoadedmetadata(res) {
                this.audio.maxTime = parseInt(res.target.duration)
                this.getLyric(this.$store.state.currentsong.album.id)
                this.getAlbumDetail(this.$store.state.currentsong.album.id)
            },
            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
            onTimeupdate(res) {
                this.audio.currentTime = res.target.currentTime
                this.sliderTime = this.audio.currentTime/this.audio.maxTime*100
            },
            // 进度条格式化toolTip
            formatProcessToolTip(index = 0) {
                index = parseInt(this.audio.maxTime / 100 * index)
                return realFormatSecond(index)
            },
            // 进度条格式化toolTip
            formatVolumeToolTip(index = 0) {
                return ' 音量: ' + index
            },
            changeCurrentTime(res){
                this.$refs.audio.currentTime=res/100*this.audio.maxTime
            },
            //改变音量，由于进度条是1-100，音量范围是0-1所以需要进行替换
            changeVolume(pos){
                this.$store.commit('updateVolume',pos)
                this.$refs.audio.volume = this.$store.state.volume/100
            },
            change_vol_show(){
                this.vol_show?this.vol_show=false:this.vol_show=true
            },
            change_loop(){
                if(this.loop<2){
                    this.loop++
                }else{
                    this.loop=0
                }
            },
            playlist(){
                this.$router.push({
                    path:'playlist'
                })
            },
            //获取专辑封面
            getAlbumDetail(id){
                request({
                    url:"/api/album",
                    params:{
                        id:id
                    }
                }).then((res)=>{
                    this.album_pic = res.data.album.picUrl
                })
            },
            //获取歌词信息
            getLyric(id){
                console.log('获取歌词信息')
                request({
                    url:"/api/lyric",
                    params:{
                        id:id
                    }
                }).then((res)=>{
                    console.log(res)
                })
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
        computed:{
            icon_loop(){
                let loop = this.loop
                    if(loop==0){
                        loop=""
                    }
                return 'icon_loop'+loop
            },
            isupdate(){
                //返回播放列表长度
                return this.$store.state.playlist.length
            },
            song_url(){
                return 'https://music.163.com/song/media/outer/url?id='+this.$store.state.currentsong.id+'.mp3'
            },
            displaySongMessage(){
                console.log(this.$store.state.currentsong)
                if(this.$store.state.currentsong.artist!=''){
                    return this.$store.state.currentsong.name+'--'+ this.$store.state.currentsong.artist
                }else{
                    return this.$store.state.currentsong.name
                }
                
            }
        },
        watch:{
            isupdate:function (new_data,old_data) {
                //判断是添加播放列表还是删除
                if(new_data>old_data){
                    this.tip_message='添加播放列表成功'
                }else{
                    if(new_data!=0){
                        this.tip_message='删除播放列表成功'
                    }else{
                        this.tip_message='播放列表为空'
                    }
                }
                this.tip_show = true
                setTimeout(()=>{
                    this.tip_show = false
                },1000)
            }
        },
        components:{
            PlayList,
        }
    }
</script>

<style scoped>
    @import '../../assets/css/music_player.css';
</style>