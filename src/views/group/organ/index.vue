<!--
 * @Descripttion: 
 * @version: 
 * @Author: gaoleifang
 * @Date: 2023-03-15 17:54:14
 * @LastEditors: gaoleifang
 * @LastEditTime: 2023-03-17 11:57:05
-->
<template>
  <div class="app-container">
    <basics-search
      ref="listSearch"
      :loading="false"
      :searchs="searchs"
      @changeSearch="changeSearch"
      @submitSearch="submitSearch"
     />
     <div style="margin: 14px 0 0 14px;">
       <el-button type="primary" size="small" icon="el-icon-plus" @click="addGroup">新增</el-button>
       <el-button type="primary" size="small" icon="el-icon-upload">导入</el-button>
       <el-button type="primary" size="small" icon="el-icon-download">导出</el-button>
       <el-button type="primary" size="small" icon="el-icon-discount" @click="struckGroup">机构单位维护</el-button>
     </div>
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
    <!-- 弹窗 -->
    <modal-group :modalType="modalType" :dialogVisible="dialogVisible" @closeModal="closeModal" />
    
  </div>
</template>

<script>
import { searchs } from './search'
import columns, { actions } from './column'
import ModalGroup from './components/modalGroup.vue'

export default {
  name: 'organ',
  components: {
    ModalGroup
  },
  data() {
    return {
      searchs,
      table: { stripe: true },
      columns,
      actionFunction: actions({onSub: this.onSub}),
      list: null,
      total: 0,
      listQuery: {
        page: 1,
        limit: 20
      },
      modalType: 1,
      dialogVisible: false,
    }
  },
  created() {
    
  },
  methods: {
    addGroup(){
      this.$router.push({
        path: '/group/organ/addGroup'
      })
    },
    struckGroup(){
      this.dialogVisible = true
    },
    closeModal(){
      this.dialogVisible = false
    },
    changeSearch(){},
    submitSearch(){},
    getList(){},
    onSub(type){

    },
    confirm(message, title, callback) {
      this.$confirm(message, title, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: async(action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            instance.confirmButtonText = '确定'
            await callback()
            instance.confirmButtonLoading = false
            done()
          } else {
            done()
          }
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
  .organTable{
    margin: 20px 0 0 14px;
  }
</style>