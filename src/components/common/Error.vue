<template>
    <div class="err">
        <div class="err_main">
            <i></i>
            <p>很抱歉，你要查找的网页找不到</p>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="css" scoped>

.err{
    width: 100%;
    height: 800px;
}

.err .err_main{
    width: 980px;
    height: inherit;
    margin: 0px auto;
    padding-top: 150px;
    text-align: center;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    background-color: #fff;
}

.err .err_main i{
    display: inline-block;
    width: 270px;
    height: 112px;
    background: url('../../assets/img/logo.png')no-repeat 0 -405px;
}

.err .err_main p{
    margin-top: 35px;
}


</style>