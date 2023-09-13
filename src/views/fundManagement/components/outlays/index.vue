<template>
  <div class="app-container fundManagement">
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
    >
    </basics-table>
    <Add ref="add" />
    <Detail ref="detail" />
  </div>
</template>

<script>
import { columns, tableAction, searchList } from "./config";
import Add from "./components/add";
import Detail from "../detail.vue";

export default {
  name: "Outlay",
  components: { Add, Detail },
  data() {
    return {
      searchList,
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
        { label: "集团收入", name: "1" },
        { label: "集团支出", name: "2" },
      ],
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
          // 编辑
          this.$refs.add.open(id);
          break;
        case "2":
          // 查看
          this.$refs.detail.open(id, 2);
          break;
      }
    },
    add() {
      this.$refs.add.open();
    },
    reset() {
      this.listQuery.page = 1;
      this.total = 0;
      this.getList();
    },
  },
};
</script>

<style lang="scss" scoped>
.fundManagement {
  .searchs {
    padding-top: 20px;
  }
}
</style>