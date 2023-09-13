<template>
  <div class="detail">
    <el-descriptions border :column="1">
      <template v-for="i in forms">
        <el-descriptions-item
          v-if="!(i.visible === false)"
          :key="i.prop"
          :label="i.label | label"
          label-class-name="my-label"
          >{{ info[i.prop] | show }}</el-descriptions-item
        >
      </template>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  props: {
    forms: {
      type: Array,
      default: () => [],
    },
    info: {
      type: Object,
      default: () => ({}),
    },
    loading: false,
  },
  filters: {
    label(val) {
      return (val && val.replace(/:|：/g, "")) || "-";
    },
    show(val) {
      return val === null || val === undefined ? "-" : val;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.detail {
  width: 900px;
  ::v-deep .my-label {
    text-align: right;
    width: 400px;
  }
}
</style>