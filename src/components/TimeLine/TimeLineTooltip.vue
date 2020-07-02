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
      // year of our lord 看着别扭，不和他们 our
      tooltipStr = 'year of lord';
    }
    else if (this.time % this.step === 0) {
      tooltipStr = `公元${bc}${Math.abs(this.time / this.step) + (this.time > 0 ? 1 : 0)}世纪`;
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
  top: 3px;
  left: 30px;
  display: none;
  color: #000;
  white-space: nowrap;
}
.start,
.end {
  .time-line-tooltip {
    top: -1px;
    left: 20px;
  }
}
</style>
