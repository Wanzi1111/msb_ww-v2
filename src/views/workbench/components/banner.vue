<template>
  <el-card class="banner">
    <el-carousel height="100%">
      <el-carousel-item v-for="item in list" :key="item.src">
        <a :href="item.url" target="_blank">
          <!-- <img :src="item.src" alt="" /> -->
          <el-image :src="item.src" fit="fill" />
        </a>
      </el-carousel-item>
    </el-carousel>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          src: "https://img.mymro.cn/EC/newscenter/14843092408107911/banner.jpg",
          url: "https://www.baidu.com",
        },
        {
          src: "https://img.mymro.cn/EC/newscenter/15533997564602145/东成活动轮播.jpg",
          url: "https://www.mymro.cn/",
        },
        {
          src: "https://img.mymro.cn/EC/newscenter/15100927280268341/banner.jpg",
          url: "https://www.taobao.com",
        },
      ],
    };
  },
};
</script>
<style lang='scss' scoped>
.banner {
  ::v-deep .el-card__body {
    padding: 0;
    height: 100% !important;
  }
  .el-carousel {
    height: 100%;
  }
}
</style>