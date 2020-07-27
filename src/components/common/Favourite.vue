<template>
    <div class="fabbutton">
        <a href="#"><i></i><slot>收藏</slot></a>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .fabbutton,
    .fabbutton a,
    .fabbutton i,
    .fabbutton:hover,
    .fabbutton:hover a,
    .fabbutton:hover i{
        background: url('../../assets/img/button2.png') no-repeat 0px -9999px;
    }

    .fabbutton{
        width: 59px;
        height: 31px;
        background-position: right -1192px;
    }

    .fabbutton a{
        width: 59px;
        height: 31px;
        background-position: 0 -1149px;
    }

    .fabbutton i{
        width: 59px;
        height: 31px;
        background-position: 0 -1149px;
    }



</style>