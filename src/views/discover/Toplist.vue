<template>
  <div class="toplist">
    <div class="toplist_main">
      <div class="main_left">
        <h2>云音乐特色榜</h2>
        <ul v-if="toplist.length>0">
          <li v-for="item in tese" :key="item.id" class="item clear-fix">
            <router-link :to="{name:'toplist',query:{id:item.id}}" tag="a">
              <div class="item_detail">
                <div class="left">
                  <img :src="item.coverImgUrl+'?param=40y40'" alt />
                </div>
                <p>{{item.name}}</p>
                <p>{{item.updateFrequency}}</p>
              </div>
            </router-link>
          </li>
        </ul>
        <h2>全球媒体榜</h2>
        <ul>
          <li v-for="item in global" :key="item.id" class="item clear-fix">
            <router-link :to="{name:'toplist',query:{id:item.id}}" tag="a">
              <div class="item_detail">
                <div class="left">
                  <img :src="item.coverImgUrl+'?param=40y40'" alt />
                </div>
                <p>{{item.name}}</p>
                <p>{{item.updateFrequency}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="main_right">
        <song-list></song-list>
      </div>
    </div>
  </div>
</template>

<script>
import { request } from "../../network/request";
import SongList from "../../views/my/SongList";
export default {
  data() {
    return {
      toplist: [],
    };
  },
  methods: {
    getTopList() {
      request({
        url: "/api/toplist",
      }).then((res) => {
        console.log(res);
        this.toplist = res.data.list;
        if (this.$route.query.id == undefined) {
          this.$router.push({
            path: "toplist",
            query: {
              id: this.toplist[0].id,
            },
          });
        }
      });
    },
  },
  created() {
    this.getTopList();
  },
  computed: {
    tese() {
      let a = this.toplist.filter((item) => {
        //   if(item.ToplistType!==undefined){
        //     return item
        //   }
        // if('ToplistType' in item){
        //     return item
        // }

        if (item.hasOwnProperty("ToplistType")) {
          return item;
        }
      });
      console.log(a);
      return a;
    },
    global() {
      let a = this.toplist.filter((item) => {
        //   if(item.ToplistType!==undefined){
        //     return item
        //   }
        // if('ToplistType' in item){
        //     return item
        // }

        if (!item.hasOwnProperty("ToplistType")) {
          return item;
        }
      });
      console.log(a);
      return a;
    },
  },
  components: {
    SongList,
  },
};
</script>

<style lang="css" scoped>
a {
  text-decoration: none;
}

.toplist {
  width: 100%;
}

.toplist .toplist_main {
  margin: 0px auto;
  width: 982px;
  min-height: 700px;
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  background-color: #fff;
  overflow: hidden;
}

.toplist .toplist_main .main_left {
  float: left;
  width: 240px;
  padding-top: 30px;
}

.toplist .toplist_main .main_left h2 {
  font-size: 14px;
  padding: 0px 0px 10px 20px;
}

.toplist .toplist_main .main_left .item {
  width: 240px;
  padding: 10px 0px 10px 20px;
}
.toplist .toplist_main .main_left .item:hover {
  background-color: #eee;
}

.item .item_detail .left {
  margin-right: 10px;
}

.item .item_detail p {
  font-size: 12px;
  line-height: 20px;
  margin-bottom: 0px;
  color: #666;
}

.item .item_detail .left img {
  width: 40px;
  height: 40px;
}

.toplist .toplist_main .main_right {
  float: left;
  width: 740px;
  min-height: 700px;
  border-left: 1px solid #ccc;
}
</style>