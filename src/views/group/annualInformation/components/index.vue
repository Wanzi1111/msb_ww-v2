<template>
  <div class="school">
    <basics-search
      ref="searchs"
      class="searchs"
      :searchs="searchList"
      @submitSearch="submitSearch"
    />
    <div class="handleBtn">
      <el-button type="primary" icon="el-icon-plus" @click="add">
        新增</el-button
      >
      <el-button
        type="danger"
        icon="el-icon-delete"
        @click="del(checkList)"
        :disabled="checkDisabled"
      >
        批量删除</el-button
      >
      <el-upload
        action=""
        :on-change="uploadBefore"
        :show-file-list="false"
        accept=".xls,.xlsx,.csv"
        :auto-upload="false"
        class="upload"
      >
        <el-button type="primary" icon="el-icon-folder-add">导入</el-button>
      </el-upload>
      <el-button type="primary" icon="el-icon-download" @click="exportFile">
        导出</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-s-promotion"
        @click="handleCheck(checkList)"
        :disabled="checkDisabled"
        v-if="user.department_demo == 2"
      >
        提交</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-s-promotion"
        @click="handleCheck(checkList, 1)"
        :disabled="checkDisabled"
        v-if="user.department_demo != 2"
      >
        审核通过</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-s-promotion"
        @click="handleCheck(checkList, 2)"
        :disabled="checkDisabled"
        v-if="user.department_demo != 2"
      >
        审核未通过</el-button
      >
    </div>
    <basics-table
      ref="table"
      :table="table"
      :list="list"
      :get-list="getList"
      :columns="columns"
      :total="total"
      :list-query="listQuery"
      :action-function="actionFunction"
      :loading="loading"
      @selection-change="handleSelectionChange"
    >
    </basics-table>
  </div>
</template>

<script>
import {
  schoolListAPI,
  schoolUpdateStatusAPI,
  schoolBatchDelAnnualAPI,
  schoolImportAPI,
  schoolExportAPI,
  enterpriseListInfoAPI,
  enterpriseListForAdminAPI,
  enterpriseBatchCommitAPI,
  enterpriseImportAPI,
  enterpriseDelAPI,
  enterpriseInformationExportAPI,
  enterpriseExportForAdminAPI,
  enterpriseReviewAPI,
} from "@/api/group/annualInformation";
// import { columns as c1 } from "./enterprise/config";
// import { columns as c2, tableAction } from "./school/config";

import {
  school_columns as c2,
  enterprise_columns as c1,
  tableAction,
} from "./config";
import myMixin from "./common/mixin";

const mixin = new myMixin({
  // schoolListAPI,
  // schoolUpdateStatusAPI,
  // schoolBatchDelAnnualAPI,
  // schoolImportAPI,
  // schoolExportAPI,
});

// console.log(this, "showTYpe");

export default {
  props: {
    showType: {
      type: String,
      default: "1",
    },
  },
  mixins: [mixin],
  watch: {
    showType: {
      handler(val) {
        console.log(val, "wtahc");
        this.columns = val === "1" ? c1 : c2;
        this.isSchool = val === "2";
        this.reset();
      },
      immediate: true,
    },
    user: {
      handler(val) {
        console.log(val, "val");
        this.isAdmin = val?.department_demo != 2;
      },
      deep: true,
      immediate: true,
    },
  },
  data() {
    return {
      columns: this.showType === "1" ? c1 : c2,
      actionFunction: tableAction({ tableAction: this.tableAction }),
      isAdmin: false, // 是否是秘书处
      isSchool: false, // 是否是学校
    };
  },
  created() {
    console.log(this.isAdmin, "isAdmin");
  },
  methods: {
    // 列表
    handleGetList(params) {
      console.log(this.isAdmin, "handlgetlist");
      let API = this.isSchool
        ? schoolListAPI
        : this.user?.department_demo != 2
        ? enterpriseListForAdminAPI
        : enterpriseListInfoAPI;
      API(params)
        .then((res) => {
          if (res.code === 200) {
            this.list = res.rows || [];
            this.total = res.total * 1 || 0;
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 提交/审核
    handleUpdateStatus(id, status) {
      let params = null,
        API;
      if (this.isSchool) {
        if (Array.isArray(id)) {
          params = id.map((i) => ({
            status,
            id: i,
            cid: this.user?.id,
          }));
        } else {
          params = [{ status, id, cid: this.user?.id }];
        }
        API = this.isAdmin ? enterpriseReviewAPI : schoolUpdateStatusAPI;
      } else {
        params = {
          ids: Array.isArray(id) ? [...id] : [id],
          status,
        };
        API = enterpriseBatchCommitAPI;
      }
      API(params)
        .then(() => {
          this.$message.success("操作成功");
        })
        .finally(() => this.getList());
    },
    // 删除
    handleDel(ids) {
      let params = null;
      let API = this.isSchool ? schoolBatchDelAnnualAPI : enterpriseDelAPI;
      if (Array.isArray(ids)) {
        params = this.isSchool ? { ids: ids.join() } : ids.join();
      } else {
        params = this.isSchool ? { ids } : ids;
      }
      console.log(ids, "ids");
      console.log(params, "params");
      API(params)
        .then(() => {
          this.$message.success("删除成功");
        })
        .finally(() => this.reset());
    },
    // 导入
    handleImport(fd) {
      let API = this.isSchool ? schoolImportAPI : enterpriseImportAPI;
      API(fd).then((res) => {
        this.$message.success("导入成功");
      });
    },
    // 导出
    handleExport(loading) {
      let API = this.isSchool
        ? schoolExportAPI
        : this.user?.department_demo != 2
        ? enterpriseExportForAdminAPI
        : enterpriseInformationExportAPI;
      API()
        .then((res) => {
          loading.close();
          createBlob(
            `${this.isSchool ? "学校" : "企业"}年度信息-${moment().format(
              "YYYYMM"
            )}.csv`,
            res
          );
          this.close();
          this.$parent.reset();
        })
        .catch(() => {
          loading.close();
        });
    },
    // 企业审核
    hendleEnterpriseReview(id, status) {
      const params = {
        ids: Array.isArray(id) ? [...id] : [id],
        status,
      };
      enterpriseReviewAPI(params)
        .then(() => {
          this.$message.success("操作成功");
        })
        .finally(() => this.reset());
    },
  },
};
</script>

<style lang="scss" scoped>
.school {
  .handleBtn {
    display: flex;
    .upload {
      margin: 0 10px;
    }
  }
}
</style>