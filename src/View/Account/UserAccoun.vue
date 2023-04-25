<template>
  <div class="detail">
    <el-form
      :inline="true"
      label-position="right"
      :model="student_value"
      class="demo-form-inline"
    >
      <el-form-item label="学生学号">
        <el-input v-model="student_value.userId" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="学生姓名">
        <el-input
          v-model="student_value.username"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="学生年龄">
        <el-input v-model="student_value.age" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="学生性别">
        <el-input
          v-model="student_value.gender"
          class="ipt"
          :readonly="true"
        /> </el-form-item
      ><el-form-item label="头像" >
        <template #default>
          <div style="width: 1600px">
            <el-image
              style="width: 100px; height: 100px"
              :src="student_value.pic"
              fit="fill"
            />
          </div>
        </template>
      </el-form-item>
      <el-form-item label="学手机号">
        <el-input
          v-model="student_value.phone"
          class="ipt"
          :readonly="true"
        /> </el-form-item
      ><el-form-item label="学院" label-width="70px">
        <el-input
          v-model="student_value.college"
          class="ipt"
          :readonly="true"
        /> 
        </el-form-item
      ><el-form-item label="出生日期">
        <el-input v-model="student_value.birth" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="学生班级">
        <el-input
          v-model="student_value.classname"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="学生专业">
        <el-input v-model="student_value.major" class="ipt" :readonly="true" />
      </el-form-item>
      <el-form-item label="学生楼层">
        <el-input
          v-model="student_value.building"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="宿舍号">
        <el-input
          v-model="student_value.dorNumber"
          class="ipt"
          :readonly="true"
        /> </el-form-item
      ><el-form-item label="家庭地址">
        <el-input
          v-model="student_value.address"
          class="ipt"
          :readonly="true"
        />
      </el-form-item>
      <el-form-item label="学生班级" style="visibility: hidden">
        <el-input v-model="student_value" class="ipt" />
      </el-form-item>
    </el-form>
  </div>
</template>
  <script>
import { reactive } from "vue";
import { useStore } from "vuex";
export default {
  name: "StudnetApp",
  setup() {
    const store = useStore();

    let {
      st_username,
      st_userid,
      st_gender,
      st_age,
      st_phone,
      st_class,
      st_major,
      st_password,
      st_pic,
      st_building,
      st_dorNumber,
      st_address,
      st_birth,
      st_college,
    } = store.state.user.profileStudent;

    const student_value = reactive({
      username: st_username,
      userId: st_userid,
      gender: st_gender === 1 ? "男" : "女",
      age: st_age,
      phone: st_phone,
      classname: st_class,
      major: st_major,
      password: st_password,
      pic: st_pic,
      building: st_building,
      dorNumber: st_dorNumber,
      address: st_address,
      college: st_college,
      birth: getTimeValue(st_birth),
    });

    return { student_value };
  },
};
function getTimeValue() {
  var date = new Date();
  var y = isZero(date.getFullYear());
  var m = isZero(date.getMonth() + 1);
  var date = isZero(date.getDate());
  return y + "-" + m + "-" + date;
}

function isZero(num) {
  return (num = num > 10 ? num : "0" + num);
}
</script>

<style lang="less" scoped>
.demo-form-inline {
  margin: 40px 0 0 2px;
  display: flex;
  flex-wrap: wrap;

  .ipt {
    width: 500px;
  }
}
.el-form--inline {
  .el-form-item {
    margin-right: 38px !important;
    color: blueviolet !important;
  }
}

.detail {
  padding-top: 20px;
  height: 100vw;
  background-image: url(https://images.unsplash.com/photo-1519120944692-1a8d8cfc107f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
</style>