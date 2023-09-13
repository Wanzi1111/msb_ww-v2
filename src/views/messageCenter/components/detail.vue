<template>
  <Dialog
    :dialog-visible.sync="visible"
    :attrs="attrs"
    @close="close"
    ref="dialog"
  >
    <div class="detail">
      <!-- <div v-for="i in forms" :key="i.prop">
        <span>{{ i.label }}</span>
        <span>{{ data[i.prop] || "-" }}</span>
      </div> -->
      <el-descriptions border :column="1">
        <el-descriptions-item
          v-for="i in forms"
          :key="i.prop"
          :label="i.label | label"
          label-class-name="my-label"
          >{{ info[i.prop] || "-" }}</el-descriptions-item
        >
      </el-descriptions>
    </div>
    <div slot="footer">
      <el-button @click="close">关闭</el-button>
    </div>
  </Dialog>
</template>

<script>
import { createForms } from "../publish/config";
import Dialog from "@/views/components/dialog";
import { tabObj } from "./config";

export default {
  props: {
    API: {
      type: Function,
    },
    detailType: {
      type: String,
      default: "my",
    },
  },
  components: { Dialog },
  data() {
    return {
      visible: false,
      attrs: {
        title: "查看",
        width: "600px",
      },
      loading: false,
      forms: createForms,
      info: {},
    };
  },
  filters: {
    label(val) {
      return (val && val.split("：")[0]) || "-";
    },
  },
  methods: {
    open(id = null) {
      if (id) {
        this.getDetail(id);
      }
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    getDetail(id) {
      this.loading = true;
      this.API &&
        this.API(id)
          .then((res) => {
            const data = res.data || {};
            this.forms?.forEach((i) => {
              if (this.detailType === "my" && i.prop === "content") {
                this.$set(this.info, i.prop, data.extInfo.content);
              } else {
                this.$set(this.info, i.prop, data[i.prop]);
              }
            });
            this.info.type = tabObj[data.type];
          })
          .finally(() => (this.loading = false));
    },
  },
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.detail {
  ::v-deep .my-label {
    text-align: right;
    width: 120px;
  }
}
</style>