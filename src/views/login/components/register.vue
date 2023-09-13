<template>
  <div class="register">
    <div class="login-tab" v-if="process !== 2">
      <span class="active">注册</span>
    </div>
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
            type="text"
          >
            <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <getMobileCode :mobile="form.username" />
        </el-form-item>
        <el-form-item prop="password1">
          <el-input
            v-model="form.password1"
            type="password"
            auto-complete="new-password"
            placeholder="请输入密码"
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
      <div v-if="process === 1">
        <el-form-item prop="name">
          <el-input
            v-model="form.name"
            auto-complete="off"
            placeholder="请输入你的姓名"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="sex">
          <el-select v-model="form.sex" placeholder="请选择你的性别">
            <el-option
              v-for="dict in sexList"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="email">
          <el-input
            v-model="form.email"
            auto-complete="off"
            placeholder="请输入你的邮箱地址"
          >
          </el-input>
        </el-form-item>
        <div class="scan">
          <img
            :class="scanStatus === 2 ? 'cloud' : ''"
            src="~@/assets/images/resetPasswordSuccess.jpg"
            alt=""
          />
          <div class="tip scanTip">
            <p>
              <i class="el-icon-success" v-show="scanStatus !== 0"></i>
              <span>{{
                scanStatus == 0
                  ? "请微信扫码绑定账号"
                  : scanStatus == 1
                  ? "扫描成功"
                  : "绑定微信成功"
              }}</span>
            </p>
            <p v-show="scanStatus !== 2">
              <span>{{
                scanStatus == 0
                  ? "绑定完成后，可通过微信登录系统"
                  : "请在微信中点击确认"
              }}</span>
            </p>
          </div>
        </div>
      </div>
      <div v-show="process === 2" class="successTip">
        <div class="bg"></div>
        <p>账号注册成功，欢迎登录系统！</p>
      </div>
    </el-form>
    <div class="btn">
      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        @click.native.prevent="handleClick"
      >
        {{ process == 2 ? "登录" : "下一步" }}
      </el-button>
    </div>
    <div class="backBtn">
      <span @click="back">
        <i class="el-icon-arrow-left"></i>
        返回
      </span>
      <a href="javascript:;" @click="back">使用已有账号登录</a>
    </div>
  </div>
</template>

<script>
import { rules } from "./config";
import getMobileCode from "./getMobileCode";

export default {
  name: "Register",
  components: { getMobileCode },
  data() {
    return {
      form: {
        username: "",
        mobileCode: "",
        uuid: "",
        password1: "",
        password2: "",
        sex: "",
        email: "",
        name: "",
      },
      rules,
      process: 0,
      loading: false,
      sexList: [
        { label: "男", value: "1" },
        { label: "女", value: "2" },
      ],
      scanStatus: 0, // 微信扫码状态
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
              this.handleRegister();
              break;
            case 2:
              this.back();
              break;
          }
        }
      });
    },
    next() {
      if (this.form.password1 !== this.form.password2) {
        return this.$message.error("两次输入的密码不一致");
      }
      setTimeout(() => {
        this.process = 1;
      }, 1000);
    },
    handleRegister() {
      setTimeout(() => {
        this.process = 2;
      }, 1000);
    },
    back() {
      if (this.process === 2 || this.process === 0) {
        this.$emit("back");
      } else {
        this.process = 0;
      }
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.register {
  .form {
    min-height: 284px;
  }

  .backBtn {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    padding-top: 20px;
    > span {
      cursor: pointer;
    }
    > a {
      color: #1890ff;
    }
  }

  .successTip {
    height: 344px;
    padding-top: 102px;
    .bg {
      width: 128px;
      height: 128px;
      background-image: url("~@/assets/images/registerSucess.png");
      margin-bottom: 20px;
    }
  }
  .scan {
    display: flex;
    padding-left: 10px;
    img {
      width: 110px;
      height: 110px;
      margin-right: 20px;
    }
    .cloud {
      opacity: 0.3;
    }
    .scanTip {
      flex: 1;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      text-align: left;
      p {
        width: 100%;
        .el-icon-success {
          color: #67c23a;
        }
      }
    }
  }
}
</style>