<template>
  <div class="app-container">
    <basics-form
      :key="state"
      ref="form"
      :loading="false"
      :forms="forms"
      :actions="actions"
      @submitForm="submitForm"
      @changeForm="changeForm"
    />
  </div>
</template>

<script>
import { addGroupForms, actions } from '../form'
export default {
  name: 'addGroup',
  data() {
    return {
      state: 'add',
      // forms: addGroupForms,
      actions: actions({subDl: this.subDl}),
      disabled: false
    }
  },
  computed: {
    forms() {
      const { disabled } = this
      return addGroupForms(disabled)
    }
  },
  methods: {
    subDl() {

    },
    submitForm(){
    },
    changeForm(){

    }
  },
}
</script>

<style lang="scss" scoped>
  ::v-deep .el-col{
    .groupTitle{
      .el-form-item__label{
        font-size: 18px;
        font-weight: 600;
        color: #1890ff;
        border-left: 4px solid #1890ff;
        line-height: 18px;
        margin-bottom: 14px;
      }
      .el-form-item__content{
        border-bottom: 1px solid #e0dfdf;

      }
    }
  }
  ::v-deep .gradeTime{
    height: 58px !important;
  }
</style>