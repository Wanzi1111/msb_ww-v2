<template>
  <div>
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
      <el-button type="danger" icon="el-icon-delete" @click="add">
        批量删除</el-button
      >
      <el-button
        type="primary"
        icon="el-icon-s-promotion"
        @click="handleCheck"
        :disabled="checkDisabled"
      >
        提交</el-button
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
import { columns, tableAction } from "./config";
import { searchList } from "@/views/group/annualInformation/config";

export default {
  components: {},
  data() {
    return {
      searchList:searchList(),
      query: {},
      table: { stripe: true },
      list: [{ id: 2 }],
      columns: columns,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      actionFunction: tableAction({ tableAction: this.tableAction }),
      loading: false,
      activeType: "1",
      tabList: [
        { label: "企业年度信息", name: "1" },
        { label: "学校年度信息", name: "2" },
      ],
      checkDisabled: true,
    };
  },
  created() {
    const { type } = this.$route.params;
    type && (this.activeType = type);
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      //   this.loading = true;
      const params = Object.assign(
        {},
        {
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit,
          type: this.activeType,
        },
        this.query
      );
      console.log(params, "param");
      //   workbenchListAPI(params)
      //     .then((res) => {
      //       if (res.code === 200) {
      //         this.list = res.rows || [];
      //         this.total = res.total * 1 || 0;
      //       }
      //     })
      //     .finally(() => {
      //       this.loading = false;
      //     });
    },

    submitSearch(val) {
      this.query = { ...val };
      this.reset();
    },
    // 操作
    tableAction(dat, row, index, name) {
      const { id } = row;
      switch (name) {
        case "1":
          // 查看
          this.$refs.detail.open(id);
          break;
      }
    },
    add() {},
    handleCheck() {},
    reset() {
      this.listQuery.page = 1;
      this.total = 0;
      this.getList();
    },
    handleSelectionChange(val) {
      this.checkDisabled = !(val && val.length);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>