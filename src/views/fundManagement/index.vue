<template>
  <div class="app-container fundManagement">
    <el-card>
      <el-tabs v-model="activeType">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <Income v-if="activeType === '1'" />
      <Outlays v-if="activeType === '2'" />
    </el-card>
  </div>
</template>

<script>
import { Income, Outlays } from "./components";
export default {
  name: "FundManagement",
  components: { Income, Outlays },
  data() {
    return {
      activeType: "1",
      tabList: [
        { label: "集团收入", name: "1" },
        { label: "集团支出", name: "2" },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.fundManagement {
  .searchs {
    padding-top: 20px;
  }
}
</style>