<template>
  <div class="app-container addorderClass">
    <el-card>
      <div class="info" v-loading="loading">
        <basics-form
          ref="form"
          class="form"
          :forms="forms"
          :actions="formActions"
          @submitForm="submitForm"
          @changeForm="changeForm"
          :disabled="formDisabled"
          :attr="{
            labelWidth: '376px',
          }"
        >
          <template slot="exchange" slot-scope="scope">
            <el-form-item v-bind="scope.item" class="form-item">
              <el-checkbox v-model="slotForm.exchange"></el-checkbox>
              <el-input
                :disabled="!slotForm.exchange"
                style="width: 280px; margin-left: 10px"
                v-model="scope.form.exchange"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </template>
          <template slot="policy" slot-scope="scope">
            <el-form-item v-bind="scope.item" class="form-item">
              <el-checkbox v-model="slotForm.policy"></el-checkbox>
              <el-input
                :disabled="!slotForm.policy"
                style="width: 280px; margin-left: 10px"
                v-model="scope.form.policy"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </template>
        </basics-form>
      </div>
    </el-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  addOrUpdateCollaboration,
  getCollaborationInfo,
} from "@/api/runSchool/teamWork";
import { addOrUpdateVerify, getVerifyInfo } from "@/api/runSchool/skill";
import {
  addOrUpdateStartup,
  getStartupInfo,
  addOrUpdateEmployment,
  getEmploymentInfo,
} from "@/api/runSchool/startBusiness";
import {
  addOrUpdatePublish,
  getPublishInfo,
  addOrUpdateAchievement,
  getAchievementInfo,
} from "@/api/runSchool/studyFruit";
import { listNonSystemcodeAPI } from "@/api/group/annualInformation";
import { cloneDeep } from "lodash";
import allForm from "./form";
import { remoteMethod } from "@/utils/commonExampleMethods";

const { studyFruitForm, startBusinessForm, skillForm, teamworkForm } = allForm;

export default {
  data() {
    return {
      loading: false,
      formDisabled: this.$route.query.type === "view",
      formActions: {
        submit: {
          hide: false,
        },
        back: {
          hide: false,
        },
      },
      slotForm: {
        exchange: false,
        policy: false,
      },
      forms: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.$nextTick(() => {
      const { pageType, id } = this.$route.query;
      if (pageType) {
        this.init(pageType);
      }
      if (id) {
        this.handleEdit(id, pageType);
      }
    });
  },
  methods: {
    init(val) {
      // form表单映射
      const formMap = {
        teamWork: teamworkForm(remoteMethod, this),
        skill: skillForm(remoteMethod, this),
        startup: startBusinessForm(remoteMethod, this),
        employment: startBusinessForm(remoteMethod, this),
        publish: studyFruitForm(remoteMethod, this, '1'),
        achievement: studyFruitForm(remoteMethod, this, '2'),
      };
      this.forms = formMap[val];
    },
    handleEdit(id, pageType) {
      // 详情接口映射
      const detailFnMap = {
        teamWork: getCollaborationInfo,
        skill: getVerifyInfo,
        startup: getStartupInfo,
        employment: getEmploymentInfo,
        publish: getPublishInfo,
        achievement: getAchievementInfo
      };
      const fn = detailFnMap[pageType];
      this.loading = true;
      this.$nextTick(() => {
        fn({ id })
          .then(({ payload }) => {
            this.slotForm = {
              exchange: !!payload.exchange,
              policy: !!payload.policy,
            };
            this.$refs.form.recoveryForm({
              ...payload,
              year: payload.year + "",
              completeDate: payload.completeDate + "",
              publishDate: payload.publishDate  + "",
              awardDate: payload.awardDate  + "",
              companyId: {
                label: payload.companyName,
                value: payload.companyId,
              },
              fileUrl: payload.fileUrl
                ? payload.fileUrl
                    .split(";")
                    .map((v) => ({ name: v, url: v, uid: v }))
                : [],
              materialUrl: payload.materialUrl
                ? payload.materialUrl
                    .split(";")
                    .map((v) => ({ name: v, url: v, uid: v }))
                : [],
            });
            // 回显对应的单位模糊搜索下拉列表
            listNonSystemcodeAPI({ unitName: payload.companyName }).then(
              (res) => {
                const data = (res.rows || []).map((i) => ({
                  label: i.unitName,
                  value: { label: i.unitName, value: i.id },
                }));
                this.$refs.form.set({
                  type: "options",
                  data: { companyId: data },
                });
              }
            );
          })
          .finally(() => {
            this.loading = false;
          });
      });
    },
    submitForm(vals) {
      const {
        user: { id: cid, systemCode },
        slotForm,
      } = this;
      const { pageType, id } = this.$route.query;
      // 新增 / 编辑 api映射
      const submitFnMap = {
        teamWork: addOrUpdateCollaboration,
        skill: addOrUpdateVerify,
        startup: addOrUpdateStartup,
        employment: addOrUpdateEmployment,
        publish: addOrUpdatePublish,
        achievement: addOrUpdateAchievement
      };

      const submitFn = submitFnMap[pageType];
      const payload = {
        ...cloneDeep(vals),
        cid,
        systemCode,
        [id ? "id" : ""]: id,
      };
      if (!slotForm.exchange) delete payload.exchange;
      if (!slotForm.policy) delete payload.policy;

      payload.companyName = vals.companyId.label;
      payload.companyId = vals.companyId.value;
      payload.fileUrl = payload.fileUrl?.length
        ? payload.fileUrl.map((v) => v.url).join(";")
        : undefined;
      payload.materialUrl = payload.materialUrl?.length
        ? payload.materialUrl.map((v) => v.url).join(";")
        : undefined;
      console.log("payload", payload);
      // return;
      this.loading = true;
      submitFn(payload)
        .then(() => {
          const startBusinessPath = ['startup', 'employment'].includes(pageType) ? 'startBusiness' : ''
          const studyFruitPath = ['publish', 'achievement'].includes(pageType) ? 'studyFruit' : ''
          const redicretPath = startBusinessPath || studyFruitPath || pageType
          this.$message.success("操作成功~");
          this.$router.push({ path: "/runSchool/studyResult/" + redicretPath });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    changeForm(val, oldVal) {},
  },
};
</script>

<style lang="scss" scoped>
.addorderClass {
  .info {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .style-input {
      width: 280px;
    }
  }
}
</style>
