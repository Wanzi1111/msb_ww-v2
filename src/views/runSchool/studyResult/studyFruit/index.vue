<template>
  <div class="app-container addAffect">
    <el-card>
      <el-tabs v-model="activeType" @tab-click="handleClick">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="item.label"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
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
  getPublishList,
  getAchievementList,
  batchDelPublish,
  batchDelAchievement,
  importPublish,
  importAchievement,
  updatePublishStatus,
  updateAchievementStatus,
} from "@/api/runSchool/studyFruit";
import { remoteMethod } from "@/utils/commonExampleMethods"
import { columns, tableAction } from "./column/column";
import searchList from "./search/search";

export default {
  name: "StudyFruit",
  data() {
    return {
      searchList: searchList(remoteMethod, this, this.activeType || '1'),
      table: { stripe: true },
      list: [],
      activeType: "1",
      columns: columns(this.activeType || "1"),
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
      activeType: "1",
      tabList: [
        { label: "发表成果", name: "1" },
        { label: "获奖成果", name: "2" },
      ],
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapState(["user"]),
    pageType() {
      return this.activeType  === '1' ? 'publish' : 'achievement'
    }
  },
  methods: {
    handleClick({ name }) {
      this.searchList = searchList(remoteMethod, this, name);
      this.searchKey++
      this.searchQuery = {}
      this.columns = columns(name);
      this.getList()
    },
    getList() {
      this.loading = true;
      const { activeType } = this;
      const params = {
        ...this.searchQuery,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit,
      };
      const listFn = activeType === '1' ? getPublishList : getAchievementList
      listFn(params)
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
        activeType,
        pageType,
        user: { id: cid },
      } = this;
      const { id } = row;
      switch (type) {
        case "edit":
        case "view":
          this.$router.push({
            path: "/runSchool/addStudyResult",
            query: { pageType, type, id },
          });
          break;
        case "del":
          const delFn =
            activeType === "1" ? batchDelPublish : batchDelAchievement;
          this.$modal.confirm("确定删除该活动信息么？").then(() => {
            delFn({ ids: id }).then(() => {
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
          const fn =
            activeType === "1" ? updatePublishStatus : updateAchievementStatus;
          this.$confirm("确定提交么？", "提示", { type: "warning" }).then(
            () => {
              fn([{ cid, id, status: statusMap[type] }]).then(
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
      const { activeType } = this;
      const ids = this.checkList.map((v) => v.id).toString();
      const delFn = activeType === "1" ? batchDelPublish : batchDelAchievement;
      this.$modal.confirm("确定批量删除该活动信息么？").then(() => {
        delFn({ ids }).then(() => {
          this.$message.success("删除成功~");
          this.getList();
        });
      });
    },
    handleCheck(status) {
      const {
        activeType,
        user: { id: cid },
      } = this;
      const fn =
        activeType === "1" ? updatePublishStatus : updateAchievementStatus;
      const payload = this.checkList.map((v) => ({ id: v.id, cid, status }));
      this.$confirm("确定批量操作么？", "提示", { type: "warning" }).then(
        () => {
          fn(payload).then(() => {
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
      const exportApi =
        this.activeType === "1"
          ? "/v1/achievement/exportPublish"
          : "/v1/achievement/exportAchievement";
      this.download(
        exportApi,
        {},
        `研究成果_${new Date().getTime()}.xlsx`
      ).then(() => loading.close());
    },
    // 导入
    uploadBefore(file) {
      const importFn =
        this.activeType === "1" ? importPublish : importAchievement;
      const fd = new FormData();
      fd.append("file", file.raw);
      importFn(fd).then((res) => {
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
