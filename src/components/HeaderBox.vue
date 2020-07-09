<template>
  <section class="header-box">
    <div class="item-container">
      <div class="time-line" @click="changeScale">
        时间轴
      </div>
      <div class="dynasty china">
        中国
      </div>
      <div class="dynasty europe">
        欧洲
      </div>
      <div class="everything">
        包罗万象
      </div>
    </div>
    <div class="placeholder"></div>
  </section>
</template>

<script>
export default {
  props: {
    // 比例，一年/像素高度
    scale: {
      type: Number,
      default: 10
    },
  },
  data() {
    return {};
  },
  methods: {
    
    /**
     * 改变比例尺，时间与页面尺寸的比例在 1:1 和 1:10 之间切换
     */
    changeScale() {
      // this.$store.dispatch('changeScale', this.scale === 1 ? 10 : 1);
      this.$store.commit('setScale', this.scale === 1 ? 10 : 1);
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  position: relative;
  margin: 10px 10px 20px 10px;
  color: #fff;

  .item-container {
    position: fixed;
    z-index: 3;
    top: 10px;
    width: 100%;
    display: flex;
    border: 1px solid #285943;
    background: #285943;
    > div {
      padding: 10px;
      margin-right: 1px;
      flex: 0 0 70px;
    }
    .time-line {
      background: #30A9DE;
    }
    .dynasty {
      &.china {
        background: #E53A40;
      }
      &.europe {
        background: #27309A;
      }
    }
    .everything {
      flex: 1;
    }
  }

  .placeholder {
    height: 43px;
  }
}
</style>