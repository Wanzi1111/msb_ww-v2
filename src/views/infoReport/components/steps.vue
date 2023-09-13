<template>
  <div class="steps">
    <el-steps :active="active" align-center>
      <el-step v-for="(i, index) in list" :key="i" :title="i">
        <div slot="icon" class="icon" @click="handle(index + 1)">
          {{ index + 1 }}
        </div>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: 0,
      //   list: [
      //     { label: "都是", val: 0 },
      //     { label: "吃啥", val: 1 },
      //     { label: "11啊", val: 2 },
      //     { label: "范德萨发生的", val: 3 },
      //   ],
    };
  },
  methods: {
    handle(val) {
      this.active = val;
      this.$emit("change", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.steps {
  ::v-deep .el-step__icon {
    width: 30px;
    height: 30px;
    .icon {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      line-height: 26px;
      cursor: pointer;
    }
  }
}
</style>