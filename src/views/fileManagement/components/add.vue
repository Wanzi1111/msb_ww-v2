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
      <el-button type="primary" :loading="loadingBtn" @click="save">
        保存
      </el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </Dialog>
</template>

<script>
import { addManagementAPI, editManagementAPI } from "@/api/fileManagement";
import Dialog from "@/views/components/dialog";

export default {
  components: { Dialog },
  props: {
    createForms: {
      type: Array,
      default: () => [],
    },
  },
  dicts: ["saas_file_type"],
  data() {
    return {
      visible: false,
      attrs: {
        title: "新增",
        width: "600px",
      },
      loading: false,
      loadingBtn: false,
      forms: [],
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
      
    };
  },
  watch: {
    createForms: {
      handler(val) {
        this.forms = [...val];
      },
      deep: true,
      immediate: true,
    },
    "dict.type.saas_file_type": {
      handler(val) {
        console.log(val, "val");
      },
      deep: true,
      immediate: true,
    },
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
    save() {
      const formRes = this.$refs.form.getRef();
      formRes.validate((valid) => {
        if (valid) {
          this.$refs.form.submit();
        }
      });
    },
    submitVoid(val) {
      const params = Object.assign({}, val);

      let actionAPI = addManagementAPI;
      let tip = "创建成功";

      if (this.id) {
        params.id = this.id;
        actionAPI = editManagementAPI;
        tip = "修改成功";
      }

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