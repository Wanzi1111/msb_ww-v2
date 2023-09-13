<template>
  <div class="replenish">
    <h3>请补充信息，获取更优质的功能和服务</h3>
    <el-form
      ref="form"
      :model="form"
      class="form"
      label-position="right"
      label-width="160px"
    >
      <div v-for="item in formList" :key="item.prop">
        <el-form-item
          :prop="item.prop"
          :label="item.label + ':'"
          :rules="item.rules"
          v-if="isShow || item.prop === 'd1' || item.prop === 'd2'"
        >
          <el-select
            v-if="item.type === 'select'"
            v-model="form[item.prop]"
            v-bind="item.attr"
            :loading="d1Loading"
          >
            <el-option
              v-for="i in item.prop === 'd1' ? d1Options : item.options"
              :key="i.value"
              :label="i.label"
              :value="i.value"
            />
          </el-select>
          <el-autocomplete
            v-else-if="item.prop === 'd2'"
            v-model="form[item.prop]"
            v-bind="item.attr"
            :fetch-suggestions="querySearch"
            @select="handleAutocompleteSelect"
            :loading="d2Loading"
            value-key="name"
          ></el-autocomplete>
          <el-input
            v-else-if="item.type === 'input'"
            v-model="form[item.prop]"
            v-bind="item.attr"
          ></el-input>
          <FileUpload
            v-else-if="item.prop === 'd7'"
            :value="form.fileList"
            @changeFileList="changeFileList"
            @input="delFile"
            :fileSize="10"
            class="upload"
          />
          <div class="upload" v-else-if="item.prop === 'd8'">
            <el-button size="mini">下载模板</el-button>
            <FileUpload
              :value="form.fileList2"
              @changeFileList="changeFileList"
              @input="delFile"
              :fileSize="10"
            />
          </div>
        </el-form-item>
      </div>
    </el-form>
    <div class="btn">
      <el-button
        :loading="loading"
        size="medium"
        type="primary"
        @click.native.prevent="save"
      >
        <span>{{ `${isShow ? "创建" : "提交"}并等待管理员审核` }}</span>
      </el-button>
    </div>
  </div>
</template>

<script>
import { replenishFormList } from "./config";
export default {
  name: "Replenish",
  data() {
    return {
      loading: false,
      form: {
        fileList:[],
        fileList2:[]
      },
      formList: replenishFormList(this.searchD1),
      d1Options: [],
      d2Options: [],
      d2Loading: false,
      d1Loading: false,
      isShow: true,
    };
  },
  created() {
    console.log(this, "this");
  },
  methods: {
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
        }
      });
    },
    // 上传成功回调
    changeFileList(file) {
      console.log(file,'replenish');
    //   file.length && this.attachHandle(file[0] || "");
    },
    // 删除文件
    delFile(val) {
      let { uid, url } = val[0];
      this.form.fileList.forEach((item, index) => {
        if (item.uid === uid) {
          this.form.fileList.splice(index, 1);
          return;
        }
      });
    },
    searchD1(query) {
      console.log(this, "this");
      console.log(query, "query");
      if (query !== "") {
        this.d1Loading = true;
        //demo
        setTimeout(() => {
          this.d1Options = [];
          this.d1Options.push(
            { label: "a1", value: "1" },
            { label: "a2", value: "2" }
          );
          this.d1Loading = false;
        }, 1000);
        //demo
      } else {
        this.d1Options = [];
      }
    },
    // 单位名称 搜索
    async querySearch(name, cb) {
      console.log(name, "name");
      let results = [];
      if (name) {
        // const API = type === 1 ? labelListAPI : listAPI;
        // const res = await API({ name });
        // results = res.data || [];

        //demo
        results = [{ value: "123", name: "aaa" }];
        //demo
        cb(results);
      } else {
        cb([]);
      }
      // 输入内容与下拉框选项不一致时，显示其他item
      if (this.form.d99 && this.form.d99.name !== name) {
        this.isShow = true;
        this.form.d99 = {};
      }
    },
    // autocomplete组件select事件
    handleAutocompleteSelect(item) {
      console.log(item, "item");
      if (item) {
        this.form.d99 = item;
        this.isShow = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.replenish {
  width: 620px !important;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  h3 {
    color: #1890ff;
    text-align: center;
    margin-bottom: 50px;
  }
  .el-autocomplete {
    width: 100%;
  }
  .upload {
    display: flex;
    flex-wrap: wrap;
    > div {
      width: 100%;
    }
  }
  .btn {
    text-align: center;
    .el-button {
      width: 300px;
    }
  }
}
</style>