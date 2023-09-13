<!--
 * @Descripttion: 
 * @version: 
 * @Author: gaoleifang
 * @Date: 2023-03-14 15:34:13
 * @LastEditors: gaoleifang
 * @LastEditTime: 2023-03-15 16:50:05
-->
<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeValue">
        <el-tab-pane label="基本信息" name="1"></el-tab-pane>
        <el-tab-pane label="联系信息" name="2"></el-tab-pane>
        <el-tab-pane label="集团简介" name="3"></el-tab-pane>
      </el-tabs>
      <div class="groupForm">
        <Base v-if="activeValue === '1'" @next="changeActive" />
        <Contact v-if="activeValue === '2'" @next="changeActive" />
        <Intro v-if="activeValue === '3'" @next="changeActive" />
      </div>
    </el-card>
  </div>
</template>
<script>
import Base from "./components/base";
import Contact from "./components/contact";
import Intro from "./components/intro";
export default {
  name: "groupWord",
  components: { Base, Contact, Intro },
  data() {
    return {
      activeValue: "1",
    };
  },
  created() {},
  mounted() {},
  methods: {
    changeActive(val) {
      this.activeValue = this.activeValue * 1 + val + "";
    },
  },
};
</script>

<style lang="scss" scoped>
.groupForm {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  ::v-deep .form {
    min-width: 900px;
  }
}
// ::v-deep .el-col {
//   // height: 58px !important;
//   .groupTitle {
//     .el-form-item__label {
//       font-size: 16px;
//       font-weight: 600;
//     }
//   }
// }
// ::v-deep .gradeTime {
//   height: 58px !important;
// }
</style>
