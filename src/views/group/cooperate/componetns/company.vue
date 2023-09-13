<template>
  <div class="company">
    <div class="box">
      <div class="title">系统内合作单位</div>
      <div v-for="item in list" :key="item.id">
        <span>单位名称：</span>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="box">
      <div class="title">其他过往合作单位</div>
      <el-form
        ref="form"
        :model="form"
        label-position="right"
        label-width="120px"
        class="form"
      >
        <el-form-item
          label="单位名称:"
          prop="name"
          :rules="[
            {
              required: true,
              message: '请输入单位名称，多个用“；”分割',
              trigger: 'change',
            },
          ]"
        >
          <el-input
            type="textarea"
            v-model="form.name"
            :rows="5"
            placeholder="请输入单位名称，多个用“；”分割"
          ></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="footerBtn">
      <el-button type="primary" :loading="loadingBtn" @click="save"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { getCompanyListAPI, updateCompanyAPI } from "@/api/group/cooperate";
import { mapState } from "vuex";

export default {
  data() {
    return {
      list: [],
      form: { name: "" },
      loadingBtn: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.getDetail(1);
    this.getDetail(2);
  },
  methods: {
    getDetail(type) {
      getCompanyListAPI({ systemCode: this.user.systemCode, type }).then(
        (res) => {
          if (type === 1) {
            this.list = res.payload || [];
          } else {
            this.form.name = (res.payload || [])?.join("；");
          }
        }
      );
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          const { systemCode, id } = this.user;
          const params = Object.assign({}, this.form, {
            cid: id,
            systemCode,
            type: 2,
          });
          updateCompanyAPI(params).then((res) => {
            this.$message.success("保存成功");
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.company {
  .box {
    .title {
      padding-left: 8px;
      border-left: 2px solid rgb(64, 158, 255);
      font-size: 22px;
    }
    .form {
      padding: 20px;
    }
  }
}
</style>