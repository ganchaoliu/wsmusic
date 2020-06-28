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
        </div>
    </div>
</template>

<script>
    export default {
        name: "SongList"
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