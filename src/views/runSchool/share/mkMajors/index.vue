<template>
  <div class="app-container mkMajors">
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
        <template slot="type" slot-scope="scope">
          <dict-tag :options="dict.type.saas_professional_type" :value="scope.row.type | type"/>
        </template>
        <template slot="level" slot-scope="scope">
          <dict-tag :options="dict.type.saas_professional_group_level" :value="scope.row.level"/>
        </template>
      </basics-table>
    </el-card>
  </div>
</template>

<script>
import { columns, tableAction } from "./column/column";
import searchList from "./search/search";
import {
  getmkMajor,
  mkMajorGroup,
  updateMajorStatus,
  batchDelMajor,
  updateMajorGroupStatus,
  batchDelMajorGroup
} from "@/api/runSchool/share";
import { mapState } from "vuex";
import { remoteMethod } from "@/utils/commonExampleMethods"

export default {
  name: "mkMajors",
  components: {},
  data() {
    return {
      searchList: searchList(remoteMethod, this),
      query: {},
      table: { stripe: true },
      list: [{ id: 2 }],
      activeType: "1",
      columns: columns(this.activeType || "1"),
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      actionFunction: tableAction({ tableAction: this.tableAction }),
      loading: false,
      checkList: [],
      tabList: [
        { label: "共建专业", name: "1" },
        { label: "共建专业群", name: "2" },
      ],
    };
  },
  filters: {
    type(val) {
      return (val && val.split(",")) || [];
    },
  },
  dicts: ["saas_professional_group_level", "saas_professional_type"],
  mounted() {
    this.getList();
    this.init();
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    activeType(val, oldVal) {
      this.$nextTick(() => {
        this.$refs.searchs.set({
          type: "label",
          data: {
            name: val === "1" ? "专业名称" : "专业群名称",
          },
        });
        this.$refs.searchs.set({
          type: "visible",
          data: {
            type: val === "1",
            level: val === "2",
          },
        });
      });
      this.activeType = val;
      this.columns = columns(val,);
      this.getList();
    },
  },
  methods: {
    init() {
      this.$nextTick(() => {
        const { saas_professional_group_level, saas_professional_type } = this.dict.type;
        this.$refs.searchs.set({
          type: "options",
          data: {
            level: saas_professional_group_level,
            type: saas_professional_type,
          },
        });
      });
    },
    handleClick({ name }) {
      this.$nextTick(()=>{
        this.$refs.searchs.set({
          type: 'label',
          data: {
            name: name === '1' ? '专业名称': '专业群名称',
          }
        })
        this.$refs.searchs.set({
          type: 'visible',
          data: {
            type: name === '1',
            level: name === '2',
          }
        })
      })
      this.activeType = name
      this.columns = columns(name)
      this.getList();
    },
    getList() {
      const { activeType } = this;
      const apis = activeType === "1" ? getmkMajor : mkMajorGroup;
      this.loading = true;
      const params = this.addDateRange(
        {
          ...this.query,
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit,
        },
        this.query.citme
      );
      delete params.citme;
      apis(params)
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
      this.query = { ...val, type: val.type.join(",")};
      this.reset();
    },
    // 操作
    tableAction(type, row) {
      const {
        activeType,
        user: { id: cid },
      } = this;
      const { id } = row;
      switch (type) {
        case "edit":
        case "view":
          this.$router.push({
            path: "/runSchool/share/addmkMajors",
            query: { activeType, type, id },
          });
          break;
        case "remove":
          const delFn =
            activeType === "1" ? batchDelMajor : batchDelMajorGroup;
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
          const fn =
            activeType === "1" ? updateMajorStatus : updateMajorGroupStatus;
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
        path: "/runSchool/share/addmkMajors",
        query: { activeType },
      });
    },
    handleDelete() {
      const { activeType } = this;
      const ids = this.checkList.map((v) => v.id).toString();
      const delFn = activeType === "1" ? batchDelMajor : batchDelMajorGroup;
      this.$modal.confirm("确定批量删除该活动信息么？").then(() => {
        delFn({ ids }).then(() => {
          this.$message.success("删除成功~");
          this.getList();
        });
      });
    },
    handleCheck() {
      const {
        activeType,
        user: { id: cid },
      } = this;
      const fn =
        activeType === "1" ? updateMajorStatus : updateMajorGroupStatus;
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
.mkMajors {
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