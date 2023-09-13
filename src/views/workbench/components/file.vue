<template>
  <el-card class="file">
    <div slot="header" class="header">
      <span>常用文件</span>
    </div>
    <div class="info">
      <div v-for="i in list" :key="i.id" class="box">
        <h3 class="title">{{ i.name }}</h3>
        <p class="other">
          <span class="date">{{ i.createTime }}</span>
          <span>
            <span class="btn" @click="handle(i.url, 1)">下载</span>
            <el-divider direction="vertical"></el-divider>
            <span class="btn" @click="handle(i.url, 2)">查看</span>
          </span>
        </p>
      </div>
    </div>
  </el-card>
</template>

<script>
import { getWorkBenchAPI } from "@/api/workbench";
import { download } from "@/utils";
import { mapState } from "vuex";

export default {
  data() {
    return {
      list: [
        {
          id: 1,
          name: "范德萨范德萨范德萨范德萨发范德萨范德萨",
          createTime: "2022-10-01",
          url: "https://whwanwu.oss-cn-beijing.aliyuncs.com/platform/file/2023-03-18/1679109654265.jpg",
        },
        { id: 2, name: "范德萨发生的范德萨", createTime: "2022-10-01", url: "" },
        {
          id: 3,
          name: "发生的范德萨范德萨范德萨发范德萨",
          createTime: "2022-10-01",
          url: "https://whwanwu.oss-cn-beijing.aliyuncs.com/platform/file/2023-03-18/1679129847175.xlsx",
        },
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    this.getDetail();
  },
  methods: {
    handle(url, type) {
      console.log(url, "url");
      console.log(type, "type");
      if (type === 1) {
        download(url);
      } else {
        window.open(url, "_blank");
      }
    },
    getDetail() {
      getWorkBenchAPI({ code: this.user.systemCode }).then((res) => {
        // this.list=res.
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.file {
  h3,
  p {
    margin: 0;
  }
  .info {
    height: 100%;
    .box {
      border-bottom: 1px dashed #7f7f7f;
      height: 33%;
      .title {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 36px;
      }
      .other {
        display: flex;
        justify-content: space-between;
        color: #7f7f7f;
        font-size: 14px;
        .btn {
          cursor: pointer;
        }
      }
    }
  }
}
</style>