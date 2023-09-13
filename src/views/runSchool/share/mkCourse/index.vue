<template>
  <div class="app-container mkCourse">
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
        <el-button type="danger" icon="el-icon-delete" @click="handleDelete">
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
        <template slot="type" slot-scope="scope">
          <dict-tag :options="dict.type.saas_lesson_type" :value="scope.row.type"/>
        </template>
        <template slot="level" slot-scope="scope">
          <dict-tag :options="dict.type.saas_course_level" :value="scope.row.level"/>
        </template>
      </basics-table>
    </el-card>
  </div>
</template>

<script>
import { columns, tableAction } from "./column/column";
import searchList from "./search/search";
import { mkCourse, updateCourseStatus, batchDelCourse } from "@/api/runSchool/share";
import { mapState } from "vuex";
import { remoteMethod } from "@/utils/commonExampleMethods"
export default {
  name: "mkCourse",
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
    this.init()
  },
  dicts: [
    'saas_lesson_type',
    'saas_course_level',
    'saas_award_level'
    ],
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    init(){
      this.$nextTick(()=>{
        const { saas_lesson_type, saas_course_level, saas_award_level } = this.dict.type;
          this.$refs.searchs.set({
            type: 'options',
            data: {
            type: saas_lesson_type,
            level: saas_course_level,
            awardType: saas_award_level
            }
          })
      })  
    },
    getList() {
      this.loading = true;
      const params = this.addDateRange({
        ...this.query,
        pageNum: this.listQuery.page,
        pageSize: this.listQuery.limit,
      },this.query.citme);
      delete params.citme
      mkCourse(params)
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
            path: "/runSchool/share/addmkCourse",
            query: { type, id },
          });
          break;
        case "remove":
          this.$modal.confirm("确定删除该活动信息么？").then(() => {
            batchDelCourse({ ids: id }).then(() => {
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
              updateCourseStatus([{ cid, id, status: statusMap[type] }]).then(
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
      this.$router.push({ path: "/runSchool/share/addmkCourse" });
    },
    handleDelete() {
      const ids = this.checkList.map((v) => v.id).toString();
      this.$modal.confirm("确定批量删除该活动信息么？").then(() => {
        batchDelCourse({ ids }).then(() => {
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
          updateCourseStatus(payload).then(() => {
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
.mkCourse {
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