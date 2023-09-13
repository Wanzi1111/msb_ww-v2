<template>
  <div class="app-container annualInformation">
    <el-card>
      <el-tabs v-model="activeType">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <!-- <Enterprise v-if="activeType === '1'" /> -->
      <School  :showType='activeType'/>
    </el-card>
  </div>
</template>

<script>
import Enterprise from "./components/enterprise";
import School from "./components/index";
export default {
  name: "AnnualInformation",
  components: { Enterprise, School },
  data() {
    return {
      activeType: "1",
      tabList: [
        { label: "企业年度信息", name: "1" },
        { label: "学校年度信息", name: "2" },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.annualInformation {
  ::v-deep .searchs {
    padding-top: 20px;
  }
}
</style>