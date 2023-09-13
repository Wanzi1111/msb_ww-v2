<template>
  <div class="app-container submit">
    <el-card>
      <header>
        <Steps @change="change" :list="list" />
      </header>
    </el-card>
  </div>
</template>

<script>
import Steps from "../components/steps";
export default {
  components: { Steps },
  data() {
    return {
      list: ["基本信息", "集团组织形式"],
    };
  },
  methods: {
    change(val) {
      console.log(val, "change");
    },
  },
};
</script>