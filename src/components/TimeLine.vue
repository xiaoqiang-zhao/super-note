<template>
  <div class="time-line">
    <span class="start"></span>
    <span class="line"></span>
    <span class="dot"></span>
    <span class="line"></span>
    <span class="dot"></span>
    <span class="line"></span>
    <span class="dot"></span>
    <span class="line"></span>
    <span class="dot">-23</span>
    <span class="line"></span>
    <span class="dot"></span>
    <span class="line"></span>
    <span class="dot"></span>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.time-line {
  @color: #595a5f;
  width: 50px;
  margin: 0 auto;
  > span {
    display: block;
    margin: 0 auto;
  }

  .start,
  .end {
    width: 14px;
    height: 14px;
    border: 2px solid @color;
    border-radius: 14px;
  }

  .line {
    display: block;
    height: 87px;
    width: 3px;
    background: @color;
  }

  .dot {
    position: relative;
    z-index: 1;
    box-sizing: border-box;
    width: 26px;
    height: 26px;
    // margin: -13px auto -13px auto;
    border: 1px solid @color;
    border-radius: 13px;
    padding: 2px;
    background-color: #83acae;
    background-clip: content-box;
    font-size: 12px;
    color: #fff;
    text-align: center;
    line-height: 20px;
  }
}
</style>
