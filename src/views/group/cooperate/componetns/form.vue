<template>
  <div>
    <basics-form
      ref="form"
      :loading="false"
      :forms="forms"
      :actions="formActions"
      @submitForm="submitForm"
    >
    </basics-form>
    <div class="footerBtn">
      <el-button type="primary" :loading="loadingBtn" @click="save"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    API: {
      type: Function,
    },
    info: {
      type: Object,
      default: () => ({}),
    },
    addType: "", // 区分 师资/课程/教材
  },
  data() {
    return {
      forms: [],
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
      form: {},
      loadingBtn: false,
    };
  },
  watch: {
    list: {
      handler(val) {
        this.forms = [...val];
      },
      deep: true,
      immediate: true,
    },
    info: {
      handler(val) {
        this.$nextTick(() => {
          this.$refs?.form?.recoveryForm(val, true);
        });
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    submitForm(value) {
      console.log(value, "save,value");
      const { id, systemCode } = this.user;
      const params = Object.assign({}, value, {
        cid: id,
        systemCode,
      });
      if (this.info.id) params.id = this.info.id;
      if (this.addType === "subject") params.type = 1;
      if (this.addType === "material") params.type = 2;
      this.loadingBtn = true;
      this.API(params)
        .then(() => {
          this.$message.success("保存成功");
        //   this.$emit("refresh");
        })
        .finally(() => (this.loadingBtn = false));
    },
    del() {
      this.form["arr"].splice(index, 1);
    },
    add() {
      this.form["arr"].push({ ...this.list });
    },
    save() {
      const formRes = this.$refs.form.getRef();
      formRes.validate((valid) => {
        if (valid) {
          this.$refs.form.submit();
        }
      });
    },
  },
};
</script>
