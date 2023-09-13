<template>
  <div class="app-container">
    <div class="leftBox">
      <Message class="firstRow" />
      <Flowable class="secondRow" />
      <News class="thirdRow" />
      <!-- <el-card class="firstRow message">
        <div class="num group">
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
        </div>
      </el-card> -->
      <!-- <el-card class="secondRow flowable"></el-card> -->
      <!-- <el-card class="thirdRow news"></el-card> -->
    </div>
    <div class="rightBox">
      <Banner class="firstRow" />
      <Shortcuts class="secondRow" />
      <File class="thirdRow"/>
      <!-- <el-card class="firstRow banner"></el-card> -->
      <!-- <el-card class="secondRow handle"></el-card> -->
      <!-- <el-card class="thirdRow file"></el-card> -->
    </div>
  </div>
</template>

<script>
import { Message, Banner, Flowable, Shortcuts, News, File } from "./components";

export default {
  components: { Message, Banner, Flowable, Shortcuts, News, File },
};
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  p {
    margin: 0;
  }
  ::v-deep .el-card__body {
    height: calc(100% - 44px);
  }
  .firstRow {
    height: 160px;
    margin-bottom: 12px;
  }
  .secondRow {
    height: 360px;
    margin-bottom: 12px;
  }
  .thirdRow {
    height: 270px;
  }
  .leftBox {
    width: calc(70% - 20px);
    margin-right: 20px;

    // .message {
    //   ::v-deep .el-card__body {
    //     height: 100%;
    //     display: flex;
    //     > div {
    //       margin-right: 20px;
    //       width: calc((100% - 60px) / 4);
    //       height: 100%;
    //       border-radius: 16px;

    //       &:last-child {
    //         margin-right: 0;
    //       }
    //     }
    //     .num {
    //       background-color: rgba(246, 247, 251, 1);
    //       position: relative;
    //       font-weight: 400;
    //       color: #4c6afe;
    //       cursor: pointer;
    //       .icon {
    //         position: absolute;
    //         top: 50%;
    //         right: 12px;
    //         background-repeat: no-repeat;
    //         background-position: right center;
    //       }
    //       &:nth-child(odd) {
    //         .icon {
    //           transform: translateY(-50%) rotate(60deg);
    //         }
    //       }
    //       &:nth-child(2) {
    //         .icon {
    //           transform: translateY(-50%) rotate(320deg);
    //         }
    //       }

    //       .tip {
    //         position: absolute;
    //         left: 42%;
    //         top: 50%;
    //         transform: translateY(-50%);
    //         font-size: 18px;
    //       }
    //       .display {
    //         position: absolute;
    //         left: 0;
    //         right: 58%;
    //         top: 30%;
    //         font-size: 48px;
    //         text-align: center;
    //         padding: 8px;
    //         overflow: hidden;
    //         white-space: nowrap;
    //         text-overflow: ellipsis;
    //       }
    //     }
    //     .group {
    //       .icon {
    //         width: 86px;
    //         height: 55px;
    //         background-image: url("~@/assets/images/u174.svg");
    //       }
    //     }
    //     .app {
    //       .icon {
    //         width: 62px;
    //         height: 59px;
    //         background-image: url("~@/assets/images/drafts_u415.svg");
    //       }
    //     }
    //     .system {
    //       .icon {
    //         width: 62px;
    //         height: 73px;
    //         background-image: url("~@/assets/images/add_alert_u259.svg");
    //       }
    //     }
    //     .btn {
    //       background-color: rgba(76, 106, 254, 1);
    //       .icon {
    //         width: 60px;
    //         height: 60px;
    //         background-image: url("~@/assets/images/create_u352.svg");
    //         transform: translateY(-50%);
    //       }
    //       .tip {
    //         left: 20%;
    //         color: #fff;
    //         font-weight: 500;
    //       }
    //     }
    //   }
    // }
  }
  .rightBox {
    width: 30%;
  }
}
</style>