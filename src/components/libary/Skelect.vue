<!-- 骨架组件 -->


<template>
  <div class="skeleton" :style="{ width, height }" :class="{ shan: animate }">
    <div class="skeleton-1" :style="{ backgroundColor: bgc }"></div>
  </div>
</template><script>
export default {
  name: "WorkspaceJsonSkelect",
  props: {
    width: {
      type: String,
      default: "200px",
    },
    height: {
      type: String,
      default: "200px",
    },
    bgc: {
      type: String,
      default: "#fff",
    },
    animate: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="less" scoped>
.skeleton {
  display: inline-block;
  position: relative;
  width: 200px;
  height: 200px;
  margin: 200px;
  overflow: hidden;
  &-1 {
    width: 100%;
    height: 100%;
    background-color: #ccc;
  }
}

.shan {
  &::after {
    content: "";
    position: absolute;
    top: 0;
    width: 20%;
    height: 100%;
    transform: skew(-45deg);
    background: linear-gradient(
      to left,
      rgba(255, 255, 255, 0.1) 10%,
      rgba(255, 255, 255, 0.3) 30%,
      rgba(255, 255, 255, 0.3) 30%
    );
    // animation: name duration timing-function delay iteration-count direction fill-mode;
    animation: shans 1.5s ease 0.5s infinite;
  }
}

@keyframes shans {
  0% {
    left: -100%;
  }
  100% {
    left: 150%;
  }
}
</style>