<template>
  <el-card class="shortcuts">
    <div slot="header" class="header">
      <span>快捷操作</span>
    </div>
    <div class="info">
      <a :href="i.link" v-for="i in d" :key="i.link" target="_blank">
        <p>
          <i v-if="i.icon.includes('el-icon')" :class="i.icon"></i>
          <svg-icon v-else :icon-class="i.icon" />
        </p>
        <p>{{ i.title }}</p>
      </a>
    </div>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      d: [],
    };
  },
  filters: {
    shortcut(val) {
      return JSON.parse(d);
    },
  },
  created() {
    this.getDetail();
  },
  methods: {
    getDetail() {
      let temp = JSON.parse(
        '[{"icon":"cascader","title":"但是分身乏术的范德萨多少1","priority":"1","link":"https://1.com"},{"icon":"excel","title":"3sd","priority":"3","link":"https://1.com"},{"icon":"drag","title":"2","priority":"3","link":"https://1.com"},{"icon":"example","title":"2sa第三发","priority":"2","link":"https://1.com"},{"icon":"el-icon-cloudy","title":"7dcccxcx1","priority":"7","link":"https://1.com"},{"icon":"el-icon-connection","title":"5a","priority":"5","link":"https://1.com"},{"icon":"el-icon-ice-drink","title":"2","priority":"5","link":"https://1.com"}]'
      );

      this.d = temp.sort((a, b) => a.priority - b.priority);
    },
  },
};
</script>

<style lang='scss' scoped>
.shortcuts {
  .header {
    display: flex;
    justify-content: space-between;
    i {
      font-size: 20px;
      cursor: pointer;
      color: #97a8be;
    }
  }
  .info {
    display: flex;
    flex-wrap: wrap;
    height: 100%;
    a {
      width: 33%;
      height: 33%;
      text-align: center;
      display: flex;
      justify-content: space-evenly;
      flex-direction: column;
      color: #409eff;
      padding: 8px;
      &:hover {
        transform: scale(1.1);
      }
      p {
        font-size: 20px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin: 0;
        .svg-icon {
          width: 30px;
          height: 30px;
        }
        i {
          font-size: 30px;
        }
      }
    }
  }
}
</style>