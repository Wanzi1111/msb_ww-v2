<template>
  <div>
    <el-form :model="form" ref="form" v-loading="loading">
      <h4>请在下方编辑器中输入集团简介内容</h4>
      <el-form-item prop="groupIntro">
        <Editor v-model="form.groupIntro" :height="460" />
      </el-form-item>
    </el-form>
    <div class="footerBtn">
      <el-button @click="next(-1)">上一步</el-button>
      <el-button type="primary" @click="save" :loading="loadingBtn"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  introAPI,
  introEditAPI,
  getInfoBySystemCodeAPI,
} from "@/api/group/word";
export default {
  data() {
    return {
      form: { groupIntro: "" },
      loading: false,
      loadingBtn: false,
      id: null,
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loading = true;
      getInfoBySystemCodeAPI()
        .then((res) => {
          const data = res.payload || {};
          this.form = data;
          this.id = data.id;
        })
        .finally(() => (this.loading = false));
    },
    next(val) {
      this.$emit("next", val);
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //   this.submitForm();
          console.log(this.form, "form");
          const params = Object.assign({}, this.form);

          let API = introAPI;
          if (this.id) {
            params.id = this.id;
            API = introEditAPI;
          }

          this.loadingBtn = true;
          API(params)
            .then((res) => {
              this.$message.success("保存成功");
              this.getDetail();
            })
            .finally(() => (this.loadingBtn = false));
        }
      });
    },
  },
};
</script>