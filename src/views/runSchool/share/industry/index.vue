 <template>
  <div class="app-container industry">
    <el-card>
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
        >
          提交</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-s-promotion"
          @click="handleCheck(2)"
          :disabled="!checkList.length"
        >
          审核通过</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-s-promotion"
          @click="handleCheck(3)"
          :disabled="!checkList.length"
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
  getAcademyList, 
  batchDelAcademy,
  updateAcademyStatus,
   } from "@/api/runSchool/share";
import { remoteMethod } from "@/utils/commonExampleMethods"
import { mapState } from "vuex";

export default {
  name: "Industry",
  components: {},
  data() {
    return {
      searchList: searchList(remoteMethod, this),
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
      const params = this.addDateRange(
        {
          ...this.query,
          pageNum: this.listQuery.page,
          pageSize: this.listQuery.limit,
        },
        this.query.citme
      );
      delete params.citme;
      getAcademyList(params)
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
        user: { id: cid },
      } = this;
      const { id } = row;
      switch (type) {
        case "edit":
        case "view":
          // 查看
          this.$router.push({
            path: "/runSchool/share/addIndustry",
            query: { type, id },
          });
          break;
        case "remove":
          this.$modal.confirm("确定删除该活动信息么？").then(() => {
            batchDelAcademy({ ids: id }).then(() => {
              this.$message.success("删除成功");
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
          this.$confirm("确定提交么？", "提示", { type: "warning" }).then(
            () => {
              updateAcademyStatus([{ cid, id, status: statusMap[type] }]).then(
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
      this.$router.push({ path: "/runSchool/share/addIndustry" });
    },
    handleDelete() {
      const ids = this.checkList.map((v) => v.id).toString();
      this.$modal.confirm("确定批量删除该活动信息么？").then(() => {
        batchDelAcademy({ ids }).then(() => {
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
          updateAcademyStatus(payload).then(() => {
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
.industry {
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