<template>
  <el-card class="flowable">
    <!-- <el-tabs v-model="activeType" slot="header">
      <el-tab-pane
        v-for="item in tabList"
        :key="item.value"
        :label="`${item.label}（${item.num}）`"
        :name="item.value"
      ></el-tab-pane>
    </el-tabs> -->
    <div slot="header" class="header">
      <span
        v-for="item in tabList"
        :key="item.value"
        :class="activeType === item.value ? 'active' : ''"
        @click="changeActive(item.value)"
        >{{ `${item.label}（${item.num}）` }}</span
      >
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      activeType: "1",
      tabList: [
        { label: "待办", value: "1", num: 0 },
        { label: "流程", value: "2", num: 0 },
      ],
    };
  },
  methods: {
    changeActive(val) {
      this.activeType = val;
    },
  },
};
</script>

<style lang='scss' scoped>
.flowable {
  ::v-deep .el-card__header {
    padding-bottom: 0;
  }
  .header {
    > span {
      display: inline-block;
      height: 30px;
      text-align: center;
      margin-right: 20px;
      padding: 0 8px;
      cursor: pointer;
      font-weight: 500;
    }
    .active {
      border-bottom: 2px solid rgb(64, 158, 255);
      color: rgb(64, 158, 255);
    }
  }
}
</style>