<template>
  <div class="app-container addmkMajors">
    <el-card>
      <div class="info" v-loading="loading">
        <basics-form
          ref="form"
          class="form"
          :forms="forms"
          :actions="formActions"
          @submitForm="submitForm"
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
import {
  mkMajorForm,
  mkMajorGroupForm,
  companyNameData,
  allForm,
} from "../industry/form";
import { remoteMethod } from "@/utils/commonExampleMethods"
import {
  addOrUpdateMajor,
  addOrUpdateMajorGroup,
  getmkMajor,
  mkMajorGroup,
  getMajorInfo,
  getMajorGroupInfo,
} from "@/api/runSchool/share";
import { listNonSystemcodeAPI } from "@/api/group/annualInformation";
import { cloneDeep } from "lodash";
import { mapState } from "vuex";

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
      initFormObj: {
        1: mkMajorForm(this.querySearch),
        2: mkMajorGroupForm(this.querySearch),
      },
    };
  },

  dicts: ["saas_professional_group_level", "saas_professional_type"],
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.$nextTick(() => {
      const { activeType, id } = this.$route.query;
      if (activeType) {
        this.init(activeType);
      }
      if (id) {
        this.handleEdit(id, activeType);
      }
    });
  },
  methods: {
    init(val) {
      let initForm = this.initFormObj[val].concat(allForm);
      // 指定位置添加多个元素
      initForm.splice(0, 0, ...companyNameData(remoteMethod, this));
      initForm.map((i) => {
        if (i.prop.includes("cf_")) {
          i.prop = i.prop.substr(3);
        }
        return i;
      });
      this.forms = initForm;
      this.setOptionsData(val);
    },
    handleEdit(id, activeType) {
      const fn = activeType === "1" ? getMajorInfo : getMajorGroupInfo;
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
              companyId: {
                label: payload.companyName,
                value: payload.companyId,
              },
              type: activeType === "1" ? payload.type.split(",") : payload.type,
              level: payload.level + '',
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
    submitForm(val) {
      const {
        user: { id: cid, systemCode },
        slotForm,
      } = this;
      const { activeType, id } = this.$route.query;
      const params = {
        ...cloneDeep(val),
        cid,
        [id ? "id" : ""]: id,
        companyId: val.companyId.value,
        companyName: val.companyId.label,
        systemCode,
        typeList: activeType === "1" ? val.type : [],
      };
      if (!slotForm.exchange) delete params.exchange;
      if (!slotForm.policy) delete params.policy;
      const addApis = {
        1: addOrUpdateMajor,
        2: addOrUpdateMajorGroup,
      };
      this.loading = true;
      addApis[activeType](params)
        .then((res) => {
          this.$modal.msgSuccess("处理成功");
          this.$router.back();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    // 共建专业类型区分同参数下的options
    setOptionsData(Tval) {
      this.$nextTick(() => {
        const { saas_professional_group_level, saas_professional_type } = this.dict.type;
        const cftype = {
          1: saas_professional_type,
        };
        const cflevel = {
          // 等级
          2: saas_professional_group_level,
        };
        this.$refs?.form.set({
          type: "options",
          data: {
            type: cftype[Tval],
            level: cflevel[Tval],
          },
        });
      });
    },
    // 获取专业类型
    // getmkMajorTypeFn() {
    //   getmkMajorType().then((res) => {
    //     if (res.code === 200) {
    //       this.majorType = iteratorArr(res.payload);
    //     } else {
    //       this.majorType = [];
    //     }
    //     const { activeType } = this.$route.query;
    //     if (activeType) {
    //       this.init(activeType);
    //     }
    //   });
    // },
    async querySearch(name, cb) {
      const { activeType } = this.$route.query;
      const nameApis = {
        1: getmkMajor,
        2: mkMajorGroup,
      };
      let results = [];
      if (name) {
        const res = await nameApis[activeType]({ name });
        results = res.rows || [];
        cb(results);
      } else {
        cb([]);
      }
    },
  },
};
</script>

<style lang='scss' scoped>
.addmkMajors {
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
