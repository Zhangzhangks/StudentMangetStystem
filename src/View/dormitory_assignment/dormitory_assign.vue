<template>
  <div class="common-layout" ref="target">
    <el-container>
      <el-header id="header">
        <div class="searchbd">
          <div id="id">
            <span>楼栋编号学号: </span>
            <input type="text" v-focus placeholder="请输入楼栋编号" />
          </div>
          <div id="uname">
            <span>楼栋名称: </span>
            <input type="text" v-focus placeholder="请输入楼栋名称" />
          </div>
          <el-button type="primary" :border="true" :icon="Search"
            >查询不做--{{ dialogVisible }}</el-button
          >
        </div>
      </el-header>
      <el-main
        ><el-table
          :data="tableData"
          min-height="300px"
          stripe
          style="width: 100%"
          border
        >
          <el-table-column label="索引" type="index" width="100" />
          <el-table-column prop="buildName" label="楼栋名称" width="150" />
          <el-table-column prop="buildFloor" label="宿舍号" />
          <el-table-column prop="bedNum" label="床号" width="80" />
          <el-table-column prop="stNumber" label="学生学号" />
          <el-table-column prop="stName" label="学生姓名" />
          <el-table-column prop="stClass" label="学生班级" />
          <el-table-column prop="stMajor" label="学生专业" />
          <el-table-column prop="adNumber" label="宿管工号" />
          <el-table-column prop="adName" label="宿管姓名" />
          <el-table-column align="center" label="操作" width="300">
            <template #default="{ row }">
              <el-button type="primary" @click="assign(row)"
                ><el-icon><More /></el-icon> 手动分配</el-button
              >
            </template>
          </el-table-column>
        </el-table></el-main
      >
    </el-container>
    <customAssign v-model="dialogVisible"  v-if="row" :row="row"/>
  </div>
</template>
<script>
import { getAllAdminValue } from "../../Api/admin";
import { getAllStudentValue } from "../../Api/userApi";
import { onMounted, ref, watchEffect } from "vue";
import { useStore } from "vuex";
import { useIntersectionObserver } from "@vueuse/core";
import customAssign from "./dormitort_custom.vue";
export default {
  name: "WorkspaceJsonDormitoryManger",
  components: { customAssign },
  setup() {
    const tableData = ref([]);
    const Search = ref("Search");
    const dialogVisible = ref(false);
    const House = ref("House");
    const studentFn = ref(null);
    const adminFn = ref(null);
    const store = useStore();
    let st = ref(false);
    let ad = ref(false);
    const row=ref('')
    const assign = function (val) {
      dialogVisible.value = true;
      row.value=val
    };
    watchEffect(() => {
      st.value = window.allStudent;
      ad.value = window.allAdmin;
    });
    const target = ref();

    onMounted(() => {
      const { stop } = useIntersectionObserver(
        target,
        async ([{ isIntersecting }], observerElement) => {
          // 是否进入可视区
          if (isIntersecting) {
            stop(); //停止监听
            if (st.value && ad.value) {
              return render(
                st.value,
                ad.value,
                tableData,
                store.state.user.profileAdmin
              );
            } else {
              studentFn.value = await getAllStudentValue();
              adminFn.value = await getAllAdminValue();
              window.allStudent = studentFn.value;
              window.allAdmin = adminFn.value;
              if (studentFn.value && adminFn.value) {
                render(
                  studentFn.value,
                  adminFn.value,
                  tableData,
                  store.state.user.profileAdmin
                );
              }
            }
          }
        }
      );
    });

    return { target, Search, tableData, House, row,assign, dialogVisible };
  },
}; // 渲染
function render(student, admin, tableData, store) {
  // console.log(student, admin, "student");
  student.alldata.forEach((ele) => {
    if (ele.st_building === store.ad_building) {
      tableData.value.push({
        buildName: ele.st_building,
        buildFloor: ele.st_dorNumber.substr(0, 3),
        bedNum: ele.st_dorNumber.substr(4),
        stNumber: ele.st_userid,
        stName: ele.st_username,
        stClass: ele.st_class,
        stMajor: ele.st_major,
        adNumber: store.ad_userid,
        adName: store.ad_username,
      });
    }
  });
}
</script>

<style lang="less" scoped>
#header {
  padding: 0 !important;
  padding-left: 40px !important;
  height: 80px !important;
  line-height: 0 !important;
  border: 1px solid #ccc;
  background-color: #f5f5f5 !important;
  border-radius: 8px;
  margin-top: 10px;
  .searchbd {
    flex: 1;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    input {
      height: 30px;
      background-color: #fff;
      margin: 0 20px;
      border-radius: 5px;
      &::placeholder {
        font-size: 14px;
        padding-left: 5px;
      }
    }
  }
  .addBd {
    display: flex;
    justify-content: start;
    align-items: center;
    width: 220px;
    height: 100%;
    #btn {
      width: 80px;
      height: 42px;
    }
  }
}
#Pagination {
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  i {
    font-style: normal;
  }
}
.zks {
  height: 100%;
  border: 1px solid #000;
}
#Pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 2%;
  left: 30%;
  font-size: 20px;
  i {
    font-style: normal;
  }
}
</style>