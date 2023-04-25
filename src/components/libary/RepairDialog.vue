<template>
  <div class="Repair">
    <el-dialog v-model="visible" width="30%" modal v-if="visible">
      <template #header> <slot /> </template>
      <div>
        <span
          >{{ responseIdea }}
          <el-select v-model="repairVal.repair_type" placeholder="请选择">
            <el-option
              :label="item.label"
              :value="item.value"
              v-for="item in elOption"
              :key="item.value"
            />
          </el-select>
        </span>
      </div>
      <div>
        <span>描述:</span
        ><textarea
          id="text"
          v-model.trim="repairVal.areaVal"
          cols="3"
          rows="10"
        ></textarea>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <lay-button type="primary" @click="submit"
            ><i class="iconfont icon-addition">提交</i></lay-button
          >
          <button type="button" class="layui-btn layui-btn-warm" @click="reset">
            <i class="layui-icon layui-icon-refresh"></i> 重置
          </button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
import { useVModel } from "@vueuse/core";
import { toRefs, toRef } from "vue";
export default {
  name: "RepairDialog",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    repairVal: {
      type: Object,
      default: () => {},
    },

    responseIdea: { type: String, default: "" },
    elOption: { type: Array, default: () => []},
  },
  setup(props, { emit }) {
    const visible = useVModel(props, "visible", emit);
    const { repairVal } = toRefs(props);
    const responseIdea = toRef(props, "responseIdea");
    const submit = function () {
      emit("change");
    };
    const reset = function () {
      emit("resetDialog", "");
    };
    const elOption=props.elOption;
    return { visible, submit, reset, repairVal, elOption, responseIdea };
  },
};
</script>