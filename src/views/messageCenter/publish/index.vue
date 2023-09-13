<template>
  <div class="app-container publish">
    <el-card>
      <basics-search
        ref="searchs"
        class="searchs"
        :searchs="searchList"
        @submitSearch="submitSearch"
      />
      <el-button
        type="primary"
        icon="el-icon-plus"
        class="handleBtn"
        @click="add"
        ref="addBtn"
        >新增</el-button
      >
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
    </el-card>
    <Add ref="add" />
    <Detail ref="detail" :API="pubDetailAPI" detailType="pub" />
  </div>
</template>

<script>
import { listAPI, pubDetailAPI, pubEditAPI } from "@/api/messageCenter/publish";
import { columns, tableAction, searchList } from "./config";
import Add from "./components/add";
import Detail from "@/views/messageCenter/components/detail";

export default {
  components: { Add, Detail },
  data() {
    return {
      searchList,
      query: {},
      table: { stripe: true },
      list: [{ id: 2, status: 0 }],
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
        { label: "全部消息", name: "1" },
        { label: "集团通知", name: "2" },
        { label: "应用消息", name: "3" },
        { label: "系统消息", name: "4" },
      ],
      checkDisabled: true,
      pubDetailAPI,
    };
  },
  mounted() {
    const { add } = this.$route.params;
    // 工作台点击发布信息，跳转至本页面并打开新增
    if (add) {
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.add.open();
        }, 500);
      });
    }
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
      listAPI(params)
        .then((res) => {
          if (res.code === 200) {
            this.list = res.rows || [];
            this.total = res.total * 1 || 0;
          }
        })
        .finally(() => {
          this.loading = false;
        });

      setTimeout(() => {
        this.loading = false;
      }, 1000);
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
          this.$refs.detail.open(id);
          break;
        case "3":
          // 发布
          this.pub(id);
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
    pub(id) {
      this.$confirm("确定发布该消息吗？", "发布", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
      }).then(() => {
        pubEditAPI({ id, status: 1 }).then(() => {
          this.$message.success("发布成功");
          this.getList();
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>