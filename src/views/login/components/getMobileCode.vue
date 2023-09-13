<template>
  <el-button
    :disabled="timing"
    @click.native.prevent="getCodeHandle"
    class="getMobileCode"
  >
    {{ timing ? `${count} 秒` : "获取验证码" }}
  </el-button>
</template>

<script>
import { validMobile } from "@/utils/validate";

export default {
  name: "GetMobileCode", // 获取手机验证码
  props: {
    mobile: "",
  },
  data() {
    return {
      timing: false,
      count: 120,
      interval: null,
    };
  },
  watch: {
    timing: {
      handler: function () {
        if (this.timing) {
          this.interval = window.setInterval(() => {
            if (this.count <= 1) {
              this.timing = false;
              clearInterval(this.interval);
              //   window.nc.reset();
              // 重置秒数
              this.count = 120;
            }
            this.count -= 1;
          }, 1000);
        }
      },
    },
  },
  methods: {
    // 验证码
    getCodeHandle() {
      console.log(this.mobile, "this.mobile");
      if (!this.mobile) {
        this.$message.warning("请输入手机号");
        return;
      }
      if (!validMobile(this.mobile)) {
        this.$message.warning("请输入正确格式的手机号");
        return;
      }
      this.getCode();
    },
    // 获取验证码
    getCode() {
      this.timing = true;
      setTimeout(() => {
        this.$message.success("验证码发送成功，三分钟内有效");
      }, 1000);
    },
  },
  destroyed() {
    this.interval && clearInterval(this.interval);
  },
};
</script>