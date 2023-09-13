<template>
  <el-dialog
    :custom-class="[otherConfig.showTitleDom ? 'hideTitle' : ''].join(' ')"
    :visible.sync="visible"
    v-bind="attributes"
    @close="close"
    @open="open"
  >
    <div v-if="otherConfig.showTitleSlot" slot="title">
      <slot name="title" />
    </div>
    <slot />
    <div slot="footer">
      <slot name="footer" />
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    dialogVisible: {
      type: Boolean,
      default: false,
    },
    // el-dialog设置其他attributes
    attrs: {
      type: Object,
      default: () => ({}),
    },
    // 其他配置
    other: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    visible: {
      get() {
        return this.dialogVisible;
      },
      set(val) {
        this.$emit("update:dialogVisible", val);
      },
    },
    otherConfig() {
      const defaultConfig = {
        showTitleDom: false, // 是否展示title区域
        showTitleSlot: false, // 是否展示title slot
      };
      return { ...defaultConfig, ...this.other };
    },
    attributes() {
      const defaultAttrs = {
        width: "800px",
        closeOnClickModal: false,
      };
      return { ...defaultAttrs, ...this.attrs };
    },
  },
  methods: {
    open() {
      this.$emit("open");
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.hideTitle {
  .el-dialog__header {
    border: 0;
    padding: 0;
    overflow: hidden;
  }
}
</style>
