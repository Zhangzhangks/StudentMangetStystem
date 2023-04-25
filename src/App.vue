<template>
  <div>
    <router-view></router-view>
    <!-- <Skelect width="40px" height="30px" :animate="true"></Skelect> -->
  </div>
</template>
<script>
import axios from "axios";
import Skelect from "./components/libary/Skelect.vue";

export default {
  name: "Dormitory",
  components: { Skelect },
  mounted() {
    console.log("我是mockjs");
    // axios.get("http://justDormitoryA102/zks").then((res) => {
    //   console.log(res);
    // });
  },
};
</script>
<style lang="less" scoped>
</style>