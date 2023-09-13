<template>
  <div class="provide" v-loading="loading">
    <div class="box" v-for="(item, index) in Object.keys(obj)" :key="item">
      <el-divider v-if="index != 0"></el-divider>
      <div class="title">{{ obj[item] }}</div>
      <div class="content" v-for="(i, index) in all[item]" :key="index">
        <Form
          :list="createForms[item]"
          class="form"
          :API="allAPI[item]['saveAPI']"
          :info="i"
          @refresh="refresh(item)"
          :addType="item"
        />
        <div class="del">
          <el-button @click="del(index, i, item)" icon="el-icon-delete"
            >删除</el-button
          >
          <el-divider></el-divider>
        </div>
      </div>
      <div class="addBtn">
        <el-button @click="add(item)" icon="el-icon-plus" type="primary">
          新增</el-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import {
  addOrUpdateTeacherAPI,
  getTeacherListAPI,
  delTeacherInfoAPI,
  addMaterialAPI,
  delMaterialInfoAPI,
  getMaterialListAPI,
} from "@/api/group/cooperate";
import Form from "./form";
import { createForms_1, createForms_2 } from "./config";
import { mapState } from "vuex";

export default {
  components: { Form },
  data() {
    return {
      loading: false,
      createForms: {
        teacher: createForms_1,
        subject: createForms_2,
        material: createForms_2,
      },
      all: {
        teacher: [{}],
        subject: [{}],
        material: [{}],
      },
      allAPI: {
        teacher: {
          saveAPI: addOrUpdateTeacherAPI,
        },
        subject: {
          saveAPI: addMaterialAPI,
        },
        material: {
          saveAPI: addMaterialAPI,
        },
      },
      list: [
        { label: "师资", value: "teacher" },
        { label: "课程", value: "subject" },
        { label: "教材", value: "material" },
      ],
      obj: {
        teacher: "师资",
        subject: "课程",
        material: "教材",
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.getTeacherList();
      this.getMaterialList(1);
      this.getMaterialList(2);
    },
    del(index, item, type) {
      if (!item?.id) {
        this.all[type].splice(index, 1);
      } else {
        let API, flag;
        switch (type) {
          case "teacher":
            API = delTeacherInfoAPI;
            break;
          default:
            API = delMaterialInfoAPI;
            flag = true;
        }

        API({ id: item.id }).then(() => {
          this.$message.success("删除成功");
          //   if (flag) {
          //     this.getMaterialList(type === "subject" ? 1 : 2);
          //   } else {
          //     this.getTeacherList();
          //   }
          this.all[type].splice(index, 1);
        });
      }
    },
    add(type) {
      this.all[type].push({});
      console.log(this.all);
    },
    refresh(type) {
      console.log(type, "type");
      switch (type) {
        case "teacher":
          this.getTeacherList();
          break;
        default:
          this.getMaterialList(type === "subject" ? 1 : 2);
      }
    },
    // 获取 教资 列表
    getTeacherList() {
      this.loading = true;
      getTeacherListAPI({ systemCode: this.user.systemCode })
        .then((res) => {
          this.all.teacher = res.payload || [{}];
        })
        .finally(() => (this.loading = false));
    },
    // 获取 课程/教材 列表
    getMaterialList(type) {
      getMaterialListAPI({ systemCode: this.user.systemCode, type }).then(
        (res) => {
          this.all[type == 1 ? "subject" : "material"] = res.payload || [{}];
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.provide {
  .box {
    padding-bottom: 50px;
    .title {
      padding-left: 8px;
      border-left: 2px solid rgb(64, 158, 255);
      font-size: 22px;
    }
    .content {
      padding: 30px;
      ::v-deep .form {
        .el-form-item__content {
          width: 100%;
        }
      }
    }
    .del {
      text-align: right;
    }
    .addBtn {
      padding-left: 30px;
    }
  }
}
</style>