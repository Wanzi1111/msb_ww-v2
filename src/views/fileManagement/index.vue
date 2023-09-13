<template>
  <div class="app-container fileManagement">
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
          v-if="user.department_demo == 2 || user.department_demo == 3"
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
    </el-card>
    <Add ref="add" :createForms="createForms" />
  </div>
</template>

<script>
import { listAPI } from "@/api/fileManagement";
import {
  columns,
  tableAction,
  searchList,
  statusList_examine,
  statusList,
  createForms,
} from "./config";
import { createBlob } from "@/utils";
import { mapState } from "vuex";
import Add from "./components/add";

export default {
  name: "FileManagement",
  components: { Add },
  data() {
    return {
      loading: false,
      activeType: "1",
      tabList: [
        { label: "集团文件", name: "1" },
        { label: "机构文件", name: "2" },
        { label: "单位文件", name: "3" },
      ],
      table: { stripe: true },
      list: [],
      columns,
      searchList,
      total: 0,
      listQuery: {
        page: 1,
        limit: 10,
      },
      actionFunction: tableAction({ tableAction: this.tableAction }),
      checkDisabled: true,
      checkList: [],
      createForms,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    // this.getList();
    const { department_demo } = this.user;
    if (department_demo == 3) {
      this.tabList.shift();
      this.activeType = "2";
    } else if (department_demo == 2) {
      this.tabList = [this.tabList.pop()];
      this.activeType = "3";
      console.log(this.tabList);
    }
    this.setInit(this.activeType);
  },
  methods: {
    getList() {
      this.loading = true;
      const params = Object.assign(
        {},
        {
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit,
          deptLevel: this.activeType,
        },
        this.query
      );
      console.log(params, "param");
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
      if (val?.companyId) {
        this.query.companyId = val.companyId.value;
      }
      console.log(val, "avl");
      this.reset();
    },
    reset() {
      this.listQuery.page = 1;
      this.total = 0;
      this.getList();
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
      this.$refs.add.open();
    },
    del() {},
    // 导入
    uploadBefore(file) {
      const fd = new FormData();
      fd.append("file", file.raw);
      // schoolImportAPI(fd).then((res) => {
      //   this.$message.success("导入成功");
      // });
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
      this.updateStatus(id, tip, title, status);
    },
    // 提交
    updateStatus(id, tip, title, status) {
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
    // table check
    handleSelectionChange(val) {
      this.checkDisabled = !(val && val.length);
      this.checkList = val?.map((i) => i.id);
      console.log(this.checkList, "this.checkList");
    },
    // tab change
    handleTab() {
      // const { department_demo } = this.user;
      // let flag = false,
      //   tip = "",
      //   arr = [...statusList_examine];
      // switch (this.activeType) {
      //   case "1":
      //     break;
      //   case "2":
      //     flag = true;
      //     tip = "机构名称";
      //     department_demo == 3 && (arr = [...statusList]);
      //     break;
      //   case "3":
      //     flag = true;
      //     tip = "单位名称";
      //     department_demo == 3 && (arr = [...statusList_examine]);
      //     break;
      // }
      // // 更改不同tab下显示的字段
      // this.$refs.searchs.set({
      //   type: "visible",
      //   data: {
      //     status: flag,
      //     deptName: flag,
      //   },
      // });
      // this.$refs.searchs.set({
      //   type: "label",
      //   data: {
      //     deptName: tip + ":",
      //   },
      // });
      // this.$refs.searchs.set({
      //   type: "options",
      //   data: {
      //     status: arr,
      //   },
      // });

      // let temp = [...columns];
      // temp.some((i) => {
      //   if (i.prop === "deptName") {
      //     i.visible = flag;
      //     i.label = tip;
      //   }
      // });
      // this.columns = [...temp];
      // this.reset();
      this.setInit(this.activeType);
    },
    setInit(val) {
      const { department_demo } = this.user;
      let flag = false,
        tip = "",
        arr = [...statusList_examine];
      switch (val) {
        case "1":
          break;
        case "2":
          flag = true;
          tip = "机构名称";
          department_demo == 3 && (arr = [...statusList]);
          break;
        case "3":
          flag = true;
          tip = "单位名称";
          department_demo == 3 && (arr = [...statusList_examine]);
          break;
      }
      this.$nextTick(() => {
        // 更改不同tab下显示的字段
        this.$refs.searchs.set({
          type: "visible",
          data: {
            status: flag,
            deptName: flag,
          },
        });
        this.$refs.searchs.set({
          type: "label",
          data: {
            deptName: tip + ":",
          },
        });
        this.$refs.searchs.set({
          type: "options",
          data: {
            status: arr,
          },
        });

        let temp = [...columns];
        temp.some((i) => {
          if (i.prop === "deptName") {
            i.visible = flag;
            i.label = tip;
          }
        });
        this.columns = [...temp];

        // 调整新增里的字段
        let visible = flag;
        if (visible) {
          this.activeType == 2 && department_demo == 3 && (visible = false);
          this.activeType == 3 && department_demo == 2 && (visible = false);
        }
        this.createForms[0].visible = visible;
        this.createForms[0].label = tip;
      });
      this.reset();
    },
  },
};
</script>

<style lang="scss" scoped>
.fileManagement {
  .searchs {
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