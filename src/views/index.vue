<template>
  <!-- <div class="app-container home">
    <h3>欢迎使用万物租户系统</h3>
  </div> -->
  <Workbench/>
</template>

<script>
import Workbench from "@/views/workbench";
export default {
  name: "Index",
  components: { Workbench },
};
</script>

<style scoped lang="scss">
.home {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 178px);
  img {
    width: 300px;
  }
}
</style>
