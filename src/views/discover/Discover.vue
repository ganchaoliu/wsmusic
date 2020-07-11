<template>
    <div class="discover_bg">
        <banner></banner>
        <div class="discover_main">
            
        </div>

    </div>
</template>

<script>
import {request} from '../../network/request'
import Banner from '../discover/Banner'
    export default {
        components: {
            Banner
        }
    }
</script>

<style scoped>
@import url('../../assets/css/discover.css');
</style>