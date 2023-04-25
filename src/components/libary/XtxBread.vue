
<!-- m面包屑导航 渲染组件 -->



<script>
import { h } from "vue";
export default {
  name: "XtxBread",
  render() {
    // 三个参数 1. 标签名字 2.标签属性名 3. 子节点即内容是个数组【】====> 就是h 函数
    // 实现需求
    // 1.创建 xtx-bread 容器
    // 2. 获取默认插槽内容
    // 3. 取消箭头    <i class="iconfont icon-angle-right"></i>
    // 4.  遍历 item 然后加上箭头
    const items = this.$slots.default(); //拿到默认插槽数据

    // console.log(items, "小兔先插槽");
    const dynamicitem = [];
    items.forEach((item, index) => {
      dynamicitem.push(item);
      if (index < items.length - 1) {
        dynamicitem.push(h("i", { class: "iconfont icon-angleright1" }));
      }
    });

    // console.log(dynamicitem, "插槽内容");
    return h("div", { class: "xtx-bread" }, dynamicitem);
  },
};
</script>

<style  lang='less'>
//去掉scoped  目的作用于 bread-item
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: green;
      }
    }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>