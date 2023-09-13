<template>
  <div class="app-container myMessage">
    <el-card>
      <el-tabs v-model="activeType" @tab-click="handleTab">
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
      <el-button
        type="primary"
        class="handleBtn"
        @click="handleCheck"
        :disabled="checkDisabled"
      >
        全部标记已读</el-button
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
        @selection-change="handleSelectionChange"
      >
      </basics-table>
    </el-card>
    <Detail ref="detail" :API="userIdAPI" />
  </div>
</template>

<script>
import { listAPI, hadReadAPI, userIdAPI } from "@/api/messageCenter/my";
import { columns, tableAction, searchList } from "./config";
import { tabList } from "@/views/messageCenter/components/config";
import Detail from "@/views/messageCenter/components/detail";
import dayjs from "dayjs";

export default {
  components: { Detail },
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
      activeType: "0",
      tabList,
      checkDisabled: true,
      userIdAPI,
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
      this.loading = true;
      const params = Object.assign(
        {},
        {
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit,
          type: this.activeType,
        },
        this.query
      );
      if (params.date) {
        params.queryByPubTime = {
          start: dayjs(params.date[0]).startOf("day").valueOf(),
          end: dayjs(params.date[1]).endOf("day").valueOf(),
        };
      }

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
    // 批量操作
    handleCheck() {
      hadReadAPI()
        .then((res) => {
          this.$message.success("操作成功");
        })
        .finally(() => this.getList());
    },
    reset() {
      this.listQuery.page = 1;
      this.total = 0;
      this.getList();
    },
    // table 勾选
    handleSelectionChange(val) {
      this.checkDisabled = !(val && val.length);
    },
    // tab change
    handleTab(val) {
      this.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.myMessage {
  .searchs {
    padding-top: 20px;
  }
}
</style>