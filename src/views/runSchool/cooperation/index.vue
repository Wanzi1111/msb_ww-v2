<template>
  <div class="app-container cooperation">
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
import { columns, tableAction } from "./column/column";
import searchList from "./search/search";
import {
  getOrderClass,
  getApprentice,
  getEducation,
  getCultivate,
  batchDelOrderClass,
  batchDelModernApprentice,
  batchDelEnterpriseApprentice,
  batchDelCultivate,
  updateOrderClassStatus,
  updateModernApprenticeStatus,
  updateEnterpriseApprenticeStatus,
  updateCultivateStatus,
} from "@/api/runSchool/cooperation";
import { mapState } from "vuex";
import { remoteMethod } from "@/utils/commonExampleMethods"

export default {
  name: "cooperation",
  data() {
    return {
      searchList: searchList(this.activeType || "1", remoteMethod, this),
      query: {},
      table: { stripe: true },
      list: [],
      columns: columns(this.activeType || "1"),
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      searchKey: 0,
      actionFunction: tableAction({ tableAction: this.tableAction }),
      loading: false,
      checkList: [],
      activeType: "1",
      tabList: [
        { label: "订单班", name: "1" },
        { label: "现代学徒制", name: "2" },
        { label: "企业新型学徒制", name: "3" },
        { label: "士官生培养", name: "4" },
      ],
      delObj: {
        1: batchDelOrderClass,
        2: batchDelModernApprentice,
        3: batchDelEnterpriseApprentice,
        4: batchDelCultivate,
      },
      updObj: {
        1: updateOrderClassStatus,
        2: updateModernApprenticeStatus,
        3: updateEnterpriseApprenticeStatus,
        4: updateCultivateStatus,
      }
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    handleClick({ name }) {
      this.searchList = searchList(name, remoteMethod, this);
      this.searchKey++
      this.query = {}
      this.columns = columns(name);
      this.getList()
    },
    getList() {
      this.loading = true;
      const { activeType } = this;
      const apis = {
        1: getOrderClass,
        2: getApprentice,
        3: getEducation,
        4: getCultivate,
      }
      const params = {
          ...this.query,
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit,
        }
      apis[activeType](params)
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
      this.reset();
    },
    // 操作
    tableAction(type, row) {
      const {
        activeType,
        delObj,
        updObj,
        user: { id: cid },
      } = this;
      const { id } = row;
      switch (type) {
        case "edit":
        case "view":
          this.$router.push({
            path: "/runSchool/addClass",
            query: { activeType, type, id },
          });
          break;
        case "remove":
          const delFn = delObj[activeType]
          this.$modal.confirm("确定删除该活动信息么？").then(() => {
            delFn({ ids: id }).then(() => {
              this.$message.success("删除成功~");
              this.getList();
            });
          });
          break;
        case "submit":
        case "pass":
        case "notPass":
          const statusMap = {
            submit: 1,
            pass: 2,
            notPass: 3,
          };
          const fn = updObj[activeType]
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
      const { activeType } = this;
      this.$router.push({
        path: "/runSchool/addClass",
        query: { activeType },
      });
    },
    handleDelete() {
      const { activeType, delObj } = this;
      const ids = this.checkList.map((v) => v.id).toString();
      const delFn = delObj[activeType]
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
        updObj,
        user: { id: cid },
      } = this;
      const fn = updObj[activeType]
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
  },
};
</script>
<style lang="scss" scoped>
.cooperation {
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
