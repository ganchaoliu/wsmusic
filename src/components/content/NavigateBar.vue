<template>
  <div class="nav_bar">
    <div class="nav">
      <ul>
        <li>
          <a href="#">单曲</a>
        </li>
        <li>
          <a href="#">专辑</a>
        </li>
        <li>
          <a href="#">MV</a>
        </li>
        <li>
          <router-link to="/songlist">歌单</router-link>
        </li>
        <li>
          <a href="#">用户</a>
        </li>
        <li>
          <a href="#">歌词</a>
        </li>
      </ul>
      <div class="clear-fix"></div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
@import url('../../assets/css/navigatebar.css');
</style>