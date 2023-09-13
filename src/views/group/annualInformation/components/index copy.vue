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
      <el-button type="primary" icon="el-icon-download" @click="handleExport">
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
} from "@/api/group/annualInformation";
import { columns as c1, tableAction as t1 } from "./enterprise/config";
import { columns as c2, tableAction as t2 } from "./school/config";
import { searchList } from "@/views/group/annualInformation/config";
import moment from "moment";
import { createBlob } from "@/utils";
import { mapState } from "vuex";
import { remoteMethod } from "./common";

const schoolAPI = {
  ListAPI: schoolListAPI,
  UpdateStatusAPI: schoolUpdateStatusAPI,
  BatchDelAnnualAPI: schoolBatchDelAnnualAPI,
  ImportAPI: schoolImportAPI,
  ExportAPI: schoolExportAPI,
};

const enterprise = {
  ListAPI: enterpriseListInfoAPI,
  UpdateStatusAPI: schoolUpdateStatusAPI,
  BatchDelAnnualAPI: schoolBatchDelAnnualAPI,
  ImportAPI: schoolImportAPI,
  ExportAPI: schoolExportAPI,
};

export default {
  props: {
    showType: {
      type: String,
      default: "1",
    },
  },
  watch: {
    showType: {
      handler(val) {
        console.log(val, "wtahc");
        this.columns = val === "1" ? c1 : c2;
        this.API = val === "1" ? { ...schoolAPI } : { ...enterprise };
        if (this.user.department_demo != 2) {
          // 非成员单位，使用不同接口
          this.API.ListAPI=enterpriseListForAdminAPI
        }
        this.reset();
      },
      immediate: true,
    },
  },
  data() {
    return {
      searchList: searchList(remoteMethod, this),
      query: {},
      table: { stripe: true },
      list: [],
      columns: this.showType === "1" ? c1 : c2,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      actionFunction: t1({ tableAction: this.tableAction }),

      loading: false,
      checkDisabled: true,
      checkList: [],
      API: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  activated() {
    this.getList();
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      const params = Object.assign(
        {},
        {
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit,
        },
        this.query
      );
      console.log(params, "param");
      this.API?.ListAPI(params)
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
    submitSearch(val) {
      this.query = { ...val };
      if (val?.companyId) {
        this.query.companyId = val.companyId.value;
      }
      console.log(val, "avl");
      this.reset();
    },
    // 操作
    tableAction(dat, row, index, name) {
      const { id } = row;
      switch (name) {
        case "1":
          // 编辑
          this.$router.push({ path: "/group/addSchool", query: { id } });
          break;
        case "2":
          // 查看
          this.$router.push({
            path: "/group/addSchool",
            query: { id, view: 1 },
          });
          break;
        case "3":
          // 删除
          this.del(id);
          break;
        case "4":
          // 提交
          this.handleCheck(id);
          break;
        case "5":
          // 审核通过
          this.handleCheck(id, 1);
          break;
        case "6":
          // 审核未通过
          this.handleCheck(id, 2);
          break;
      }
    },
    add() {
      this.$router.push({ path: "/group/addSchool" });
    },
    // 提交/审核
    handleCheck(id, type = null) {
      // type值 null:提交 ； 1:审核通过 ； 2:审核未通过
      let tip, title, status;
      switch (type) {
        case null:
          tip = "确定要提交选中的数据吗？";
          title = "提交";
          status = 1;
          break;
        case 1:
          tip = "确定审核通过选中的数据？";
          title = "审核通过";
          status = 3;
          break;
        case 2:
          tip = "确定审核不通过选中的数据？";
          title = "审核未通过";
          status = 2;
          break;
      }
      this.schoolUpdateStatus(id, tip, title, status);
    },
    reset() {
      this.listQuery.page = 1;
      this.total = 0;
      this.getList();
    },
    // table check
    handleSelectionChange(val) {
      this.checkDisabled = !(val && val.length);
      this.checkList = val?.map((i) => i.id);
      console.log(this.checkList, "this.checkList");
    },
    del(ids) {
      this.$confirm("是否确认删除", "删除", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      }).then(() => {
        let params = {};
        if (Array.isArray(ids)) {
          params = { ids: ids.join() };
        } else {
          params = { ids };
        }
        console.log(ids, "ids");
        console.log(params, "params");
        schoolBatchDelAnnualAPI(params)
          .then(() => {
            this.$message.success("删除成功");
          })
          .finally(() => this.reset());
      });
    },
    // 提交
    schoolUpdateStatus(id, tip, title, status) {
      this.$confirm(tip, title, {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      }).then(() => {
        let params = [];
        if (Array.isArray(id)) {
          params = id.map((i) => ({
            status,
            id: i,
            cid: this.user?.id,
          }));
        } else {
          params = [{ status, id, cid: this.user?.id }];
        }
        schoolUpdateStatusAPI(params)
          .then(() => {
            this.$message.success("操作成功");
          })
          .finally(() => this.reset());
      });
    },
    // 导出
    handleExport() {
      const loading = this.$loading({
        lock: true,
        text: "处理中...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)",
      });
      schoolExportAPI()
        .then((res) => {
          loading.close();
          createBlob(`学校年度信息-${moment().format("YYYYMM")}.csv`, res);
          this.close();
          this.$parent.reset();
        })
        .catch(() => {
          loading.close();
        });
    },
    // 导入
    uploadBefore(file) {
      const fd = new FormData();
      fd.append("file", file.raw);
      schoolImportAPI(fd).then((res) => {
        this.$message.success("导入成功");
      });
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