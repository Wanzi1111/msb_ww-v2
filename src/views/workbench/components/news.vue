<template>
  <el-card class="news">
    <div slot="header" class="header">
      <span>大咖分享</span>
      <span>
        <i class="el-icon-arrow-left" @click="handle(1)"></i>
        <i class="el-icon-arrow-right" @click="handle(2)"></i>
      </span>
    </div>
    <div class="info">
      <a :href="i.href" v-for="i in list" :key="i.id">
        <el-card class="card" shadow="hover">
          <h3>{{ i.title }}</h3>
          <p class="content">{{ i.content }}</p>
          <p class="other">
            <span>作者：{{ i.author }}</span>
            <span>时间：{{ i.time }}</span>
          </p>
          <p class="other">身份：{{ i.dd }}</p>
        </el-card>
      </a>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          id: 1,
          title:
            "都是范德萨多少范德萨范德萨1都是范德萨多少范德萨范德萨1都是范德萨多少范德萨范德萨1",
          content: "范德萨范德萨范德萨范德萨范德萨范德萨范德萨",
          author: "的时代",
          time: "2022年10月15日",
          dd: "这是一个身份",
          href: "www.baidu.com",
        },
        {
          id: 2,
          title: "范德萨多少",
          content:
            "范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨范德萨",
          author: "的撒的撒",
          time: "2002年10月15日",
          dd: "这是一个身份",
          href: "www.jingdong.com",
        },
      ],
    };
  },
  methods: {
    handle(val) {
      console.log(val, "val");
    },
  },
};
</script>
<style lang='scss' scoped>
.news {
  h3,
  p {
    margin: 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    i {
      font-size: 20px;
      cursor: pointer;
      color: #97a8be;
      margin-left: 32px;
      &:hover {
        color: #409eff;
      }
    }
  }
  .info {
    display: flex;
    height: 100%;
    > a {
      width: calc((100% - 20px) / 2);
      margin-right: 20px;
      height: 100%;
      &:last-child {
        margin-right: 0;
      }
    }
    .card {
      height: 100%;
      cursor: pointer;
      // &:hover {
      //   transform: scale(1.1);
      // }
    }
    ::v-deep .el-card__body {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    h3 {
      line-height: 36px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      text-indent: 2em;
      font-size: 16px;
      line-height: 22px;
      max-height: 66px;
      margin-bottom: 8px;
      color: #aaa;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      line-clamp: 3;
      -webkit-box-orient: vertical;
    }
    .other {
      display: flex;
      justify-content: space-between;
      color: #7f7f7f;
      font-size: 16px;
      line-height: 18px;
    }
  }
}
</style>