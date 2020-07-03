<template>
  <section class="header-box">
    <div class="time-line">
      时间轴
    </div>
    <div class="dynasty china">
      中国朝代
    </div>
    <div class="dynasty europe">
      欧洲朝代
    </div>
    <div>
      包罗万象
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {};
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
  }
  .time-line {
    flex: 0 0 100px;
    background: #30A9DE;
  }
  .dynasty {
    flex: 0 0 100px;
    &.china {
      background: #E53A40;
    }
    &.europe {
      background: #27309A;
    }
  }
}
</style>