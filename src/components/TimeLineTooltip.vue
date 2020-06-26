<template>
<span class="time-line-tooltip">
    {{tooltipStr}}
</span>
</template>

<script>
export default {
  name: 'TimeLineTooltip',
  props: {
    time: Number,
    step: Number
  },
  data() {
    let tooltipStr = '';
    // Before Christ
    const bc = this.time < 0 ? '前' : '';
    if (this.time === 0) {
      tooltipStr = 'year of our lord';
    }
    else if (this.time % this.step === 0) {
      tooltipStr = `公元${bc}${Math.abs(this.time / this.step)}世纪`;
    }
    else {
      tooltipStr = `公元${bc}${Math.abs(this.time)}年`;
    }
    return {
      tooltipStr
    }
  }
}
</script>

<style scoped lang="less">
.time-line-tooltip {
  position: absolute;
  left: 30px;
  display: none;
  color: #000;
}
</style>
