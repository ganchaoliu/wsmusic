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
            <w-button
              :type="$store.state.userData.account.id===mySongList.creator.userId?'fav':'subscribed'"
               :fav="true"
            ><template v-slot:value>{{favorsub}}</template></w-button>
            <w-button type="share" ><template v-slot:value>{{share_btn}}</template></w-button>
            <w-button type="download"></w-button>
            <w-button type="comment"><template v-slot:value>{{comment_btn}}</template></w-button>
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
          <hot-song-list :HSongs="mySongList.tracks"></hot-song-list>
        </div>

        <div class="sub_comments" v-if="$route.query.id!==undefined">
          <comments :sourceId ='$route.query.id+""' type='playlist'></comments>
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
import Comments from "../../views/comment/Comment";
import HotSongList from "../../components/common/HotSongList";
import { realFormatSecond } from "../../utils/common";

export default {
  name: "SongList",
  components: {
    PlayButton,
    AddButton,
    WButton,
    OptButtons,
    HotSongList,
    Comments
  },
  data() {
    return {
      mySongList: {
        tracks: [],
        tags: [],
        creator: {
          nickname: "",
        },
        name: "",
      },      
      comments:{}
    };
  },
  methods: {
    init(id) {
      this.getSongList(id);
    },
    async getSongList(id) {
      await request({
        url: "/api/playlist/detail",
        params: {
          id: id,
        },
      })
        .then((res) => {
          this.mySongList = res.data.playlist;
        })
        .catch((err) => {
          console.log(err);
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
    comment_btn() {
      const userId = this.$store.state.userData.account.id;
      const id = this.mySongList.creator.userId;
      if (userId === id) {
        return "评论";
      } else {
        let commentCount = this.mySongList.commentCount;
        let str = "";
        if (commentCount > 100000) {
          str = (commentCount / 10000).toFixed(0) + "万";
        } else {
          str = commentCount;
        }
        return "(" + str + ")";
        return "(" + this.mySongList.commentCount + ")";
      }
    },
    share_btn() {
      const userId = this.$store.state.userData.account.id;
      const id = this.mySongList.creator.userId;
      if (userId === id) {
        return "分享";
      } else {
        let shareCount = this.mySongList.shareCount;

        let str = "";
        if (shareCount > 100000) {
          str = (shareCount / 10000).toFixed(0) + "万";
        } else {
          str = shareCount;
        }
        return "(" + str + ")";
      }
    },
    favorsub() {
      const userId = this.$store.state.userData.account.id;
      const id = this.mySongList.creator.userId;
      if (userId === id) {
        return "收藏";
      } else {
        let subscribedCount = this.mySongList.subscribedCount;

        let str = "";
        if (subscribedCount > 100000) {
          str = (subscribedCount / 10000).toFixed(0) + "万";
        } else {
          str = subscribedCount;
        }
        return "(" + str + ")";
      }
    },
  },
  watch: {
    $route() {
      let id = this.$route.query.id;
      if (id !== undefined) {
        this.init(id);
      }
    },
  },
  created() {
    let id = this.$route.query.id;
    if (id !== undefined) {
      this.init(id);
    }
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