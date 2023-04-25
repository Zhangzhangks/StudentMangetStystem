<template>
  <div class="mask" v-if="modelValue">
    <div class="custom">
      <el-input v-model="input2" class="w-50 m-2" placeholder="搜索">
        <template #prefix>
          <el-icon class="el-input__icon"><search /></el-icon>
        </template>
      </el-input>

      <div class="tabContainer">
        <div class="leftContainer">
          <div class="tab">
            <div class="tab-hd">楼栋</div>
            <div class="tabbody">
              <div class="breadItem">
                <div
                  class="Bread"
                  @click="changeval(0)"
                  :class="{ breadActive: true }"
                >
                  全部楼栋
                </div>
                <div
                  class="Bread2"
                  v-if="bildValue.buildName"
                  @click="changeval(1)"
                  :class="{ breadActive: bildValue.buildName !== '' }"
                >
                  <i class="iconfont icon-angleright1"></i
                  >{{ bildValue.buildName }}
                </div>
                <div class="Bread3" v-if="bildValue.florrName">
                  <i class="iconfont icon-angleright1"></i
                  >{{ bildValue.florrName }}
                </div>
              </div>
              <el-radio-group v-model="radio1" class="ml-4">
                <el-radio
                  :label="item.build_name"
                  size="large"
                  v-for="item in currentBuild"
                  :key="item"
                  @click="changItem(item)"
                  >{{ item.build_name }}</el-radio
                >
              </el-radio-group>
            </div>
          </div>
        </div>
        <div class="rightContainer">
          <div class="right">
            <span
              >已选择
              <i class="num"
                >{{ bildValue.dormitoryNum.toString().length }}/1</i
              ></span
            >
            <i @click="clear" class="clearAll">清空已选</i>
          </div>
          <el-radio-group
            v-model="bildValue.dormitoryNum"
            class="ml-4"
            v-if="bildValue.dormitoryID !== ''"
          >
            <el-radio
              :label="item"
              size="large"
              v-for="item in 4"
              :key="item"
              >{{ item }}</el-radio
            >
          </el-radio-group>

          <h3 class="place" v-else>请在左侧选择宿舍</h3>
        </div>
      </div>
      <div class="footer">
        <el-button @click="changeCheck('cancel')">取消</el-button>
        <el-button @click="changeCheck('submit')" type="primary"
          >确定</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import { computed, onMounted, reactive, ref, watchEffect } from "vue";
import { getAllBuild } from "@/Api/buildApi";
import { useVModel } from "@vueuse/core";
import { customUpdateDor } from "../../Api/userApi";
export default {
  name: "WorkspaceJsonDormitortCustom",
  props: {
    modelValue: { type: Boolean, default: false },
    row: { type: Object, default: () => {} },
  },
  setup(props, { emit }) {
    const checked = useVModel(props, "modelValue", emit);
    const row = props.row;
    let bildValue = reactive({
      buildID: "",
      buildName: "",
      floorId: "",
      florrName: "",
      dormitoryID: "",
      dormitoryName: "",
      dormitoryNum: "",
      fullText: "",
    });
    const radio1 = ref("1号组团");
    const build = ref([]);
    const input2 = ref();

    let getValue = function () {
      return new Promise((resolve) => {
        if (window.buildVal) {
          return resolve(window.buildVal);
        } else {
          getAllBuild().then((res) => {
            window.buildVal = res.alldata;
            resolve(res.alldata);
          });
        }
      });
    };
    getValue().then((res) => {
      // console.log(res, "res");
      res.forEach((ele) => {
        ele.area = [];
        ele.level = 0;

        for (let i = 1; i <= ele.build_floor; i++) {
          // console.log(i);
          ele.area.push({
            build_name: `${i}层`,
            build_identy: `${parseInt(Math.random() * 10)}${parseInt(
              Math.random() * 10
            )}${parseInt(Math.random() * 10)}`,
            level: 1,

            area: [],
          });
        }
        ele.area.forEach((item, i) => {
          for (let index = 1; index <= ele.build_dor; index++) {
            if (index < 10) {
              item.area.push({
                level: 2,
                build_identy: `${parseInt(Math.random() * 10)}${parseInt(
                  Math.random() * 10
                )}${parseInt(Math.random() * 10)}`,
                build_name: `${i + 1}${0}${index}`,
              });
            } else {
              item.area.push({
                level: 2,
                build_identy: `${parseInt(Math.random() * 10)}${parseInt(
                  Math.random() * 10
                )}${parseInt(Math.random() * 10)}`,
                build_name: `${i + 1}${index}`,
              });
            }
          }
        });
      });
      build.value = res;
      // console.log(build.value, "res");
    });

    const currentBuild = computed(() => {
      let list = build.value && build.value;
      if (bildValue.buildID && bildValue.buildName) {
        list = list.find((item) => {
          return item.build_name === bildValue.buildName;
        }).area;
      }
      if (bildValue.floorId && bildValue.florrName) {
        list = list.find((item) => {
          return item.build_name === bildValue.florrName;
        }).area;
      }
      return list;
    });

    const changItem = function (item) {
      // console.log(item);
      if (item.level == 0) {
        bildValue.buildID = item.build_identy;
        bildValue.buildName = item.build_name;
      }
      if (item.level == 1) {
        bildValue.floorId = item.build_identy;
        bildValue.florrName = item.build_name;
      }
      if (item.level == 2) {
        bildValue.dormitoryID = item.build_identy;
        bildValue.dormitoryName = item.build_name;
      }
    };
    watchEffect(() => {
      bildValue.fullText = `${bildValue.buildName}${bildValue.florrName}${bildValue.dormitoryName}-${bildValue.dormitoryNum}`;
    });
    const clear = function () {
      bildValue.dormitoryNum = "";
    };
    const changeval = function (level) {
      if (level == 0) {
        for (const i in bildValue) {
          bildValue[i] = "";
        }
      }
      if (level == 1) {
        bildValue.floorId = "";
        bildValue.florrName = "";
        bildValue.dormitoryID = "";
        bildValue.dormitoryName = "";
        bildValue.dormitoryNum = "";
        bildValue.fullText = "";
      }
    };
    const changeCheck = function (text) {
      if (text === "cancel") {
         ElNotification({
          title: "Info",
          message: "用户已取消",
          type: "info",
        });
      }
      if (text === "submit") {
        customUpdateDor({ ...row, ...bildValue }).then((res) => {
          checked.value = false;
          if (res.status === 200) {
             ElNotification({
              title: "Success",
              message: res.message,
              type: "success",
            });
          } else {
             ElNotification({
              title: "Error",
              message: res.message,
              type: "error",
            });
          }
        });
      }
      for (const i in bildValue) {
        bildValue[i] = "";
      }
      checked.value = false;
    };
    return {
      input2,
      radio1,
      clear,
      currentBuild,
      changItem,
      bildValue,
      changeCheck,
      changeval,
    };
  },
};
</script>
<style lang="less" scoped>
.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 20;
}
.custom {
  max-width: 900px;
  max-height: 600px;
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translate(-50%);
  z-index: 22;
  padding: 20px;
  background-color: #fff;
  border: 2px solid #f0f0f0;
  box-shadow: 0px 0px 2px 2px #ccc;
  .tabContainer {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    border-bottom: 1px solid #ededed;

    .leftContainer {
      display: inline-block;
      width: 70%;
      .tab {
        width: 100%;
        .tab-hd {
          position: relative;
          width: 12%;
          height: 13%;
          line-height: 35px;
          text-align: center;
          border: 1px solid #ededed;

          border-bottom-color: #fff;
          z-index: 2;
          color: #8bd3ff;
          overflow: hidden;
        }
        .tabbody {
          min-width: 100%;
          min-height: 100%;
          text-align: center;
          border-top: 1px solid #ededed;
          border-left: 1px solid #ededed;
          margin-top: -1px;
          .breadItem {
            display: flex;
            justify-content: start;
            align-items: center;
            width: 95%;
            height: 20px;
            margin: 5px;
            padding-left: 5px;
            .breadActive {
              &:hover {
                color: #8bd3ff;
                cursor: pointer;
              }
            }
          }
          .el-radio {
            width: 25%;
            padding: 20px;
          }
        }
      }
    }

    .rightContainer {
      width: 30%;
      border-left: 1px solid #ededed;
      .el-radio {
        margin-left: 10px;
      }
      .right {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 10px;
        .num {
          margin-left: 5px;
        }
        .clearAll {
          color: #bfe7ff;
          &:hover {
            color: #1d86f0;
            cursor: pointer;
          }
        }
      }
      .place {
        margin-top: 42px;
        margin-left: 62px;
        color: #ededed;
      }
    }
  }
  .footer {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 15px;
  }
}
</style>