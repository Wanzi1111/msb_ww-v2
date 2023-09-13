<template>
  <div class="care" v-loading="loading">
    <h3>系统将根据您的关注为您推荐合作信息</h3>
    <el-collapse v-model="activeNames">
      <div class="box" v-for="item in Object.keys(all_) || []" :key="item">
        <header>
          <div class="title">{{ all_[item].title }}</div>
          <el-button @click="handleBtn(item)"
            >{{ activeNames.includes(item) ? "收起" : "展开" }}筛选</el-button
          >
        </header>
        <el-collapse-item :name="item" :class="'collapse_' + item">
          <el-descriptions border :column="1">
            <template v-for="i in Object.keys(all_[item].children)">
              <el-descriptions-item
                :key="i"
                :label="all_[item].children[i].label + ':'"
                label-class-name="my-label"
              >
                <el-checkbox
                  v-model="checkAll[i]"
                  @change="(val) => handleCheckAllChange(val, i)"
                  >全选</el-checkbox
                >
                <el-checkbox-group
                  v-model="form[i]"
                  @change="(val) => handleCheckedCitiesChange(val, i)"
                >
                  <!-- v-for="n in all_[item].children[i].children" -->
                  <el-checkbox
                    v-for="n in dict.type[i] || []"
                    :label="n.value"
                    :key="n.value"
                    >{{ n.label }}</el-checkbox
                  >
                </el-checkbox-group>
              </el-descriptions-item>
            </template>
          </el-descriptions>
        </el-collapse-item>
      </div>
    </el-collapse>
    <el-checkbox v-model="requestType" class="requestType"
      >同意接收系统外其他单位的合作请求</el-checkbox
    >
    <div class="footerBtn">
      <el-button type="primary" :loading="loadingBtn" @click="save"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import {
  addOrUpdateTypeAPI,
  addOrUpdateAreaAPI,
  addOrUpdateLevelAPI,
  getTypeInfoAPI,
  getAreaInfoAPI,
  getLevelInfoAPI,
} from "@/api/group/cooperate";
import { all_ } from "./config";
import { mapState } from "vuex";
export default {
  dicts: [
    "saas_jointly_sponsor",
    "saas_cooperative_education",
    "saas_employment_and_entrepreneurship",
    "saas_social_training",
    "saas_technical_service",
    "saas_megagame",
    "saas_make_experiments",
    "saas_cultural_heritage",
    "saas_international_exchange",
    "saas_unit_type",
    "saas_secondary_vocational_level",
    "saas_vocationnal_level",
    "saas_vocationnal_level2",
    "saas_enterprise_size",
    "saas_internal",
    "saas_hongkong_macao_taiwan",
    "saas_international",
  ],
  data() {
    return {
      all_: all_ || {},
      form: {},
      checkAll: {},
      requestType: true,
      activeNames: ["one", "two", "three"],
      loading: false,
      loadingBtn: false,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.initFormat();
    this.getDetail();
  },
  methods: {
    // 全选
    handleCheckAllChange(val, key) {
      this.form[key] = val ? this.dict.type[key]?.map((i) => i.value) : [];
    },
    // 单个check
    handleCheckedCitiesChange(value, key) {
      this.checkAll[key] = value.length === this.dict.type[key].length;
    },
    // 初始化数据
    initFormat() {
      Object.keys(this.all_).forEach((i) => {
        if (this.all_[i]?.children) {
          Object.keys(this.all_[i].children).forEach((n) => {
            this.$set(this.form, n, []);
            this.$set(this.checkAll, n, false);
          });
        }
      });
    },
    save() {
      const all = {
        cid: this.user.id,
        systemCode: this.user.systemCode,
      };
      let temp = {
        params0: {
          ...all,
        },
        params1: {},
        params2: {
          ...all,
          requestType: this.requestType * 1,
        },
      };

      Object.keys(this.all_).forEach((item, index) => {
        Object.keys(this.all_[item].children).forEach((n) => {
          temp["params" + index][this.all_[item].children[n].key] =
            this.form[n]?.join();
        });
      });

      // 新增-编辑意向合作区域，单独处理
      const arr = [];
      Object.keys(temp.params1).forEach((i) => {
        arr.push({
          ...all,
          areaType: i,
          area: temp.params1[i],
        });
      });

      this.loadingBtn = true;
      Promise.all([
        addOrUpdateTypeAPI(temp.params0),
        addOrUpdateAreaAPI(arr),
        addOrUpdateLevelAPI(temp.params2),
      ])
        .then((res) => {
          this.$message.success("操作成功");
          this.getDetail();
        })
        .finally(() => (this.loadingBtn = false));
    },
    // 展开/收起
    handleBtn(key) {
      let dom = document.getElementsByClassName("collapse_" + key);
      dom[0]?.children[0]?.children[0]?.click();
    },
    getDetail() {
      const params = { systemCode: this.user.systemCode };
      this.loading = true;

      Promise.all([
        getTypeInfoAPI(params).then((res) => {
          const data = res.payload || {};
          Object.keys(this.all_.one.children).forEach((i) => {
            this.form[i] = data[this.all_?.one?.children[i]?.key]?.split(",");
          });
        }),
        getAreaInfoAPI(params).then((res) => {
          const data = res.payload || [];
          Object.keys(this.all_.two.children).forEach((i) => {
            let temp = data.find(
              (n) => n.areaType == this.all_?.two?.children[i]?.key
            );
            if (temp) {
              this.form[i] = temp?.area?.split(",");
            }
          });
        }),
        getLevelInfoAPI(params).then((res) => {
          const data = res.payload || {};
          Object.keys(this.all_.three.children).forEach((i) => {
            this.form[i] = data[this.all_?.three?.children[i]?.key]?.split(",");
          });
        }),
      ]).finally(() => (this.loading = false));
    },
  },
};
</script>

<style rel="stylesheet/scss" lang='scss' scoped>
.care {
  .box {
    margin-bottom: 20px;
    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 8px;
      .title {
        padding-left: 8px;
        border-left: 2px solid rgb(64, 158, 255);
        font-size: 22px;
      }
    }
    ::v-deep .el-collapse-item__header {
      display: none;
    }
  }
  ::v-deep .my-label {
    text-align: right;
    width: 200px;
  }
  .el-collapse {
    border: 0;
  }
  .requestType {
    padding: 20px 0;
  }
}
</style>