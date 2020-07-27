<template>
  <div class="sub_songlist_bg">
    <div class="sub_songlist_main" v-show="mySongList.name!==''">
      <div class="sl_head clear-fix">
        <div class="sub_sl_cvr">
          <img :src="mySongList.coverImgUrl" alt />
        </div>
        <div class="sub_sl_detail">
          <div class="title">
            <i></i>
            <h2>{{mySongList.name}}</h2>
          </div>
          <div class="owner">
            <img :src="mySongList.creator.avatarUrl" alt />
            <a href>
              <span>{{mySongList.creator.nickname}}</span>
            </a>
            <span>{{formateDate(mySongList.createTime,'Y-m-d')}}创建</span>
          </div>
          <div class="sl_btns">
            <play-button></play-button>
            <add-button style="margin-right:10px"></add-button>
            <w-button :type="$store.state.userData.account.id===mySongList.creator.userId?'fav':'subscribed'" v-slot:value>{{favorsub}}</w-button>
            <w-button type="share" v-slot:value>{{share_btn}}
            </w-button>
            <w-button type="download" v-slot:value>下载</w-button>
            <w-button type="comment" v-slot:value>{{comment_btn}}</w-button>
          </div>
          <div class="clear-fix"></div>
          <div class="tags" v-show="mySongList.tags.length>0">
            <span>标签：</span>
            <a href="#" v-for="tag in mySongList.tags" :key="tag">{{tag}}</a>
          </div>
          <div class="description" v-if="mySongList.description!=null">
            <p>
              <span>描述：</span>
              <span v-html="description(mySongList.description)"></span>
            </p>
          </div>
        </div>
      </div>
      <div class="sub_sl_main">
        <div class="sub_head">
          <h3>歌曲列表</h3>
          <span class="songcount">{{mySongList.tracks.length}}首歌</span>
          <span class="playcount">播放：{{mySongList.playCount}}次</span>
        </div>
        <div class="sub_sl_bd">
          <hot-song-list :HSongs='mySongList.tracks'></hot-song-list>
          <!-- <table class="slist">
            <thead v-if="mySongList.tracks.length>0">
              <tr>
                <th class="first">
                  <div class="wp">&nbsp;</div>
                </th>
                <th class="title">
                  <div class="wp">歌曲标题</div>
                </th>
                <th class="dt">
                  <div class="wp">时长</div>
                </th>
                <th class="artist">
                  <div class="wp">歌手</div>
                </th>
                <th class="album">
                  <div class="wp">专辑</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(song,index) in mySongList.tracks" :key="song.id+index">
                <td>{{index+1}}</td>
                <td>{{song.name}}</td>
                <td>{{song.dt|formatSecond}}</td>
                <td>{{artist(song.ar)}}</td>
                <td>{{song.al.name}}</td>
              </tr>
            </tbody>
          </table> -->
          <!-- <opt-buttons></opt-buttons> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request";
import { formatDate } from "../../utils/common";
import PlayButton from "../../components/common/PlayButton";
import AddButton from "../../components/common/AddButton";
import WButton from "../../components/common/WButton";
import OptButtons from "../../components/common/OptButtons";
import HotSongList from "../../components/common/HotSongList";
import { realFormatSecond } from "../../utils/common";

export default {
  name: "SongList",
  components: {
    PlayButton,
    AddButton,
    WButton,
    OptButtons,
    HotSongList
  },
  data() {
    return {
      mySongList: {
        creator: {
          nickname: "",
        },
        name: "",
      },
    };
  },
  methods: {
    init() {
      this.getSongList(id);
    },
    async getSongList(id) {
      await request({
        url: "/api/playlist/detail",
        params: {
          id: id,
        },
      }).then((res) => {
        console.log("歌单详情");
        console.log(res);
        this.mySongList = res.data.playlist;
      });
    },
  },
  computed: {
    formateDate() {
      return (date, format) => {
        return formatDate(date, format);
      };
    },
    description() {
      return (string) => {
        return string.replace(/\r\n/g, "<br />").replace(/\n/g, "<br />");
      };
    },
    artist() {
      return function (artists) {
        let newStr = artists.map((item, index) => item.name).join("/");
        return newStr;
      };
    },
    comment_btn(){
        const userId = this.$store.state.userData.account.id;
        const id = this.mySongList.creator.userId        
        console.log('用户id：'+userId+'\n歌单ID：'+id)
        if(userId===id){
            return '评论'
        }else{
            let commentCount = this.mySongList.commentCount

            let str = "";
            if (commentCount > 100000) {
                str = (commentCount / 10000).toFixed(0) + "万";
            } else {
                str = commentCount;
            }
            return "("+str+")";
            return '('+this.mySongList.commentCount+')'
        }
    },
    share_btn(){
        const userId = this.$store.state.userData.account.id;
        const id = this.mySongList.creator.userId        
        console.log('用户id：'+userId+'\n歌单ID：'+id)
        if(userId===id){
            return '分享'
        }else{
            let shareCount = this.mySongList.shareCount

            let str = "";
            if (shareCount > 100000) {
                str = (shareCount / 10000).toFixed(0) + "万";
            } else {
                str = shareCount;
            }
            return "("+str+")";
        }
    },
    favorsub(){
        const userId = this.$store.state.userData.account.id;
        const id = this.mySongList.creator.userId        
        console.log('用户id：'+userId+'\n歌单ID：'+id)
        if(userId===id){
            return '收藏'
        }else{
            let subscribedCount = this.mySongList.subscribedCount

            let str = "";
            if (subscribedCount > 100000) {
                str = (subscribedCount / 10000).toFixed(0) + "万";
            } else {
                str = subscribedCount;
            }
            return "("+str+")";
        }
    }
  },
  watch: {
    $route() {
      this.getSongList(this.$route.query.id);
    },
  },
  created() {
    let id = this.$route.query.id;
    this.getSongList(id);
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second / 1000);
    },
    formatPlayTime(playtime = 0) {
      let str = "";
      if (playtime > 100000) {
        str = (playtime / 10000).toFixed(2) + "万";
      } else {
        str = playtime;
      }
      return str;
    },
  },
};
</script>

<style scoped>
@import "../../assets/css/my/songlist.css";
</style>