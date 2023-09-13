<template>
  <div class="app-container addmkBase">
    <el-card>
      <div class="info" v-loading="loading">
        <basics-form
          ref="form"
          class="form"
          :forms="forms"
          :actions="formActions"
          @submitForm="submitForm"
          @changeForm="changeForm"
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
import { mkBaseForm, companyNameData, allForm } from "../industry/form";
import { remoteMethod } from "@/utils/commonExampleMethods"
import { mkBase, addOrUpdateBase, getBaseInfo } from "@/api/runSchool/share";
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
      forms: [],
    };
  },
  dicts: ["saas_base_type"],
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.$nextTick(()=>{
      this.init();
      const { id } = this.$route.query;
      if (id) {
        this.handleEdit(id);
      }
    })
  },
  methods: {
    init() {
      let initForm = mkBaseForm(this.querySearch).concat(allForm);
      // 指定位置添加多个元素
      initForm.splice(0, 0, ...companyNameData(remoteMethod, this));
      initForm.map((i) => {
        if (i.prop.includes("cf_")) {
          i.prop = i.prop.substr(3);
        }
        return i;
      });
      this.forms = initForm;
      this.setOptionsData();
    },
    handleEdit(id) {
      this.loading = true;
      this.$nextTick(() => {
        getBaseInfo({ id }).then(({ payload }) => {
          this.slotForm = {
            exchange: !!payload.exchange,
            policy: !!payload.policy,
          };
          this.$refs.form.recoveryForm({
            ...payload,
            companyId: { label: payload.companyName, value: payload.companyId },
            fileUrl: payload.fileUrl
              ? payload.fileUrl
                  .split(";")
                  .map((v) => ({ name: v, url: v, uid: v }))
              : [],
              year: payload.year + '',
              level: payload.level + '',
              type: payload.type + '' ,
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
        }).finally(() => {
        this.loading = false;
      });
      })
    },
    submitForm(val) {
      const {
        user: { id: cid, systemCode },
        slotForm,
      } = this;
      const { id } = this.$route.query;
      this.loading = true;
      const params = {
        ...cloneDeep(val),
        cid,
        [id ? "id" : ""]: id,
        companyId: val.companyId.value,
        companyName: val.companyId.label,
        systemCode,
      };
      params.fileUrl = params.fileUrl?.length
        ? params.fileUrl.map((v) => v.url).join(";")
        : "";
      if (!slotForm.exchange) delete params.exchange;
      if (!slotForm.policy) delete params.policy;
      addOrUpdateBase(params)
        .then((res) => {
          this.$modal.msgSuccess("处理成功");
          this.$router.back();
        })
        .finally(() => {
          this.loading = false;
        });
    },
    changeForm(val, oldVal) {},
    setOptionsData() {
      this.$nextTick(() => {
        const { saas_base_type } = this.dict.type;
        this.$refs?.form.set({
          type: "options",
          data: {
            type: saas_base_type,
          },
        });
      });
    },
    async querySearch(name, cb) {
      let results = [];
      if (name) {
        const res = await mkBase({ name });
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
.addmkBase {
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
