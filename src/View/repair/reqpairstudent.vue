<template>
  <div class="repairHeader">
    <div class="repair-header">
      <i></i>
      <lay-button type="primary" @click="toggle"
        ><i class="iconfont icon-baoxiu">报修表单</i></lay-button
      >
    </div>
    <div class="repair-value"><tableLay></tableLay></div>

    <RepairDialog
      :visible="visible"
      :repairVal="repairVal"
      @resetDialog="reset"
      @change="submit"
      :responseIdea="responseIdea"
      :elOption="elOption"
    >
      <template #default><h2>填写保修单</h2></template>
    </RepairDialog>
  </div>
</template>

<script>
import { repair } from "../../Api/repairApi";
import { useStore } from "vuex";
import { onMounted, reactive, ref, watchEffect } from "vue";
import tableLay from "./repairTablue.vue";
import { useRouter } from "vue-router";
export default {
  name: "WorkspaceJsonReqpairstudent",
  components: { tableLay },
  setup() {
    const store = useStore();
    const visible = ref(false);
    const open = function () {
      visible.value = true;
    };
    const close = function () {
      visible.value = false;
    };
    const toggle = function () {
      visible.value ? close() : open();
    };
    const responseIdea = ref("报修类型");
    let repairVal = reactive({
      repair_type: "",
      areaVal: "",
    });

    const submit = async function () {
      console.log("father");
      if (repairVal.repair_type === "" || repairVal.areaVal === "") {
        return ElNotification({
          title: "Error",
          message: "请填写信息",
          type: "error",
          duration: 600,
        });
      }
      const res = await repair({
        st_id: store.state.user.profileStudent.st_userid,
        uname: store.state.user.profileStudent.st_username,
        desc: repairVal.areaVal,
        st_build: store.state.user.profileStudent.st_building,
        type: repairVal.repair_type,
      });
      res.status === 200 ? success(callback, close) : failed(callback);
    };
    const reset = function (val) {
      repairVal.repair_type = val;
      repairVal.areaVal = val;
      console.log("father", val);
    };
    const callback = function () {
      repairVal.repair_type = "";
      repairVal.areaVal = "";
    };
    const elOption = ref([
  
      { label: "家具门窗", value: "家具门窗" },
      { label: "风扇维修", value: "风扇维修" },
      { label: "水电维修", value: "水电维修" },
      { label: "空调损坏", value: "空调损坏" },
      { label: "门卫损坏", value: "门卫损坏" },
      { label: "地板凹陷", value: "地板凹陷" },
      { label: "其他", value: "其他" },
    ]);
    return { toggle, visible,elOption, repairVal, responseIdea, reset, submit };
  },
};
const success = function (close, callback) {
  close && close();
  callback && callback();
  return ElNotification({
    title: "Success",
    message: "填写成功",
    type: "success",
    duration: 600,
  });
};

const failed = function (callback) {
  callback && callback();
  return ElNotification({
    title: "Error",
    message: "填写失败",
    type: "error",
    duration: 600,
  });
};
</script>
<style lang="less" >
.repairHeader {
  position: relative;
  height: 860px;

  padding: 10px;
  #text {
    margin: 10px 0px 0px 20px;
    width: 320px;
    height: 120px;
    resize: none;
  }
  .repair {
    &-value {
      height: 120px;
    }
    &-header {
      min-height: 80px;
      display: flex;
      justify-content: start;
      align-items: center;
      background-color: rgba(255, 255, 255, 0.7);
      box-shadow: 0 0 2px #ccc;
      > i {
        width: 7px;
        height: 60px;
        background-color: red;
        margin-right: 10px;
      }
      .repair-btn {
        height: 47px;
        width: 120px;
      }
    }
  }
}
</style>