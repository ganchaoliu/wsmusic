<template>
  <div class="discover_bg">
    <banner></banner>
    <div class="discover_main">
      <div class="dmain_left"></div>
      <div class="dmain_right"></div>
    </div>
    <w-dialog v-if="false">
        <div slot='input' @click="test">
          <label for="plname">歌单名：</label>
          <input type="text" id="plname" v-model="name" />
        </div>
    </w-dialog>
  </div>
</template>

<script>
import Banner from "../discover/Banner";
import WDialog from "../dialog/WDialog";
export default {
  data(){
    return{
      name:''
    }
  },
  methods: {
    test(){
      console.log('name:'+name);
    }
  },
  components: {
    Banner,
    WDialog,
  },
};
</script>

<style lang="scss" scoped>
</style>