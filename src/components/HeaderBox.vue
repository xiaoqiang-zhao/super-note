<template>
  <section class="header-box">
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
      this.$emit('changeScale', this.scale === 1 ? 10 : 1);
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  display: flex;
  margin: 30px 10px;
  background: #285943;
  border: 1px solid #285943;
  color: #fff;
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
</style>