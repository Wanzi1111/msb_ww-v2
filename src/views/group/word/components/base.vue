<template>
  <div>
    <basics-form
      :key="state"
      ref="form"
      v-loading="loading"
      :forms="forms"
      :actions="formActions"
      @submitForm="submitForm"
      @changeForm="changeForm"
      class="form"
    >
      <template slot="groupSum" slot-scope="scope">
        <editor
          v-model="form.noticeContent"
          :min-height="192"
          style="margin-bottom: 20px"
        />
      </template>
      <template slot="fuwuhyDict" slot-scope="scope">
        <el-input>
          <template slot="append">
            <el-button @click="open(scope)">选择</el-button>
          </template>
        </el-input>
      </template>
    </basics-form>
    <div class="footerBtn">
      <el-button type="primary" @click="save" :loading="loadingBtn"
        >保存</el-button
      >
      <el-button @click="next(1)">下一步</el-button>
    </div>
    <Choose ref="choose" />
  </div>
</template>
<script>
import {
  getBaseInfoBySystemCodeAPI,
  baseAPI,
  baseEditAPI,
  getGroupDictAPI,
} from "@/api/group/word";
import { createForms } from "./config";
import { mapState } from "vuex";
import Choose from "./choose";

export default {
  name: "groupWord",
  data() {
    return {
      state: "create",
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
      forms: createForms,
      form: {
        noticeContent: "",
      },
      cllx1Dict_cache: null,
      cllx2OneDict_cache: null,
      id: null,
      loading: false,
      loadingBtn: false,
    };
  },
  computed: {
    ...mapState(["myDict"]),
  },
  components: { Choose },
  created() {
    this.getDetail();
    this.setForm();
  },
  mounted() {},
  methods: {
    getDetail() {
      this.loading = true;
      getBaseInfoBySystemCodeAPI()
        .then((res) => {
          const data = res.payload || {};
          if (data.zmFile)
            data.zmFile = data?.zmFile?.split(",")?.map((i) => ({ url: i }));
          if (data.groupZcFile)
            data.groupZcFile = data?.groupZcFile
              ?.split(",")
              ?.map((i) => ({ url: i }));
          if (data.zcPassFile)
            data.zcPassFile = data?.zcPassFile
              ?.split(",")
              ?.map((i) => ({ url: i }));
          if (data.fuwuhyDict) {
            data.fuwuhyDict = JSON.parse(data.fuwuhyDict);
          }
          if (data.cllx1Dict == 2) {
            // this.$set(this.$refs.form.form, "cllx2OneDict", "");
            data.cllx2OneDict=''
          }
          data.qtdwType += "";
          data.groupType += "";
          data.pzBaSxDict += "";
          data.frDict += "";
          data.cyfwDict += "";
          this.$refs?.form?.recoveryForm(data, true);
          this.id = data.id;
          console.log(data, "getDetail");
        })
        .finally(() => (this.loading = false));
    },
    submitForm(value) {
      console.log(value, this.form.noticeContent, "noticeContent");
      const params = Object.assign({}, value);
      if (params?.fuwuhyDict && Array.isArray(params.fuwuhyDict)) {
        // let arr = [];
        // params.fuwuhyDict.forEach((i) => {
        //   i.forEach((n) => {
        //     console.log(arr.includes(n), "fdsfds", n, "a123a");
        //     if (!arr.includes(n)) {
        //       arr.push(n);
        //     }
        //   });
        // });
        // params.fuwuhyDict = arr.join();
        params.fuwuhyDict = JSON.stringify(params.fuwuhyDict);
      }
      if (params?.zmFile) {
        params.zmFile = params.zmFile?.map((i) => i.url)?.join();
      }
      if (params?.groupZcFile) {
        params.groupZcFile = params.groupZcFile?.map((i) => i.url)?.join();
      }
      if (params?.zcPassFile) {
        params.zcPassFile = params.zcPassFile?.map((i) => i.url)?.join();
      }
      let API = baseAPI;
      if (this.id) {
        API = baseEditAPI;
        params.id = this.id;
      }

      this.loadingBtn = true;
      API(params)
        .then((res) => {
          this.$message.success("保存成功");
          this.getDetail();
        })
        .finally(() => (this.loadingBtn = false));
    },
    changeForm(value) {
      this.changeFormFn(value);
    },
    changeFormFn(value) {
      const { cllx1Dict, cllx2OneDict } = value;
      console.log(cllx1Dict, "cllx1Dict");
      console.log(cllx2OneDict, "cllx2OneDict");
      console.log(this.cllx1Dict_cache, "this.cllx1Dict_cache");
      console.log(
        cllx1Dict &&
          cllx1Dict === this.cllx1Dict_cache &&
          cllx2OneDict &&
          cllx2OneDict === this.cllx2OneDict_cache,
        "flag"
      );
      // if (cllx2OneDict && cllx2OneDict === this.cllx2OneDict_cache) {
      //   return;
      // } else {
      //   this.cllx2OneDict_cache = cllx2OneDict;
      // }
      if (
        cllx1Dict &&
        cllx1Dict === this.cllx1Dict_cache &&
        cllx2OneDict &&
        cllx2OneDict === this.cllx2OneDict_cache
      ) {
        console.log("return le");
        return;
      } else {
        this.cllx1Dict_cache = cllx1Dict;
        this.cllx2OneDict_cache = cllx2OneDict;
      }

      // 根据不同类型值进行切换
      switch (cllx1Dict) {
        case 1:
          this.setFormShow(
            ["cllx2OneDict", "pzBaName", "pzBaSxDict", "clDate", "zmFile"],
            ["frDict", "tyxyCode", "zcDeptName", "frdjUnitName", "zhuceMoney"]
          );
          // 重置 成立类型2 的值
          // const formRes = this.$refs.form.getRef();
          // this.$refs.form.form.cllx2OneDict = "";
          console.log(this.$refs.form, "res");
          switch (cllx2OneDict) {
            case 1:
            case 2:
              this.setFormShow(["pzBaName", "pzBaSxDict"]);
              break;
            case 3:
            case 4:
            case 5:
              this.setFormShow(
                ["clDate", "zmFile"],
                ["pzBaName", "pzBaSxDict"]
              );
              break;
          }
          break;
        case 2:
          this.setFormShow(
            [
              "frDict",
              "clDate",
              "tyxyCode",
              "zcDeptName",
              "frdjUnitName",
              "zhuceMoney",
            ],
            ["cllx2OneDict", "pzBaName", "pzBaSxDict", "zmFile"]
          );
        default:
          break;
      }
    },
    setFormShow(showKey = [], hideKey = []) {
      let show = showKey?.map((i) => ({ [i]: true }));
      let hide = hideKey?.map((i) => ({ [i]: false }));
      this.$refs.form.set({
        type: "visible",
        data: Object.assign({}, ...show, ...hide),
      });
      console.log(Object.assign({}, ...show, ...hide), "obj");
    },
    setFormAttr(type, key, data = []) {
      this.$nextTick(() => {
        this.$refs.form.set({
          type,
          data: { [key]: data },
        });
      });
    },
    // 动态添加select options
    setForm() {
      if (Object.keys(this.myDict?.dict)?.length) {
        const {
          unitMemberTypeList,
          groupIndustryTypeList,
          groupIndustrySubTypeList,
        } = this.myDict?.dict;
        this.setFormAttr(
          "options",
          "qtdwType",
          (unitMemberTypeList || []).map((i) => ({
            label: i.name,
            value: i.code,
          }))
        );

        // 组合 服务行业面向 的字典
        let temp = {};
        groupIndustrySubTypeList?.forEach((i) => {
          if (temp[i.parentId]) {
            temp[i.parentId].push(i);
          } else {
            temp[i.parentId] = [i];
          }
        });
        console.log(temp, "temp");
        groupIndustryTypeList?.forEach((i) => {
          i.children = temp[i.code];
        });

        this.setFormAttr("options", "fuwuhyDict", groupIndustryTypeList);
      }
    },
    save() {
      const formRes = this.$refs.form.getRef();
      formRes.validate((valid) => {
        if (valid) {
          this.$refs.form.submit();
        }
      });
    },
    next(val) {
      this.$emit("next", val);
    },
    open(scope) {
      console.log(scope, "scope");
      this.$refs.choose.open();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>