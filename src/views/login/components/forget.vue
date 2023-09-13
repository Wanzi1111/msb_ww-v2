<template>
  <div class="forget">
    <el-steps
      :active="process"
      process-status="finish"
      align-center
      class="step"
    >
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
    </el-steps>
    <el-form ref="form" :model="form" :rules="rules" class="form">
      <div v-if="process === 0">
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            type="text"
            auto-complete="off"
            placeholder="请输入手机号"
          >
            <svg-icon
              slot="prefix"
              icon-class="phone"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="mobileCode">
          <el-input
            v-model="form.mobileCode"
            auto-complete="off"
            placeholder="请输入短信验证码"
            class="mobileCode"
          >
            <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <getMobileCode :mobile="form.username" />
        </el-form-item>
      </div>
      <div v-if="process === 1">
        <el-form-item prop="password1">
          <el-input
            v-model="form.password1"
            type="password"
            auto-complete="off"
            placeholder="请输入新密码"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input
            v-model="form.password2"
            auto-complete="off"
            placeholder="请再次输入密码"
            type="password"
          >
          </el-input>
        </el-form-item>
        <p class="tip">注意：请输入6-16位密码，同时包含字母和数字</p>
      </div>
      <div v-show="process === 2" class="successTip">
        <div class="bg"></div>
        <p>您的密码已重新设置，请牢记新密码</p>
      </div>
    </el-form>
    <div class="btn">
      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        @click.native.prevent="handleClick"
      >
        {{ btnText[process] }}
      </el-button>
      <el-button
        v-show="process !== 2"
        size="medium"
        @click.native.prevent="back"
      >
        返回
      </el-button>
    </div>
  </div>
</template>

<script>
import { rules } from "./config";
import getMobileCode from "./getMobileCode";

export default {
  name: "Forget",
  components: { getMobileCode },
  data() {
    return {
      form: {
        username: "",
        mobileCode: "",
        uuid: "",
        password1: "",
        password2: "",
      },
      rules,
      loading: false,
      process: 0,
      btnText: {
        0: "下一步",
        1: "确认",
        2: "返回登录",
      },
    };
  },
  methods: {
    handleClick() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          switch (this.process) {
            case 0:
              this.next();
              break;
            case 1:
              this.changePassword();
              break;
            case 2:
              this.back();
              break;
          }
        }
      });
    },
    // 校验验证码
    next() {
      setTimeout(() => {
        this.process = 1;
      }, 1000);
    },
    // 修改密码
    changePassword() {
      if (this.form.password1 !== this.form.password2) {
        return this.$message.error("两次输入的密码不一致");
      }
      setTimeout(() => {
        this.process = 2;
      }, 1000);
    },
    back() {
      this.$emit("back");
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.forget {
  padding-top: 50px;
  color: #606266;
  .step {
    margin-bottom: 50px;
  }
  .tip {
    font-size: 14px;
    text-align: center;
  }
  .successTip {
//     text-align: center;
    .bg {
//       display: inline-block;
      width: 110px;
      height: 146px;
      background-image: url("~@/assets/images/resetPasswordSuccess.jpg");
//       background-size: cover;
//       background-repeat: no-repeat;
    }
  }
  .errorTip {
    color: #f56c6c;
    font-size: 12px;
    line-height: 1;
    padding-top: 4px;
    visibility: hidden;
  }
}
</style>
