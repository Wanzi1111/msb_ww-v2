<template>
  <Dialog
    :dialog-visible.sync="visible"
    :attrs="attrs"
    @close="close"
    ref="dialog"
    class="add"
  >
    <basics-form
      ref="forms"
      :loading="loading"
      :forms="forms"
      :actions="formActions"
      @submitForm="submitVoid"
      :attr="{
        labelWidth: '130px',
      }"
    >
      <template slot="upload" slot-scope="scope">
        <el-form-item v-bind="scope.item" class="form-item">
          <div>
            <FileUpload
              :value="form.fileList"
              @changeFileList="changeFileList"
              @input="delFile"
              :fileSize="2"
              :isShowTip="true"
              :fileType="['PDF']"
            />
          </div>
        </el-form-item>
      </template>
    </basics-form>
    <div slot="footer">
      <el-button type="primary" :loading="loading" @click="save(0)">
        保存
      </el-button>
      <el-button @click="close">取消</el-button>
    </div>
  </Dialog>
</template>

<script>
import Dialog from "@/views/components/dialog";
import { createForms } from "../config";

export default {
  components: { Dialog },
  data() {
    return {
      visible: false,
      attrs: {
        title: "新增",
        width: "600px",
      },
      loading: false,
      forms: createForms(this.remoteMethod),
      formActions: {
        submit: {
          hide: true,
        },
        back: {
          hide: true,
        },
        quit: {
          hide: true,
        },
      },
      form: {
        fileList: [],
      },
      flag: null, // 保存/发布
    };
  },
  methods: {
    open(userId = null) {
      this.userId = userId;
      if (userId) {
        this.getDetail(userId);
        this.attrs.title = "编辑";
      } else {
        this.attrs.title = "新增";
      }
      this.visible = true;
    },
    close() {
      this.visible = false;
      this.$refs.forms.resetFields();
    },
    save(type) {
      const formRes = this.$refs.forms.getRef();
      formRes.validate((valid) => {
        if (valid) {
          this.flag = type;
          this.$refs.forms.submit();
        }
      });
    },
    submitVoid(val) {
      const params = Object.assign({}, val);
      params.detailImages = params.detailImages.map((item) => item.url);

      let actionAPI = addActivityAPI;
      let tip = "创建成功";

      if (this.id) {
        params.id = this.id;
        actionAPI = modifyActivityAPI;
        tip = "修改成功";
      }

      actionAPI(params).then((res) => {
        if (res.status === 0) {
          this.$message.success(tip);
          this.$parent.reset();
          this.visible = false;
        }
      });
    },
    getDetail(userId) {
      // this.loading = true;
      // getUserAPI({ userId })
      //   .then((res) => {
      //     const data = res.data || {};
      //     Object.keys(this.formData).forEach((i) => {
      //       this.formData[i] = data[i];
      //     });
      //     this.formData.status = !!data.status;
      //   })
      //   .finally(() => (this.loading = false));
    },
    // 上传成功回调
    changeFileList(file) {
      //   file.length && this.attachHandle(file[0] || "");
    },
    // 删除文件
    delFile(val) {
      let { uid, url } = val[0];
      this.formData.fileList.forEach((item, index) => {
        if (item.uid === uid) {
          this.formData.fileList.splice(index, 1);
          return;
        }
      });
    },
    remoteMethod(query) {
      console.log(query, "query");
      if (query !== "") {
        //demo
        setTimeout(() => {
          this.setForm("options", "type", [{ label: "12", value: "aaa" }]);
 
        }, 1000);
        //demo
      } else {
        this.setForm("options", "type", []);
      }
    },
    // set form
    setForm(type, key, data = []) {
      this.$refs.forms.set({
        type,
        data: { [key]: data },
      });
    },
  },
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.addindustry {
  .form{
    .style-input {
      display: flex;
      width: 300px;
    }
  }
}
</style>