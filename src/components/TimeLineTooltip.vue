<template>
<span class="time-line-tooltip">tooltip</span>
</template>

<script>
export default {
  name: 'TimeLineTooltip',
  props: {
    time: Number
  },
  data() {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.time-line-tooltip {
  position: absolute;
  left: 30px;
  display: none;
}
</style>
