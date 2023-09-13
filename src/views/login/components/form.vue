<template>
  <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="sign">
    <el-form-item
      v-if="item.prop"
      :label="item.label ? item.label + '：' : ''"
      :prop="item.prop"
      :rules="item.rules"
    >
      <el-input
        v-if="item.type === 'input'"
        v-model="form[item.prop]"
        v-bind="item.attr"
        clearable
      ></el-input>
      <el-select
        v-if="item.type === 'select'"
        v-model="form[item.prop]"
        v-bind="item.attr"
        clearable
      >
        <el-option
          v-for="item in item.options || []"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </el-form-item>

    <el-form-item prop="mobileCode" v-show="active === 'code'">
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
      <getMobileCode style="width: 110px" :mobile="loginForm.username" />
    </el-form-item>
    <slot name="other" />
    <el-form-item style="width: 100%">
      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        class="btn"
        @click.native.prevent="handleLogin"
      >
        <span v-if="!loading">登 录</span>
        <span v-else>登 录 中...</span>
      </el-button>
      <div style="float: right" v-if="register">
        <router-link class="link-type" :to="'/register'">立即注册</router-link>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  naem: "Form",
  props: {
    formList: {
      type: Array,
      default: () => [],
    },
  },
};
</script>