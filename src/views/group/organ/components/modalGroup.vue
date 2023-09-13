<!--
 * @Descripttion: 
 * @version: 
 * @Author: gaoleifang
 * @Date: 2023-03-16 18:56:10
 * @LastEditors: gaoleifang
 * @LastEditTime: 2023-03-17 11:59:17
-->
<template>
  <div>
    <el-dialog
      title=""
      width="500px"
      :visible.sync="dialogVisible"
      @close="close"
    >
      <basics-form
        :key="state"
        ref="form"
        :loading="false"
        :forms="forms"
        :actions="actions"
        @submitForm="submitForm"
        @changeForm="changeForm"
      >
        <template slot="addGroup" slot-scope="scope">
          <el-button type="primary" size="small">新增</el-button>
          <el-button type="primary" size="small">撤销</el-button>
        </template>
        <template slot="groupList" slot-scope="scope">
          <basics-table
            ref="table"
            :table="table"
            :loading="false"
            :list="list"
            :get-list="getList"
            :columns="columns"
            :total="total"
            :list-query="listQuery"
            :action-function="actionFunction"
            class="organTable"
          />
        </template>
      </basics-form>
    </el-dialog>
  </div>
</template>

<script>
import { groupStruckListFroms, actionsGroup } from '../form'
import { columnStruck, actionsStruck } from '../column'
export default {
  name: 'modal',
  props: {
    modalType: {
      type: Number,
      default: 1
    },
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      modalTitle: 'qwer',
      state: 'add',
      actions: actionsGroup({subDl: this.subDl}),
      forms: groupStruckListFroms,
      // dialogVisible: false,
      table: { stripe: true },
      columns: columnStruck,
      actionFunction: actionsStruck({onSub: this.onSub}),
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
    }
  },
  mounted() {
    this.$nextTick(() => {
      const { modalType } = this
      if(modalType === 2) {
        this.$refs.form.set({
          type: 'visible',
          data: {
            addGroup: true,
            groupList: true,
            groupName: false,
            unitName: false,
          }
        })
      }
    })
  },
  methods: {
    close() {
      this.$emit('closeModal')
    },
    submitForm(){
    },
    changeForm(){

    },
    getList(){},
    subDl(type){
      switch (type) {
        case 'confirm':
          
          break;
        case 'cancel':
          this.$emit('closeModal')
          break;
        default:
          break;
      }
    }
  },
}
</script>

<style lang="scss" scoped>
  .organTable{
    margin: 20px 0;
  }
</style>