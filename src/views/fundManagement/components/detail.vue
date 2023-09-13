<template>
  <Dialog
    :dialog-visible.sync="visible"
    :attrs="attrs"
    @close="close"
    ref="dialog"
  >
    <div class="detail">
      <el-descriptions border :column="1">
        <el-descriptions-item
          v-for="i in forms"
          :key="i.prop"
          :label="i.label | label"
          label-class-name="my-label"
          >
          <span>{{ data[i.prop] || "-" }}</span>
          <!-- 附件下载 -->
          <!-- <a :href="data[i.prop]"></a> -->
          </el-descriptions-item
        >
      </el-descriptions>
    </div>
    <div slot="footer">
      <el-button @click="close">关闭</el-button>
    </div>
  </Dialog>
</template>

<script>
import { createForms as income } from "./income/config";
import { createForms as outlays } from "./outlays/config";
import Dialog from "@/views/components/dialog";

export default {
  components: { Dialog },
  data() {
    return {
      visible: false,
      attrs: {
        title: "查看",
        width: "600px",
      },
      loading: false,
      forms: income(),
      data: {},
    };
  },
  filters: {
    label(val) {
      return (val && val.split("：")[0]) || "-";
    },
  },
  methods: {
    open(userId = null, type = 1) {
      this.forms = type === 1 ? [...income()] : [...outlays()];
      if (userId) {
        this.getDetail(userId);
      }
      this.visible = true;
    },
    close() {
      this.visible = false;
    },
    getDetail(userId) {
      this.loading = true;
      // getUserAPI({ userId })
      //   .then((res) => {
      //     const data = res.data || {};
      //     Object.keys(this.formData).forEach((i) => {
      //       this.formData[i] = data[i];
      //     });
      //     this.formData.status = !!data.status;
      //   })
      //   .finally(() => (this.loading = false));
    },
  },
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.detail {
  //   > div {
  //     display: flex;
  //     line-height: 32px;
  //     font-size: 16px;
  //     > span {
  //       &:first-child {
  //         text-align: right;
  //         width: 150px;
  //         // color: #606266;
  //       }
  //       &:last-child {
  //         flex: 1;
  //       }
  //     }
  //   }
  ::v-deep .my-label {
    text-align: right;
    width: 120px;
  }
}
</style>