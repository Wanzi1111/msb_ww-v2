<template>
  <div class="app-container addSchool">
    <el-card>
      <el-tabs v-model="activeType">
        <el-tab-pane
          v-for="item in tabList"
          :key="item.name"
          :label="`${item.label}`"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <Care v-if="activeType === '1'" />
      <Provide v-if="activeType === '2'" />
      <Company v-if="activeType === '3'" />
    </el-card>
  </div>
</template>

<script>
import Care from "./componetns/care";
import Provide from "./componetns/provide";
import Company from "./componetns/company";
export default {
  components: { Care, Provide, Company },
  data() {
    return {
      activeType: "1",
      tabList: [
        { label: "我关注的合作", name: "1" },
        { label: "我可以提供", name: "2" },
        { label: "过往合作单位", name: "3" },
      ],
    };
  },
};
</script>