<template>
  <div class="sign">
    <h3 class="title">集团办学服务平台</h3>
    <div class="login-tab">
      <span
        :class="active === 'password' ? 'active' : ''"
        @click="changeType('password')"
        >账号密码登录</span
      >
      <span
        :class="active === 'code' ? 'active' : ''"
        @click="changeType('code')"
        >手机号码登录</span
      >
    </div>
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="form"
    >
      <el-form-item prop="username">
        <el-input
          v-model="loginForm.username"
          type="text"
          auto-complete="off"
          placeholder="请输入手机号"
        >
          <svg-icon
            slot="prefix"
            icon-class="user"
            class="el-input__icon input-icon"
          />
        </el-input>
      </el-form-item>
      <div v-if="active === 'password'">
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="请输入密码"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="password"
              class="el-input__icon input-icon"
            />
          </el-input>
        </el-form-item>
        <el-form-item prop="code" v-if="captchaEnabled">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="验证码"
            style="width: 63%"
            @keyup.enter.native="handleLogin"
          >
            <svg-icon
              slot="prefix"
              icon-class="validCode"
              class="el-input__icon input-icon"
            />
          </el-input>
          <div class="login-code">
            <img :src="codeUrl" @click="getCode" class="login-code-img" />
          </div>
        </el-form-item>
      </div>
      <el-form-item prop="mobileCode" v-if="active === 'code'">
        <el-input
          v-model="loginForm.mobileCode"
          auto-complete="off"
          placeholder="验证码"
          @keyup.enter.native="handleLogin"
          class="mobileCode"
        >
          <svg-icon
            slot="prefix"
            icon-class="validCode"
            class="el-input__icon input-icon"
          />
        </el-input>
        <getMobileCode :mobile="loginForm.username" />
      </el-form-item>
    </el-form>
    <div class="other">
      <el-checkbox v-model="loginForm.rememberMe">自动登录</el-checkbox>
      <span class="event">
        <a href="javascript:;" @click="change('register')">注册账户</a>
        <a href="javascript:;" @click="change('forget')">忘记密码</a>
      </span>
    </div>
    <div class="btn">
      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        @click.native.prevent="handleLogin"
      >
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { getCodeImg } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt, decrypt } from "@/utils/jsencrypt";
import getMobileCode from "./getMobileCode";
import { rules } from "./config";

export default {
  name: "Sign",
  components: { getMobileCode },
  data() {
    return {
      codeUrl: "",
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
        mobileCode: "",
      },
      loginRules: rules,
      loading: false,
      // 验证码开关
      captchaEnabled: true,
      redirect: undefined,
      // 登录方式
      active: "password",
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },
  created() {
    this.getCode();
    this.getCookie();
  },
  methods: {
    getCode() {
      getCodeImg().then((res) => {
        this.captchaEnabled =
          res.captchaEnabled === undefined ? true : res.captchaEnabled;
        if (this.captchaEnabled) {
          this.codeUrl = "data:image/gif;base64," + res.img;
          this.loginForm.uuid = res.uuid;
        }
      });
    },
    getCookie() {
      const username = Cookies.get("username");
      const password = Cookies.get("password");
      const rememberMe = Cookies.get("rememberMe");
      this.loginForm = {
        username: username === undefined ? this.loginForm.username : username,
        password:
          password === undefined ? this.loginForm.password : decrypt(password),
        rememberMe: rememberMe === undefined ? false : Boolean(rememberMe),
      };
    },
    //登录
    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, { expires: 30 });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          this.$store
            .dispatch("Login", this.loginForm)
            .then((res) => {
              console.log(res,'res,login');
              //demo
              res.demo=0
              //信息未完善时，跳转至信息完善界面
              if(res.demo===0){
                this.$emit("change", 'replenish');
                return
              }
              //demo
              this.$router.push({ path: this.redirect || "/" }).catch(() => {});
            })
            .catch(() => {
              this.loading = false;
              if (this.captchaEnabled) {
                this.getCode();
              }
            });
        }
      });
    },
    // 登录方式切换
    changeType(val) {
      this.active = val;
      this.$refs.loginForm.clearValidate(["password", "code", "mobileCode"]);
      // this.$refs.loginForm.resetFields();
    },
    // 注册账户/忘记密码
    change(val) {
      this.$emit("change", val);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.sign {
  .title {
    margin: 0px auto 30px auto;
    text-align: center;
    color: #707070;
  }
  .el-input {
    height: 38px;
    input {
      height: 38px;
    }
  }
  .input-icon {
    height: 39px;
    width: 14px;
    margin-left: 2px;
  }
  // .login-tab {
  //   display: flex;
  //   justify-content: space-around;
  //   line-height: 40px;
  //   margin-bottom: 20px;
  //   color: #707070;
  //   font-weight: 500;
  //   > span {
  //     box-sizing: border-box;
  //     text-align: center;
  //     cursor: pointer;
  //     height: 40px;
  //     &:hover {
  //       color: #1890ff;
  //       border-bottom: 2px solid #1890ff;
  //     }
  //   }
  //   .active {
  //     color: #1890ff;
  //     border-bottom: 2px solid #1890ff;
  //   }
  // }
  // .mobileCode {
  //   width: 220px;
  //   margin-right: 20px;
  // }
  .other {
    margin-bottom: 30px;
    .event {
      float: right;
      color: #1890ff;
      font-size: 14px;
      > a {
        &:first-child {
          margin-right: 20px;
        }
      }
    }
  }
  // .btn {
  //   width: 100%;
  //   margin-top: 10px;
  // }
}
.login-code {
  width: 33%;
  height: 38px;
  float: right;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
.el-login-footer {
  height: 40px;
  line-height: 40px;
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  color: #fff;
  font-family: Arial;
  font-size: 12px;
  letter-spacing: 1px;
}
.login-code-img {
  height: 38px;
}
</style>
