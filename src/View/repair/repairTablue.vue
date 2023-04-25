<template>
  <div class="table-repair">
    <lay-table
      :columns="tableHd"
      @sort-change="sortChange4"
      :data-source="data"
      skin="table"
      :default-toolbar="defaultToolbar5"
      :cell-style="cellStyle"
      :row-style="rowStyle"
      max-height="600px"
      class="LayTable"
    >
      <template #operator="{ row, rowIndex }">
        <lay-button
          size="sm "
          type="primary"
          @click="ideaFn(row, rowIndex)"
          :class="{ disabled: !row.re_done, IndexClose: true }"
          style="text-decoration: none"
          ref="btn"
          >意见反馈</lay-button
        >
      </template>
      <template #switch="{ row }">
        <el-switch
          v-model="row.re_done"
          active-text="已完成"
          inline-prompt
          inactive-text="未完成"
          disabled
        ></el-switch>
      </template>
    </lay-table>

    <RepairDialog
      :visible="visible"
      :repairVal="repairVal"
      :responseIdea="responseIdea"
      :elOption="elOption"
      @resetDialog="reset"
      @change="submit"
    >
      <template #default>
        <h2>意见反馈</h2>
      </template>
    </RepairDialog>
  </div>
</template>
<script>
import { onMounted, ref, reactive, watch } from "vue";
import { GetrepairValue, repair } from "@/Api/repairApi";
import { useStore } from "vuex";
import dayjs from "dayjs";
export default {
  name: "WorkspaceJsonRepairTablue",
  setup(props, ctx) {
    const store = useStore();
    const tableHd = [
      {
        type: "number",
      },
      {
        title: "学号",
        key: "re_uid",
        minWidth: "200px",
        align: "center",
      },
      {
        title: "用户名",
        key: "re_uname",
        minWidth: "200px",
        align: "center",
      },
      {
        title: "报修时间",
        key: "re_date",
        minWidth: "220px",
        align: "center",
        sort: true,
      },
      {
        title: "宿舍楼",
        key: "re_build",
        minWidth: "200px",
        align: "center",
      },
      {
        title: "报修类型",
        key: "type",
        minWidth: "200px",
        align: "center",
      },
      { align: "center", title: "问题描述", key: "re_desc", minWidth: "200px" },
      {
        title: "是否完成",
        align: "center",
        key: "re_done",
        minWidth: "200px",
        customSlot: "switch",
      },
      {
        title: "是否已反馈成功",
        width: "180",

        key: "isFeedBackFinish",
        align: "center",
      },
      {
        title: "操作",
        width: "180",
        customSlot: "operator",
        key: "operator",
        align: "center",
      },
    ];
    const rowCopy = ref("");
    const btn = ref();
    const defaultToolbar5 = ref(["export", "print", "filter"]);
    const data = ref([]);
    const visible = ref(false);
    const responseIdea = ref("反馈类型");
    onMounted(() => {
      const btn = document.querySelector(".LayTable");
      // console.log(btn, "ssss");
      GetrepairValue().then((res) => {
        // console.log(res.alldata);
        res.alldata.forEach((item) => {
          data.value.push({
            re_uid: item.re_uid,
            re_uname: item.re_uname,
            re_desc: item.re_desc,
            re_date: dayjs(item.re_date).format("YYYY-MM-DD"),
            re_done: item.re_done === 1 ? true : false,
            re_build: item.re_build,
            isFeedBackFinish: false,
            type: item.re_type,
          });
        });
      });
    });

    const rowStyle = function (row, rowIndex) {};
    watch(
      () => rowCopy.value,
      () => {
        if (rowCopy.value) {
          let { re_uid: id, re_desc: desc, re_uname: name } = rowCopy.value;
        }
      }
    );
    const cellStyle = function (row, column, rowIndex, columnIndex) {
      if (row.re_done) {
        return `color:#ccc `;
      } else {
        return "color:#333";
      }
    };

    const open = function () {
      visible.value = true;
    };
    const close = function () {
      visible.value = false;
    };
    const ideaFn = function (row, rowIndex) {
      if (!row.re_done) {
        return;
      }
      rowCopy.value = row;

      visible.value ? close() : open();
    };
    let repairVal = reactive({
      repair_type: "",
      areaVal: "",
    });
    const elOption = ref([
      { label: "处理速度", value: "处理速度" },
      { label: "问题是否完成", value: "问题是否完成" },
      { label: "其他", value: "其他" },
    ]);
    const reset = function (val) {
      repairVal.repair_type = val;
      repairVal.areaVal = val;
    };

    const submit = async function () {
      // console.log(row, "行数据");
      if (repairVal.repair_type === "" || repairVal.areaVal === "") {
        return ElNotification({
          title: "Error",
          message: "请填写信息",
          type: "error",
          duration: 600,
        });
      }
      const res = await repair({
        st_id: rowCopy.value.re_uid,
        uname: rowCopy.value.re_uname,
        re_desc: rowCopy.value.re_desc,
        re_idea: repairVal.areaVal,
        re_feedbackType: repairVal.repair_type,
      });
      // console.log(res, "反馈");

      res.status === 200 ? success(callback, close) : failed(callback);
    };
    const callback = function () {
      repairVal.repair_type = "";
      repairVal.areaVal = "";
    };
    const success = function (close, callback) {
      close && close();
      callback && callback();
      console.log(rowCopy.value);

      const index = data.value.findIndex((item) => {
        return (
          item.re_uid == rowCopy.value.re_uid &&
          item.re_uname == rowCopy.value.re_uname &&
          item.re_desc == rowCopy.value.re_desc
        );
      });
      data.value[index].isFeedBackFinish=true
     
      return ElNotification({
        title: "Success",
        message: "反馈成功",
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
    const sortChange4 = function () {
      console.log(2);
    };
    return {
      sortChange4,
      tableHd,
      btn,
      submit,
      data,
      defaultToolbar5,
      elOption,
      visible,
      cellStyle,
      reset,
      responseIdea,
      ideaFn,
      repairVal,
      rowStyle,
    };
  },
};
</script>
<style lang="less" scoped>
// :root{
//   --el-filter-color:#fff
// }
.table-repair {
  padding: 25px;
}

.disabled {
  cursor: not-allowed;
  color: #ccc;
}
</style>
