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
        <el-button
          v-if="this.activeType != tabList.length && !view"
          @click="next(1)"
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
  enterpriseAddInfoAPI,
  enterpriseEditInfoAPI,
  enterpriseAddOrUpdateBenefitsAPI,
  enterpriseAddOrUpdateMemberSchoolAPI,
  enterpriseInformationAPI,
  enterpriseBenefitsByBaseInfoIdAPI,
  enterpriseEemberSchoolByBaseInfoIdAPI,
} from "@/api/group/annualInformation";
import {
  s_createForms1,
  s_createForms2,
  s_createForms3,
  s_createForms4,
  s_createForms5,
  e_createForms1,
  e_createForms2,
  e_createForms3,
} from "./config/form";
import Detail from "./school/components/detail";
import { mapState } from "vuex";
import { remoteMethod } from "./common";

const school = [
  { label: "基本情况", name: "1" },
  { label: "自身获益", name: "2" },
  { label: "服务成员院校", name: "3" },
  { label: "服务成员企业", name: "4" },
  { label: "国际交流合作", name: "5" },
];

const enterprise = [
  { label: "基本情况", name: "1" },
  { label: "自身获益", name: "2" },
  { label: "服务成员院校", name: "3" },
];

export default {
  components: { Detail },
  data() {
    return {
      loading: false,
      activeType: "1",
      tabList: [],
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
      forms: [],
      id: null,
      saveAPI: schoolAddOrUpdateInfoAPI,
      detailAPI: schoolGetInfoAPI,
      cacheForm: {},
      editStatus: false,
      view: false, // 查看
      type: null, // 企业/学校
      createForms1: [],
      createForms2: [],
      createForms3: [],
      createForms4: s_createForms4,
      createForms5: s_createForms5,
      saveAPIList: [],
      detailAPIList: [],
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
    let { id = null, view = false, type = "1" } = this.$route.query;
    this.id = id;
    this.view = view;
    this.type = type;
    this.init();
    // this.getDetail();
  },
  methods: {
    handleTab() {
      if (this.activeType !== "1" && !this.id) {
        this.$message.error("请先填写基本情况");
      }
      this.$refs?.form?.resetFields();
      // switch (this.activeType) {
      //   case "1":
      //     this.forms = this.createForms1;
      //     this.detailAPI = schoolGetInfoAPI;
      //     this.saveAPI = this.saveAPIList[0];
      //     break;
      //   case "2":
      //     this.forms = this.createForms2;
      //     this.detailAPI = schoolGetBenefitInfoAPI;
      //     this.saveAPI = this.saveAPIList[1];
      //     break;
      //   case "3":
      //     this.forms = this.createForms3;
      //     this.detailAPI = schoolGetSchoolMemberInfoAPI;
      //     this.saveAPI = this.saveAPIList[2];
      //     break;
      //   case "4":
      //     this.forms = this.createForms4;
      //     this.detailAPI = schoolGetCompanyMemberInfoAPI;
      //     this.saveAPI = this.saveAPIList[3];
      //     break;
      //   case "5":
      //     this.forms = this.createForms5;
      //     this.detailAPI = schoolGetInternationalInfoAPI;
      //     this.saveAPI = this.saveAPIList[4];
      //     break;
      // }
      this.forms = this["createForms" + this.activeType];
      this.saveAPI = this.saveAPIList[this.activeType - 1];
      this.detailAPI = this.detailAPIList[this.activeType - 1];
      this.getDetail();
    },
    getDetail() {
      if (!this.id) return;
      this.loading = true;
      const params =
        this.type === "1" ? this.id : { id: this.id, schoolAnnualId: this.id };
      console.log(params, "getDetail，params");
      this.detailAPI(params)
        .then((res) => {
          const data = res.payload || {};
          data.year += "";
          if (!this.view && this.user?.department_demo != 2 && data.companyId) {
            let temp = { value: data.companyId, label: data.companyName };
            this.setForm("options", "companyId", [{ ...temp }]);
            // data.companyId = temp;
          }
          this.cacheForm = data;
          this.$refs?.form?.recoveryForm(data, true);
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
        // systemCode,
        sysCode: systemCode,
        //demo
      });
      if (this.id) {
        if (this.type === "1") {
          // 企业
          params[this.activeType === "1" ? "id" : "enterpriseInformationId"] =
            this.id;
        } else {
          // 学校的不同tab，key不一致
          params[this.activeType === "1" ? "id" : "schoolAnnualId"] = this.id;
        }
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
        if (!this.id)
          this.id = this.type === "1" ? res?.payload.id : res.payload;
        this.getDetail();
      });
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
    init() {
      if (this.type === "1") {
        this.createForms1 = e_createForms1(remoteMethod, this);
        this.createForms2 = e_createForms2;
        this.createForms3 = e_createForms3;
        this.tabList = enterprise;
        this.saveAPI = this.id ? enterpriseEditInfoAPI : enterpriseAddInfoAPI;
        this.detailAPI = enterpriseInformationAPI;
        this.saveAPIList = [
          this.id ? enterpriseEditInfoAPI : enterpriseAddInfoAPI,
          enterpriseAddOrUpdateBenefitsAPI,
          enterpriseAddOrUpdateMemberSchoolAPI,
        ];
        this.detailAPIList = [
          enterpriseInformationAPI,
          enterpriseBenefitsByBaseInfoIdAPI,
          enterpriseEemberSchoolByBaseInfoIdAPI,
        ];
      } else {
        this.createForms1 = s_createForms1(remoteMethod, this);
        this.createForms2 = s_createForms2;
        this.createForms3 = s_createForms3;
        this.tabList = school;
        this.saveAPI = schoolAddOrUpdateInfoAPI;
        this.detailAPI = schoolGetInfoAPI;
        this.saveAPIList = [
          schoolAddOrUpdateInfoAPI,
          schoolAddOrUpdateBenefitAPI,
          schoolAddOrUpdateSchoolMemberAPI,
          schoolAddOrUpdateCompanyMemberAPI,
          schoolAddOrUpdateInternationalAPI,
        ];
        this.detailAPIList = [
          schoolGetInfoAPI,
          schoolGetBenefitInfoAPI,
          schoolGetSchoolMemberInfoAPI,
          schoolGetCompanyMemberInfoAPI,
          schoolGetInternationalInfoAPI,
        ];
      }

      this.forms = this.createForms1;
      this.getDetail();
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