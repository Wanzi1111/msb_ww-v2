<template>
  <div class="app-container addSchool">
    <el-card>
      <el-tabs v-model="activeType" :before-leave="beforeLeave">
        <el-tab-pane
          v-for="(item, index) in tabList"
          :key="item.name"
          :label="`${index + 1}.${item.label}`"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <div class="info" v-loading="loading">
        <basics-form
          ref="form"
          :loading="false"
          :forms="forms"
          :actions="formActions"
          @submitForm="submitForm"
          @changeForm="changeForm"
          class="form"
          :attr="{
            labelWidth: '376px',
          }"
          v-if="!view"
        >
        </basics-form>
        <Detail v-else :forms="forms" :info="cacheForm" />
      </div>
      <div class="footerBtn">
        <el-button v-if="this.activeType !== '1' && !view" @click="next(-1)"
          >上一步</el-button
        >
        <el-button v-if="!view" type="primary" @click="save">保存</el-button>
        <el-button @click="close">{{ view ? "返回" : "取消" }}</el-button>
        <el-button v-if="this.activeType !== '5' && !view" @click="next(1)"
          >下一步</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  schoolAddOrUpdateInfoAPI,
  schoolGetInfoAPI,
  schoolGetBenefitInfoAPI,
  schoolAddOrUpdateBenefitAPI,
  schoolAddOrUpdateSchoolMemberAPI,
  schoolGetSchoolMemberInfoAPI,
  schoolAddOrUpdateCompanyMemberAPI,
  schoolGetCompanyMemberInfoAPI,
  schoolAddOrUpdateInternationalAPI,
  schoolGetInternationalInfoAPI,
} from "@/api/group/annualInformation";
import {
  createForms1,
  createForms2,
  createForms3,
  createForms4,
  createForms5,
} from "../config";
import Detail from "./detail";
import { mapState } from "vuex";
import { remoteMethod } from "../../common";

export default {
  components: { Detail },
  data() {
    return {
      loading: false,
      activeType: "1",
      tabList: [
        { label: "基本情况", name: "1" },
        { label: "自身获益", name: "2" },
        { label: "服务成员院校", name: "3" },
        { label: "服务成员企业", name: "4" },
        { label: "国际交流合作", name: "5" },
      ],
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
      forms: createForms1(remoteMethod, this),
      id: null,
      saveAPI: schoolAddOrUpdateInfoAPI,
      detailAPI: schoolGetInfoAPI,
      cacheForm: {},
      editStatus: false,
      view: false, // 查看
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  watch: {
    activeType() {
      if (this.editStatus) {
        this.$message.warning("有数据未保存，请先保存");
        return;
      }
      this.handleTab();
    },
  },
  created() {
    let { id = null, view = false } = this.$route.query;
    this.id = id;
    this.view = view;
    this.getDetail();
  },
  methods: {
    handleTab() {
      if (this.activeType !== "1" && !this.id) {
        this.$message.error("请先填写基本情况");
      }
      this.$refs?.form?.resetFields();
      switch (this.activeType) {
        case "1":
          this.forms = createForms1(remoteMethod, this);
          this.detailAPI = schoolGetInfoAPI;
          this.saveAPI = schoolAddOrUpdateInfoAPI;
          break;
        case "2":
          this.forms = createForms2;
          this.detailAPI = schoolGetBenefitInfoAPI;
          this.saveAPI = schoolAddOrUpdateBenefitAPI;
          break;
        case "3":
          this.forms = createForms3;
          this.detailAPI = schoolGetSchoolMemberInfoAPI;
          this.saveAPI = schoolAddOrUpdateSchoolMemberAPI;
          break;
        case "4":
          this.forms = createForms4;
          this.detailAPI = schoolGetCompanyMemberInfoAPI;
          this.saveAPI = schoolAddOrUpdateCompanyMemberAPI;
          break;
        case "5":
          this.forms = createForms5;
          this.detailAPI = schoolGetInternationalInfoAPI;
          this.saveAPI = schoolAddOrUpdateInternationalAPI;
          break;
      }
      this.getDetail();
    },
    getDetail() {
      if (!this.id) return;
      this.loading = true;
      this.detailAPI({ id: this.id, schoolAnnualId: this.id })
        .then((res) => {
          const data = res.payload || {};
          data.year += "";
          if (this.user?.department_demo != 2 && data.companyId) {
            let temp = { value: data.companyId, label: data.companyName };
            this.setForm("options", "companyId", [{ ...temp }]);
            // data.companyId = temp;
          }
          this.$refs?.form?.recoveryForm(data, true);
          this.cacheForm = data;
        })
        .finally(() => (this.loading = false));
    },
    changeForm(value) {
      console.log(value, "value");
      console.log(this.cacheForm, "this.cacheForm");
      Object.keys(value).some((i) => {
        if (value[i] && value[i] != this.cacheForm[i]) {
          this.editStatus = true;
          return true;
        }
        this.editStatus = false;
      });
      console.log(this.editStatus, "editStatus");
    },
    submitForm(value) {
      const {
        department_demo,
        companyId_demo,
        companyName_demo,
        systemCode,
        id,
      } = this.user;

      console.log(value, "noticeContent");
      const params = Object.assign({}, value, {
        cid: id,
        //demo
        systemCode,
        //demo
      });
      if (this.id) {
        // 不同tab，key不一致
        params[this.activeType === "1" ? "id" : "schoolAnnualId"] = this.id;
      }

      // 高于单位的人员登录，可选择单位
      if (
        Object.prototype.toString.call(params.companyId) === "[object Object]"
      ) {
        //处理拆分单位名称和其id
        // const temp = params.companyId.split("-");
        // params.companyName = temp[0];
        // params.companyId = temp[1];
        params.companyName = params.companyId?.label;
        params.companyId = params.companyId?.value;
      } else if (params.companyId) {
        params.companyName = this.cacheForm.companyName;
      }

      // 单位的人员登录，只添加该单位信息，从vuex中取值
      if (department_demo == 2) {
        params.companyId = companyId_demo;
        params.companyName = companyName_demo;
      }

      this.saveAPI(params).then((res) => {
        this.$message.success("保存成功");
        if (!this.id) this.id = res.payload;
        this.getDetail();
      });
    },
    // select 输入搜索
    remoteMethod(query) {
      console.log(query, "query");
      if (query !== "") {
        //demo
        setTimeout(() => {
          this.setForm("options", "companyId", [
            { label: "单位名称", value: { label: "单位名称", value: "321" } },
          ]);
        }, 1000);
        //demo
      } else {
        this.setForm("options", "type", []);
      }
    },
    // set form
    setForm(type, key, data = []) {
      this.$refs.form.set({
        type,
        data: { [key]: data },
      });
    },
    close() {
      this.$router.push({ path: "/group/annualInformation" });
    },
    save() {
      if (this.activeType !== "1" && !this.id) {
        this.$message.error("请先填写基本情况");
        return;
      }
      const formRes = this.$refs.form.getRef();
      formRes.validate((valid) => {
        if (valid) {
          this.$refs.form.submit();
        }
      });
    },
    next(val) {
      if (this.editStatus) {
        this.warnTip();
        return;
      }
      this.activeType = this.activeType * 1 + val + "";
    },
    beforeLeave() {
      if (this.editStatus) {
        this.warnTip();
        return !this.editStatus;
      }
    },
    warnTip() {
      this.$message.warning("您有数据未保存，请先保存");
    },
  },
};
</script>

<style lang='scss' scoped>
.addSchool {
  .info {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .form {
      width: 900px;
    }
  }
}
</style>

the internet has revolutionized the way people