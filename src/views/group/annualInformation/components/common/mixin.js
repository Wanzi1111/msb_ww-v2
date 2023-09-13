// import {
//   schoolListAPI,
//   schoolUpdateStatusAPI,
//   schoolBatchDelAnnualAPI,
//   schoolImportAPI,
//   schoolExportAPI,
// } from "@/api/group/annualInformation";
// import { columns, tableAction } from "./config";
import { searchList } from "@/views/group/annualInformation/config";
import moment from "moment";
import { createBlob } from "@/utils";
import { mapState } from "vuex";
import { remoteMethod } from "./index";

export default function myMixin(params) {
  console.log(params, "mixinparams");
  const {
    schoolListAPI,
    schoolUpdateStatusAPI,
    schoolBatchDelAnnualAPI,
    schoolImportAPI,
    schoolExportAPI,
    // columns,
    // tableAction,
  } = params;
  return {
    data() {
      return {
        searchList: searchList(remoteMethod, this),
        query: {},
        table: { stripe: true },
        list: [{ id: 2 }],
        // columns: columns,
        total: 0,
        listQuery: {
          page: 1,
          limit: 10,
        },
        // actionFunction: tableAction({ tableAction: this.tableAction }),
        loading: false,
        checkDisabled: true,
        checkList: [],
      };
    },
    computed: {
      ...mapState(["user"]),
    },
    activated() {
      console.log("activated");
      this.getList();
    },
    mounted() {
      //   this.getList();
      console.log(this.searchList, "searchList");

      console.log(this.showType, "cmountedType");
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
        // schoolListAPI(params)
        //   .then((res) => {
        //     if (res.code === 200) {
        //       this.list = res.rows || [];
        //       this.total = res.total * 1 || 0;
        //     }
        //   })
        //   .finally(() => {
        //     this.loading = false;
        //   });
        this.handleGetList(params);
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
            this.$router.push({
              path: "/group/addSchool",
              query: { id, type: this.showType },
            });
            break;
          case "2":
            // 查看
            this.$router.push({
              path: "/group/addSchool",
              query: { id, view: 1, type: this.showType },
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
        this.$router.push({
          path: "/group/addSchool",
          query: { type: this.showType },
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
          //   let params = {};
          //   if (Array.isArray(ids)) {
          //     params = { ids: ids.join() };
          //   } else {
          //     params = { ids };
          //   }
          //   console.log(ids, "ids");
          //   console.log(params, "params");
          //   schoolBatchDelAnnualAPI(params)
          //     .then(() => {
          //       this.$message.success("删除成功");
          //     })
          //     .finally(() => this.reset());
          this.handleDel(ids);
        });
      },
      // 提交
      schoolUpdateStatus(id, tip, title, status) {
        this.$confirm(tip, title, {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true,
        }).then(() => {
          //   let params = [];
          //   if (Array.isArray(id)) {
          //     params = id.map((i) => ({
          //       status,
          //       id: i,
          //       cid: this.user?.id,
          //     }));
          //   } else {
          //     params = [{ status, id, cid: this.user?.id }];
          //   }
          //   schoolUpdateStatusAPI(params)
          //     .then(() => {
          //       this.$message.success("操作成功");
          //     })
          //     .finally(() => this.reset());

          this.handleUpdateStatus(id, status);
        });
      },
      // 导出
      exportFile() {
        const loading = this.$loading({
          lock: true,
          text: "处理中...",
          spinner: "el-icon-loading",
          background: "rgba(255, 255, 255, 0.7)",
        });
        // schoolExportAPI()
        //   .then((res) => {
        //     loading.close();
        //     createBlob(`学校年度信息-${moment().format("YYYYMM")}.csv`, res);
        //     this.close();
        //     this.$parent.reset();
        //   })
        //   .catch(() => {
        //     loading.close();
        //   });
        this.handleExport(loading);
      },
      // 导入
      uploadBefore(file) {
        const fd = new FormData();
        fd.append("file", file.raw);
        // schoolImportAPI(fd).then((res) => {
        //   this.$message.success("导入成功");
        // });
        this.handleImport(fd);
      },
    },
  };
}
