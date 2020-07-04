<template>
  <article class="persion" :style="style">
    <img :src="data.portrait" alt="">
    <footer>
      <div class="name">{{data.name}}</div>
      <div class="born">
        {{data.bornIn}}
        <span>{{data.diedIn}}</span>
      </div>
    </footer>
  </article>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    // 开始时间年份，用户确定人物在时间方向上的位置
    startTime: {
      tyle: Number,
      default: -1600
    },
    // 缩放比例
    scale: {
      type: Number,
      default: 10
    },
  },
  data() {
    const positionTop = (this.data.bornIn - this.startTime) * this.scale + 'px';
    const style = {
      top: positionTop 
    };
    return {
      style
    };
  },
  mounted() {

  }
}
</script>

<style lang="less" scoped>
.persion {
  position: absolute;
  img {
    display: block;
    width: 100px;
  }
  .born {
    text-align: left;
    span {
      float: right;
    }
  }
}

</style>
