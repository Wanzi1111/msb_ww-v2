<template>
  <el-card class="message">
    <div
      :class="['num', i.className]"
      v-for="i in list"
      :key="i.class"
      @click="handleClick(i.className)"
    >
      <i class="icon"></i>
      <div class="tip">
        <p>{{ i.title }}</p>
        <p>{{ i.englishTitle }}</p>
      </div>
      <span v-if="i.className !== 'btn'" class="display">{{ i.num }}</span>
    </div>

    <!-- <div class="num group">
      <i class="icon"></i>
      <div class="tip">
        <p>集团信息</p>
        <p>Cooperation news</p>
      </div>
      <span class="display">12</span>
    </div>
    <div class="num app">
      <i class="icon"></i>
      <div class="tip">
        <p>应用消息</p>
        <p>Group notice</p>
      </div>
      <span class="display">123</span>
    </div>
    <div class="num system">
      <i class="icon"></i>
      <div class="tip">
        <p>系统消息</p>
        <p>System message</p>
      </div>
      <span class="display">123</span>
    </div>
    <div class="num btn">
      <i class="icon"></i>
      <div class="tip">
        <p>发布消息</p>
        <p>Release news</p>
      </div>
    </div> -->
  </el-card>
</template>

<script>
import { getMsgCountAPI } from "@/api/workbench";
export default {
  data() {
    return {
      list: [
        {
          className: "group",
          title: "集团信息",
          englishTitle: "Cooperation news",
          num: 0,
          key: "groupMsgCount",
        },
        {
          className: "app",
          title: "应用消息",
          englishTitle: "Group notice",
          num: 99,
          key: "appMsgCount",
        },
        {
          className: "system",
          title: "系统消息",
          englishTitle: "System message",
          num: 123,
          key: "sysMsgCount",
        },
        { className: "btn", title: "发布消息", englishTitle: "Release news" },
      ],
    };
  },
  created() {
    this.getDetail();
  },
  methods: {
    handleClick(val) {
      switch (val) {
        case "group":
          this.handleSkip("1");
          break;
        case "app":
          this.handleSkip("2");
          break;
        case "system":
          this.handleSkip("3");
          break;
        case "btn":
          this.$router.push({
            name: "Publish",
            params: {
              add: 1,
            },
          });
          break;
      }
    },
    handleSkip(type) {
      this.$router.push({
        name: "My",
        params: {
          type,
        },
      });
    },
    getDetail() {
      getMsgCountAPI().then((res) => {
        const data = res.data || {};
        this.list.forEach((i) => (i.num = data[i.key]));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  ::v-deep .el-card__body {
    height: 100% !important;
    display: flex;
    > div {
      margin-right: 20px;
      width: calc((100% - 60px) / 4);
      height: 100%;
      border-radius: 16px;

      &:last-child {
        margin-right: 0;
      }
    }
    .num {
      background-color: rgba(246, 247, 251, 1);
      position: relative;
      font-weight: 400;
      color: #4c6afe;
      cursor: pointer;
      .icon {
        position: absolute;
        top: 50%;
        right: 12px;
        background-repeat: no-repeat;
        background-position: right center;
      }
      &:nth-child(odd) {
        .icon {
          transform: translateY(-50%) rotate(60deg);
        }
      }
      &:nth-child(2) {
        .icon {
          transform: translateY(-50%) rotate(320deg);
        }
      }
      &:hover {
        background-color: rgba(76, 106, 254, 1);
        color: #fff;
        .display {
          color: #fbbc48;
        }
      }

      .tip {
        position: absolute;
        left: 42%;
        top: 50%;
        transform: translateY(-50%);
        font-size: 18px;
      }
      .display {
        position: absolute;
        left: 0;
        right: 58%;
        top: 30%;
        font-size: 48px;
        text-align: center;
        padding: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
    .group {
      .icon {
        width: 86px;
        height: 55px;
        background-image: url("~@/assets/images/u174.svg");
      }
    }
    .app {
      .icon {
        width: 62px;
        height: 59px;
        background-image: url("~@/assets/images/drafts_u415.svg");
      }
    }
    .system {
      .icon {
        width: 62px;
        height: 73px;
        background-image: url("~@/assets/images/add_alert_u259.svg");
      }
    }
    .btn {
      //   background-color: rgba(76, 106, 254, 1);
      .icon {
        width: 60px;
        height: 60px;
        background-image: url("~@/assets/images/create_u352.svg");
        transform: translateY(-50%);
      }
      .tip {
        left: 20%;
        // color: #fff;
        font-weight: 500;
      }
    }
  }
}
</style>