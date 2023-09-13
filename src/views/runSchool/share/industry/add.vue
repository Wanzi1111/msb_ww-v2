<template>
  <div class="app-container addindustry">
    <el-card>
      <div class="info" v-loading="loading">
        <basics-form
          ref="form"
          class="form"
          :forms="forms"
          :actions="formActions"
          @submitForm="submitForm"
          @changeForm="changeForm"
          @handleAutocompleteSelect="handleSelect"
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
import addForm, { objForms } from "./form/index";
import { remoteMethod } from "@/utils/commonExampleMethods";
import {
  addOrUpdateAcademy,
  getmkMajor,
  mkMajorGroup,
  mkCourse,
  mkTextbook,
  mkBase,
  mkTeachers,
  addOrUpdateMajor,
  addOrUpdateMajorGroup,
  addOrUpdateCourse,
  addOrUpdateMaterial,
  addOrUpdateBase,
  addOrUpdateTeacher,
  getAcademyInfo,
} from "@/api/runSchool/share";
import { mapState } from "vuex";
import { listNonSystemcodeAPI } from "@/api/group/annualInformation";
import { cloneDeep } from "lodash";
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
      forms: addForm(remoteMethod, this),
      configListType: "",
      configForm: [],
      configList: [],
      emitId: "",
    };
  },
  dicts: [
    "saas_jointly_sponsor",
    "saas_professional_group_level",
    "saas_lesson_type",
    "saas_course_level",
    "saas_book_type",
    "saas_base_type",
    "saas_teacher_type",
    "saas_award_level",
    "saas_professional_type",
  ],
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.$nextTick(() => {
      this.init();
      const { id } = this.$route.query;
      if (id) {
        this.handleEdit(id);
      }
    });
  },
  methods: {
    init() {
      this.forms = addForm(remoteMethod, this);
      this.$nextTick(() => {
        const { saas_jointly_sponsor } = this.dict.type;
        this.$refs?.form.set({
          type: "options",
          data: {
            configList: saas_jointly_sponsor,
          },
        });
      });
      return this.forms;
    },
    handleEdit(id) {
      this.loading = true;
      this.$nextTick(() => {
        getAcademyInfo({ id })
          .then(({ payload }) => {
            this.slotForm = {
              exchange: !!payload.exchange,
              policy: !!payload.policy,
            };
            this.$refs.form.recoveryForm({
              ...payload,
              companyId: {
                label: payload.companyName,
                value: payload.companyId,
              },
              fileUrl: payload.fileUrl
                ? payload.fileUrl
                    .split(";")
                    .map((v) => ({ name: v, url: v, uid: v }))
                : [],
              year: payload.year + "",
              level: payload.level + "",
              configList: "0",
            });
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
    // 共建专业类型区分同参数下的options
    setOptionsData(Tval) {
      this.$nextTick(() => {
        const {
          saas_professional_group_level,
          saas_lesson_type,
          saas_course_level,
          saas_book_type,
          saas_base_type,
          saas_teacher_type,
          saas_award_level,
          saas_professional_type,
        } = this.dict.type;
        const cftype = {
          1: saas_professional_type,
          3: saas_lesson_type,
          4: saas_book_type,
          5: saas_base_type,
          6: saas_teacher_type,
        };
        const cflevel = {
          // 等级
          2: saas_professional_group_level,
          3: saas_course_level,
          4: saas_professional_group_level,
        };
        this.$refs?.form.set({
          type: "options",
          data: {
            cf_type: cftype[Tval],
            cf_level: cflevel[Tval],
            cf_awardType: saas_award_level,
          },
        });
      });
    },
    // 获取coid
    async getCoidFn(val) {
      const {
        user: { id: cid, systemCode },
        emitId,
      } = this;
      const { id } = this.$route.query;
      const addApis = {
        1: addOrUpdateMajor,
        2: addOrUpdateMajorGroup,
        3: addOrUpdateCourse,
        4: addOrUpdateMaterial,
        5: addOrUpdateBase,
        6: addOrUpdateTeacher,
      };
      const params = {
        ...cloneDeep(val),
        cid,
        [emitId ? "id" : ""]: emitId,
        companyId: val.companyId.value,
        companyName: val.companyId.label,
        systemCode,
        fileUrl: val.fileUrl && val.fileUrl.filter((i) => i.url).join(","),
        ...this.actionsFn(val, "cf_"),
      };
      const res = await addApis[val.configList](params);
      let data = {
        [id ? "academyId" : ""]: id,
        cid,
        coId: emitId ? emitId : res.payload,
        coType: Number(val.configList),
      };
      this.configList.push(data);
    },
    actionsFn(val, qtype) {
      let data = {};
      if (qtype === "cf_") {
        for (const key in val) {
          if (key.includes(qtype)) {
            data = {
              ...data,
              [key.substr(3)]: val[key],
            };
          }
        }
      } else {
        for (const key in val) {
          data = {
            ...data,
            ["cf_" + key]: val[key],
          };
        }
      }
      return data;
    },
    async submitForm(val) {
      const {
        user: { id: cid, systemCode },
        slotForm,
      } = this;
      const { id } = this.$route.query;
      // 除产业学院以外 走添加获取coid
      if(val.configList !== "0"){
        await this.getCoidFn(val);
      }
      this.loading = true;
      const configList =
        !val.configList || val.configList === "0" ? [] : this.configList;
      const params = {
        ...cloneDeep(val),
        cid,
        [id ? "id" : ""]: id,
        companyId: val.companyId.value,
        companyName: val.companyId.label,
        systemCode,
        configList,
      };
      params.fileUrl = params.fileUrl?.length
        ? params.fileUrl.map((v) => v.url).join(";")
        : "";
      if (!slotForm.exchange) delete params.exchange;
      if (!slotForm.policy) delete params.policy;
      addOrUpdateAcademy(params)
        .then((res) => {
          this.$modal.msgSuccess("处理成功");
          this.$router.back();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    changeForm(val, oldVal) {
      if (val.configList && val.configList !== oldVal.configList) {
        console.log(val, oldVal);
        // 指定位置添加多个元素
        if (val.configList !== "0") {
          this.configListType = val.configList;
          let initForm = this.init();
          // 指定位置添加多个元素
          initForm.splice(8, 0, ...objForms[val.configList](this.querySearch));
          this.forms = initForm;
          this.setOptionsData(val.configList);
        } else {
          this.init();
        }
      }
    },
    async querySearch(name, cb) {
      const { configListType } = this;
      const nameApis = {
        1: getmkMajor,
        2: mkMajorGroup,
        3: mkCourse,
        4: mkTextbook,
        5: mkBase,
        6: mkTeachers,
      };
      let results = [];
      if (name) {
        const res = await nameApis[configListType]({ name });
        this.configForm = res.rows || [];
        results =
          res.rows.map((val) => {
            val.id = val.id;
            val.value = val.name;
            return val;
          }) || [];
        cb(results);
      } else {
        cb([]);
      }
    },
    async handleSelect(val) {
      const { configListType } = this;
      this.emitId = val.id;
      const payload = this.actionsFn(val);
      this.$refs.form.recoveryForm({
        ...payload,
        cf_fileUrl: val.fileUrl
          ? val.fileUrl.split(";").map((v) => ({ name: v, url: v, uid: v }))
          : [],
        cf_type: configListType === "1" ? val.type.split(",") : val.type + "",
        cf_level: val.level + "",
        cf_awardType: val.awardType + "",
        cf_year: val.year + "",
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.addIndustry {
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
