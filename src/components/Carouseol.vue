<template>
  <div class="caruse">
    <el-carousel
      type="card"
      height="300px"
      loop
      pause-on-hover
      :interval="2000"

    >
      <el-carousel-item v-for="(item, i) in src" :key="item">
        <img :src="src[i]" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import { onMounted, ref } from "vue";
import { getCurrentInstance } from "vue";
export default {
  name: "WorkspaceJsonCarouseol",
  setup() {
    const instance = getCurrentInstance();
    const { proxy } = instance;
    const src = [
      "../src/assets/img/01.webp",
      "../src/assets/img/02.webp",
      "../src/assets/img/03.webp",
      "../src/assets/img/04.webp",
      "../src/assets/img/05.webp",
    ];
    onMounted(() => {});
    const active1 = ref(1);
    return { src, active1 };
  },
};
</script>
<style lang="less" scoped>
.el-carousel{
  --el-carousel-arrow-background:rgba(255,255,255,.3);

}
img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
}
#test1 {
  margin-left: 220px;
}


.el-carousel__arrow {
  background-color:var(--el-carousel-arrow-background);
  }
</style>


 

