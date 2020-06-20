<template>
    <div class="con">
        <el-dialog
                v-el-drag-dialog
                :visible.sync="dialogVisible"
                title="音频播放"
                width="40%">
            <div v-loading="audio.waiting" style="text-align:center" @click="closeVol">
                <div style="text-align:center;font-size:20px;margin-bottom:10px">
                    <span>歌曲名：{{ title }}</span>
                </div>
                <div v-if="lrcShow" :class="{rotating:audio.playing}" class="logo" @click="lrcShow = !lrcShow">
                    <img :src="logoUrl" class="bg" alt="logo">
                </div>
                <!-- 歌词 -->
                <div v-if="!lrcShow" ref="lrcDiv" class="lrc" @click="lrcShow = !lrcShow">
                    <p style="height:80px"/>
                    <span v-if="lrcList.length === 0">{{ lrc }}</span>
                    <ul v-if="lrcList.length >=0">
                        <li v-for="(v,index) in lrcList" :key="index" :class="{currLrc:index===lrcIndex}">{{ v }}</li>
                    </ul>
                </div>
                <span slot="footer" class="dialog-footer">
          <div class="di main-wrap">
            <audio
                    ref="audio"
                    :src="songUrl"
                    :preload="audio.preload"
                    class="dn"
                    @play="onPlay"
                    @error="onError"
                    @waiting="onWaiting"
                    @pause="onPause"
                    @timeupdate="onTimeupdate"
                    @loadedmetadata="onLoadedmetadata"
            />
            <div class="slideCon">
              <el-slider v-show="!controlList.noProcess" v-model="sliderTime" :format-tooltip="formatProcessToolTip" class="slider" @change="changeCurrentTime"/>
            </div>
            <div class="playCon">
              <el-row>
                <el-col :span="12" style="text-align:left">
                  <span>{{ audio.currentTime | formatSecond }}</span>
                </el-col>
                <el-col :span="12" style="text-align:right">
                  <span>{{ audio.maxTime | formatSecond }}</span>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="2">
                  <span class="volume">
                    <i class="el-icon-ali-play" style="font-size:0px"/>
                  </span>
                </el-col>
                <el-col :span="20" style="text-align:center">
                  <span @click="startPlayOrPause">
                    <i v-if="!audio.playing" class="el-icon-ali-play"/>
                    <i v-if="audio.playing" class="el-icon-ali-pause"/>
                  </span>
                </el-col>
                <el-col :span="2">
                  <span class="volume" @click.stop="showVol">
                    <i class="el-icon-ali-volume" @click.stop="volumeShow = !volumeShow"/>
                    <div v-if="volumeShow" class="volSlideCon">
                      <el-slider v-show="!controlList.noVolume" v-model="sliderVolume" :format-tooltip="formatVolumeToolTip" vertical class="slider" @change="changeVolume" />
                    </div>
                  </span>
                </el-col>
              </el-row>
            </div>
          </div>
        </span>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    // import elDragDialog from '@/directive/el-dragDialog/index'
    // import imglogo from '@/assets/img/imgLogo.png'

    function realFormatSecond(second) {
        const secondType = typeof second
        if (secondType === 'number' || secondType === 'string') {
            second = parseInt(second)
            const hours = Math.floor(second / 3600)
            second = second - hours * 3600
            const mimute = Math.floor(second / 60)
            second = second - mimute * 60
            return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
        } else {
            return '0:00:00'
        }
    }
    export default {
        name: 'AudioPlay',
        // directives: { elDragDialog },
        filters: {
            formatSecond(second = 0) {
                return realFormatSecond(second)
            }
        },
        data: function() {
            return {
                dialogVisible: false,
                currentTime: 0,
                // logoUrl: imglogo,
                songUrl: '',
                lrcObj: '', // 歌词
                lrc: '', // 歌词
                lrcList: [],
                lrcIndex: 0,
                title: '',
                audio: {
                    currentTime: 0,
                    maxTime: 0,
                    playing: false,
                    muted: false,
                    speed: 1,
                    waiting: true,
                    preload: 'auto'
                },
                sliderTime: 0,
                volumeShow: false,
                sliderVolume: 100,
                lrcShow: true,
                controlList: {
                    // 不显示下载
                    noDownload: true,
                    // 不显示静音
                    noMuted: true,
                    // 不显示音量条
                    noVolume: false,
                    // 不显示进度条
                    noProcess: false,
                    // 只能播放一个
                    onlyOnePlaying: false,
                    // 不要快进按钮
                    noSpeed: true
                }
            }
        },
        watch: {
            dialogVisible(val) {
                if (val === false) {
                    this.$refs.audio.pause()
                }
            }
        },
        methods: {
            closeVol() {
                this.volumeShow = false
            },
            showVol() {
                this.volumeShow = true
            },
            // 进度条toolTip
            formatProcessToolTip(index = 0) {
                index = parseInt(this.audio.maxTime / 100 * index)
                return '进度条: ' + realFormatSecond(index)
            },
            // 音量条toolTip
            formatVolumeToolTip(index) {
                return '音量条: ' + index
            },
            // 播放跳转
            changeCurrentTime(index) {
                this.$refs.audio.currentTime = parseInt(index / 100 * this.audio.maxTime)
            },
            changeVolume(index) {
                console.log(index)
                this.$refs.audio.volume = index / 100
                this.sliderVolume = index
            },
            // 控制音频的播放与暂停
            startPlayOrPause() {
                return this.audio.playing ? this.pause() : this.play()
            },
            // 播放音频
            play() {
                this.$refs.audio.play()
            },
            // 暂停音频
            pause() {
                this.$refs.audio.pause()
            },
            // 当音频暂停
            onPause() {
                this.audio.playing = false
            },
            // handleClose(done) {
            //   this.$confirm('确认关闭？', {
            //     confirmButtonText: '确认',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            //   })
            //     .then(_ => {
            //       this.$refs.audio.pause()
            //       done()
            //     })
            //     .catch(_ => {})
            // },
            open(data) {
                this.lrcList = []
                this.songUrl = data.url
                data.lrc = data.lrc.replace(/[\\r\\n]/g, '')
                if (data.lrc !== '') {
                    this.lrcObj = this.handleLrc(data.lrc)
                    console.log(this.lrcObj)
                } else {
                    this.lrc = '暂无歌词'
                }
                if (data.imgUrl) {
                    this.logoUrl = data.imgUrl
                }
                this.title = data.name
                this.dialogVisible = true
            },
            handleLrc(v) {
                var lyrics = v.split('[')
                v.split('[').map(v => {
                    this.lrcList.push(v.slice(9))
                })
                this.lrcList.shift() // / 截取时会多一个空的
                lyrics.shift()
                var b = []
                lyrics.map(v => {
                    b.push('[' + v)
                })
                lyrics = b
                var lrcObj = []
                for (var i = 0; i < lyrics.length; i++) {
                    var lyric = decodeURIComponent(lyrics[i])
                    var timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
                    var timeRegExpArr = lyric.match(timeReg)
                    if (!timeRegExpArr) continue
                    var clause = lyric.replace(timeReg, '')
                    for (var k = 0, h = timeRegExpArr.length; k < h; k++) {
                        var t = timeRegExpArr[k]
                        const min = Number(String(t.match(/\[\d*/i)).slice(1))
                        const sec = Number(String(t.match(/\:\d*/i)).slice(1))
                        var time = min * 60 + sec
                        lrcObj.push({ 'T': time, 'V': clause })
                    }
                }
                return lrcObj
            },
            onError() {
                this.audio.waiting = true
                this.$message.error('文件错误')
            },
            // 当音频开始等待
            onWaiting(res) {
                console.log(res)
            },
            // 当音频开始播放
            onPlay(res) {
                this.audio.playing = true
                this.audio.loading = false
                if (!this.controlList.onlyOnePlaying) {
                    return
                }
                const target = res.target
                const audios = document.getElementsByTagName('audio');
                [...audios].forEach((item) => {
                    if (item !== target) {
                        item.pause()
                    }
                })
            },
            // 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
            onTimeupdate(res) {
                this.audio.currentTime = res.target.currentTime
                this.sliderTime = parseInt(this.audio.currentTime / this.audio.maxTime * 100)
                const _this = this
                if (this.lrc !== '暂无歌词') {
                    _this.lrcObj.map((v, index) => {
                        if (v.T === Math.floor(this.audio.currentTime)) {
                            this.lrcIndex = index
                        }
                    })
                    this.$refs.lrcDiv.scrollTop = 20 * this.lrcIndex
                }
            },
            // 当加载语音流元数据完成后，会触发该事件的回调函数
            // 语音元数据主要是语音的长度之类的数据
            onLoadedmetadata(res) {
                this.audio.waiting = false
                this.audio.maxTime = parseInt(res.target.duration)
            }

        }
    }
</script>
<style scoped>
    .con>>>.el-dialog{
        background: #f1f3f4 !important;
    }
    .logo{
        width: 220px;
        margin: 0 auto;
        height: 220px;
        overflow: hidden;
        border-radius: 50%;
        /*background: url("../../assets/img/audiobg.jpg");*/
        position: relative;
        /* border: 1px solid #ccc; */
    }
    .logo .bg{
        width: 96px;
        height: 96px;
        display: block;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -48px;
        margin-top: -48px;
    }

    .con>>>.el-dialog__body{
        padding: 0;
    }
    .con>>>.el-dialog .el-dialog__footer{
        height: 85px !important;
        text-align: center;
        padding: 0;
    }

    /* .el-dialog__footer button{
        margin-left: 56px;
    } */
    .audio{
        display: inline;
        border: 1px solid #d1d1d1;
        background-color: #f1f3f4;
        border-radius: 8px;
    }

    .main-wrap{
        padding: 10px 15px;
    }
    .slideCon{
        width: 300px;
        margin: -10px auto;
    }
    .playCon {
        width: 306px;
        padding-right: 4px;
        font-size: 12px;
        margin-top: 5px;
        color: #999;
    }
    .playCon i{
        font-size: 44px;
        color: #262c2f;
    }
    /* .slider {
      display: inline-block;
      width: 200px;
      position: relative;
      top: 14px;
      margin: 0 15px;
    } */
    .di {
        display: inline-block;
    }
    .slideCon>>>.el-slider__button-wrapper{
        height: 22px;
        width: 22px;
        top: -10px;
    }
    .slideCon>>>.el-slider__button{
        height: 8px;
        width: 8px;
        border:4px solid #262c2f;
    }
    .slideCon>>>.el-slider__runway{
        height: 2px;
    }
    .slideCon>>>.el-slider__bar{
        height: 2px;
        background: #262c2f
    }

    .dn{
        display: none;
    }
    .el-dialog__body .el-tag{
        margin: 0;
    }
    .time{
        color:#999;
        font-size: 12px;
        padding:4px;
    }
    .volume{
        display:block;
        float:right;
        padding-top: 20px;
        position: relative;
        z-index: 999;
    }
    .volume i{
        font-size: 20px
    }
    .volume .volSlideCon{
        position: absolute;
        bottom: 20px;
        left: -7px;
        height: 60px;
        width: 20px;
    }
    .volume .volSlideCon>>>.el-slider.is-vertical{
        height: 60px;
    }
    .volume .volSlideCon>>>.el-slider__button-wrapper{
        height: 22px;
        width: 22px;
        left: -10px;
    }
    .volume .volSlideCon>>>.el-slider__button{
        height: 8px;
        width: 8px;
        border:4px solid #262c2f;
    }
    .volume .volSlideCon>>>.el-slider__runway{
        width: 2px;
    }
    .volume .volSlideCon>>>.el-slider__bar{
        width: 2px;
        background: #262c2f
    }
    .lrc{
        height: 220px;
        width: 240px;
        margin: 0 auto;
        overflow-y: scroll;
    }
    .lrc span{
        color: #e65e5e
    }
    .lrc ul li{
        list-style: none;
        max-width: 220px;
        padding: 0 4px;
        line-height: 20px;
    }
    .currLrc{
        color: #e65e5e;
        font-size: 16px;
        transition: all 1s;
    }
    ::-webkit-scrollbar
    {
        width: 4px;
        height: 4px;
        background-color: #F5F5F5;
    }

    /*定义滚动条轨道 内阴影+圆角*/
    ::-webkit-scrollbar-track
    {
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
        border-radius: 4px;
        background-color: #F5F5F5;
    }

    /*定义滑块 内阴影+圆角*/
    ::-webkit-scrollbar-thumb
    {
        border-radius: 4px;
        -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
        background-color: #555;
    }
</style>