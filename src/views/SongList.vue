<template>
    <div class="bgw">
        <div class="songlist">
            <div class="head">
                <h3>
                    <span>全部</span>
                    <a href="#">
                        <i>选择分类</i>
                    </a>
                </h3>
                <div class="orderby">热门</div>
                <div class="clear-fix"></div>
            </div>
            <div class="mysonglist">
                <ul >
                    <li v-for="(item,index) in mySongList.playlist" :key="index">
                        <img :src="item.coverImgUrl" v-if="item.creator.userId==$store.state.userData.account.id" alt="">
                    </li>

                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    import {request} from '../network/request'
    export default {
        name: "SongList",
        data(){
            return{
                mySongList:{}
            }
        },
        mounted() {
            console.log('SongList挂载时执行')
            if(this.$store.state.loginStatus){
                let userId = this.$store.state.userData.account.id
                console.log(userId)
                 request({
                    url:"/api/user/playlist",
                    params:{
                        uid:userId
                    }
                    }).then((res)=>{
                        this.mySongList = res.data
                    console.log(res)
                })
            }else{
                alert('请先登陆')
            }
            
        }
    }
</script>

<style scoped>
    .bgw{
    width: 980px;
    height: 500px;
    margin: 20px auto 0;
    background-color: pink;
}

.songlist{
    padding: 40px;
}

.head{
    height: 42px;
    border-bottom: 2px solid green;
    background-color: yellow;
}

h3{
    float: left;
}

.orderby{
    float: right;
}
</style>