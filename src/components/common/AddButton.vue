<template>
  <div class="addbutton" @click="action">
    <div href="#" class="btn_add">+</div>
  </div>
</template>

<script>
export default {
  methods: {
    action() {
      this.$emit("click");
    },
  },
};
</script>

<style scoped>
.addbutton {
  display: inline-block;
  width: 31px;
  height: 31px;
  font-size: 12px;
}

.btn_add,
.btn_add:hover,
.btn_add:active {
  background: url("../../assets/img/button2.png") no-repeat 0 -9999px;
}

.btn_add {
  text-indent: -9999px;
  display: inline-block;
  width: 31px;
  line-height: 31px;
  height: 31px;
  margin-right: 5px;
  background-position: 0 -1588px;
}

.btn_add:hover {
  cursor: pointer;
  background-position: -40px -1588px;
}

.btn_add:active {
  background-position: -80px -1588px;
}
</style>