<template>
  <div class="app-container addorderClass">
    <el-card>
      <div class="info" v-loading="loading">
        <basics-form
          ref="form"
          class="form"
          :loading="false"
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
import { mapState } from "vuex";
import addForm from "./form"
import {
  getOrderClassInfo,
  getModernApprenticeInfo,
  getEnterpriseApprenticeInfo,
  getCultivateInfo,
  addOrUpdateOrderClass,
  addOrUpdateModernApprentice,
  addOrUpdateEnterpriseApprentice,
  addOrUpdateCultivate,
} from "@/api/runSchool/cooperation";
import { listNonSystemcodeAPI } from "@/api/group/annualInformation";
import { cloneDeep } from "lodash";
import { remoteMethod } from "@/utils/commonExampleMethods"

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
    this.$nextTick(()=>{
      const { activeType, id } = this.$route.query
      if(activeType){
        this.init(activeType)
      }
      if (id) {
        this.handleEdit(id, activeType);
      }
    })
  },
  methods: {
    init(val){
        this.forms = addForm(remoteMethod, this, val)
    },
    handleEdit(id, activeType) {
      const apis = {
        1: getOrderClassInfo,
        2: getModernApprenticeInfo,
        3: getEnterpriseApprenticeInfo,
        4: getCultivateInfo,
      }
      this.loading = true;
      this.$nextTick(() => {
        apis[activeType]({ id })
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
              year: payload.year + ''
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
    submitForm(vals) {
      const {
        user: { id: cid, systemCode },
        slotForm,
      } = this;
      const { activeType, id } = this.$route.query;
      const apis = {
        1: addOrUpdateOrderClass,
        2: addOrUpdateModernApprentice,
        3: addOrUpdateEnterpriseApprentice,
        4: addOrUpdateCultivate,
      }
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
      console.log("payload", payload);
      // return;
      this.loading = true;
      apis[activeType](payload)
        .then(() => {
          this.$message.success("操作成功~");
          this.$router.back();
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style lang='scss' scoped>
.addorderClass {
  .info {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    .style-input{
        width: 280px;
    }
  }  
}
</style>
