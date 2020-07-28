<template>
  <div class="hotsonglist">
    <div
      class="hot_song_item"
      @mouseover="addActive(index)"
      @mouseout="removeActive(index)"
      v-for="(song,index) in HSongs"
      :key="index"
      :class="index%2===0?'':'slbg'"
    >
      <div class="td">
        <div class="number">{{index+1}}</div>
      </div>
      <div class="td">
        <div class="play_btn" @click="playsong(song.id,song.name,song.al,song.ar)"></div>
      </div>
      <div class="td sn">
        <router-link tag="a" :to="{name:'song',query:{ids:song.id}}">{{song.name}}</router-link>
        <router-link tag="a" v-if="song.mv!=0" :to="{name:'mv',query:{id:song.mv}}" class="song_mv"></router-link>
      </div>
      
      <div class="td dura" >        
        <div v-show='index !== opt_btns_show'>{{song.dt|formatSecond}}</div>
        <div class="sbtns">
        <opt-buttons 
          :class="index === opt_btns_show?'showOptBtns':'hideOptBtns'" 
          @add='addtoplaylist(song.id,song.name,song.al,song.ar)'
          @fav='fav(song.id)'
          :btns='["add","fav","share","download"]'>
        </opt-buttons>
      </div>
      </div>
      <div class="td at">
        <!-- <router-link tag="a" :to="{name:'artist',query:{id:song.ar[0].id}}" :title="artist(song.ar)">{{artist(song.ar)}}</router-link> -->
        <router-link tag="a" v-for="(item,index) in song.ar" :key='item+index' :to="{name:'artist',query:{id:item.id}}" :title="item.name">{{item.name}}</router-link>
      </div>
      <div class="td al">
        <router-link tag="a" :to="{name:'album',query:{id:song.al.id}}" :title="song.al.name">《{{song.al.name}}》</router-link>
      </div>
      <div class="clear-fix"></div>
      
    </div>
    <!-- <el-pagination
      class="main_page"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 40]"
      :page-size="$store.state.pageLimit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="$store.state.songCount"
    ></el-pagination> -->
  </div>
</template>

<script>
import { realFormatSecond } from "../../utils/common";
import { request } from "../../network/request";
import { mapState,mapMutations } from 'vuex';
import OptButtons from '../../components/common/OptButtons'

export default {
  name: "HotSongList",
  data() {
    return {
      opt_btns_show: false,
      currentPage: 1,
      type: 1
    };
  },
  props: {
    HSongs:{
      type:Array
    }
  },
  methods: {
    ...mapMutations({
      'updateCurrentSong':'musicplayer/updateCurrentSong',
      'updatePlaylist':'musicplayer/updatePlaylist'
      }),
    playsong(id, name, album, artist) {
      request({
        url: "/api/song/url",
        params: {
          id: id
        }
      }).then(res => {
        if (res.data.data[0].url != null) {
          const song = {};
          song.id = id;
          song.name = name;
          song.song = res.data.data[0];
          song.album = album;
          song.artist = artist;
          this.updateCurrentSong(song)
          let checkresult = this.playlist.some(item => {
            if (item.id == id) {
              return true;
            }
          });
          if (checkresult) {
            this.tip_message = "已在播放列表中";
          } else {
            this.updatePlaylist(song);
          }
        } else {
          alert("url为空无法播放");
        }
      });
    },
     /*
     * 添加歌曲到播放列表
     * 1.判断在播放列表中是否存在
     *
     * */
    addtoplaylist(id, name, album, artist) {
      request({
        url: "/api/song/url",
        params: {
          id: id
        }
      }).then(res => {
        const song = {
          id: "",
          name: "",
          song: {},
          album: {},
          artist: ""
        };
        song.id = id;
        song.name = name;
        song.song = res.data.data[0];
        song.album = album;
        song.artist = artist;
        if (song.song.url != null) {
          let checkresult = this.playlist.some(item => {
            if (item.id == id) {
              return true;
            }
          });
          if (checkresult) {
            alert("已在播放列表中");
          } else {
            this.updatePlaylist(song);
          }
        } else {
          alert("url为空，没有版权哟！！");
        }
      });
    },
    addActive(index) {
      this.opt_btns_show = index;
    },
    removeActive() {
      this.opt_btns_show = -1;
    },
    fav(id) {
      console.log("收藏" + id);
    }
  },
  filters: {
    formatSecond(second = 0) {
      return realFormatSecond(second / 1000);
    }
  },
  computed: {
    // hotSongs() {
    //   return this.$parent.hotSongs;
    // },
    ...mapState('musicplayer',['playlist','currentsong'])
  },
  components: {    
  OptButtons
  }
};
</script>

<style lang="css" scoped>
/* hotsonglist start */

.hotsonglist{
    /* width: 640px;    */
    height: inherit; 
    position: relative;
}

.hotsonglist .slbg{
    background-color: #f7f7f7;
}

.hotsonglist .hot_song_item{
    /* width: 640px; */
    height: 43px;
    padding: 10px 10px 8px 18px;
    font-size: 12px;
    border: 1px solid #fff;
}

.hotsonglist .hot_song_item:hover{
    background-color: #eeeeee;
    border: 1px solid #ddd;
}

.hotsonglist .hot_song_item .td .play_btn{
    margin-top: 2px;
    width: 17px;
    height: 17px;
    background: url('../../assets/img/table.png') no-repeat 0 -103px;
    margin-right: 8px;    
}

.hotsonglist .hot_song_item .dura .showOptBtns{
    visibility: visible;
}

.hotsonglist .hot_song_item .dura .hideOptBtns{
    visibility: hidden;
}

.hotsonglist .hot_song_item .hot_song_item .opt_btns{
    width: 120px;
    height: 16px;     
    vertical-align: middle;
}

.hotsonglist .hot_song_item .td .play_btn:hover{
    cursor: pointer;
    background-position: 0 -128px;
}


.hotsonglist .hot_song_item .sn{
    width: 250px;
    height: 23px;
    line-height: 23px;
    font-size: 12px;    
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.hotsonglist .hot_song_item .sn .song_mv{
    vertical-align: middle;
    margin-left: 3px;
    display:inline-block;
    width: 23px;
    height: 17px;
    background: url('../../assets/img/table.png') no-repeat 0 -151px;
}

.hotsonglist .hot_song_item .dura{
    width: 120px;
    height: 23px;
    line-height: 23px;
}

.hotsonglist .hot_song_item .sbtns{
    padding-top: 3px;
    width: 120px;
    height: 16px;
}

.hotsonglist .hot_song_item .at{
    width: 15%;
    height: 23px;
    line-height: 23px;
    font-size: 12px;    
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

.hotsonglist .hot_song_item .at a{
  margin-right: 5px;
}

/* 分页 */
.main_page{
    margin-top: 20px;
    text-align: center;
}
.main_page a{
    padding: 10px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
}

.hotsonglist .hot_song_item .number{
    height: 23px;
    width: 25px;
    line-height: 23px;
}

.hotsonglist .hot_song_item .al{
    width: 18%;
    height: 23px;
    line-height: 23px;
    font-size: 12px;    
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}

/* 歌曲列表开始 */
.hotsonglist .hot_song_item .td{
    float: left;
}


</style>