<template>
  <div class="login">
    <div class="login-form" v-if="active !== 'replenish'">
      <!-- <el-tooltip
        class="login-img"
        effect="light"
        content="扫码登录"
        placement="left"
      >
        <img :src="imgSrc" alt="" />
      </el-tooltip> -->
      <div
        v-show="active === 'sign' || active === 'scan'"
        class="login-img"
        @click="change(active === 'sign' ? 'scan' : 'sign')"
      >
        <img :src="active === 'sign' ? imgSrc1 : imgSrc2" alt="" />
      </div>
      <!-- 登录 -->
      <Sign v-if="active === 'sign'" @change="change" />
      <!-- 扫码 -->
      <Scan v-show="active === 'scan'" />
      <!-- 忘记密码 -->
      <Forget v-if="active === 'forget'" @back="back" />
      <!-- 注册 -->
      <Register v-if="active === 'register'" @back="back" />
      <!-- 完善信息 -->
    </div>
    <Replenish class="login-form" v-if="active === 'replenish'" />
    <!--  底部  -->
    <div class="el-login-footer">
      <span>Copyright © 万物出品.</span>
    </div>
  </div>
</template>

<script>
import Sign from "./components/sign";
import Scan from "./components/scan";
import Forget from "./components/forget";
import Register from "./components/register";
import Replenish from "./components/replenish";

export default {
  name: "Login",
  components: { Sign, Scan, Forget, Register, Replenish },
  data() {
    return {
      active: "sign",
      imgSrc1:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAACzklEQVRYR82YO2gUQRjH/xERLLwERVFMIBEJIoiphBw+wEZQULGIhaBFesXCLrgL2ktKixRXpNAiYpHCRkijIOKjEQxyCkaOIF6iKQ4JMvLPOOzn3uxj9nG3Ux23s9/89vvP95gZ2D+rPCj4cBjzl4Czo/EvPP8CXHvqYDRi6gD/d4WUgC+/AR++a+tH9wKTB/XvQgFdISXgzBIw905DTU8A98+UBEizb1eVN7jDLvfUArCyoRd3BRzeBTy+kk7urxvA1YVg7pbEciilPKAbst4APq9nAxwbAl7cSAfINbiWGV2AfGCDrBQgIWeWlHfvdODJKMDlNrDyS3/vcA0Y3929B8MeDEf3xD7gzqR+L5UHjXulJ6MAo4STURwGPDD7/1tMWdzXzoBS7soCGsh6A74tSBY/AcyFHMyBFw4nS1yoB40YRx4qb72j96RrmilVYrlbTMXJCxiXcJyCxGaIkPMX4ZtanEXiUgG3Iu2n8kZr8Q1GXBSXDhiVzOXCEnD7NmCkFocVPNv8E5RU/mutJOlM6Yqz3IaflKjT2rPNywVIg+cfKe9NS8tdejeT9UtNdEvAHx3g/WpWi8F7uT1oTBFy+jh80w/mR9MWCgOksScflXd53O34kPQhhQIayNf/9qRZfM9O4PaJAIVduG1cPwZw7oNXJUgsFwyfcZJKnXmXFYpzExvWJLeneS4hKwnIjzCQYcC+SxyWe2wQftozSVidwoPEJj+T+eJUtujuCSCh2WA02xpS3kqw2e1sRu/qngHKPdm6FQDJo4QNs6eABrJ1035arAQgIeRpkbcIvE2IGj33oAGJusHoSxRHeYe1+9QIfJY3M9gFlV7q0lQaM2ftt/KGxIVV7kOTy+Jp50q5KwloAudZEz6bXErMSwBeiPYtSGzerTeU11zTKYiNLzv0SgHKZF5ZQELSk3dPwj93qIIeDOfJykks9yaj+y/Wi4tpWy5spgAAAABJRU5ErkJggg==",
      imgSrc2:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAABaElEQVRYR83WzW2DMBQH8McWcOqlA6TKveoAmYNjMoLJCFy7Rheoqko5VR2gp0SKyBaOXPQqF9k8GzD+5wo4P97jfRRaa0VEDYH+CuNCRv4CQ5FVu36Y/4AhyOxACcnAbUn08pAumu9noq9bf/6/CErpZmD9RHR8TgdUH0Sv3yNAXyRdwCXT3h16VBDQhYQDDpGQQBsJC2Rk1fYTxy6SrN/gsE7LVivS1MACDdgg6w013GagIsgRffvRavfYpxsS6CqcJdp2dB+U/tRsQVw40r0h1xcH8jdpCicEIN2TBCgtGBLKdT141MUcvuTSmwRoXuZ01erzMj/d4roVEzlfM59zhv2scx+cezhPnLnnmOeTAF19kis0Fp0MOFwwIIF2n4QFMrLbT6vupCm2vzdf4UiRXQ3oG4tQwCljcdUIcspjxmIWYEwkswFDkVmBIcjsQAkJARxDwgB9SCigCwkHHCIhgTYSFsjIO0wk91GL9+ZIAAAAAElFTkSuQmCC",
    };
  },
  methods: {
    change(val) {
      this.active = val;
    },
    back() {
      this.active = "sign";
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "./style/index.scss";
// .login {
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   background-image: url("~@/assets/images/login-background.jpg");
//   background-size: cover;
// }
// .login-form {
//   border-radius: 6px;
//   background: #ffffff;
//   width: 400px;
//   min-height: 460px;
//   padding: 25px 25px 25px 25px;
//   position: relative;
//   .login-img {
//     position: absolute;
//     right: 15px;
//     top: 15px;
//     > img {
//       cursor: pointer;
//     }
//   }
//   ::v-deep .login-tab {
//     display: flex;
//     justify-content: space-around;
//     line-height: 40px;
//     margin-bottom: 20px;
//     color: #707070;
//     font-weight: 500;
//     > span {
//       box-sizing: border-box;
//       text-align: center;
//       cursor: pointer;
//       height: 40px;
//       &:hover {
//         color: #1890ff;
//         border-bottom: 2px solid #1890ff;
//       }
//     }
//     .active {
//       color: #1890ff;
//       border-bottom: 2px solid #1890ff;
//     }
//   }
//   ::v-deep .btn {
//     > button {
//       width: 100%;
//       border-radius: 18px;
//       margin-bottom: 20px;
//       margin-left: 0;
//       &:last-child {
//         margin-bottom: 0;
//       }
//     }
//   }
//   ::v-deep .mobileCode {
//     width: 220px;
//     margin-right: 20px;
//   }
//   ::v-deep .getMobileCode {
//     width: 110px;
//   }
//   ::v-deep .form {
//     margin-bottom: 30px;
//   }
//   ::v-deep p {
//     margin: 0;
//   }
// }
// .el-login-footer {
//   height: 40px;
//   line-height: 40px;
//   position: fixed;
//   bottom: 0;
//   width: 100%;
//   text-align: center;
//   color: #fff;
//   font-family: Arial;
//   font-size: 12px;
//   letter-spacing: 1px;
// }
</style>
