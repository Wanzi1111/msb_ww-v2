<template>
  <Dialog
    :dialog-visible.sync="visible"
    :attrs="attrs"
    @close="close"
    ref="dialog"
  >
    <basics-form
      ref="form"
      :loading="loading"
      :forms="forms"
      :actions="formActions"
      @submitForm="submitVoid"
    />
    <div slot="footer">
      <el-button type="primary" :loading="loadingBtn" @click="save(0)">
        保存
      </el-button>
      <el-button type="success" :loading="loadingBtn" @click="save(1)">
        发布
      </el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </Dialog>
</template>

<script>
import {
  pubAddAPI,
  pubEditAPI,
  pubDetailAPI,
} from "@/api/messageCenter/publish";

import { createForms } from "../config";
import Dialog from "@/views/components/dialog";

export default {
  components: { Dialog },
  data() {
    return {
      visible: false,
      attrs: {
        title: "新增",
        width: "600px",
      },
      loading: false,
      loadingBtn: false,
      forms: createForms,
      formActions: {
        submit: {
          hide: true,
        },
        back: {
          hide: true,
        },
        quit: {
          hide: true,
        },
      },
      flag: null, // 保存/发布
    };
  },
  methods: {
    open(id = null) {
      this.id = id;
      if (id) {
        this.getDetail(id);
        this.attrs.title = "编辑";
      } else {
        this.attrs.title = "新增";
      }
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.$refs.form.resetFields();
    },
    save(type) {
      const formRes = this.$refs.form.getRef();
      formRes.validate((valid) => {
        if (valid) {
          this.flag = type;
          this.$refs.form.submit();
        }
      });
    },
    submitVoid(val) {
      const params = Object.assign({}, val);

      let actionAPI = pubAddAPI;
      let tip = "创建成功";

      if (this.id) {
        params.id = this.id;
        actionAPI = pubEditAPI;
        tip = "修改成功";
      }
      params.status = this.flag ? 1 : 0; // 是否发布
      
      this.loadingBtn = true;
      actionAPI(params)
        .then((res) => {
          this.$message.success(tip);
          this.$parent.reset();
          this.visible = false;
        })
        .finally(() => (this.loadingBtn = false));
    },
    getDetail(id) {
      this.loading = true;
      pubDetailAPI(id)
        .then((res) => {
          const data = res.data || {};
          this.$refs?.form?.recoveryForm(data, true);
        })
        .finally(() => (this.loading = false));
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