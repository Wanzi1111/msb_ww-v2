<template>
  <div>
    <el-form
      :model="form"
      labelPosition="right"
      labelWidth="124px"
      ref="form"
      v-loading="loading"
    >
      <div class="first">
        <div class="box" v-for="i in forms" :key="i.title">
          <h3>{{ i.title }}</h3>
          <el-form-item
            :label="n.label + ':'"
            :prop="n.prop"
            v-for="n in i.children"
            :key="n.prop"
            :rules="handleRule(i.title, n)"
          >
            <el-select
              v-if="n.type === 'select'"
              v-model="form[n.prop]"
              v-bind="n.attr"
              :placeholder="handlePlaceholder(i.title, n)"
              :remoteMethod="remoteMethod"
            >
              <el-option
                v-for="item in n.options || handleOptions(n)"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <el-input
              v-else
              :placeholder="handlePlaceholder(i.title, n)"
              v-model="form[n.prop]"
              :disabled="!n.type"
            ></el-input>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <div class="footerBtn">
      <el-button @click="next(-1)">上一步</el-button>
      <el-button type="primary" @click="save" :loading="loadingBtn"
        >保存</el-button
      >
      <el-button @click="next(1)">下一步</el-button>
    </div>
  </div>
</template>

<script>
import {
  contactAPI,
  contactEditAPI,
  getContactInfoBySystemCodeAPI,
} from "@/api/group/word";
import { listUser } from "@/api/system/user";
import { createForms2 } from "./config";

export default {
  data() {
    return {
      loading: false,
      loadingBtn: false,
      forms: createForms2,
      form: {
        userNameContact: "",
        userNameFz: "",
        mscDwName: "",
        groupAddress: "",
        groupUrl: "",
        urlDict: "",
        wechatPublicNum: "",
        otherContact: "",
        qqGroups: "",
        qqGroupLord: "",
      },
      userOptions: [],
      id: null,
    };
  },
  created() {
    this.getList();
    this.getDetail();
  },
  methods: {
    getDetail() {
      this.loading = true;
      getContactInfoBySystemCodeAPI()
        .then((res) => {
          const data = res.payload || {};
          this.form = data;
          this.id = data.id;
        })
        .finally(() => (this.loading = false));
    },
    next(val) {
      this.$emit("next", val);
    },
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitForm();
        }
      });
    },
    submitForm() {
      const params = Object.assign({}, this.form);

      let API = contactAPI;
      if (this.id) {
        params.id = this.id;
        API = contactEditAPI;
      }

      this.loadingBtn = true;
      API(params)
        .then((res) => {
          this.$message.success("保存成功");
          this.getDetail();
        })
        .finally(() => (this.loadingBtn = false));
    },
    // 处理palceholder
    handlePlaceholder(title, item) {
      if (item?.attr?.placeholder) {
        return item.attr.placeholder;
      }
      let temp = "";
      switch (item.type) {
        case "select":
          temp = "请选择";
          break;
        case "input":
          temp = "请输入";
          break;
        default:
          temp = title;
      }
      return (temp += item.label);
    },
    // select 输入搜索
    remoteMethod(query) {
      console.log(query, "query");
      if (query !== "") {
        //demo
        setTimeout(() => {}, 1000);
        //demo
      } else {
      }
    },
    // 处理options
    handleOptions(val) {
      console.log(val);
      return this.userOptions;
    },
    handleRule(title, item) {
      let tip = this.handlePlaceholder(title, item);
      if (!item?.rules?.length) {
        return [];
      }
      let data = [...item.rules];
      data.some((i) => {
        if (i.required && !i.message) {
          i.message = tip;
        }
      });
      return data;
    },
    // 获取用户
    getList() {
      listUser({ pageNum: 1, pageSize: 999 }).then((response) => {
        this.userOptions = (response.rows || []).map((i) => ({
          label: i.userName,
          value: i.userId + "",
        }));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.first {
  display: flex;
  flex-wrap: wrap;
  > div {
    padding: 0 20px;
    width: calc((100% - 20px) / 2);
    border-radius: 20px;
    .el-select {
      width: 100%;
    }
    &:first-child {
      margin-right: 20px;
    }
    &:nth-child(3) {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 20px;
      h3 {
        width: 100%;
      }
      .el-form-item {
        width: calc((100% - 20px) / 2);
      }
    }
  }
  //   .group {
  //     width: 100%;
  //   }
}
.box {
  border: 1px solid #eee;
}
</style>