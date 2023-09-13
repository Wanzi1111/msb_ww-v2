<template>
  <div class="app-container addAffect">
    <el-card>
      <basics-search
        ref="searchs"
        class="searchs"
        :key="searchKey"
        :searchs="searchList"
        @submitSearch="submitSearch"
      />
      <div class="handleBtn">
        <el-button type="primary" icon="el-icon-plus" @click="handleAdd">
          新增</el-button
        >
        <el-button
          type="danger"
          :disabled="!checkList.length"
          icon="el-icon-delete"
          @click="handleDelete"
        >
          批量删除</el-button
        >
        <!-- <el-upload
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
        > -->
        <el-button
          type="primary"
          icon="el-icon-s-promotion"
          @click="handleCheck(1)"
          :disabled="!checkList.length"
          v-if="user.department_demo === 2"
        >
          提交</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-s-promotion"
          @click="handleCheck(2)"
          :disabled="!checkList.length"
          v-if="user.department_demo === 1"
        >
          审核通过</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-s-promotion"
          @click="handleCheck(3)"
          :disabled="!checkList.length"
          v-if="user.department_demo === 1"
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
    </el-card>
  </div>
</template>
<script>
import { mapState } from "vuex";
import {
  getVerifyList,
  batchDelVerify,
  importVerify,
  updateVerifyStatus,
} from "@/api/runSchool/skill";
import { remoteMethod } from "@/utils/commonExampleMethods"
import { columns, tableAction } from "./column/column";
import searchList from "./search/search";

export default {
  name: "Skill",
  data() {
    return {
      pageType: 'skill',
      searchList: searchList(remoteMethod, this),
      table: { stripe: true },
      list: [],
      columns,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      searchQuery: {},
      searchKey: 0,
      actionFunction: tableAction({ tableAction: this.tableAction }),
      loading: false,
      checkList: [],
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    getList() {
      this.loading = true;
      const params = {
        ...this.searchQuery,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit,
      };
      getVerifyList(params)
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
      this.searchQuery = {
        ...val,
        companyId: val.companyId?.value || undefined,
      };
      this.reset();
    },
    // 操作
    tableAction(type, row) {
      const {
        user: { id: cid },
      } = this;
      const { id } = row;
      switch (type) {
        case "edit":
        case "view":
          this.$router.push({
            path: "/runSchool/addStudyResult",
            query: { pageType: this.pageType, type, id },
          });
          break;
        case "del":
          this.$modal.confirm("确定删除该信息么？").then(() => {
            batchDelVerify({ ids: id }).then(() => {
              this.$message.success("删除成功~");
              this.getList();
            });
          });
          break;
        case "submit":
        case "pass":
        case "reject":
          const statusMap = {
            submit: 1,
            pass: 2,
            reject: 3,
          };
          this.$confirm("确定提交么？", "提示", { type: "warning" }).then(
            () => {
              updateVerifyStatus([{ cid, id, status: statusMap[type] }]).then(
                () => {
                  this.$message.success("操作成功~");
                  this.getList();
                }
              );
            }
          );
          break;
      }
    },
    handleAdd() {
      this.$router.push({
        path: "/runSchool/addStudyResult",
        query: { pageType: this.pageType },
      });
    },
    handleDelete() {
      const ids = this.checkList.map((v) => v.id).toString();
      this.$modal.confirm("确定批量删除该活动信息么？").then(() => {
        batchDelVerify({ ids }).then(() => {
          this.$message.success("删除成功~");
          this.getList();
        });
      });
    },
    handleCheck(status) {
      const {
        user: { id: cid },
      } = this;
      const payload = this.checkList.map((v) => ({ id: v.id, cid, status }));
      this.$confirm("确定批量操作么？", "提示", { type: "warning" }).then(
        () => {
          updateVerifyStatus(payload).then(() => {
            this.$message.success("操作成功~");
            this.getList();
          });
        }
      );
    },
    reset() {
      this.listQuery.page = 1;
      this.total = 0;
      this.getList();
    },
    handleSelectionChange(vals) {
      this.checkList = vals;
    },
    // 导出
    handleExport() {
      const loading = this.$loading({
        lock: true,
        text: "处理中...",
        spinner: "el-icon-loading",
        background: "rgba(255, 255, 255, 0.7)",
      });
      this.download(
        '/v1/achievement/exportVerify',
        {},
        `技能鉴定_${new Date().getTime()}.xlsx`
      ).then(() => loading.close());
    },
    // 导入
    uploadBefore(file) {
      const fd = new FormData();
      fd.append("file", file.raw);
      importVerify(fd).then((res) => {
        this.$message.success("导入成功");
        this.getList();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.addAffect {
  ::v-deep .searchs {
    padding-top: 20px;
  }
  .handleBtn {
    display: flex;
    .upload {
      margin: 0 10px;
    }
  }
}
</style>
