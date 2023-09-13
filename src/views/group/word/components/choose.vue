<template>
  <Dialog
    :dialog-visible.sync="visible"
    :attrs="attrs"
    @close="close"
    ref="dialog"
  >
    <el-form></el-form>
    <div slot="footer">
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </Dialog>
</template>

<script>
// import { addAPI, getUserAPI, updateAPI } from "@/api/userCenter";
// import { selectListAPI } from "@/api/management";

import Dialog from "@/views/components/dialog";
// import { validMobile, validEmail } from "@/utils/validate";

export default {
  components: { Dialog },
  data() {
    return {
      visible: false,
      attrs: {
        title: "服务行业面向选择",
        width: "600px",
      },
      loading: false,
    };
  },
  methods: {
    open(userId = null) {
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.$refs.forms.resetFields();
    },
    save() {
      const formRes = this.$refs.forms.getRef();
      formRes.validate((valid) => {
        if (valid) {
          this.$refs.forms.submit();
        }
      });
    },
    submitVoid(val) {
      const params = Object.assign({}, val);
      params.detailImages = params.detailImages.map((item) => item.url);

      let actionAPI = addActivityAPI;
      let tip = "创建成功";

      if (this.id) {
        params.id = this.id;
        actionAPI = modifyActivityAPI;
        tip = "修改成功";
      }

      actionAPI(params).then((res) => {
        if (res.status === 0) {
          this.$message.success(tip);
          this.$parent.reset();
          this.visible = false;
        }
      });
    },
    getDetail(userId) {
      // this.loading = true;
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
// .add {
//   padding-right: 30px;
//   .el-select {
//     width: 100%;
//   }
// }
</style>